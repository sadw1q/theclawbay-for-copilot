# TheClawBay for Copilot Chat

## English

Use **GPT 5.5** from **TheClawBay** inside the Copilot Chat model picker.

### Features

- Copilot Chat model picker integration
- Per-model reasoning effort selection
- API key stored in VS Code SecretStorage
- OpenAI-compatible `/chat/completions` streaming

### Setup

1. Install the extension package.
2. Run **TheClawBay: Set API Key** from the Command Palette.
3. Open Copilot Chat and choose **GPT 5.5**.
4. Use the model menu to set reasoning effort if needed.

### Files

- Extension entry: `src/extension.ts`
- Provider logic: `src/provider.ts`
- API client: `src/client.ts`
- Message conversion: `src/convert.ts`
- Model list: `src/models.ts`
- Secret storage: `src/auth.ts`

## 한국어

**TheClawBay**의 **GPT 5.5**를 Copilot Chat 모델 선택기에서 사용할 수 있는 확장입니다.

### 기능

- Copilot Chat 모델 선택기 연동
- 모델별 추론 강도 선택
- API 키는 VS Code SecretStorage에 저장
- OpenAI 호환 `/chat/completions` 스트리밍

### 설정

1. 확장 패키지를 설치합니다.
2. 명령 팔레트에서 **TheClawBay: Set API Key**를 실행합니다.
3. Copilot Chat을 열고 **GPT 5.5**를 선택합니다.
4. 필요하면 모델 메뉴에서 추론 강도를 조정합니다.

### 파일 위치

- 확장 진입점: `src/extension.ts`
- Provider 로직: `src/provider.ts`
- API 클라이언트: `src/client.ts`
- 메시지 변환: `src/convert.ts`
- 모델 목록: `src/models.ts`
- 비밀 저장소: `src/auth.ts`
