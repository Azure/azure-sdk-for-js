# For details see https://github.com/Azure/azure-sdk-tools/blob/main/doc/common/TypeSpec-Project-Scripts.md

[CmdletBinding()]
param (
  [Parameter(Position = 0)]
  [ValidateNotNullOrEmpty()]
  [string] $ProjectDirectory,
  [Parameter(Position = 1)]
  [string] $LocalSpecRepoPath
)

$ErrorActionPreference = "Stop"
. $PSScriptRoot/Helpers/PSModule-Helpers.ps1
Install-ModuleIfNotInstalled "powershell-yaml" "0.4.7" | Import-Module
$sparseCheckoutFile = ".git/info/sparse-checkout"

function AddSparseCheckoutPath([string]$subDirectory) {
  if (!(Test-Path $sparseCheckoutFile) -or !((Get-Content $sparseCheckoutFile).Contains($subDirectory))) {
    Write-Output $subDirectory >> .git/info/sparse-checkout
  }
}

function CopySpecToProjectIfNeeded([string]$specCloneRoot, [string]$mainSpecDir, [string]$dest, [string[]]$specAdditionalSubDirectories) {
  $source = Join-Path $specCloneRoot $mainSpecDir
  Copy-Item -Path $source -Destination $dest -Recurse -Force
  Write-Host "Copying spec from $source to $dest"

  foreach ($additionalDir in $specAdditionalSubDirectories) {
    $source = Join-Path $specCloneRoot $additionalDir
    Write-Host "Copying spec from $source to $dest"
    Copy-Item -Path $source -Destination $dest -Recurse -Force
  }
}

function UpdateSparseCheckoutFile([string]$mainSpecDir, [string[]]$specAdditionalSubDirectories) {
  AddSparseCheckoutPath $mainSpecDir
  foreach ($subDir in $specAdditionalSubDirectories) {
    Write-Host "Adding $subDir to sparse checkout"
    AddSparseCheckoutPath $subDir
  }
}

function GetGitRemoteValue([string]$repo) {
  Push-Location $ProjectDirectory
  $result = ""
  try {
    $gitRemotes = (git remote -v)
    foreach ($remote in $gitRemotes) {
      Write-Host "Checking remote $remote"
      if ($remote.StartsWith("origin") -or $remote.StartsWith("main")) {
        if ($remote -match 'https://(.*)?github.com/\S+') {
          $result = "https://github.com/$repo.git"
          break
        }
        elseif ($remote -match "(.*)?git@github.com:\S+") {
          $result = "git@github.com:$repo.git"
          break
        }
        else {
          throw "Unknown git remote format found: $remote"
        }
      }
    }
  }
  finally {
    Pop-Location
  }
  Write-Host "Found git remote $result"
  return $result
}

function InitializeSparseGitClone([string]$repo) {
  git clone --no-checkout --filter=tree:0 $repo .
  if ($LASTEXITCODE) { exit $LASTEXITCODE }
  git sparse-checkout init
  if ($LASTEXITCODE) { exit $LASTEXITCODE }
  Remove-Item $sparseCheckoutFile -Force
}

function GetSpecCloneDir([string]$projectName) {
  Push-Location $ProjectDirectory
  try {
    $root = git rev-parse --show-toplevel
  }
  finally {
    Pop-Location
  }

  $sparseSpecCloneDir = "$root/../sparse-spec/$projectName"
  New-Item $sparseSpecCloneDir -Type Directory -Force | Out-Null
  $createResult = Resolve-Path $sparseSpecCloneDir
  return $createResult
}

