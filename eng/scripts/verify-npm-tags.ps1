param (
  [Parameter(mandatory = $true)]
  $pathToArtifacts,
  [Parameter(mandatory = $true)]
  $originalDistTags,
  [Parameter(mandatory = $true)]
  $intendedTag,
  [Parameter(mandatory = $true)]
  $intendedTagVersion
)

# TODO: delete testing comments below
#'@azure/eventhubs-checkpointstore-table' alpha, no beta, no GA
#'@azure/openai' alpha, beta, no GA
#'@azure/video-indexer-widgets' no alpha, no beta, GA
#'@azure/template' alpha, beta, GA
#$pkgProps.PackageId

$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true

$pkg = Get-Content -Raw "temp_decompress\package\package.json" | ConvertFrom-Json
$packageName = $pkg.Name

Write-Host "Verify npm tag versions for package $packageName"

$parsedOriginalDistTags = $originalDistTags | ConvertFrom-Json

$npmPkgProp = npm view $packageName --json | ConvertFrom-Json
$packageDistTags = $npmPkgProp."dist-tags"
Write-Host "Current dist-tag: $packageDistTags"

if ($packageDistTags."$intendedTag" -ne $intendedTagVersion) {
  Write-Warning "Tag not correctly set, current $intendedTag tag is version $packageDistTags.'$intendedTag' instead of $intendedTagVersion."
  $correctDistTags = $parsedOriginalDistTags
  $correctDistTags."$intendedTag" = $intendedTagVersion
  foreach($tag in $correctDistTags.PSObject.Properties) {
    Write-Host "npm dist-tag add $packageName@$($tag.value) $tag.Name"
    npm dist-tag add $packageName@$tag.value $tag.Name
  }
  $npmPkgProp = npm view $packageName --json | ConvertFrom-Json
  $packageDistTags = $npmPkgProp."dist-tags"
  Write-Host "Corrected dist tags to: $packageDistTags"
}
