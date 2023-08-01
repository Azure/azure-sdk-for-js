$Language = "javascript"
$LanguageShort = "js"
$LanguageDisplayName = "JavaScript"
$PackageRepository = "NPM"
$packagePattern = "*.tgz"
$MetadataUri = "https://raw.githubusercontent.com/Azure/azure-sdk/main/_data/releases/latest/js-packages.csv"
$BlobStorageUrl = "https://azuresdkdocs.blob.core.windows.net/%24web?restype=container&comp=list&prefix=javascript%2F&delimiter=%2F"
$GithubUri = "https://github.com/Azure/azure-sdk-for-js"
$PackageRepositoryUri = "https://www.npmjs.com/package"

. "$PSScriptRoot/docs/Docs-ToC.ps1"

function Confirm-NodeInstallation {
  if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    LogError "Could not locate npm. Install NodeJS (includes npm and npx) https://nodejs.org/en/download"
    exit 1
  }
}

function Get-javascript-EmitterName() {
  return "@azure-tools/typespec-ts"
}

function Get-javascript-EmitterAdditionalOptions([string]$projectDirectory) {
  return "--option @azure-tools/typespec-ts.emitter-output-dir=$projectDirectory/"
}

function Get-javascript-PackageInfoFromRepo ($pkgPath, $serviceDirectory) {
  $projectPath = Join-Path $pkgPath "package.json"
  if (Test-Path $projectPath) {
    $projectJson = Get-Content $projectPath | ConvertFrom-Json
    $jsStylePkgName = $projectJson.name.Replace("@", "").Replace("/", "-")

    $pkgProp = [PackageProps]::new($projectJson.name, $projectJson.version, $pkgPath, $serviceDirectory)
    if ($projectJson.psobject.properties.name -contains 'sdk-type') {
      $pkgProp.SdkType = $projectJson.psobject.properties['sdk-type'].value
    }
    else {
      $pkgProp.SdkType = "unknown"
    }
    $pkgProp.IsNewSdk = ($pkgProp.SdkType -eq "client") -or ($pkgProp.SdkType -eq "mgmt")
    $pkgProp.ArtifactName = $jsStylePkgName
    return $pkgProp
  }
  return $null
}

# Returns the npm publish status of a package id and version.
function IsNPMPackageVersionPublished ($pkgId, $pkgVersion) {
  Confirm-NodeInstallation
  $packageAndVersion = $pkgId + "@" + $pkgVersion
  $npmVersion = (npm show $packageAndVersion version)
  if ($LastExitCode -ne 0) {
    npm ping
    if ($LastExitCode -eq 0) {
      return $False
    }
    Write-Host "Could not find a deployed version of $pkgId, and NPM connectivity check failed."
    exit(1)
  }
  return $npmVersion -eq $pkgVersion
}

