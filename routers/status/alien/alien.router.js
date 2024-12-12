const express = require("express");
const alienStatusRouter = express.Router();

//! 진위확인 외국인등록증
/**
 * @swagger
 * paths:
 *   /status/alien:
 *     post:
 *       summary: 외국인등록증 진위확인
 *       tags: [Status]
 *       description: |
 *         외국인등록증의 정보가 유효한지 검증하여 결과를 반환합니다.
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
 *                 issueNo:
 *                   type: string
 *                   description: 외국인등록번호
 *                   example: "123456-1234567"
 *                 issueDate:
 *                   type: string
 *                   description: 발급일자
 *                   example: "20240101"
 *                 serialNo:
 *                   type: string
 *                   description: 일련번호 (외국인등록증 뒷면)
 *                   example: "1-023-022-1211"
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
 *                   summary: 외국인등록증
 *                   value:
 *                     success: true
 *                     message: "Status authenticated successfully"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `A041`, `A042`, `A043`, `A044`, `A045`, `A047`, `A048`, `A049`
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
 *                          | A041 | 외국인등록번호에 일부 숫자가 누락된 경우 |
 *                          | A042 | 발급일자가 누락되거나 자릿수가 맞지 않는 경우 또는 틀린 경우 |
 *                          | A043 | 외국인등록번호, 발급일자, 일련번호 자릿수가 맞지만 잘못된 정보인 경우 |
 *                          | A044 | 맞는 정보이지만 체류기간이 만료된 경우 |
 *                          | A045 | 맞는 정보이지만 분실 또는 발급취소된 경우 |
 *                          | A047 | 일련번호가 누락된 경우|
 *                          | A048 | 동일한 외국인 정보를 10회 이상 수행 할 수 없는 경우 |
 *                          | A049 | 일련번호를 제외하고 입력해야 하는 경우 (조폐공사에서 일련번호를 누락된 data를 전달받아 하이코리아에서 확인이 불가한 경우) |
 *               examples:
 *                 alienIdInvalid:
 *                   summary: A041 | 외국인등록번호에 일부 숫자가 누락된 경우
 *                   value:
 *                     success: false
 *                     message: "ID number is invalid"
 *                     error_code: "A041"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 alienIssueDateInvalid:
 *                   summary: A042 | 발급일자가 누락되거나 자릿수가 맞지 않는 경우 또는 틀린 경우
 *                   value:
 *                     success: false
 *                     message: "Issue date is invalid"
 *                     error_code: "A042"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 alienError:
 *                   summary: A043 | 외국인등록번호, 발급일자, 일련번호 자릿수가 맞지만 잘못된 정보인 경우
 *                   value:
 *                     success: false
 *                     message: "민원인의 정보를 확인할 수 없습니다. 민원신청을 원할시 관할 출입국, 외국인관서로 문의 바랍니다."
 *                     error_code: "A043"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 alienIdExpired:
 *                   summary: A044 | 맞는 정보이지만 체류 기간이 만료된 경우
 *                   value:
 *                     success: false
 *                     message: "귀하께서 조회하신 외국인등록번호, 발급일자가 법무부가 보유한 정보와 일치하나 체류기간이 만료되었습니다. *조회결과는 전산기록과 비교한 것이므로 위조제작이나 사진교체 등 위,변조 여부에 대한 판단 기준은 될 수 없습니다."
 *                     error_code: "A044"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 alienIdLost:
 *                   summary: A045 | 맞는 정보이지만 분실 또는 발급취소된 경우
 *                   value:
 *                     success: false
 *                     message: "귀하께서 조회하신 외국인등록번호, 발급일자가 법무부가 보유한 정보와 일치하나 분실 또는 발급취소한 외국인등록번호입니다. *조회결과는 전산기록과 비교한 것이므로 위조제작이나 사진교체 등 위,변조 여부에 대한 판단 기준은 될 수 없습니다."
 *                     error_code: "A045"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 serialNumberIsRequired:
 *                   summary: A047 | 일련번호가 누락된 경우
 *                   value:
 *                     success: false
 *                     message: "Serial number is required (alien)"
 *                     error_code: "A047"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 inquiryForTheSameInformationIsNotAllowedMoreThan10TimesADay:
 *                   summary: A048 | 동일한 외국인 정보를 10회 이상 수행할수 없는 경우
 *                   value:
 *                     success: false
 *                     message: "Inquiry for the same information is not allowed more than 10 times a day"
 *                     error_code: "A048"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 idcardLost:
 *                   summary: A049 | 일련번호를 제외하고 입력해야 하는 경우 (조폐공사에서 일련번호를 누락된 data를 전달받아 하이코리아에서 확인이 불가한 경우)
 *                   value:
 *                     success: false
 *                     message: "Serial number is must be excluded"
 *                     error_code: "A049"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = alienStatusRouter;
