const oauthRouter = require("express").Router();

const clientSecretRouter = require("./get-client-secret/clientSecret.router");
const tokenRouter = require("./token/token.router");

// oauth 라우팅
oauthRouter.use("/get-client-secret", clientSecretRouter);
oauthRouter.use("/token", tokenRouter);

module.exports = oauthRouter;
