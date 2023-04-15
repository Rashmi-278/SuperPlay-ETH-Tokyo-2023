import { Provider, Web3Provider } from "@ethersproject/providers";
import { Web3Auth } from "@web3auth/modal";
import { SafeEventEmitterProvider } from "@web3auth/base/dist/types";
import { OpenloginUserInfo } from "@toruslabs/openlogin";

class Web3AuthService {
  private web3Auth: Web3Auth;
  private web3AuthProvider: SafeEventEmitterProvider;

  async connect(chainId: string): Promise<Provider> {
    this.web3Auth = new Web3Auth({
      chainConfig: {
        chainNamespace: "eip155",
        chainId,
      },
      clientId:
        "BBxeOVZDPiBp_De5EEUhNF9ij10IbNJviC97g1ZdzBcOC0foOYKYLLwbRNm-2BScIj5xceXSVTTcFenwIontCSQ",
    });

    const web3AuthProvider = await this.web3Auth.connect();
    if (!web3AuthProvider) {
      throw new Error("Could not connect to Web3Auth provider.");
    }

    this.web3AuthProvider = web3AuthProvider;
    return new Web3Provider(web3AuthProvider);
  }

  async getInfo(): Promise<Partial<OpenloginUserInfo>> {
    if (!this.web3AuthProvider)
      throw new Error("Not connected to Web3Auth provider.");

    return this.web3Auth.getUserInfo();
  }
}

export const web3AuthService = new Web3AuthService();