# make certain to always take the package json closest to the top
function ResolvePkgJson($workFolder) {
  $pathsWithComplexity = @()
  foreach ($file in (Get-ChildItem -Path $workFolder -Recurse -Include "package.json")) {
    $complexity = ($file.FullName -Split { $_ -eq "/" -or $_ -eq "\" }).Length
    $pathsWithComplexity += New-Object PSObject -Property @{
      Path       = $file
      Complexity = $complexity
    }
  }

  return ($pathsWithComplexity | Sort-Object -Property Complexity)[0].Path
}

# Parse out package publishing information given a .tgz npm artifact
function Get-javascript-PackageInfoFromPackageFile ($pkg, $workingDirectory) {
  $workFolder = "$workingDirectory$($pkg.Basename)"
  $origFolder = Get-Location
  $releaseNotes = ""
  $readmeContent = ""

  New-Item -ItemType Directory -Force -Path $workFolder
  Set-Location $workFolder

  tar -xzf $pkg

  $packageJSON = ResolvePkgJson -workFolder $workFolder | Get-Content | ConvertFrom-Json
  $pkgId = $packageJSON.name
  $docsReadMeName = $pkgId -replace "^@azure/" , ""
  $pkgVersion = $packageJSON.version

  $changeLogLoc = @(Get-ChildItem -Path $workFolder -Recurse -Include "CHANGELOG.md")[0]
  if ($changeLogLoc) {
    $releaseNotes = Get-ChangeLogEntryAsString -ChangeLogLocation $changeLogLoc -VersionString $pkgVersion
  }

  $readmeContentLoc = @(Get-ChildItem -Path $workFolder -Recurse -Include "README.md") | Select-Object -Last 1
  if ($readmeContentLoc) {
    $readmeContent = Get-Content -Raw $readmeContentLoc
  }

  Set-Location $origFolder
  Remove-Item $workFolder -Force -Recurse -ErrorAction SilentlyContinue

  $resultObj = New-Object PSObject -Property @{
    PackageId      = $pkgId
    PackageVersion = $pkgVersion
    ReleaseTag     = "$($pkgId)_$($pkgVersion)"
    Deployable     = $forceCreate -or !(IsNPMPackageVersionPublished -pkgId $pkgId -pkgVersion $pkgVersion)
    ReleaseNotes   = $releaseNotes
    ReadmeContent  = $readmeContent
    DocsReadMeName = $docsReadMeName
  }

  return $resultObj
}

function Get-javascript-DocsMsMetadataForPackage($PackageInfo) { 
  $docsReadmeName = "" 
  if ($PackageInfo.DirectoryPath) { 
    $docsReadmeName = Split-Path -Path $PackageInfo.DirectoryPath -Leaf
  }
  Write-Host "Docs.ms Readme name: $($docsReadmeName)"
  New-Object PSObject -Property @{ 
    DocsMsReadMeName      = $docsReadmeName
    LatestReadMeLocation  = 'docs-ref-services/latest'
    PreviewReadMeLocation = 'docs-ref-services/preview'
    Suffix                = ''
  }
}

# In the case of NPM packages, the "dev version" produced for the given build
# may not have been published if the code is identical to the code already 
# published at the "dev" tag. To prevent using a version which does not exist in 
# NPM, use the "dev" tag instead.
function Get-javascript-DocsMsDevLanguageSpecificPackageInfo($packageInfo) {
  try {
    $npmPackageInfo = Invoke-RestMethod -Uri "https://registry.npmjs.com/$($packageInfo.Name)"

    if ($npmPackageInfo.'dist-tags'.dev) {
      Write-Host "Using published version at 'dev' tag: '$($npmPackageInfo.'dist-tags'.dev)'"
      $packageInfo.Version = $npmPackageInfo.'dist-tags'.dev
    }
    else {
      LogWarning "No 'dev' dist-tag available for '$($packageInfo.Name)'. Keeping current version '$($packageInfo.Version)'"
    }
  }
  catch {
    LogWarning "Error getting package info from NPM for $($packageInfo.Name)"
    LogWarning $_.Exception
    LogWarning $_.Exception.StackTrace
  }

  return $packageInfo
}

# Stage and Upload Docs to blob Storage
function Publish-javascript-GithubIODocs ($DocLocation, $PublicArtifactLocation) {
  $PublishedDocs = Get-ChildItem "$($DocLocation)/documentation" | Where-Object -FilterScript { $_.Name.EndsWith(".zip") }

  foreach ($Item in $PublishedDocs) {
    Expand-Archive -Force -Path "$($DocLocation)/documentation/$($Item.Name)" -DestinationPath "$($DocLocation)/documentation/$($Item.BaseName)"
    $dirList = Get-ChildItem "$($DocLocation)/documentation/$($Item.BaseName)/$($Item.BaseName)" -Attributes Directory

    if ($dirList.Length -eq 1) {
      $DocVersion = $dirList[0].Name
      $pkgs = Get-ChildItem -Path $PublicArtifactLocation -Include "*.tgz" -Recurse -File
      # set default package name
      $PkgName = "azure-$($Item.BaseName)"
      if ($pkgs -and $pkgs.Count -eq 1) {
        $parsedPackage = Get-javascript-PackageInfoFromPackageFile $pkgs[0] $PublicArtifactLocation
        $PkgName = $parsedPackage.PackageId.Replace("@", "").Replace("/", "-")
      }
      else {
        Write-Host "Package info is not available from artifact. Assuming package is in default scope @azure."
      }
      Write-Host "Uploading Doc for $($PkgName) Version:- $($DocVersion)..."
      $releaseTag = RetrieveReleaseTag $PublicArtifactLocation
      Upload-Blobs -DocDir "$($DocLocation)/documentation/$($Item.BaseName)/$($Item.BaseName)/$($DocVersion)" -PkgName $PkgName -DocVersion $DocVersion -ReleaseTag $releaseTag
    }
    else {
      Write-Host "found more than 1 folder under the documentation for package - $($Item.Name)"
    }
  }
}

function Get-javascript-GithubIoDocIndex() {
  # Update the main.js and docfx.json language content
  UpdateDocIndexFiles -appTitleLang JavaScript -packageRegex "/\@(.*)\//i" -regexReplacement "`$1-"
  # Fetch out all package metadata from csv file.
  $metadata = Get-CSVMetadata -MetadataUri $MetadataUri
  # Get the artifacts name from blob storage
  $artifacts = Get-BlobStorage-Artifacts -blobStorageUrl $BlobStorageUrl -blobDirectoryRegex "^javascript/([a-z]*)-(.*)/$" -blobArtifactsReplacement "@`${1}/`${2}"
  # Build up the artifact to service name mapping for GithubIo toc.
  $tocContent = Get-TocMapping -metadata $metadata -artifacts $artifacts
  # Generate yml/md toc files and build site.
  GenerateDocfxTocContent -tocContent $tocContent -lang "JavaScript" -campaignId "UA-62780441-43"
}

# "@azure/package-name@1.2.3" -> "@azure/package-name"
function Get-PackageNameFromDocsMsConfig($DocsConfigName) { 
  if ($DocsConfigName -match '^(?<pkgName>.+?)(?<pkgVersion>@.+)?$') { 
    return $Matches['pkgName']
  }
  LogWarning "Could not find package name in ($DocsConfigName)"
  return ''
}

# Given the name of a package (possibly of the form "@azure/package-name@1.2.3")
# return a package name with the version specified in $packageVersion
# "@azure/package-name@1.2.3" "1.3.0" -> "@azure/package-name@1.3.0"
function Get-DocsMsPackageName($packageName, $packageVersion) { 
  return "$(Get-PackageNameFromDocsMsConfig $packageName)@$packageVersion"
}


# Performs package validation for a list of packages provided in the doc 
# onboarding format ("name" is the only required field): 
# @{
#   name = "@azure/attestation@dev";
#   folder = "./types";
#   registry = "<url>";
#   ...
# }
function ValidatePackagesForDocs($packages, $DocValidationImageId) {
  # Using GetTempPath because it works on linux and windows
  $tempDirectory = Join-Path ([System.IO.Path]::GetTempPath()) ([System.IO.Path]::GetRandomFileName())
  New-Item -ItemType Directory -Force -Path $tempDirectory | Out-Null

  $scriptRoot = $PSScriptRoot
  # Run this in parallel as each step takes a long time to run
  $validationOutput = $packages | ForEach-Object { [PSCustomObject]$_ } | Foreach-Object -Parallel {
    # Get value for variables outside of the Foreach-Object scope
    $scriptRoot = "$using:scriptRoot"
    $workingDirectory = "$using:tempDirectory"
    Write-Host "`"$scriptRoot\validate-docs-package.ps1`" -Package $_ -DocValidationImageId `"$($using:DocValidationImageId)`" -WorkingDirectory $workingDirectory"
    return ."$scriptRoot\validate-docs-package.ps1" -Package $_ -DocValidationImageId "$using:DocValidationImageId" -WorkingDirectory $workingDirectory 
  }

  # Clean up temp folder
  Remove-Item -Path $tempDirectory -Force -Recurse -ErrorAction Ignore | Out-Null

  return $validationOutput
}

$PackageExclusions = @{
  '@azure/identity-vscode'            = 'Fails type2docfx execution https://github.com/Azure/azure-sdk-for-js/issues/16303';
  '@azure/identity-cache-persistence' = 'Fails typedoc2fx execution https://github.com/Azure/azure-sdk-for-js/issues/16310';
}

function Update-javascript-DocsMsPackages($DocsRepoLocation, $DocsMetadata, $DocValidationImageId) {
  Write-Host "Excluded packages:"
  foreach ($excludedPackage in $PackageExclusions.Keys) {
    Write-Host "  $excludedPackage - $($PackageExclusions[$excludedPackage])"
  }

  $FilteredMetadata = $DocsMetadata.Where({ !($PackageExclusions.ContainsKey($_.Package)) })

  UpdateDocsMsPackages `
  (Join-Path $DocsRepoLocation 'ci-configs/packages-preview.json') `
    'preview' `
    $FilteredMetadata `
  (Join-Path $DocsRepoLocation 'ci-configs/packages-preview.json.log') `
    $DocValidationImageId
  
  UpdateDocsMsPackages `
  (Join-Path $DocsRepoLocation 'ci-configs/packages-latest.json') `
    'latest' `
    $FilteredMetadata `
  (Join-Path $DocsRepoLocation 'ci-configs/packages-latest.json.log') `
    $DocValidationImageId
}

function UpdateDocsMsPackages($DocConfigFile, $Mode, $DocsMetadata, $PackageHistoryLogFile, $DocValidationImageId) {
  Write-Host "Updating configuration: $DocConfigFile with mode: $Mode"
  $packageConfig = Get-Content $DocConfigFile -Raw | ConvertFrom-Json

  $outputPackages = @()
  foreach ($package in $packageConfig.npm_package_sources) {
    $packageName = Get-PackageNameFromDocsMsConfig $package.name
    # If Get-PackageNameFromDocsMsConfig cannot find the package name, keep the
    # entry but do no additional processing on it.
    if (!$packageName) {
      LogWarning "Package name is not valid: ($($package.name)). Keeping entry in docs config but not updating."
      $outputPackages += $package
      continue
    }

    # Do not filter by GA/Preview status because we want differentiate between
    # tracked and non-tracked packages
    $matchingPublishedPackageArray = $DocsMetadata.Where( { $_.Package -eq $packageName })

    # If this package does not match any published packages keep it in the list.
    # This handles packages which are not tracked in metadata but still need to
    # be built in Docs CI.
    if ($matchingPublishedPackageArray.Count -eq 0) {
      Write-Host "Keep non-tracked package: $($package.name)"
      $outputPackages += $package
      continue
    }

    if ($matchingPublishedPackageArray.Count -gt 1) { 
      LogWarning "Found more than one matching published package in metadata for $(package.name); only updating first entry"
    }
    $matchingPublishedPackage = $matchingPublishedPackageArray[0]

    if ($Mode -eq 'preview' -and !$matchingPublishedPackage.VersionPreview.Trim()) { 
      # If we are in preview mode and the package does not have a superseding
      # preview version, remove the package from the list. 
      Write-Host "Remove superseded preview package: $($package.name)"
      continue
    }

    $packageVersion = $matchingPublishedPackage.VersionGA
    if ($Mode -eq 'preview') {
      $packageVersion = $matchingPublishedPackage.VersionPreview
    }

    # Package name comes in the form "<package-name>@<version>". The version may 
    # have changed. This parses the name of the package from the input and 
    # appends the version specified in the metadata.
    # Mutate the package name because there may be other properties of the
    # package which are not accounted for in this code (e.g. "folder" in JS 
    # packages)
    $package.name = Get-DocsMsPackageName $package.name $packageVersion
    Write-Host "Keep tracked package: $($package.name)"
    $outputPackages += $package
  }

  $outputPackagesHash = @{}
  foreach ($package in $outputPackages) {
    $outputPackagesHash[(Get-PackageNameFromDocsMsConfig $package.name)] = $true
  }

  $remainingPackages = @() 
  if ($Mode -eq 'preview') { 
    $remainingPackages = $DocsMetadata.Where({
        $_.VersionPreview.Trim() -and !$outputPackagesHash.ContainsKey($_.Package)
      })
  }
  else {
    $remainingPackages = $DocsMetadata.Where({
        $_.VersionGA.Trim() -and !$outputPackagesHash.ContainsKey($_.Package)
      })
  }

  # Add packages that exist in the metadata but are not onboarded in docs config
  foreach ($package in $remainingPackages) {
    # If Get-PackageNameFromDocsMsConfig cannot find the package name, skip
    # adding it to the packages
    if (!(Get-PackageNameFromDocsMsConfig $package.Package)) {
      LogWarning "Package name not valid: ($($package.Package)). Skipping adding from metadata to docs config"
      continue
    }


    $packageVersion = $package.VersionGA
    if ($Mode -eq 'preview') {
      $packageVersion = $package.VersionPreview
    }
    $packageName = Get-DocsMsPackageName $package.Package $packageVersion
    Write-Host "Add new package from metadata: $packageName"
    $outputPackages += @{ name = $packageName }
  }

  $packageValidation = ValidatePackagesForDocs $outputPackages $DocValidationImageId
  $validationHash = @{}
  foreach ($result in $packageValidation) {
    $validationHash[$result.Package.name] = $result
  }

  # Remove invalid packages
  $finalOutput = @()
  foreach ($package in $outputPackages) {
    if (!$validationHash[$package.name].Success) {
      LogWarning "Removing invalid package: $($package.name)"

      # If a package is removed create log entry for the removal
      Add-Content `
        -Path $PackageHistoryLogFile `
        -Value @"
Removed $($package.name) because of docs package validation failure on $(Get-Date -Format 'yyyy-MM-dd HH:mm K')
`t$($validationHash[$package.name].Output -join "`n`t")
"@
      continue
    }

    $finalOutput += $package
  }

  $packageConfig.npm_package_sources = $finalOutput
  $packageConfig | ConvertTo-Json -Depth 100 | Set-Content $DocConfigFile
  Write-Host "Onboarding configuration written to: $DocConfigFile"
}

# function is used to auto generate API View
function Find-javascript-Artifacts-For-Apireview($artifactDir, $packageName) {
  $artifactPath = Join-Path $artifactDir $packageName
  if (Test-Path $artifactPath) {
    Write-Host "Searching for *.api.json in path $($artifactPath)"
    $files = Get-ChildItem "${artifactPath}" | Where-Object -FilterScript { $_.Name.EndsWith(".api.json") }
    if (!$files) {
      Write-Host "$($packageName) does not have api review json"
      Write-Host "API Extractor must be enabled for $($packageName). Please ensure api-extractor.json is present in package directory and api extract script included in build script"
      return $null
    }
    elseif ($files.Count -ne 1) {
      Write-Host "$($artifactPath) should contain only one api review for $($packageName)"
      Write-Host "No of files $($files.Count)"
      return $null
    }
  }
  else {
    Write-Host "$($pkgName) does not have api review json"
    return $null
  } 
  $packages = @{
    $files[0].Name = $files[0].FullName
  }
  return $packages
}

function SetPackageVersion ($PackageName, $Version, $ReleaseDate, $ReplaceLatestEntryTitle = $true) {
  if ($null -eq $ReleaseDate) {
    $ReleaseDate = Get-Date -Format "yyyy-MM-dd"
  }
  Push-Location "$EngDir/tools/versioning"
  Confirm-NodeInstallation
  npm install
  $artifactName = $PackageName.Replace("@", "").Replace("/", "-")
  node ./set-version.js --artifact-name $artifactName --new-version $Version --release-date $ReleaseDate `
    --replace-latest-entry-title $ReplaceLatestEntryTitle --repo-root $RepoRoot
  Pop-Location
}

# PackageName: Pass full package name e.g. @azure/abort-controller
# You can obtain full pacakge name using the 'Get-PkgProperties' function in 'eng\common\scripts\Package-Properties.Ps1'
function GetExistingPackageVersions ($PackageName, $GroupId = $null) {
  try {
    $existingVersion = Invoke-RestMethod -Method GET -Uri "http://registry.npmjs.com/${PackageName}"
    return ($existingVersion.versions | Get-Member -MemberType NoteProperty).Name
  }
  catch {
    if ($_.Exception.Response.StatusCode -ne 404) {
      LogError "Failed to retrieve package versions for ${PackageName}. $($_.Exception.Message)"
    }
    return $null
  }
}

# Defined in common.ps1 as:
# $ValidateDocsMsPackagesFn = "Validate-${Language}-DocMsPackages" 
function Validate-javascript-DocMsPackages ($PackageInfo, $PackageInfos, $DocRepoLocation, $DocValidationImageId) { 
  if (!$PackageInfos) {
    $PackageInfos = @($PackageInfo)
  }

  $outputPackages = @()

  foreach ($packageInfo in $PackageInfos) {
    $fileLocation = ""
    if ($packageInfo.DevVersion -or $packageInfo.Version -contains "beta") {
      $fileLocation = (Join-Path $DocRepoLocation 'ci-configs/packages-preview.json')
      if ($packageInfo.DevVersion) {
        $packageInfo.Version = $packageInfo.DevVersion
      }
    }
    else {
      $fileLocation = (Join-Path $DocRepoLocation 'ci-configs/packages-latest.json')
    }

    $packageConfig = Get-Content $fileLocation -Raw | ConvertFrom-Json
    
    $outputPackage = $packageInfo
    
    foreach ($package in $packageConfig.npm_package_sources) {
      if ($package.name -eq $packageInfo.Name) {
        $outputPackage = $package
        $outputPackage.name = Get-DocsMsPackageName $package.name $packageInfo.Version
        break
      }
    }

    $outputPackages += $outputPackage
  }

  $validationResults = ValidatePackagesForDocs `
    -packages $outputPackages `
    -DocValidationImageId $DocValidationImageId

  foreach ($result in $validationResults) { 
    if (!$result.Success) { 
      return $false
    }
  }

  return $true
}
