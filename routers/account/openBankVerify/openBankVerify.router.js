const express = require("express");
const openBankVerifyRouter = express.Router();

//! 오픈뱅킹 1원인증코드검증
/**
 * @swagger
 * paths:
 *   /verify:
 *     post:
 *       summary: 1원인증코드검증 [오픈뱅킹]
 *       tags: [1 KRW bank account verification]
 *       description: |
 *         금융결제원의 오픈뱅킹API를 활용, 금융결제원의 오픈뱅킹 이용약관을 준수하여 서비스를 운영하고 있으며, 금융보안원의 핀테크서비스 보안점검, 기업 보안점검을 완료하여 오픈뱅킹 API 를 이용 허가를 받아 상용 서비스를 제공하는 중입니다.
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
 *                 transaction_id:
 *                   type: string
 *                   description: API 로그 아이디
 *                   example: "f96e3a56faef4f73fe857046c40c7837"
 *                 print_content:
 *                   type: string
 *                   description: 인증코드
 *                   example: "블링블링"
 *       responses:
 *         200:
 *           description: OK - `V000`
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
 *                     description: 결과메세지 (`Code verified`)
 *                   data:
 *                     type: object
 *                     properties:
 *                       pair_transaction_id:
 *                         type: string
 *                         description: API 로그 페어 아이디 (`f96e3a56faef4f73fe857046c40c7837`)
 *                       print_content:
 *                         type: string
 *                         description: 인증코드 (`블링블링`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 VerifyExamples:
 *                   summary: 오픈뱅킹 1원인증코드검증
 *                   value:
 *                     success: true
 *                     message: "Code verified"
 *                     data:
 *                       pair_transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *                       print_content: "블링블링"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `V001`, `V002`, `V021`, `V031`
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
 *                          | V001 | 인증 코드 미입력 또는 불일치한 경우 |
 *                          | V002 | transaction_id 또는 print_content를 보내지 않은 경우 |
 *                          | V021 | 최대 시도 횟수 초과 (5회까지 시도 가능) |
 *                          | V031 | 인증 코드가 만료되었을 때 (발송 5분 후 만료) |
 *               examples:
 *                 codeMismatch:
 *                   summary: V001 | 인증 코드 미입력 또는 불일치한 경우
 *                   value:
 *                     success: false
 *                     message: "Code mismatch"
 *                     num_attempt: "2"
 *                     error_code: "V001"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 parameterMissing:
 *                   summary: V002 | transaction_id 또는 print_content를 보내지 않은 경우
 *                   value:
 *                     success: false
 *                     message: "Parameter are missing"
 *                     error_code: "V002"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 codeTrialExceedsLimit:
 *                   summary: V021 | 최대 시도 횟수 초과 (5회까지 시도 가능)
 *                   value:
 *                     success: false
 *                     message: "Attempt limit exceeded"
 *                     num_attemppt: "6"
 *                     error_code: "V021"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 codeExpired:
 *                   summary: V031 | 인증 코드가 만료되었을 때 (발송 5분 후 만료)
 *                   value:
 *                     success: false
 *                     message: "Code has expired"
 *                     error_code: "V031"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = openBankVerifyRouter;
