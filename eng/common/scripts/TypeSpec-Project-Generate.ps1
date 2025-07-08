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

$resolvedProjectDirectory = Resolve-Path $ProjectDirectory
$emitterName = &$GetEmitterNameFn
$typespecConfigurationFile = Resolve-Path "$ProjectDirectory/tsp-location.yaml"

Write-Host "Reading configuration from $typespecConfigurationFile"
$configuration = Get-Content -Path $typespecConfigurationFile -Raw | ConvertFrom-Yaml

$specSubDirectory = $configuration["directory"]
$innerFolder = Split-Path $specSubDirectory -Leaf

$tempFolder = "$ProjectDirectory/TempTypeSpecFiles"
$npmWorkingDir = Resolve-Path $tempFolder/$innerFolder
$mainTypeSpecFile = If (Test-Path "$npmWorkingDir/client.*") { Resolve-Path "$npmWorkingDir/client.*" } Else { Resolve-Path "$npmWorkingDir/main.*"}

try {
    Push-Location $RepoRoot
    #NpmInstallForProject $npmWorkingDir

    if ($LASTEXITCODE) { exit $LASTEXITCODE }    
    $fileGenerateInput = 'generateInput.json';
    $fileGenerateOutput = 'generateOutput.json';
    $outputJsonPath = Join-Path $RepoRoot $fileGenerateOutput
    $inputJsonPath = Join-Path $RepoRoot $fileGenerateInput

    if (-not (Test-Path $inputJsonPath)) {
        Write-Host "##[error]Input file $inputJsonPath does not exist. Please ensure it is generated before running this script."
        exit 1
    }
    
    Write-Host "Running automation_generate.sh $inputJsonPath $outputJsonPath"
    Invoke-LoggedCommand "sh .scripts/automation_generate.sh $inputJsonPath $outputJsonPath"
    if ($LASTEXITCODE) { exit $LASTEXITCODE }
    
    # Check if the output file was generated
    if (-not (Test-Path $outputJsonPath)) {
        Write-Host "##[error]Expected output file $outputJsonPath was not generated"
        exit 1
    }
    
    Write-Host "Parsing generateOutput.json"
    try {
        $generateOutput = Get-Content -Path $outputJsonPath -Raw | ConvertFrom-Json
        Write-Host "Successfully parsed generateOutput.json"
        
        # Validate the structure
        if (-not $generateOutput.packages) {
            Write-Host "##[error]generateOutput.json does not contain 'packages' property"
            exit 1
        }
        
        if ($generateOutput.packages.Count -eq 0) {
            Write-Host "##[warning]No packages found in generateOutput.json"
        } else {
            Write-Host "Found $($generateOutput.packages.Count) package(s) in generateOutput.json"
            
            # Check if all packages succeeded
            $failedPackages = @()
            foreach ($package in $generateOutput.packages) {
                Write-Host "Package: $($package.packageName) v$($package.version) - Result: $($package.result)"
                if ($package.result -ne "succeeded") {
                    $failedPackages += $package.packageName
                }
            }
            
            if ($failedPackages.Count -gt 0) {
                Write-Host "##[error]The following packages failed to generate: $($failedPackages -join ', ')"
                exit 1
            }
            
            Write-Host "All packages generated successfully"
        }
    }
    catch {
        Write-Host "##[error]Failed to parse generateOutput.json: $($_.Exception.Message)"
        exit 1
    }
    
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
}
finally {
    Pop-Location
}

$shouldCleanUp = !$SaveInputs
if ($shouldCleanUp -and (Test-Path $tempFolder)) {
    Remove-Item $tempFolder -Recurse -Force
}
exit 0
