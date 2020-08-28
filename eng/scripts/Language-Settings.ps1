$Language = "javascript"
$LanguageShort = "js"
$PackageRepository = "NPM"
$packagePattern = "*.tgz"
$MetadataUri = "https://raw.githubusercontent.com/Azure/azure-sdk/master/_data/releases/latest/js-packages.csv"

function Get-javascript-PackageInfoFromRepo ($pkgPath, $serviceDirectory, $pkgName)
{
  $projectPath = Join-Path $pkgPath "package.json"
  if (Test-Path $projectPath)
  {
    $projectJson = Get-Content $projectPath | ConvertFrom-Json
    $jsStylePkgName = $pkgName.replace("azure-", "@azure/")
    if ($projectJson.name -eq "$jsStylePkgName")
    {
      return [PackageProps]::new($projectJson.name, $projectJson.version, $pkgPath, $serviceDirectory)
    }
  }
  return $null
}

# Returns the npm publish status of a package id and version.
function IsNPMPackageVersionPublished ($pkgId, $pkgVersion)
{
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
    Deployable     = $forceCreate -or !(IsNPMPackageVersionPublished -pkgId $pkgId -pkgVersion $pkgVersion)
    ReleaseNotes   = $releaseNotes
    ReadmeContent  = $readmeContent
  }

  return $resultObj
}

# Stage and Upload Docs to blob Storage
function Publish-javascript-GithubIODocs ()
{
  $PublishedDocs = Get-ChildItem "$($DocLocation)/documentation" | Where-Object -FilterScript { $_.Name.EndsWith(".zip") }

  foreach ($Item in $PublishedDocs) 
  {
    $PkgName = "azure-$($Item.BaseName)"
    Write-Host $PkgName
    Expand-Archive -Force -Path "$($DocLocation)/documentation/$($Item.Name)" -DestinationPath "$($DocLocation)/documentation/$($Item.BaseName)"
    $dirList = Get-ChildItem "$($DocLocation)/documentation/$($Item.BaseName)/$($Item.BaseName)" -Attributes Directory

    if ($dirList.Length -eq 1)
    {
      $DocVersion = $dirList[0].Name
      Write-Host "Uploading Doc for $($PkgName) Version:- $($DocVersion)..."
      Upload-Blobs -DocDir "$($DocLocation)/documentation/$($Item.BaseName)/$($Item.BaseName)/$($DocVersion)" -PkgName $PkgName -DocVersion $DocVersion
    }
    else
    {
      Write-Host "found more than 1 folder under the documentation for package - $($Item.Name)"
    }
  }
}
