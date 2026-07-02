#Requires -Version 7.0
<#
.SYNOPSIS
    Generates the SDK changes report (JSON) for a specific Azure SDK package.
.DESCRIPTION
    This script generates the SDK changes report by invoking the changelog-tool
    command from @azure-tools/js-sdk-release-tools.

    The tool compares the current package against the latest published (GA) release
    on npm and writes the SDK changes report to the specified JSON file. The report
    contains the change log markdown and a 'hasBreakingChange' flag, and is consumed
    by the SDK breaking change detector.

    The script validates the package path and runs the changes report tool.
.PARAMETER SdkRepoPath
    The absolute path to the root folder of the local SDK repository.
    Optional; defaults to the repository root (two levels above this script).
.PARAMETER PackagePath
    The absolute path to the root folder of the local SDK project (package).
    Must contain a valid package.json file.
.PARAMETER OutputJsonFile
    The path to the JSON file where the SDK changes report will be written.
.EXAMPLE
    .\get-sdk-changes.ps1 `
        -SdkRepoPath "D:\GithubSource\tmpSource\azure-sdk-for-js" `
        -PackagePath "D:\GithubSource\tmpSource\azure-sdk-for-js\sdk\storage\arm-storage" `
        -OutputJsonFile "D:\GithubSource\tmpSource\azure-sdk-for-js\arm-storage-changes.json"

    Generates the SDK changes report for the arm-storage package.
.NOTES
    - Requires js-sdk-release-tools to be installed in eng/tools/js-sdk-release-tools.
    - The tool compares the package against the latest GA release to detect SDK changes.
#>
[CmdletBinding()]
param (
  [Parameter(Mandatory = $false, HelpMessage = "Absolute path to the SDK repository root")]
  [string]$SdkRepoPath = (Resolve-Path (Join-Path $PSScriptRoot ".." "..")).Path,

  [Parameter(Mandatory = $true, HelpMessage = "Absolute path to the SDK package directory")]
  [string]$PackagePath,

  [Parameter(Mandatory = $true, HelpMessage = "Path to the output JSON file for the SDK changes report")]
  [string]$OutputJsonFile
)

# Import common helpers
. (Join-Path $PSScriptRoot ".." "common" "scripts" "Helpers" "CommandInvocation-Helpers.ps1")

# Main execution
try {
  # Validate SDK repository path
  if (-not (Test-Path $SdkRepoPath)) {
    throw "SDK repository path does not exist: $SdkRepoPath"
  }

  # Validate package path
  if (-not (Test-Path $PackagePath)) {
    throw "Package path does not exist: $PackagePath"
  }

  # Resolve the output file to an absolute path so the report lands in the expected
  # location regardless of the working directory used to run the tool.
  $OutputJsonFile = [System.IO.Path]::GetFullPath($OutputJsonFile)
  $outputDirectory = Split-Path -Parent $OutputJsonFile
  if ($outputDirectory -and -not (Test-Path $outputDirectory)) {
    New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
  }

  Push-Location $SdkRepoPath

  # Install js-sdk-release-tools if needed
  $releaseToolsPath = "eng\tools\js-sdk-release-tools"
  if (-not (Test-Path $releaseToolsPath)) {
    throw "Release tools path does not exist: $releaseToolsPath"
  }

  Write-Host "Installing js-sdk-release-tools dependencies..." -ForegroundColor Cyan
  Invoke-LoggedCommand "npm --prefix $releaseToolsPath ci"
  Write-Host ""

  # Run the changelog-tool command using npm exec to generate the SDK changes report
  Write-Host "Generating SDK changes report..." -ForegroundColor Cyan
  Write-Host ""
  $command = "npm --prefix $releaseToolsPath exec --no -- changelog-tool --packagePath `"$PackagePath`" --report-file `"$OutputJsonFile`""
  Invoke-LoggedCommand $command

  Write-Host ""
  Write-Host "SDK changes report generated successfully at: $OutputJsonFile" -ForegroundColor Green
}
catch {
  Write-Host ""
  Write-Host "Generate SDK changes report failed: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}
finally {
  Pop-Location
}
