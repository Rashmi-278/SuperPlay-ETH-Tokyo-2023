import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import {
  MetaTransactionData,
  OperationType,
} from "@safe-global/safe-core-sdk-types";
import { BigNumberish, Contract, ethers } from "ethers";
import { web3AuthService } from "./web3Auth";

export class SafeService {
  private safeSDK: Safe;

  static async create(safeAddress: string) {
    const safeService = new SafeService();
    safeService._prepare(safeAddress);

    return safeService;
  }

  async sendTransaction(
    contract: Contract,
    fn: string,
    args: any[],
    options: {
      value: BigNumberish;
    }
  ): Promise<any> {
    const unsignedTx = await contract.populateTransaction[fn](...args);
    const safeTransactionData: MetaTransactionData = {
      to: contract.address,
      value: options.value.toString(),
      data: unsignedTx.data,
      operation: OperationType.Call,
    };

    const safeTransaction = await this.safeSDK.createTransaction({
      safeTransactionData,
    });
    const signedSafeTx = await this.safeSDK.signTransaction(safeTransaction);
    const encodedTx = this.safeSDK
      .getContractManager()
      .safeContract.encode("execTransaction", [
        signedSafeTx.data.to,
        signedSafeTx.data.value,
        signedSafeTx.data.data,
        signedSafeTx.data.operation,
        signedSafeTx.data.safeTxGas,
        signedSafeTx.data.baseGas,
        signedSafeTx.data.gasPrice,
        signedSafeTx.data.gasToken,
        signedSafeTx.data.refundReceiver,
        signedSafeTx.encodedSignatures(),
      ]);

    // todo send to server and get response
  }

  async _prepare(safeAddress: string) {
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: web3AuthService.getProvider(),
    });

    this.safeSDK = await Safe.create({
      ethAdapter,
      safeAddress,
    });
  }
}
