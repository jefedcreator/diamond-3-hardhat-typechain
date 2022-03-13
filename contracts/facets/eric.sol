// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract demoFaucet3{
    function demoFunction1(uint id) external view returns(uint){
        console.log(id);
        return id;
    }
}

