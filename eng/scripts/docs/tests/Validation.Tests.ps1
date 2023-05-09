<#
```
Invoke-Pester -Output Detailed $PSScriptRoot/Validation.Tests.ps1

We are testing the ValidatePackagesForDocs function in Language-Settings.sp1
```
#>
Import-Module Pester
BeforeDiscovery {
  $RexToolSpecs = Get-Content "$PSScriptRoot/rex-tool-tests.json" | ConvertFrom-Json -AsHashtable
}

BeforeAll {
  . $PSScriptRoot/../../../common/scripts/common.ps1
}
function GetPackageSpecs() {
  Get-Content "$PSScriptRoot/rex-tool-tests.json" | ConvertFrom-Json
}

# Test plan:
# 1. Tests on a list of packages which some of the packages pass the validation and the rest fail the validation.
Describe "ValidatePackagesForDocs" -Tag "UnitTest" {
  It "Package <Package> returns result <ExpectedResult>" -ForEach $RexToolSpecs {
    $output = ValidatePackagesForDocs -packages @{ name = $Package }
    $output.Success | Should -Be $ExpectedResult
  }
}
