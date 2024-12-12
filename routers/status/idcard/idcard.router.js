const express = require("express");
const idcardStatusRouter = express.Router();

//! 진위확인 주민등록증
/**
 * @swagger
 * paths:
 *   /status/idcard:
 *     post:
 *       summary: 주민등록증 진위확인
 *       tags: [Status]
 *       description: |
 *         주민등록증의 정보가 유효한지 검증하여 결과를 반환합니다.
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
 *                 identity:
 *                   type: string
 *                   description: 주민등록번호
 *                   example: "1234561234567"
 *                 issueDate:
 *                   type: string
 *                   description: 발급일자
 *                   example: "20240101"
 *                 userName:
 *                   type: string
 *                   description: 이름
 *                   example: "홍길동"
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
 *                 idcardExamples:
 *                   summary: 주민등록증
 *                   value:
 *                     success: true
 *                     message: "Status authenticated successfully"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `A001`, `A002`, `A003`, `A004`, `A005`, `A006`
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
 *                          | A001 | 주민등록번호가 틀리거나 자릿수가 맞지 않는 경우 |
 *                          | A002 | 발급일자 자릿수가 맞지 않는 경우 |
 *                          | A003 | 필수 입력 파라미터가 누락된 경우 |
 *                          | A004 | (1) 입력된 주민등록번호의 이름이 틀린 경우, (2) 발급일자가 잘못된 경우 |
 *                          | A005 | 발급일자 입력오류 5회 발생한 경우, 아래 URL에서 잠김해제를 해야 합니다: https://www.gov.kr/etc/AA090_unlock_id.jsp |
 *                          | A006 | 주민등록증 정보는 일치하지만, 분실 신고된 경우 |
 *               examples:
 *                 idcardNumberInvalid:
 *                   summary: A001 | 주민등록번호가 틀리거나 자릿수가 맞지 않는 경우
 *                   value:
 *                     success: false
 *                     message: "ID number is invalid"
 *                     error_code: "A001"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 idcardIssuedateInvalid:
 *                   summary: A002 | 발급일자의 자릿수가 맞지 않는 경우
 *                   value:
 *                     success: false
 *                     message: "Issue date is invalid"
 *                     error_code: "A002"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 parameterMissing:
 *                   summary: A003 | 필수 입력 파라미터가 누락된 경우
 *                   value:
 *                     success: false
 *                     message: "Requested data is invalid (idcard)"
 *                     error_code: "A003"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 idcardError1:
 *                   summary: A004 | 이름이 틀린 경우 (1)
 *                   value:
 *                     success: false
 *                     message: "입력하신 주민등록번호는 확인할 수 없는 번호입니다. 궁금하신 사항은 가까운 읍면동에 문의하시기 바랍니다."
 *                     error_code: "A004"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 idcardError2:
 *                   summary: A004 | 발급일자가 잘못된 경우 (2)
 *                   value:
 *                     success: false
 *                     message: "입력하신 발급일자는 등록된 발급일자와 일치하지 않습니다. 궁금하신 사항은 가까운 읍면동에 문의하시기 바랍니다"
 *                     error_code: "A004"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 issueDateError:
 *                   summary: A005 | 발급일자 입력오류가 5회 발생한 경우
 *                   value:
 *                     success: false
 *                     message: "발급일자 입력오류가 5회 발생하여 타인의 무단사용 방지를 위해 더 이상 확인할 수 없습니다. 궁금하신 사항은 가까운 읍면동을 방문하시거나 minon.go.kr에 접속하여 잠김 상태를 해제하시기 바랍니다."
 *                     error_code: "A005"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 idcardLost:
 *                   summary: A006 | 주민등록증 정보는 일치하지만, 분실 신고된 경우
 *                   value:
 *                     success: false
 *                     message: "입력하신 내용은 분실된 주민등록증입니다. 궁금하신 사항은 가까운 읍면동에 문의하시기 바랍니다."
 *                     error_code: "A006"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = idcardStatusRouter;
