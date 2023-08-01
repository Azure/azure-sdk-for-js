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

function GetPackageInfoFromDocsMsConfig($packageInfo) { 
  $name = $packageInfo.name
  $version = ''
  if ($packageInfo.name.IndexOf('@', 1) -ne -1) {
    $secondAtIndex = $packageInfo.name.IndexOf('@', 1)

    # "@azure/package@1.2.3" -> "@azure/package"
    $name = $packageInfo.name.Substring(0, $secondAtIndex)

    # "@azure/package@1.2.3" -> "1.2.3"
    $version = $packageInfo.name.Substring($secondAtIndex + 1)
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
    $packageInfo = GetPackageInfoFromDocsMsConfig $spec    
    $onboardedPackages[$packageInfo.Name] = $packageInfo
  }

  return $onboardedPackages
}
