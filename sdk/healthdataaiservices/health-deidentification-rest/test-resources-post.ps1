# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

# This script prepares the storage account used by the Health Deidentification live tests: it uploads the test data
# and writes a local .env file with the deployment outputs.

# It is invoked by eng/common/TestResources/New-TestResources.ps1 after test-resources.bicep is deployed.
# Role assignments and storage network rules can take several minutes to propagate after deployment, so storage
# operations are retried with backoff until access is granted, instead of relying on a fixed sleep.

param (
    [hashtable] $DeploymentOutputs,
    [string] $TenantId,
    [string] $TestApplicationId,
    [string] $TestApplicationSecret
)

function Test-TransientStorageAccessError([System.Management.Automation.ErrorRecord] $ErrorRecord) {
    $text = @(
        $ErrorRecord.Exception.ToString()
        $ErrorRecord.FullyQualifiedErrorId
    ) -join ' '

    $status = $null
    for ($ex = $ErrorRecord.Exception; $ex; $ex = $ex.InnerException) {
        foreach ($name in 'Status', 'HttpStatusCode') {
            if ($ex.PSObject.Properties[$name] -and $ex.$name) {
                $status = [int]$ex.$name
                break
            }
        }
        if ($status) { break }
    }

    if ($status -in 403, 404, 408, 429, 500, 502, 503, 504) {
        return $true
    }

    return $text -match 'AuthorizationFailure|AuthorizationPermissionMismatch|ContainerNotFound|This request is not authorized|\(403\)|Forbidden|timed out|connection.*(reset|closed|refused)|No such host'
}

function Invoke-WithStorageRetry {
    param (
        [Parameter(Mandatory)] [string] $Operation,
        [Parameter(Mandatory)] [scriptblock] $Action,
        [int] $TimeoutSeconds = 300,
        [int] $InitialDelaySeconds = 5,
        [int] $MaxDelaySeconds = 60
    )

    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    $delay = $InitialDelaySeconds
    $attempt = 0

    while ($true) {
        $attempt++
        try {
            $result = & $Action
            if ($attempt -gt 1) {
                Write-Host "'$Operation' succeeded after $attempt attempts ($([int]$stopwatch.Elapsed.TotalSeconds)s)."
            }
            return $result
        }
        catch {
            if (-not (Test-TransientStorageAccessError $_)) {
                throw
            }

            $elapsed = [int]$stopwatch.Elapsed.TotalSeconds
            $remaining = $TimeoutSeconds - $elapsed
            if ($remaining -le 0) {
                throw "Storage was not ready for '$Operation' on account '$storageAccountName', container '$containerName' " +
                    "after $attempt attempts over ${elapsed}s. This is usually a Storage Blob Data Contributor role assignment " +
                    "or storage network rule that has not finished propagating. Last error: $($_.Exception.Message)"
            }

            $sleep = [Math]::Min($delay, $remaining)
            Write-Host "Storage not ready for '$Operation' (attempt $attempt, ${elapsed}s elapsed): $($_.Exception.Message). Retrying in ${sleep}s."
            Start-Sleep -Seconds $sleep
            $delay = [Math]::Min($delay * 2, $MaxDelaySeconds)
        }
    }
}

function Wait-ForMinimumElapsed {
    param(
        [Parameter(Mandatory)] [System.Diagnostics.Stopwatch] $Stopwatch,
        [Parameter(Mandatory)] [int] $MinimumSeconds
    )

    $remaining = [int][Math]::Ceiling($MinimumSeconds - $Stopwatch.Elapsed.TotalSeconds)
    if ($remaining -gt 0) {
        Write-Host "Waiting ${remaining}s more for the DeID service identity's storage access to propagate."
        Start-Sleep -Seconds $remaining
    }
}

# Retrieve the connection string from environment variables
$resourceGroup = $DeploymentOutputs['HEALTHDATAAISERVICES_RESOURCE_GROUP']
$endpoint = $DeploymentOutputs['HEALTHDATAAISERVICES_DEID_SERVICE_ENDPOINT']
$storageAccountName = $DeploymentOutputs['HEALTHDATAAISERVICES_STORAGE_ACCOUNT_NAME']
$containerName = $DeploymentOutputs['HEALTHDATAAISERVICES_STORAGE_CONTAINER_NAME']
$storageAccountLocation = $DeploymentOutputs['HEALTHDATAAISERVICES_STORAGE_ACCOUNT_LOCATION']
$testMode = "live"

