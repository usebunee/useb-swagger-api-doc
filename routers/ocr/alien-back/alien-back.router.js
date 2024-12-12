const express = require("express");
const alienBackRouter = express.Router();

//! 외국인등록증 뒷면
/**
 * @swagger
 * paths:
 *   /ocr/alien-back:
 *     post:
 *       summary: 외국인등록증 뒷면 OCR
 *       tags: [OCR]
 *       description: |
 *         외국인 등록증 뒷면의 이미지를 파일 형식 또는 Base64로 인코딩된 데이터로 받아 필요한 정보를 파싱합니다.
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
 *                       serialNo:
 *                         type: string
 *                         description: 일련번호 (`1-021-001-1111`)
 *                       permissionDate:
 *                         type: array
 *                         description: 체류기간의 허가일자 (`2019. 07. 15`)
 *                         items:
 *                            type: string
 *                            format: date
 *                       expiryDate:
 *                         type: array
 *                         description: 체류기간의 만료일자 또는 유효기간 (`2021. 09. 30`)
 *                         items:
 *                            type: string
 *                            format: date
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`f96e3a56faef4f73fe857046c40c7837`)
 *               examples:
 *                 alienExamples:
 *                   summary: 외국인등록증 뒷면
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       serialNo: "1-021-000-1111"
 *                       permissionDate: [
 *                         "2017.08.09",
 *                         "2019.07.15"
 *                       ]
 *                       expiryDate: [
 *                         "2019.09.30",
 *                         "2021.09.30"
 *                       ]
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *         400:
 *           description: Bad Request - `O002`, `O004`, `O051`
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
 *                          | O004 | 가로 길이가 500px 이하일 때 (OCR 성능을 위해서 500~1000px 권장) |
 *                          | O051 | 일련번호를 찾을 수 없는 경우 |
 *               examples:
 *                 fileFormatInvalid:
 *                   summary: O002 | 파일 형식이 올바르지 않은 경우(jpg, png, pdf가 아닌 경우)
 *                   value:
 *                     success: false
 *                     message: "Requested file type is invalid (Only jpg, png, pdf are allowed)"
 *                     error_code: "O002"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 fileWidthTooSmall:
 *                   summary: O004 | 파일 가로 길이가 너무 작음
 *                   value:
 *                     success: false
 *                     message: "ID size should be over 500 px in width"
 *                     error_code: "O004"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 serialNumberNotFound:
 *                   summary: O051 | 일련번호를 찾을 수 없는 경우
 *                   value:
 *                     success: false
 *                     message: "Serial number not found"
 *                     error_code: "O051"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = alienBackRouter;
