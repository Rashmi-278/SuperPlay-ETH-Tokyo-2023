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

    constructor(ISuperTokenFactory _superTokenFactory) {
        superTokenFactory = _superTokenFactory;
    }

    function createGame(
        ERC20WithTokenInfo token,
        int96 rate,
        address receiver
    ) public returns (uint256 gameId) {
        ISuperToken superToken = superTokenFactory.createCanonicalERC20Wrapper(
            token
        );

        gameId = games.length;
        GameInfo memory gameInfo = GameInfo(superToken, rate, receiver);
        games.push(gameInfo);
    }

    function registerGame(uint256 gameId) public {
        GameInfo memory game = games[gameId];
        game.token.createFlowFrom(msg.sender, game.receiver, game.rate);
    }

    function unregisterGame(uint256 gameId) public {
        GameInfo memory game = games[gameId];
        game.token.deleteFlowFrom(msg.sender, game.receiver);
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
