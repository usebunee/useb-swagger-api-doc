const express = require("express");
const passportRouter = express.Router();

//! 한국여권
/**
 * @swagger
 * paths:
 *   /ocr/passport:
 *     post:
 *       summary: 국내여권 OCR
 *       tags: [OCR]
 *       description: |
 *         국내 여권의 이미지를 파일 형식 또는 Base64로 인코딩된 데이터로 받아 필요한 정보를 파싱합니다.
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
 *                   description: 국내여권 이미지 (base64 인코딩) `optional`
 *                   example: ""
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: 국내여권 이미지 (jpg, png, pdf 형식) `optional`
 *                 mask_mode:
 *                   type: boolean
 *                   description: 마스킹 처리된 이미지 리턴 여부 (예 true, false) `optional`
 *                   example: false
 *                 secret_mode:
 *                   type: boolean
 *                   description: AES256 암호화 적용 여부 `optional`
 *                   example: false
 *                 ssa_mode:
 *                   type: boolean
 *                   description: 사본 판별 기능 적용 여부 `optional`
 *                   example: false
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image_base64:
 *                   type: string
 *                   description: 국내여권 이미지 (base64 인코딩) `optional`
 *                   example: ""
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: 국내여권 이미지 (jpg, png, pdf 형식) `optional`
 *                 mask_mode:
 *                   type: boolean
 *                   description: 마스킹 처리된 이미지 리턴 여부 (예 true, false) `optional`
 *                   example: false
 *                 secret_mode:
 *                   type: boolean
 *                   description: AES256 암호화 적용 여부 `optional`
 *                   example: false
 *                 ssa_mode:
 *                   type: boolean
 *                   description: 사본 판별 기능 적용 여부 `optional`
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
 *                         description: 신분증종류 (`3(한국여권)`)
 *                       userName:
 *                         type: string
 *                         description: 이름 (`홍길동`)
 *                       userNameEng:
 *                         type: string
 *                         description: 영어이름 (`HONG GIL DONG`)
 *                       nationality:
 *                         type: string
 *                         description: 국적 (`KOR`)
 *                       passportNo:
 *                         type: string
 *                         description: 여권번호 (`R8012092M`)
 *                       juminNo1:
 *                         type: string
 *                         description: 주민번호 앞자리 (`881121`)
 *                       juminNo2:
 *                         type: string
 *                         description: 주민번호 뒷자리 (`1056911`)
 *                       _juminNo2:
 *                         type: string
 *                         description: 주민번호 뒷자리 마스킹 (`1******`)
 *                       gender:
 *                         type: string
 *                         description: 성별 (`M`, `F`)
 *                       birthDate:
 *                         type: string
 *                         description: 생년월일 (`19850302`, yyyymmdd 형식)
 *                       issueDate:
 *                         type: string
 *                         description: 발급일자 (`20180403`, yyyymmdd 형식)
 *                       expiryDate:
 *                         type: string
 *                         description: 만료일자 (`20300403`, yyyymmdd 형식)
 *                       mrz1:
 *                         type: string
 *                         description: mrz첫번째줄 (`PMKORHONG GIL DONG`)
 *                       mrz2:
 *                         type: string
 *                         description: mrz두번째줄 (`M561596293KOR8811217M21102151056911V11976178`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`f96e3a56faef4f73fe857046c40c7837`)
 *               examples:
 *                 alienExamples:
 *                   summary: 국내여권
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "3"
 *                       userName: "홍길동"
 *                       userNameEng: "HONG GIL DONG"
 *                       nationality: "KOR"
 *                       passportNo: "R7912020M"
 *                       juminNo1: "821120"
 *                       juminNo2: "1056914"
 *                       _juminNo2: "1******"
 *                       gender: "M"
 *                       birthDate: "19990910"
 *                       issueDate: "20140702"
 *                       expiryDate: "20300102"
 *                       mrz1: "PMKORHONG<<GIL<DONG<<<<<<<<<<<<<<<<<<<<<<<"
 *                       mrz2: "R7912090M30010261139417V12360154177780E793K0J"
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *                 maskModeExamples:
 *                   summary: "mask_mode : true"
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "3"
 *                       userName: "홍길동"
 *                       userNameEng: "HONG GIL DONG"
 *                       nationality: "KOR"
 *                       passportNo: "R7912020M"
 *                       juminNo1: "821120"
 *                       juminNo2: "1056914"
 *                       _juminNo2: "1******"
 *                       gender: "M"
 *                       birthDate: "19990910"
 *                       issueDate: "20140702"
 *                       expiryDate: "20300102"
 *                       mrz1: "PMKORHONG<<GIL<DONG<<<<<<<<<<<<<<<<<<<<<<<"
 *                       mrz2: "R7912090M30010261139417V12360154177780E793K0J"
 *                       image_base64_mask: "iVBORw0KGgoAAAA...........OAGVKw4bAAAAB3RJTUU"
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *                 secretModeExamples:
 *                   summary: "secret_mode : true"
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "3"
 *                       userName: "146713c5f4f8d80cjRgesXpaL/VzGEMC0heYRQ=="
 *                       userNameEng: "2d5010d9a4c3fe41tfJvBHgpYllvjN3dq+E6Hg=="
 *                       nationality: "3bc19551ded68b122Ojn1KSbZsTaS6iGI1FHpQ=="
 *                       passportNo: "46c2e8aea0e3b9169FRG9zKThP7eMizEJfVuBA=="
 *                       juminNo1: "5911115766890acbvNtnsf2tB4QMtSNnfapGgw=="
 *                       juminNo2: "6bfc9713d14c2228FkEKI4A0ymj3exFYYVI5lw=="
 *                       _juminNo2: "7f5df7a2db8c2c2ek7r06sNy0brs/YyF5LB7LQ=="
 *                       gender: "822b702ae2716e3cBa5Wn5CF3Wjd4WHF/5VgHg=="
 *                       birthDate: "990a7b4cd4816291sstEMkMrFPS9ittNcSscOw=="
 *                       issueDate: "1e5cf78a82a167edcM3dmv5NKE0EB4f0g0q2AA=="
 *                       expiryDate: "27809d580371f98bAem6ki6Qvs7tAdpOZtkmrQ=="
 *                       mrz1: "39db259f17ee78f1R2FIp9jBQ8sUbdqWG/ofeopWmJCP5NJTjbdPCq0rdO5zaeDkpJey2lLsTsz5Av86"
 *                       mrz2: "46a79f91a3f5a815jTMxCLEHL5Q0oTp0IxpCWKlKP+aUiK3NuFYMbvFEsEAqvI2Qm+1QAXgTJM9O+u8p"
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *                 ssaModeExamples:
 *                   summary: "ssa_mode : true"
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "3"
 *                       userName: "홍길동"
 *                       userNameEng: "HONG GIL DONG"
 *                       nationality: "KOR"
 *                       passportNo: "R7912020M"
 *                       juminNo1: "821120"
 *                       juminNo2: "1056914"
 *                       _juminNo2: "1******"
 *                       gender: "M"
 *                       birthDate: "19990910"
 *                       issueDate: "20140702"
 *                       expiryDate: "20300102"
 *                       mrz1: "PMKORHONG<<GIL<DONG<<<<<<<<<<<<<<<<<<<<<<<"
 *                       mrz2: "R7912090M30010261139417V12360154177780E793K0J"
 *                       id_real: true
 *                       id_confidence: 0.9998445510864258
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
 *                       idType: "3"
 *                       userName: "홍길동"
 *                       userNameEng: "HONG GIL DONG"
 *                       nationality: ""
 *                       passportNo: "R7912020M"
 *                       juminNo1: "821120"
 *                       juminNo2: "1056914"
 *                       _juminNo2: "1******"
 *                       gender: "M"
 *                       birthDate: "19990910"
 *                       issueDate: "20140702"
 *                       expiryDate: "20300102"
 *                       mrz1: "PMKORHONG<<GIL<DONG<<<<<<<<<<<<<<<<<<<<<<<"
 *                       mrz2: "R7912090M30010261139417V12360154177780E793K0J"
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

module.exports = passportRouter;
