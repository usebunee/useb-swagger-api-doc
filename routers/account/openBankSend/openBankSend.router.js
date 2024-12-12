const express = require("express");
const openBankSendRouter = express.Router();

//! 오픈뱅킹 1원입금이체
/**
 * @swagger
 * paths:
 *   /send:
 *     post:
 *       summary: 1원입금이체 [오픈뱅킹]
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
 *                 bank_code:
 *                   type: string
 *                   description: 은행코드 (별도 문서 참고)`081(하나은행), 088(신한은행), 003(IBK기업은행), 004(KB국민은행), 011(NH농협은행), 020(우리은행), 090(카카오뱅크) 외 오픈뱅킹참가 금융기관 모두 가능`
 *                   example: "081"
 *                 account_num:
 *                   type: string
 *                   description: 계좌번호
 *                   example: "24191020388999"
 *                 account_holder_name:
 *                   type: string
 *                   description: 성명
 *                   example: "홍길동"
 *                 client_name:
 *                   type: string
 *                   description: 고객사명 (사업자등록증에 기재된 고객사 이름) `optional`
 *                   example: "유스비"
 *                 client_business_num:
 *                   type: string
 *                   description: 고객사 사업자등록번호 `optional`
 *                   example: "532-87-00930"
 *                 code_type:
 *                   type: string
 *                   description: 인증코드 타입 `korean, english, number` 또는 계좌 적요에 찍히길 원하는 글자 (한글 1~3글자까지 가능합니다, "1234+글자"형태가 됩니다.) `optional`
 *                   example: ""
 *                 code_position:
 *                   type: string
 *                   description: 인증코드 위치 `front, back` front는 1234유스비 (3글자까지가능), back는 유스1234(2글자까지 권장, 3글자인 경우 인증코드가 짤리는 경우 발생할 수 있습니다.) `optional`
 *                   example: ""
 *                 name_check:
 *                   type: boolean
 *                   description: 수취인성명검증 설정여부, 실명번호에 매핑되는 이름과 맞지 않는 경우 사용 권장 (default true입니다.) `optional`
 *                   example: true
 *                 secret_mode:
 *                   type: boolean
 *                   description: AES256 암호화 적용 여부 `optional`
 *                   example: false
 *       responses:
 *         200:
 *           description: OK - `S000`
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
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 sendExamples:
 *                   summary: 오픈뱅킹 1원입금이체
 *                   value:
 *                     success: true
 *                     message: "1won sent successfully"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `S001`, `S002`, `S005`, `S006`, `S011`, `S012`, `S013`
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
 *                          | S001 | 은행코드 값의 자릿수가 잘못된 경우 (3자리여야 함) |
 *                          | S002 | 은행코드, 계좌번호, 예금주명 중 하나라도 정보가 빠진 경우 |
 *                          | S005 | 동일계좌 하루 일일 횟수 10회 초과 한 경우 |
 *                          | S006 | 동일계좌 하루 일일 횟수 10회 초과 한 경우 |
 *                          | S011 | 은행코드, 계좌번호 중 하나라도 틀린 경우 |
 *                          | S012 | 다른 정보는 맞는데, 예금주명만 틀린 경우 |
 *                          | S013 | 은행점검시간에 호출시 발생되는 오류 |
 *               examples:
 *                 bankCodeInvalid:
 *                   summary: S001 | 은행코드 값의 자릿수가 잘못된 경우 (3자리여야 함)
 *                   value:
 *                     success: false
 *                     message: "bank code is invalid"
 *                     error_code: "S001"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 parameterMissing:
 *                   summary: S002 | 은행코드, 계좌번호, 에금주명 중 하나라도 정보가 빠진 경우
 *                   value:
 *                     success: false
 *                     message: "Parameter are missing"
 *                     error_code: "S002"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 dailyLimitExceeded:
 *                   summary: S005 | 동일계좌 하루 일일 횟수 10회 초과 한 경우
 *                   value:
 *                     success: false
 *                     message: "Daily limit exceeded"
 *                     error_code: "S005"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 requestIsRestructed:
 *                   summary: S006 | 동일계좌 하루 일일 횟수 10회 초과 한 경우
 *                   value:
 *                     success: false
 *                     message: "Request is restricted"
 *                     error_code: "S006"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 accountInfoInvalid:
 *                   summary: S011 | 은행코드, 계좌번호 중 하나라도 틀린 경우
 *                   value:
 *                     success: false
 *                     message: "[Openbank Failure] 시뮬레이터　응답전문　조회에　실패하였습니다"
 *                     error_code: "S011"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 accountHolderNameInvalid:
 *                   summary: S012 | 다른정보는 맞는데, 예금주명만 틀린경우 (1) 수취인성명 불일치
 *                   value:
 *                     success: false
 *                     message: "[Openbank Failure] 예금주명 불일치 [수취인성명 불일치]"
 *                     error_code: "S012"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 accountHolderNameInvalid2:
 *                   summary: S012 | 다른정보는 맞는데, 예금주명만 틀린경우 (2) 타행처리 불가계좌
 *                   value:
 *                     success: false
 *                     message: "[Openbank Failure] 타행처리 불가계좌"
 *                     error_code: "S012"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 bankingSystemCheckingHours:
 *                   summary: S013 | 은행점검시간에 호출시 발생되는 오류
 *                   value:
 *                     success: false
 *                     message: "Banking system checking hours"
 *                     error_code: "S013"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = openBankSendRouter;
