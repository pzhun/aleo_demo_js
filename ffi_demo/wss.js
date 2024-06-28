const WebSocket = require("ws");
const currentWorkingDirectory = process.cwd();

const ffi = require("ffi-napi");
const rustLib = ffi.Library(currentWorkingDirectory + "/libaleo_rust.so", {
  numbers_add: ["int", ["int", "int"]],
  try_transfer: [
    "string",
    ["string", "string", "string", "int", "int", "string", "string", "string"],
  ],
});

const url = "https://api.explorer.aleo.org/v1";
const private_key = "APrivateKey1xxxx";
const recipient = "aleo1xxxxx";

const amount_credits = 1000000;
const fee_credits = 1000000;
const transfer_type = "transfer_public"; /// 转账方法

/// 公开转账record为空
const amount_record = "";
const fee_record = "";

const hash = rustLib.try_transfer(
  private_key,
  recipient,
  transfer_type,
  amount_credits,
  fee_credits,
  url,
  amount_record,
  fee_record
);

console.log(hash);
