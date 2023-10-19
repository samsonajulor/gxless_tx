#! /bin/bash -e

source .env

forge script script/Counter.s.sol:CounterScript --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv


echo "Done deploying \"./counter.sol\" at `date`"


