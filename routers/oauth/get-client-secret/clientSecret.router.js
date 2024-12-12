const express = require("express");
const clientSecretRouter = express.Router();

//! Client ID, Client Secret 조회
/**
 * @swagger
 * paths:
 *   /oauth/get-client-secret:
 *     post:
 *       summary: Client ID, Client Secret 조회
 *       tags:
 *         - Oauth
 *         - Encrypt
 *       description: 전달 받은 계정정보를 입력하여 Client ID, Client Secret 값으로 반환합니다.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: 이메일 (API 계정)
 *                   example: ""
 *                 password:
 *                   type: string
 *                   description: 비밀번호
 *                   example: ""
 *       responses:
 *         200:
 *           description: OK - `KC000`
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
 *                     description: 결과메세지 (`client_id and client_secret are retrieved`)
 *                   data:
 *                     type: object
 *                     properties:
 *                       clinet_id:
 *                         type: string
 *                         description: client_id (`1d4d478676bac4018327c23a9771de1a` )
 *                       clinet_secret:
 *                         type: string
 *                         description: client_secret (`c6959815a46094e411f1931239df63fc` )
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 clientSecretExamples:
 *                   summary: Client ID, Secret 조회
 *                   value:
 *                     success: true
 *                     message: "client_id and client_secret are retrieved"
 *                     data:
 *                       client_id: "1d4d478676bac4018327c23a9771de1a"
 *                       client_secret: "c6959815a46094e411f1931239df63fc"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `KC001`
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
 *                     example: "Error processing Oauth"
 *                   error_code:
 *                     type: string
 *                     description: >
 *                       Error Code
 *                          | Code | Description |
 *                          |------|-------------|
 *                          | KC001 | 고객 계정 정보가 잘못된 경우 |
 *               examples:
 *                 accountInfoInvalid:
 *                   summary: KC001 | 고객 계정 정보가 잘못된 경우
 *                   value:
 *                     success: false
 *                     message: "Check your email or password"
 *                     error_code: "KC001"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = clientSecretRouter;
