const express = require("express");
const driverRouter = express.Router();

//! 운전면허증 마스킹
/**
 * @swagger
 * paths:
 *   /masking/driver:
 *     post:
 *       summary: 운전면허증 마스킹
 *       tags: [Masking]
 *       description: |
 *         운전면허증의 이미지를 파일 형식 또는 Base64로 인코딩된 데이터로 받아, 마스킹 처리된 이미지를 Base64 인코딩 값으로 반환합니다.
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
 *                   description: 운전면허증 이미지 (base64 인코딩) `optional`
 *                   example: ""
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: 운전면허증 이미지 (jpg, png, pdf 형식) `optional`
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
 *                   description: 운전면허증 이미지 (base64 인코딩) `optional`
 *                   example: ""
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: 운전면허증 이미지 (jpg, png, pdf 형식) `optional`
 *                 secret_mode:
 *                   type: boolean
 *                   description: AES256 암호화 적용 여부 `optional`
 *                   example: false
 *       responses:
 *         200:
 *           description: OK - `M000`
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
 *                     description: 메세지 (`Masking created successfully`)
 *                   data:
 *                     type: object
 *                     properties:
 *                       image_base64_mask:
 *                         type: string
 *                         description: 마스킹 처리 된 운전면허증 이미지 (`iVBORw0KGgoAAAA...........OAGVKw4bAAAAB3RJTUU`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`f96e3a56faef4f73fe857046c40c7837`)
 *               examples:
 *                 driverExamples:
 *                   summary: 운전면허증
 *                   value:
 *                     success: true
 *                     message: "Masking created successfully"
 *                     data:
 *                       image_base64_mask: "iVBORw0KGgoAAAA...........OAGVKw4bAAAAB3RJTUU"
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *                 secretModeExamples:
 *                   summary: "secret_mode : true"
 *                   value:
 *                     success: true
 *                     message: "Masking created successfully"
 *                     data:
 *                       image_base64_mask: "146713c5f4f8d80cjRgesXpaL/VzGEMC0heYRQ=="
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *         400:
 *           description: Bad Request - `M002`, `M003`, `M004`, `M006`, `M010`
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
 *                     example: "Error processing Masking"
 *                   error_code:
 *                     type: string
 *                     description: >
 *                       Error Code
 *                          | Code | Description |
 *                          |------|-------------|
 *                          | M002 | 파일 형식이 올바르지 않은 경우 (jpg, png, pdf가 아닌 경우) |
 *                          | M003 | 마스킹 영역을 아예 찾을 수 없는 경우 (ex: 신분증과 관련 없는 사진이지만 텍스트가 있는 경우) |
 *                          | M004 | 가로 길이가 500px 미만일 때 |
 *                          | M006 | 마스킹 좌표를 찾았지만, 좌표에 문제가 있어서 마스킹을 그려낼 수가 없는 경우 (ex: 회전 된 사진) |
 *                          | M010 | 부분적으로 마스킹 처리 된 경우 |
 *               examples:
 *                 fileFormatInvalid:
 *                   summary: M002 | 파일 형식이 올바르지 않은 경우(jpg, png, pdf가 아닌 경우)
 *                   value:
 *                     success: false
 *                     message: "Requested masking file is invalid"
 *                     error_code: "M002"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 maskAreaNotFound:
 *                   summary: M003 | 마스킹 영역을 아예 찾을 수 없는 경우 (신분증과 관련 없는 사진이지만 텍스트가 있는 경우)
 *                   value:
 *                     success: false
 *                     message: "Masking area is not found"
 *                     error_code: "M003"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 fileWidthTooSmall:
 *                   summary: M004 | 가로 길이가 500px 미만일 때
 *                   value:
 *                     success: false
 *                     message: "ID size should be over 500 px in width"
 *                     error_code: "M004"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 maskingAreaIsInvalid:
 *                   summary: M006 | 마스킹 좌표를 찾았지만, 좌표에 문제가 있어서 마스킹을 그려낼 수가 없는 경우 (회전 된 사진)
 *                   value:
 *                     success: false
 *                     message: "Masking area is invalid"
 *                     maskWidth: 81
 *                     maskHeight: 84
 *                     error_code: "M006"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 partiallyMasked:
 *                   summary: M010 | 부분적으로 마스킹 처리가 된 경우
 *                   value:
 *                     success: true
 *                     message: "partially masked"
 *                     error_code: "M010"
 *                     data:
 *                      image_base_64_mask: "iVBORw0KGgoAAAA...........OAGVKw4bAAAAB3RJTUU"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = driverRouter;
