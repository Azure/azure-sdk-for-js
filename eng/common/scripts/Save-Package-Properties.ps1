<#
.SYNOPSIS
Saves package properties from source into JSON files

.DESCRIPTION
Saves package properties in source of a given service directory to JSON files.
JSON files are named in the form <package name>.json or <artifact name>.json if
an artifact name property is available in the package properties.

Can optionally add a dev version property which can be used logic for daily 
builds.

.PARAMETER serviceDirectory
Service directory in which to search for packages

.PARAMETER outDirectory
Output location (generally a package artifact directory in DevOps) for JSON 
files

.PARAMETER addDevVersion
(Requires existing JSON files in outDirectory corresponding to packages in the 
given serviceDirectory.) Reads package properties from existing packages in the
given serviceDirectory and updates existing package JSON files in the 
outDirectory with a DevVersion property that reflects the version currently
specified in the package source. Run this after updating package source with a 
dev version.
#>

[CmdletBinding()]
Param (
  [Parameter(Mandatory=$True)]
  [string] $serviceDirectory,
  [Parameter(Mandatory=$True)]
  [string] $outDirectory,
  [switch] $addDevVersion
)

. (Join-Path $PSScriptRoot common.ps1)

function SetOutput($outputPath, $incomingPackageSpec) { 
  $outputObject = $incomingPackageSpec
  
  if ($addDevVersion) {
    # Read in the existing package specification file instead of using the
    # passed $incomingPackageSpec.
    $outputObject = ConvertFrom-Json (Get-Content $outputPath -Raw)
    Add-Member `
      -InputObject $outputObject `
      -NotePropertyName DevVersion `
      -NotePropertyvalue $incomingPackageSpec.Version `
      -Force
  }

  Set-Content `
    -Path $outputPath `
    -Value (ConvertTo-Json -InputObject $outputObject -Depth 100)
}

$allPackageProperties = Get-AllPkgProperties $serviceDirectory
if ($allPackageProperties)
{
    if (-not (Test-Path -Path $outDirectory))
    {
      New-Item -ItemType Directory -Force -Path $outDirectory
    }
    foreach($pkg in $allPackageProperties)
    {
        if ($pkg.IsNewSdk)
        {
            Write-Host "Package Name: $($pkg.Name)"
            Write-Host "Package Version: $($pkg.Version)"
            Write-Host "Package SDK Type: $($pkg.SdkType)"
            Write-Host "Artifact Name: $($pkg.ArtifactName)"
            $configFilePrefix = $pkg.Name
            if ($pkg.ArtifactName)
            {
              $configFilePrefix = $pkg.ArtifactName
            }
            $outputPath = Join-Path -Path $outDirectory "$configFilePrefix.json"
            SetOutput $outputPath $pkg
        }        
    }

    Get-ChildItem -Path $outDirectory
}
else
{
    Write-Error "Package properties are not available for service directory $($serviceDirectory)"
    exit 1
}
