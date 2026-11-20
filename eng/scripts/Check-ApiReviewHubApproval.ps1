# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

[CmdletBinding()]
param (
  [Parameter(Mandatory = $true)]
  [ValidateNotNullOrEmpty()]
  [string] $PackageInfoFile,

  [string] $RepoOwner = "Azure",

  [ValidateNotNullOrEmpty()]
  [string] $AzSdkExePath = "azsdk"
)

Set-StrictMode -Version 4
$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot ".." "common" "scripts" "Helpers" "CommandInvocation-Helpers.ps1")

if (-not (Test-Path $PackageInfoFile -PathType Leaf)) {
  throw "Package-info file does not exist: $PackageInfoFile"
}

$packageInfo = Get-Content $PackageInfoFile -Raw | ConvertFrom-Json -ErrorAction Stop
foreach ($property in @("Name", "Version", "ApiHash")) {
  if (-not $packageInfo.PSObject.Properties[$property] -or
      $packageInfo.$property -isnot [string] -or
      [string]::IsNullOrWhiteSpace($packageInfo.$property)) {
    throw "Package-info file must contain a nonempty $property."
  }
}
if ($packageInfo.ApiHash -notmatch '^[a-fA-F0-9]{64}$') {
  throw "Package-info file contains an invalid API hash."
}
if ($packageInfo.PSObject.Properties["ReleaseStatus"] -and $null -ne $packageInfo.ReleaseStatus) {
  if ($packageInfo.ReleaseStatus -isnot [string]) {
    throw "Package-info ReleaseStatus must be a string."
  }
  if ($packageInfo.ReleaseStatus.Trim() -eq "Unreleased") {
    throw "$($packageInfo.Name) is marked Unreleased and cannot be published."
  }
}

Confirm-AzSdkCliMinimumVersion $AzSdkExePath ([version] "0.6.55")
$arguments = @(
  "package", "get-approval-status",
  "--language", "javascript",
  "--package-name", $packageInfo.Name,
  "--package-version", $packageInfo.Version,
  "--api-hash", $packageInfo.ApiHash,
  "--output", "json"
)
if (-not [string]::IsNullOrWhiteSpace($RepoOwner)) {
  $arguments += @("--repo-owner", $RepoOwner)
}

Write-Host "Checking API Review Hub approval for $($packageInfo.Name) $($packageInfo.Version), hash $($packageInfo.ApiHash)."
$commandResult = Invoke-AzSdkCliCommand $AzSdkExePath $arguments
if ($commandResult.ExitCode -ne 0) {
  throw "API Review Hub approval check failed (azsdk exit code $($commandResult.ExitCode)): $($commandResult.Output)"
}

try {
  $response = $commandResult.Output | ConvertFrom-Json -ErrorAction Stop
}
catch {
  throw "API Review Hub approval check returned malformed JSON: $($commandResult.Output)"
}

if ($null -eq $response -or
    -not $response.PSObject.Properties["result"] -or
    $null -eq $response.result -or
    -not $response.result.PSObject.Properties["reviewHub"] -or
    $null -eq $response.result.reviewHub) {
  throw "API Review Hub approval check returned an invalid response."
}
$result = $response.result
$hub = $result.reviewHub
Write-Host "API Review Hub result: $($hub | ConvertTo-Json -Compress -Depth 20)"

if ($result.PSObject.Properties["isApproved"] -and $result.isApproved -is [bool] -and $result.isApproved -and
    $result.PSObject.Properties["finalSource"] -and $result.finalSource -eq "APIView" -and
    $hub.PSObject.Properties["statusCode"] -and
    ($hub.statusCode -is [int] -or $hub.statusCode -is [long]) -and $hub.statusCode -ge 200 -and $hub.statusCode -lt 300 -and
    $hub.PSObject.Properties["reason"] -and $hub.reason -eq "repositoryNotSupported" -and
    $result.PSObject.Properties["apiView"] -and $null -ne $result.apiView) {
  $apiView = $result.apiView
  if ($apiView.PSObject.Properties["statusCode"] -and
      ($apiView.statusCode -is [int] -or $apiView.statusCode -is [long]) -and $apiView.statusCode -ge 200 -and $apiView.statusCode -lt 300 -and
      $apiView.PSObject.Properties["isApproved"] -and $apiView.isApproved -is [bool] -and $apiView.isApproved -and
      $apiView.PSObject.Properties["packageNameApproved"] -and $apiView.packageNameApproved -is [bool] -and $apiView.packageNameApproved) {
    Write-Warning "API Review Hub does not support this repository; accepting APIView approval during migration. APIView does not verify the API hash."
    return
  }
}

if (-not $result.PSObject.Properties["isApproved"] -or
    $result.isApproved -isnot [bool] -or -not $result.isApproved -or
    -not $result.PSObject.Properties["finalSource"] -or
    $result.finalSource -ne "ApiReviewHub" -or
    -not $hub.PSObject.Properties["statusCode"] -or
    ($hub.statusCode -isnot [int] -and $hub.statusCode -isnot [long]) -or
    $hub.statusCode -lt 200 -or $hub.statusCode -ge 300) {
  throw "API Review Hub did not approve this exact release candidate."
}
foreach ($property in @("isApproved", "isApiApproved", "isPackageNameApproved")) {
  if (-not $hub.PSObject.Properties[$property] -or
      $hub.$property -isnot [bool] -or -not $hub.$property) {
    throw "API Review Hub did not approve this exact release candidate ($property)."
  }
}

Write-Host "API Review Hub approved the package, API hash, and package name."
