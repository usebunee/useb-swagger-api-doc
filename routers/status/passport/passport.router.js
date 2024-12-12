const express = require("express");
const passportStatusRouter = express.Router();

//! 진위확인 한국여권
/**
 * @swagger
 * paths:
 *   /status/passport:
 *     post:
 *       summary: 국내여권 진위확인
 *       tags: [Status]
 *       description: |
 *         국내 여권 정보가 유효한지 검증하여 결과를 반환합니다.
 *
 *         `Swagger UI 우측 상단 Authorize 버튼을 클릭하고, Bearer toekn 방식으로 인증 후 해당 API 사용하셔야 합니다.`
 *       security:
 *         - bearerAuth: []   # Bearer token 필수 설정
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   description: 이름
 *                   example: "홍길동"
 *                 passportNo:
 *                   type: string
 *                   description: 여권번호
 *                   example: "M56159620"
 *                 issueDate:
 *                   type: string
 *                   description: 발급일자
 *                   example: "20200108"
 *                 expirationDate:
 *                   type: string
 *                   description: 만료일자
 *                   example: "20300108"
 *                 birthDate:
 *                   type: string
 *                   description: 생년월일
 *                   example: "19940101"
 *                 secret_mode:
 *                   type: boolean
 *                   description: AES256 암호화 적용 여부 `optional`
 *                   example: false
 *       responses:
 *         200:
 *           description: OK - `A000`
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
 *                     description: 결과메세지 (`Status authenticated successfully`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 drvierExamples:
 *                   summary: 국내여권
 *                   value:
 *                     success: true
 *                     message: "Status authenticated successfully"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `A021`, `A023`, `A024`
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
 *                     example: "Error processing Status"
 *                   error_code:
 *                     type: string
 *                     description: >
 *                       Error Code
 *                          | Code | Description |
 *                          |------|-------------|
 *                          | A021 | 여권번호 자릿수가 맞지 않는 경우 |
 *                          | A023 | 여권정보 일부가 누락되거나 틀린 경우 |
 *                          | A024 | 여권정보가 일치하지만 만료되거나 분실신고된 여권인 경우 |
 *               examples:
 *                 passportNumberInvalid1:
 *                   summary: A021 | 여권번호 자릿수가 맞지 않는 경우
 *                   value:
 *                     success: false
 *                     message: "여권정보가 일치하지 않습니다."
 *                     error_code: "A021"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 passportError1:
 *                   summary: A023 | 여권정보 일부가 누락되거나 틀린 경우
 *                   value:
 *                     success: false
 *                     message: "Requested data is invalid (passport)"
 *                     error_code: "A023"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 passportError2:
 *                   summary: A023 | 발급일자, 만료일자, 생년월일의 yymmdd 포멧이 맞지 않는 경우
 *                   value:
 *                     success: false
 *                     message: "${Issue date, Expiration date, Birth date} date is invalid(Parameter expirationDate must be 8 digits in YYYYMMDD format)"
 *                     error_code: "A023"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 pasportExpired:
 *                   summary: A024 | 여권정보가 일치하지만 만료되거나 분실신고된 여권인 경우
 *                   value:
 *                     success: false
 *                     message: "[효력상실 여권]여권정보가 일치 합니다."
 *                     error_code: "A024"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = passportStatusRouter;
