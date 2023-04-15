import { SafeOnRampKit, StripeAdapter } from "@safe-global/onramp-kit";

const fundWallet = async function () {
  const safeOnRamp = await SafeOnRampKit.init(
    new StripeAdapter({
      // Get public key from Stripe: https://dashboard.stripe.com/register
      stripePublicKey:
        "pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO",
      // Deploy your own server: https://github.com/5afe/aa-stripe-service
      onRampBackendUrl: "https://aa-stripe.safe.global",
    })
  );

  // See options for using the StripeAdapter open method in:
  // https://stripe.com/docs/crypto/using-the-api
  const sessionData = await safeOnRamp.open({
    element: "#stripe-root",
    theme: "light",
    // Optional, if you want to use a specific created session
    // ---
    // sessionId: 'cos_1Mei3cKSn9ArdBimJhkCt1XC',
    // Optional, if you want to specify default options
    // ---
    // defaultOptions: {
    // transaction_details: {
    //   wallet_address: walletAddress,
    //   lock_wallet_address: true
    //   supported_destination_networks: ['ethereum', 'polygon'],
    //   supported_destination_currencies: ['usdc'],
    // },
    // customer_information: {
    //   email: 'john@doe.com'
    // }
  });

  // Subscribe to Stripe events
  safeOnRamp.subscribe("onramp_ui_loaded", () => {
    console.log("UI loaded");
  });

  safeOnRamp.subscribe("onramp_session_updated", (e) => {
    console.log("Session Updated", e.payload);
  });
};
