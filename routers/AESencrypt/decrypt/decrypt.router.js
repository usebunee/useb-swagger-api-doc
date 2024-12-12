const express = require("express");
const decryptRouter = express.Router();

//! 대칭키 복호화
/**
 * @swagger
 * paths:
 *   /keys/decrypt:
 *     post:
 *       summary: 대칭키 복호화 [테스트용 API]
 *       tags: [Encrypt]
 *       description: |
 *         공유 된 대칭키(sym-key)를 활용해서 복호화를 진행할 수 있는 API 입니다.
 *
 *         대칭키(sym-key)를 이용하여 AES 복호화 후에 던질 수 있습니다.
 *
 *         OCR과 Masking의 response로 오는 개인정보와 신분증 이미지는 AES 암호화 되어서 리턴됩니다. 복호화를 통해서 원 데이터를 복구 시킬 수 있습니다.
 *
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
 *                 ciphertext:
 *                   type: string
 *                   description: 암호화된 데이터 (`30f1a0053e9832eeJUaIIr17C2Xs9q9y6S/fjQ==`)
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
 *                     description: 결과메세지 (`Decrypted successfully`)
 *                   data:
 *                     type: object
 *                     properties:
 *                       plaintext:
 *                         type: string
 *                         description: 복호화된 데이터 (개인정보 또는 신분증 이미지 base64) `홍길동`
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 decryptExamples:
 *                   summary: 대칭키 복호화
 *                   value:
 *                     success: true
 *                     message: "Decrypted successfully"
 *                     data:
 *                       plaintext: "홍길동"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 */

module.exports = decryptRouter;
