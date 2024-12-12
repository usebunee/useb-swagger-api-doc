const commonRouter = require("express").Router();

/**
 * @swagger
 *
 * /{endpoint}:
 *   get:
 *     summary: "필독사항"
 *     description: |
 *       <h3>HTTP Status Code</h3>
 *
 *       | Code | Name                   | Description                                                         |
 *       |------|------------------------|---------------------------------------------------------------------|
 *       | `200` | <h4>OK</h4>   | <h4>정상호출</h4> |
 *       | `400` | <h4>Bad Request</h4>   | <h4>잘못된 Content-type 또는 parameter로 요청한 경우</h4> |
 *       | `401` | <h4>Unauthorized</h4>   | <h4>토큰이 없거나 잘못된 값인 경우, 토큰이 만료된 경우</h4> |
 *       | `403` | <h4>Fobidden</h4>   | <h4>이용하고자 하는 API 서비스가 사용 가능 scope에 포함되지 않거나, HTTPS가 아닌 HTTP 호출을 한 경우</h4> |
 *       | `404` | <h4>Not Found</h4>   | <h4>잘못된 URL로 호출 한 경우</h4> |
 *       | `405` | <h4>Method Not Allowed</h4>  | <h4>잘못된 Method로 호출한 경우</h4> |
 *       | `500` | <h4>Server Error</h4>   | <h4>정상 호출을 요청했으나 정부기관 서버 점검 시간, 정부기관 서버 장애, 유스비 API 서버 오류인 경우</h4> |
 *
 *     tags: [Common]
 *     responses:
 *       C001:
 *         description: 잘못된 Content-type으로 요청했을 경우 `content type invalid`
 *       C002:
 *         description: json 형식으로 보내지 않은 경우 `json format error`
 *       C004:
 *         description: 서비스가 중지된 이후에 토큰 발급을 시도하는 경우 `account suspended`
 *       C011:
 *         description: Bearer Token 형식이 아닌 경우, 토큰이 없거나 잘못된 값인 경우 `toekn invalid`
 *       C013:
 *         description: 다른 서버에서 생성한 토큰인 경우 `token issuer mismatch`
 *       C016:
 *         description:  |
 *          정부기관 네트워크 오류, 네트워크 상태 확인 필요 `network time out`
 *          - **긴급한 정부기관 점검 및 변경으로 발생할 수 있는 오류 입니다. 해당 에러 발생시에 다른 신분증을 활용해 달라는 메세지를 프론트 화면에 세팅해 놓는 것을 권장 드립니다.** `prepare goverment agency issues`
 *       C021:
 *         description: 이용하고자 하는 API 서비스가 사용 가능 scope에 포함되어 있지 않은 경우 `scope invalid`
 *       C022:
 *         description: HTTPS가 아닌 HTTP 호출을 한 경우 `http not allowd`
 *       C031:
 *         description: 잘못된 URL로 요청한 경우 `url invalid`
 *       C041:
 *         description: 잘못된 URL로 요청한 경우 `method not allowed`
 *       C061:
 *         description:  |
 *          정부기관 서버 점검 시간이거나 정부기관 서버 장애인 경우 `server error`
 *          - **긴급한 정부기관 점검 및 변경으로 발생할 수 있는 오류 입니다. 해당 에러 발생시에 다른 신분증을 활용해 달라는 메세지를 프론트 화면에 세팅해 놓는 것을 권장 드립니다.** `prepare goverment agency issues`
 *       C071:
 *         description: 테스트 계정의 테스트 한도 횟수를 초과한 경우, (cs팀 문의 필요) `out of credit`
 *       C413:
 *         description: 호출하는 파일의 크기가 5MB 이상인 경우 `payload too large`
 *       C429:
 *         description: 처리 가능 호출 수를 초과한 경우 (동시 다량의 API 호출한 경우) `too many requests`
 *       C504:
 *         description:  |
 *          API 호출 후 응답이 지연되는 경우 (15초 이상 지연될 경우) `gateway time out`
 *          - **긴급한 정부기관 점검 및 변경으로 발생할 수 있는 오류 입니다. 해당 에러 발생시에 다른 신분증을 활용해 달라는 메세지를 프론트 화면에 세팅해 놓는 것을 권장 드립니다.** `prepare goverment agency issues`
 */

commonRouter.post("/common");

module.exports = commonRouter;
