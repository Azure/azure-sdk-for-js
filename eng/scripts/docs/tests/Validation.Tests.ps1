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
    It "Validate the package with success" -TestCases @(
        @{ packages = @{
            '@azure/storage-blob@12.8.0' = $True; 
            '@azure/core-rest-pipeline@1.9.0' = $True;
            'microsoft-cognitiveservices-speech-sdk' = $True;
            '@azure/identity-cache-persistence' = $False
            } 
        }
    ) {
        $output = (ValidatePackagesForDocs -packages $packages.Keys 2>$null)
        foreach ($pkg in $output) {
            $pkg.Success | Should -Be $packages["$($pkg.Package)"]
        }
    }
}
