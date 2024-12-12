const express = require("express");
const alienRouter = express.Router();

//! 외국인등록증
/**
 * @swagger
 * paths:
 *   /ocr/alien:
 *     post:
 *       summary: 외국인등록증 OCR
 *       tags: [OCR]
 *       description: |
 *         외국인 등록증의 이미지를 파일 형식 또는 Base64로 인코딩된 데이터로 받아 필요한 정보를 파싱합니다.
 *
 *         `Swagger UI 우측 상단 Authorize 버튼을 클릭하고, Bearer toekn 방식으로 인증 후 해당 API 사용하셔야 합니다.`
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
 *                   description: 외국인등록증 이미지 (base64 인코딩) `optional`
 *                   example: ""
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: 외국인등록증 이미지 (jpg, png, pdf 형식) `optional`
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
 *                   description: 외국인등록증 이미지 (base64 인코딩) `optional`
 *                   example: ""
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: 외국인등록증 이미지 (jpg, png, pdf 형식) `optional`
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
 *                         description: 신분증종류 (`5-1(외국인등록증)`, `5-2(외국국적동포 국내거소신고증)`, `5-3(영주증)` )
 *                       userName:
 *                         type: string
 *                         description: 이름 (`NGUYEN HONG`)
 *                       country:
 *                         type: string
 *                         description: 국가 (`VIETNAM`)
 *                       countryCode:
 *                         type: string
 *                         description: 국가코드 (`VNM`)
 *                       visa:
 *                         type: string
 *                         description: 비자 (`일반연수 D-4`)
 *                       issoueNo:
 *                         type: string
 *                         description: 외국인등록번호 (`000507-7780024`)
 *                       issoueNo1:
 *                         type: string
 *                         description: 외국인등록번호 앞자리 (`000507`)
 *                       issueNo2:
 *                         type: string
 *                         description: 외국인등록번호 뒷자리 (`7780024`)
 *                       _issueNo2:
 *                         type: string
 *                         description: 외국인등록번호 뒷자리 마스킹 (`7******`)
 *                       issueDate:
 *                         type: string
 *                         description: 발급일자 (`20190403`, yyyymmdd 형식)
 *                       id_real:
 *                         type: string
 *                         description: 사본판별결과 (true, false) `optional`
 *                       id_confidence:
 *                         type: string
 *                         description: 정확도 (0.5이상이면 실물(true), 이하면 가짜(false)로 구분) `optional`
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`f96e3a56faef4f73fe857046c40c7837`)
 *               examples:
 *                 alienExamples:
 *                   summary: 외국인등록증
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "5-1"
 *                       userName: "NGUYEN HONG"
 *                       country: "VIETNAM"
 *                       countryCode: "VNM"
 *                       visa: "유학(D-2)"
 *                       issueNo: "000507-7780024"
 *                       issueNo1: "000507"
 *                       issueNo2: "7780024"
 *                       _issueNo2: "7******"
 *                       issueDate: "20190403"
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *                 maskModeExamples:
 *                   summary: "mask_mode : true"
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "5-1"
 *                       userName: "NGUYEN HONG"
 *                       country: "VIETNAM"
 *                       countryCode: "VNM"
 *                       visa: "유학(D-2)"
 *                       issueNo: "000507-7780024"
 *                       issueNo1: "000507"
 *                       issueNo2: "7780024"
 *                       _issueNo2: "7******"
 *                       issueDate: "20190403"
 *                       image_base64_mask: "iVBORw0KGgoAAAA...........OAGVKw4bAAAAB3RJTUU"
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *                 secretModeExamples:
 *                   summary: "secret_mode : true"
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "5-1"
 *                       userName: "146713c5f4f8d80cjRgesXpaL/VzGEMC0heYRQ=="
 *                       country: "VIETNAM"
 *                       countryCode: "VNM"
 *                       visa: "일반연수(D-4)"
 *                       issueNo: "5911115766890acbvNtnsf2tB4QMtSNnfapGgw=="
 *                       issueNo1: "5911115766890acbvNtnsf2tB4QMtSNnfapGgw=="
 *                       issueNo2: "6bfc9713d14c2228FkEKI4A0ymj3exFYYVI5lw=="
 *                       _issueNo2: "7f5df7a2db8c2c2ek7r06sNy0brs/YyF5LB7LQ=="
 *                       issueDate: "1e5cf78a82a167edcM3dmv5NKE0EB4f0g0q2AA=="
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *                 ssaModeExamples:
 *                   summary: "ssa_mode : true"
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "5-1"
 *                       userName: "NGUYEN HONG"
 *                       country: "VIETNAM"
 *                       countryCode: "VNM"
 *                       visa: "유학(D-2)"
 *                       issueNo: "000507-7780024"
 *                       issueNo1: "000507"
 *                       issueNo2: "7780024"
 *                       _issueNo2: "7******"
 *                       issueDate: "20190403"
 *                       id_real: true
 *                       id_confidence: 0.9998445510864258
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
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
 *                       idType: "5-1"
 *                       userName: "NGUYEN HONG"
 *                       country: ""
 *                       countryCode: ""
 *                       visa: "유학(D-2)"
 *                       issueNo: "000507-7780024"
 *                       issueNo1: "000507"
 *                       issueNo2: "7780024"
 *                       _issueNo2: "7******"
 *                       issueDate: "20190403"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 partiallyMasked:
 *                   summary: M010 | mask_mode:true 일때, 마스킹이 부분적으로 처리 된 경우 extra_code로 추가 리턴
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       idType: "5-1"
 *                       userName: "NGUYEN HONG"
 *                       country: "VIETNAM"
 *                       countryCode: "VNM"
 *                       visa: "유학(D-2)"
 *                       issueNo: "000507-7780024"
 *                       issueNo1: "000507"
 *                       issueNo2: "7780024"
 *                       _issueNo2: "7******"
 *                       issueDate: "20190403"
 *                       image_base64_mask: "iVBORw0KGgoAAAA...........OAGVKw4bAAAAB3RJTUU"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                     extra_code: "M010"
 *                     extra_message: "Partially masked"
 */

module.exports = alienRouter;
