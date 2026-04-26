# Setup script for Azure AI Content Understanding JavaScript SDK users
# (Windows / cross-platform PowerShell). Probes / installs Node.js, installs
# the SDK package (npm or local tarball fallback), collects endpoint +
# credentials + model deployment names, writes .env (preserving any existing
# keys), copies it into the samples folder, and verifies the resulting setup
# against the live Foundry endpoint with 5 checks.

[CmdletBinding()]
param(
    [string]$Endpoint = "",
    [string]$ApiKey = "",
    [switch]$VerifyOnly,
    [switch]$NonInteractive,
    [switch]$Local,
    [switch]$SkipInstall,
    [Alias("h")][switch]$Help
)

$ErrorActionPreference = "Stop"

# ─── Paths ────────────────────────────────────────────────────────────────────
$ScriptDir   = Split-Path -Parent $MyInvocation.MyCommand.Path
$PackageRoot = (Resolve-Path (Join-Path $ScriptDir "../../../..")).Path
$RepoRoot    = (Resolve-Path (Join-Path $PackageRoot "../../..")).Path
$EnvFile        = Join-Path $PackageRoot ".env"
$SampleEnvFile  = Join-Path $PackageRoot "sample.env"
$JsSamplesDir   = Join-Path $PackageRoot "samples/v1/javascript"
$SampleEnvTarget = Join-Path $JsSamplesDir ".env"
$ApiVersion  = "2025-11-01"
$PackageName = "@azure/ai-content-understanding"

# ─── Help ─────────────────────────────────────────────────────────────────────
if ($Help) {
    @"
Azure AI Content Understanding — JavaScript Setup

Usage: .\setup_user_env.ps1 [options]

Options:
  -Endpoint URL        Override endpoint (skip the endpoint prompt)
  -ApiKey KEY          Override API key (skip the API key prompt)
  -VerifyOnly          Skip install/config phase; only run the 5-check verification
  -NonInteractive      Do not prompt; use existing .env / env vars / overrides
  -Local               Force local build + tarball install (skip npm registry)
  -SkipInstall         Skip the SDK install step (assume node_modules present)
  -Verbose             Show full HTTP responses during verification (built-in)
  -Help                Show this help

Behavior:
  1. Probe and (optionally) install Node.js (>= 20) and pnpm.
  2. Detect existing .env; ask before overwriting.
  3. Collect endpoint, auth method, and model deployment names; probe the
     Foundry resource for existing model defaults to prefill answers.
  4. Write .env (gitignored) at the package root.
  5. Install the SDK in samples/v1/javascript/ (npm registry, or local
     pnpm build + tarball if the package is not yet published).
  6. Copy .env into the samples directory so 'dotenv/config' can load it.
  7. Run a 5-step verification against the live endpoint.
"@ | Write-Host
    exit 0
}

# ─── Output helpers ───────────────────────────────────────────────────────────
$script:Pass = 0
$script:Fail = 0
function Write-Section { param([string]$Msg) Write-Host ""; Write-Host $Msg -ForegroundColor White }
function Write-Pass    { param([string]$Msg) Write-Host "  ✓ $Msg" -ForegroundColor Green;  $script:Pass++ }
function Write-FailMsg { param([string]$Msg) Write-Host "  ✗ $Msg" -ForegroundColor Red;    $script:Fail++ }
function Write-WarnMsg { param([string]$Msg) Write-Host "  ⚠ $Msg" -ForegroundColor Yellow }
function Write-Info    { param([string]$Msg) Write-Host "  $Msg" -ForegroundColor DarkGray }
function Write-Fix     { param([string]$Msg) Write-Host "    Fix: $Msg" -ForegroundColor Yellow }
function Read-PromptDefault {
    param([string]$PromptText, [string]$Default = "")
    $suffix = if ($Default) { " [$Default]" } else { "" }
    $val = Read-Host "  $PromptText$suffix"
    if ([string]::IsNullOrWhiteSpace($val)) { return $Default }
    return $val
}

