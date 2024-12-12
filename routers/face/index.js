const faceRouter = require("express").Router();

const matchRouter = require("./match/match.router");
const livenessRouter = require("./liveness/liveness.router");

//* Face 라우팅
faceRouter.use("/match", matchRouter);
faceRouter.use("/liveness", livenessRouter);

module.exports = faceRouter;
