const statusRouter = require("express").Router();

const idcardStatusRouter = require("./idcard/idcard.router");
const driverStatusRouter = require("./driver/driver.router");
const passportStatusRouter = require("./passport/passport.router");
const passportOverseasStatusRouter = require("./passport-overseas/passport-overseas.router");
const passportOverseasDetailStatusRouter = require("./passport-overseas-detail/passport-overseas-detail.router");
const alienStatusRouter = require("./alien/alien.router");
const alienJobStatusRouter = require("./alien-job/alien-job.router");

//* OCR Type 라우팅
statusRouter.use("/idcard", idcardStatusRouter);
statusRouter.use("/driver", driverStatusRouter);
statusRouter.use("/passport", passportStatusRouter);
statusRouter.use("/passport-overseas", passportOverseasStatusRouter);
statusRouter.use(
  "/passport-overseas-detail",
  passportOverseasDetailStatusRouter
);
statusRouter.use("/alien", alienStatusRouter);
statusRouter.use("/alien-job", alienJobStatusRouter);

module.exports = statusRouter;
