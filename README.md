# TheClawBay for Copilot Chat

Use TheClawBay's GPT models directly inside GitHub Copilot Chat.

This extension adds **GPT-5.5, GPT-5.4, GPT-5.4 mini, GPT-5.3-Codex, GPT-5.2, GPT-5.2-Codex** to the Copilot Chat model picker.

**한국어 설명서:** [README.ko.md](README.ko.md)

---

## What you need

Before installing, prepare these:

1. Visual Studio Code (latest stable)
2. GitHub Copilot extension installed and signed in
3. GitHub Copilot Chat extension installed
4. A TheClawBay account and API key
5. The extension file: `theclawbay-for-copilot-0.3.0.vsix`

If you do not have GitHub Copilot:

- Sign up at https://github.com/features/copilot
- Install **GitHub Copilot** and **GitHub Copilot Chat** from the VS Code Extensions tab

If you do not have a TheClawBay API key:

- Go to https://theclawbay.com
- Sign up
- Open the dashboard
- Create an API key
- Copy it somewhere safe

---

## Installation

You have three options. Pick one.

### Option 1: Install with the VSIX file (Easiest)

1. Open Visual Studio Code.
2. Press the Extensions icon on the left bar (or `Ctrl + Shift + X`).
3. Click the `...` menu at the top of the Extensions panel.
4. Pick **Install from VSIX...**
5. Choose `theclawbay-for-copilot-0.3.0.vsix`.
6. When VS Code asks, click **Reload** to restart.

### Option 2: Install from the terminal

Windows PowerShell:

```powershell
code --install-extension "C:\full\path\to\theclawbay-for-copilot-0.3.0.vsix" --force
```

macOS / Linux:

```bash
code --install-extension "/full/path/to/theclawbay-for-copilot-0.3.0.vsix" --force
```

> Tip: Use the full absolute path to avoid `ENOENT: no such file or directory` errors.

### Option 3: Build from source (developers)

```bash
git clone https://github.com/sadw1q/theclawbay-for-copilot.git
cd theclawbay-for-copilot
npm install
npm run compile
npm run package
code --install-extension ./theclawbay-for-copilot-0.3.0.vsix --force
```

---

## First-time setup

1. Restart Visual Studio Code after installing.
2. Open the Command Palette:
   - Windows / Linux: `Ctrl + Shift + P`
   - macOS: `Cmd + Shift + P`
3. Type and run:

```text
TheClawBay: Set API Key
```

4. Paste your TheClawBay API key.
5. Press Enter.

The key is stored in **VS Code SecretStorage** (the OS keychain), not in plain settings.

---

## Using a TheClawBay model

1. Open the Copilot Chat panel.
2. Click the **model picker** at the top of the chat.
3. Pick one of the TheClawBay models, for example:

```text
GPT-5.5
```

4. Type a message and press Enter. The response streams back from TheClawBay.

---

## Choosing reasoning effort

Some models expose a **Reasoning Effort** menu in the model picker. Higher effort = more careful thinking, but slower and more expensive.

Available models and supported effort levels:

| Display name             | Sent model id           | Reasoning efforts                   | Default |
| ------------------------ | ----------------------- | ----------------------------------- | ------- |
| GPT-5.5                  | `gpt-5.5`               | low / medium / high / xhigh         | xhigh   |
| GPT-5.4                  | `gpt-5.4`               | minimal / low / medium / high       | medium  |
| GPT-5.4 mini             | `gpt-5.4-mini`          | minimal / low / medium / high       | medium  |
| GPT-5.3-Codex            | `gpt-5.3-codex`         | low / medium / high                 | medium  |
| GPT-5.2                  | `gpt-5.2`               | none / low / medium / high / xhigh  | medium  |
| GPT-5.2-Codex            | `gpt-5.2-codex`         | low / medium / high / xhigh         | medium  |

To change the effort:

1. Open the Copilot Chat model picker.
2. Hover the model and click the gear / menu icon.
3. Pick a reasoning effort.

---

## Settings

Open **VS Code Settings** and search for `TheClawBay`. You will see:

| Setting key                    | Default                            | Meaning                                                          |
| ------------------------------ | ---------------------------------- | ---------------------------------------------------------------- |
| `theclawbay-copilot.baseUrl`   | `https://api.theclawbay.com/v1`    | API endpoint. Change only if you proxy TheClawBay through your own URL. |
| `theclawbay-copilot.maxTokens` | `0`                                | Max output tokens. `0` means: let the provider decide.            |
| `theclawbay-copilot.debug`     | `false`                            | Verbose logs in the **TheClawBay for Copilot** output channel.    |

