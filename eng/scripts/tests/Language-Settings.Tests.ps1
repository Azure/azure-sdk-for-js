BeforeAll {
  . (Join-Path $PSScriptRoot ".." ".." "common" "scripts" "common.ps1")
}

Describe "Get-javascript-PackageInfoFromPackageFile release notes" {
  BeforeEach {
    $testDirectory = Join-Path $TestDrive ([Guid]::NewGuid().ToString())
    $RepoRoot = Join-Path $testDirectory "repo"
    $workingDirectory = Join-Path $testDirectory "working"
    $packageDirectory = Join-Path $workingDirectory "package"
    $repositoryDirectory = "sdk/test/test-package"
    $sourceDirectory = Join-Path $RepoRoot $repositoryDirectory
    New-Item -ItemType Directory -Path $packageDirectory, $sourceDirectory -Force | Out-Null

    $packageJSON = [PSCustomObject]@{
      name = "@azure/test-package"
      version = "1.0.0"
      PackageDirectory = $packageDirectory
      repository = [PSCustomObject]@{ directory = $repositoryDirectory }
    }

    @"
# Release History

## 2.0.0 (Unreleased)

Unreleased changes.

## 1.0.0 (2026-01-01)

Repository release notes.
"@ | Set-Content (Join-Path $sourceDirectory "CHANGELOG.md")

    $forceCreate = $false
    Mock Get-PackageJsonContentFromPackage { return $packageJSON }
    Mock IsNPMPackageVersionPublished { return $false }
  }

  It "reads the matching version from the repository when the package omits its changelog" {
    $result = Get-javascript-PackageInfoFromPackageFile "test-package.tgz" $workingDirectory

    $result.ReleaseNotes | Should -Match "Repository release notes\."
    $result.ReleaseNotes | Should -Not -Match "Unreleased changes\."
    $result.ReleaseTag | Should -Be "@azure/test-package_1.0.0"
  }

  It "prefers the packaged changelog over the repository changelog" {
    @"
# Release History

## 1.0.0 (2026-01-01)

Packaged release notes.
"@ | Set-Content (Join-Path $packageDirectory "CHANGELOG.md")

    $result = Get-javascript-PackageInfoFromPackageFile "test-package.tgz" $workingDirectory

    $result.ReleaseNotes | Should -Match "Packaged release notes\."
    $result.ReleaseNotes | Should -Not -Match "Repository release notes\."
  }

  It "leaves release notes empty when repository metadata is missing" {
    $packageJSON.PSObject.Properties.Remove("repository")

    $result = Get-javascript-PackageInfoFromPackageFile "test-package.tgz" $workingDirectory

    $result.ReleaseNotes | Should -Be ""
  }

  It "leaves release notes empty when repository.directory is missing" {
    $packageJSON.repository.PSObject.Properties.Remove("directory")

    $result = Get-javascript-PackageInfoFromPackageFile "test-package.tgz" $workingDirectory

    $result.ReleaseNotes | Should -Be ""
  }

  It "leaves release notes empty when neither changelog exists" {
    Remove-Item (Join-Path $sourceDirectory "CHANGELOG.md")

    $result = Get-javascript-PackageInfoFromPackageFile "test-package.tgz" $workingDirectory

    $result.ReleaseNotes | Should -Be ""
  }
}
