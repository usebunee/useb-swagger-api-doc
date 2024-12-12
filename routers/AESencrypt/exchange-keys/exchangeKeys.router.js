const express = require("express");
const exchangeKeysRouter = express.Router();

//! 키교환
/**
 * @swagger
 * paths:
 *   /keys/exchage-keys:
 *     post:
 *       summary: 키교환
 *       tags: [Encrypt]
 *       description: |
 *         클라이언트와 서버 간 보안 통신을 위해 RSA 암호화된 세션 키와 AES 대칭 키를 교환합니다.
 *
 *         **encrypted_ses_key(암호화된 세션키)** : 세션키 (ses key) 는 1 회용으로 랜덤으로 생성되는 키로서 대칭키(sym key) 를 암호화할 목적으로 사용됩니다. encrypted_ses_key 는 고객사에게 받은 공개키 (public_key) 를 이용하여 RSA 로 세션키 (key) 를 암호화한 데이터입니다.
 *
 *         **encrypted_sym_key(암호화된 대칭키)**: 대칭키 (sym key) 는 실제 서비스에서 활용되는 AES 암호화 대칭키로서 실제 중요 정보를 암호화할 목적으로 사용됩니다 encrypted_sym_key 는 세션키 (ses_ 를 이용 하여AES256 으로 대칭키 sym key) 를 암호화한 데이터입니다
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
 *           description: OK - `KX000`
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
 *                     description: 결과메세지 (`Key exchanged successfully.`)
 *                   data:
 *                     type: object
 *                     properties:
 *                       encrypted_ses_key:
 *                         type: string
 *                         description: RSA 암호화된 세션키 (`taATptTBxKQgtkCnlbqoPwnHHa3cX4nw+izsH+eAkv5uQEpkp9CWSPFDZ46EXdcaw9p0EEZg9cHV+nbmaOEI0iUr2z1Rbo82XcuuyDjbFRheuvyrNUu36uM6oEtdZ4cQ8Q58lgcLx0Fbjk1LwpslCmbvjI3DdDRnPi2PJs7feM8HpqLTLeZYKaYPJgqSeWjPBji/lf7wfnaP4P2EMgfyKPHpPXxkNW4Yy+fBU+eNOIRb0zSdxdmQLcPvD881bEyG53+YY5KPAOyIYjtN24n6Jr+0u5bNuui0sMhbPNv9c5fefx5WrvWIdKhLgbtP3AlP+Ey3uHzoSH8VEY6IDscDxQ==`)
 *                       encrypted_sym_key:
 *                         type: string
 *                         description: AES 암호화된 대칭키 (`c14eada58ec59a41iUoG0h30nL7N08C1vh4xNyDdCPHOBjvnL/OQHVtXGyHD6n9RRlTDMP9UyfZxxjA/` )
 *                       expiry_date:
 *                         type: string
 *                         description: 대칭키 만료 일자 (`2025-05-05 15:55:00`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 exchangeKeysExamples:
 *                   summary: 키교환
 *                   value:
 *                     success: true
 *                     message: "Key exchanged successfully."
 *                     data:
 *                       encrypted_ses_key: "taATptTBxKQgtkCnlbqoPwnHHa3cX4nw+izsH+eAkv5uQEpkp9CWSPFDZ46EXdcaw9p0EEZg9cHV+nbmaOEI0iUr2z1Rbo82XcuuyDjbFRheuvyrNUu36uM6oEtdZ4cQ8Q58lgcLx0Fbjk1LwpslCmbvjI3DdDRnPi2PJs7feM8HpqLTLeZYKaYPJgqSeWjPBji/lf7wfnaP4P2EMgfyKPHpPXxkNW4Yy+fBU+eNOIRb0zSdxdmQLcPvD881bEyG53+YY5KPAOyIYjtN24n6Jr+0u5bNuui0sMhbPNv9c5fefx5WrvWIdKhLgbtP3AlP+Ey3uHzoSH8VEY6IDscDxQ=="
 *                       encrypted_sym_key: "c14eada58ec59a41iUoG0h30nL7N08C1vh4xNyDdCPHOBjvnL/OQHVtXGyHD6n9RRlTDMP9UyfZxxjA/"
 *                       expiry_date: "2025-05-05 15:55:00"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `KX001`
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
 *                          | KX001 | client_id, client_secret 정보가 잘못된 경우 |
 *               examples:
 *                 clientInfoInvalid:
 *                   summary: KX001 | client_id, client_secret 정보가 잘못된 경우
 *                   value:
 *                     success: false
 *                     message: "Client ID/Client Secret mismatched"
 *                     error_code: "KX001"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = exchangeKeysRouter;
