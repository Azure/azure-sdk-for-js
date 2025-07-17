param (
  [Parameter(mandatory = $true)]
  $PackageInfoPath,
  [Parameter(mandatory = $true)]
  $StagingDirectory
)

if (!((Test-Path $PackageInfoPath) -and (Test-Path $StagingDirectory))) {
  Write-Error "Invalid parameter values. Pleaes verify values for these parameters."
  exit 1
}

foreach ($pkg in (Get-ChildItem -Path $PackageInfoPath "*.json")) {
  $info = Get-Content -Path $pkg.FullName | ConvertFrom-Json
  if (Test-Path $info.DirectoryPath) {
    # First try to find the main package API file (without extra suffixes like -api-, -models-, etc.)
    $allNodeApiFiles = @(Get-ChildItem -Path $info.DirectoryPath "*-node.api.json" -Recurse)
    
    # Try to find the main file by looking for one that doesn't have extra suffixes
    $mainApiFile = $allNodeApiFiles | Where-Object { 
      $_.BaseName -match "^[^-]+-node$" -or 
      $_.BaseName -eq "$($info.ArtifactName)-node" -or
      ($_.BaseName -notmatch "-api-" -and $_.BaseName -notmatch "-models-")
    }
    
    if ($mainApiFile -and $mainApiFile.Count -eq 1) {
      $apiFile = @($mainApiFile)
    }
    elseif ($allNodeApiFiles.Count -eq 1) {
      # If there's only one node API file, use it
      $apiFile = $allNodeApiFiles
    }
    else {
      # Multiple files found, this will trigger the error below
      $apiFile = $allNodeApiFiles
    }
    
    if ($apiFile) {
      if ($apiFile.Count -ne 1) {
        # List all found files for debugging
        Write-Host "Found API files:"
        foreach ($file in $apiFile) {
          Write-Host "  $($file.FullName)"
        }
        Write-Error "Detected more than one -node.api.json extracted file in $($info.DirectoryPath). Expected main file: $($info.ArtifactName)-node.api.json"
        exit 1
      }
      
      $pkgStagingDir = Join-Path $StagingDirectory $info.ArtifactName
      if (!(Test-Path $pkgStagingDir)) {
        New-Item -Type Directory -Name $info.ArtifactName -Path $StagingDirectory > $null
      }
      $sourceFilePath = $apiFile[0].FullName
      $targetFilePath = "$($pkgStagingDir)/$($info.ArtifactName)_$($info.Version).api.json"
      Write-Host "Copying $($sourceFilePath) to $($targetFilePath)"
      Copy-Item $sourceFilePath $targetFilePath
    }
    else {
      # Not an error if api-extractor is not configured/required for a package
      Write-Host "-node.api.json extracted file is not present for package $($info.Name)"
    }
  }
  else {
    Write-Host "Directory $($info.DirectoryPath) is not present in package root to search for api-extracted file"
  }
}
