# TheClawBay for Copilot Chat (한국어)

TheClawBay의 GPT 모델들을 GitHub Copilot Chat에서 바로 쓸 수 있게 해 주는 확장입니다.

지원 모델: **GPT-5.5, GPT-5.4, GPT-5.4 mini, GPT-5.3-Codex, GPT-5.2, GPT-5.2-Codex, GPT-5.1-Codex mini, GPT-5.1-Codex max**

**English:** [README.md](README.md)

---

## 시작 전 준비

설치 전에 아래가 모두 준비되어 있어야 합니다.

1. Visual Studio Code 최신 안정 버전
2. **GitHub Copilot** 확장이 설치되어 있고 로그인 완료
3. **GitHub Copilot Chat** 확장이 설치되어 있음
4. TheClawBay 계정과 API 키
5. 이 확장 파일 `theclawbay-for-copilot-0.2.3.vsix`

GitHub Copilot이 없으면:

- https://github.com/features/copilot 에서 가입합니다.
- VS Code 확장 탭에서 **GitHub Copilot** 과 **GitHub Copilot Chat** 두 개를 설치합니다.

TheClawBay API 키가 없으면:

- https://theclawbay.com 에 접속
- 가입 후 대시보드 열기
- API 키 생성
- 어딘가에 안전하게 복사

---

## 설치 방법

세 가지 중 하나를 고르세요.

### 1) VSIX 파일로 설치 (가장 쉬움)

1. Visual Studio Code를 엽니다.
2. 왼쪽 사이드바에서 확장 아이콘을 클릭합니다. (`Ctrl + Shift + X`)
3. 확장 패널 위쪽 `...` 메뉴를 누릅니다.
4. **VSIX에서 설치...** 를 선택합니다.
5. `theclawbay-for-copilot-0.2.3.vsix` 파일을 선택합니다.
6. VS Code가 묻는다면 **다시 시작**을 누릅니다.

### 2) 터미널에서 설치

윈도우 PowerShell:

```powershell
code --install-extension "C:\전체경로\theclawbay-for-copilot-0.2.3.vsix" --force
```

macOS / Linux:

```bash
code --install-extension "/전체/경로/theclawbay-for-copilot-0.2.3.vsix" --force
```

> 팁: `ENOENT: no such file or directory` 에러가 나면 **반드시 전체 절대 경로** 를 적으세요.

### 3) 소스에서 직접 빌드 (개발자용)

```bash
git clone https://github.com/sadw1q/theclawbay-for-copilot.git
cd theclawbay-for-copilot
npm install
npm run compile
npm run package
code --install-extension ./theclawbay-for-copilot-0.2.3.vsix --force
```

---

## 처음 한 번만 하면 되는 설정

1. 설치 후 VS Code를 한 번 재시작합니다.
2. 명령 팔레트를 엽니다:
   - Windows / Linux: `Ctrl + Shift + P`
   - macOS: `Cmd + Shift + P`
3. 다음을 검색해서 실행합니다:

```text
TheClawBay: Set API Key
```

4. 발급받은 TheClawBay API 키를 붙여넣습니다.
5. Enter를 누릅니다.

API 키는 **VS Code SecretStorage** (운영체제 키체인) 에 저장됩니다. `settings.json` 같은 일반 파일에는 저장되지 않습니다.

---

## TheClawBay 모델 사용하기

1. Copilot Chat 패널을 엽니다.
2. 채팅 상단의 **모델 선택기** 를 클릭합니다.
3. TheClawBay 모델 중 하나를 고릅니다. 예:

```text
GPT-5.5
```

4. 메시지를 입력하고 Enter. 응답이 TheClawBay에서 스트리밍으로 옵니다.

---

## 추론 강도 (Reasoning Effort) 선택

대부분의 모델은 **추론 강도** 메뉴를 모델 옆에 제공합니다. 강할수록 더 신중하게 생각하지만, 더 느리고 더 비쌉니다.

| 표시 이름                | 요청 모델 ID            | 사용 가능한 추론 강도               | 기본값 |
| ----------------------- | ----------------------- | ----------------------------------- | ------ |
| GPT-5.5                 | `gpt-5.5`               | low / medium / high / xhigh         | xhigh  |
| GPT-5.4                 | `gpt-5.4`               | minimal / low / medium / high       | medium |
| GPT-5.4 mini            | `gpt-5.4-mini`          | minimal / low / medium / high       | medium |
| GPT-5.3-Codex           | `gpt-5.3-codex`         | low / medium / high                 | medium |
| GPT-5.2                 | `gpt-5.2`               | none / low / medium / high / xhigh  | medium |
| GPT-5.2-Codex           | `gpt-5.2-codex`         | low / medium / high / xhigh         | medium |
| GPT-5.1-Codex mini      | `gpt-5.1-codex-mini`    | medium / high                       | medium |
| GPT-5.1-Codex max       | `gpt-5.1-codex-max`     | none / medium / high / xhigh        | medium |

추론 강도 바꾸는 법:

1. Copilot Chat 모델 선택기를 엽니다.
2. 사용 중인 모델에 마우스를 올리고 톱니바퀴/메뉴 아이콘을 누릅니다.
3. 원하는 추론 강도를 선택합니다.

---

## 설정 항목

VS Code 설정에서 `TheClawBay` 로 검색하면 나옵니다.

