<#
.SYNOPSIS
Used to update a generated matrix with targeted information for packages that are being built.
#>
param(
    [parameter(Mandatory=$true)]
    [array]$Matrix
)

$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot ".." ".."))
Set-StrictMode -Version 4
$BATCHSIZE = 10

if (!(Test-Path $Matrix)) {
    Write-Error "Matrix input not found: $Matrix"
    exit 1
}

function Split-ArrayIntoBatches {
    param (
        [Parameter(Mandatory=$true)]
        [object[]]$InputArray,

        [Parameter(Mandatory=$true)]
        [int]$BatchSize
    )

    $batches = @()

    for ($i = 0; $i -lt $InputArray.Count; $i += $BatchSize) {
        $batch = $InputArray[$i..[math]::Min($i + $BatchSize - 1, $InputArray.Count - 1)]

        $batches += ,$batch
    }

    return ,$batches
}

# calculate general targeting information and create our batches prior to updating any matrix
$packageProperties = $env:ArtifactPackageNames.Split(",")

$batches = Split-ArrayIntoBatches -InputArray $packageProperties -BatchSize $BATCHSIZE

# we just smear the batches across the matrix now

Write-Host "Ok I see the following batches: "

foreach ($batch in $batches) {
    Write-Host "-> " $batch
}
Write-Host "Returning the exact same matrix that was passed in"

return $Matrix
