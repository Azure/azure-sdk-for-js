# Voice Agent Tests

This directory contains tests for the Azure AI Projects Voice Agent API.

## Test Files

### Recording Tests (voiceAgentManagement.spec.ts)
These tests are recorded using `@azure-tools/test-recorder` with the asset-sync workflow.

- **Test Mode**: Records HTTP interactions for playback
- **Storage**: Recordings stored in Azure/azure-sdk-assets repo
- **Asset Tracking**: assets.json tracks the current recording version
- **Uses**: Real API calls in record mode, replayed recordings in playback mode

### Live Tests (voiceAgentRealtimeLive.spec.ts)
These tests run only in live mode and test real-time WebSocket streaming.

- **Test Mode**: Live/Integration tests only
- **Uses**: Real WebSocket connections to voice agent API
- **Environment**: Requires FOUNDRY_VOICE_MODEL environment variable

## Test Fixtures

The `data/` directory contains audio fixtures:
- `input.pcm`: Sample PCM audio input for voice agent testing
- `output.pcm`: Sample PCM audio output from voice agent

## Recording Workflow

This package uses the **asset-sync workflow** where recordings are stored externally in `Azure/azure-sdk-assets` and tracked via `assets.json`.

### Step 1: Generate New Recordings

To record fresh test data against live Azure resources:

```bash
cd sdk/ai/ai-projects/

# Restore current recordings baseline
npx dev-tool test-proxy restore

# Record new tests (requires live Azure access)
TEST_MODE=record npm run test:node
```

### Step 2: Verify Recordings Work in Playback

```bash
TEST_MODE=playback npm run test:node
```

### Step 3: Push Recordings and Update assets.json

From the project root `sdk/ai/ai-projects/`:

```powershell
./.github/skills/rerecord-tests/scripts/rerecord.ps1 -Push
```

Or manually:

```bash
npx dev-tool test-proxy push
# Then update the Tag in assets.json and commit
```

## Prerequisites for Recording

- Live Azure access with proper authentication (`az login`)
- Required environment variables:
  - `FOUNDRY_PROJECT_ENDPOINT`
  - `FOUNDRY_VOICE_MODEL` (e.g., "gpt-realtime")
  - `AZURE_SUBSCRIPTION_ID`
- Write access to `Azure/azure-sdk-assets` repo

## Running Tests

### Playback Mode (Default - uses existing recordings)
```bash
npm run test:node
```

### Record Mode (Capture new interactions)
```bash
TEST_MODE=record npm run test:node
```

### Live Mode (Integration tests only)
```bash
# Set environment variables first
export FOUNDRY_PROJECT_ENDPOINT=<your-endpoint>
export FOUNDRY_VOICE_MODEL=gpt-realtime

npm run test:node -- --grep "live"
```

## Infrastructure Setup

For live tests, infrastructure is defined in `test-resources.bicep`. Deploy using:

```bash
az deployment group create \
  --resource-group <resource-group> \
  --template-file test-resources.bicep \
  --parameters baseName=<base-name>
```

## CI/CD Integration

- `ci.yml`: Standard CI configuration for build/PR triggers
- `tests.yml`: Live test pipeline configuration

Tests are automatically run by Azure Pipelines. New recordings are periodically re-captured via the `rerecord-tests` skill.

## Reference

See [`sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md`](../../../../../test-utils/recorder/ASSET_SYNC_WORKFLOW.md) for the complete asset-sync documentation.

