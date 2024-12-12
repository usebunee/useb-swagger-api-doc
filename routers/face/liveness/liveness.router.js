const express = require("express");
const livenessRouter = express.Router();

//! 안면 라이브니스
/**
 * @swagger
 * paths:
 *   /face/liveness:
 *     post:
 *       summary: 안면 라이브니스
 *       tags: [Face]
 *       description: |
 *         순차적으로 찍은 4장의 이미지를 보내서 얼굴 진위 확인 (Munti frame Liveness)를 확인합니다. 반드시 동일 인물의 이미지 4장이 필요합니다. 
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
 *                 face1:
 *                   type: string
 *                   description: 얼굴이 포함된 사진1 (jpg, png 또는 base64코드)
 *                   format: binary
 *                   example: ""
 *                 face2:
 *                   type: string
 *                   format: binary
 *                   description: 얼굴이 포함된 사진2 (jpg, png 또는 base64코드)
 *                 face3:
 *                   type: string
 *                   format: binary
 *                   description: 얼굴이 포함된 사진2 (jpg, png 또는 base64코드)
 *                 face4:
 *                   type: string
 *                   format: binary
 *                   description: 얼굴이 포함된 사진2 (jpg, png 또는 base64코드)
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 face1:
 *                   type: string
 *                   description: 얼굴이 포함된 사진1 (jpg, png 또는 base64코드)
 *                   example: ""
 *                 face2:
 *                   type: string
 *                   example: ""
 *                   description: 얼굴이 포함된 사진2 (jpg, png 또는 base64코드)
 *                 face3:
 *                   type: string
 *                   example: ""
 *                   description: 얼굴이 포함된 사진3 (jpg, png 또는 base64코드)
 *                 face4:
 *                   type: string
 *                   example: ""
 *                   description: 얼굴이 포함된 사진4 (jpg, png 또는 base64코드)
 *       responses:
 *         200:
 *           description: OK - `FL000`
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
 *                     description: 메세지 (`Face liveness detected successfully`)
 *                   isIdentical:
 *                     type: boolean
 *                     description: 실제얼굴여부 (`true, false`)
 *                   confidence:
 *                     type: float
 *                     description: 실제얼굴 확률 (`0.83682`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`f96e3a56faef4f73fe857046c40c7837`)
 *               examples:
 *                 matchExamples:
 *                   summary: 안면 라이브니스
 *                   value:
 *                     success: true
 *                     message: "Face liveness detected successfully"
 *                     isIdentical: true
 *                     confidence: 0.9999
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *         400:
 *           description: Bad Request - `FL001`, `FL003`, `FL006`
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
 *                     example: "Error processing face match"
 *                   error_code:
 *                     type: string
 *                     description: >
 *                       Error Code
 *                          | Code | Description |
 *                          |------|-------------|
 *                          | FL001 | 얼굴이 없는 사진이 포함된 경우 |
 *                          | FL003 | 입력 파라미터가 빠진 경우 |
 *                          | FL006 | 파일 형식이 올바르지 않은 경우 (jpg, png가 아닌 경우) |
 *               examples:
 *                 faceNotFound:
 *                   summary: FL001 | 얼굴이 없는 사진이 포함된 경우
 *                   value:
 *                     success: false
 *                     message: "Face not detected in the image"
 *                     error_code: "FL001"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 parameterMissing:
 *                   summary: FL003 | 입력 파라미터가 빠진 경우
 *                   value:
 *                     success: false
 *                     message: "Parameters are missing"
 *                     error_code: "FL003"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 fileFormatInvalid:
 *                   summary: FL006 | 파일 형식이 올바르지 않은 경우 (jpg, png가 아닌 경우)
 *                   value:
 *                     success: false
 *                     message: "Requested file format is invalid (Only .jpg and .png are allowed)"
 *                     error_code: "FL006"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"

 */

module.exports = livenessRouter;
