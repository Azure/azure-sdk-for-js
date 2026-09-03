# Voice Agent Tests Scripts

This directory contains automation scripts for recording voice agent tests and managing test assets.

## Scripts

### record-voice-agent-tests.ps1 (Recommended)
PowerShell script for recording voice agent tests and updating `assets.json`.

**Usage:**
```powershell
cd sdk/ai/ai-projects/
./scripts/record-voice-agent-tests.ps1
```

**Options:**
```powershell
# Skip recording, only do playback verification
./scripts/record-voice-agent-tests.ps1 -SkipRecord

# Skip playback verification
./scripts/record-voice-agent-tests.ps1 -SkipPlayback

# Both
./scripts/record-voice-agent-tests.ps1 -SkipRecord -SkipPlayback
```

### record-voice-agent-tests.sh
Bash script for recording voice agent tests and updating `assets.json`.

**Usage:**
```bash
cd sdk/ai/ai-projects/
chmod +x scripts/record-voice-agent-tests.sh
./scripts/record-voice-agent-tests.sh
```

## Before Running Scripts

### 1. Set Up Azure Credentials

```bash
# Authenticate with Azure
az login

# Set your subscription (if needed)
az account set --subscription <subscription-id>
```

### 2. Export Environment Variables

```bash
# Required
export FOUNDRY_PROJECT_ENDPOINT="https://<your-ai-service>.api.cognitive.microsoft.com/api/projects/<project-name>"
export FOUNDRY_VOICE_MODEL="gpt-realtime"

# Optional (defaults to current subscription)
export AZURE_SUBSCRIPTION_ID="<your-subscription-id>"
```

Or in PowerShell:
```powershell
$env:FOUNDRY_PROJECT_ENDPOINT = "https://<your-ai-service>.api.cognitive.microsoft.com/api/projects/<project-name>"
$env:FOUNDRY_VOICE_MODEL = "gpt-realtime"
```

### 3. Verify Prerequisites

```bash
# Check Azure login
az account show

# Check npm/npx
npx --version

# Check dev-tool
npx dev-tool --version
```

## What the Scripts Do

1. **Restore** - Downloads baseline recordings
2. **Record** - Runs tests with `TEST_MODE=record` against live Azure
3. **Verify Playback** - Runs tests with `TEST_MODE=playback` to ensure recordings are complete
4. **Push** - Uploads recordings to `Azure/azure-sdk-assets` repository
5. **Update** - Automatically updates `assets.json` with new tag

## Output

After successful execution:
- `assets.json` will be updated with a new tag
- Example new tag: `js/ai/ai-projects_abc123def456`

```json
{
  "AssetsRepo": "Azure/azure-sdk-assets",
  "AssetsRepoPrefixPath": "js",
  "TagPrefix": "js/ai/ai-projects",
  "Tag": "js/ai/ai-projects_<NEW_TAG>"
}
```

## Next Steps After Running

```bash
# 1. Verify assets.json was updated
cat assets.json

# 2. Commit changes
git add assets.json
git commit -m "Update voice agent test recordings"

# 3. Push to your branch
git push origin xitzhang/voice-agent-preview

# 4. Open a Pull Request on GitHub
gh pr create --title "Add voice agent recording tests"
```

## Troubleshooting

### "FOUNDRY_PROJECT_ENDPOINT not set"
Ensure you've exported the required environment variables before running the script.

### "Not authenticated with Azure"
Run `az login` and authenticate with your Azure account.

### "Push failed"
Ensure you have write access to `Azure/azure-sdk-assets` repository. [Request access here](https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/785/Externalizing-Recordings-(Asset-Sync))

### Tests fail during recording
- Verify the `FOUNDRY_PROJECT_ENDPOINT` is correct
- Check that the voice agent infrastructure is deployed (see `test-resources.bicep`)
- Verify your Azure account has permissions

### Playback verification fails
The recordings may be incomplete. Check the test output for errors and re-run with `TEST_MODE=record`.

## Reference

- [Asset-Sync Workflow Guide](../RECORDING_WORKFLOW.md)
- [Azure SDK Testing Guidelines](https://azure.github.io/azure-sdk/typescript_testing.html)
- [Test Proxy Documentation](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy)
