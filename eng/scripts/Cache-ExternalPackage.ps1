<#
.SYNOPSIS
    Caches an external package in Azure DevOps feed by enabling upstreaming and installing it.

.DESCRIPTION
    This script automates the process of caching a package in an Azure DevOps NPM feed:
    1. Validates that the package version is at least 24 hours old (to avoid pre-release issues)
    2. Enables the "allow externally sourced versions" flag for the package via DevOps API
    3. Installs the package from the upstream registry using an authenticated .npmrc
    4. Disables the upstreaming flag to restore the default feed behavior

    Authentication is provided by the .npmrc file created by the create-authenticated-npmrc.yml
    pipeline template, which configures the Azure DevOps feed registry and passes credentials
    via the NPM_CONFIG_USERCONFIG environment variable.

    This is useful when you need to pre-cache packages in a DevOps feed to avoid 
    transient network failures during builds when upstream package registries are unavailable.

.PARAMETER PackageName
    The name of the package to cache (e.g., "lodash", "@babel/core").

.PARAMETER PackageVersion
  The specific package version to install.

.PARAMETER FeedName
    The name of the Azure DevOps feed (default: "azure-sdk-for-js").

.PARAMETER Organization
    The Azure DevOps organization name (default: "azure-sdk").

.PARAMETER Project
    The Azure DevOps project name (default: "public").

.PARAMETER WhatIf
    Shows what would be executed without actually running the commands.

.EXAMPLE
    # Cache a specific version of lodash in the default feed
    .\Cache-ExternalPackage.ps1 -PackageName "lodash" -PackageVersion "4.17.21"

.EXAMPLE
  # Cache @babel/core with WhatIf to preview
  .\Cache-ExternalPackage.ps1 -PackageName "@babel/core" -PackageVersion "7.20.0" -WhatIf

.EXAMPLE
    # Cache package in a custom feed
  .\Cache-ExternalPackage.ps1 -PackageName "axios" -PackageVersion "1.7.9" -FeedName "my-custom-feed" -Organization "my-org"

.NOTES
    Requires:
    - PowerShell 7.0 or later (pwsh)
    - Azure DevOps PAT token (via environment variable: SYSTEM_ACCESSTOKEN or ADO_PAT)
    - npm available in PATH
    - .npmrc file configured with the Azure DevOps feed (via NPM_CONFIG_USERCONFIG)

    Authentication:
    - In Azure Pipelines: Uses SYSTEM_ACCESSTOKEN if available (from pipeline context)
    - Locally: Uses ADO_PAT environment variable
    - .npmrc authentication is configured by the create-authenticated-npmrc.yml template
#>

[CmdletBinding(SupportsShouldProcess = $true)]
param (
  [Parameter(Mandatory = $false, HelpMessage = "Package name (e.g., 'lodash' or '@scope/package')")]
  [string]$PackageName = "",

  [Parameter(Mandatory = $false, HelpMessage = "Specific package version to install")]
  [string]$PackageVersion = "",

  [Parameter(Mandatory = $false, HelpMessage = "Azure DevOps feed name")]
  [string]$FeedName = "azure-sdk-for-js",

  [Parameter(Mandatory = $false, HelpMessage = "Azure DevOps organization")]
  [string]$Organization = "azure-sdk",

  [Parameter(Mandatory = $false, HelpMessage = "Azure DevOps project")]
  [string]$Project = "public"
)

# Import logging utilities
. "${PSScriptRoot}\..\common\scripts\logging.ps1"
. "${PSScriptRoot}\..\common\scripts\Invoke-DevOpsAPI.ps1"

function Get-DevOpsAuthToken {
  <#
  .SYNOPSIS
    Retrieves Azure DevOps authentication token from environment or prompts user.
  #>
  
  # Try SYSTEM_ACCESSTOKEN first (Azure Pipelines)
  if (-not [string]::IsNullOrWhiteSpace($env:SYSTEM_ACCESSTOKEN)) {
    LogInfo "Using SYSTEM_ACCESSTOKEN from Azure Pipelines environment"
    return $env:SYSTEM_ACCESSTOKEN
  }

  # Try ADO_PAT environment variable
  if (-not [string]::IsNullOrWhiteSpace($env:ADO_PAT)) {
    LogInfo "Using ADO_PAT from environment"
    return $env:ADO_PAT
  }

  LogError "No Azure DevOps authentication token found. Set SYSTEM_ACCESSTOKEN or ADO_PAT environment variable."
  exit 1
}

