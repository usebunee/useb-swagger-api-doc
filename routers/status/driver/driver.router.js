const express = require("express");
const driverStatusRouter = express.Router();

//! 진위확인 운전면허증
/**
 * @swagger
 * paths:
 *   /status/driver:
 *     post:
 *       summary: 운전면허증 진위확인
 *       tags: [Status]
 *       description: |
 *         운전면허증의 정보가 유효한지 검증하여 결과를 반환합니다.
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
 *                 juminNo:
 *                   type: string
 *                   description: 주민등록번호
 *                   example: "1234561234567"
 *                 userName:
 *                   type: string
 *                   description: 이름
 *                   example: "홍길동"
 *                 birthDate:
 *                   type: string
 *                   description: 생년월일
 *                   example: "19940101"
 *                 licenseNo:
 *                   type: string
 *                   description: 운전면허번호
 *                   example: "11-16-044391-61"
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
 *                   summary: 운전면허증
 *                   value:
 *                     success: true
 *                     message: "Status authenticated successfully"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `A011`, `A013`, `A015`, `A016`
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
 *                          | A011 | 주민등록번호 유효성 검사 실패인 경우 |
 *                          | A012 | (1) 운전면허번호가 잘못된 경우, (2) 끝자리가 잘못된 경우, (3) 자릿수가 맞지 않는 경우 |
 *                          | A013 | (1) 이름, 생년월일이 잘못된 경우 (2) 면허번호가 누락된 경우 |
 *                          | A015 | 스크래핑 에러인 경우 |
 *                          | A016 | 현재 유효하지 않은 에전 운전면허번호인 경우 |
 *               examples:
 *                 idcardNumberInvalid:
 *                   summary: A011 | 주민등록번호 유효성 검사 실패인 경우
 *                   value:
 *                     success: false
 *                     message: "ID number is invalid"
 *                     error_code: "A011"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 licenseError1:
 *                   summary: A012 | 면허번호가 잘못된 경우
 *                   value:
 *                     success: false
 *                     message: "한국도로교통공단 전산 자료와 일치하지 않습니다."
 *                     error_code: "A012"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 licenseError2:
 *                   summary: A012 | 면허번호 끝자리가 잘못 입력한 경우
 *                   value:
 *                     success: false
 *                     message: "면허번호 끝번호가 일치하지 않습니다."
 *                     error_code: "A012"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 licenseError3:
 *                   summary: A012 | 면허번호 자릿수가 맞지 않는 경우
 *                   value:
 *                     success: false
 *                     message: "Driver's license number is invalid"
 *                     error_code: "A012"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 driverError1:
 *                   summary: A013 | 이름, 생년월일이 잘못된 경우
 *                   value:
 *                     success: false
 *                     message: "인적정보를 잘못 입력하였습니다."
 *                     error_code: "A013"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 driverError2:
 *                   summary: A013 | 면허번호가 누락된 경우
 *                   value:
 *                     success: false
 *                     message: "Requested data is invalid (driver)"
 *                     error_code: "A013"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 scrappingError:
 *                   summary: A015 | 스크래핑 에러인 경우
 *                   value:
 *                     success: false
 *                     message: "Internal scraping error"
 *                     error_code: "A015"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 licenseNumberInvalid:
 *                   summary: A016 | 현재 유효하지 않은 예전 운전면허번호인 경우
 *                   value:
 *                     success: false
 *                     message: "현재 유효하지 않은 예전 면허번호입니다."
 *                     error_code: "A016"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = driverStatusRouter;
