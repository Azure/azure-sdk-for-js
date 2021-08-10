# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

# IMPORTANT: Do not invoke this file directly. Please instead run eng/common/TestResources/Remove-TestResources.ps1 from the repository root.

#Requires -Version 6.0
#Requires -PSEdition Core

# Use same parameter names as declared in eng/common/TestResources/Remove-TestResources.ps1 (assume validation therein).
[CmdletBinding()]
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

function PurgeKeyVault($Vault) {
  Log "Deleting Key Vault named '$($Vault.VaultName)'"
  Remove-AzKeyVault -Name "$($Vault.VaultName)" -ResourceGroupName "$($Vault.ResourceGroupName)" -Location "$($Vault.Location)" -Force

  Log "Purging Key Vault named '$($Vault.VaultName)'"
  Remove-AzKeyVault -Name "$($Vault.VaultName)" -Location "$($Vault.Location)" -InRemovedState -Force

  Log "'$($Vault.VaultName)' successfully deleted and purged."
}

function PurgeManagedHsm($ManagedHsm) {
  Log "Deleting Managed HSM named '$($ManagedHsm.Name)'"
  az keyvault delete --resource-group "$ResourceGroupName" --hsm-name "$($ManagedHsm.Name)"

  Log "Purging Managed HSM named '$($ManagedHsm.Name)'"
  az keyvault purge --hsm-name "$($ManagedHsm.Name)" --location "$($ManagedHsm.Location)"

  Log "$($ManagedHsm.Name) successfully deleted and purged."
}

Log "Permanently deleting all Key Vaults in resource group $ResourceGroupName"
Get-AzKeyVault -ResourceGroupName $ResourceGroupName | ForEach-Object { PurgeKeyVault($_) }

# TODO: Use Az module when available; for now, assumes Azure CLI is installed and in $Env:PATH.
if ($ProvisionerApplicationId -and $ProvisionerApplicationSecret -and $TenantId) {
  Log "Logging '$ProvisionerApplicationId' into the Azure CLI"
  az login --service-principal --tenant "$tenantId" --username "$ProvisionerApplicationId" --password="$ProvisionerApplicationSecret" --output none
  Log "Setting the subscription for the logged in user"
  az account set --subscription "$SubscriptionId"
} else {
  Log "No credentials provided; skipping Azure CLI login and assuming current user is logged in and is using the correct subscription."
}

Log "Permanently deleting all Managed HSMs in resource group $ResourceGroupName"
Get-AzKeyVaultManagedHsm -ResourceGroupName "$ResourceGroupName" | ForEach-Object { PurgeManagedHsm($_) }

Log "Successfully deleted and purged all Key Vaults and Managed HSMs."

if ($ProvisionerApplicationId) {
  Log "Logging out of Azure CLI"
  az logout --username "$ProvisionerApplicationId"
}