function Enable-PackageUpstreaming {
  <#
  .SYNOPSIS
    Toggles the allowExternallySourcedVersions flag for a package in the DevOps feed.
  #>
  
  param (
    [Parameter(Mandatory = $true)]
    [string]$PackageName,
    [Parameter(Mandatory = $true)]
    [string]$FeedName,
    [Parameter(Mandatory = $true)]
    [string]$Organization,
    [Parameter(Mandatory = $true)]
    [string]$Project,
    [Parameter(Mandatory = $true)]
    [string]$AuthToken
  )

  try {
    LogInfo "Enabling externally sourced versions for package: $PackageName"
    
    $encodedAuthToken = Get-Base64EncodedToken -AuthToken $AuthToken
    
    $result = Set-PackageUpstreamingFlag `
      -Organization $Organization `
      -Project $Project `
      -FeedName $FeedName `
      -PackageName $PackageName `
      -Protocol "npm" `
      -AllowExternallySourcedVersions $true `
      -Base64EncodedToken $encodedAuthToken

    LogSuccess "Successfully enabled upstreaming for $PackageName"
    return $result
  }
  catch {
    LogError "Failed to enable upstreaming for $PackageName : $_"
    exit 1
  }
}

function Disable-PackageUpstreaming {
  <#
  .SYNOPSIS
    Disables the allowExternallySourcedVersions flag for a package in the DevOps feed.
  #>

  param (
    [Parameter(Mandatory = $true)]
    [string]$PackageName,
    [Parameter(Mandatory = $true)]
    [string]$FeedName,
    [Parameter(Mandatory = $true)]
    [string]$Organization,
    [Parameter(Mandatory = $true)]
    [string]$Project,
    [Parameter(Mandatory = $true)]
    [string]$AuthToken
  )

  try {
    LogInfo "Disabling externally sourced versions for package: $PackageName"

    $encodedAuthToken = Get-Base64EncodedToken -AuthToken $AuthToken

    $result = Set-PackageUpstreamingFlag `
      -Organization $Organization `
      -Project $Project `
      -FeedName $FeedName `
      -PackageName $PackageName `
      -Protocol "npm" `
      -AllowExternallySourcedVersions $false `
      -Base64EncodedToken $encodedAuthToken

    LogSuccess "Successfully disabled upstreaming for $PackageName"
    return $result
  }
  catch {
    LogError "Failed to disable upstreaming for $PackageName : $_"
    exit 1
  }
}

function Install-PackageToFeed {
  <#
  .SYNOPSIS
    Installs a package from upstream registry to cache it in the DevOps feed.
  #>
  
  param (
    [Parameter(Mandatory = $true)]
    [string]$PackageName,
    [Parameter(Mandatory = $true)]
    [string]$PackageVersion,
    [Parameter(Mandatory = $true)]
    [string]$AuthToken
  )

  try {
    LogInfo "Setting up npm authentication via artifacts-npm-credprovider..."
    LogInfo "npm_config_userconfig: $($env:npm_config_userconfig)"

    $effectiveRegistry = (npm config get registry 2>&1 | Out-String).Trim()
    LogInfo "Effective npm registry: $effectiveRegistry"
    
    # The artifacts-npm-credprovider reads from .npmrc and uses environment variables
    # No need to explicitly set credentials here - the provider handles auth automatically
    # when npm commands are executed
    
    $fullPackageName = "$PackageName@$PackageVersion"

    LogInfo "Installing package: $fullPackageName"
    LogInfo "This may take a moment as the package is downloaded and cached..."

    # Hermetic install: use a dedicated temp directory
    $tempDir = New-Item -ItemType Directory -Path ([System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), [System.Guid]::NewGuid().ToString()))
    try {
      Push-Location $tempDir.FullName
      # --no-save avoids modifying package.json, --prefix ensures install is isolated
      npm install $fullPackageName --verbose --no-save --prefix $tempDir.FullName
      $exitCode = $LASTEXITCODE
      Pop-Location
    } catch {
      Pop-Location
      Remove-Item -Recurse -Force $tempDir.FullName
      throw $_
    }
    Remove-Item -Recurse -Force $tempDir.FullName

    if ($exitCode -ne 0) {
      LogError "npm install failed with exit code $exitCode"
      LogError "Possible causes:"
      LogError "  - Package name is incorrect or does not exist"
      LogError "  - Network connectivity issue with upstream registry"
      LogError "  - Feed permissions issue in Azure DevOps"
      LogError ""
      LogError "For more information, check the verbose output above."
      exit 1
    }

    LogSuccess "Successfully installed $fullPackageName to cache in DevOps feed"
  }
  catch {
    LogError "Failed to install package: $_"
    exit 1
  }
}

function Get-PackagePublishedAt {
  <#
  .SYNOPSIS
    Gets the publish timestamp for a specific package version from npm metadata.
  #>

  param (
    [Parameter(Mandatory = $true)]
    [string]$PackageName,
    [Parameter(Mandatory = $true)]
    [string]$PackageVersion
  )

  $packageRef = "$PackageName@$PackageVersion"
  $metadataRaw = npm view $PackageName time --json --registry "https://registry.npmjs.org/"
  if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($metadataRaw)) {
    throw "Unable to read publish time for $packageRef from npm metadata."
  }

  $metadata = $metadataRaw | ConvertFrom-Json -AsHashtable
  if (-not $metadata.ContainsKey($PackageVersion)) {
    throw "Version '$PackageVersion' was not found in npm metadata for package '$PackageName'."
  }

  return [DateTimeOffset]::Parse($metadata[$PackageVersion])
}