# Set the local folder path to upload
$localFolderPath = Join-Path $PSScriptRoot 'test\public\data\example_patient_1'

# Check if the connection string is present
if ([string]::IsNullOrWhiteSpace($storageAccountName)) {
    Write-Host "Error: Azure Storage Name string not found in environment variables."
    exit 1
}

# Load the Azure Storage module
Import-Module Az.Storage

# Connect to the storage account
$storageContext = New-AzStorageContext -StorageAccountName $storageAccountName -UseConnectedAccount

# FIXME Remove once vpn team fixes the network acl issue
$networkRuleSet = New-Object -TypeName Microsoft.Azure.Commands.Management.Storage.Models.PSNetworkRuleSet
$networkRuleSet.DefaultAction = "Allow"
Set-AzStorageAccount -ResourceGroupName $resourceGroup -Name $storageAccountName -NetworkRuleSet $networkRuleSet -ErrorAction Stop | Out-Null
$propagationStopwatch = [System.Diagnostics.Stopwatch]::StartNew()

# Wait until the test principal can write to the container. Role assignments and network rules propagate
# asynchronously, so a write probe is retried instead of sleeping for a fixed time.
$probeFile = New-TemporaryFile
try {
    Set-Content -Path $probeFile -Value 'readiness probe' -NoNewline
    $probeBlob = "readiness-probe/$([guid]::NewGuid()).txt"
    Invoke-WithStorageRetry -Operation "write readiness probe blob" -Action {
        Set-AzStorageBlobContent -File $probeFile -Container $containerName -Blob $probeBlob -Context $storageContext -Force -ErrorAction Stop | Out-Null
    }
    Invoke-WithStorageRetry -Operation "delete readiness probe blob" -Action {
        Remove-AzStorageBlob -Container $containerName -Blob $probeBlob -Context $storageContext -Force -ErrorAction Stop
    }
    Write-Host "Storage container '$containerName' is ready."
}
finally {
    Remove-Item -Path $probeFile -Force -ErrorAction SilentlyContinue
}

# Upload the folder and its contents to the container
# Gets last folder name + filename. example_patient_1\doctor_dictation.txt
Get-ChildItem -Path $localFolderPath -Recurse -File | ForEach-Object {
    $file = $_
    $relativePath = $file.FullName
    $folderName = Split-Path -Path (Split-Path -Path $relativePath -Parent) -Leaf
    $blobName = Split-Path -Path $relativePath -Leaf
    $destinationBlob = $blobName -replace ":", ""

    $destinationBlob = "$folderName\$destinationBlob"
    Write-Host "Uploading file '$destinationBlob'"
    Invoke-WithStorageRetry -Operation "upload '$destinationBlob'" -Action {
        Set-AzStorageBlobContent -File $file.FullName -Container $containerName -Blob $destinationBlob -Context $storageContext -Force -ErrorAction Stop | Out-Null
    }
}

Write-Host "Folder '$localFolderPath' uploaded to container '$containerName' successfully."

# The probe above only proves access for the test principal. The DeID service's managed identity has its own
# role assignment, so keep the previous 30s minimum (measured from the network rule update) before tests run.
Wait-ForMinimumElapsed -Stopwatch $propagationStopwatch -MinimumSeconds 30

# Create the content for the .env file
$content = @"
HEALTHDATAAISERVICES_DEID_SERVICE_ENDPOINT=$endpoint
HEALTHDATAAISERVICES_STORAGE_ACCOUNT_NAME=$storageAccountName
HEALTHDATAAISERVICES_STORAGE_CONTAINER_NAME=$containerName
HEALTHDATAAISERVICES_STORAGE_ACCOUNT_LOCATION=$storageAccountLocation
TEST_MODE=$testMode
"@

# Specify the path for the .env file
$envFilePath = ".\.env"

# Write the content to the .env file, overwrite if it exists
$content | Out-File -FilePath $envFilePath -Force

Write-Host "Environment variables written to '$envFilePath'."
