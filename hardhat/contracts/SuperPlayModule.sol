// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SuperPlay} from "./SuperPlay.sol";

interface ISafe {
    enum Operation {
        Call,
        DelegateCall
    }

    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes memory data,
        Operation operation
    ) external returns (bool success);
}

// create flow
contract SuperPlayModule is Ownable {
    SuperPlay public superPlay;

    constructor(address superPlayAddress) {
        superPlay = SuperPlay(superPlayAddress);
    }

    function registerForGameAs(uint256 gameId, ISafe safe) external onlyOwner {
        safe.execTransactionFromModule(
            address(superPlay),
            0,
            abi.encodeWithSelector(SuperPlay.registerForGame.selector, gameId),
            ISafe.Operation.Call
        );
    }

    function unregisterForGameAs(
        uint256 gameId,
        ISafe safe
    ) external onlyOwner {
        safe.execTransactionFromModule(
            address(superPlay),
            0,
            abi.encodeWithSelector(
                SuperPlay.unregisterForGame.selector,
                gameId
            ),
            ISafe.Operation.Call
        );
    }
}
