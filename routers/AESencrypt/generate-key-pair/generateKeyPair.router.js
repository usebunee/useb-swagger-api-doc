const express = require("express");
const generateKeyPairRouter = express.Router();

//! RSA2048 공개키 비밀키 생성
/**
 * @swagger
 * paths:
 *   /keys/generate-key-pair:
 *     post:
 *       summary: RSA 2048 공개키, 비밀키 생성 [테스트용 API]
 *       tags: [Encrypt]
 *       description: |
 *         RSA 2048 공개키, 비밀키를 생성하는 API 입니다.
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
 *           description: OK - `KS000`
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
 *                     description: 결과메세지 (`Key pair generated successfully.`)
 *                   data:
 *                     type: object
 *                     properties:
 *                       public_key:
 *                         type: string
 *                         description: RSA2048 공개키 (`-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBC...생략...\r\n7wIDAQAB\r\n-----END PUBLIC KEY-----` )
 *                       private_key:
 *                         type: string
 *                         description: RSA2048 비밀키 (`-----BEGIN RSA PRIVATE KEY-----\r\nMIIEpAIBAAKCAQEAw3HKw68o2MCOhoXyZmh6EK...생략...WQ==\r\n-----END RSA PRIVATE KEY-----` )
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`605c77eeec82e373fdc11dee`)
 *               examples:
 *                 clientSecretExamples:
 *                   summary: RSA2048 공개키, 비밀키 생성
 *                   value:
 *                     success: true
 *                     message: "Key pair generated successfully."
 *                     data:
 *                       public_key: "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw3HKw68o2MCOhoXyZmh6\r\nEKo+Z1lxc5fGf9qzvmnfXHi+vHgEzF6SvkAVmL5LF7J1l9ULGBYUBqeGMdSkS6Rf\r\nz+8/TtaXUEu/R7aEYwg0FWnHOXu+BadJfSyoDUxw9tfjZ7BYJjyIpmSfhYOt9X70\r\n5R5h2SRjSxBndzoxvq5eEKo8J/CFZNmc5ic+wz3ZeJzeP9fGtP+a/PY0tDuYrxii\r\nGp94T2ZavFT7nqP/NjDpEii3j3YeE1xjHjR52WrNSFRZ2ucCD9uSfefCZwK5kPfT\r\nVLBIcAk/VOr7jeRcAfvS0TEDUwEuNl3l5KpnmYD+jIFLYdpQCKY5xfzHGLp1Dp8f\r\n7wIDAQAB\r\n-----END PUBLIC KEY-----"
 *                       private_key: "-----BEGIN RSA PRIVATE KEY-----\r\nMIIEpAIBAAKCAQEAw3HKw68o2MCOhoXyZmh6EKo+Z1lxc5fGf9qzvmnfXHi+vHgE\r\nzF6SvkAVmL5LF7J1l9ULGBYUBqeGMdSkS6Rfz+8/TtaXUEu/R7aEYwg0FWnHOXu+\r\nBadJfSyoDUxw9tfjZ7BYJjyIpmSfhYOt9X705R5h2SRjSxBndzoxvq5eEKo8J/CF\r\nZNmc5ic+wz3ZeJzeP9fGtP+a/PY0tDuYrxiiGp94T2ZavFT7nqP/NjDpEii3j3Ye\r\nE1xjHjR52WrNSFRZ2ucCD9uSfefCZwK5kPfTVLBIcAk/VOr7jeRcAfvS0TEDUwEu\r\nNl3l5KpnmYD+jIFLYdpQCKY5xfzHGLp1Dp8f7wIDAQABAoIBAFfnQi8pBNIYKQJQ\r\nFGoC64O7Tj3leKVoyhqPHvCxZYiNthvGT0Ir9wwifpQoYlXSKhmT9F1s8Kzdg/m9\r\njfeHgqBfFrY6xeuTZgC3EmwIMITBAp3UDe81AlSOVTdF/jjHeLwWEE+CQmO0Nhsy\r\n0nbsFvFF7PRg7VfBlQeG4QDGJACSBWvPpfQS7y+mStc07z28chdY0hnUJWBP3gaB\r\npHikYMninTWTWY1SKiZXfKU7b31cFuHv8AhO7XuxHgMkSQQ4qLKo7QtUetkBAAIl\r\nKsQ8OYKmyhRjAr1c6a1x/unGwVIPaif33VKfKIdM8VTbDgxk8F1OJIvvGL5VCGqT\r\nyB5pn6ECgYEA/0t9zS1jYXy1JGi3O8Xzn5fK8Nv6KmAsigzp45IQbCWhWTvs4zTC\r\nqjlEbsy7BJ7lnv/COpUXR0gYny72tAuCaml1oNF/jxlfhuZ3OnypsEHYPUX9Adow\r\nK9HovOPMDQA1NEAcdzPJyWAXo8BpdnC2Je0EzbcyXCKrrBAG/RmdBZMCgYEAw/v7\r\nnXgbAsw72hspa/Yp9VtIrhT/eLPy2R2CCjT17M8zWeOzsu3rHkny+asVe3VrbVgp\r\n2VjUQdqjHg829F+4JnFTFssUFRACwIeNXUy7YSn6bhOYofHSaIkgTdP3mxQzCzbd\r\n3CAsR9FESBaLOc8hgPFAWoXPH0jNqOqCmb16dbUCgYEAvzQPGGhyEkWQdaBn+8Ca\r\nYmERgat/hdVaBlr9oY939UeJvIeBN/oAAfW6JzH2r9NCLv9mvPGE6cI5jp9h7h7g\r\nokox6yx82PQr86EQkyFjBbuK9PlCMOz1PxyLr0z9Oo95SZTqvOxwqP3rNp2ZXzez\r\ndFw8SMZ4VUEySkAGu/E/BTkCgYA8bwpyz2N85F+cbP3D5d+gYiqyS5VPsiWzn67G\r\n2PfwsyABmv6BsW3sJB+Br6jrLhUXXbVh6Utilznvff+TMaUGbbGSeMLTj+FZXzNP\r\nTucFGj24DeDmJzybsZU9ipxyvLLUxXF6fI1LBBPLKvB5vg51xW7zuwlYe0m3ycDG\r\nCbCmdQKBgQDLQUX1Fuostdc8HiB1JD7gnzR7hjDIRh8VJkbxPciYT1p0XZhXy/3R\r\nBw0q0XslbfOHL1uAUt+9iRJhCXaiGw9khP0Rx5SWRyR1fEVNhue0BnAXRPuwnTh6\r\n61PCoabwllnk9+OFnhjEhTu77NtjgoTWMnvQlIpSA36UIFbMwjBdWQ==\r\n-----END RSA PRIVATE KEY-----"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `KS001`
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
 *                          | KS001 | client_id, client_secret 정보가 잘못된 경우 |
 *               examples:
 *                 clientInfoInvalid:
 *                   summary: KS001 | client_id, client_secret 정보가 잘못된 경우
 *                   value:
 *                     success: false
 *                     message: "Client ID/Client Secret mismatched"
 *                     error_code: "KS001"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = generateKeyPairRouter;