To view logs:

```text
TheClawBay: Show Logs
```

---

## Commands

All available from the Command Palette:

- **TheClawBay: Set API Key** – Save your API key in SecretStorage.
- **TheClawBay: Clear API Key** – Delete the saved key.
- **TheClawBay: Open Settings** – Jump straight to the extension settings.
- **TheClawBay: Show Logs** – Open the diagnostics output channel.

---

## Updating the extension

> **⚠️ Important — if you already installed an older version (0.1.x / 0.2.0 / 0.2.1 / 0.2.2 / 0.2.3):**
> A simple `--force` reinstall sometimes does **not** replace the previous version, and Copilot Chat keeps showing only the old model list (e.g. only GPT-5.5). Always **uninstall first**, then install the new VSIX.

### Recommended upgrade steps

```bash
# 1) Check which version is currently installed
code --list-extensions --show-versions | grep theclawbay

# 2) Uninstall the old version completely
code --uninstall-extension theclawbay.theclawbay-for-copilot

# 3) Install the new VSIX (use the absolute path)
code --install-extension "/full/path/to/theclawbay-for-copilot-0.3.0.vsix"

# 4) Verify
code --list-extensions --show-versions | grep theclawbay
# expected: theclawbay.theclawbay-for-copilot@0.3.0
```

PowerShell:

```powershell
code --list-extensions --show-versions | Select-String theclawbay
code --uninstall-extension theclawbay.theclawbay-for-copilot
code --install-extension "C:\full\path\to\theclawbay-for-copilot-0.3.0.vsix"
```

5. **Reload VS Code window** after install: `Ctrl/Cmd + Shift + P` → **Developer: Reload Window**.
6. Open Copilot Chat → the model picker should now list all 8 TheClawBay models.

---

## Uninstall

From the Extensions tab: search **TheClawBay for Copilot Chat** and click **Uninstall**.

From the terminal:

```bash
code --uninstall-extension theclawbay.theclawbay-for-copilot
```

Your API key stays in SecretStorage even after uninstall. To wipe it, run **TheClawBay: Clear API Key** before uninstalling, or delete it from the OS keychain manually.

---

## Troubleshooting

**`ENOENT: no such file or directory` when installing**
Use the full path to the VSIX, or `cd` into the folder that contains it.

**Only one model (e.g. only GPT-5.5) appears in Copilot Chat**
This is almost always caused by an old version (0.1.x / 0.2.0 / 0.2.1 / 0.2.2 / 0.2.3) still being installed. VS Code's `--install-extension --force` does NOT always overwrite, even when it reports success.
Fix:
```bash
code --uninstall-extension theclawbay.theclawbay-for-copilot
code --install-extension "/full/path/to/theclawbay-for-copilot-0.3.0.vsix"
```
Then `Developer: Reload Window`. Verify with:
```bash
code --list-extensions --show-versions | grep theclawbay
# must show 0.3.0 or newer
```

**No TheClawBay model appears at all**
- Restart VS Code after installing.
- Make sure GitHub Copilot Chat is installed and signed in.
- Run `TheClawBay: Set API Key` if you have not yet.
- Run `TheClawBay: Show Logs` and look for `provideLanguageModelChatInformation returning N model(s)`. `N` should be 8.

**`401 Unauthorized` errors**
- Your API key is wrong, expired, or pasted with extra spaces. Run `TheClawBay: Set API Key` again.

**Response stops mid-stream**
- Check `TheClawBay: Show Logs` for HTTP errors.
- Confirm your TheClawBay quota / billing is in good standing.

**The reasoning effort menu is missing**
- Some VS Code versions cache model metadata. Reload the window: `Developer: Reload Window`.

---

## Project structure

```
copilot-theclawbay/
├── src/
│   ├── extension.ts   # Extension entry point
│   ├── provider.ts    # Copilot Chat provider
│   ├── client.ts      # TheClawBay HTTP client
│   ├── convert.ts     # VS Code <-> OpenAI message conversion
│   ├── models.ts      # Supported models and reasoning levels
│   ├── auth.ts        # API key storage
│   └── logger.ts      # Output channel
├── package.json
├── tsconfig.json
└── README.md / README.ko.md
```

---

## License

MIT. See [LICENSE](LICENSE) if included.
