BeforeAll {
  . "$PSScriptRoot/../check-external-dependency-helpers.ps1"
}

Describe "Dependency issue deduplication" {
  BeforeAll {
    . "$PSScriptRoot/../../common/scripts/Invoke-GitHubAPI.ps1"
    # Load only the issue functions, without running pnpm or accessing GitHub.
    $ast = [System.Management.Automation.Language.Parser]::ParseFile(
      "$PSScriptRoot/../check-external-dependency.ps1", [ref]$null, [ref]$null)
    $functions = $ast.FindAll({
      param($node)
      $node -is [System.Management.Automation.Language.FunctionDefinitionAst] -and
        $node.Name -in @("Get-GithubIssue", "Set-GitHubIssue")
    }, $false)
    foreach ($function in $functions) {
      . ([scriptblock]::Create($function.Extent.Text))
    }
  }

  BeforeEach {
    $RepoOwner = "Azure"
    $RepoName = "azure-sdk-for-js"
    $AuthToken = "test-token"
    $dependencyUpgradeLabel = "dependency-upgrade-required"
    $deprecatedDependency = "Deprecated-Dependency"
    $ghIssues = @()
    $updates = @'
{
  "typescript@6.0.3 (dev)": { "wanted": "6.0.3", "latest": "7.0.2" },
  "typescript@6.0.3": { "wanted": "6.0.3", "latest": "7.0.2" },
  "typescript@5.4.5": { "wanted": "5.4.5", "latest": "7.0.2" }
}
'@ | ConvertFrom-Json
    Mock New-GitHubIssue { [PSCustomObject]@{ number = 1 } }
    Mock Update-GitHubIssue { [PSCustomObject]@{ number = 36193 } }
    Mock Add-GitHubIssueLabels {}
  }

  It "updates the existing canonical issue once without creating duplicates" {
    $ghIssues = @([PSCustomObject]@{
      title = "Dependency package typescript has a new version available"
      number = 36193
      body = "Previous version information"
      labels = @([PSCustomObject]@{ name = "customer-reported" })
    })

    foreach ($package in (Get-ExternalDependencyUpdates $updates)) {
      Set-GitHubIssue $package
    }

    Should -Invoke Update-GitHubIssue -Times 1 -Exactly -ParameterFilter {
      $IssueNumber -eq 36193 -and
      $Body.Contains("versions 5.4.5, 6.0.3 of [typescript](https://www.npmjs.com/package/typescript)") -and
      $Labels.Contains("customer-reported")
    }
    Should -Invoke New-GitHubIssue -Times 0 -Exactly
  }

  It "creates only one canonical issue when no issue exists" {
    foreach ($package in (Get-ExternalDependencyUpdates $updates)) {
      Set-GitHubIssue $package
    }

    Should -Invoke New-GitHubIssue -Times 1 -Exactly -ParameterFilter {
      $Title -eq "Dependency package typescript has a new version available"
    }
    Should -Invoke Add-GitHubIssueLabels -Times 1 -Exactly
    Should -Invoke Update-GitHubIssue -Times 0 -Exactly
  }
}

