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
Describe "Validate-javascript-DocMsPackages" -Tag "UnitTest" {
  It "Package <Name>@<Version> returns result <ExpectedResult>" -ForEach $RexToolSpecs {
    
    $packageInfo = [PSCustomObject]@{
      Name    = $Name; 
      Version = $Version;
    }

    $output = Validate-javascript-DocMsPackages -PackageInfo $packageInfo
    $output | Should -Be $ExpectedResult
  }
}
