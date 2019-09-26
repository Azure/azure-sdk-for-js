param (
  $pathToDir,
  $pathToDest
)

$source = Get-ChildItem -Path $pathToDir -Directory
Write-Host "$source"
Foreach ($s in $source){
  $destination = Join-path -path $pathToDest -ChildPath "$($s.name).zip"
  #If(Test-path $destination) {Remove-item $destination}
  Write-Host "$s.fullname"
  Compress-Archive -Path $s.fullname -Update -DestinationPath $destination
}
