const ocrDocRouter = require("express").Router();

const businessRegistrationRouter = require("./business-registration/business-registration.router");
const businessRegistrationAttachRouter = require("./business-registration-attach/business-registration-attach.router");

//* OCR Type 라우팅
ocrDocRouter.use("/business-registration", businessRegistrationRouter);
ocrDocRouter.use(
  "/business-registration-attah",
  businessRegistrationAttachRouter
);

module.exports = ocrDocRouter;
