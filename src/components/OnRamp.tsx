import { SafeOnRampKit, StripeAdapter } from "@safe-global/onramp-kit";
import React, { useState } from "react";

function WalletFund({ defaultAddress }: { defaultAddress?: string }) {
  const [address, setAddress] = useState<string>(defaultAddress || "");

  function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAddress(event.target.value);
  }

  const fundWallet = async function () {
    const safeOnRamp = await SafeOnRampKit.init(
      new StripeAdapter({
        // Get public key from Stripe: https://dashboard.stripe.com/register
        stripePublicKey:
          "pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO",
        // Deploy your own server: https://github.com/safe-global/safe-core-sdk/tree/main/packages/onramp-kit/example/server
        onRampBackendUrl: "https://aa-stripe.safe.global",
      })
    );

    // See options for using the StripeAdapter open method in:
    // https://stripe.com/docs/crypto/using-the-api
    await safeOnRamp.open({
      element: "#stripe-root",
      theme: "light",
      defaultOptions: {
        customer_wallet_address: address,
        transaction_details: {
          destination_network: "ethereum",
          destination_currency: "usdc",
        },
      },
    });
  };

  return (
    <div id="stripe-root">
      <label>Destination Address</label>
      <input
        className="form-control mb-3"
        value={address}
        onChange={handleAddressChange}
      />
      <button className="btn btn-primary my-2" onClick={fundWallet}>
        Fund Wallet
      </button>
    </div>
  );
}

export default WalletFund;
