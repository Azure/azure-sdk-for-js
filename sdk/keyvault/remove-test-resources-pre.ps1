# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

# IMPORTANT: Do not invoke this file directly. Please instead run eng/common/TestResources/Remove-TestResources.ps1 from the repository root.

#Requires -Version 6.0
#Requires -PSEdition Core

# Use same parameter names as declared in eng/common/TestResources/Remove-TestResources.ps1 (assume validation therein).
[CmdletBinding(DefaultParameterSetName = 'Default', SupportsShouldProcess = $true, ConfirmImpact = 'Medium')]
param (
    [Parameter()]
    [string] $ResourceGroupName,

    [Parameter()]
    [string] $TenantId,

    [Parameter()]
    [string] $ProvisionerApplicationId,

    [Parameter()]
    [string] $ProvisionerApplicationSecret,

    [Parameter()]
    [string] $SubscriptionId,


    # Captures any arguments from eng/New-TestResources.ps1 not declared here (no parameter errors).
    [Parameter(ValueFromRemainingArguments = $true)]
    $RemainingArguments
)

# By default stop for any error.
if (!$PSBoundParameters.ContainsKey('ErrorAction')) {
    $ErrorActionPreference = 'Stop'
}

function Log($Message) {
    Write-Host ('{0} - {1}' -f [DateTime]::Now.ToLongTimeString(), $Message)
}


# TODO: Use Az module when available; for now, assumes Azure CLI is installed and in $Env:PATH.
if ($ProvisionerApplicationId -and $ProvisionerApplicationSecret -and $TenantId) {
  Log "Logging '$ProvisionerApplicationId' into the Azure CLI"
  az login --service-principal --tenant "$tenantId" --username "$ProvisionerApplicationId" --password="$ProvisionerApplicationSecret"
  Log "Setting the subscription for the logged in user"
  az account set --subscription "$SubscriptionId"
} else {
  Log "No credentials provided; skipping Azure CLI login and assuming current user is logged in and is using the correct subscription."
}

Log "fetching the name of the deployed HSM in this resource group"
$hsmName = az keyvault list --resource-type hsm --resource-group "$ResourceGroupName" --query "[0].name" --output tsv

if ($hsmName -eq $null) {
    Log "No HSM found in resource group '$ResourceGroupName', exiting"
    exit
}

Log "Deleting Managed HSM named '$hsmName'"
az keyvault delete --resource-group "$ResourceGroupName" --hsm-name "$hsmName"

Log "Deleted Managed HSM, now purging"
az keyvault purge --hsm-name "$hsmName"

Log "Managed HSM $hsmName successfully deleted and purged."
exit 1
