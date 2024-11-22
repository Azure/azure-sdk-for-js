# Wrapper Script for ChangeLog Verification in a PR
[CmdletBinding()]
param (
  [String]$PackagePropertiesFolder
)
Set-StrictMode -Version 3

. (Join-Path $PSScriptRoot common.ps1)


function ShouldVerifyChangeLog ($PkgArtifactDetails) {
  if ($PkgArtifactDetails) {
    if ($PkgArtifactDetails.PSObject.Properties["skipVerifyChangeLog"] -eq $true) {
      return $false
    }

    return $true
  }

  return $false
}
# todo: revert this temp change

exit 0
