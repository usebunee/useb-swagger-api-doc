const express = require("express");
const passportOverseasStatusRouter = express.Router();

//! 진위확인 해외여권
/**
 * @swagger
 * paths:
 *   /status/passport-overseas:
 *     post:
 *       summary: 해외여권 진위확인
 *       tags: [Status]
 *       description: |
 *         해외 여권 정보가 유효한지 검증하여 결과를 반환합니다.
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
 *                 passportNo:
 *                   type: string
 *                   description: 여권번호
 *                   example: "E2978271"
 *                 nationality:
 *                   type: string
 *                   description: 국적
 *                   example: "CHN"
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
 *                   summary: 해외여권
 *                   value:
 *                     success: true
 *                     message: "Status authenticated successfully"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `A022`, `A032`, `A033`, `A034`
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
 *                          | A022 | 입력된 국가코드 자릿수가 맞지 않은 경우 (3자리 코드) |
 *                          | A033 | (1) 입력된 국가코드가 잘못된 경우, (2) 필수입력 파라미터가 누락된 경우 |
 *                          | A034 | 생년월일의 포멧(YYMMDD)이 맞지 않는 경우 |
 *               examples:
 *                 countryCodeIsInvalidMustBe3LetterCode:
 *                   summary: A022 | 입력된 국가코드 자릿수가 맞지 않은 경우 (3자리 코드)
 *                   value:
 *                     success: false
 *                     message: "Country code is invalid (Must be 3-letter code)"
 *                     error_code: "A022"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 passportOverseasError1:
 *                   summary: A033 | (1) 필수입력 파라미터가 잘못된 경우
 *                   value:
 *                     success: false
 *                     message: "현재 체류중인 외국인이 아닙니다."
 *                     error_code: "A033"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 passportOverseasError2:
 *                   summary: A033 | (2) 필수입력 파라미터가 누락된 경우
 *                   value:
 *                     success: false
 *                     message: "Requested data is invalid (passport-overseas)"
 *                     error_code: "A033"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 birthDateOverseasError:
 *                   summary: A034 | 생년월일의 포멧(YYMMDD)이 맞지 않는 경우
 *                   value:
 *                     success: false
 *                     message: "Birthdate is invalid (passport-overseas-detail)"
 *                     error_code: "A034"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = passportOverseasStatusRouter;
