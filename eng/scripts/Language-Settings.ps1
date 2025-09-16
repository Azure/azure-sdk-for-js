$Language = "javascript"
$LanguageShort = "js"
$LanguageDisplayName = "JavaScript"
$PackageRepository = "NPM"
$packagePattern = "*.tgz"
$MetadataUri = "https://raw.githubusercontent.com/Azure/azure-sdk/main/_data/releases/latest/js-packages.csv"
$GithubUri = "https://github.com/Azure/azure-sdk-for-js"
$PackageRepositoryUri = "https://www.npmjs.com/package"
$ReducedDependencyLookup = @{
  'test-utils' = @('@azure-tests/perf-storage-blob')
  'identity'   = @('@azure-tests/perf-storage-blob')
}

. "$PSScriptRoot/docs/Docs-ToC.ps1"
. "$PSScriptRoot/docs/Docs-Onboarding.ps1"

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

function Get-javascript-AdditionalValidationPackagesFromPackageSet {
  param(
    [Parameter(Mandatory = $true)]
    $LocatedPackages,
    [Parameter(Mandatory = $true)]
    $diffObj,
    [Parameter(Mandatory = $true)]
    $AllPkgProps
  )
  $existingPackages = @($LocatedPackages | ForEach-Object { $_.Name })
  $additionalDetectedPackages = @()
  $uniqueResultSet = @()

  # we don't currently have a way to trigger a package that doesn't exist in an artifact set
  # so we can't trigger @azure-tests/perf-storage-blob based on changes to sdk/test-utils/ using any common tooling
  # for now we will handle this in this function.
  foreach ($changedService in $changedServices) {
    if ($ReducedDependencyLookup.ContainsKey($changedService)) {
      $additionalPackages = $ReducedDependencyLookup[$changedService] `
      | ForEach-Object { $me = $_; $AllPkgProps | Where-Object { $_.Name -eq $me } | Select-Object -First 1 }

      # we don't need to worry about duplicates here, we'll handle that later
      $additionalDetectedPackages += $additionalPackages
    }
  }

  foreach ($pkg in $additionalDetectedPackages) {
    $alreadyIncluded = $uniqueResultSet | ForEach-Object { $_.Name }
    if ($existingPackages -notcontains $pkg.Name -and $alreadyIncluded -notcontains $pkg.Name) {
      $pkg.IncludedForValidation = $true
      $uniqueResultSet += $pkg
    }
  }

  Write-Host "Returning additional packages for validation: $($uniqueResultSet.Count)"
  foreach ($pkg in $uniqueResultSet) {
    Write-Host "  - $($pkg.Name)"
  }

  return $uniqueResultSet
}

function Get-javascript-PackageInfoFromRepo ($pkgPath, $serviceDirectory) {
  $projectPath = (Join-Path $pkgPath "package.json")
  $packageProps = @()

  if (-not (Test-Path $projectPath) -and $pkgPath.Contains("perf-test")) {
    $subdirectories = Get-ChildItem -Path $pkgPath -Directory | Where-Object {
      return Test-Path -Path (Join-Path $_.FullName "package.json")
    }

    # Filter subdirectories to those containing a `package.json`
    $projectPaths = $subdirectories | ForEach-Object {
      return Join-Path $_.FullName "package.json"
    }
  }
  else {
    $projectPaths = @($projectPath)
  }

  foreach ($projectPath in $projectPaths) {
    if (Test-Path $projectPath) {
      $projectJson = Get-Content $projectPath | ConvertFrom-Json
      $projectDirectory = Split-Path $projectPath

      $jsStylePkgName = $projectJson.name.Replace("@", "").Replace("/", "-")

      $pkgProp = [PackageProps]::new($projectJson.name, $projectJson.version, $projectDirectory, $serviceDirectory)
      if ($projectJson.psobject.properties.name -contains 'sdk-type') {
        $pkgProp.SdkType = $projectJson.psobject.properties['sdk-type'].value
      }
      else {
        $pkgProp.SdkType = "unknown"
      }
      $pkgProp.IsNewSdk = ($pkgProp.SdkType -eq "client") -or ($pkgProp.SdkType -eq "mgmt")
      $pkgProp.ArtifactName = $jsStylePkgName


      if ($ReducedDependencyLookup.ContainsKey($pkgProp.ServiceDirectory)) {
        $pkgProp.AdditionalValidationPackages = $ReducedDependencyLookup[$pkgProp.ServiceDirectory]
      }

      # the constructor for the package properties object attempts to initialize CI artifacts on instantiation
      # of the class. however, due to the fact that we set the ArtifactName _after_ the constructor is called,
      # we need to call it again here to ensure the CI artifacts are properly initialized
      $pkgProp.InitializeCIArtifacts()

      $packageProps += $pkgProp
    }
  }

  return $packageProps
}

function Get-PackageInfoNameOverride {
  param(
    [Parameter(Mandatory = $true)]
    [PackageProps] $PkgProps
  )
  if ($PkgProps.ArtifactName) {
    return $PkgProps.ArtifactName
  }
  LogError "In Get-PackageInfoNameOverride-PkgProps, PkgProps with name $($PkgProps.Name) did not contain an ArtifactName"
  exit 1
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

function Get-PackageJsonContentFromPackage($package, $workingDirectory) {
  $extractedPackageDir = Join-Path $workingDirectory (Split-Path $package -LeafBase)
  New-Item -Type Directory $extractedPackageDir -Force | Out-Null
  
  Write-Host "tar -xzf $package -C $extractedPackageDir"
  tar -xzf $package -C $extractedPackageDir
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to extract package $package. Please check the package file."
    return $null
  }

  $packageDirectory = Join-Path $extractedPackageDir "package"
  $packageJSONContent = Get-Content (Join-Path $packageDirectory "package.json") | ConvertFrom-Json

  # Add the package property to the json object for consumers
  $packageJSONContent | Add-Member -NotePropertyName "PackageDirectory" -NotePropertyValue $packageDirectory
  $packageJSONContent | Add-Member -NotePropertyName "PackageRootDirectory" -NotePropertyValue $extractedPackageDir

  return $packageJSONContent
}
function NormalizePackageContent($dirName, $version) {
  function ReplaceText($oldText, $newText, $filePath) {
    $content = Get-Content -Path $filePath -Raw
    $newContent = $content -replace $oldText, $newText
    if ($newContent -ne $content) {
      Set-Content -Path $filePath -Value $newContent -NoNewLine
      Write-Verbose "ReplaceText [$oldText] [$newText] [$filePath]"
    }
  }

  foreach ($md in $(Get-ChildItem $dirName -r -i *.md)) {
    ReplaceText "https://github.com/Azure/azure-sdk-for-js/tree/[^/]*" "" $md.Fullname
  }
  foreach ($file in $(Get-ChildItem $dirName -r -i *.js, *.ts, *.json)) {
    ReplaceText $version "VERSION_REMOVED" $file.Fullname
  }
}

function ContainsProductCodeDiff($currentDevPackage, $lastDevPackage, $workingDirectory) {
  $diffFile = Join-Path $workingDirectory "packagechanges.diff"
  git diff --output=$diffFile --exit-code $lastDevPackage $currentDevPackage
  if ($LASTEXITCODE -ne 0) {
    Write-Host "There were changes to the package ($diffFile):"
    Get-Content -Path $diffFile | Out-Host
    $global:LASTEXITCODE = 0 # Reset exit code to 0 so that the script can continue
    return $true
  }
  return $false
}

function HasPackageSourceCodeChanges($package, $workingDirectory) {
  $packageBefore = Get-PackageJsonContentFromPackage -package $package -workingDirectory $workingDirectory
  $name = $packageBefore.name

  if (!$packageBefore.version.Contains("-alpha")) {
    Write-Error "The package $name with version $($packageBefore.version) is not a dev version (i.e. doesn't contain '-alpha') so not going to include in publishing."
    # Return false to indicate no changes so it doesn't get added to the publish set.
    return $false
  }

  $packageAfterName = npm pack $name@dev --pack --pack-destination $workingDirectory 2> $workingDirectory/error.txt
  if ($LastExitCode -ne 0) {
    Get-Content -Path $workingDirectory/error.txt | Out-Host
    Write-Host "Failed to retrieve package $name@dev.. assuming there is source code changes."
    $global:LASTEXITCODE = 0 # Reset exit code to 0 so that the script can continue
    return $true
  }  
  $packageAfter = Get-PackageJsonContentFromPackage -package (Join-Path $workingDirectory $packageAfterName) -workingDirectory $workingDirectory

  if (!$packageAfter -or !$packageBefore -or !(Test-Path $packageBefore.PackageRootDirectory) -or !(Test-Path $packageAfter.PackageRootDirectory)) {
    Write-Host "Failed to retrieve package content for $name@dev or extract the $package content. Assuming there are source code changes."
    return $true
  }

  NormalizePackageContent $packageBefore.PackageRootDirectory $packageBefore.version
  NormalizePackageContent $packageAfter.PackageRootDirectory  $packageAfter.version
    
  $hasChanges = ContainsProductCodeDiff $packageBefore.PackageRootDirectory $packageAfter.PackageRootDirectory $workingDirectory

  return $hasChanges
}

# Parse out package publishing information given a .tgz npm artifact
function Get-javascript-PackageInfoFromPackageFile ($pkg, $workingDirectory) {
  $releaseNotes = ""
  $readmeContent = ""

  $packageJSON = Get-PackageJsonContentFromPackage $pkg $workingDirectory
  $pkgId = $packageJSON.name
  $docsReadMeName = $pkgId -replace "^@azure/" , ""
  $pkgVersion = $packageJSON.version

  $changeLogPath = Join-Path $packageJson.PackageDirectory "CHANGELOG.md"
  if (Test-Path $changeLogPath) {
    $releaseNotes = Get-ChangeLogEntryAsString -ChangeLogLocation $changeLogPath -VersionString $pkgVersion
  }

  $readmePath = Join-Path $packageJson.PackageDirectory "README.md"
  if (Test-Path $readmePath) {
    $readmeContent = Get-Content -Raw $readmePath
  }

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
    LegacyReadMeLocation  = 'docs-ref-services/legacy'
    Suffix                = ''
  }
}

# In the case of NPM packages, the "dev version" produced for the given build
# may not have been published if the code is identical to the code already
# published at the "dev" tag. To prevent using a version which does not exist in
# NPM, use the "dev" tag instead.
function Get-javascript-DocsMsDevLanguageSpecificPackageInfo($packageInfo) {
  if ($packageInfo.DevVersion) {
    try {
      $npmPackageInfo = Invoke-RestMethod -Uri "https://registry.npmjs.com/$($packageInfo.Name)"

      if ($npmPackageInfo.'dist-tags'.dev) {
        Write-Host "Using published version at 'dev' tag: '$($npmPackageInfo.'dist-tags'.dev)'"
        $packageInfo.DevVersion = $npmPackageInfo.'dist-tags'.dev
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
  $artifacts = Get-BlobStorage-Artifacts `
    -blobDirectoryRegex "^javascript/([a-z]*)-(.*)/$" `
    -blobArtifactsReplacement "@`${1}/`${2}" `
    -storageAccountName 'azuresdkdocs' `
    -storageContainerName '$web' `
    -storagePrefix 'javascript/'

  # Build up the artifact to service name mapping for GithubIo toc.
  $tocContent = Get-TocMapping -metadata $metadata -artifacts $artifacts
  # Generate yml/md toc files and build site.
  GenerateDocfxTocContent -tocContent $tocContent -lang "JavaScript" -campaignId "UA-62780441-43"
}

# function is used to auto generate API View
function Find-javascript-Artifacts-For-Apireview($artifactDir, $packageName) {
  $artifactPath = Join-Path $artifactDir $packageName
  if (Test-Path $artifactPath) {
    Write-Host "Searching for *.api.json in path $($artifactPath)"
    $files = @(Get-ChildItem "${artifactPath}" | Where-Object -FilterScript { $_.Name.EndsWith(".api.json") })
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
  Push-Location "$EngDir/tools/eng-package-utils"
  Confirm-NodeInstallation
  npm install
  Push-Location "$EngDir/tools/versioning"
  npm install
  $artifactName = $PackageName.Replace("@", "").Replace("/", "-")
  node ./set-version.js --artifact-name $artifactName --new-version $Version --release-date $ReleaseDate `
    --replace-latest-entry-title $ReplaceLatestEntryTitle --repo-root $RepoRoot
  Pop-Location
}

# PackageName: Pass full package name e.g. @azure/abort-controller
# You can obtain full package name using the 'Get-PkgProperties' function in 'eng\common\scripts\Package-Properties.Ps1'
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

function Update-javascript-GeneratedSdks([string]$PackageDirectoriesFile) {
  $moduleFolders = Get-Content $PackageDirectoriesFile | ConvertFrom-Json

  $directoriesWithErrors = @()

  foreach ($directory in $moduleFolders) {
    $directoryPath = "$RepoRoot/sdk/$directory"

    if (Test-Path "$directoryPath/tsp-location.yaml") {
      Write-Host 'Generating project under folder ' -ForegroundColor Green -NoNewline
      Write-Host "$directory" -ForegroundColor Yellow

      Write-Host "Calling TypeSpec-Project-Sync.ps1 for $directory"
      & $RepoRoot/eng/common/scripts/TypeSpec-Project-Sync.ps1 $directoryPath
      if ($LASTEXITCODE) {
        $directoriesWithErrors += $directory
        continue
      }

      Write-Host "Calling TypeSpec-Project-Generate.ps1 for $directory"
      & $RepoRoot/eng/common/scripts/TypeSpec-Project-Generate.ps1 $directoryPath
      if ($LASTEXITCODE) {
        $directoriesWithErrors += $directory
        continue
      }
    }
    else {
      Write-Host "No tsp-location.yaml found in $directory"
    }
  }

  if ($directoriesWithErrors.Count -gt 0) {
    Write-Host "##[error]Generation errors found in $($directoriesWithErrors.Count) directories:"
    foreach ($directory in $directoriesWithErrors) {
      Write-Host "  $directory"
    }
    exit 1
  }
}
