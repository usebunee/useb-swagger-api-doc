//express 모듈 불러오기
const express = require("express");
const api = require("./routers");

//express 사용
const app = express();

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

//! DisableTryItOutPlugin 정의 -> Try it out 전역으로 비활성 처리 로직
// const DisableTryItOutPlugin = function () {
//   return {
//     statePlugins: {
//       spec: {
//         wrapSelectors: {
//           allowTryItOutFor: () => () => false, // 'try it out' 버튼 비활성화
//         },
//       },
//     },
//   };
// };

// swaggerOptions 설정
const swaggerOptions = {
  swaggerOptions: {
    supportedSubmitMethods: ["post"], // Try it out GET 제외
    // plugins: [DisableTryItOutPlugin], // 'Try it out' 비활성화 플러그인 추가
  },
};

const { swaggerUi, specs } = require("./swagger/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

// http listen port 생성 서버 실행
app.listen(3000, () => {
  console.log("useB. Swagger API doc :)");
  console.log("Swagger UI is available at: http://localhost:3000/api-docs/#/");
});
