#!/bin/bash
# Voice Agent Tests Recording and Asset Update Script
# This script records the new voice agent tests and updates assets.json

set -e

echo "=========================================="
echo "Voice Agent Tests Recording Workflow"
echo "=========================================="

# Check prerequisites
echo ""
echo "[1/5] Checking prerequisites..."

if ! command -v pwsh &> /dev/null; then
    echo "❌ PowerShell 7 is required but not found"
    echo "   Install from: https://github.com/PowerShell/PowerShell"
    exit 1
fi

if ! command -v npx &> /dev/null; then
    echo "❌ npm is required but not found"
    exit 1
fi

# Check environment variables
echo ""
echo "[2/5] Checking Azure environment variables..."

if [ -z "$FOUNDRY_PROJECT_ENDPOINT" ]; then
    echo "❌ FOUNDRY_PROJECT_ENDPOINT not set"
    echo "   Set: export FOUNDRY_PROJECT_ENDPOINT=<your-endpoint>"
    exit 1
fi

if [ -z "$FOUNDRY_VOICE_MODEL" ]; then
    echo "⚠️  FOUNDRY_VOICE_MODEL not set, using default: gpt-realtime"
    export FOUNDRY_VOICE_MODEL="gpt-realtime"
fi

# Verify Azure login
echo ""
echo "[3/5] Verifying Azure authentication..."
if ! az account show &> /dev/null; then
    echo "❌ Not authenticated with Azure"
    echo "   Run: az login"
    exit 1
fi

echo "✅ Authenticated as: $(az account show -o json | jq -r '.user.name')"

# Restore baseline recordings
echo ""
echo "[4/5] Restoring baseline recordings..."
npx dev-tool test-proxy restore

# Record new tests
echo ""
echo "[5/5] Recording voice agent tests..."
echo "Running tests with TEST_MODE=record..."

TEST_MODE=record npm run test:node

# Verify playback
echo ""
echo "Verifying recordings work in playback mode..."
TEST_MODE=playback npm run test:node

# Push to assets repo and update assets.json
echo ""
echo "=========================================="
echo "Pushing recordings to Azure SDK Assets..."
echo "=========================================="

npx dev-tool test-proxy push

# Verify assets.json was updated
echo ""
echo "=========================================="
echo "✅ Recording Workflow Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Review the updated assets.json:"
echo "   cat assets.json"
echo ""
echo "2. Commit the changes:"
echo "   git add assets.json"
echo "   git commit -m 'Update voice agent test recordings'"
echo ""
echo "3. Open a Pull Request:"
echo "   git push origin xitzhang/voice-agent-preview"
echo ""
echo "For more details, see RECORDING_WORKFLOW.md"
