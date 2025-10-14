# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

<#
.SYNOPSIS
    Post-generation script to apply customizations to TypeSpec-generated code.
    
.DESCRIPTION
    This script applies fixes to the generated TypeScript code that need to persist
    across TypeSpec regenerations. Run this script after regenerating the SDK from TypeSpec.
    
.EXAMPLE
    .\scripts\post-generation.ps1
#>

Write-Host "Applying post-generation customizations..." -ForegroundColor Cyan

# Fix 1: Rename endpointParam to endpoint
Write-Host "  Renaming 'endpointParam' to 'endpoint' in constructor parameters..." -ForegroundColor Yellow

$transcriptionClientPath = Join-Path $PSScriptRoot "..\src\transcriptionClient.ts"
$transcriptionContextPath = Join-Path $PSScriptRoot "..\src\api\transcriptionContext.ts"

# Fix transcriptionClient.ts
if (Test-Path $transcriptionClientPath) {
    $content = Get-Content $transcriptionClientPath -Raw
    $originalContent = $content
    
    # Replace parameter name in constructor signature
    $content = $content -replace 'constructor\s*\(\s*endpointParam:\s*string,', 'constructor(endpoint: string,'
    
    # Replace parameter usage in constructor body
    $content = $content -replace 'createTranscription\(endpointParam,', 'createTranscription(endpoint,'
    
    if ($content -ne $originalContent) {
        Set-Content $transcriptionClientPath $content -NoNewline
        Write-Host "    ✓ Updated src/transcriptionClient.ts" -ForegroundColor Green
    } else {
        Write-Host "    ℹ No changes needed in src/transcriptionClient.ts" -ForegroundColor Gray
    }
} else {
    Write-Host "    ⚠ File not found: $transcriptionClientPath" -ForegroundColor Red
}

# Fix transcriptionContext.ts
if (Test-Path $transcriptionContextPath) {
    $content = Get-Content $transcriptionContextPath -Raw
    $originalContent = $content
    
    # Replace parameter name in function signature
    $content = $content -replace 'function createTranscription\s*\(\s*endpointParam:\s*string,', 'function createTranscription(endpoint: string,'
    
    # Replace parameter usage in function body
    $content = $content -replace '\$\{endpointParam\}', '${endpoint}'
    
    if ($content -ne $originalContent) {
        Set-Content $transcriptionContextPath $content -NoNewline
        Write-Host "    ✓ Updated src/api/transcriptionContext.ts" -ForegroundColor Green
    } else {
        Write-Host "    ℹ No changes needed in src/api/transcriptionContext.ts" -ForegroundColor Gray
    }
} else {
    Write-Host "    ⚠ File not found: $transcriptionContextPath" -ForegroundColor Red
}

Write-Host ""
Write-Host "Post-generation customizations applied successfully! ✓" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run: pnpm run format" -ForegroundColor White
Write-Host "  2. Run: pnpm turbo build -F @azure/azure-ai-speech-transcription..." -ForegroundColor White
Write-Host "  3. Verify the API extractor report is updated" -ForegroundColor White
