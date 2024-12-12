const router = require("express").Router();
// const user = require("./user");
const common = require("./common");
const oauth = require("./oauth");
const encrypt = require("./AESencrypt");
const ocr = require("./ocr");
const ocrDoc = require("./ocr-doc");
const status = require("./status");
const statusDoc = require("./status-doc");
const masking = require("./masking");
const face = require("./face");
const account = require("./account");

/**
 * @swagger
 * tags:
 *   - name: Common
 *     description: Http Status Code & Common Error Code
 *   - name: Oauth
 *     description: |
 *       OAuth API는 클라이언트 애플리케이션 인증 및 권한 부여를 위해 사용됩니다.  이 API는 보안 표준을 준수하며, OAuth 2.0 프로토콜에 따라 권한 부여 및 액세스를 관리합니다.
 *
 *       **주의:** `Try it out` 기능을 사용 시 서버 URL을 `https://auth.useb.co.kr`로 설정해야 합니다.
 *   - name: Encrypt
 *     description: |
 *       한국인터넷진흥원(KISA)의 권장 암호화 알고리즘을 사용하고, 금융보안원의 <금융부분 암호기술 활용 가이드, 2019.1, AGR-VII-2019-2-84>를 근거하여 데이터 암호화 및 키 관리를 제공하는 기능을 제공합니다.
 *
 *       **주의:** `Try it out` 기능을 사용 시 서버 URL을 `https://auth.useb.co.kr`로 설정해야 합니다.
 *   - name: OCR
 *     description: |
 *       1장의 신분증을 활용하여 필요한 정보들을 파싱하는 기능입니다.
 *
 *       **주의:** `Try it out` 기능을 사용 시 서버 URL을 `https://api3.useb.co.kr`로 설정해야 합니다.
 *   - name: Status
 *     description: |
 *       신분증의 정보를 정부 및 공공 서비스 기관에서 연계하여 유효검증 결과를 반환하는 기능입니다.
 *
 *       **주의:** `Try it out` 기능을 사용 시 서버 URL을 `https://api3.useb.co.kr`로 설정해야 합니다.
 *   - name: Masking
 *     description: |
 *       신분증 이미지에서 민감한 정보를 보호하기 위해 1장의 신분증 이미지를 마스킹 처리하는 기능입니다.
 *
 *       **주의:** `Try it out` 기능을 사용 시 서버 URL을 `https://api3.useb.co.kr`로 설정해야 합니다.
 *   - name: Face
 *     description: |
 *       얼굴 인식과 관련 된 기능입니다. 매칭(Match)과 진위확인 (Liveness) 얼굴 데이터를 기반으로 신뢰할 수 있는 인증 및 검증하는 기능입니다.
 *
 *       **주의:** `Try it out` 기능을 사용 시 서버 URL을 `https://api3.useb.co.kr`로 설정해야 합니다.
 *   - name: 1 KRW bank account verification
 *     description: |
 *       1원계좌인증 서비스는 오픈뱅킹API, 펌뱅킹API, 펌뱅킹-프리미엄 API 3가지 방식으로 제공합니다.
 *
 *       온라인투자연계사업자(P2P), 가상자산사업자는 오픈뱅킹 API 사용이 불가하므로, 펌뱅킹 방식으로 연동해 드립니다.
 *
 *       **주의:** `Try it out` 기능을 사용 시 서버 URL을 `https://openapi.useb.co.kr`로 설정해야 합니다.
 */
// router.use("/user", user);
router.use("/common", common);
router.use("/oauth", oauth);
router.use("/encrypt", encrypt);
router.use("/ocr", ocr);
router.use("/ocr-doc", ocrDoc);
router.use("/status", status);
router.use("/status-doc", statusDoc);
router.use("/masking", masking);
router.use("/face", face);
router.use("/account", account);

module.exports = router;
