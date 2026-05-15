$scriptPath = Join-Path $PSScriptRoot "..\\Cache-ExternalPackage.ps1"
. $scriptPath

Describe "Cache-ExternalPackage script tests" {
  Context "Assert-MinimumPackageAge" {
    It "accepts package versions older than 24 hours" {
      Mock Get-PackagePublishedAt {
        # Publish time far in the past should always pass the 24h gate.
        return [DateTimeOffset]::Parse("2020-01-01T00:00:00.000Z")
      }

      { Assert-MinimumPackageAge -PackageName "example-package" -PackageVersion "1.2.3" -MinimumAgeHours 24 } | Should -Not -Throw
      Assert-MockCalled Get-PackagePublishedAt -Times 1 -Exactly -Scope It
    }

    It "rejects package versions newer than 24 hours" {
      Mock Get-PackagePublishedAt {
        return [DateTimeOffset]::UtcNow.AddHours(-2)
      }

      $threw = $false
      try {
        Assert-MinimumPackageAge -PackageName "example-package" -PackageVersion "1.2.4" -MinimumAgeHours 24
      }
      catch {
        $threw = $true
        $_.Exception.Message | Should -Match "minimum required age is 24 hours"
      }

      $threw | Should -Be $true
      Assert-MockCalled Get-PackagePublishedAt -Times 1 -Exactly -Scope It
    }
  }

  Context "Invoke-CachePackage order of operations" {
    It "declares age validation before feed update and install calls" {
      $invokeScriptBlockText = (Get-Command Invoke-CachePackage).ScriptBlock.ToString()

      $assertIndex = $invokeScriptBlockText.IndexOf("Assert-MinimumPackageAge")
      $enableIndex = $invokeScriptBlockText.IndexOf("Enable-PackageUpstreaming")
      $installIndex = $invokeScriptBlockText.IndexOf("Install-PackageToFeed")

      $assertIndex | Should -Not -Be -1
      $enableIndex | Should -Not -Be -1
      $installIndex | Should -Not -Be -1

      ($assertIndex -lt $enableIndex) | Should -Be $true
      ($enableIndex -lt $installIndex) | Should -Be $true
    }
  }
}
