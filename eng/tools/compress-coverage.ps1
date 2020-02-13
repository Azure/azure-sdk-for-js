param (
  $dirname,
  $pathToDest
)
$list = Get-ChildItem $dirname -Recurse -Depth 3
Foreach ($q in $list) {
  $dir=(Split-Path (Split-Path $q) -Leaf)
  $dest = Join-path -path $pathToDest -ChildPath "$($dir)-$($q.name).zip"
  Compress-Archive $q $dest
  }
