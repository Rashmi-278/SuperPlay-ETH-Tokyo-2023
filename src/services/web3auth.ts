import { Provider, Web3Provider } from "@ethersproject/providers";
import { Web3Auth } from "@web3auth/modal";
import { SafeEventEmitterProvider } from "@web3auth/base/dist/types";
import { OpenloginUserInfo } from "@toruslabs/openlogin";

class Web3AuthService {
  private web3Auth: Web3Auth;
  private web3AuthProvider: SafeEventEmitterProvider;
  private web3Provider: Web3Provider;
  private chainId: string;

  async connect(chainId: string): Promise<Provider> {
    this.web3Auth = new Web3Auth({
      chainConfig: {
        chainNamespace: "eip155",
        chainId,
      },
      clientId:
        "BE8StSbhTkPm29RxI4mckB-TtOKnhggiIlSWlPKBkpOAtiOW4KIhZKDexcgzgK49X6-lATXQAoGOffgXJ1oittc",
    });

    await this.web3Auth.initModal({});
    const web3AuthProvider = await this.web3Auth.connect();
    if (!web3AuthProvider) {
      throw new Error("Could not connect to Web3Auth provider.");
    }

    this.web3AuthProvider = web3AuthProvider;
    this.chainId = chainId;
    this.web3Provider = new Web3Provider(web3AuthProvider);
    return this.web3Provider;
  }

  async getInfo(): Promise<Partial<OpenloginUserInfo>> {
    if (!this.web3AuthProvider)
      throw new Error("Not connected to Web3Auth provider.");

    return this.web3Auth.getUserInfo();
  }

  getChainId(): string {
    if (!this.web3AuthProvider)
      throw new Error("Not connected to Web3Auth provider.");

    return this.chainId;
  }

  getProvider(): Web3Provider {
    if (!this.web3AuthProvider)
      throw new Error("Not connected to Web3Auth provider.");

    return this.web3Provider;
  }
}

export const web3AuthService = new Web3AuthService();
