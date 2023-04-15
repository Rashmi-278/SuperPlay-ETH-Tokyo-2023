# SuperPlay
![Banner - Landscape - Special Offer - Up to 50% - Earphone bluetooth](https://user-images.githubusercontent.com/45459057/232254213-55153121-8630-4029-aaa8-388f6279ee3f.png)

## Pitch deck
https://tome.app/super-play/superplay-eth-global-tokyo-clghe2hqm08gl8x40sfbt81qe

## **User Story**

As a gamer, I want to try out web3 games without having to go through the hassle of setting up a wallet and buying assets, so that I can understand how to play the game with no knowledge about crypto. 

## **User Experience**

1. I visit the gaming project's website and register my email address to create a wallet.
2. Upon registration, the system automatically creates a subdomain of ENS for my wallet.
3. The private key is sent to my email address, which I can use to access my wallet.
4. Inside the wallet, I own a small amount of the gaming project's ERC20 token, which is used for the subscription.
5. I can start playing the game without using any assets in my wallet for a limited time (e.g., 1 week).
6. During the trial, the gaming project covers the gas fees for my transactions using Biconomy.
7. After the trial, I can choose to subscribe to the game by paying a fee in the gaming project's ERC20 token, which will be charged to my wallet automatically every week.

SuperPlay aims to provide a streamlined and user-friendly onboarding process for new players by removing the complexity of setting up a wallet and buying assets. The use of contract wallets and gas-less transactions with Safe Onramp and Relay Kits enables a seamless payment experience with credit cards, reducing the need for users to hold cryptocurrency or understand gas fees.

Additionally, by providing a limited time trial period with a small amount of the gaming project's ERC20 token, SuperPlay allows users to try out the game without any investment, reducing the barrier to entry and encouraging more users to explore decentralized gaming.

Overall, SuperPlay's UX optimization strategies aim to create a user-friendly and accessible environment that allows both seasoned and non-technical users to experience and enjoy decentralized gaming with ease.

Account abstraction: https://github.com/Rashmi-278/SuperPlay-ETH-Tokyo-2023/blob/2946e863287379b8b9c0e9a41c67c488f555df04/pages/api/create_safe.ts#L60

## **Features**

- Email registration to create a wallet
- Automatic subdomain creation using ENS
- Limited time trial without requiring any assets in the wallet
- Subscription service using the gaming project's ERC20 token
- Gas fee coverage during the trial using Biconomy


# Example app with [chakra-ui](https://github.com/chakra-ui/chakra-ui) and TypeScript

This example features how to use [chakra-ui](https://github.com/chakra-ui/chakra-ui) as the component library within a Next.js app with TypeScript.

Next.js and chakra-ui have built-in TypeScript declarations, so we'll get autocompletion for their modules straight away.

We are connecting the Next.js `_app.js` with `chakra-ui`'s Provider and theme so the pages can have app-wide dark/light mode. We are also creating some components which shows the usage of `chakra-ui`'s style props.

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-chakra-ui)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-chakra-ui&project-name=with-chakra-ui&repository-name=with-chakra-ui)

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-chakra-ui with-chakra-ui-app
```

```bash
yarn create next-app --example with-chakra-ui with-chakra-ui-app
```

```bash
pnpm create next-app --example with-chakra-ui with-chakra-ui-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Notes

Chakra has supported Gradients and RTL in `v1.1`. To utilize RTL, [add RTL direction and swap](https://chakra-ui.com/docs/features/rtl-support).

If you don't have multi-direction app, you should make `<Html lang="ar" dir="rtl">` inside `_document.ts`.
