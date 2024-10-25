<#
.SYNOPSIS
Used to update a generated matrix with targeted information for packages that are being built.
#>
[CmdletBinding()]
param(
    [parameter(Mandatory=$true)]
    [array]$Matrix
)

$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot ".." ".."))
$BATCHSIZE = 10

if (!$Matrix) {
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

# calculate the batches, then duplicate the entire matrix if need be
$packageProperties = $env:ArtifactPackageNames.Split(",")
$batches = Split-ArrayIntoBatches -InputArray $packageProperties -BatchSize $BATCHSIZE

$ModifiedMatrix = @()
# to understand this iteration, one must understand that the matrix is a list of hashtables, each with a couple keys:
# [
#  { "name": "jobname", "parameters": { matrixSetting1: matrixValue1, ...} },
# ]
if($batches.Length -gt 1) {
  throw "This script is not prepared to handle more than one batch. We will need to duplicate the input objects."
}
else {
  foreach($config in $Matrix) {
      # we just need to iterate across them, grab the parameters hashtable, and add the new key
      # if there is more than one batch, we will need to add a suffix including the batch name to the job name
      $config["parameters"]["ArtifactPackageNames"] = ($batches -join ",")
  }
}

return $Matrix
