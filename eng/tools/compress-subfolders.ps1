param (
  $pathToDir,
  $pathToDest
)
if((-Not (Test-Path $pathToDir))){
  mkdir $pathToDir
}
$source = Get-ChildItem -Path $pathToDir -Directory
Write-Host "source = $source"

if((-Not (Test-Path $pathToDest))){
  mkdir $pathToDest
}

Foreach ($s in $source){
  $destination = Join-path -path $pathToDest -ChildPath "$($s.name).zip"
  Write-Host "destination = $destination"
  Compress-Archive -Path $s.fullname -DestinationPath $destination
}
