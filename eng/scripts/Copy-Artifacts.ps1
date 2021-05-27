param (
  [Parameter(mandatory = $true)]
  $serviceDirectory,
  [Parameter(mandatory = $true)]
  $artifacts,
  [Parameter(mandatory = $true)]
  $targetPath
)
<#
    sourceFolder: sdk
      contents: |
        **/$(coalesceResultFilter)/*.tgz
        **/$(coalesceResultFilter)/browser/*.zip
      targetFolder: $(Build.ArtifactStagingDirectory)
#>

foreach ($artifact in $artifacts)
{
  New-Item -Type Directory -Name $artifactName -Path $targetPath
  Copy-Item $serviceDirectory/**/*.tgz $targetPath/$artifactName
  Copy-Item $serviceDirectory/**/browser/*.zip $targetPath/$artifactName
}
