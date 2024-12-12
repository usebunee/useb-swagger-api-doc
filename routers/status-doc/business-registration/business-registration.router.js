const express = require("express");
const businessRegistrationStatusRouter = express.Router();

//! 진위확인 사업자등록 및 휴폐업조회
/**
 * @swagger
 * paths:
 *   /status-doc/business-registration:
 *     post:
 *       summary: 사업자등록 및 휴폐업조회
 *       tags: [Status]
 *       description: |
 *         사업자등록번호가 정상적으로 등록되어 있는지, 현재 영업 상태를 확인하는 기능 입니다.
 *
 *         `Swagger UI 우측 상단 Authorize 버튼을 클릭하고, Bearer toekn 방식으로 인증 후 해당 API 사용하셔야 합니다.`
 *
 *       security:
 *         - bearerAuth: []   # Bearer token 필수 설정
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 biz_no:
 *                   type: string
 *                   description: 사업자등록번호
 *                   example: "5328700930"
 *       responses:
 *         200:
 *           description: OK - `A000`
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
 *                     description: "결과메세지 (예: `부가가치세 일반과세자`, `부가가치세 면세사업자`, `부가가치세 간이과세자`, `폐업자 (부가가치세 일반과세자, 폐업일자:2021-04-23)`)"
 *                   transaction_id:
 *                     type: string
 *                     description: "API 로그용 추적아이디 (`e33fb3db966efb6bf68a13e3bb41e528`)"
 *                 oneOf:
 *                   - type: object
 *                     properties:
 *                       tax_type_code:
 *                         type: string
 *                         description: 과세 유형 코드 (`1`)
 *                         example: "1"
 *                       tax_type_name:
 *                         type: string
 *                         description: 과세 유형 이름 (`부가가치세 일반과세자`)
 *                         example: "부가가치세 일반과세자"
 *                       closing_date:
 *                         type: string
 *                         description: 휴폐업일자 (없을 경우 빈 문자열)
 *                         example: ""
 *                       tax_type_change_date:
 *                         type: string
 *                         description: 과세 유형 전환일자 (없을 경우 빈 문자열)
 *                         example: ""
 *                   - type: object
 *                     properties:
 *                       tax_type_code:
 *                         type: string
 *                         description: 과세 유형 코드 (`2`)
 *                         example: "2"
 *                       tax_type_name:
 *                         type: string
 *                         description: 과세 유형 이름 (`부가가치세 면세사업자`)
 *                         example: "부가가치세 면세사업자"
 *                       closing_date:
 *                         type: string
 *                         description: 휴폐업일자 (없을 경우 빈 문자열)
 *                         example: ""
 *                       tax_type_change_date:
 *                         type: string
 *                         description: 과세 유형 전환일자 (없을 경우 빈 문자열)
 *                         example: ""
 *                   - type: object
 *                     properties:
 *                       tax_type_code:
 *                         type: string
 *                         description: 과세 유형 코드 (`3`)
 *                         example: "3"
 *                       tax_type_name:
 *                         type: string
 *                         description: 과세 유형 이름 (`부가가치세 간이과세자`)
 *                         example: "부가가치세 간이과세자"
 *                       closing_date:
 *                         type: string
 *                         description: 휴폐업일자 (없을 경우 빈 문자열)
 *                         example: ""
 *                       tax_type_change_date:
 *                         type: string
 *                         description: 과세 유형 전환일자 (없을 경우 빈 문자열)
 *                         example: ""
 *                   - type: object
 *                     properties:
 *                       tax_type_code:
 *                         type: string
 *                         description: 과세 유형 코드 (`4`)
 *                         example: "4"
 *                       tax_type_name:
 *                         type: string
 *                         description: 과세 유형 이름 (`폐업자`)
 *                         example: "폐업자"
 *                       closing_date:
 *                         type: string
 *                         description: 휴폐업일자 (yyyymmdd 형식)
 *                         example: "20210423"
 *                       tax_type_change_date:
 *                         type: string
 *                         description: 과세 유형 전환일자 (yyyymmdd 형식)
 *                         example: "20210623"
 *               examples:
 *                 businessRestrationExamples1:
 *                   summary: 사업자등록증 (부가가치세 일반과세자)
 *                   value:
 *                     success: true
 *                     message: "부가가치세 일반과세자"
 *                     tax_type_code: "1"
 *                     tax_type_name: "부가가치세 일반과세자"
 *                     closing_date: ""
 *                     tax_type_change_date: ""
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *                 businessRestrationExamples2:
 *                   summary: 사업자등록증 (부가가치세 면세사업자)
 *                   value:
 *                     success: true
 *                     message: "부가가치세 면세사업자"
 *                     tax_type_code: "2"
 *                     tax_type_name: "부가가치세 면세사업자"
 *                     closing_date: ""
 *                     tax_type_change_date: ""
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *                 businessRestrationExamples3:
 *                   summary: 사업자등록증 (부가가치세 간이과세자)
 *                   value:
 *                     success: true
 *                     message: "부가가치세 간이사업자"
 *                     tax_type_code: "3"
 *                     tax_type_name: "부가가치세 간이과세자"
 *                     closing_date: ""
 *                     tax_type_change_date: ""
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *                 businessRestrationExample4:
 *                   summary: 사업자등록증 (폐업자)
 *                   value:
 *                     success: true
 *                     message: "폐업자 (부가가치세 일반과세자, 폐업일자:2021-04-23) 입니다."
 *                     tax_type_code: "4"
 *                     tax_type_name: "폐업자"
 *                     closing_date: "20210423"
 *                     tax_type_change_date: "20210623"
 *                     transaction_id: "605c77eeec82e373fdc11dee"
 *         400:
 *           description: Bad Request - `A051`
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
 *                     example: "Error processing Status"
 *                   error_code:
 *                     type: string
 *                     description: >
 *                       Error Code
 *                          | Code | Description |
 *                          |------|-------------|
 *                          | A051 | 사업자등록번호가 잘못된 경우 |
 *               examples:
 *                 bizNoInvalid:
 *                   summary: A051 | 사업자등록번호가 잘못된 경우
 *                   value:
 *                     success: false
 *                     message: "잘못된 사업자등록번호입니다. 확인 후 다시 조회하시기 바랍니다."
 *                     error_code: "A051"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = businessRegistrationStatusRouter;
