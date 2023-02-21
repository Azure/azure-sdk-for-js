<#
```
Invoke-Pester -Output Detailed $PSScriptRoot/Validation.Tests.ps1

We are testing the ValidatePackagesForDocs function in Language-Settings.sp1
```
#>
Import-Module Pester
BeforeAll {
  . $PSScriptRoot/../../../common/scripts/common.ps1
}

# Test plan:
# 1. Tests on a list of packages which some of the packages pass the validation and the rest fail the validation.
Describe "ValidatePackagesForDocs" -Tag "UnitTest" {
  # Passed cases
  It "Package <Package> returns result <ExpectedResult>" -ForEach @(
    # Packages that succeed in build
    @{ Package = '@azure/storage-blob@12.8.0'; ExpectedResult = $True }, 
    @{ Package = '@azure/core-rest-pipeline@1.9.0'; ExpectedResult = $True },
    @{ Package = 'microsoft-cognitiveservices-speech-sdk@1.25.1'; ExpectedResult = $True },

    # Packages which produce no content should fail to prevent publishing empty pages
    @{ Package = '@azure/identity-cache-persistence@1.0.0'; ExpectedResult = $False },
    @{ Package = '@azure/identity-vscode@1.0.0'; ExpectedResult = $False },

    # Packages which fail to build for valid reasons (there is a defect in the package)
    @{ Package = '@azure-rest/maps-search@1.0.0-beta.1'; ExpectedResult = $False },
    @{ Package = '@azure/package-which-doesnt-exist'; ExpectedResult = $False }
  ) {
    $output = ValidatePackagesForDocs -packages @{ name = $Package }
    $output.Success | Should -Be $ExpectedResult
  }
}