# ─── Phase 1: Node.js probe / install ─────────────────────────────────────────
function Test-Node {
    $cmd = Get-Command node -ErrorAction SilentlyContinue
    if (-not $cmd) { return @{ Ok = $false; Reason = "missing"; Version = "" } }
    try {
        $v = (& node --version 2>$null) -replace '^v',''
        if (-not $v) { return @{ Ok = $false; Reason = "missing"; Version = "" } }
        $major = [int]($v -split '\.')[0]
        if ($major -lt 20) { return @{ Ok = $false; Reason = "too_old"; Version = $v } }
        return @{ Ok = $true; Version = $v }
    } catch {
        return @{ Ok = $false; Reason = "missing"; Version = "" }
    }
}

function Install-Node {
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        Write-Host "    Running: winget install OpenJS.NodeJS.LTS"
        $proc = Start-Process -FilePath winget -ArgumentList @("install","--exact","--id","OpenJS.NodeJS.LTS","--accept-source-agreements","--accept-package-agreements") -NoNewWindow -PassThru -Wait
        if ($proc.ExitCode -ne 0) { return $false }
    } elseif (Get-Command brew -ErrorAction SilentlyContinue) {
        Write-Host "    Running: brew install node"
        & brew install node
        if ($LASTEXITCODE -ne 0) { return $false }
    } else {
        Write-Host "    No supported package manager found. Install Node.js LTS from https://nodejs.org/"
        return $false
    }
    return $true
}

if (-not $VerifyOnly) {
    Write-Section "Step 1: Node.js"
    $probe = Test-Node
    if ($probe.Ok) {
        Write-Pass "node $($probe.Version)"
    } else {
        if ($probe.Reason -eq "too_old") {
            Write-WarnMsg "Found Node $($probe.Version), need >= 20."
        } else {
            Write-WarnMsg "Node.js not found on PATH."
        }
        if ($NonInteractive) {
            Write-FailMsg "Node.js >= 20 is required. Install it and re-run."
            exit 1
        }
        $reply = Read-Host "  Install Node.js LTS now? (y/N)"
        if ($reply -match '^[Yy]$') {
            if (Install-Node) {
                $probe2 = Test-Node
                if ($probe2.Ok) {
                    Write-Pass "node $($probe2.Version)"
                } else {
                    Write-FailMsg "Install completed but probe still fails. Open a new shell and try again."
                    exit 1
                }
            } else {
                Write-FailMsg "Install failed. Install manually from https://nodejs.org/ and re-run."
                exit 1
            }
        } else {
            Write-FailMsg "Install Node.js >= 20 manually then re-run."
            exit 1
        }
    }
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-FailMsg "npm not found (should ship with Node.js)."
        exit 1
    }
    Write-Pass "npm $(npm --version)"
    if (Get-Command pnpm -ErrorAction SilentlyContinue) {
        Write-Pass "pnpm $(pnpm --version)"
    } else {
        Write-WarnMsg "pnpm not found (only required for -Local build path)."
        Write-Info "  Install with: npm install -g pnpm"
    }
}

# ─── Helpers: .env read/write ─────────────────────────────────────────────────
function Read-EnvValue {
    param([string]$Key, [string]$Default = "")
    if (-not (Test-Path $EnvFile)) { return $Default }
    $line = Select-String -Path $EnvFile -Pattern "^$Key=" -ErrorAction SilentlyContinue | Select-Object -Last 1
    if (-not $line) { return $Default }
    $v = ($line.Line -replace "^$Key=",'').Trim()
    $v = $v -replace '^"','' -replace '"$',''
    $v = $v -replace "^'",'' -replace "'$",''
    if ($v) { return $v } else { return $Default }
}

function Set-EnvValue {
    param([string]$Key, [string]$Value)
    if (-not (Test-Path $EnvFile)) {
        Set-Content -Path $EnvFile -Value "$Key=$Value" -Encoding utf8
        return
    }
    $lines = Get-Content $EnvFile
    $found = $false
    $out = foreach ($line in $lines) {
        if ($line -match "^$Key=") { $found = $true; "$Key=$Value" } else { $line }
    }
    if (-not $found) { $out = @($out) + "$Key=$Value" }
    $out | Set-Content -Path $EnvFile -Encoding utf8
}

