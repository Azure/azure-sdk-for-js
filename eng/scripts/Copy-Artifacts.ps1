param (
  [Parameter(mandatory = $true)]
  $serviceDirectory,
  [Parameter(mandatory = $true)]
  $artifacts,
  [Parameter(mandatory = $true)]
  $targetPath
)

foreach ($artifact in $artifacts)
{
  Write-Host $artifact
  $artifactName = $artifact.Name
  Write-Host "Copying artifact for $artifactName"
  New-Item -Type Directory -Name $artifactName -Path $targetPath
  Copy-Item $serviceDirectory/**/$artifactName-*.tgz $targetPath/$artifactName
  Copy-Item $serviceDirectory/**/browser/$artifactName-*.zip $targetPath/$artifactName
}
