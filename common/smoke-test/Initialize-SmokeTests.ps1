#!/usr/bin/env pwsh

# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

#Requires -Version 6.0
#Requires -PSEdition Core

param (
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$')]
  [string] $TestApplicationId,

  [Parameter()]
  [string] $TestApplicationSecret,

  [Parameter()]
  [string] $TestApplicationOid,

  [Parameter(ParameterSetName = 'Provisioner', Mandatory = $true)]
  [ValidateNotNullOrEmpty()]
  [string] $TenantId,

  [Parameter(ParameterSetName = 'Provisioner')]
  [ValidatePattern('^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$')]
  [string] $SubscriptionId,

  [Parameter()]
  [string] $Location = '',

  [Parameter()]
  [string] $Environment = 'AzureCloud',

  [Parameter()]
  [hashtable] $AdditionalParameters,

  [Parameter()]
  [string] $ServiceDirectory = '*',

  [Parameter()]
  [switch] $CI = ($null -ne $env:SYSTEM_TEAMPROJECTID),

  # Captures any arguments not declared here (prevents no parameter errors)
  [Parameter(ValueFromRemainingArguments = $true)]
  $RemainingArguments
)

$repoRoot = Resolve-Path -Path "$PSScriptRoot../../../"

function OutputWarning {
  param([string] $Output)

  if ($CI) {
    Write-Host "##vso[task.logissue type=warning]$Output"
  }
  else {
    Write-Warning $Output
  }

}

function SetEnvironmentVariable {
  param([string] $Name, [string] $Value)

  if ($CI) {
    Write-Host "##vso[task.setvariable variable=_$Name;issecret=true;]$($Value)"
    Write-Host "##vso[task.setvariable variable=$Name;]$($Value)"
  }
  else {
    Write-Verbose "Setting local environment variable: $Name = ***"
    Set-Item -Path "env:$Name" -Value $Value
  }
}

function SetEnvironmentVariables {
  Write-Verbose "Setting AAD environment variables for Test Application..."
  SetEnvironmentVariable -Name AZURE_CLIENT_ID -Value $TestApplicationId
  SetEnvironmentVariable -Name AZURE_CLIENT_SECRET -Value $TestApplicationSecret
  SetEnvironmentVariable -Name AZURE_TENANT_ID -Value $TenantId

  Write-Verbose "Setting cloud-specific environment variables"
  $cloudEnvironment = Get-AzEnvironment -Name $Environment
  SetEnvironmentVariable -Name AZURE_AUTHORITY_HOST -Value $cloudEnvironment.ActiveDirectoryAuthority
}

function GenerateDeployManifest {
  Write-Verbose "Detecting samples..."
  $javascriptSamples = (Get-ChildItem -Path "$repoRoot/sdk/$ServiceDirectory/*/samples/javascript/" -Directory
    | Where-Object { Test-Path "$_/package.json" })

  $manifest = $javascriptSamples | ForEach-Object {
    # Example: azure-sdk-for-js/sdk/appconfiguration/app-configuration/samples/javascript
    @{
      # Package name for example "app-configuration"
      Name               = ((Join-Path $_ ../../) | Get-Item).Name;

      # Path to "app-configuration" part from example
      PackageDirectory   = ((Join-Path $_ ../../) | Get-Item).FullName;

      # Service Directory for example "appconfiguration"
      ResourcesDirectory = ((Join-Path $_ ../../../) | Get-Item).Name;
    }
  }

  return $manifest
}

function UpdateSamplesForService {
  Param([Parameter(Mandatory = $true)] $entry)

  Write-Verbose "Preparing samples for $($entry.Name)"
  dev-tool samples prep --directory $entry.PackageDirectory --use-packages

  # Resolve full path for samples location. This has to be set after sample
  # prep because the directory will not resolve until the folder exists.
  $entry.SamplesDirectory = Join-Path -Path $entry.PackageDirectory -ChildPath 'dist-samples/javascript' -Resolve
}

function UpdateSampleDependencies {
  Param(
    [Parameter(Mandatory = $true)] $sample,
    [Parameter(Mandatory = $true)] $dependencies
  )

  # Set sample's dependencies in all-up dependencies for smoke tests
  Write-Verbose "Updating local package.json with dependencies from smoke test for $($sample.Name)"
  $packageSpec = (Get-Content -Path "$($sample.SamplesDirectory)/package.json"
    | ConvertFrom-Json -AsHashtable)

  foreach ($dep in $packageSpec.dependencies.Keys) {
    if ($dep.StartsWith('@azure/')) {
      $dependencies[$dep] = "dev"
    }
    else {
      $dependencies[$dep] = $packageSpec.dependencies[$dep]
    }
  }
}

