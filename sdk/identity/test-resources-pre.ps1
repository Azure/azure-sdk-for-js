# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

# IMPORTANT: Do not invoke this file directly. Please instead run eng/New-TestResources.ps1 from the repository root.
[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'Medium')]
param (
    # Captures any arguments from eng/New-TestResources.ps1 not declared here (no parameter errors).
    [Parameter(ValueFromRemainingArguments = $true)]
    $RemainingArguments,

    [Parameter()]
    [switch] $CI = ($null -ne $env:SYSTEM_TEAMPROJECTID)
    
)

Import-Module -Name $PSScriptRoot/../../eng/common/scripts/X509Certificate2 -Verbose

Remove-Item $PSScriptRoot/sshKey* -Force
ssh-keygen -t rsa -b 4096 -f $PSScriptRoot/sshKey -N '' -C ''
$sshKey = Get-Content $PSScriptRoot/sshKey.pub

$templateFileParameters['sshPubKey'] = $sshKey

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
