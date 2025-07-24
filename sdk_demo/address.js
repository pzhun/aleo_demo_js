const bip39 = require("bip39");
const { derivePath } = require("@demox-labs/aleo-hd-key");
const { PrivateKey, ViewKey, Address } = require("@spike.hmc/aleo-wasm");

const mnemonic =
  "fly lecture gasp juice hover ice business census bless weapon polar upgrade";
const path = `m/44'/0'/0'/0'`;
const rootSeed = bip39.mnemonicToSeedSync(mnemonic);

const { seed } = derivePath(path, rootSeed);

const privateKey = PrivateKey.from_seed_unchecked(seed);

console.log(privateKey.to_string());

const viewKey = ViewKey.from_private_key(privateKey);
console.log(viewKey.to_string());

const address1 = Address.from_view_key(viewKey);
console.log(address1.to_string());
