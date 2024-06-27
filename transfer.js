import {
  Account,
  ProgramManager,
  AleoKeyProvider,
  NetworkRecordProvider,
  AleoNetworkClient,
} from "@aleohq/sdk";

const sender = {
  address: "aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px",
  path: `m/44'/0'/0'/0'`,
  view_key: "AViewKey1mSnpFFC8Mj4fXbK5YiWgZ3mjiV8CxA79bYNa8ymUpTrw",
  private_key: "APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH",
};
const receiver = {
  address: "aleo127c79p7k4jj9e2c8kwwqsn5qkavun07etkyqpr795eyrdnyh3uzqnf8nfn",
  path: `m/44'/0'/0'/0'`,
  view_key: "AViewKey1tQY7eCFZhX6wxNDpuTeBoCQEn3KsmmwoY9rUBWhxBdjp",
  private_key: "APrivateKey1zkpC2CbihCvUyg8zcNXTngzGpmCzKTF8uZP4jfyu3LdfT8v",
};

const privateKey = sender.private_key;
const received = receiver.address;
const account = new Account({ privateKey });
const rpc = "";
const networkClient = new AleoNetworkClient(rpc);

const keyProvider = new AleoKeyProvider();
keyProvider.cacheOption = true;

const recordProvider = new NetworkRecordProvider(account, networkClient);
const programManager = new ProgramManager(rpc, keyProvider, recordProvider);
programManager.setAccount(account);

class AleoProgram {
  async transfer() {
    networkClient.setAccount(account);
    const tx_id = await programManager.transfer(
      1,
      received,
      "transfer_private",
      0.1
    );
    return tx_id;
  }
}
export default new AleoProgram();
