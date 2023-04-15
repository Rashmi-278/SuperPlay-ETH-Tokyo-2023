// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// simple whitelist
contract SuperPlayGuard is Ownable {
    enum Operation {
        Call,
        DelegateCall
    }

    mapping(address => bool) public allowedContracts;
    mapping(address => mapping(bytes4 => bool)) public allowedFunctions;

    function approveContract(address contractAddress) external onlyOwner {
        allowedContracts[contractAddress] = true;
    }

    function approveFunction(
        address contractAddress,
        bytes4 functionSignature
    ) external onlyOwner {
        allowedFunctions[contractAddress][functionSignature] = true;
    }

    function checkTransaction(
        address to,
        uint256 value,
        bytes memory data,
        Operation operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address payable refundReceiver,
        bytes memory signatures,
        address msgSender
    ) external {
        if (!allowedContracts[to]) {
            bytes4 selector;
            assembly {
                selector := mload(add(data, 32))
            }
            if (!allowedFunctions[to][selector]) {
                revert("SuperPlayGuard: not allowed");
            }
        }
    }
}
