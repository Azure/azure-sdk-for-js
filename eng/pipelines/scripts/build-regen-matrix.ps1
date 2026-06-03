[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$BuildSourcesDirectory,

  [Parameter(Mandatory = $true)]
  [string]$MatrixOutDir,

  [Parameter(Mandatory = $true)]
  [int]$JobCount,

  [Parameter(Mandatory = $true)]
  [int]$MinimumPerJob,

  [Parameter(Mandatory = $false)]
  [string]$DirectoryFilterPattern = ""
)

$ErrorActionPreference = "Stop"

$matrixScript = Join-Path $BuildSourcesDirectory "eng/common/scripts/New-RegenerateMatrix.ps1"

Write-Host "===== Split ARM packages into matrix batches ====="
& $matrixScript `
  -OutputDirectory $MatrixOutDir `
  -OutputVariableName matrix `
  -JobCount $JobCount `
  -MinimumPerJob $MinimumPerJob `
  -OnlyTypeSpec $true `
  -DirectoryFilterPattern $DirectoryFilterPattern
if ($LASTEXITCODE) {
  exit $LASTEXITCODE
}
