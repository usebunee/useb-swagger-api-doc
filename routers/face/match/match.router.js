const express = require("express");
const matchRouter = express.Router();

//! 안면 일치여부 확인
/**
 * @swagger
 * paths:
 *   /face/match:
 *     post:
 *       summary: 안면 일치여부확인
 *       tags: [Face]
 *       description: |
 *         두 장의 얼굴 이미지를 전달하여, 두 얼굴의 매칭 결과를 얻어냅니다. 각각의 이미지에서 검출된 얼굴들 중 가장 큰 얼굴을 기준으로 계산하여 매칭 결과와 신뢰도 값을 리턴합니다.
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
 *                 face2:
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
 *       responses:
 *         200:
 *           description: OK - `F000`
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
 *                     description: 메세지 (`Face verified successfully`)
 *                   isIdentical:
 *                     type: boolean
 *                     description: 안면일치여부 (`true, false`)
 *                   confidence:
 *                     type: float
 *                     description: 일치율 (`0.83682`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`f96e3a56faef4f73fe857046c40c7837`)
 *               examples:
 *                 matchExamples:
 *                   summary: 안면 일치여부확인
 *                   value:
 *                     success: true
 *                     message: "Face verified successfully"
 *                     isIdentical: true
 *                     confidence: 0.83682
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *         400:
 *           description: Bad Request - `F002`, `F003`, `F006`
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
 *                          | F002 | 파일 형식이 올바르지 않은 경우 (jpg, png가 아닌 경우) |
 *                          | F003 | 입력 파라미터가 빠진 경우 |
 *                          | F006 | 얼굴이 없는 사진을 입력한 경우 |
 *               examples:
 *                 fileFormatInvalid:
 *                   summary: F002 | 파일 형식이 올바르지 않은 경우(jpg, png, pdf가 아닌 경우)
 *                   value:
 *                     success: false
 *                     message: "Requested file type is invalid (Only jpg, png, pdf are allowed)"
 *                     error_code: "F002"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 parameterMissing:
 *                   summary: F003 | 입력 파라미터가 빠진 경우
 *                   value:
 *                     success: false
 *                     message: "Parameters are missing"
 *                     error_code: "F003"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 faceNotFound:
 *                   summary: F006 | 얼굴이 없는 사진을 입력한 경우
 *                   value:
 *                     success: false
 *                     message: "Face not found"
 *                     error_code: "F006"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"

 */

module.exports = matchRouter;