# ─── Auth + HTTP helpers ──────────────────────────────────────────────────────
function Get-AccessToken {
    if (Get-Command az -ErrorAction SilentlyContinue) {
        try {
            $t = & az account get-access-token --resource "https://cognitiveservices.azure.com" --query accessToken -o tsv 2>$null
            if ($t -and $t -ne "null") { return $t }
        } catch { }
    }
    return $null
}

function Invoke-Cu {
    param([string]$Url, [string]$Token, [string]$Key)
    $headers = @{ "Content-Type" = "application/json" }
    if ($Key)        { $headers["Ocp-Apim-Subscription-Key"] = $Key }
    elseif ($Token)  { $headers["Authorization"] = "Bearer $Token" }
    $start = [DateTime]::Now
    try {
        $resp = Invoke-WebRequest -Uri $Url -Headers $headers -Method GET -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
        return @{ Code = [int]$resp.StatusCode; Body = $resp.Content; Time = [int]([DateTime]::Now - $start).TotalMilliseconds }
    } catch [System.Net.WebException] {
        $code = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 0 }
        $body = ""
        if ($_.Exception.Response) {
            try { $body = (New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())).ReadToEnd() } catch { }
        }
        return @{ Code = $code; Body = $body; Time = [int]([DateTime]::Now - $start).TotalMilliseconds }
    } catch {
        return @{ Code = 0; Body = ""; Time = [int]([DateTime]::Now - $start).TotalMilliseconds }
    }
}

# ─── Phase 2: Collect ─────────────────────────────────────────────────────────
$EndpointFinal      = ""
$ApiKeyFinal        = ""
$Gpt41              = ""
$Gpt41Mini          = ""
$Embedding          = ""
$SkipUpdateDefaults = $false

if (-not $VerifyOnly) {
    Write-Section "Step 2: Existing configuration"
    $existingEndpoint = Read-EnvValue "CONTENTUNDERSTANDING_ENDPOINT"
    $existingKey      = Read-EnvValue "CONTENTUNDERSTANDING_KEY"
    $existingG1       = Read-EnvValue "GPT_4_1_DEPLOYMENT"
    $existingG1M      = Read-EnvValue "GPT_4_1_MINI_DEPLOYMENT"
    $existingEmb      = Read-EnvValue "TEXT_EMBEDDING_3_LARGE_DEPLOYMENT"
    if (Test-Path $EnvFile) {
        Write-Info "Existing .env detected at $EnvFile"
        if ($existingEndpoint) { Write-Info "  CONTENTUNDERSTANDING_ENDPOINT = $existingEndpoint" }
        if ($existingKey)      { Write-Info ("  CONTENTUNDERSTANDING_KEY      = " + $existingKey.Substring(0,[Math]::Min(4,$existingKey.Length)) + "…(masked)") }
        if ($existingG1)       { Write-Info "  GPT_4_1_DEPLOYMENT            = $existingG1" }
        if ($existingG1M)      { Write-Info "  GPT_4_1_MINI_DEPLOYMENT       = $existingG1M" }
        if ($existingEmb)      { Write-Info "  TEXT_EMBEDDING_3_LARGE_DEPLOYMENT = $existingEmb" }
    } elseif (Test-Path $SampleEnvFile) {
        Write-Info "No .env yet; will create from sample.env."
    }
    if ($env:CONTENTUNDERSTANDING_ENDPOINT) { Write-WarnMsg "Env var CONTENTUNDERSTANDING_ENDPOINT='$env:CONTENTUNDERSTANDING_ENDPOINT' overrides .env at runtime." }
    if ($env:CONTENTUNDERSTANDING_KEY)      { Write-WarnMsg "Env var CONTENTUNDERSTANDING_KEY is set; it overrides .env at runtime." }

    if (-not (Test-Path $EnvFile) -and (Test-Path $SampleEnvFile)) {
        Copy-Item $SampleEnvFile $EnvFile
        Write-Info "Created .env from sample.env"
    }

    Write-Section "Step 3: Endpoint and credentials"
    if ($Endpoint) {
        $EndpointFinal = $Endpoint.TrimEnd('/')
        Write-Info "Using -Endpoint override: $EndpointFinal"
    } elseif ($NonInteractive) {
        $EndpointFinal = $existingEndpoint.TrimEnd('/')
        if (-not $EndpointFinal) { Write-FailMsg "No endpoint configured (use -Endpoint or run interactively)."; exit 1 }
    } else {
        $EndpointFinal = (Read-PromptDefault "Microsoft Foundry endpoint URL (e.g. https://my-foundry.services.ai.azure.com/)" $existingEndpoint).TrimEnd('/')
        if (-not $EndpointFinal) { Write-FailMsg "Endpoint is required."; exit 1 }
    }

    if ($ApiKey) {
        $ApiKeyFinal = $ApiKey
        Write-Info "Using -ApiKey override (DefaultAzureCredential disabled)."
    } elseif ($NonInteractive) {
        $ApiKeyFinal = $existingKey
    } else {
        Write-Host ""
        Write-Host "  Authentication method:"
        Write-Host "    A) DefaultAzureCredential (recommended; uses 'az login')"
        Write-Host "    B) API Key"
        $choice = Read-Host "  Select [A/b]"
        if ($choice -match '^[Bb]$') {
            $ApiKeyFinal = Read-PromptDefault "API key (CONTENTUNDERSTANDING_KEY)" $existingKey
        } else {
            $ApiKeyFinal = ""
            if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
                Write-WarnMsg "Azure CLI ('az') not found. Install it before running samples that use DefaultAzureCredential."
            } else {
                $null = & az account show 2>$null
                if ($LASTEXITCODE -ne 0) { Write-WarnMsg "Not signed in. Run 'az login' before running samples." }
            }
        }
    }

    Write-Section "Step 4: Probing existing model defaults"
    $probeRc = 1
    $detectedG1 = ""; $detectedG1M = ""; $detectedEmb = ""
    $token = $null
    if (-not $ApiKeyFinal) { $token = Get-AccessToken }
    if (-not $token -and -not $ApiKeyFinal) {
        Write-WarnMsg "Cannot probe: no access token (run 'az login') and no API key supplied."
        $probeRc = 3
    } else {
        $r = Invoke-Cu -Url "$EndpointFinal/contentunderstanding/defaults?api-version=$ApiVersion" -Token $token -Key $ApiKeyFinal
        switch ($r.Code) {
            200 {
                try {
                    $deps = ($r.Body | ConvertFrom-Json).modelDeployments
                    if ($deps) {
                        $detectedG1  = [string]$deps."gpt-4.1"
                        $detectedG1M = [string]$deps."gpt-4.1-mini"
                        $detectedEmb = [string]$deps."text-embedding-3-large"
                    }
                } catch { }
                if ($detectedG1 -and $detectedG1M -and $detectedEmb) { $probeRc = 0 }
                elseif ($detectedG1 -or $detectedG1M -or $detectedEmb) { $probeRc = 10 }
                else { $probeRc = 2 }
            }
            401 { $probeRc = 3 }
            403 { $probeRc = 3 }
            default { $probeRc = 1 }
        }
    }

    switch ($probeRc) {
        0 {
            Write-Pass "All defaults detected: gpt-4.1=$detectedG1, gpt-4.1-mini=$detectedG1M, text-embedding-3-large=$detectedEmb"
            if ($NonInteractive) {
                $Gpt41 = $detectedG1; $Gpt41Mini = $detectedG1M; $Embedding = $detectedEmb
                $SkipUpdateDefaults = $true
            } else {
                $useDet = Read-Host "  Use these detected values? (Y/n)"
                if ($useDet -notmatch '^[Nn]$') {
                    $Gpt41 = $detectedG1; $Gpt41Mini = $detectedG1M; $Embedding = $detectedEmb
                    $SkipUpdateDefaults = $true
                }
            }
        }
        10 {
            Write-Info "Partial defaults detected; missing entries will be prompted."
            $Gpt41 = $detectedG1; $Gpt41Mini = $detectedG1M; $Embedding = $detectedEmb
        }
        2  { Write-Info "No model defaults configured on the resource yet (will be set by updateDefaults.js)." }
        3  { Write-WarnMsg "Probe authentication failed. Run 'az login' and ensure 'Cognitive Services User' role is assigned. Continuing with manual entry." }
        default { Write-WarnMsg "Probe failed. Continuing with manual entry." }
    }

    Write-Section "Step 5: Model deployment names"
    $defG1  = if ($existingG1)  { $existingG1 }  else { "gpt-4.1" }
    $defG1M = if ($existingG1M) { $existingG1M } else { "gpt-4.1-mini" }
    $defEmb = if ($existingEmb) { $existingEmb } else { "text-embedding-3-large" }
    if ($NonInteractive) {
        if (-not $Gpt41)     { $Gpt41 = $defG1 }
        if (-not $Gpt41Mini) { $Gpt41Mini = $defG1M }
        if (-not $Embedding) { $Embedding = $defEmb }
    } else {
        if (-not $Gpt41)     { $Gpt41     = Read-PromptDefault "GPT_4_1_DEPLOYMENT"               $defG1 }  else { Write-Host "  Using detected GPT_4_1_DEPLOYMENT=$Gpt41" }
        if (-not $Gpt41Mini) { $Gpt41Mini = Read-PromptDefault "GPT_4_1_MINI_DEPLOYMENT"          $defG1M } else { Write-Host "  Using detected GPT_4_1_MINI_DEPLOYMENT=$Gpt41Mini" }
        if (-not $Embedding) { $Embedding = Read-PromptDefault "TEXT_EMBEDDING_3_LARGE_DEPLOYMENT" $defEmb } else { Write-Host "  Using detected TEXT_EMBEDDING_3_LARGE_DEPLOYMENT=$Embedding" }
    }

    Write-Section "Step 6: Writing .env"
    Set-EnvValue "CONTENTUNDERSTANDING_ENDPOINT" $EndpointFinal
    Set-EnvValue "CONTENTUNDERSTANDING_KEY"      $ApiKeyFinal
    Set-EnvValue "GPT_4_1_DEPLOYMENT"            $Gpt41
    Set-EnvValue "GPT_4_1_MINI_DEPLOYMENT"       $Gpt41Mini
    Set-EnvValue "TEXT_EMBEDDING_3_LARGE_DEPLOYMENT" $Embedding
    Write-Pass "Wrote $EnvFile"
}

# ─── Phase 3: Install SDK ─────────────────────────────────────────────────────
function Install-Npm {
    Push-Location $JsSamplesDir
    try {
        $null = & npm install --silent 2>$null
        if (Test-Path (Join-Path $JsSamplesDir "node_modules/$PackageName")) {
            Write-Pass "Installed $PackageName from npm registry"
            return $true
        }
    } finally { Pop-Location }
    return $false
}

function Install-Local {
    if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
        Write-FailMsg "pnpm is required for local build but was not found."
        Write-Info "  Install with: npm install -g pnpm"
        return $false
    }
    Write-Info "  Building $PackageName locally..."
    Push-Location $RepoRoot
    try {
        & pnpm install --silent | Out-Null
        if ($LASTEXITCODE -ne 0) { Write-FailMsg "pnpm install at repo root failed."; return $false }
        & pnpm turbo build --filter="$PackageName..." --token 1 | Out-Null
        if ($LASTEXITCODE -ne 0) { Write-FailMsg "Local build via 'pnpm turbo build' failed."; return $false }
    } finally { Pop-Location }
    Push-Location $PackageRoot
    try {
        $TempDir = [System.IO.Path]::GetTempPath()
        Get-ChildItem -Path $TempDir -Filter "azure-ai-content-understanding-*.tgz" -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
        & pnpm pack --pack-destination $TempDir | Out-Null
        if ($LASTEXITCODE -ne 0) { Write-FailMsg "'pnpm pack' failed."; return $false }
    } finally { Pop-Location }
    $tgz = Get-ChildItem -Path $TempDir -Filter "azure-ai-content-understanding-*.tgz" | Select-Object -First 1
    if (-not $tgz) { Write-FailMsg "Tarball not produced."; return $false }
    Push-Location $JsSamplesDir
    try {
        & npm install --no-save --no-package-lock $tgz.FullName | Out-Null
        if ($LASTEXITCODE -ne 0) { Write-FailMsg "Installing local tarball into samples failed."; return $false }
    } finally { Pop-Location }
    Write-Pass "Installed $PackageName from local build (tarball)"
    return $true
}

