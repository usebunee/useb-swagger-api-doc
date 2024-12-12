const express = require("express");
const firmCustomVerifyRouter = express.Router();

//! 펌뱅킹-프리미엄 1원인증코드검증
/**
 * @swagger
 * paths:
 *   /firmbank-custom/verify:
 *     post:
 *       summary: 1원인증코드검증 [펌뱅킹-프리미엄]
 *       tags: [1 KRW bank account verification]
 *       description: |
 *         펌뱅킹 파트너사(하이픈)를 통해서 1원 입금이체 API와 계좌실명조회 API를 제공합니다.
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
 *                 tid:
 *                   type: string
 *                   description: 펌뱅킹 거래 아이디 `19002209`
 *                   example: ""
 *                 print_content:
 *                   type: string
 *                   description: 인증코드 `1234유스비`
 *                   example: ""
 *       responses:
 *         200:
 *           description: OK - `FV000`
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
 *                     description: 결과메세지 (`Code verified successfully`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 VerifyExamples:
 *                   summary: 펌뱅킹-프리미엄 1원인증코드검증
 *                   value:
 *                     success: true
 *                     message: "Code verified successfully"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `FV001`, `FV002`, `FV021`, `FV031`
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
 *                     example: "Error processing Verification of authentication code"
 *                   error_code:
 *                     type: string
 *                     description: >
 *                       Error Code
 *                          | Code | Description |
 *                          |------|-------------|
 *                          | FV001 | 인증 코드 미입력 또는 불일치한 경우 |
 *                          | FV002 | tid 또는 print_content를 보내지 않은 경우 |
 *                          | FV021 | 최대 시도 횟수 초과 (5회까지 시도 가능) |
 *                          | FV031 | 인증 코드가 만료되었을 때 (발송 5분 후 만료) |
 *               examples:
 *                 codeMismatch:
 *                   summary: FV001 | 인증 코드 미입력 또는 불일치한 경우
 *                   value:
 *                     success: false
 *                     message: "Code mismatch"
 *                     num_attempt: "2"
 *                     error_code: "FV001"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 parameterMissing:
 *                   summary: FV002 | tid 또는 print_content를 보내지 않은 경우
 *                   value:
 *                     success: false
 *                     message: "Parameter are missing"
 *                     error_code: "FV002"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 codeTrialExceedsLimit:
 *                   summary: FV021 | 최대 시도 횟수 초과 (5회까지 시도 가능)
 *                   value:
 *                     success: false
 *                     message: "Attempt limit exceeded"
 *                     num_attemppt: "6"
 *                     error_code: "FV021"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 codeExpired:
 *                   summary: FV031 | 인증 코드가 만료되었을 때 (발송 5분 후 만료)
 *                   value:
 *                     success: false
 *                     message: "Code has expired"
 *                     error_code: "FV031"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = firmCustomVerifyRouter;
