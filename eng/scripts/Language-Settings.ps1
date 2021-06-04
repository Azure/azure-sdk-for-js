$Language = "javascript"
$LanguageShort = "js"
$LanguageDisplayName = "JavaScript"
$PackageRepository = "NPM"
$packagePattern = "*.tgz"
$MetadataUri = "https://raw.githubusercontent.com/Azure/azure-sdk/master/_data/releases/latest/js-packages.csv"
$BlobStorageUrl = "https://azuresdkdocs.blob.core.windows.net/%24web?restype=container&comp=list&prefix=javascript%2F&delimiter=%2F"

function Confirm-NodeInstallation
{
  if (!(Get-Command npm -ErrorAction SilentlyContinue))
  {
    LogError "Could not locate npm. Install NodeJS (includes npm and npx) https://nodejs.org/en/download"
    exit 1
  }
}

function Get-javascript-PackageInfoFromRepo ($pkgPath, $serviceDirectory)
{
  $projectPath = Join-Path $pkgPath "package.json"
  if (Test-Path $projectPath)
  {
    $projectJson = Get-Content $projectPath | ConvertFrom-Json
    $jsStylePkgName = $projectJson.name.Replace("@", "").Replace("/", "-")

    $pkgProp = [PackageProps]::new($projectJson.name, $projectJson.version, $pkgPath, $serviceDirectory)
    if ($projectJson.psobject.properties.name -contains 'sdk-type') {
      $pkgProp.SdkType = $projectJson.psobject.properties['sdk-type'].value
    }
    else {
      $pkgProp.SdkType = "unknown"
    }
    if ($projectJson.name.StartsWith("@azure/arm"))
    {
      $pkgProp.SdkType = "mgmt"
    }
    $pkgProp.IsNewSdk = $pkgProp.SdkType -eq "client"
    $pkgProp.ArtifactName = $jsStylePkgName
    return $pkgProp
  }
  return $null
}

# Returns the npm publish status of a package id and version.
function IsNPMPackageVersionPublished ($pkgId, $pkgVersion)
{
  Confirm-NodeInstallation
  $npmVersions = (npm show $pkgId versions)
  if ($LastExitCode -ne 0)
  {
    npm ping
    if ($LastExitCode -eq 0)
    {
      return $False
    }
    Write-Host "Could not find a deployed version of $pkgId, and NPM connectivity check failed."
    exit(1)
  }
  $npmVersionList = $npmVersions.split(",") | ForEach-Object { return $_.replace("[", "").replace("]", "").Trim() }
  return $npmVersionList.Contains($pkgVersion)
}

