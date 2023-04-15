import type { NextApiRequest, NextApiResponse } from "next";

import { ethers } from "ethers";
import Safe, {
  AddOwnerTxParams,
  EthersAdapter,
} from "@safe-global/protocol-kit";
import { SafeFactory } from "@safe-global/protocol-kit";
import { SafeAccountConfig } from "@safe-global/protocol-kit";
import { update } from "immutable";

//process.env.ALCHEMY_MUMBAI_URL

let acc0 = process.env.ETHEREUM_PRIVATE_KEY as string;
// goerli deploys
let gameGuard = "0x2D00A3F404AEaea97E929766d595A90D8bE0554d";
let moduleAddress = "0xc074Dca6083ccD17872394c8A58Cb79Ac660Ac3d";

const provider = new ethers.providers.JsonRpcProvider(
  process.env.ALCHEMY_GOERLI_URL
);
const dev = new ethers.Wallet(acc0, provider);

async function updateOwners(safeInstance: any, newOwner: string) {
  let params: AddOwnerTxParams = {
    ownerAddress: newOwner,
    threshold: 1,
  };

  let ret = [];

  let safeTX = await safeInstance.createAddOwnerTx(params);
  let txResponse = await safeInstance.executeTransaction(safeTX);
  await txResponse.transactionResponse?.wait();

  console.log("Adding new owner: ", txResponse);

  params = {
    ownerAddress: await dev.getAddress(),
    threshold: 1,
  };

  safeTX = await safeInstance.createRemoveOwnerTx(params);
  txResponse = await safeInstance.executeTransaction(safeTX);
  await txResponse.transactionResponse?.wait();

  console.log("Removing dev: ", txResponse);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { ethAddress } = req.body; // body only contains ETH address

    // if (!ethers.utils.isAddress(ethAddress)) return;

    // get signers
    const owner1Signer = new ethers.Wallet(acc0, provider);
    const ethAdapterOwner1 = new EthersAdapter({
      ethers,
      signerOrProvider: owner1Signer,
    });

    // create safe config
    const safeFactory = await SafeFactory.create({
      ethAdapter: ethAdapterOwner1,
    });
    const safeAccountConfig: SafeAccountConfig = {
      owners: [
        await owner1Signer.getAddress(), // set original owner to be server
      ],
      threshold: 1,
    };

    // create safe for user
    const safeInstance = await safeFactory.deploySafe({ safeAccountConfig });
    const safeAddress = safeInstance.getAddress();

    // enable superfluid module
    let safeTX = await safeInstance.createEnableModuleTx(moduleAddress);
    let txResponse = await safeInstance.executeTransaction(safeTX);
    await txResponse.transactionResponse?.wait();

    await updateOwners(safeInstance, ethAddress);

    // enable guard - final step
    // safeTX = await safeInstance.createEnableGuardTx(gameGuard)
    // txResponse = await safeInstance.executeTransaction(safeTX)
    // await txResponse.transactionResponse?.wait()

    const modules = await safeInstance.getModules();
    const guardAddress = await safeInstance.getGuard();

    console.log(safeAddress, modules, guardAddress);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    // @ts-ignore
    res.status(500).send({ success: false, error: error.message });
  }
}
