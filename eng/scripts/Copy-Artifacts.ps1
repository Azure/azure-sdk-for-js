param (
  [Parameter(mandatory = $true)]
  $serviceDirectory,
  [Parameter(mandatory = $true)]
  $artifactsJson,
  [Parameter(mandatory = $true)]
  $targetPath
)

$artifacts = ConvertFrom-Json $artifactsJson
Write-Host $artifacts

foreach ($artifact in $artifacts)
{
  $artifactName = $artifact.Name
  Write-Host "Copying artifact for $artifactName"
  New-Item -Type Directory -Name $artifactName -Path $targetPath
  Copy-Item $serviceDirectory/**/$artifactName-*.tgz $targetPath/$artifactName
  Copy-Item $serviceDirectory/**/browser/$artifactName-*.zip $targetPath/$artifactName
}