# make certain to always take the package json closest to the top
function ResolvePkgJson($workFolder)
{
  $pathsWithComplexity = @()
  foreach ($file in (Get-ChildItem -Path $workFolder -Recurse -Include "package.json"))
  {
    $complexity = ($file.FullName -Split { $_ -eq "/" -or $_ -eq "\" }).Length
    $pathsWithComplexity += New-Object PSObject -Property @{
      Path       = $file
      Complexity = $complexity
    }
  }

  return ($pathsWithComplexity | Sort-Object -Property Complexity)[0].Path
}

# Parse out package publishing information given a .tgz npm artifact
function Get-javascript-PackageInfoFromPackageFile ($pkg, $workingDirectory)
{
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
  if ($changeLogLoc)
  {
    $releaseNotes = Get-ChangeLogEntryAsString -ChangeLogLocation $changeLogLoc -VersionString $pkgVersion
  }

  $readmeContentLoc = @(Get-ChildItem -Path $workFolder -Recurse -Include "README.md") | Select-Object -Last 1
  if ($readmeContentLoc)
  {
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
  New-Object PSObject -Property @{ 
    DocsMsReadMeName = $PackageInfo.Name -replace "^@azure/" , ""
    LatestReadMeLocation = 'docs-ref-services/latest'
    PreviewReadMeLocation = 'docs-ref-services/preview'
    Suffix = ''
  }
}

# Stage and Upload Docs to blob Storage
function Publish-javascript-GithubIODocs ($DocLocation, $PublicArtifactLocation)
{
  $PublishedDocs = Get-ChildItem "$($DocLocation)/documentation" | Where-Object -FilterScript { $_.Name.EndsWith(".zip") }

  foreach ($Item in $PublishedDocs)
  {
    Expand-Archive -Force -Path "$($DocLocation)/documentation/$($Item.Name)" -DestinationPath "$($DocLocation)/documentation/$($Item.BaseName)"
    $dirList = Get-ChildItem "$($DocLocation)/documentation/$($Item.BaseName)/$($Item.BaseName)" -Attributes Directory

    if ($dirList.Length -eq 1)
    {
      $DocVersion = $dirList[0].Name
      $pkgs = Get-ChildItem -Path $PublicArtifactLocation -Include "*.tgz" -Recurse -File
      # set default package name
      $PkgName = "azure-$($Item.BaseName)"
      if ($pkgs -and $pkgs.Count -eq 1)
      {
        $parsedPackage = Get-javascript-PackageInfoFromPackageFile $pkgs[0] $PublicArtifactLocation
        $PkgName = $parsedPackage.PackageId.Replace("@", "").Replace("/", "-")
      }
      else
      {
        Write-Host "Package info is not available from artifact. Assuming package is in default scope @azure."
      }
      Write-Host "Uploading Doc for $($PkgName) Version:- $($DocVersion)..."
      $releaseTag = RetrieveReleaseTag $PublicArtifactLocation
      Upload-Blobs -DocDir "$($DocLocation)/documentation/$($Item.BaseName)/$($Item.BaseName)/$($DocVersion)" -PkgName $PkgName -DocVersion $DocVersion -ReleaseTag $releaseTag
    }
    else
    {
      Write-Host "found more than 1 folder under the documentation for package - $($Item.Name)"
    }
  }
}

function Get-javascript-GithubIoDocIndex()
{
  # Update the main.js and docfx.json language content
  UpdateDocIndexFiles -appTitleLang JavaScript -packageRegex "/\@(.*)\//i" -regexReplacement "`$1-"
  # Fetch out all package metadata from csv file.
  $metadata = Get-CSVMetadata -MetadataUri $MetadataUri
  # Get the artifacts name from blob storage
  $artifacts = Get-BlobStorage-Artifacts -blobStorageUrl $BlobStorageUrl -blobDirectoryRegex "^javascript/([a-z]*)-(.*)/$" -blobArtifactsReplacement "@`${1}/`${2}"
  # Build up the artifact to service name mapping for GithubIo toc.
  $tocContent = Get-TocMapping -metadata $metadata -artifacts $artifacts
  # Generate yml/md toc files and build site.
  GenerateDocfxTocContent -tocContent $tocContent -lang "JavaScript"
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

function Update-javascript-DocsMsPackages($DocsRepoLocation, $DocsMetadata) {
  UpdateDocsMsPackages `
    (Join-Path $DocsRepoLocation 'ci-configs/packages-preview.json') `
    'preview' `
    $DocsMetadata 

  UpdateDocsMsPackages `
    (Join-Path $DocsRepoLocation 'ci-configs/packages-latest.json') `
    'latest' `
    $DocsMetadata
}

function UpdateDocsMsPackages($DocConfigFile, $Mode, $DocsMetadata) {
  Write-Host "Updating configuration: $DocConfigFile with mode: $Mode"
  $packageConfig = Get-Content $DocConfigFile -Raw | ConvertFrom-Json

  $outputPackages = @()
  foreach ($package in $packageConfig.npm_package_sources) {
    # If Get-PackageNameFromDocsMsConfig cannot find the package name, keep the
    # entry but do no additional processing on it.
    if (!(Get-PackageNameFromDocsMsConfig $package.name)) {
      LogWarning "Package name is not valid: ($($package.name)). Keeping entry in docs config but not updating."
      $outputPackages += $package
      continue
    }

    # Do not filter by GA/Preview status because we want differentiate between
    # tracked and non-tracked packages
    $matchingPublishedPackageArray = $DocsMetadata.Where({ $_.Package -eq (Get-PackageNameFromDocsMsConfig $package.name) })

    # If this package does not match any published packages keep it in the list.
    # This handles packages which are not tracked in metadata but still need to
    # be built in Docs CI.
    if ($matchingPublishedPackageArray.Count -eq 0) {
      Write-Host "Keep non-tracked preview package: $($package.name)"
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
  } else { 
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

  $packageConfig.npm_package_sources = $outputPackages
  $packageConfig | ConvertTo-Json -Depth 100 | Set-Content $DocConfigFile
}

# function is used to auto generate API View
function Find-javascript-Artifacts-For-Apireview($artifactDir, $packageName = "")
{
  # Find api.json file in service temp directory
  [regex]$pattern = "azure-"
  $pkgName = $pattern.replace($packageName, "", 1)
  $packageDir = Join-Path $artifactDir $pkgName "temp"
  if (Test-Path $packageDir)
  {
    Write-Host "Searching for *.api.json in path $($packageDir)"
    $files = Get-ChildItem "${packageDir}" | Where-Object -FilterScript { $_.Name.EndsWith(".api.json") }
    if (!$files)
    {
      Write-Host "$($packageDir) does not have api review json for package"
      Write-Host "API Extractor must be enabled for $($packageName). Please ensure api-extractor.json is present in package directory and api extract script included in build script"
      return $null
    }
    elseif ($files.Count -ne 1)
    {
      Write-Host "$($packageDir) should contain only one api review for $($packageName)"
      Write-Host "No of Packages $($files.Count)"
      return $null
    }
  }
  else
  {
    Write-Host "$($pkgName) does not have api review json"
    return $null
  }  

  $packages = @{
    $files[0].Name = $files[0].FullName
  }
  return $packages
}

function SetPackageVersion ($PackageName, $Version, $ReleaseDate)
{
  if ($null -eq $ReleaseDate)
  {
    $ReleaseDate = Get-Date -Format "yyyy-MM-dd"
  }
  Push-Location "$EngDir/tools/versioning"
  Confirm-NodeInstallation
  npm install
  $artifactName = $PackageName.Replace("@", "").Replace("/", "-")
  node ./set-version.js --artifact-name $artifactName --new-version $Version --release-date $ReleaseDate --repo-root $RepoRoot
  Pop-Location
}

# PackageName: Pass full package name e.g. @azure/abort-controller
# You can obtain full pacakge name using the 'Get-PkgProperties' function in 'eng\common\scripts\Package-Properties.Ps1'
function GetExistingPackageVersions ($PackageName, $GroupId = $null)
{
  try
  {
    $existingVersion = Invoke-RestMethod -Method GET -Uri "http://registry.npmjs.com/${PackageName}"
    return ($existingVersion.versions | Get-Member -MemberType NoteProperty).Name
  }
  catch
  {
    LogError "Failed to retrieve package versions. `n$_"
    return $null
  }
}
