# For details see https://github.com/Azure/azure-sdk-tools/blob/main/doc/common/TypeSpec-Project-Scripts.md

[CmdletBinding()]
param (
    [Parameter(Position=0)]
    [ValidateNotNullOrEmpty()]
    [string] $ProjectDirectory,
    [string] $TypespecAdditionalOptions = $null, ## additional typespec emitter options, separated by semicolon if more than one, e.g. option1=value1;option2=value2
    [switch] $SaveInputs = $false ## saves the temporary files during execution, default false
)

$ErrorActionPreference = "Stop"
. $PSScriptRoot/Helpers/PSModule-Helpers.ps1
. $PSScriptRoot/Helpers/CommandInvocation-Helpers.ps1
. $PSScriptRoot/common.ps1
Install-ModuleIfNotInstalled "powershell-yaml" "0.4.7" | Import-Module

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
    }
    finally {
        Pop-Location
    }
}

$resolvedProjectDirectory = Resolve-Path $ProjectDirectory
$emitterName = &$GetEmitterNameFn
$typespecConfigurationFile = Resolve-Path "$ProjectDirectory/tsp-location.yaml"

Write-Host "Reading configuration from $typespecConfigurationFile"
$configuration = Get-Content -Path $typespecConfigurationFile -Raw | ConvertFrom-Yaml

$specSubDirectory = $configuration["directory"]
$innerFolder = Split-Path $specSubDirectory -Leaf

$tempFolder = "$ProjectDirectory/TempTypeSpecFiles"
Write-Host "TempTypeSpecFiles folder location: $tempFolder"
if (Test-Path $tempFolder) {
    Write-Host "Contents of $tempFolder:"
    Get-ChildItem -Path $tempFolder -Recurse | ForEach-Object {
        $relativePath = $_.FullName.Substring($tempFolder.Length + 1)
        if ($_.PSIsContainer) {
            Write-Host "  [DIR]  $relativePath"
        } else {
            Write-Host "  [FILE] $relativePath ($(($_.Length / 1KB).ToString('F2')) KB)"
        }
    }
} else {
    Write-Host "TempTypeSpecFiles folder does not exist: $tempFolder"
}
$npmWorkingDir = Resolve-Path $tempFolder/$innerFolder
$mainTypeSpecFile = If (Test-Path "$npmWorkingDir/client.*") { Resolve-Path "$npmWorkingDir/client.*" } Else { Resolve-Path "$npmWorkingDir/main.*"}

try {
    Push-Location $npmWorkingDir
    NpmInstallForProject $npmWorkingDir

    if ($LASTEXITCODE) { exit $LASTEXITCODE }

    Write-Host "Creating inputJson file"
    $fileGenerateInput = 'generateInput.json';
    $fileGenerateOutput = 'generateOutput.json';
    $file_content = @{
      "specFolder" = $tempFolder
      "headSha" = $configuration["commit"]
      "repoHttpsUrl" = "https://github.com/$($configuration["repo"])"
      "changedFiles" = @()
      "runMode" = "release"
      "installInstructionInput" = @{
        "isPublic" = $true
        "downloadUrlPrefix" = ""
        "downloadCommandTemplate" = "downloadCommand"
      }
      "relatedTypeSpecProjectFolder" = @()
    }

    $inputJsonPath = Join-Path $tempFolder $fileGenerateInput
    $destJson = $file_content | ConvertTo-Json -Depth 100
    $destJson| Out-File -FilePath $inputJsonPath
    Write-Host $destJson

    $outputJsonPath = Join-Path $tempFolder $fileGenerateOutput
    Write-Host "Setting ENABLE_LEGACY_SETTINGS_MAPPING environment variable"
    $env:ENABLE_LEGACY_SETTINGS_MAPPING = 'true'
    Write-Host "Running automation_generate.sh $inputJsonPath $outputJsonPath"
    Invoke-LoggedCommand "sh $RepoRoot/.scripts/automation_generate.sh $inputJsonPath $outputJsonPath"
    # if (Test-Path "Function:$GetEmitterAdditionalOptionsFn") {
    #     $emitterAdditionalOptions = &$GetEmitterAdditionalOptionsFn $resolvedProjectDirectory
    #     if ($emitterAdditionalOptions.Length -gt 0) {
    #         $emitterAdditionalOptions = " $emitterAdditionalOptions"
    #     }
    # }
    # $typespecCompileCommand = "npx tsp compile $mainTypeSpecFile --emit $emitterName$emitterAdditionalOptions"
    # if ($TypespecAdditionalOptions) {
    #     $options = $TypespecAdditionalOptions.Split(";");
    #     foreach ($option in $options) {
    #         $typespecCompileCommand += " --option $emitterName.$option"
    #     }
    # }

    # if ($SaveInputs) {
    #     $typespecCompileCommand += " --option $emitterName.save-inputs=true"
    # }

    # Write-Host($typespecCompileCommand)
    # Invoke-Expression $typespecCompileCommand

    if ($LASTEXITCODE) { exit $LASTEXITCODE }
}
finally {
    Pop-Location
}

$shouldCleanUp = !$SaveInputs
if ($shouldCleanUp) {
    Remove-Item $tempFolder -Recurse -Force
}
exit 0
