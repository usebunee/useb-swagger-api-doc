const express = require("express");
const registerPublicKeyRouter = express.Router();

//! 공개키 생성
/**
 * @swagger
 * paths:
 *   /keys/register-public-key:
 *     post:
 *       summary: 공개키 등록
 *       tags: [Encrypt]
 *       description: |
 *         고객사의 공개키를 유스비에 전달할 수 있는 API 입니다.
 *
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
 *                 public_key:
 *                   type: string
 *                   description: RSA2048 공개키 (`-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBC...생략...\r\n7wIDAQAB\r\n-----END PUBLIC KEY-----`)
 *                   example: ""
 *                 client_id:
 *                   type: string
 *                   description: client_id (`1d4d478676bac4018327c23a9771de1a`)
 *                   example: ""
 *                 client_secret:
 *                   type: string
 *                   description: client_secret (`322aec7b3db46988c75b71160c932ff5`)
 *                   example: ""
 *       responses:
 *         200:
 *           description: OK - `KR000`
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
 *                     description: 결과메세지 (`Public Key registered successfully.`)
 *                   data:
 *                     type: object
 *                     properties:
 *                       userid:
 *                         type: string
 *                         description: 사용자 아이디(이메일) (`useb@useb.co.kr` )
 *                       public_key:
 *                         type: string
 *                         description: 공개키 (`-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBC...생략...\r\n7wIDAQAB\r\n-----END PUBLIC KEY-----` )
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 registerPublicKeyExamples:
 *                   summary: 공개키 등록
 *                   value:
 *                     success: true
 *                     message: "Public Key registered successfully."
 *                     data:
 *                       userid: "useb@useb.co.kr"
 *                       public_key: "`-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBC...생략...\r\n7wIDAQAB\r\n-----END PUBLIC KEY-----"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `KR001`
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
 *                          | KR001 | client_id, client_secret 정보가 잘못된 경우 |
 *               examples:
 *                 clientInfoInvalid:
 *                   summary: KR001 | client_id, client_secret 정보가 잘못된 경우
 *                   value:
 *                     success: false
 *                     message: "Client ID/Client Secret mismatched"
 *                     error_code: "KR001"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = registerPublicKeyRouter;
