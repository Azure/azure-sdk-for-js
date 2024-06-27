# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

# This script is used to set up SIP Configuration domains for Azure Communication Services SIP Routing SDK GA tests

# It is invoked by the https://github.com/Azure/azure-sdk-for-net/blob/main/eng/New-TestResources.ps1
# script after the ARM template, defined in https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/storage/test-resources.json,
# is finished being deployed. The ARM template is responsible for creating the Storage accounts needed for live tests.

param (
    [hashtable] $DeploymentOutputs,
    [string] $TenantId,
    [string] $TestApplicationId,
    [string] $TestApplicationSecret
)

$storageAccountName = $DeploymentOutputs['STORAGE_ACCOUNT_NAME']
$containerName = $DeploymentOutputs['STORAGE_CONTAINER_NAME']
$deIdServiceEndpoint = $DeploymentOutputs['DEID_SERVICE_ENDPOINT']
$testMode = "playback"

# Set the local folder path to upload
$localFolderPath = "test\public\data\example_patient_1"

# Check if the connection string is present
if ([string]::IsNullOrWhiteSpace($storageAccountName)) {
    Write-Host "Error: Azure Storage connection string not found in environment variables."
    exit 1
}

# Load the Azure Storage module
Import-Module Az.Storage

# Connect to the storage account
$storageContext = New-AzStorageContext -StorageAccountName $storageAccountName -UseConnectedAccount
Get-AzStorageContainer -Name $containerName -Context $storageContext

# Upload the folder and its contents to the container
# Gets last folder name + filename. example_patient_1\doctor_dictation.txt
Get-ChildItem -Path $localFolderPath -Recurse | ForEach-Object {
    $relativePath = $_.FullName
    $relativePath = $relativePath.Replace("\\", "\")
    $folderName = ($relativePath -split "\\")[-2]  # Get only the folder name.
    $blobName = ($relativePath -split "\\")[-1]  # Get only the file name.
    $destinationBlob = $blobName -replace ":", ""

    $destinationBlob = "$folderName\$destinationBlob"
    Write-Host "Uploading file '$destinationBlob'"
    Set-AzStorageBlobContent -File $_.FullName -Container $containerName -Blob $destinationBlob -Context $storageContext -Force
}

Write-Host "Folder '$localFolderPath' uploaded to container '$containerName' successfully."

# Generate a SAS token for the container using User delegation key
$storageAccountSasUri = New-AzStorageContainerSASToken -Context $storageContext `
    -Name $containerName `
    -Permission racwl `
    -StartTime (Get-Date) `
    -ExpiryTime (Get-Date).AddHours(24) `
    -FullUri

$deIdServiceEndpoint = $deIdServiceEndpoint -replace '^https://', ''
# Create the content for the .env file
$content = @"
DEID_SERVICE_ENDPOINT=$deIdServiceEndpoint
TEST_MODE=$testMode
STORAGE_ACCOUNT_SAS_URI=$storageAccountSasUri
"@

# Specify the path for the .env file
$envFilePath = ".\.env"

# Write the content to the .env file, overwrite if it exists
$content | Out-File -FilePath $envFilePath -Force
