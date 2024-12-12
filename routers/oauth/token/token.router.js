const express = require("express");
const tokenRouter = express.Router();

//! 토큰생성
/**
 * @swagger
 * paths:
 *   /oauth/token:
 *     post:
 *       summary: 토큰 생성 (OCR, 마스킹, 진위확인, 1원계좌인증, 안면인증)
 *       tags: [Oauth]
 *       description: |
 *         이 API는 클라이언트 인증 정보를 사용하여 JWT 토큰을 반환합니다.
 *
 *         Swagger UI에서 우측 상단 **Authorize** 버튼을 클릭하고, Basic Auth 방식으로 `client_id`와 `client_secret`을 입력하여 인증을 진행해주세요.
 *
 *         **Authorization 헤더 설정은 Swagger UI에서 자동으로 처리됩니다.** 별도로 헤더를 수동으로 추가할 필요가 없습니다.
 *       security:
 *         - basicAuth: []   # Basic 필수 설정
 *       responses:
 *         200:
 *           description: OK - `C000`
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: 성공여부 (`true`)
 *                   message:
 *                     type: string
 *                     description: 결과메세지 (`Token issued successfully`)
 *                   jwt:
 *                     type: string
 *                     description: Json Web Token (`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTk4NjE5NDAsImV4cCI6MTYyMDQ2Njc0MCwiaXNzIjoiaHR0cHM6XC9cL2FwaTMudXNlYi5jby5rciIsImRhdGEiOnsiaWQiOiIzIiwiZmlyc3RuYW1lIjoidXNlYiIsImxhc3RuYW1lIjoidXNlYiIsImVtYWlsIjoiYWJsZW1hbjgyQHVzZWIuY28ua3IifSwic2NvcGVzIjpbInN0YXR1cyIsIm9jciIsIm9jci1kb2MiXX0.ORzKdN5GHpWKuxQYEdo1hUWEQrQxZvsPbbi7xRipzSk`)
 *                   expires_in:
 *                     type: string
 *                     description: 만료시간 (`2021-05-08 18:39:00`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 tokenExamples:
 *                   summary: jwt 토큰 생성
 *                   value:
 *                     success: true
 *                     message: "Token issued successfully"
 *                     jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTk4NjE5NDAsImV4cCI6MTYyMDQ2Njc0MCwiaXNzIjoiaHR0cHM6XC9cL2FwaTMudXNlYi5jby5rciIsImRhdGEiOnsiaWQiOiIzIiwiZmlyc3RuYW1lIjoidXNlYiIsImxhc3RuYW1lIjoidXNlYiIsImVtYWlsIjoiYWJsZW1hbjgyQHVzZWIuY28ua3IifSwic2NvcGVzIjpbInN0YXR1cyIsIm9jciIsIm9jci1kb2MiXX0.ORzKdN5GHpWKuxQYEdo1hUWEQrQxZvsPbbi7xRipzSk"
 *                     expires_in: "2021-05-08 18:39:00"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `C003`
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "Error processing Oauth token"
 *                   error_code:
 *                     type: string
 *                     description: >
 *                       Error Code
 *                          | Code | Description |
 *                          |------|-------------|
 *                          | C003 | client_id, client_secret 정보가 잘못된 경우 |
 *               examples:
 *                 clientInfoInvalid:
 *                   summary: C003 | client_id, client_secret 정보가 잘못된 경우
 *                   value:
 *                     success: false
 *                     message: "client id or client secret is invalid"
 *                     error_code: "C003"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = tokenRouter;
