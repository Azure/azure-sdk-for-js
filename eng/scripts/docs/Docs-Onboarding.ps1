. "$PSScriptRoot/Docs-ToC.ps1"

# $SetDocsPackageOnboarding = "Set-${Language}-DocsPackageOnboarding"
function Set-javascript-DocsPackageOnboarding($moniker, $metadata, $docRepoLocation, $packageSourceOverride) {
  $onboardingFile = GetOnboardingFile `
    -docRepoLocation $docRepoLocation `
    -moniker $moniker

  $onboardingSpec = Get-Content $onboardingFile -Raw | ConvertFrom-Json -AsHashtable

  $packagesToOnboard = @()
  foreach ($package in $metadata) { 
    $packageSpec = [ordered]@{
      name = Get-DocsMsPackageName `
        -packageName $package.Name `
        -packageVersion $package.Version
    }

    # $packageSourceOverride is irrelevant here as preview packages are 
    # published up to NPM directly as alpha versions. The version from the 
    # package metadata is sufficient.

    # Merge properties from from overrides, duplicate keys will be overwritten
    if ($package.ContainsKey('DocsCiConfigProperties')) {
      $overrides = $package['DocsCiConfigProperties']
      foreach ($key in $overrides.Keys) { 
        $packageSpec[$key] = $overrides[$key]
      }
    }

    $packagesToOnboard += $packageSpec
  }

  $onboardingSpec['npm_package_sources'] = $packagesToOnboard

  Set-Content `
    -Path $onboardingFile `
    -Value ($onboardingSpec | ConvertTo-Json -Depth 100)
}

function GetPackageInfoFromDocsMsConfig($packageName) {
  if (!$packageName) { 
    throw "Package name must not be empty"
  }

  $name = $packageName
  $version = ''
  if ($packageName.IndexOf('@', 1) -ne -1) {
    $secondAtIndex = $packageName.IndexOf('@', 1)

    # "@azure/package@1.2.3" -> "@azure/package"
    $name = $packageName.Substring(0, $secondAtIndex)

    # "@azure/package@1.2.3" -> "1.2.3"
    $version = $packageName.Substring($secondAtIndex + 1)
  }

  return @{
    Name    = $name
    Version = $version
  }
}

# $GetDocsPackagesAlreadyOnboarded = "Get-${Language}-DocsPackagesAlreadyOnboarded"
function Get-javascript-DocsPackagesAlreadyOnboarded($docRepoLocation, $moniker) {
  $packageOnboardingFile = GetOnboardingFile `
    -docRepoLocation $DocRepoLocation `
    -moniker $moniker
  
  $onboardedPackages = @{}
  $onboardingSpec = ConvertFrom-Json (Get-Content $packageOnboardingFile -Raw)
  foreach ($spec in $onboardingSpec.npm_package_sources) {
    $packageInfo = GetPackageInfoFromDocsMsConfig $spec.name
    $onboardedPackages[$packageInfo.Name] = $packageInfo
  }

  return $onboardedPackages
}

# "@azure/package-name@1.2.3" -> "@azure/package-name"
function Get-PackageNameFromDocsMsConfig($DocsConfigName) {
  if ($DocsConfigName -match '^(?<pkgName>.+?)(?<pkgVersion>@.+)?$') {
    return $Matches['pkgName']
  }
  LogWarning "Could not find package name in ($DocsConfigName)"
  return ''
}

# Given the name of a package (possibly of the form "@azure/package-name@1.2.3")
# return a package name with the version specified in $packageVersion
# "@azure/package-name@1.2.3" "1.3.0" -> "@azure/package-name@1.3.0"
function Get-DocsMsPackageName($packageName, $packageVersion) {
  return "$(Get-PackageNameFromDocsMsConfig $packageName)@$packageVersion"
}
