const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "useB.API Doc",
      description: "A Leading Expert in Regtech, useB.",
    },
    servers: [
      {
        url: "https://api3.useb.co.kr", // OCR, Status, Masking, Face
      },
      {
        url: "https://auth.useb.co.kr", // Oauth, Encrypt
      },
      {
        url: "https://openapi.useb.co.kr", // Openbank, firmbank, firmbank-custom
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        basicAuth: {
          type: "http",
          scheme: "basic",
        },
      },
    },
    security: [
      {
        bearerAuth: [], // 모든 API에 기본적으로 Bearer 인증이 적용되도록 설정
      },
    ],
  },
  apis: [
    // Common
    "./routers/common/*.js",
    // OCR
    "./routers/*.js",
    "./routers/ocr/*.js",
    "./routers/ocr/idcard-driver/*.js",
    "./routers/ocr/passport/*.js",
    "./routers/ocr/passport-overseas/*.js",
    "./routers/ocr/alien/*.js",
    "./routers/ocr/alien-back/*.js",
    "./routers/ocr-doc/business-registration/*.js",
    "./routers/ocr-doc/business-registration-attach/*.js",
    // 진위확인
    "./routers/status/idcard/*.js",
    "./routers/status/driver/*.js",
    "./routers/status/passport/*.js",
    "./routers/status/passport-overseas/*.js",
    "./routers/status/passport-overseas-detail/*.js",
    "./routers/status/alien/*.js",
    "./routers/status/alien-job/*.js",
    "./routers/status-doc/business-registration/*.js",
    // Masking
    "./routers/masking/idcard/*.js",
    "./routers/masking/driver/*.js",
    "./routers/masking/passport/*.js",
    "./routers/masking/alien/*.js",
    // Face
    "./routers/face/match/*.js",
    "./routers/face/liveness/*.js",
    //Oauth
    "./routers/Oauth/get-client-secret/*.js",
    "./routers/Oauth/token/*.js",
    //Ecrypt
    "./routers/AESencrypt/generate-key-pair/*.js",
    "./routers/AESencrypt/register-public-key/*.js",
    "./routers/AESencrypt/exchange-keys/*.js",
    "./routers/AESencrypt/extract-keys/*.js",
    "./routers/AESencrypt/encrypt/*.js",
    "./routers/AESencrypt/decrypt/*.js",
    // 1Won
    "./routers/account/openBankRealname/*.js",
    "./routers/account/openBankSend/*.js",
    "./routers/account/openBankVerify/*.js",
    "./routers/account/firmBankSend/*.js",
    "./routers/account/firmBankVerify/*.js",
    "./routers/account/firm-CustomRealname/*.js",
    "./routers/account/firm-CustomSend/*.js",
    "./routers/account/firm-CustomVerify/*.js",
  ], //Swagger 파일 연동
};

const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };
