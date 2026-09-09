# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

[CmdletBinding()]
param(
  [ValidateRange(4, 24)]
  [int]$SasLifetimeHours = 8
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
if (Test-Path Variable:PSNativeCommandUseErrorActionPreference) {
  $PSNativeCommandUseErrorActionPreference = $false
}

$accountName = "tlsbugbashdevtest"
$containerName = "adu-import-contoso-toaster-1-0-20260720"
$endpointUri = [Uri]"https://adugen3cuse-unhappy-2.api.dev.adu.microsoft.com"
$endpointHostname = $endpointUri.Host
$manifestBlobName = "Contoso.Toaster.1.0/contoso.toaster.1.0.importmanifest.json"
$payloadBlobName = "Contoso.Toaster.1.0/README.md"
$packageRoot = Split-Path -Parent $PSScriptRoot
$environmentFile = Join-Path $packageRoot ".env"
$temporaryEnvironmentFile = "$environmentFile.tmp"

if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
  throw "Azure CLI is required. Install it, then run this command again."
}

# Use the normal interactive browser flow when no Azure CLI session is available.
& az account show --only-show-errors --output none 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "No Azure CLI session found; opening interactive browser sign-in."
  & az login --only-show-errors --output none
  if ($LASTEXITCODE -ne 0) {
    throw "Azure CLI sign-in failed."
  }
}

$start = (Get-Date).ToUniversalTime().AddMinutes(-5).ToString("yyyy-MM-ddTHH:mm:ss'Z'")
$expiry = (Get-Date).ToUniversalTime().AddHours($SasLifetimeHours).ToString("yyyy-MM-ddTHH:mm:ss'Z'")

function New-ReadOnlyBlobSasUrl {
  param(
    [Parameter(Mandatory = $true)]
    [string]$BlobName
  )

  $url = & az storage blob generate-sas `
    --account-name $accountName `
    --container-name $containerName `
    --name $BlobName `
    --permissions r `
    --start $start `
    --expiry $expiry `
    --https-only `
    --auth-mode login `
    --as-user `
    --full-uri `
    --only-show-errors `
    --output tsv

  if ($LASTEXITCODE -ne 0) {
    throw "Failed to create a user-delegation SAS URL. Verify Storage Blob Data Reader access."
  }

  $url = ($url | Out-String).Trim()
  if (-not $url.StartsWith("https://", [StringComparison]::OrdinalIgnoreCase) -or
      -not $url.Contains("?")) {
    throw "Azure CLI returned an invalid SAS URL."
  }

  return $url
}

try {
  $manifestUrl = New-ReadOnlyBlobSasUrl -BlobName $manifestBlobName
  $payloadUrl = New-ReadOnlyBlobSasUrl -BlobName $payloadBlobName

  # dev-tool loads this ignored file through dotenv. Never print these values.
  $environmentLines = @(
    # The generated client accepts a hostname and adds the https:// scheme itself.
    "DEVICE_REGISTRY_SOFTWARE_UPDATE_ENDPOINT=$endpointHostname"
    "DEVICE_REGISTRY_SOFTWARE_UPDATE_MANIFEST_URL=$manifestUrl"
    "DEVICE_REGISTRY_SOFTWARE_UPDATE_PAYLOAD_URL=$payloadUrl"
  )
  [IO.File]::WriteAllLines($temporaryEnvironmentFile, $environmentLines)
  Move-Item -Force $temporaryEnvironmentFile $environmentFile

  $env:DEVICE_REGISTRY_SOFTWARE_UPDATE_ENDPOINT = $endpointHostname
  $env:DEVICE_REGISTRY_SOFTWARE_UPDATE_MANIFEST_URL = $manifestUrl
  $env:DEVICE_REGISTRY_SOFTWARE_UPDATE_PAYLOAD_URL = $payloadUrl

  Write-Host "Test environment configured in the package .env file. SAS URLs expire at $expiry."
} finally {
  if (Test-Path $temporaryEnvironmentFile) {
    Remove-Item -Force $temporaryEnvironmentFile
  }
}
