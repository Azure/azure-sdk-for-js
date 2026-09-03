# Voice Agent Tests Recording and Asset Update Script
# This script records the new voice agent tests and updates assets.json
# Run from: sdk/ai/ai-projects/

param(
    [switch]$SkipRecord = $false,
    [switch]$SkipPlayback = $false
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Voice Agent Tests Recording Workflow" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Check prerequisites
Write-Host ""
Write-Host "[1/5] Checking prerequisites..." -ForegroundColor Yellow

if (-not (Test-Path $PROFILE) -or -not (Get-Command npx -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm/npx is required" -ForegroundColor Red
    exit 1
}

# Check environment variables
Write-Host ""
Write-Host "[2/5] Checking Azure environment variables..." -ForegroundColor Yellow

if ([string]::IsNullOrEmpty($env:FOUNDRY_PROJECT_ENDPOINT)) {
    Write-Host "❌ FOUNDRY_PROJECT_ENDPOINT not set" -ForegroundColor Red
    Write-Host "   Set: `$env:FOUNDRY_PROJECT_ENDPOINT = 'your-endpoint'" -ForegroundColor Gray
    exit 1
}

if ([string]::IsNullOrEmpty($env:FOUNDRY_VOICE_MODEL)) {
    Write-Host "⚠️  FOUNDRY_VOICE_MODEL not set, using default: gpt-realtime" -ForegroundColor Yellow
    $env:FOUNDRY_VOICE_MODEL = "gpt-realtime"
}

# Verify Azure login
Write-Host ""
Write-Host "[3/5] Verifying Azure authentication..." -ForegroundColor Yellow

try {
    $azAccount = az account show --output json | ConvertFrom-Json
    Write-Host "✅ Authenticated as: $($azAccount.user.name)" -ForegroundColor Green
} catch {
    Write-Host "❌ Not authenticated with Azure" -ForegroundColor Red
    Write-Host "   Run: az login" -ForegroundColor Gray
    exit 1
}

# Restore baseline recordings
Write-Host ""
Write-Host "[4/5] Restoring baseline recordings..." -ForegroundColor Yellow
npx dev-tool test-proxy restore

# Record new tests
if (-not $SkipRecord) {
    Write-Host ""
    Write-Host "[5/5] Recording voice agent tests..." -ForegroundColor Yellow
    Write-Host "Running tests with TEST_MODE=record..."

    $env:TEST_MODE = "record"
    npm run test:node

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Test recording failed" -ForegroundColor Red
        exit 1
    }
}

# Verify playback
if (-not $SkipPlayback) {
    Write-Host ""
    Write-Host "Verifying recordings work in playback mode..." -ForegroundColor Yellow

    $env:TEST_MODE = "playback"
    npm run test:node

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Playback verification failed" -ForegroundColor Red
        Write-Host "   Check the recordings for completeness" -ForegroundColor Gray
        exit 1
    }
}

# Push to assets repo and update assets.json
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Pushing recordings to Azure SDK Assets..." -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

npx dev-tool test-proxy push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Push failed" -ForegroundColor Red
    exit 1
}

# Verify assets.json was updated
Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "✅ Recording Workflow Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Review the updated assets.json:" -ForegroundColor Gray
Write-Host "   cat assets.json" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Commit the changes:" -ForegroundColor Gray
Write-Host "   git add assets.json" -ForegroundColor Gray
Write-Host "   git commit -m 'Update voice agent test recordings'" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Open a Pull Request:" -ForegroundColor Gray
Write-Host "   git push origin xitzhang/voice-agent-preview" -ForegroundColor Gray
Write-Host ""
Write-Host "For more details, see RECORDING_WORKFLOW.md" -ForegroundColor Gray

Write-Host ""
Write-Host "Updated assets.json:" -ForegroundColor Cyan
Get-Content assets.json | ConvertFrom-Json | ConvertTo-Json -Depth 10 | Write-Host