Describe "Get-ExternalDependencyUpdates" {
  It "combines pnpm 12 versions and dependency types into one package" {
    $updates = @'
{
  "typescript@6.0.3 (dev)": { "wanted": "6.0.3", "latest": "7.0.2", "isDeprecated": false },
  "typescript@6.0.3": { "wanted": "6.0.3", "latest": "7.0.2", "isDeprecated": false },
  "typescript@5.4.5": { "wanted": "5.4.5", "latest": "7.0.2", "isDeprecated": false }
}
'@ | ConvertFrom-Json

    $packages = @(Get-ExternalDependencyUpdates $updates)
    $packages.Count | Should -Be 1
    $packages[0].Name | Should -Be "typescript"
    $packages[0].OldVersion | Should -Be "5.4.5, 6.0.3"
    $packages[0].NewVersion | Should -Be "7.0.2"
  }

  It "preserves scoped package names and supports plain pnpm 11 keys" {
    $updates = @'
{
  "@types/node@22.0.0 (dev)": { "wanted": "22.0.0", "latest": "24.0.0" },
  "@types/node@22.0.0 (optional)": { "wanted": "22.0.0", "latest": "24.0.0" },
  "typescript": { "wanted": "6.0.3", "latest": "7.0.2" },
  "@scope/plain": { "wanted": "1.0.0", "latest": "2.0.0" }
}
'@ | ConvertFrom-Json

    $packages = @(Get-ExternalDependencyUpdates $updates)
    $packages.Count | Should -Be 3
    $packages.Name | Should -Contain "@types/node"
    $packages.Name | Should -Contain "@scope/plain"
    $packages.Name | Should -Contain "typescript"
    ($packages | Where-Object Name -EQ "@types/node").OldVersion | Should -Be "22.0.0"
  }

  It "filters ineligible entries before combining versions" {
    $updates = @'
{
  "typescript@5.4.5": { "wanted": "5.4.5", "latest": "7.0.2" },
  "typescript@6.0.3 (dev)": { "wanted": "6.0.3", "latest": "7.0.2", "isDeprecated": true },
  "typescript@7.0.2": { "wanted": "7.0.2", "latest": "7.0.2" },
  "typescript@6.0.4": { "wanted": "6.0.4", "latest": "8.0.0-beta.1" },
  "missing-wanted": { "latest": "2.0.0" },
  "missing-latest": { "wanted": "1.0.0" },
  "@azure/core-client@1.0.0 (dev)": { "wanted": "1.0.0", "latest": "2.0.0" }
}
'@ | ConvertFrom-Json

    $packages = @(Get-ExternalDependencyUpdates $updates)
    $packages.Count | Should -Be 1
    $packages[0].Name | Should -Be "typescript"
    $packages[0].OldVersion | Should -Be "5.4.5"
    $packages[0].NewVersion | Should -Be "7.0.2"
  }

  It "handles an empty outdated report" {
    @(Get-ExternalDependencyUpdates ([PSCustomObject]@{})).Count | Should -Be 0
  }

  It "rejects unexpected package keys" {
    $updates = '{"not a package":{"wanted":"1.0.0","latest":"2.0.0"}}' | ConvertFrom-Json
    { Get-ExternalDependencyUpdates $updates } | Should -Throw "*Unexpected package key*"
  }

  It "produces the same version summary regardless of input ordering" {
    $first = '{"pkg@2.0.0":{"wanted":"2.0.0","latest":"3.0.0"},"pkg@1.0.0":{"wanted":"1.0.0","latest":"3.0.0"}}' | ConvertFrom-Json
    $second = '{"pkg@1.0.0":{"wanted":"1.0.0","latest":"3.0.0"},"pkg@2.0.0":{"wanted":"2.0.0","latest":"3.0.0"}}' | ConvertFrom-Json
    (Get-ExternalDependencyUpdates $first).OldVersion | Should -Be (Get-ExternalDependencyUpdates $second).OldVersion
  }

  It "sorts versions semantically and selects a single highest stable target" {
    $updates = @'
{
  "pkg@6.0.10": { "wanted": "6.0.10", "latest": "7.0.2" },
  "pkg@6.0.2 (dev)": { "wanted": "6.0.2", "latest": "7.0.10" },
  "pkg@5.10.0": { "wanted": "5.10.0", "latest": "7.0.2" },
  "pkg@6.0.3": { "wanted": "6.0.3", "latest": "8.0.0-beta.1" }
}
'@ | ConvertFrom-Json
    $package = Get-ExternalDependencyUpdates $updates
    $package.OldVersion | Should -Be "5.10.0, 6.0.2, 6.0.10"
    $package.NewVersion | Should -Be "7.0.10"
  }

  It "sorts unparseable strings deterministically without hiding semantic versions" {
    $versions = @(Get-SortedDependencyVersions @("6.0.10", "unknown-z", "6.0.2", "unknown-a", "6.0.2"))
    ($versions -join ", ") | Should -Be "unknown-a, unknown-z, 6.0.2, 6.0.10"
  }

  It "falls back to string ordering when no version can be parsed" {
    $versions = @(Get-SortedDependencyVersions @("unknown-z", "unknown-a"))
    ($versions -join ", ") | Should -Be "unknown-a, unknown-z"
  }
}