function NpmInstallForProject([string]$workingDirectory) {
    Push-Location $workingDirectory
    try {
        $currentDur = Resolve-Path "."
        Write-Host "Generating from $currentDur"

        if (Test-Path "package.json") {
            Write-Host "Removing existing package.json"
            Remove-Item -Path "package.json" -Force
        }

        if (Test-Path ".npmrc") {
            Write-Host "Removing existing .nprc"
            Remove-Item -Path ".npmrc" -Force
        }

        if (Test-Path "node_modules") {
            Write-Host "Removing existing node_modules"
            Remove-Item -Path "node_modules" -Force -Recurse
        }

        if (Test-Path "package-lock.json") {
            Write-Host "Removing existing package-lock.json"
            Remove-Item -Path "package-lock.json" -Force
        }

        $replacementPackageJson = Join-Path $PSScriptRoot "../../emitter-package.json"

        Write-Host("Copying package.json from $replacementPackageJson")
        Copy-Item -Path $replacementPackageJson -Destination "package.json" -Force
        $emitterPackageLock = Join-Path $PSScriptRoot "../../emitter-package-lock.json"
        $usingLockFile = Test-Path $emitterPackageLock

        if ($usingLockFile) {
            Write-Host("Copying package-lock.json from $emitterPackageLock")
            Copy-Item -Path $emitterPackageLock -Destination "package-lock.json" -Force
        }

        if ($usingLockFile) {
            Invoke-LoggedCommand "npm ci" -GroupOutput
        }
        else {
            Invoke-LoggedCommand "npm install" -GroupOutput
        }

        if ($LASTEXITCODE) { exit $LASTEXITCODE }
        #Invoke-LoggedCommand "npm list -g --depth=0 --prefix" -GroupOutput
        #Invoke-LoggedCommand "npm list --depth=0" -GroupOutput
    }
    finally {
        Pop-Location
    }
}

Write-Host "##[group]TypeSpec-Project-Sync"
$typespecConfigurationFile = Resolve-Path "$ProjectDirectory/tsp-location.yaml"
Write-Host "Reading configuration from $typespecConfigurationFile"
$configuration = Get-Content -Path $typespecConfigurationFile -Raw | ConvertFrom-Yaml

