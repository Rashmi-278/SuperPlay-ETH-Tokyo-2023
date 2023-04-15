import { Framework } from "@superfluid-finance/sdk-core";
import { web3AuthService } from "./web3Auth";
import { formatEther } from "ethers/lib/utils";
import { Contract } from "@ethersproject/contracts";
import SuperPlayABI from "./SuperPlay.json";

type FlowInfo = {
  balance: string; // for display, formatted
  rate: string; // for display, formatted
};

class SuperFluidService {
  private sf: Framework;

  async getInfo(gameId: number, superPlayAddress: string): Promise<FlowInfo> {
    const superPlay = new Contract(
      superPlayAddress,
      SuperPlayABI.abi,
      web3AuthService.getProvider().getSigner()
    );
    const { token, receiver } = await superPlay.games(gameId);

    return this._getFlowInfo(token, receiver);
  }

  async _getFlowInfo(superToken: string, receiver: string): Promise<FlowInfo> {
    const token = await this.sf.loadSuperToken(superToken);

    const signer = web3AuthService.getProvider().getSigner();
    const sender = await signer.getAddress();
    const res = await token.getFlow({
      sender: sender,
      receiver,
      providerOrSigner: signer,
    });

    return {
      balance: formatEther(
        await token.balanceOf({ account: sender, providerOrSigner: signer })
      ),
      rate: formatEther(res.flowRate),
    };
  }

  async _prepare() {
    if (this.sf) return this.sf;

    this.sf = await Framework.create({
      chainId: parseInt(web3AuthService.getChainId()),
      provider: web3AuthService.getProvider(),
    });
  }
}

export const superFluidService = new SuperFluidService();