function Assert-MinimumPackageAge {
  <#
  .SYNOPSIS
    Ensures the package version is at least 24 hours old before installation.
  #>

  param (
    [Parameter(Mandatory = $true)]
    [string]$PackageName,
    [Parameter(Mandatory = $true)]
    [string]$PackageVersion,
    [Parameter(Mandatory = $false)]
    [int]$MinimumAgeHours = 24
  )

  $packageRef = "$PackageName@$PackageVersion"
  LogInfo "Checking package age for $packageRef (minimum: $MinimumAgeHours hours)..."

  try {
    $publishedAt = Get-PackagePublishedAt -PackageName $PackageName -PackageVersion $PackageVersion
  }
  catch {
    throw "Failed to retrieve package metadata from npm registry for $packageRef. $($_.Exception.Message)"
  }

  $age = [DateTimeOffset]::UtcNow - $publishedAt.ToUniversalTime()
  if ($age.TotalHours -lt $MinimumAgeHours) {
    $ageHoursRounded = [Math]::Round($age.TotalHours, 2)
    throw "Package version $packageRef is only $ageHoursRounded hours old; minimum required age is $MinimumAgeHours hours."
  }

  $ageHoursRounded = [Math]::Round($age.TotalHours, 2)
  LogSuccess "Package version $packageRef is $ageHoursRounded hours old and meets the minimum age requirement."
}

function Invoke-CachePackage {
  <#
  .SYNOPSIS
    Main orchestration function for caching a package in the DevOps feed.
  #>
  
  param (
    [Parameter(Mandatory = $true)]
    [string]$PackageName,
    [Parameter(Mandatory = $true)]
    [string]$PackageVersion,
    [Parameter(Mandatory = $true)]
    [string]$FeedName,
    [Parameter(Mandatory = $true)]
    [string]$Organization,
    [Parameter(Mandatory = $true)]
    [string]$Project
  )

  LogInfo "=========================================="
  LogInfo "DevOps Feed Package Caching Utility"
  LogInfo "=========================================="
  LogInfo "Starting cache flow for package '$PackageName' in feed '$FeedName' ($Organization/$Project)."
  LogInfo "Package: $PackageName"
  if (-not [string]::IsNullOrWhiteSpace($PackageVersion)) {
    LogInfo "Version: $PackageVersion"
  }
  LogInfo "Feed: $FeedName"
  LogInfo "Organization: $Organization"
  LogInfo "Project: $Project"
  LogInfo "=========================================="

  # Get authentication token
  $authToken = Get-DevOpsAuthToken

  $packageDisplay = "$PackageName@$PackageVersion"

  # Gate on package age before mutating feed state or installing.
  Assert-MinimumPackageAge `
    -PackageName $PackageName `
    -PackageVersion $PackageVersion `
    -MinimumAgeHours 24

  try {
    # Step 1: Toggle upstreaming flag
    LogInfo "Step 1/3: Enabling upstreaming."
    Enable-PackageUpstreaming `
      -PackageName $PackageName `
      -FeedName $FeedName `
      -Organization $Organization `
      -Project $Project `
      -AuthToken $authToken

    # Step 2: Install package
    LogInfo "Step 2/3: Installing package from feed to force cache save."
    Install-PackageToFeed `
      -PackageName $PackageName `
      -PackageVersion $PackageVersion `
      -AuthToken $authToken
  }
  finally {
    # Step 3: Disable upstreaming flag
    LogInfo "Step 3/3: Disabling upstreaming."
    Disable-PackageUpstreaming `
      -PackageName $PackageName `
      -FeedName $FeedName `
      -Organization $Organization `
      -Project $Project `
      -AuthToken $authToken
  }

  LogSuccess "Package caching operation completed successfully!"
}

function Invoke-CacheExternalPackageMain {
  <#
  .SYNOPSIS
    Entrypoint for script execution.
  #>

  try {
    # Validate inputs
    if ($PackageName -match '^\s*$') {
      LogError "PackageName cannot be empty"
      exit 1
    }

    if ($PackageName -match '[<>:"|?*]') {
      LogError "PackageName contains invalid characters: $PackageName"
      exit 1
    }

    if ($PackageVersion -match '[<>:"|?*]') {
      LogError "PackageVersion contains invalid characters: $PackageVersion"
      exit 1
    }

    Invoke-CachePackage `
      -PackageName $PackageName `
      -PackageVersion $PackageVersion `
      -FeedName $FeedName `
      -Organization $Organization `
      -Project $Project
  }
  catch {
    LogError "Unexpected error: $_"
    exit 1
  }
}

# Execute only when run directly, not when dot-sourced by tests.
if ($MyInvocation.InvocationName -ne '.') {
  Invoke-CacheExternalPackageMain `
    -PackageName $PackageName `
    -PackageVersion $PackageVersion `
    -FeedName $FeedName `
    -Organization $Organization `
    -Project $Project
}
