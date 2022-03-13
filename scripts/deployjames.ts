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
  
    //Add new facet to already deployed contract
    // deploy facets
    console.log("");
    console.log("Deploying facets");
    const cut = [];
      const Facet = await ethers.getContractFactory("demoFaucet3");
      const facet = await Facet.deploy();
      await facet.deployed();
      console.log(`${Facet} deployed: ${facet.address}`);
      cut.push({
        facetAddress: facet.address,
        action: FacetCutAction.Add,
        functionSelectors: getSelectors(facet),
      });
      
    // upgrade diamond with facets
    console.log("");
    console.log("Diamond Cut:", cut);
    const diamondCut = (await ethers.getContractAt(
      "IDiamondCut",
      DiamondAddress
    )) as DiamondCutFacet;
    let tx;
    let receipt: ContractReceipt;
    // call to init function
    let functionCall = facet.interface.encodeFunctionData("demoFunction1",["1"]);
    tx = await diamondCut.diamondCut(cut, DiamondAddress, functionCall);
    console.log("Diamond cut tx: ", tx.hash);

    // const facetAddr = await ethers.getContractAt(DiamondAddress, "demoFaucet2");
    // const tx1 = await facetAddr.demoFunction(4);
    // console.log(tx1);
    
    receipt = await tx.wait();
    if (!receipt.status) {
      throw Error(`Diamond upgrade failed: ${tx.hash}`);
    }
    console.log("Completed diamond cut");
    DiamondAddress = DiamondAddress;
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