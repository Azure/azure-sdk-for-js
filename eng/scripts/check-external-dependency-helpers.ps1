function Test-IsPreReleaseVersion {
  param (
    [string]$Version
  )

  if ([string]::IsNullOrWhiteSpace($Version)) {
    return $false
  }

  $normalizedVersion = $Version.Trim()
  if ($normalizedVersion.StartsWith("v", [System.StringComparison]::OrdinalIgnoreCase)) {
    $normalizedVersion = $normalizedVersion.Substring(1)
  }

  try {
    $semanticVersion = [System.Management.Automation.SemanticVersion]::Parse($normalizedVersion)
    return -not [string]::IsNullOrEmpty($semanticVersion.PreReleaseLabel)
  }
  catch {
    # Fallback for version strings SemanticVersion cannot parse; pattern matches SemVer prerelease forms (e.g. 1.2.3-beta.1+build.123).
    $semVerPreReleasePattern = '^\d+\.\d+\.\d+-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*(?:\+[0-9A-Za-z-.]+)?$'
    return $normalizedVersion -match $semVerPreReleasePattern
  }
}

function Get-ExternalDependencyUpdates {
  param (
    [Parameter(Mandatory = $true)]
    [PSCustomObject]$AvailableUpdates
  )

  $packages = @{}
  foreach ($update in $AvailableUpdates.PSObject.Properties) {
    # pnpm 12 disambiguates repeated names with @current and an optional dependency-type suffix.
    if ($update.Name -notmatch '^(?<name>(?:@[^/]+/)?[^@\s]+)(?:@[^ ]+(?: \([^)]+\))?)?$') {
      throw "Unexpected package key in pnpm outdated output: $($update.Name)"
    }
    $pkgName = $Matches.name
    if ($pkgName -match '^@azure') {
      continue
    }

    $oldVersion = $update.Value.wanted
    $newVersion = $update.Value.latest
    if ($null -eq $oldVersion -or $null -eq $newVersion -or $oldVersion -eq $newVersion) {
      continue
    }

    if (Test-IsPreReleaseVersion -Version $newVersion) {
      Write-Host "Skipping pre-release version for ${pkgName}: $newVersion. Weekly dependency issues are filed for stable releases only."
      continue
    }
    if ($update.Value.isDeprecated) {
      Write-Host "Skipping deprecated version for ${pkgName}: $newVersion."
      continue
    }

    if (-not $packages.ContainsKey($pkgName)) {
      $packages[$pkgName] = [PSCustomObject]@{
        Name = $pkgName
        OldVersions = @()
        NewVersions = @()
      }
    }
    $packages[$pkgName].OldVersions += $oldVersion
    $packages[$pkgName].NewVersions += $newVersion
  }

  foreach ($pkgName in ($packages.Keys | Sort-Object)) {
    $package = $packages[$pkgName]
    [PSCustomObject]@{
      Name = $pkgName
      OldVersion = ($package.OldVersions | Sort-Object -Unique) -join ", "
      NewVersion = ($package.NewVersions | Sort-Object -Unique) -join ", "
      IsDeprecated = $false
    }
  }
}
