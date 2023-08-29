param(
  [Parameter(Mandatory = $true)]
  [string] $DocRepoLocation
)

. (Join-Path $PSScriptRoot common.ps1)

Set-StrictMode -Version 3

function getPackageMetadata($moniker) { 
  $jsonFiles = Get-ChildItem -Path (Join-Path $DocRepoLocation "metadata/$moniker") -Filter *.json
  $metadata = @{}

  foreach ($jsonFile in $jsonFiles) {
    $packageMetadata = Get-Content $jsonFile -Raw | ConvertFrom-Json -AsHashtable
    $packageIdentity = $packageMetadata.Name
    if (Test-Path "Function:$GetPackageIdentity") {
      $packageIdentity = &$GetPackageIdentity $packageMetadata
    }

    $metadata[$packageIdentity] = @{ File = $jsonFile; Metadata = $packageMetadata }
  }
    
  return $metadata
}

function getPackageMetadataFileLocation($packageIdentity, $packageVersion, $lookupTable) { 
  if ($lookupTable.ContainsKey($packageIdentity)) {
    # Only return a metadata file if the version matches a deprecated version
    if ($lookupTable[$packageIdentity]['Metadata'].Version -eq $packageVersion) {
      return $lookupTable[$packageIdentity]['File']
    }
  }

  return $null 
}

$metadataLookup = @{ 
  'latest'  = getPackageMetadata 'latest'
  'preview' = getPackageMetadata 'preview'
}
$deprecatedPackages = (Get-CSVMetadata).Where({ $_.Support -eq 'deprecated' })

foreach ($package in $deprecatedPackages) {
  $packageIdentity = $package.Package
  # TODO: Ensure this works
  if (Test-Path "Function:$GetPackageIdentity") {
    $packageIdentity = &$GetPackageIdentity $package
  }

  # In cases where $targetPackages contains both a preview and a latest moniker
  # it's possible that both metadata files will be moved. In this case, the
  # sequence is important and the GA version will win over the Preview version
  $targetPackages = @()
  if ($package.VersionPreview) { 
    $targetPackages += @{ Moniker = 'preview'; Version = $package.VersionPreview }
  }
  if ($package.VersionGA) { 
    $targetPackages += @{ Moniker = 'latest'; Version = $package.VersionGA }
  }

  foreach ($targetPackage in $targetPackages) { 
    $previewMetadataPath = getPackageMetadataFileLocation `
      -packageIdentity $packageIdentity `
      -packageVersion $targetPackage.Version `
      -lookupTable $metadataLookup['preview']

    if ($previewMetadataPath) {
      $metadata = &$GetDocsMsMetadataForPackageFn `
        -PackageInfo $metadataLookup[$targetPackage.Moniker][$packageIdentity]['Metadata']

      Write-Host "Package $packageIdentity is deprecated but has file in preview metadata folder. Moving to legacy."
      Move-Item $previewMetadataPath "$DocRepoLocation/metadata/legacy/" -Force

      if (Test-Path "$DocRepoLocation/$($metadata.PreviewReadMeLocation)/$($metadata.DocsMsReadMeName)-readme.md") {
        Move-Item `
          "$DocRepoLocation/$($metadata.PreviewReadMeLocation)/$($metadata.DocsMsReadMeName)-readme.md" `
          "$DocRepoLocation/$($metadata.LegacyReadMeLocation)/" `
          -Force
      }
    }
  }
}
