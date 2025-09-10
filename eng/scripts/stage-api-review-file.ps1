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
    
    # Select the main API file by choosing the one with the shortest name
    # The main package API file typically has the simplest name without subclient suffixes
    $mainApiFile = $allNodeApiFiles | Sort-Object { $_.BaseName.Length } | Select-Object -First 1
    
    if ($mainApiFile) {
      $apiFile = @($mainApiFile)
    }
    else {
      $apiFile = @()
    }
    
    if ($apiFile) {
      # Always use the selected main API file (shortest name)
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
