# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string] $SearchFolder,

  [Parameter(Mandatory = $true)]
  [ValidateSet('node', 'browser')]
  [string] $TestType
)

$ErrorActionPreference = 'Stop'

$resultsFileName = if ($TestType -eq 'browser') { 'test-results.browser.xml' } else { 'test-results.xml' }
$resultsFiles = Get-ChildItem -LiteralPath $SearchFolder -Filter $resultsFileName -File -Recurse

foreach ($resultsFile in $resultsFiles) {
  [xml] $results = Get-Content -LiteralPath $resultsFile.FullName -Raw
  $relativePath = [System.IO.Path]::GetRelativePath($SearchFolder, $resultsFile.FullName).Replace('\', '/')

  foreach ($testCase in $results.SelectNodes('//testcase[failure or error]')) {
    $details = foreach ($failure in $testCase.SelectNodes('failure | error')) {
      @($failure.GetAttribute('message'), $failure.InnerText) |
        Where-Object { -not [string]::IsNullOrWhiteSpace($_) } |
        Select-Object -Unique
    }

    $message = "${relativePath}: $($testCase.GetAttribute('classname')) > $($testCase.GetAttribute('name'))"
    if ($details) {
      $message += "`n$($details -join "`n")"
    }

    # Keep test output inside one logging command, even when it contains newlines or percent escapes.
    $escapedMessage = $message.Replace('%', '%AZP25').Replace("`r", '%0D').Replace("`n", '%0A')
    Write-Host "##vso[task.logissue type=error]$escapedMessage"
  }
}
