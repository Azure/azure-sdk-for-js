function Get-javascript-OnboardedDocsMsPackages($DocRepoLocation) {
  $packageOnboardingFiles = @(
    "$DocRepoLocation/ci-configs/packages-latest.json",
    "$DocRepoLocation/ci-configs/packages-preview.json",
    "$DocRepoLocation/ci-configs/packages-legacy.json")

  $onboardedPackages = @{}
  foreach ($file in $packageOnboardingFiles) {
    $onboardingSpec = ConvertFrom-Json (Get-Content $file -Raw)
    foreach ($spec in $onboardingSpec.npm_package_sources) {
      $packageName = $spec.name
      if ($packageName.LastIndexOf('@') -gt 0) {
        # Package has an '@' symbol deliminting the end of the package name
        $packageName = $packageName.Substring(0, $packageName.LastIndexOf('@'))
      }
      $onboardedPackages[$packageName] = $null
    }
  }

  return $onboardedPackages
}

function Get-javascript-DocsMsTocData($packageMetadata, $docRepoLocation) {
  # Fallback to get package-level readme name if metadata file info does not exist
  $packageLevelReadmeName = $packageMetadata.Package.Replace('@azure/', '').Replace('@azure-tools/', '').Replace('azure-', '');

  # Fallback to get package-level readme name if metadata file info does not exist
  if ($packageMetadata.Package.StartsWith('@azure-rest/')) {
    $packageLevelReadmeName = "$($packageMetadata.Package.Replace('@azure-rest/', ''))-rest"
  }

  # If there is a metadata json for the package use the DocsMsReadmeName from
  # the metadata function
  if ($packageMetadata.PSObject.Members.Name -contains "FileMetadata") {
    $readmeMetadata = &$GetDocsMsMetadataForPackageFn -PackageInfo $packageMetadata.FileMetadata
    $packageLevelReadmeName = $readmeMetadata.DocsMsReadMeName
  }


  $packageTocHeader = $packageMetadata.Package
  if ($clientPackage.DisplayName) {
    $packageTocHeader = $clientPackage.DisplayName
  }
  $output = [PSCustomObject]@{
    PackageLevelReadmeHref = "~/docs-ref-services/{moniker}/$packageLevelReadmeName-readme.md"
    PackageTocHeader       = $packageTocHeader
    TocChildren            = @($clientPackage.Package)
  }

  return $output
}

function Get-javascript-DocsMsTocChildrenForManagementPackages($packageMetadata, $docRepoLocation) {
  return @($packageMetadata.Package)
}

function Get-javascript-UpdatedDocsMsToc($toc) {
  $services = $toc[0].items
  for ($i = 0; $i -lt $services.Count; $i++) {

    # Add "Plugin" docs to Identity. Packages associated with these entries do
    # not build successfully in the docs CI system becaues they export nothing
    # that the docs CI system can document. This ensures that the readme pages
    # are documented properly even if their packages are not onboarded.
    if ($services[$i].name -eq 'Identity') {
      $services[$i].items += [PSCustomObject]@{
        name  = "Plugins";
        items = @(
          [PSCustomObject]@{
            name            = "Token Cache Persistence";
            href            = "~/docs-ref-services/{moniker}/identity-cache-persistence-readme.md";
            landingPageType = "Service";
          },
          [PSCustomObject]@{
            name            = "VSCode Authentication";
            href            = "~/docs-ref-services/{moniker}/identity-vscode-readme.md";
            landingPageType = "Service";
          }
        )
      }
    }
  }

  # PowerShell outputs a single object if the output is an array with only one
  # object. The preceeding comma ensures that the output remains an array for
  # appropriate export formatting. Other formatting (e.g. `@($toc)`) does not
  # produce useful outputs.
  return , $toc
}