function NewTestResources {
  Param(
    [Parameter(Mandatory = $true)] [System.Collections.Hashtable]$entry,
    [Parameter(Mandatory = $true)] [string]$baseName,
    [Parameter(Mandatory = $true)] [string]$resourceGroupName
  )

  # Force -CI to false here. This is to have the script make use of
  # -BaseName so that all resources are created within the same resource
  # group for easier cleanup. All created environment variables are returned
  # to $deployOutput so they can be set in the user's context or in CI.
  $deployOutput = &"$repoRoot/eng/common/TestResources/New-TestResources.ps1" `
    -BaseName  $baseName `
    -ResourceGroupName $resourceGroupName `
    -ServiceDirectory $entry.ResourcesDirectory `
    -TestApplicationId $TestApplicationId `
    -TestApplicationSecret $TestApplicationSecret `
    -ProvisionerApplicationId $TestApplicationId `
    -ProvisionerApplicationSecret $TestApplicationSecret `
    -TestApplicationOid $TestApplicationOid `
    -TenantId $TenantId `
    -SubscriptionId $SubscriptionId `
    -Location $Location `
    -Environment $Environment `
    -AdditionalParameters $AdditionalParameters `
    -DeleteAfterHours 24 `
    -Force `
    -Verbose `
    -CI:$CI

  return $deployOutput
}

function DeployTestResources {
  Param([Parameter(Mandatory = $true)] $deployManifest)

  $deployedServiceDirectories = @{ }
  $baseName = 't' + (New-Guid).ToString('n').Substring(0, 16)
  $resourceGroupName = "rg-smoke-$baseName"
  $dependencies = New-Object 'System.Collections.Concurrent.ConcurrentDictionary[string,string]'
  $runManifest = [System.Collections.ArrayList]::Synchronized((New-Object 'System.Collections.ArrayList'))

  # Use the same resource group name that New-TestResources.ps1 generates
  SetEnvironmentVariable -Name 'AZURE_RESOURCEGROUP_NAME' -Value $resourceGroupName

  foreach ($entry in $deployManifest) {
    if (!(Get-ChildItem -Path "$repoRoot/sdk/$($entry.ResourcesDirectory)" -Filter test-resources.json -Recurse)) {
      Write-Verbose "Skipping $($entry.ResourcesDirectory): could not find test-resources.json"
      continue
    }

    try {
      if ($deployedServiceDirectories.ContainsKey($entry.ResourcesDirectory) -ne $true) {
        $deployOutput = NewTestResources $entry $baseName $resourceGroupName
        $deployedServiceDirectories[$entry.ResourcesDirectory] = $true;

        foreach ($key in $deployOutput.Keys) {
          SetEnvironmentVariable -Name $key -Value $deployOutput[$key]
        }
      }
      else {
        Write-Verbose "Skipping resource directory deployment (already deployed) for $($entry.ResourcesDirectory)"
      }

    }
    catch {
      OutputWarning "Failed to deploy $($entry.Name) $($_.Exception.Message)"
      Write-Warning "Failed to deploy $($entry.Name)"
      Write-Host $_.Exception.Message
      continue
    }

    UpdateSamplesForService $entry
    UpdateSampleDependencies $entry $dependencies
    $runManifest.Add($entry)
  }

  return @{
    Dependencies = $dependencies;
    RunManifest = $runManifest
  }
}

function WriteConfigs {
  Param(
    [Parameter(Mandatory = $true)] [System.Collections.Generic.Dictionary[string,string]]$dependencies,
    [Parameter(Mandatory = $true)] [System.Object[]]$runManifest
  )

  Write-Verbose "Writing run-manifest.json"
  ($runManifest | ConvertTo-Json -AsArray | Set-Content -Path "$repoRoot/common/smoke-test/run-manifest.json" -Force)

  Write-Verbose "Writing dependencies into Smoke Test package.json"
  $runnerPackageSpec = Get-Content "$repoRoot/common/smoke-test/package.json" | ConvertFrom-Json -AsHashtable
  $runnerPackageSpec.dependencies = $dependencies
  ($runnerPackageSpec | ConvertTo-Json | Set-Content "$repoRoot/common/smoke-test/package.json")
}

function InitializeSmokeTests {
  SetEnvironmentVariables
  $deployManifest = GenerateDeployManifest
  $configs = DeployTestResources $deployManifest
  WriteConfigs $configs.Dependencies $configs.RunManifest

  SetEnvironmentVariable -Name "NODE_PATH" -Value "$PSScriptRoot/node_modules"

  if ($CI) {
    # If in CI mark the task as successful even if there are warnings so the
    # pipeline execution status shows up as red or green
    Write-Host "##vso[task.complete result=Succeeded; ]DONE"
  }
}

InitializeSmokeTests

<#
.SYNOPSIS
Deploys resources, discovers and generates samples, configures local dependencies, and creates run manifest for Smoke Tests

.DESCRIPTION


#>
