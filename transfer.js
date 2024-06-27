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

async function transfer() {
  const privateKey = sender.private_key;
  const received = receiver.address;
  const account = new Account({ privateKey });  // 创建账户
  const rpc = "";

  /// 节点
  const networkClient = new AleoNetworkClient(rpc); 

  /// 零知识证明相关
  const keyProvider = new AleoKeyProvider();
  keyProvider.cacheOption = true;  

  /// 提供utxo
  const recordProvider = new NetworkRecordProvider(account, networkClient);

  /// 程序管理
  const programManager = new ProgramManager(rpc, keyProvider, recordProvider);
  programManager.setAccount(account);
  networkClient.setAccount(account);

  /// 发送交易
  const tx_id = await programManager.transfer(
    1,
    received,
    "transfer_private",
    0.1
  );
  return tx_id;
}

transfer();
