Import-Module Pester

BeforeAll { 
  . $PSScriptRoot/../Docs-Onboarding.ps1
}

Describe 'GetPackageInfoFromDocsMsConfig' { 
  It 'Returns expected values' -ForEach @(
    @{ inputValue = '@azure/package@1.2.3'; expectedValue = @{ Name = '@azure/package'; Version = '1.2.3' } },
    @{ inputValue = '@azure/package'; expectedValue = @{ Name = '@azure/package'; Version = '' } }
  ) { 
    $result = GetPackageInfoFromDocsMsConfig $inputValue
    $result.Name | Should -Be $expectedValue.Name
    $result.Version | Should -Be $expectedValue.Version
  }

  It 'Throws when given $null' { 
    { GetPackageInfoFromDocsMsConfig $null } | Should -Throw
  }

  It 'Throws when given an empty string' { 
    { GetPackageInfoFromDocsMsConfig '' } | Should -Throw
  }
}
