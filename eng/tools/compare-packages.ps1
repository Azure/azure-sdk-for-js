param (
  $pathToMasterPkg,
  $pathToCurrentPkg,
  $dailyDevBuildNo,
  $pathForDiffFile
)

function ExtractTGZPackages($pathToPkg){
  $regExp = "-\d+\.\d+\.\d+(-\w*\.\d*)?(-dev-$dailyDevBuildNo)?"



  ## $parentCurrent = Split-Path -Path $pathToPkg -Parent
  ## $parentExtractName = (Split-Path -Path $pathToPkg -Leaf)+"-contents"  
  ## $parentExtractDir = Join-Path $parentCurrent -ChildPath $parentExtractName


  $parentExtractDir = Join-Path $pathToPkg -ChildPath "all-contents"
  mkdir "$parentExtractDir"
  foreach ($p in $(dir $pathToPkg -r -i *.tgz)){
    $extractDir = Join-Path $parentExtractDir -ChildPath $p.BaseName
    #$extractDir = Join-Path $pathToPkg -ChildPath $p.BaseName

    if($p.BaseName -match $regExp){
      $newDirName = ($p.BaseName -split $Matches.0)[0]
      $extractDir = Join-Path $parentExtractDir $newDirName
      #$extractDir = Join-Path $pathToPkg $newDirName
    }
    mkdir "$extractDir"
    pushd "$extractDir"
    tar -xzf $p.FullName
    popd
  }
  #return $pathToPkg
  return $parentExtractDir
}
try{
  $extractMasterDir = ExtractTGZPackages($pathToMasterPkg)
  echo $extractMasterDir
  if($LastExitCode -ne 0){
    Write-Host "error >> ExtractTGZPackages($pathToMasterPkg) failed with exit code $LastExitCode"
  }

  $extractCurrentDir = ExtractTGZPackages($pathToCurrentPkg)
  echo $extractCurrentDir 
  if($LastExitCode -ne 0){
    Write-Host "error >> ExtractTGZPackages($pathToCurrentPkg) failed with exit code $LastExitCode"
  }
  echo "Finished unzipping of all .tgz packages"

  $diffFile = Join-Path $pathForDiffFile "Change_$dailyDevBuildNo.diff"
  echo "created filename variable $diffFile"
  echo "extractMasterDir - $extractMasterDir"
  echo "extractCurrentDir - $extractCurrentDir"
  git diff $extractMasterDir $extractCurrentDir | tee $diffFile
  #git diff $pathToMasterPkg $pathToCurrentPkg | tee $diffFile
  if($LastExitCode -ne 0){
    Write-Host "error >> git diff $extractMasterDir $extractCurrentDir | tee $diffFile executes with exit code $LastExitCode"
  }
  echo "created the diff file - $diffFile"
  exit 0
}
catch{
  Write-Host "An error occurred:"
  Write-Host $_
}
#git diff C:\Users\kaghiya\Downloads\package_master C:\Users\kaghiya\Downloads\package_PR
#git diff C:\Users\kaghiya\Downloads\package_master\all-contents\ C:\Users\kaghiya\Downloads\package_PR\all-contents\
