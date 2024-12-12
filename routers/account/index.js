const accountRouter = require("express").Router();
const openBankRealnameRouter = require("./openBankRealname/openBankRealname.router.js");
const openBankSendRouter = require("./openBankSend/openBankSend.router.js");
const openBankVerifyRouter = require("./openBankVerify/openBankVerify.router.js");
const firmBankSendRouter = require("./firmBankSend/firmBank.router.js");
const firmBankVerifyRouter = require("./firmBankVerify/firmBankVerify.router.js");
const firmCustomRealnameRouter = require("./firm-CustomRealname/firm-CustomRealname.router.js");
const firmCustomSendRouter = require("./firm-CustomSend/firm-CustomSend.router.js");
const firmCustomVerifyRouter = require("./firm-CustomVerify/firm-CustomVerify.router.js");

//* OCR Type 라우팅
accountRouter.use("/openBankRealname", openBankRealnameRouter);
accountRouter.use("/openBankSend", openBankSendRouter);
accountRouter.use("/openBankVerify", openBankVerifyRouter);
accountRouter.use("/firmBankSend", firmBankSendRouter);
accountRouter.use("/firmBankVerify", firmBankVerifyRouter);
accountRouter.use("/firm-CustomRealname", firmCustomRealnameRouter);
accountRouter.use("/firm-CustomSend", firmCustomSendRouter);
accountRouter.use("/firm-CustomVerify", firmCustomVerifyRouter);

module.exports = accountRouter;
