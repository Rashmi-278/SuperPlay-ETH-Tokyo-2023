// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import {ISuperTokenFactory, ERC20WithTokenInfo} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol";
import {PureSuperToken} from "@superfluid-finance/ethereum-contracts/contracts/tokens/PureSuperToken.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

contract SuperPlay is Ownable {
    using SuperTokenV1Library for ISuperToken;

    struct GameInfo {
        ISuperToken token;
        int96 rate;
        address receiver;
    }

    GameInfo[] public games;
    ISuperTokenFactory private superTokenFactory;

    event GameCreated(
        uint256 indexed gameId,
        ERC20WithTokenInfo token,
        ISuperToken superToken,
        int96 rate
    );
    event Register(uint256 indexed gameId, address indexed user);
    event Unregister(uint256 indexed gameId, address indexed user);

    constructor(ISuperTokenFactory _superTokenFactory) {
        superTokenFactory = _superTokenFactory;
    }

    function createGame(
        ERC20WithTokenInfo token,
        int96 rate,
        address receiver
    ) public returns (uint256 gameId) {
        ISuperToken superToken = superTokenFactory.createERC20Wrapper(
            token,
            ISuperTokenFactory.Upgradability.SEMI_UPGRADABLE,
            token.name(),
            token.symbol()
        );

        gameId = games.length;
        GameInfo memory gameInfo = GameInfo(superToken, rate, receiver);
        games.push(gameInfo);

        emit GameCreated(gameId, token, superToken, rate);
    }

    function createGameWithSuperToken(
        ISuperToken superToken,
        int96 rate,
        address receiver
    ) public returns (uint256 gameId) {
        gameId = games.length;
        GameInfo memory gameInfo = GameInfo(superToken, rate, receiver);
        games.push(gameInfo);

        emit GameCreated(
            gameId,
            ERC20WithTokenInfo(superToken.getUnderlyingToken()),
            superToken,
            rate
        );
    }

    function registerForGame(uint256 gameId) public {
        GameInfo memory game = games[gameId];
        game.token.createFlowFrom(msg.sender, game.receiver, game.rate);
        emit Register(gameId, msg.sender);
    }

    function unregisterForGame(uint256 gameId) public {
        GameInfo memory game = games[gameId];
        game.token.deleteFlowFrom(msg.sender, game.receiver);
        emit Unregister(gameId, msg.sender);
    }

    function getFlowInfo(
        uint256 gameId,
        address user
    ) public view returns (uint256 timestamp, int96 flowRate, uint256 deposit) {
        (timestamp, flowRate, deposit, ) = games[gameId].token.getFlowInfo(
            user,
            games[gameId].receiver
        );
    }
}
