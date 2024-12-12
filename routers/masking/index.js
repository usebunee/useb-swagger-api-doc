const maskingRouter = require("express").Router();

const idcardRouter = require("./idcard/idcard.router");
const driverRouter = require("./driver/driver.router");
const passportRouter = require("./passport/passport.router");
const alienRouter = require("./alien/alien.router");

//* OCR Type 라우팅
maskingRouter.use("/idcard", idcardRouter);
maskingRouter.use("/driver", driverRouter);
maskingRouter.use("/passport", passportRouter);
maskingRouter.use("/alien", alienRouter);

module.exports = maskingRouter;
