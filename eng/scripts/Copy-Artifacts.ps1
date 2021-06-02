param (
  [Parameter(mandatory = $true)]
  $serviceDirectory,
  [Parameter(mandatory = $true)]
  $artifactName,
  [Parameter(mandatory = $true)]
  $targetPath
)

New-Item -Type Directory -Name $artifactName -Path $targetPath
Copy-Item $serviceDirectory/**/$artifactName*.tgz $targetPath/$artifactName
Copy-Item $serviceDirectory/**/browser/$artifactName*.zip $targetPath/$artifactName
