import { ContractReceipt, Transaction } from "ethers";
import { TransactionDescription, TransactionTypes } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { DiamondCutFacet } from "../typechain-types";
import { getSelectors, FacetCutAction } from "./libraries/diamond";

export let DiamondAddress: string = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d";

export async function deployDiamond() {
    const accounts = await ethers.getSigners();
    const contractOwner = accounts[0];
    
    // deploy DiamondCutFacet
    // const DiamondCutFacet = await ethers.getContractFactory("DiamondCutFacet");
    // const diamondCutFacet = await DiamondCutFacet.deploy();
    // await diamondCutFacet.deployed();
    // console.log("DiamondCutFacet deployed:", diamondCutFacet.address);
  
    // deploy Diamond
    // const Diamond = await ethers.getContractFactory("Diamond");
    // const diamond = await Diamond.deploy(
    //   contractOwner.address,
    //   diamondCutFacet.address
    // );
    // await diamond.deployed();
    // console.log("Diamond deployed:", diamond.address);
  
    // deploy DiamondInit
    // DiamondInit provides a function that is called when the diamond is upgraded to initialize state variables
    // Read about how the diamondCut function works here: https://eips.ethereum.org/EIPS/eip-2535#addingreplacingremoving-functions
    // const DiamondInit = await ethers.getContractFactory("demoFaucet");
    // const diamondInit = await DiamondInit.deploy();
    // await diamondInit.deployed();
    // console.log("DiamondInit deployed:", diamondInit.address);

    //interacting with already deployed diamond address
    const facetAddr = await ethers.getContractAt( "demoFaucet3",DiamondAddress);
    const tx1 = await facetAddr.demoFunction1(4);
    console.log(tx1);
    
    
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  if (require.main === module) {
    deployDiamond()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  }
  
  exports.deployDiamond = deployDiamond;