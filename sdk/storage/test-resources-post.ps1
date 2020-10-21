# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

# This script is used to set up CORS rules for queues after storage account creation by New-TestResources.ps1
# There are no documented approaches to specifying CORS rules using ARM, this is a workaround until
# support for setting CORS rules is added to ARM for Queues

# It is invoked by the https://github.com/Azure/azure-sdk-for-js/blob/master/eng/New-TestResources.ps1
# script after the ARM template, defined in https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/test-resources.json,
# is finished being deployed. The ARM template is responsible for creating the Storage accounts needed for live tests.

param (
  [hashtable] $DeploymentOutputs,
  [string] $TenantId,
  [string] $TestApplicationId,
  [string] $TestApplicationSecret
)

$storageAccountName = $DeploymentOutputs['ACCOUNT_NAME']
$context = New-AzStorageContext -StorageAccountName $storageAccountName

# https://docs.microsoft.com/en-us/powershell/module/az.storage/set-azstoragecorsrule?view=azps-3.3.0
$corsRules = (@{
    AllowedHeaders  = @('*');
    AllowedOrigins  = @('*');
    MaxAgeInSeconds = 86400;
    AllowedMethods  = @(
      'DELETE',
      'GET',
      'HEAD',
      'MERGE',
      'POST',
      'OPTIONS',
      'PUT',
      'PATCH');
    ExposedHeaders  = @('*');
  })

Set-AzStorageCORSRule -ServiceType 'Queue' -CorsRules $corsRules -Context $context

Write-Verbose "CORS rule set for $storageAccountName"


$datalakeStorageAccountName = $DeploymentOutputs['DFS_ACCOUNT_NAME']
$context = New-AzStorageContext -StorageAccountName $datalakeStorageAccountName
Set-AzStorageCORSRule -ServiceType 'Blob' -CorsRules $corsRules -Context $context
Write-Verbose "CORS rule set for $datalakeStorageAccountName"

# Run any post deployment script and set any additional keys to set in Env
$AdditionalEnvKeys = @{}

# Create SAS for storage account with additional permissions that are not supported by SRP deployment
$storageAccount = $DeploymentOutputs['ACCOUNT_NAME']
Write-Host "Creating SAS for storage account $storageAccount"
$storageContext = New-AzStorageContext -StorageAccountName $storageAccount -StorageAccountKey $DeploymentOutputs['ACCOUNT_KEY']
$storageSas = New-AzStorageAccountSASToken -ResourceType Service, Container, Object -Service Blob, File, Queue, Table -Permission "rwdxftlacup" -Context $storageContext
$AdditionalEnvKeys["ACCOUNT_SAS"] = $storageSas

$datalakeStorageAccount = $DeploymentOutputs['DFS_ACCOUNT_NAME']
Write-Host "Creating SAS for datalake storage account $datalakeStorageAccount"
$storageContext = New-AzStorageContext -StorageAccountName $datalakeStorageAccount -StorageAccountKey $DeploymentOutputs['DFS_ACCOUNT_KEY']
$storageSas = New-AzStorageAccountSASToken -ResourceType Service, Container, Object -Service Blob, File, Queue, Table -Permission "rwdxftlacup" -Context $storageContext
$AdditionalEnvKeys["DFS_ACCOUNT_SAS"] = $storageSas

$fullStorageAccount = $DeploymentOutputs['FULL_ACCOUNT_NAME']
Write-Host "Creating SAS for full storage account $fullStorageAccount"
$storageContext = New-AzStorageContext -StorageAccountName $fullStorageAccount -StorageAccountKey $DeploymentOutputs['FULL_ACCOUNT_KEY']
$storageSas = New-AzStorageAccountSASToken -ResourceType Service, Container, Object -Service Blob, File, Queue, Table -Permission "rwdxftlacup" -Context $storageContext
$AdditionalEnvKeys["FULL_ACCOUNT_SAS"] = $storageSas
$AdditionalEnvKeys["SOFT_DELETE_ACCOUNT_SAS"] = $storageSas

# Try to detect the shell based on the parent process name (e.g. launch via shebang).
$shell, $shellExportFormat = if (($parentProcessName = (Get-Process -Id $PID).Parent.ProcessName) -and $parentProcessName -eq 'cmd') {
  'cmd', 'set {0}={1}'
}
elseif (@('bash', 'csh', 'tcsh', 'zsh') -contains $parentProcessName) {
  'shell', 'export {0}={1}'
}
else {
  'PowerShell', '$env:{0} = ''{1}'''
}

$CI = ($null -ne $env:SYSTEM_TEAMPROJECTID)

# Set additional keys as ENV variables
foreach ($key in $AdditionalEnvKeys.Keys) {
  $value = $AdditionalEnvKeys[$key]
  $environmentVariables[$key] = $value

  if ($CI) {
    # Treat all ARM template output variables as secrets since "SecureString" variables do not set values.
    # In order to mask secrets but set environment variables for any given ARM template, we set variables twice as shown below.
    Write-Host "Setting variable '$key': ***"
    Write-Host "##vso[task.setvariable variable=_$key;issecret=true;]$($value)"
    Write-Host "##vso[task.setvariable variable=$key;]$($value)"
  }
  else {
    Write-Host ($shellExportFormat -f $key, $value)
  }
}
