param (
  $pathToMasterPkg,
  $pathToCurrentPkg,
  $dailyDevBuildNo
)

function ExtractTGZPackages($pathToPkg){
  $regExp = "-\d\.\d\.\d(-\w*\.\d*)?(-dev-$dailyDevBuildNo)?"
  foreach ($p in $(dir $pathToPkg -r -i *.tgz)){
    $extractDir = (get-item $p.FullName).Directoryname + "/" + $p.BaseName
    if($p.BaseName -match $regExp){
      $newDirName = ($p.BaseName -split $Matches.0)[0]
      $extractDir = (get-item $p.FullName).Directoryname + "/" + $newDirName
    }
    mkdir "$extractDir"
    pushd "$extractDir"
    tar -xzf $p.FullName
    popd
  }
}
try{
  ExtractTGZPackages($pathToMasterPkg)
  if($LastExitCode -ne 0){
    Write-Host "error >> ExtractTGZPackages($pathToMasterPkg) failed with exit code $LastExitCode"
  }

  ExtractTGZPackages($pathToCurrentPkg)
  if($LastExitCode -ne 0){
    Write-Host "error >> ExtractTGZPackages($pathToCurrentPkg) failed with exit code $LastExitCode"
  }
  echo "Finished unzipping of all .tgz packages"

  $diffFile = "Change_"+$dailyDevBuildNo + ".diff"
  echo "created filename variable $diffFile"

  git diff $pathToMasterPkg $pathToCurrentPkg > $diffFile
  if($LastExitCode -ne 0){
    Write-Host "error >> git diff $pathToMasterPkg $pathToCurrentPkg > $diffFile failed with exit code $LastExitCode"
  }
  echo "created the diff file - $diffFile"
  exit 0
}
catch{
  Write-Host "An error occurred:"
  Write-Host $_
}
