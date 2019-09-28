param (
  $pathToDir,
  $pathToDest
)

$source = Get-ChildItem -Path $pathToDir -Directory
Write-Host "source = $source"

if((-Not (Test-Path $pathToDest))){
  mkdir $pathToDest
}

if((-Not (Test-Path $pathToDir))){
  mkdir $pathToDir
}
Foreach ($s in $source){
  $destination = Join-path -path $pathToDest -ChildPath "$($s.name).zip"
  Write-Host "destination = $destination"
  #If(Test-path $destination) {Remove-item $destination}
  Write-Host "s.fullname = $s.fullname"
  Compress-Archive -Path $s.fullname -Update -DestinationPath $destination
}
