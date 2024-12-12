const express = require("express");
const encryptRouter = express.Router();

//! 대칭키 암호화
/**
 * @swagger
 * paths:
 *   /keys/encrypt:
 *     post:
 *       summary: 대칭키 암호화 [테스트용 API]
 *       tags: [Encrypt]
 *       description: |
 *         공유 된 대칭키(sym-key)를 활용해서 암호화를 진행할 수 있는 API 입니다.
 *
 *         암호화를 적용하기 위해서는 각각의 API Request에서 Parameter로 `"secret_mode" : true`를 포함시켜주어야 합니다.
 *
 *         `secret_mode`를 포함하지 않는 경우, False가 default로 적용이 됩니다.
 *
 *          Request에서 포함되는 모든 Parameter들은 대칭키(sym_key)를 이용하여 AES 암호화 시킨 후에 던질수 있습니다.
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
 *                 sym_key:
 *                   type: string
 *                   description: (대칭키 AES256) `996357b0fa55af6018276d22a7fed126`
 *                   example: ""
 *                 plaintext:
 *                   type: string
 *                   description: 개인정보 텍스트 또는 이미지 base64 (`홍길동`)
 *                   example: ""
 *       responses:
 *         200:
 *           description: OK
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
 *                     description: 결과메세지 (`Encrypted successfully`)
 *                   data:
 *                     type: object
 *                     properties:
 *                       ciphertext:
 *                         type: string
 *                         description: 암호화된 데이터 (`30f1a0053e9832eeJUaIIr17C2Xs9q9y6S/fjQ==`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 encryptExamples:
 *                   summary: 대칭키 암호화
 *                   value:
 *                     success: true
 *                     message: "Encrypted successfully"
 *                     data:
 *                       ciphertext: "30f1a0053e9832eeJUaIIr17C2Xs9q9y6S/fjQ=="
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 */

module.exports = encryptRouter;
