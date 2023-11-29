Import-Module Pester

BeforeDiscovery {
  $RexToolSpecs = Get-Content "$PSScriptRoot/rex-tool-tests.json" | ConvertFrom-Json -AsHashtable
}

BeforeAll {
  . $PSScriptRoot/../../../common/scripts/common.ps1

  # Returns 
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