if (-not $VerifyOnly -and -not $SkipInstall) {
    Write-Section "Step 7: Installing SDK in samples directory"
    if (-not (Test-Path $JsSamplesDir)) {
        Write-WarnMsg "$JsSamplesDir does not exist; skipping install step."
    } else {
        if ($Local) {
            Write-Info "  -Local flag: skipping npm registry, building locally"
            $null = Install-Local
        } elseif (Install-Npm) {
            # ok
        } else {
            Write-Info "  Package not on npm registry yet; falling back to local build..."
            $null = Install-Local
        }
    }

    Write-Section "Step 8: Copying .env into samples directory"
    if ((Test-Path $EnvFile) -and (Test-Path $JsSamplesDir)) {
        Copy-Item $EnvFile $SampleEnvTarget -Force
        Write-Pass "Copied .env to $SampleEnvTarget"
    } else {
        Write-WarnMsg "Skipped (missing .env or samples directory)."
    }
}

# ─── Phase 4: Verification ────────────────────────────────────────────────────
$script:Pass = 0
$script:Fail = 0

if ($VerifyOnly) {
    if ($Endpoint) {
        $EndpointFinal = $Endpoint.TrimEnd('/')
    } else {
        $tmpEp = if ($env:CONTENTUNDERSTANDING_ENDPOINT) { $env:CONTENTUNDERSTANDING_ENDPOINT } else { Read-EnvValue "CONTENTUNDERSTANDING_ENDPOINT" }
        $EndpointFinal = $tmpEp.TrimEnd('/')
    }
    if ($ApiKey) {
        $ApiKeyFinal = $ApiKey
    } else {
        $ApiKeyFinal = if ($env:CONTENTUNDERSTANDING_KEY) { $env:CONTENTUNDERSTANDING_KEY } else { Read-EnvValue "CONTENTUNDERSTANDING_KEY" }
    }
}

Write-Host ""
Write-Host "=== Verification ===" -ForegroundColor White

$accessToken = $null
$authMethod  = ""
if ($ApiKeyFinal) {
    $authMethod = "API Key"
} else {
    $accessToken = Get-AccessToken
    if ($accessToken) { $authMethod = "DefaultAzureCredential (az cli)" }
}

Write-Section "[1/5] Credentials"
if (-not $EndpointFinal) {
    Write-FailMsg "CONTENTUNDERSTANDING_ENDPOINT not configured"
    Write-Fix "Re-run this script without -VerifyOnly, or set the value in $EnvFile."
    Write-Host ""; Write-Host "Cannot proceed without an endpoint. Fix and re-run." -ForegroundColor Red; exit 1
} else {
    Write-Pass "Endpoint: $EndpointFinal"
}
if ($authMethod) { Write-Pass "Auth method: $authMethod" }
else {
    Write-FailMsg "No credentials available (no API key, az login failed)"
    Write-Fix "Run 'az login' or set CONTENTUNDERSTANDING_KEY in $EnvFile."
}

Write-Section "[2/5] Endpoint reachable"
$defaultsBody = ""
if (-not $authMethod) {
    Write-FailMsg "Skipped — no valid credentials (fix step 1 first)"
} else {
    $r = Invoke-Cu -Url "$EndpointFinal/contentunderstanding/defaults?api-version=$ApiVersion" -Token $accessToken -Key $ApiKeyFinal
    if ($VerbosePreference -eq 'Continue') { Write-Info "HTTP $($r.Code) ($($r.Time)ms) $($r.Body)" }
    switch ($r.Code) {
        200 { Write-Pass "GET /contentunderstanding/defaults → 200 OK ($($r.Time)ms)"; $defaultsBody = $r.Body }
        401 { Write-FailMsg "HTTP 401 — auth failed"; Write-Fix "Assign 'Cognitive Services User' role; if using API key, verify it in Azure Portal" }
        403 { Write-FailMsg "HTTP 403 — authz failed"; Write-Fix "Assign 'Cognitive Services User' role" }
        404 { Write-FailMsg "HTTP 404 — Content Understanding may not be available in this region"; Write-Fix "https://learn.microsoft.com/azure/ai-services/content-understanding/language-region-support" }
        0   { Write-FailMsg "Connection failed"; Write-Fix "Check endpoint URL: $EndpointFinal" }
        default { Write-FailMsg "HTTP $($r.Code) — Unexpected response" }
    }
}

