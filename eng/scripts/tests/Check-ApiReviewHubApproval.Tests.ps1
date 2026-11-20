# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

Describe "Check-ApiReviewHubApproval.ps1" {
  BeforeAll {
    $scriptPath = Join-Path $PSScriptRoot ".." "Check-ApiReviewHubApproval.ps1"
    function global:azsdk {
      param ([Parameter(ValueFromRemainingArguments = $true)] [object[]] $Arguments)
      if ($Arguments.Count -eq 1 -and $Arguments[0] -eq "--version") {
        $global:LASTEXITCODE = 0
        return $global:AzSdkVersion
      }
      $global:CapturedAzSdkArguments = @($Arguments)
      $global:LASTEXITCODE = $global:AzSdkExitCode
      return $global:AzSdkOutput
    }
  }

  AfterAll {
    Remove-Item Function:\azsdk -ErrorAction SilentlyContinue
    Remove-Variable CapturedAzSdkArguments, AzSdkExitCode, AzSdkOutput, AzSdkVersion -Scope Global -ErrorAction SilentlyContinue
  }

  BeforeEach {
    $hash = "a" * 64
    $packageInfoPath = Join-Path $TestDrive "package-info.json"
    @{
      Name = "@azure/example"
      Version = "1.2.3"
      ApiHash = $hash
    } | ConvertTo-Json | Set-Content $packageInfoPath
    $global:CapturedAzSdkArguments = @()
    $global:AzSdkExitCode = 0
    $global:AzSdkVersion = "0.6.55"
    $global:AzSdkOutput = '{"result":{"isApproved":true,"finalSource":"ApiReviewHub","reviewHub":{"statusCode":200,"isApproved":true,"isApiApproved":true,"isPackageNameApproved":true}}}'
  }

  It "requires Hub approval for the exact package version and hash" {
    & $scriptPath -PackageInfoFile $packageInfoPath

    ($global:CapturedAzSdkArguments -join "|") | Should -Be (@(
      "package", "get-approval-status", "--language", "javascript",
      "--package-name", "@azure/example", "--package-version", "1.2.3",
      "--api-hash", $hash, "--output", "json", "--repo-owner", "Azure"
    ) -join "|")
  }

  It "rejects legacy APIView fallback when the Hub denies a stale hash" {
    $global:AzSdkOutput = '{"result":{"isApproved":true,"finalSource":"APIView","reviewHub":{"statusCode":200,"isApproved":false,"isApiApproved":false,"isPackageNameApproved":true,"reason":"staleArtifact"},"apiView":{"isApproved":true}}}'
    { & $scriptPath -PackageInfoFile $packageInfoPath } | Should -Throw "*did not approve*"
  }

  It "accepts APIView approval when the Hub explicitly does not support the repository" {
    $global:AzSdkOutput = '{"result":{"isApproved":true,"finalSource":"APIView","reviewHub":{"statusCode":200,"isApproved":false,"isApiApproved":false,"isPackageNameApproved":false,"reason":"repositoryNotSupported"},"apiView":{"statusCode":200,"isApproved":true,"packageNameApproved":true}}}'
    { & $scriptPath -PackageInfoFile $packageInfoPath } | Should -Not -Throw
  }

  It "rejects unsupported-repository fallback without APIView package-name approval" {
    $global:AzSdkOutput = '{"result":{"isApproved":true,"finalSource":"APIView","reviewHub":{"statusCode":200,"reason":"repositoryNotSupported"},"apiView":{"statusCode":200,"isApproved":true,"packageNameApproved":false}}}'
    { & $scriptPath -PackageInfoFile $packageInfoPath } | Should -Throw "*did not approve*"
  }

  It "rejects unsupported-repository fallback when APIView is unavailable or unapproved" -TestCases @(
    @{ ApiView = '{"statusCode":503,"isApproved":true,"packageNameApproved":true}' },
    @{ ApiView = '{"statusCode":200,"isApproved":false,"packageNameApproved":true}' },
    @{ ApiView = '{"statusCode":200,"isApproved":"true","packageNameApproved":true}' },
    @{ ApiView = '{"statusCode":200,"isApproved":true}' }
  ) {
    param ($ApiView)
    $global:AzSdkOutput = '{"result":{"isApproved":true,"finalSource":"APIView","reviewHub":{"statusCode":200,"reason":"repositoryNotSupported"},"apiView":' + $ApiView + '}}'
    { & $scriptPath -PackageInfoFile $packageInfoPath } | Should -Throw "*did not approve*"
  }

  It "accepts Hub policy that does not require an API review when the package name is approved" {
    $global:AzSdkOutput = '{"result":{"isApproved":true,"finalSource":"ApiReviewHub","reviewHub":{"statusCode":200,"isApproved":true,"isApiApproved":true,"isPackageNameApproved":true,"reason":"reviewNotRequired"}}}'
    { & $scriptPath -PackageInfoFile $packageInfoPath } | Should -Not -Throw
  }

  It "rejects a denied or malformed Hub approval field" -TestCases @(
    @{ Property = "isApproved"; Value = $false },
    @{ Property = "isApiApproved"; Value = $false },
    @{ Property = "isPackageNameApproved"; Value = $false },
    @{ Property = "isApiApproved"; Value = "true" },
    @{ Property = "isPackageNameApproved"; Value = $null }
  ) {
    param ($Property, $Value)
    $response = $global:AzSdkOutput | ConvertFrom-Json
    $response.result.reviewHub.$Property = $Value
    $global:AzSdkOutput = $response | ConvertTo-Json -Depth 10 -Compress
    { & $scriptPath -PackageInfoFile $packageInfoPath } | Should -Throw "*$Property*"
  }

  It "rejects missing or unsuccessful Hub responses" -TestCases @(
    @{ Output = '{"result":{"isApproved":true,"finalSource":"ApiReviewHub"}}' },
    @{ Output = '{"result":{"isApproved":true,"finalSource":"ApiReviewHub","reviewHub":{"statusCode":503,"isApproved":true,"isApiApproved":true,"isPackageNameApproved":true}}}' },
    @{ Output = '{"result":{"isApproved":true,"finalSource":"ApiReviewHub","reviewHub":{"isApproved":true,"isApiApproved":true,"isPackageNameApproved":true}}}' },
    @{ Output = 'not-json' }
  ) {
    param ($Output)
    $global:AzSdkOutput = $Output
    { & $scriptPath -PackageInfoFile $packageInfoPath } | Should -Throw
  }

  It "rejects a CLI failure even if its output claims approval" {
    $global:AzSdkExitCode = 1
    { & $scriptPath -PackageInfoFile $packageInfoPath } | Should -Throw "*exit code 1*"
  }

  It "requires a CLI version that reports API and package name approval" {
    $global:AzSdkVersion = "0.6.54"
    { & $scriptPath -PackageInfoFile $packageInfoPath } | Should -Throw "*0.6.55 or later*"
    $global:CapturedAzSdkArguments.Count | Should -Be 0
  }

  It "rejects missing or invalid candidate hashes before invoking the CLI" -TestCases @(
    @{ Hash = "" },
    @{ Hash = "not-a-sha256" }
  ) {
    param ($Hash)
    $info = Get-Content $packageInfoPath -Raw | ConvertFrom-Json
    $info.ApiHash = $Hash
    $info | ConvertTo-Json | Set-Content $packageInfoPath
    { & $scriptPath -PackageInfoFile $packageInfoPath } | Should -Throw "*hash*"
    $global:CapturedAzSdkArguments.Count | Should -Be 0
  }

  It "does not allow unreleased packages to bypass approval" {
    $info = Get-Content $packageInfoPath -Raw | ConvertFrom-Json
    $info | Add-Member -NotePropertyName ReleaseStatus -NotePropertyValue "Unreleased"
    $info | ConvertTo-Json | Set-Content $packageInfoPath
    { & $scriptPath -PackageInfoFile $packageInfoPath } | Should -Throw "*Unreleased*"
  }
}
