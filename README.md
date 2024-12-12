# useb-swagger-api-doc

## 소개

이 프로젝트는 **Node.js Express 프레임워크**를 활용하여 **RESTful API 서버**를 구축하고, **Swagger**를 연동해 API 문서화를 구현한 예제입니다. 개별 클라이언트 서버를 구축하는 방식이 아닌, Express 환경에 Swagger를 통합하여 API를 효율적으로 관리하고 문서화합니다.

---

## 주요 구성

### `/swagger/swagger.js`
- **Swagger 환경설정 파일**입니다.
- API 스펙 정의와 전역 설정이 포함되어 있습니다.

### `routers/`
- 각 API 엔드포인트 관련 정보가 담긴 디렉토리입니다.
- Express Router 파일과 Swagger 정의 파일이 서로 연결됩니다.

### `/index.js`
- 루트 컨텍스트 파일로, Express 애플리케이션과 Swagger UI를 연결합니다.
- `app.use`를 통해 Swagger UI와 Express Router를 결합하여, API 문서화와 서버 기능을 통합 제공합니다.

---

## 구현 방식

### 1. Express와 Swagger를 연동하는 방식
- **직접 구현**  
  Node.js Express를 기반으로 API 서버를 구축하고 Swagger를 추가하여 API 문서를 생성합니다.  
  Swagger 설정은 JavaScript 또는 JSON 파일을 통해 이루어지며, 실제 코드와 긴밀히 연결됩니다.

- **개발 중심 접근**  
  코드 내에서 API 경로, 매개변수, 요청 및 응답 스키마를 정의하고, 이를 기반으로 Swagger 문서를 생성합니다.  
  코드와 문서 간의 **일관성 유지**가 쉽고, 개발 중 Swagger 문서가 **자동으로 업데이트**됩니다.

- **Express 미들웨어 활용**  
  Swagger UI를 Express 애플리케이션의 미들웨어로 통합합니다.  
  실행 중인 앱에서 API 문서에 직접 접근할 수 있어 개발 및 테스트 효율성이 향상됩니다.

---


## 디렉토리 구조

```plaintext
useb-swagger-api-doc/
├── index.js                 # Express 애플리케이션 시작점, 서버와 Swagger의 주요 기능을 통합하는 역할
├── routers/                 # API 라우트 디렉토리
│   ├── common/              # 공통 API 라우트 응답코드 Http Status Code & Common Error Code
│   ├── ocr/                 # OCR 관련 API
│   ├── ocr-doc/             # 사업자등록증 OCR 관련 API
│   ├── status/              # 진위확인 관련 API
│   ├── status-doc/          # 사업자등록증 진위확인 관련 API
│   ├── masking/             # 마스킹 관련 API
│   ├── face/                # 안면인증 관련 API
│   ├── Oauth/               # OAuth 관련 API
│   └── AESencrypt/          # AES 암호화 관련 API
│   └── account/             # 1원인증 관련 API
│   └── index.js             # API Swagger tags 정의 및 각 라우트 모듈을 연결하는 핵심 허브 파일
├── swagger/                 # Swagger 설정 디렉토리
│   └── swagger.js           # Swagger 설정 파일
└── package.json             # 프로젝트 설정 파일
