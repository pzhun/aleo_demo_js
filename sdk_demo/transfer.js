import {
  Account,
  ProgramManager,
  AleoKeyProvider,
  NetworkRecordProvider,
  AleoNetworkClient,
} from "@aleohq/sdk";

const sender = {
  address: "aleo1xxxx",
  private_key: "APrivateKey1xxxxx",
};
const receiver = {
  address: "aleo1xxxx",
  private_key: "APrivateKey1xxxx",
};

// curl 23.20.9.85:3030/testnet/latest/height
async function transfer() {
  const privateKey = sender.private_key;
  const received = receiver.address;
  const rpc = "http://23.20.9.85:3030";

  /// 创建账户
  const account = new Account({ privateKey });

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

  const address = account.address().to_string();
  
  console.log(await networkClient.getLatestBlock());
  console.log(
    await networkClient.getProgramMappingValue(
      "credits.aleo",
      "account",
      address
    )
  );

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
