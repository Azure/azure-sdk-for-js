# Voice Agent Recording Workflow - Complete Guide

This guide walks through recording the new voice agent tests and updating `assets.json`.

## Prerequisites Setup

### 1. Azure Authentication
```bash
# Ensure you're logged in to Azure
az login

# Set your subscription
az account set --subscription <your-subscription-id>
```

### 2. Environment Variables
Export these required variables in your shell:

```bash
# Required for test recording
export FOUNDRY_PROJECT_ENDPOINT="https://<your-ai-service>.api.cognitive.microsoft.com/api/projects/<project-name>"
export FOUNDRY_VOICE_MODEL="gpt-realtime"
export AZURE_SUBSCRIPTION_ID="<your-subscription-id>"

# Optional - for additional tests
export FOUNDRY_MODEL_NAME="gpt-5.2"
export FOUNDRY_AGENT_NAME="test-agent"
export DEPLOYMENT_NAME="<your-deployment>"
```

### 3. Verify Environment
```bash
# Check that test-proxy is available
npx dev-tool test-proxy restore

# Verify Azure credentials work
az account show
```

## Recording Workflow

### Step 1: Navigate to Project Root
```bash
cd sdk/ai/ai-projects/
```

### Step 2: Restore Current Recordings (Baseline)
```bash
npx dev-tool test-proxy restore
```

This pulls existing recordings so you can see what changed.

### Step 3: Record New Tests
```bash
# Run tests in record mode against live Azure
TEST_MODE=record npm run test:node
```

This will:
- Execute all tests including the new voice agent tests
- Record all HTTP interactions to `.assets/` directory
- Store recordings locally for verification

### Step 4: Verify Playback Works
```bash
# Run tests in playback mode WITHOUT live Azure access
TEST_MODE=playback npm run test:node
```

This verifies that the recorded interactions are complete and self-contained.

### Step 5: Push Recordings to Azure SDK Assets

If playback succeeded, push to the assets repository:

```powershell
# Using PowerShell (required for the script)
cd sdk/ai/ai-projects/
./.github/skills/rerecord-tests/scripts/rerecord.ps1 -Push
```

Or manually:
```bash
# Push recordings
npx dev-tool test-proxy push

# This will output the new tag, e.g., "js/ai/ai-projects_abc123def456"
```

### Step 6: Update assets.json

Edit `sdk/ai/ai-projects/assets.json`:

```json
{
  "AssetsRepo": "Azure/azure-sdk-assets",
  "AssetsRepoPrefixPath": "js",
  "TagPrefix": "js/ai/ai-projects",
  "Tag": "js/ai/ai-projects_<NEW_TAG_FROM_PUSH>"
}
```

### Step 7: Commit and Open PR

```bash
git add assets.json
git commit -m "Update voice agent test recordings"
git push origin xitzhang/voice-agent-preview
```

Then open a PR on GitHub with the updated `assets.json`.

## Troubleshooting

### Tests Fail in Record Mode
- **Missing environment variables**: Ensure all FOUNDRY_* and AZURE_* vars are set
- **No Azure access**: Verify `az login` succeeded and you have access to the project
- **Agent doesn't exist**: The test will try to create it; ensure your account has permissions

### Playback Fails
- **Stale recordings**: Delete `.assets/` and re-record
- **Schema changes**: If API changed, update test expectations
- **Tool mismatch**: Verify connection IDs in recordings match your environment

### Push Fails
- **No write access to azure-sdk-assets**: [Request access](https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/785/Externalizing-Recordings-(Asset-Sync))
- **Tag conflicts**: Tags are immutable; create a new push will generate a new tag
- **Authentication**: Verify `gh` CLI is authenticated (`gh auth status`)

## Files Generated

During recording, these files are created:

- `.assets/` - Working directory for test-proxy (temporary)
- Recordings in `.assets/recordings/` - HTTP interactions captured
- No files should be committed to the repo; only `assets.json` is updated

## Next Steps After PR Merge

Once recordings are published:
1. Tests will run in playback mode in CI (fast, no Azure access needed)
2. `TEST_MODE=playback npm run test:node` will use the published recordings
3. New tests will be part of the regular CI/CD pipeline
4. Periodic re-recording can be done via the `rerecord-tests` skill

## Reference

- [Asset Sync Workflow](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md)
- [Test Proxy Documentation](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy)
- [Azure SDK Testing Guidelines](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#testing)
