// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;
    address public lastCaller;

    function setNumber(uint256 newNumber) public {
        lastCaller = msg.sender;
        number = newNumber;
    }

    function increment() public {
       lastCaller = msg.sender; 
        number++;
    }

    function decrement() public {
       lastCaller = msg.sender; 
        number--;
    }
    
    function getLastCaller() public view returns(address) {
        return lastCaller;
    }
}
