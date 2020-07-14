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
  [switch] $CI = ($null -ne $env:SYSTEM_TEAMPROJECTID),

  # Captures any arguments not declared here (prevents no parameter errors)
  [Parameter(ValueFromRemainingArguments = $true)]
  $RemainingArguments
)

function OutputWarning {
  param([string] $Output)

  if ($CI) {
    Write-Host "##vso[task.logissue type=warning]$Output"
  }
  else {
    Write-Warning $Output
  }

}

$previousEnvironmentVariables = @{ }

function SetEnvironmentVariable {
  param(
    [string] $Name,
    [string] $Value
  )

  if ($previousEnvironmentVariables.ContainsKey($Name) -and $previousEnvironmentVariables[$Name] -ne $Value) {
    OutputWarning "Environment variable already set: $Name with different value"
  }

  if ($CI) {
    Write-Host "##vso[task.setvariable variable=_$Name;issecret=true;]$($Value)"
    Write-Host "##vso[task.setvariable variable=$Name;]$($Value)"
  }
  else {
    Write-Verbose "Setting local environment variable: $Name = ***"
    Set-Item -Path "env:$Name" -Value $Value
  }
}

# TODO: Use the script file's location instead of pushd/popd
pushd ../../

Write-Verbose "Reading manifest..."
# $manifest = (Get-Content -Path common/smoke-test/samples-manifest.json | ConvertFrom-Json)

Write-Verbose "Detecting samples..."
$javascriptSamples = (Get-ChildItem .\ -Filter "javascript" -Directory -Recurse
  | Where-Object {
    ($_.Parent.Name -eq "samples") -and ($_.Parent.Parent.Parent.Parent.Name -eq "sdk") -and (Test-Path "$_/package.json") })

$manifest = $javascriptSamples | ForEach-Object {
  # Example: C:\code\azure-sdk-for-js\sdk\appconfiguration\app-configuration\samples\javascript
  @{
    Name               = $_.Parent.Parent.Name; # Package name for example "app-configuration"
    PackageDirectory   = $_.Parent.Parent.FullName; # Path to "app-configuration" part from example
    ResourcesDirectory = $_.Parent.Parent.Parent.Name; # Service Directory for example "appconfiguration"
    SamplesDirectory   = $_.FullName; # Samples directory
  }
}

$deployedServiceDirectories = @{ }
$runManifest = @()
$dependencies = New-Object 'system.collections.generic.dictionary[string,string]'
$baseName = 't' + (New-Guid).ToString('n').Substring(0, 16)
$resourceGroupName = "rg-smoke-$baseName"

# Use the same resource group name that New-TestResources.ps1 generates
SetEnvironmentVariable -Name 'AZURE_RESOURCEGROUP_NAME' -Value $resourceGroupName

foreach ($entry in $manifest) {
  try {
    Write-Verbose "Deploying resources for $($entry.Name)..."
    if ($deployedServiceDirectories.ContainsKey($entry.ResourcesDirectory) -ne $true) {

      # Force -CI to false here. This is to have the script make use of
      # -BaseName so that all resources are created within the same resource
      # group for easier cleanup. All created environment variables are returned
      # to $deployOutput so they can be set in the user's context or in CI.
      $deployOutput = eng/common/TestResources/New-TestResources.ps1 `
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
    OutputWarning "Failed to deploy $($entry.Name) $($_Exception.Message)"
    Write-Warning "Failed to deploy $($entry.Name)"
    Write-Host $_Exception.Message
    continue
  }

  Write-Verbose "Preparing samples for $($entry.Name)"
  node common/scripts/prep-samples.js $entry.PackageDirectory --use-packages

  $packageSpec = (Get-Content -Path "$($entry.SamplesDirectory)/package.json"
    | ConvertFrom-Json -AsHashtable)

  # Set outputs
  $runManifest += $entry

  # Also include the sample's dependencies in our all-up dependencies
  foreach ($dep in $packageSpec.dependencies.Keys) {
    if ($dep.StartsWith('@azure/')) {
      $dependencies[$dep] = "dev"
    }
    else {
      $dependencies[$dep] = $packageSpec.dependencies[$dep]
    }
  }
}

Write-Verbose "Writing run-manifest.json"
($runManifest | ConvertTo-Json -AsArray | Set-Content -Path common/smoke-test/run-manifest.json -Force)

Write-Verbose "Writing dependencies into Smoke Test package.json"
$runnerPackageSpec = Get-Content common/smoke-test/package.json | ConvertFrom-Json -AsHashtable
$runnerPackageSpec.dependencies = $dependencies
($runnerPackageSpec | ConvertTo-Json | Set-Content common/smoke-test/package.json)

SetEnvironmentVariable -Name "NODE_PATH" -Value "$PSScriptRoot/node_modules"

if ($CI) {
  # If in CI mark the task as successful even if there are warnings so the
  # pipeline execution status shows up as red or green
  Write-Host "##vso[task.complete result=Succeeded;]DONE"
}

# TODO: use current script location instead of changing directories
popd

<#
.SYNOPSIS
Deploys resources, prepares onboarded samples, and creates run manifest for Smoke Tests

.DESCRIPTION


#>
