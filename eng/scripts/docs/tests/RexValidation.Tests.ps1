Import-Module Pester

BeforeDiscovery {
  $RexToolSpecs = Get-Content "$PSScriptRoot/rex-tool-tests.json" | ConvertFrom-Json -AsHashtable
}

BeforeAll {
  . $PSScriptRoot/../../../common/scripts/common.ps1

  # Returns a package info object with Name and Version properties
  # "@microsoft/sample-package@1.2.3" -> @{ Name = "@microsoft/sample-package"; Version = "1.2.3" }
  # "@microsoft/sample-package"       -> @{ Name = "@microsoft/sample-package"; Version = "" }
  # "sample-package@1.2.3"            -> @{ Name = "sample-package"; Version = "1.2.3" }
  function getPackageInfo($packageName) { 
    $output = @{ Name = $packageName; Version = '' }

    if ($packageName -match '^(?<pkgName>.+?)(@(?<pkgVersion>.+))?$') { 
      $pkgName = $Matches['pkgName']
      $pkgVersion = $Matches['pkgVersion']
      $output.Name = $pkgName
      $output.Version = $pkgVersion
    }

    return $output
  }

}

Describe "Validate-javascript-DocMsPackages" -Tag "LiveTests" {
  It "Package <Package> returns result <ExpectedResult>" -ForEach $RexToolSpecs {
    
    $packageInfo = getPackageInfo($Package)

    $output = Validate-javascript-DocMsPackages -PackageInfo $packageInfo
    $output | Should -Be $ExpectedResult
  }
}
