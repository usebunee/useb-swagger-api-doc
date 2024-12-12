const express = require("express");
const extractKeysRouter = express.Router();

//! 키추출
/**
 * @swagger
 * paths:
 *   /keys/extract-keys:
 *     post:
 *       summary: 키추출 [테스트용 API]
 *       tags: [Encrypt]
 *       description: |
 *         고객사가 제공받은 암호문을 통해서 대칭키를 복호화 할 수 있는 API 입니다.
 *
 *         **해당 API는 고객사에서 내부 서버에 직접 구현하시기 바랍니다. 편리한 테스트를 위해서 제공해드리지만, 안전한 암호화 통신을 위해서 실제 서비스에서는 활용을 금합니다.**
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
 *                 encrypted_ses_key:
 *                   type: string
 *                   description: RSA 암호화된 세션키 (`taATptTBxKQgtkCnlbqoPwnHHa3cX4nw+izsH+eAkv5uQEpkp9CWSPFDZ46EXdcaw9p0EEZg9cHV+nbmaOEI0iUr2z1Rbo82XcuuyDjbFRheuvyrNUu36uM6oEtdZ4cQ8Q58lgcLx0Fbjk1LwpslCmbvjI3DdDRnPi2PJs7feM8HpqLTLeZYKaYPJgqSeWjPBji/lf7wfnaP4P2EMgfyKPHpPXxkNW4Yy+fBU+eNOIRb0zSdxdmQLcPvD881bEyG53+YY5KPAOyIYjtN24n6Jr+0u5bNuui0sMhbPNv9c5fefx5WrvWIdKhLgbtP3AlP+Ey3uHzoSH8VEY6IDscDxQ==`)
 *                   example: ""
 *                 encrypted_sym_key:
 *                   type: string
 *                   description: AES 암호화된 대칭키 (`c14eada58ec59a41iUoG0h30nL7N08C1vh4xNyDdCPHOBjvnL/OQHVtXGyHD6n9RRlTDMP9UyfZxxjA/`)
 *                   example: ""
 *                 private_key:
 *                   type: string
 *                   description: RSA2048 개인키 (`-----BEGIN RSA PRIVATE KEY-----\r\nMIIEpAIBAAKCAQEAw3HKw68o2MCOhoXyZmh6EK...생략...WQ==\r\n-----END RSA PRIVATE KEY-----`)
 *                   example: ""
 *       responses:
 *         200:
 *           description: OK - `KT000`
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
 *                     description: 결과메세지 (`Symmetric key extracted successfully`)
 *                   data:
 *                     type: object
 *                     properties:
 *                       sym_key:
 *                         type: string
 *                         description: 추출된 대칭키 (`996357b0fa55af6018276d22a7fed126`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 extractKeysExamples:
 *                   summary: 키추출
 *                   value:
 *                     success: true
 *                     message: "Symmetric key extracted successfully"
 *                     data:
 *                       sym_key: "996357b0fa55af6018276d22a7fed126"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `KT001`
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
 *                     example: "Error processing Encrypt"
 *                   error_code:
 *                     type: string
 *                     description: >
 *                       Error Code
 *                          | Code | Description |
 *                          |------|-------------|
 *                          | KT001 | private key 정보가 잘못된 경우 |
 *               examples:
 *                 privateKeyInvalid:
 *                   summary: KT001 | private key 정보가 잘못된 경우
 *                   value:
 *                     success: false
 *                     message: "Private key is invalid"
 *                     error_code: "KT001"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = extractKeysRouter;
