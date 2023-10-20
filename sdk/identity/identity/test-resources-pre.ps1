[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'Medium')]
param (
    # Captures any arguments from eng/New-TestResources.ps1 not declared here (no parameter errors).
    [Parameter(ValueFromRemainingArguments = $true)]
    $RemainingArguments
)

if (!$CI) {
    # TODO: Remove this once auto-cloud config downloads are supported locally
    Write-Host "Skipping cert setup in local testing mode"
    return
}

if ($EnvironmentVariables -eq $null -or $EnvironmentVariables.Count -eq 0) {
    throw "EnvironmentVariables must be set in the calling script New-TestResources.ps1"
}

$tmp = $env:TEMP ? $env:TEMP : [System.IO.Path]::GetTempPath()
$pfxPath = Join-Path $tmp "test.pfx"
$pemPath = Join-Path $tmp "test.pem"
$sniPath = Join-Path $tmp "testsni.pfx"
$sniPemPath = Join-Path $tmp "testsni.pem"

Write-Host "Creating identity test files: $pfxPath $pemPath $sniPath $sniPemPath"

# javascript wants to read \n escaped as \\n which does not match the certificate pattern regex in the identity sdk
# Convert to real newlines before writing to the file
$pemContents = $EnvironmentVariables['PEM_CONTENTS'] -replace "\n","`n"
$sniPemContents = $EnvironmentVariables['SNI_PEM_CONTENTS'] -replace "\n","`n"
Set-Content -Path $pemPath -Value $pemContents
Set-Content -Path $sniPemPath -Value $sniPemContents
[System.Convert]::FromBase64String($EnvironmentVariables['PFX_CONTENTS']) | Set-Content -Path $pfxPath -AsByteStream
[System.Convert]::FromBase64String($EnvironmentVariables['SNI_CONTENTS']) | Set-Content -Path $sniPath -AsByteStream

# Set for pipeline
Write-Host "##vso[task.setvariable variable=IDENTITY_SP_CERT_PFX;]$pfxPath"
Write-Host "##vso[task.setvariable variable=IDENTITY_SP_CERT_PEM;]$pemPath"
Write-Host "##vso[task.setvariable variable=IDENTITY_SP_CERT_SNI;]$sniPath"
Write-Host "##vso[task.setvariable variable=IDENTITY_SP_CERT_SNI_PEM;]$sniPemPath"
# Set for local
$env:IDENTITY_SP_CERT_PFX = $pfxPath
$env:IDENTITY_SP_CERT_PEM = $pemPath
$env:IDENTITY_SP_CERT_SNI = $sniPath
$env:IDENTITY_SP_CERT_SNI_PEM = $sniPemPath
