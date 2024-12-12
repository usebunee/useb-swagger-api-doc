const express = require("express");
const firmBankSendRouter = express.Router();

//! 펌뱅킹 1원입금이체
/**
 * @swagger
 * paths:
 *   /firmbank/send:
 *     post:
 *       summary: 1원입금이체 [펌뱅킹]
 *       tags: [1 KRW bank account verification]
 *       description: |
 *         펌뱅킹 파트너사(헥토)를 통해서 1원 입금이체 API를 제공합니다.
 *
 *         `Swagger UI 우측 상단 Authorize 버튼을 클릭하고, Bearer toekn 방식으로 인증 후 해당 API 사용하셔야 합니다.`
 *
 *       security:
 *         - bearerAuth: []   # Bearer token 필수 설정
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bank_code:
 *                   type: string
 *                   description: 은행코드 (별도 문서 참고)`081(하나은행), 088(신한은행), 003(IBK기업은행), 004(KB국민은행), 011(NH농협은행), 020(우리은행), 090(카카오뱅크) 외 펌뱅킹으로 연동된 금융기관 모두 가능`
 *                   example: "081"
 *                 account_num:
 *                   type: string
 *                   description: 계좌번호
 *                   example: "24191020388999"
 *                 account_holder_name:
 *                   type: string
 *                   description: 성명
 *                   example: "홍길동"
 *                 secret_mode:
 *                   type: boolean
 *                   description: AES256 암호화 적용 여부 `optional`
 *                   example: false
 *       responses:
 *         200:
 *           description: OK - `FS000`
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
 *                     description: 결과메세지 (`1won sent successfully`)
 *                   data:
 *                     type: object
 *                     properties:
 *                       tid:
 *                         type: string
 *                         description: 펌뱅킹 거래 아이디 (`19002209`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 sendExamples:
 *                   summary: 펌뱅킹 1원입금이체
 *                   value:
 *                     success: true
 *                     message: "1won sent successfully"
 *                     data:
 *                       tid: "19002209"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `FS001`, `FS002`, `FS003`, `FS004`, `FS013`
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
 *                     example: "Error processing 1Won Send"
 *                   error_code:
 *                     type: string
 *                     description: >
 *                       Error Code
 *                          | Code | Description |
 *                          |------|-------------|
 *                          | FS001 | 은행코드 값의 자릿수가 잘못된 경우 (3자리여야 함), 존재하지 않는 은행코드인 경우 |
 *                          | FS002 | 은행코드, 계좌번호, 성명 중 하나라도 정보가 빠진 경우 |
 *                          | FS003 | 은행코드, 계좌번호가 틀린 경우 |
 *                          | FS004 | 성명이 틀린 경우 |
 *                          | FS013 | 은행점검시간에 호출시 발생되는 오류 |
 *               examples:
 *                 bankCodeInvalid:
 *                   summary: FS001 | 은행코드 값의 자릿수가 잘못된 경우 (3자리여야 함), 존재하지 않는 은행코드 인 경우
 *                   value:
 *                     success: false
 *                     message: "Bank code is invalid"
 *                     error_code: "FS001"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 parameterMissing:
 *                   summary: FS002 | 은행코드, 계좌번호, 성명 중 하나라도 정보가 빠진 경우
 *                   value:
 *                     success: false
 *                     message: "Parameter are missing"
 *                     error_code: "FS002"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 accountInfoInvalid:
 *                   summary: FS003 | 은행코드, 계좌번호가 틀린 경우
 *                   value:
 *                     success: false
 *                     message: "Account info is invalid"
 *                     error_code: "FS003"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 accountHolderNameInvalid:
 *                   summary: FS004 | 성명이 틀린 경우
 *                   value:
 *                     success: false
 *                     message: "Account holder name is invalid"
 *                     error_code: "FS004"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 bankingSystemCheckingHours:
 *                   summary: FS013 | 은행점검시간에 호출시 발생되는 오류
 *                   value:
 *                     success: false
 *                     message: "Banking system checking hours"
 *                     error_code: "FS013"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = firmBankSendRouter;
