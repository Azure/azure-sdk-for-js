param (
  $pathToDir,
  $pathToDest
)

if((-Not (Test-Path $pathToDest))){
  mkdir $pathToDest
}

$list = Get-ChildItem $pathToDir -Recurse -Depth 3
Write-Host "list of code coverage reports = $list"
Foreach ($q in $list) {
  $dir=(Split-Path (Split-Path $q) -Leaf)
  $dest = Join-path -path $pathToDest -ChildPath "$($dir)-$($q.name).zip"
  Compress-Archive $q $dest
  }
