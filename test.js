import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const provider = new ethers.providers.InfuraProvider(
  "matic",
  "e3aec91d6f8948e2bb78ca2b1986fb0e"
);

const sf = await Framework.create({
  chainId: 137,
  provider
});

const daix = await sf.loadSuperToken("DAIx");

// Read example
const flowInfo = await daix.getFlow({
  sender: "0x...",
  receiver: "0x...",
  providerOrSigner: provider
});
console.log("flowInfo", flowInfo);

// Write operation example
const signer = sf.createSigner({ privateKey: "<TEST_ACCOUNT_PRIVATE_KEY>", provider });
const createFlowOperation = daix.createFlow({
  sender: "0x...",
  receiver: "0x...",
  flowRate: "1000000000"
});
const txnResponse = await createFlowOperation.exec(signer);
const txnReceipt = await txnResponse.wait();
// Transaction Complete when code reaches here