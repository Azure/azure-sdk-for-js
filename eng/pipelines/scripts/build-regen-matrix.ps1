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
$allOutDir = Join-Path (Split-Path $MatrixOutDir -Parent) "matrix-all-candidates"

function Get-PackageDirectoriesFromMatrixDir([string]$DirPath) {
  if (-not (Test-Path $DirPath)) {
    return @()
  }

  return @(Get-ChildItem -Path $DirPath -Filter "*.json" -File -ErrorAction SilentlyContinue |
      Where-Object { $_.Name -ne "skipped-no-tsp-location.json" } |
      ForEach-Object {
        $content = Get-Content $_.FullName -Raw | ConvertFrom-Json
        foreach ($entry in @($content)) {
          if ($entry -is [string]) {
            $entry
          }
          elseif ($null -ne $entry.PackageDirectory) {
            "sdk/$($entry.PackageDirectory)"
          }
        }
      })
}

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

Write-Host "===== Derive packages skipped by -OnlyTypeSpec ====="
& $matrixScript `
  -OutputDirectory $allOutDir `
  -OutputVariableName ignoredMatrix `
  -JobCount $JobCount `
  -MinimumPerJob $MinimumPerJob `
  -OnlyTypeSpec $false `
  -DirectoryFilterPattern $DirectoryFilterPattern | Out-Host
if ($LASTEXITCODE) {
  exit $LASTEXITCODE
}

$included = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
foreach ($pkg in Get-PackageDirectoriesFromMatrixDir $MatrixOutDir) {
  [void]$included.Add(($pkg -replace "\\", "/"))
}

$missing = @()
foreach ($pkg in Get-PackageDirectoriesFromMatrixDir $allOutDir) {
  $normalized = $pkg -replace "\\", "/"
  if (-not $included.Contains($normalized)) {
    $missing += @{ name = $normalized; reason = "no tsp-location.yaml" }
  }
}

$outPath = Join-Path $MatrixOutDir "skipped-no-tsp-location.json"
New-Item -ItemType Directory -Force -Path (Split-Path $outPath) | Out-Null
ConvertTo-Json @($missing) -Depth 3 | Out-File -FilePath $outPath -Encoding utf8
Write-Host "Wrote $($missing.Count) skipped packages to $outPath"

Remove-Item -Path $allOutDir -Recurse -Force -ErrorAction SilentlyContinue
