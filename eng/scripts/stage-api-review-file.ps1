param (
  [Parameter(mandatory = $true)]
  $PackageInfoPath,
  [Parameter(mandatory = $true)]
  $StagingDirectory
)

if (!((Test-Path $PackageInfoPath) -and (Test-Path $StagingDirectory)))
{
  Write-Error "Invalid parameter values. Pleaes verify values for these parameters."
  exit 1
}

foreach($pkg in (Get-ChildItem -Path $PackageInfoPath "*.json"))
{
  $info = Get-Content -Path $pkg.FullName | ConvertFrom-Json
  $apiFilePath = Join-Path $info.DirectoryPath "temp"
  if (Test-Path $apiFilePath)
  {
    $apiFile = Get-ChildItem -Path $apiFilePath "*.api.json"
    if ($apiFile)
    {
      if ($apiFile.Count -ne 1)
      {
        # Unlikely, but handling to avoid any issue in the future if more than one api file is present here
        Write-Error "Detected more than one api extracted file in $apiFilePath"
        exit 1
      }
      
      $pkgStagingDir = Join-Path $StagingDirectory $info.ArtifactName
      if (!(Test-Path $pkgStagingDir))
      {
        New-Item -Type Directory -Name $info.ArtifactName -Path $StagingDirectory > $null
      }
      $sourceFilePath = $apiFile[0].FullName
      $targetFilePath = "$($pkgStagingDir)/$($info.ArtifactName)_$($info.Version).api.json"
      Write-Host "Copying $($sourceFilePath) to $($targetFilePath)"
      Copy-Item $sourceFilePath $targetFilePath
    }
    else
    {
      # Not an error is api-extractor is not cofigured/ required for a package
      Write-Host "API extracted file is not present for package $($info.Name)"
    }
  }
  else
  {
    Write-Host "Directory $($apiFilePath) is not present in package root to search for api-extracted file"
  }
}
