const express = require("express");
const openBankRealnameRouter = express.Router();

//! 오픈뱅킹 계좌실명조회
/**
 * @swagger
 * paths:
 *   /realname:
 *     post:
 *       summary: 계좌실명조회 [오픈뱅킹]
 *       tags: [1 KRW bank account verification]
 *       description: |
 *         금융결제원의 오픈뱅킹API를 활용, 금융결제원의 오픈뱅킹 이용약관을 준수하여 서비스를 운영하고 있으며, 금융보안원의 핀테크서비스 보안점검, 기업 보안점검을 완료하여 오픈뱅킹 API 를 이용 허가를 받아 상용 서비스를 제공하는 중입니다.
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
 *                   description: 은행코드 (별도 문서 참고)`081(하나은행), 088(신한은행), 003(IBK기업은행), 004(KB국민은행), 011(NH농협은행), 020(우리은행), 090(카카오뱅크) 외 오픈뱅킹참가 금융기관 모두 가능`
 *                   example: "081"
 *                 account_num:
 *                   type: string
 *                   description: 계좌번호
 *                   example: "24191020388999"
 *                 account_holder_info_type:
 *                   type: string
 *                   description: space`" "` -> 생년월일, `"6"` -> 사업자등록번호 (개인사업자 계좌의 경우 생년월일을 확인해야 함.)
 *                   example: " "
 *                 account_holder_info:
 *                   type: string
 *                   description: 생년월일 또는 사업자등록번호 (account_holder_info_type에 의해 결정) `821121 or 532-87-00930`
 *                   example: "821121"
 *                 secret_mode:
 *                   type: boolean
 *                   description: AES256 암호화 적용 여부 `optional`
 *                   example: false
 *       responses:
 *         200:
 *           description: OK - `RN000`
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
 *                     description: 결과메세지 (`Acccount holder name retrieved successfully`)
 *                   data:
 *                     type: object
 *                     properties:
 *                       bank_code:
 *                         type: string
 *                         description: 은행코드 (`081`)
 *                       bank_name:
 *                         type: string
 *                         description: 은행명 (`하나은행`)
 *                       account_num:
 *                         type: string
 *                         description: 계좌번호 `28881043614111`
 *                       account_holder_name:
 *                         type: string
 *                         description: 예금주명 `홍길동`
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 realnameExamples:
 *                   summary: 오픈뱅킹 계좌실명조회
 *                   value:
 *                     success: true
 *                     message: "Acccount holder name retrieved successfully"
 *                     data:
 *                       bank_code: "081"
 *                       bank_name: "하나은행"
 *                       asccount_num: "28881043614111"
 *                       asccount_holder_name: "홍길동"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `RN001`, `RN002`, `RN003`, `RN004`, `RN013`
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
 *                     example: "Error processing Realname"
 *                   error_code:
 *                     type: string
 *                     description: >
 *                       Error Code
 *                          | Code | Description |
 *                          |------|-------------|
 *                          | RN001 | 존재하지 않는 은행코드를 입력한 경우 |
 *                          | RN002 | 은행코드, 계좌번호, 생년월일 중 하나라도 정보가 빠진 경우 |
 *                          | RN003 | 생년월일 자릿수가 틀린 경우 (6자리여야 함, `yymmdd`) |
 *                          | RN004 | 계좌번호 또는 생년월일 정보가 틀린 경우 |
 *                          | RN013 | 은행점검시간에 호출시 발생되는 오류 |
 *               examples:
 *                 bankCodeInvalid:
 *                   summary: RN001 | 존재하지 않는 은행코드를 입력한 경우
 *                   value:
 *                     success: false
 *                     message: "bank_code is invalid"
 *                     extra_message: "참가기관 에러 [중계센터 - 미참가 기관"
 *                     error_code: "RN001"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 parameterMissing:
 *                   summary: RN002 | 은행코드, 계좌번호, 생년월일 중 하나라도 정보가 빠진 경우
 *                   value:
 *                     success: false
 *                     message: "Parameter are missing"
 *                     error_code: "RN002"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 accountHolderInfoInvaild:
 *                   summary: RN003 | 생년월일 자릿수가 틀린 경우 (6자리 yymmdd)
 *                   value:
 *                     success: false
 *                     message: "account_holder_info is invalid"
 *                     extra_message: "예금주 실명번호 구분코드와 실명번호의 형식(자리수) 불일치 [생년월일만 입력요망]"
 *                     error_code: "RN003"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 accountInfoInvalid:
 *                   summary: RN004 | 계좌번호 또는 생년월일 정보가 틀린 경우
 *                   value:
 *                     success: false
 *                     message: "account_info is invalid"
 *                     extra_message: "참가기관 에러[하나은행 - 과목코드 오류]"
 *                     error_code: "RN004"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 bankingSystemCheckingHours:
 *                   summary: RN013 | 은행점검시간에 호출시 발생되는 오류
 *                   value:
 *                     success: false
 *                     message: "Banking system checking hours"
 *                     error_code: "RN013"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = openBankRealnameRouter;