$pieces = $typespecConfigurationFile.Path.Replace("\", "/").Split("/")
$projectName = $pieces[$pieces.Count - 2]

$specSubDirectory = $configuration["directory"]

# Check if the specSubDirectory is provided
$isManagementSdk = $specSubDirectory.Contains("/resource-manager/") -or $specSubDirectory.Contains(".Management")
if($isManagementSdk -eq $false) {
  Write-Host "This is not a management SDK, skipping TypeSpec project sync." -ForegroundColor Yellow
  exit 1
}

# use local spec repo if provided
if ($LocalSpecRepoPath) {
  $specCloneDir = $LocalSpecRepoPath
}
elseif ($configuration["repo"] -and $configuration["commit"]) {
  # use sparse clone if repo and commit are provided
  $specCloneDir = GetSpecCloneDir $projectName
  $gitRemoteValue = GetGitRemoteValue $configuration["repo"]

  Write-Host "from tsplocation.yaml 'repo' is:"$configuration["repo"]
  Write-Host "Setting up sparse clone for $projectName at $specCloneDir"

  Push-Location $specCloneDir.Path
  try {
    if (!(Test-Path ".git")) {
      Write-Host "Initializing sparse clone for repo: $gitRemoteValue"
      InitializeSparseGitClone $gitRemoteValue
    }
    Write-Host "Updating sparse checkout file with directory:$specSubDirectory"
    UpdateSparseCheckoutFile $specSubDirectory $configuration["additionalDirectories"]
    $commit = $configuration["commit"]
    Write-Host "git checkout commit: $commit"
    git checkout $configuration["commit"]
    if ($LASTEXITCODE) { exit $LASTEXITCODE }
    NpmInstallForProject $specCloneDir.Path
  }
  finally {
    Pop-Location
  }
}
else {
  # write error if neither local spec repo nor repo and commit are provided
  Write-Error "Must contain both 'repo' and 'commit' in tsp-location.yaml or input 'localSpecRepoPath' parameter."
  exit 1
}

# Safely list the contents of the spec directory
Write-Host "Listing contents of $($specCloneDir.Path):"
if (Test-Path $specCloneDir.Path) {
  Get-ChildItem -Path $specCloneDir.Path -Force | ForEach-Object { Write-Host "  $($_.Name)" }
} else {
  Write-Host "  Directory does not exist"
}

# $tempTypeSpecDir = "$ProjectDirectory/TempTypeSpecFiles"
# New-Item $tempTypeSpecDir -Type Directory -Force | Out-Null
# CopySpecToProjectIfNeeded `
#   -specCloneRoot $specCloneDir `
#   -mainSpecDir $specSubDirectory `
#   -dest $tempTypeSpecDir `
#   -specAdditionalSubDirectories $configuration["additionalDirectories"]

Write-Host "##[endgroup]"

# Look for tspconfig.yaml and main.tsp
$sourcePath = Join-Path $specCloneDir.Path $specSubDirectory
$tspConfigPath = Join-Path $sourcePath "tspconfig.yaml"
$mainTspPath = Join-Path $sourcePath "main.tsp"
if (!(Test-Path $tspConfigPath)) {
  Write-Host "No tspconfig.yaml found at $tspConfigPath"
  exit 1
}
if(!(Test-Path $mainTspPath)) {
  Write-Host "No main.tsp found at $mainTspPath"
  exit 1
}

try {
  $isMgmtPackage = $false
  # Check if it's a management package by looking for "armProviderNamespace" in main.tsp
  $mainTspContent = Get-Content $mainTspPath -Raw
  if ($mainTspContent -match "armProviderNamespace") {
    $isMgmtPackage = $true
    Write-Host "main.tsp contains 'armProviderNamespace', this is a management package" -ForegroundColor Green
  }

  Write-Host "Found tspconfig.yaml at $tspConfigPath"
  $tspConfig = Get-Content $tspConfigPath -Raw | ConvertFrom-Yaml
  
  # Check if it's a modular library
  $isModularLibrary = $null
  if ($tspConfig.options -and 
      $tspConfig.options.'@azure-tools/typespec-ts' -and 
      $tspConfig.options.'@azure-tools/typespec-ts'.'is-modular-library') {
    $isModularLibrary = $tspConfig.options.'@azure-tools/typespec-ts'.'is-modular-library'
    Write-Host "is-modular-library setting found: $isModularLibrary" -ForegroundColor Green
  }  
 
  # Determine if it's a management plane modular client
  if ($isMgmtPackage) {    
      $isManagementPlaneModularClient = if ($null -ne $isModularLibrary) { $isModularLibrary } else { $true }
      Write-Host "This is a management plane modular client (by default for management packages)" -ForegroundColor Cyan
  }
  if ($isModularLibrary -ne $true -and $isMgmtPackage -eq $false) {
    $isManagementPlaneModularClient = $false
    Write-Host "This is not a management plane modular client (is-modular-library is not set to true)" -ForegroundColor Yellow
  }
} catch {
  Write-Host "Failed to parse tspconfig.yaml: $_" -ForegroundColor Yellow
}

if ($isManagementPlaneModularClient -ne $true) {
  Write-Host "Skipping $directory because it is not a management plane modular client" -ForegroundColor Yellow
  exit 1
}

Write-Host "Creating inputJson file"
$fileGenerateInput = 'generateInput.json';

$file_content = @{
  "specFolder" = $specCloneDir.Path
  "headSha" = $configuration["commit"]
  "repoHttpsUrl" = "https://github.com/$($configuration["repo"])"
  "changedFiles" = @()
  "runMode" = "release"
  "installInstructionInput" = @{
    "isPublic" = $true
    "downloadUrlPrefix" = ""
    "downloadCommandTemplate" = "downloadCommand"
  }
  "relatedTypeSpecProjectFolder" = @(
    $configuration["directory"]
  )
}
$inputJsonPath = Join-Path $RepoRoot $fileGenerateInput
$destJson = $file_content | ConvertTo-Json -Depth 10
$destJson| Out-File -FilePath $inputJsonPath
Write-Host $destJson

exit 0
