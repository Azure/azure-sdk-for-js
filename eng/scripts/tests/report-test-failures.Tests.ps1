# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

BeforeAll {
  $scriptPath = Join-Path $PSScriptRoot '..\report-test-failures.ps1'
}

Describe 'Report test failures' {
  BeforeEach {
    $searchFolder = Join-Path $TestDrive ([guid]::NewGuid().ToString())
    $resultsDirectory = Join-Path $searchFolder 'keyvault\arm-keyvault'
    New-Item -ItemType Directory -Path $resultsDirectory -Force | Out-Null
  }

  It 'reports failed tests with package, test name, and error details from nested suites' {
    @'
<testsuites>
  <testsuite name="keyvault">
    <testsuite name="operations">
      <testcase classname="Keyvault test" name="operations list test">
        <failure message="Unable to find a record"><![CDATA[request api-version=2026-10-01-preview
record api-version=2026-05-15]]></failure>
      </testcase>
      <testcase classname="Keyvault test" name="passing test" />
      <testcase classname="Keyvault test" name="skipped test"><skipped /></testcase>
    </testsuite>
  </testsuite>
</testsuites>
'@ | Set-Content (Join-Path $resultsDirectory 'test-results.xml')

    $messages = @(& $scriptPath -SearchFolder $searchFolder -TestType node 6>&1)

    $messages.Count | Should -Be 1
    "$($messages[0])" | Should -Be (
      '##vso[task.logissue type=error]keyvault/arm-keyvault/test-results.xml: Keyvault test > operations list test' +
      '%0AUnable to find a record%0Arequest api-version=2026-10-01-preview%0Arecord api-version=2026-05-15'
    )
  }

  It 'selects browser results and supports error elements with only a message' {
    '<testsuite><testcase name="node"><failure message="Do not report" /></testcase></testsuite>' |
      Set-Content (Join-Path $resultsDirectory 'test-results.xml')
    '<testsuite><testcase classname="Browser" name="setup"><error message="Browser disconnected" /></testcase></testsuite>' |
      Set-Content (Join-Path $resultsDirectory 'test-results.browser.xml')

    $messages = @(& $scriptPath -SearchFolder $searchFolder -TestType browser 6>&1)

    $messages.Count | Should -Be 1
    "$($messages[0])" | Should -Be (
      '##vso[task.logissue type=error]keyvault/arm-keyvault/test-results.browser.xml: Browser > setup%0ABrowser disconnected'
    )
  }

  It 'escapes logging command data without allowing additional commands' {
    @'
<testsuite>
  <testcase classname="Suite" name="100%0A">
    <failure><![CDATA[Failed 100%
##vso[task.complete result=Succeeded;]]]></failure>
  </testcase>
</testsuite>
'@ | Set-Content (Join-Path $resultsDirectory 'test-results.xml')

    $messages = @(& $scriptPath -SearchFolder $searchFolder -TestType node 6>&1)

    $messages.Count | Should -Be 1
    "$($messages[0])" | Should -Be (
      '##vso[task.logissue type=error]keyvault/arm-keyvault/test-results.xml: Suite > 100%AZP250A' +
      '%0AFailed 100%AZP25%0A##vso[task.complete result=Succeeded;]'
    )
  }

  It 'produces no issues when results are missing or all tests pass' {
    @(& $scriptPath -SearchFolder $searchFolder -TestType browser 6>&1).Count | Should -Be 0
    '<testsuite><testcase name="passing" /><testcase name="skipped"><skipped /></testcase></testsuite>' |
      Set-Content (Join-Path $resultsDirectory 'test-results.xml')

    @(& $scriptPath -SearchFolder $searchFolder -TestType node 6>&1).Count | Should -Be 0
  }

  It 'fails explicitly when a result file cannot be parsed' {
    '<testsuite>' | Set-Content (Join-Path $resultsDirectory 'test-results.xml')

    { & $scriptPath -SearchFolder $searchFolder -TestType node } | Should -Throw
  }
}
