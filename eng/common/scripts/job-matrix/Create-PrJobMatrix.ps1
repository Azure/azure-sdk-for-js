<#
.SYNOPSIS
Generates a combined PR job matrix from a package properties folder. It is effectively a combination of
Create-JobMatrix and distribute-packages-to-matrix

This script is intended to be used within an Azure DevOps pipeline to generate a job matrix for a PR.

.EXAMPLE
./eng/common/scripts/Create-PRJobMatrix $(Build.ArtifactStagingDirectory)/PackageProperties
#>

[CmdletBinding()]
param (
    [Parameter(Mandatory=$true)][string] $PackagePropertiesFolder,
    [Parameter(Mandatory=$true)][string] $PRMatrixFile,
    [Parameter(Mandatory=$true)][string] $PRMatrixSetting,
    [Parameter(Mandatory=$False)][string] $DisplayNameFilter,
    [Parameter(Mandatory=$False)][array] $Filters,
    [Parameter(Mandatory=$False)][array] $Replace,
    [Parameter()][switch] $CI = ($null -ne $env:SYSTEM_TEAMPROJECTID)
)

. $PSScriptRoot/job-matrix-functions.ps1
. $PSScriptRoot/../Helpers/Package-Helpers.ps1

if (!(Test-Path $PackagePropertiesFolder)) {
    Write-Error "Package Properties folder doesn't exist"
    exit 1
}

# create batching by grouping packages based on the matrix config
Write-Host "Generating PR job matrix for $PackagePropertiesFolder"

# this will become a parameter in the future, we will pass MatrixConfigs as a paremeter
# these will be the "default" matrices that we will use to generate the PR matrix in lieu of
# a matrix file
$configs = @(
  [PsCustomObject]@{
    Name = "default_platform_matrix"
    ConfigPath = $PRMatrixFile
    Selection = "sparse"
  }
)


# calculate general targeting information and create our batches prior to generating any matrix
# this prototype doesn't handle direct and indirect, it just batches for simplicity of the proto
$packageProperties = Get-ChildItem -Recurse "$PackagePropertiesFolder" *.json `
    | % { Get-Content -Path $_.FullName | ConvertFrom-Json }

$packageProperties | ForEach-Object {
  if (-not $_.CIMatrixConfigs) {
    $_.CIMatrixConfigs = $configs
  }
}

foreach ($package in $packageProperties) {
  Write-Host "$($package.ArtifactName) has the following matrix configs: $($package.CIMatrixConfigs)"
}

# this will group the packages, but the values of the grouping itself won't be super useful given how they were
# constructed
$batchesByConfig = Group-ByObjectKey $packageProperties "CIMatrixConfigs"

foreach($key in $batchesByConfig.Keys) {
  Write-Host $key
  foreach($package in $batchesByConfig[$key]) {
    Write-Host $package.ArtifactName
  }
}

exit 0

# the key here is that after we group the packages by the matrix config objects, we can use the first item's MatrixConfig
# to generate the matrix for the group, no reason to have to parse the key value backwards to get the matrix config


# in the full proto, we will compress the CIMatrixConfig value into a single string, then use it as a key
# to group the packages
# then we will simply iterate over the groups and generate the matrix for each group
# at the very end, will distribute the packages to the matrix based on the group key (batched over course)


$OverallResult = @()
foreach($matrixConfig in $configs) {
  Write-Host "Generating config for $($matrixConfig.ConfigPath)"
  $generatedMatrix = GenerateMatrixForConfig -ConfigPath $matrixConfig.ConfigPath -Selection $matrixConfig.Selection -DisplayNameFilter $DisplayNameFilter -Filters $Filters -Replace $Replace

  # also note here that we should be using a filtered set of package properties
  # (remember we figured out which matrix config is associated with each package)
  # $batches = Split-ArrayIntoBatches -InputArray $packageProperties -BatchSize $BATCHSIZE
  $batches = @()
  $everything = ($packageProperties | ForEach-Object { $_.ArtifactName })
  $batches += ,$everything

  foreach($batch in $batches) {
    $ModifiedMatrix = @()
    # to understand this iteration, one must understand that the matrix is a list of hashtables, each with a couple keys:
    # [
    #  { "name": "jobname", "parameters": { matrixSetting1: matrixValue1, ...} },
    # ]
    if($batches.Length -gt 1) {
      throw "This script is not prepared to handle more than one batch. We will need to duplicate the input objects."
    }
    else {
      foreach($config in $generatedMatrix) {
          $namesForBatch = $batches[0] -join ","
          # we just need to iterate across them, grab the parameters hashtable, and add the new key
          # if there is more than one batch, we will need to add a suffix including the batch name to the job name
          $config["parameters"]["$PRMatrixSetting"] = $namesForBatch
          $OverallResult += $config
      }
    }
  }
}

$serialized = SerializePipelineMatrix $OverallResult

Write-Output $serialized.pretty

if ($CI) {
    Write-Output "##vso[task.setVariable variable=matrix;isOutput=true]$($serialized.compressed)"
}