Write-Section "[3/5] Model deployments"
$required = @("gpt-4.1","gpt-4.1-mini","text-embedding-3-large")
if (-not $defaultsBody) {
    Write-FailMsg "Skipped — could not retrieve defaults"
} else {
    try { $deps = ($defaultsBody | ConvertFrom-Json).modelDeployments } catch { $deps = $null }
    foreach ($m in $required) {
        $dep = if ($deps) { [string]$deps.$m } else { "" }
        if ($dep) { Write-Pass "$m → $dep" } else { Write-FailMsg "$m — not mapped" }
    }
}

Write-Section "[4/5] Prebuilt analyzers"
if (-not $authMethod) {
    Write-FailMsg "Skipped — no valid credentials"
} else {
    $r = Invoke-Cu -Url "$EndpointFinal/contentunderstanding/analyzers?api-version=$ApiVersion" -Token $accessToken -Key $ApiKeyFinal
    if ($r.Code -eq 200) {
        try {
            $items = (($r.Body | ConvertFrom-Json).value)
            $prebuilt = @($items | Where-Object { $_.analyzerId -like "prebuilt-*" } | Select-Object -ExpandProperty analyzerId)
            $preview = ($prebuilt | Select-Object -First 5) -join ", "
            if ($prebuilt.Count -gt 5) { $preview += ", ..." }
            Write-Pass "$($items.Count) analyzers found ($($prebuilt.Count) prebuilt: $preview)"
        } catch {
            Write-FailMsg "Could not parse response"
        }
    } else {
        Write-FailMsg "HTTP $($r.Code) listing analyzers"
    }
}

Write-Section "[5/5] Quick smoke test"
if (-not $authMethod) {
    Write-FailMsg "Skipped — no valid credentials"
} else {
    $r = Invoke-Cu -Url "$EndpointFinal/contentunderstanding/analyzers/prebuilt-read?api-version=$ApiVersion" -Token $accessToken -Key $ApiKeyFinal
    if ($r.Code -eq 200) {
        Write-Pass "prebuilt-read analyzer exists ($($r.Time)ms)"
    } elseif ($r.Code -eq 404) {
        Write-FailMsg "prebuilt-read not found"; Write-Fix "Verify the endpoint region supports Content Understanding."
    } else {
        Write-FailMsg "HTTP $($r.Code) querying prebuilt-read"
    }
}

# ─── Summary ──────────────────────────────────────────────────────────────────
Write-Host ""
$total = $script:Pass + $script:Fail
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor White
if ($script:Fail -eq 0) {
    Write-Host "Result: $($script:Pass) / $total checks passed ✓" -ForegroundColor Green
    if (-not $VerifyOnly) {
        Write-Host ""
        Write-Host "Next steps:"
        Write-Host "  1. cd $JsSamplesDir"
        if ($SkipUpdateDefaults) {
            Write-Host "  2. (Skipped) updateDefaults.js — defaults already configured."
        } else {
            Write-Host "  2. Configure model defaults (one-time per Foundry resource):"
            Write-Host "       node updateDefaults.js"
        }
        Write-Host "  3. Run a sample:"
        Write-Host "       node analyzeUrl.js"
        Write-Host "     Or use the helper script (sources .env automatically):"
        Write-Host "       .github\skills\cu-sdk-sample-run\scripts\run_sample.ps1 analyzeUrl"
    }
} else {
    Write-Host "Result: $($script:Fail) failed, $($script:Pass) passed (out of $total checks)" -ForegroundColor Red
    Write-Host "Fix the issues above and re-run with -VerifyOnly to recheck." -ForegroundColor Yellow
}
Write-Host ""

exit $script:Fail
