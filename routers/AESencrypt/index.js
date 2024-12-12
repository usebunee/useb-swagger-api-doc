const AESencryptRouter = require("express").Router();

const generateKeyPairRouter = require("./generate-key-pair/generateKeyPair.router");
const registerPublicKeyRouter = require("./register-public-key/registerPublicKey.router");
const exchangeKeysRouter = require("./exchange-keys/exchangeKeys.router");
const extractKeysRouter = require("./extract-keys/extractKeys.router");
const encryptRouter = require("./encrypt/encrypt.router");
const decryptRouter = require("./decrypt/decrypt.router");

// Encrypt 라우팅
AESencryptRouter.use("/generate-key-pair", generateKeyPairRouter);
AESencryptRouter.use("/generate-key-pair", generateKeyPairRouter);
AESencryptRouter.use("/register-public-key", registerPublicKeyRouter);
AESencryptRouter.use("/exchange-keys", exchangeKeysRouter);
AESencryptRouter.use("/extract-keys", extractKeysRouter);
AESencryptRouter.use("/encrypt", encryptRouter);
AESencryptRouter.use("/decrypt", decryptRouter);

module.exports = AESencryptRouter;
