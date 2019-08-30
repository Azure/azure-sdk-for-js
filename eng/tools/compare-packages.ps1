param (
  $pathToMasterPkg,
  $pathToCurrentPkg,
  $dailyDevBuildNo,
  $pathForDiffFile
)

function ExtractTGZPackages($pathToPkg) {
  $parentExtractDir = Join-Path $pathToPkg "all-contents"
  Write-Host "mkdir $parentExtractDir"
  mkdir $parentExtractDir

  foreach ($p in $(dir $pathToPkg -r -i *.tgz)) {
    if($p.BaseName -match "(?<name>.*?)(-\d+\.\d+\.\d+.*)") {
      $extractDir = Join-Path $parentExtractDir $matches["name"]
      mkdir "$extractDir"
      pushd "$extractDir"
      tar -xzf $p.FullName
      popd
      if($LastExitCode -ne 0) {
        Write-Host "error >> tar -xzf $p.FullName failed with exit code $LastExitCode"
      }
    }
    else {
      write-error "Package name $($p.BaseName) doesn't match the expected format [<name>-<version>]!"
    }
  }
}

try {
  $extractMasterDir = Join-Path $pathToMasterPkg "all-contents"
  ExtractTGZPackages($pathToMasterPkg)

  $extractCurrentDir = Join-Path $pathToCurrentPkg "all-contents"
  ExtractTGZPackages($pathToCurrentPkg)

  Write-Host "Finished unzipping of all .tgz packages"

  $diffFile = Join-Path $pathForDiffFile "Change_$dailyDevBuildNo.diff"
  Write-Host "created filename variable $diffFile"

  git diff $extractMasterDir $extractCurrentDir | tee $diffFile

  if($LastExitCode -ne 0) {
    Write-Host "error >> git diff $extractMasterDir $extractCurrentDir | tee $diffFile executes with exit code $LastExitCode"
  }
  Write-Host "created the diff file - $diffFile"
  exit 0
}
catch {
  Write-Host "An error occurred:"
  Write-Host $_
}
