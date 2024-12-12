const express = require("express");
const idcardDriverRouter = express.Router();

//! 주민등록증, 운전면허증
/**
 * @swagger
 * paths:
 *   /ocr/idcard-driver:
 *     post:
 *       summary: 주민등록증/운전면허증 OCR
 *       tags: [OCR]
 *       description: |
 *         주민등록증 또는 운전면허증의 이미지를 파일 형식 또는 Base64로 인코딩된 데이터로 받아 필요한 정보를 파싱합니다.
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
 *                   description: 주민등록증 또는 운전면허증 이미지 (base64 인코딩) `optional`
 *                   example: ""
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: 주민등록증 또는 운전면허증 이미지 (jpg, png, pdf 형식) `optional`
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
 *                 driver_type:
 *                   type: boolean
 *                   description: 운전면허증 종류 응답 추가 여부 (운전면허증 OCR만 가능) `optional`
 *                   example: false
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image_base64:
 *                   type: string
 *                   description: 주민등록증 또는 운전면허증 이미지 (base64 인코딩) `optional`
 *                   example: ""
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: 주민등록증 또는 운전면허증 이미지 (jpg, png, pdf 형식) `optional`
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
 *                 driver_type:
 *                   type: boolean
 *                   description: 운전면허증 종류 응답 추가 여부 (운전면허증 OCR만 가능) `optional`
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
 *                         description: 신분증 종류 (`1`은 주민등록증, `2`는 운전면허증)
 *                       userName:
 *                         type: string
 *                         description: 이름 (`홍길동`)
 *                       juminNo1:
 *                         type: string
 *                         description: 생년월일 (`821120`)
 *                       juminNo2:
 *                         type: string
 *                         description: 주민번호 뒷자리 (`1056914`)
 *                       _juminNo2:
 *                         type: string
 *                         description: 주민번호 뒷자리 마스킹 (`1******`)
 *                       issueDate:
 *                         type: string
 *                         description: 발급일자 (`20140713`)
 *                       id_real:
 *                         type: boolean
 *                         description: 사본판별결과 (true, false) `optional`
 *                       id_confidence:
 *                         type: string
 *                         description: 정확도 (0.5이상이면 실물(true), 이하면 가짜(false)로 구분) `optional`
 *                       driverNo:
 *                         type: string
 *                         description: 운전면허번호 (`11-16-044390-60`)
 *                       driverType:
 *                          type: string
 *                          description: 운전면허종류 (`1종보통, 2종보통`)
 *                       expiryDate1:
 *                         type: string
 *                         description: 적성검사기간 시작일 (`20240101`)
 *                       expiryDate2:
 *                         type: string
 *                         description: 적성검사기간 만료일 (`20241231`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`322aec7b3db46988c75b71160c932ff5`)
 *               examples:
 *                 idCardExample:
 *                   summary: 주민등록증
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "1"
 *                       userName: "홍길동"
 *                       juminNo1: "821120"
 *                       juminNo2: "1056914"
 *                       _juminNo2: "1******"
 *                       issueDate: "20140702"
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *                 driverLicenseExample:
 *                   summary: 운전면허증
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "2"
 *                       userName: "홍길동"
 *                       driverNo: "서울-03-650984-80"
 *                       juminNo1: "860927"
 *                       juminNo2: "1187112"
 *                       _juminNo2: "1******"
 *                       expiryDate1: "20240101"
 *                       expiryDate2: "20241231"
 *                       issueDate: "20120124"
 *                     transaction_id: "34c75bf7d1256606c0b3478d3f693398"
 *                 maskModeExample:
 *                   summary: "mask_mode : true"
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "1"
 *                       userName: "홍길동"
 *                       juminNo1: "821120"
 *                       juminNo2: "1056914"
 *                       _juminNo2: "1******"
 *                       issueDate: "20140702"
 *                       image_base64_mask: "iVBORw0KGgoAAAA...........OAGVKw4bAAAAB3RJTUU"
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *                 secretModeExample:
 *                   summary: "secret_mode : true"
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "1"
 *                       userName: "4fb4e8f8483316b41UquJwL0qHjJK3SC/sNvaQ=="
 *                       juminNo1: "bb15690ed3aba8fd/hn9/mnk/3Y1gnSFMMCHKA=="
 *                       juminNo2: "b7d8393ab73a425aMehk0KfisxFbEgI6xe2Qjg=="
 *                       _juminNo2: "3b41897b48eaa6c8AjoTJ9B1B6PnYu4DbPjbmA=="
 *                       issueDate: "079b3ed665ef8616Hsxnx9KOS0F/BIlZ4rj7Ew=="
 *                       image_base64_mask: "iVBORw0KGgoAAAA...........OAGVKw4bAAAAB3RJTUU"
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *                 ssaModeExample:
 *                   summary: "ssa_mode : true"
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "1"
 *                       userName: "홍길동"
 *                       juminNo1: "821120"
 *                       juminNo2: "1056914"
 *                       _juminNo2: "1******"
 *                       issueDate: "20140702"
 *                       id_real: true
 *                       id_confidence: 0.9998445510864258
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *                 driverTypeExample:
 *                   summary: "driver_type : true"
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "2"
 *                       userName: "홍길동"
 *                       driverNo: "서울-03-650984-80"
 *                       driverType: "1종보통"
 *                       juminNo1: "860927"
 *                       juminNo2: "1187112"
 *                       _juminNo2: "1******"
 *                       expiryDate1: "20240101"
 *                       expiryDate2: "20241231"
 *                       issueDate: "20120124"
 *                     transaction_id: "34c75bf7d1256606c0b3478d3f693398"
 *         400:
 *           description: Bad Request - `O002`, `O003`, `O004`, `O005`, `O007`, `O010`, `M010`
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
 *                   extra_message:
 *                     type: string
 *                     example: "partially masked"
 *                   extra_code:
 *                     type: string
 *                     description: >
 *                       Extra Code
 *                          | Code | Description |
 *                          |------|-------------|
 *                          | M010 | mask_mode:true 일때, 마스킹이 부분적으로 처리 된 경우 extra_code로 추가 리턴 |
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
 *                       idType: "1"
 *                       userName: "홍길동"
 *                       juminNo1: "821120"
 *                       juminNo2: "1056914"
 *                       _juminNo2: "1******"
 *                       issueDate: ""
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 partiallyMasked:
 *                   summary: M010 | mask_mode:true 일때, 마스킹이 부분적으로 처리 된 경우 extra_code로 추가 리턴
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "1"
 *                       userName: "홍길동"
 *                       juminNo1: "821120"
 *                       juminNo2: "1056914"
 *                       _juminNo2: "1******"
 *                       issueDate: "20140702"
 *                       image_base64_mask: "iVBORw0KGgoAAAA...........OAGVKw4bAAAAB3RJTUU"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                     extra_code: "M010"
 *                     extra_message: "Partially masked"
 */

module.exports = idcardDriverRouter;
