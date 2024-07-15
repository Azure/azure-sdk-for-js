# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

# IMPORTANT: Do not invoke this file directly. Please instead run eng/New-TestResources.ps1 from the repository root.
[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'Medium')]
param (
    # Captures any arguments from eng/New-TestResources.ps1 not declared here (no parameter errors).
    [Parameter(ValueFromRemainingArguments = $true)]
    $RemainingArguments,

    [Parameter()]
    [switch] $CI = ($null -ne $env:SYSTEM_TEAMPROJECTID),

    [Parameter()]
    [hashtable] $AdditionalParameters = @{}
    
)

Import-Module -Name $PSScriptRoot/../../eng/common/scripts/X509Certificate2 -Verbose

Remove-Item $PSScriptRoot/sshKey* -Force
ssh-keygen -t rsa -b 4096 -f $PSScriptRoot/sshKey -N '' -C ''
$sshKey = Get-Content $PSScriptRoot/sshKey.pub

$templateFileParameters['sshPubKey'] = $sshKey

# Get the max version that is not preview and then get the name of the patch version with the max value
az login --service-principal -u $TestApplicationId --tenant $TenantId --allow-no-subscriptions --federated-token $env:ARM_OIDC_TOKEN
$versions = az aks get-versions -l westus -o json | ConvertFrom-Json
Write-Host "AKS versions: $($versions | ConvertTo-Json -Depth 100)"
$patchVersions = $versions.values | Where-Object { $_.isPreview -eq $null } | Select-Object -ExpandProperty patchVersions
Write-Host "AKS patch versions: $($patchVersions | ConvertTo-Json -Depth 100)"
$latestAksVersion = $patchVersions | Get-Member -MemberType NoteProperty | Select-Object -ExpandProperty Name | Sort-Object -Descending | Select-Object -First 1
Write-Host "Latest AKS version: $latestAksVersion"
$templateFileParameters['latestAksVersion'] = $latestAksVersion

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

Write-Host "Creating identity test files: $pfxPath $pemPath"

# javascript wants to read \n escaped as \\n which does not match the certificate pattern regex in the identity sdk
# Convert to real newlines before writing to the file
$pemContents = $EnvironmentVariables['PEM_CONTENTS'] -replace "\n","`n"
Set-Content -Path $pemPath -Value $pemContents
[System.Convert]::FromBase64String($EnvironmentVariables['PFX_CONTENTS']) | Set-Content -Path $pfxPath -AsByteStream

# Set for pipeline
Write-Host "##vso[task.setvariable variable=IDENTITY_SP_CERT_PFX;]$pfxPath"
Write-Host "##vso[task.setvariable variable=IDENTITY_SP_CERT_PEM;]$pemPath"
# Set for local
$env:IDENTITY_SP_CERT_PFX = $pfxPath
$env:IDENTITY_SP_CERT_PEM = $pemPath


if ($CI) {
  # Install this specific version of the Azure CLI to avoid https://github.com/Azure/azure-cli/issues/28358.
  pip install azure-cli=="2.56.0"
  # The owner is a service principal
  $templateFileParameters['principalUserType'] = 'ServicePrincipal'
  Write-Host "Sleeping for a bit to ensure service principal is ready."
  Start-Sleep -s 45
}

$az_version = az version
Write-Host "Azure CLI version: $az_version"
