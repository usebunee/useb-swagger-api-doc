const express = require("express");
const businessRegistrationAttachRouter = express.Router();

//! 사업자등록증 별지
/**
 * @swagger
 * paths:
 *   /ocr-doc/business-registration-attach:
 *     post:
 *       summary: 사업자등록증 별지 OCR
 *       tags: [OCR]
 *       description: |
 *         사업자 등록증 별지의 이미지를 파일 형식을 받아 필요한 정보를 파싱합니다.
 *
 *         `Swagger UI 우측 상단 Authorize 버튼을 클릭하고, Bearer toekn 방식으로 인증 후 해당 API 사용하셔야 합니다.`
 *       security:
 *         - bearerAuth: []   # Bearer token 필수 설정
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: 사업자등록증 이미지 (only pdf) `optional`
 *       responses:
 *         200:
 *           description: OK - `O000`
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
 *                     description: 메세지 (`OCR processed successfully`)
 *                   data:
 *                     type: object
 *                     properties:
 *                       docSize:
 *                         type: string
 *                         description: 문서 사이즈 (`1700*2338`)
 *                       docType:
 *                         type: string
 *                         description: 사업자 종류 (`법인사업자`)
 *                       companyName:
 *                         type: string
 *                         description: 회사명 (`주식회사 유스비`)
 *                       ownerName:
 *                         type: string
 *                         description: 대표명 (`김성수`)
 *                       businessRegNum:
 *                         type: string
 *                         description: 사업자등록번호 (`532-87-00930`)
 *                       businessCorpNum:
 *                         type: string
 *                         description: 법인등록번호 (`110111-6866276`)
 *                       companyAddr:
 *                         type: string
 *                         description: 사업장소재지 (`경기도 성남시 판교로 256번길 25 GB2, 7층`)
 *                       HQAddr:
 *                         type: string
 *                         description: 본점소재지 (`경기도 성남시 판교로 256번길 25 GB2, 7층`)
 *                       openDate:
 *                         type: string
 *                         description: 개업연원일 (`20180910`)
 *                       issueDate:
 *                         type: string
 *                         description: 발급일자 (`20220325`)
 *                       businessType1:
 *                         type: string
 *                         description: 업태 (`서비스업,도매 및 소매업,서비스업,서비스업`)
 *                       businessType2:
 *                         type: string
 *                         description: 종목 (`컴퓨터시스템 통합 자문 및 구축, 컴퓨터 프로그래밍 서비스업,통신판매업,자료 처리업,호스팅 및 관련 서비스업,기타 정보기술 및 컴퓨터운영 관련 서비스업`)
 *                       attachment:
 *                         type: object
 *                         properties:
 *                            businessType1:
 *                              type: string
 *                              description: 업태 (`제조업,정보통신업`)
 *                            businessType2:
 *                              type: string
 *                              description: 종목 (`인공지능 및 증강현실 개발,소프트웨어 개발`)
 *                   transaction_id:
 *                     type: string
 *                     description: API 로그용 추적아이디 (`f96e3a56faef4f73fe857046c40c7837`)
 *               examples:
 *                 alienExamples:
 *                   summary: 사업자등록증
 *                   value:
 *                     success: true
 *                     message: "OCR processed successfully"
 *                     data:
 *                       docSize: "1700*2338"
 *                       docType: "법인사업자"
 *                       companyName: "주식회사 유스비"
 *                       ownerName: "김성수"
 *                       businessRegNum: "532-87-00930"
 *                       businessCorpNum: "110111-6866276"
 *                       companyAddr: "경기도 성남시 판교로 256번길 25 GB2, 7층(삼평동)"
 *                       HQAddr: "경기도 성남시 판교로 256번길 25 GB2, 7층(삼평동)"
 *                       openDate: "20180910"
 *                       issueDate: "20220325"
 *                       businessType1: "서비스업,도매 및 소매업,서비스업,서비스업"
 *                       businessType2: "컴퓨터시스템 통합 자문 및 구축, 컴퓨터 프로그래밍 서비스업,통신판매업,자료 처리업,호스팅 및 관련 서비스업,기타 정보기술 및 컴퓨터운영 관련 서비스업"
 *                       attachment:
 *                          businessType1: [
 *                              "제조업,정보통신업"
 *                          ]
 *                          businessType2: [
 *                              "인공지능 및 증강현실 개발,소프트웨어 개발"
 *                          ]
 *                     transaction_id: "f96e3a56faef4f73fe857046c40c7837"
 *         400:
 *           description: Bad Request - `O007`, `O008`, `O013`, `O014`, `O032`, `O033`
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
 *                     example: "Error processing OCR"
 *                   error_code:
 *                     type: string
 *                     description: >
 *                       Error Code
 *                          | Code | Description |
 *                          |------|-------------|
 *                          | O007 | Reqeust Body 요청한 데이터가 비어있는 경우 |
 *                          | O008 | 엔진 처리시 오류, 재촬영 요구 필요 |
 *                          | O013 | 다른 문서 종류를 요청했을 경우 |
 *                          | O014 | 가로 길이가 800px 이하일 때 (OCR 성능을 위해서 800~1000px 권장) |
 *                          | O032 | 파일 형식이 올바르지 않은 경우 (pdf가 아닌 경우) |
 *                          | O033 | 별지가 존재하지 않는 경우 |
 *               examples:
 *                 emptyData:
 *                   summary: O007 | 이미지 없이 OCR API 호출한 경우
 *                   value:
 *                     success: true
 *                     message: "Requested data is empty"
 *                     error_code: "O007"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 engineProcessError:
 *                   summary: O008 | 엔진 처리시 오류, 재촬영 요구 필요
 *                   value:
 *                     success: true
 *                     message: "Requested data is invalid (OCR Engine cannot process the image)"
 *                     error_code: "O008"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 fileWidthTooSmall:
 *                   summary: O014 | 가로 길이가 800px 이하일 때 (800~1000px 권장)
 *                   value:
 *                     success: true
 *                     message: "Document size should be over 800 px in width"
 *                     error_code: "O014"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 fileFormatInvalid:
 *                   summary: O032 | 파일 형식이 올바르지 않은 경우 (pdf가 아닌 경우)
 *                   value:
 *                     success: true
 *                     message: "Requested file format is invalid(Only .pdf is allowed)"
 *                     error_code: "O032"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 *                 requestDocumentIsInvalid:
 *                   summary: O033 | 별지가 존재하지 않는 경우
 *                   value:
 *                     success: true
 *                     message: "Attachment page not exist"
 *                     error_code: "O033"
 *                     transaction_id: "73e6beb776de54d8f02a00e18019f32f"
 */

module.exports = businessRegistrationAttachRouter;