| 설정 키                          | 기본값                              | 의미                                                              |
| -------------------------------- | ----------------------------------- | ----------------------------------------------------------------- |
| `theclawbay-copilot.baseUrl`     | `https://api.theclawbay.com/v1`     | API 주소. 다른 URL로 프록시하지 않는 한 그대로 둡니다.            |
| `theclawbay-copilot.maxTokens`   | `0`                                 | 최대 출력 토큰. `0` 이면 서버 기본값.                              |
| `theclawbay-copilot.debug`       | `false`                             | **TheClawBay for Copilot** 출력 채널에 자세한 로그를 켭니다. |

로그 확인:

```text
TheClawBay: Show Logs
```

---

## 사용 가능한 명령어

모두 명령 팔레트에서 실행 가능합니다.

- **TheClawBay: Set API Key** – API 키를 SecretStorage에 저장합니다.
- **TheClawBay: Clear API Key** – 저장된 API 키를 삭제합니다.
- **TheClawBay: Open Settings** – 이 확장의 설정 화면으로 바로 이동합니다.
- **TheClawBay: Show Logs** – 진단용 출력 채널을 엽니다.

---

## 업데이트

> **⚠️ 중요 — 예전 버전(0.1.x / 0.2.0 / 0.2.1 / 0.2.2)이 이미 깔려 있다면:**
> `--force` 로 그냥 다시 설치해도 **이전 버전이 안 지워질 때가 있습니다.** 그러면 Copilot Chat 모델 선택기에 **GPT-5.5 같은 모델 1개만** 계속 보입니다. 반드시 **먼저 제거 → 새 VSIX 설치** 순서로 진행하세요.

### 권장 업데이트 절차

```bash
# 1) 현재 설치된 버전 확인
code --list-extensions --show-versions | grep theclawbay

# 2) 기존 버전 완전 제거
code --uninstall-extension theclawbay.theclawbay-for-copilot

# 3) 새 VSIX 설치 (절대 경로 사용)
code --install-extension "/전체/경로/theclawbay-for-copilot-0.2.3.vsix"

# 4) 확인
code --list-extensions --show-versions | grep theclawbay
# 결과 예: theclawbay.theclawbay-for-copilot@0.2.3
```

PowerShell:

```powershell
code --list-extensions --show-versions | Select-String theclawbay
code --uninstall-extension theclawbay.theclawbay-for-copilot
code --install-extension "C:\전체경로\theclawbay-for-copilot-0.2.3.vsix"
```

5. 설치 후 **VS Code 창을 새로 고침**: `Ctrl/Cmd + Shift + P` → **Developer: Reload Window**.
6. Copilot Chat을 열어 모델 선택기를 누르면 TheClawBay 모델 8종이 모두 보여야 합니다.

---

## 제거하기

확장 탭에서 **TheClawBay for Copilot Chat** 검색 후 **제거**.

또는 터미널:

```bash
code --uninstall-extension theclawbay.theclawbay-for-copilot
```

제거해도 API 키는 SecretStorage에 남습니다. 완전히 지우려면 제거 전에 **TheClawBay: Clear API Key** 를 먼저 실행하거나, OS 키체인에서 직접 삭제하세요.

---

## 자주 묻는 문제

**설치할 때 `ENOENT: no such file or directory`**
VSIX 전체 경로를 지정하거나, VSIX가 있는 폴더로 `cd` 한 뒤 다시 시도하세요.

**모델이 1개(예: GPT-5.5)만 보임**
이건 거의 100% **예전 버전(0.1.x / 0.2.0 / 0.2.1 / 0.2.2)이 안 지워진 채로 깔려있는 상태** 입니다. VS Code의 `--install-extension --force` 가 성공이라고 출력해도 실제로는 이전 버전이 그대로 남아 있는 경우가 있습니다.
해결:
```bash
code --uninstall-extension theclawbay.theclawbay-for-copilot
code --install-extension "/전체/경로/theclawbay-for-copilot-0.2.3.vsix"
```
그다음 `Developer: Reload Window`. 확인:
```bash
code --list-extensions --show-versions | grep theclawbay
# 0.2.3 이상이 떠야 정상
```

**Copilot Chat 모델 선택기에 TheClawBay 모델이 하나도 안 보임**
- 설치 후 VS Code를 재시작했는지 확인하세요.
- GitHub Copilot Chat이 설치/로그인되어 있어야 합니다.
- `TheClawBay: Set API Key` 를 아직 안 했다면 실행하세요.
- `TheClawBay: Show Logs` 를 열어서 `provideLanguageModelChatInformation returning N model(s)` 로그를 확인하세요. `N` 이 8이어야 정상입니다.

**`401 Unauthorized` 가 떨어짐**
- 키가 잘못됐거나 만료됐거나, 앞뒤에 공백이 들어갔을 가능성. `TheClawBay: Set API Key` 로 다시 저장하세요.

**응답이 중간에 끊김**
- `TheClawBay: Show Logs` 출력 채널을 확인하세요.
- TheClawBay 결제/한도 상태를 확인하세요.

**추론 강도 메뉴가 안 뜸**
- VS Code가 모델 메타데이터를 캐시한 상태일 수 있습니다. `Developer: Reload Window` 로 창을 새로 불러오세요.

---

## 프로젝트 구조

```
copilot-theclawbay/
├── src/
│   ├── extension.ts   # 확장 진입점
│   ├── provider.ts    # Copilot Chat provider
│   ├── client.ts      # TheClawBay HTTP 클라이언트
│   ├── convert.ts     # VS Code <-> OpenAI 메시지 변환
│   ├── models.ts      # 지원 모델과 추론 강도
│   ├── auth.ts        # API 키 저장소
│   └── logger.ts      # 출력 채널
├── package.json
├── tsconfig.json
└── README.md / README.ko.md
```

---

## 라이선스

MIT. 제공된 경우 [LICENSE](LICENSE) 참조.
