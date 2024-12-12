const statusDocRouter = require("express").Router();

const businessRegistrationStatusRouter = require("./business-registration/business-registration.router");

//* OCR Type 라우팅
statusDocRouter.use("/business-registration", businessRegistrationStatusRouter);

module.exports = statusDocRouter;
