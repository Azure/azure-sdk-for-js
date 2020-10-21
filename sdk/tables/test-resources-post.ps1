# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

# This script is used to set up CORS rules for tables after storage account creation by New-TestResources.ps1
# There are no documented approaches to specifying CORS rules using ARM, this is a workaround until
# support for setting CORS rules is added to ARM for Tables

# It is invoked by the https://github.com/Azure/azure-sdk-for-js/blob/master/eng/New-TestResources.ps1
# script after the ARM template, defined in https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/test-resources.json,
# is finished being deployed. The ARM template is responsible for creating the Storage accounts needed for live tests.

param (
  [hashtable] $DeploymentOutputs
)

$storageAccountKey = $DeploymentOutputs['ACCOUNT_KEY'] 
$storageAccountName = $DeploymentOutputs['ACCOUNT_NAME']
$context = New-AzStorageContext -StorageAccountName $storageAccountName -StorageAccountKey $storageAccountKey

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
      'PUT');
    ExposedHeaders  = @('*');
  })

Set-AzStorageCORSRule -ServiceType 'Table' -CorsRules $corsRules -Context $context

Write-Verbose "CORS rule set for $storageAccountName"