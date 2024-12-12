const ocrRouter = require("express").Router();

const idcardDriverRouter = require("./idcard-driver/idcard-driver.router");
const passportRouter = require("./passport/passport.router");
const passportOverseasRouter = require("./passport-overseas/passport-overseas.router");
const alienRouter = require("./alien/alien.router");
const alienBackRouter = require("./alien-back/alien-back.router");

//* OCR Type 라우팅
ocrRouter.use("/idcard-driver", idcardDriverRouter);
ocrRouter.use("/passport", passportRouter);
ocrRouter.use("/passport-overseas", passportOverseasRouter);
ocrRouter.use("/alien", alienRouter);
ocrRouter.use("/alien-back", alienBackRouter);

module.exports = ocrRouter;
