const express = require("express");
const passportOverseasRouter = express.Router();

//! 외국인 여권
/**
 * @swagger
 * paths:
 *   /ocr/passport-overseas:
 *     post:
 *       summary: 외국인여권 OCR
 *       tags: [OCR]
 *       description: |
 *         외국인 여권의 이미지를 파일 형식 또는 Base64로 인코딩된 데이터로 받아 필요한 정보를 파싱합니다.
 *
 *         `Swagger UI 우측 상단 Authorize 버튼을 클릭하고, Bearer toekn 방식으로 인증 후 해당 API 사용하셔야 합니다.`
 *
 *       security:
 *         - bearerAuth: []   # Bearer token 필수 설정
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 image_base64:
 *                   type: string
 *                   description: 외국인여권 이미지 (base64 인코딩) `optional`
 *                   example: ""
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: 외국인여권 이미지 (jpg, png, pdf 형식) `optional`
 *                 secret_mode:
 *                   type: boolean
 *                   description: AES256 암호화 적용 여부 `optional`
 *                   example: false
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image_base64:
 *                   type: string
 *                   description: 외국인여권 이미지 (base64 인코딩) `optional`
 *                   example: ""
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: 외국인여권 이미지 (jpg, png, pdf 형식) `optional`
 *                 secret_mode:
 *                   type: boolean
 *                   description: AES256 암호화 적용 여부 `optional`
 *                   example: false
 *       responses:
 *         200:
 *           description: OK - `O000`
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
 *                     description: 메세지 (`OCR processed successfully`)
 *                   data:
 *                     type: object
 *                     properties:
 *                       idType:
 *                         type: string
 *                         description: 신분증종류 (`4(외국인여권)`)
 *                       userName:
 *                         type: string
 *                         description: 영어이름 (`HONG GIL DONG`)
 *                       passportNo:
 *                         type: string
 *                         description: 여권번호 (`C0527211`)
 *                       nationality:
 *                         type: string
 *                         description: 국적 (`USA`)
 *                       gender:
 *                         type: string
 *                         description: 성별 (`M`, `F`)
 *                       birthDate:
 *                         type: string
 *                         description: 생년월일 (`19910704`, yyyymmdd 형식)
 *                       expiryDate:
 *                         type: string
 *                         description: 만료일자 (`250803`)
 *                       mrz1:
 *                         type: string
 *                         description: mrz첫번째줄 (`P<USAHONG<<GILDONG`)
 *                       mrz2:
 *                         type: string
 *                         description: mrz두번째줄 (`M561596293KOR8811217M21102151056911V11976178`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`f96e3a56faef4f73fe857046c40c7837`)
 *               examples:
 *                 alienExamples:
 *                   summary: 외국인여권
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "4"
 *                       userName: "HONG GIL DONG"
 *                       passportNo: "C0527211"
 *                       nationality: "USA"
 *                       gender: "M"
 *                       birthDate: "19990910"
 *                       expiryDate: "250803"
 *                       mrz1: "P<USAHONG<<GILDONG<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
 *                       mrz2: "R7912090M30010261139417V12360154177780<793K0J"
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *                 secretModeExamples:
 *                   summary: "secret_mode : true"
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "4"
 *                       userName: "146713c5f4f8d80cjRgesXpaL/VzGEMC0heYRQ=="
 *                       passportNo: "46c2e8aea0e3b9169FRG9zKThP7eMizEJfVuBA=="
 *                       nationality: "3bc19551ded68b122Ojn1KSbZsTaS6iGI1FHpQ=="
 *                       gender: "822b702ae2716e3cBa5Wn5CF3Wjd4WHF/5VgHg=="
 *                       birthDate: "990a7b4cd4816291sstEMkMrFPS9ittNcSscOw=="
 *                       expiryDate: "27809d580371f98bAem6ki6Qvs7tAdpOZtkmrQ=="
 *                       mrz1: "39db259f17ee78f1R2FIp9jBQ8sUbdqWG/ofeopWmJCP5NJTjbdPCq0rdO5zaeDkpJey2lLsTsz5Av86"
 *                       mrz2: "46a79f91a3f5a815jTMxCLEHL5Q0oTp0IxpCWKlKP+aUiK3NuFYMbvFEsEAqvI2Qm+1QAXgTJM9O+u8p"
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *         400:
 *           description: Bad Request - `O002`, `O003`, `O004`, `O005`, `O007`, `O010`, `O021`, `O022`
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
 *                     example: "Error processing OCR"
 *                   error_code:
 *                     type: string
 *                     description: >
 *                       Error Code
 *                          | Code | Description |
 *                          |------|-------------|
 *                          | O002 | 파일 형식이 올바르지 않은 경우 (jpg, png, pdf가 아닌 경우) |
 *                          | O003 | 다른 신분증을 시도한 경우, 빛반사나 사진 화질 문제로 신분증 핵심정보를 읽지 못한 경우 |
 *                          | O004 | 가로 길이가 500px 이하일 때 (OCR 성능을 위해서 500~1000px 권장) |
 *                          | O005 | 흑백 형태의 복사한 신분증일 때 |
 *                          | O007 | 이미지 없이 OCR API를 호출한 경우 |
 *                          | O010 | OCR 처리 결과 부분적으로 빠진 정보가 있는 경우 (Http status code는 200 OK) |
 *                          | O021 | 여권 아래쪽의 MRZ1 코드가 제대로 찍히지 않은 경우 |
 *                          | O022 | 여권 아래쪽의 MRZ2 코드가 제대로 찍히지 않은 경우 |
 *               examples:
 *                 fileFormatInvalid:
 *                   summary: O002 | 파일 형식이 올바르지 않은 경우(jpg, png, pdf가 아닌 경우)
 *                   value:
 *                     success: false
 *                     message: "Requested file type is invalid (Only jpg, png, pdf are allowed)"
 *                     error_code: "O002"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 idTypeInvalid:
 *                   summary: O003 | 다른 신분증을 시도한 경우, 빛반사나 사진 화질 문제로 신분증 핵심정보를 읽지 못한 경우
 *                   value:
 *                     success: false
 *                     message: "Requested ID type is invalid"
 *                     error_code: "O003"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 fileWidthTooSmall:
 *                   summary: O004 | 파일 가로 길이가 너무 작음
 *                   value:
 *                     success: false
 *                     message: "ID size should be over 500 px in width"
 *                     error_code: "O004"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 copiedIdNotAllowed:
 *                   summary: O005 | 흑백 형태의 복사한 신분증일 때
 *                   value:
 *                     success: false
 *                     message: "Copied ID is not allowed."
 *                     error_code: "O005"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 emptyData:
 *                   summary: O007 | 이미지 없이 OCR API 호출한 경우
 *                   value:
 *                     success: true
 *                     message: "Requested data is empty"
 *                     error_code: "O007"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 partiallyRecognized:
 *                   summary: O010 | OCR 처리 결과 부분적으로 빠진 정보가 있는 경우 (Http status code는 200 OK)
 *                   value:
 *                     success: true
 *                     message: "Partially recognized"
 *                     error_code: "O010"
 *                     data:
 *                       idType: "4"
 *                       userName: "HONG GIL DONG"
 *                       passportNo: "R7912020M"
 *                       nationality: ""
 *                       gender: "M"
 *                       birthDate: "19990910"
 *                       expiryDate: "250803"
 *                       mrz1: "P<USAHONG<<GILDONG<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
 *                       mrz2: "R7912090M30010261139417V12360154177780<793K0J"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 mrz1NotReadable:
 *                   summary: O021 | 여권 하단 MRZ1 코드가 제대로 찍히지 않는 경우
 *                   value:
 *                     success: true
 *                     message: "MRZ1(Machine Readlable Zone) is not readable"
 *                     error_code: "O021"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 mrz2NotReadable:
 *                   summary: O022 | 여권 하단 MRZ2 코드가 제대로 찍히지 않는 경우
 *                   value:
 *                     success: true
 *                     message: "MRZ2(Machine Readlable Zone) is not readable"
 *                     error_code: "O022"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = passportOverseasRouter;
