<#yaml
.SYNOPSIS
Sync TypeSpec defintion and generate SDK for RPs under the input directory and have 'tsp-location.yaml'.

.DESCRIPTION
Sync TypeSpec defintion and generate SDK for RPs under the input directory and have 'tsp-location.yaml'.

If the regenerated code is different from current code, this will tell the files the differences
are in, and exit with a failure status.

.PARAMETER Directory
The directory that will be used to get 'tsp-location.yaml' and generate SDK. One can input service directory like: storage, anomalydetector/azure-ai-anomalydetector.
#>

param(
  [Parameter(Mandatory = $false)]
  [string]$ServiceDirectories
)

$SeparatorBars = "==========================================================================="

function Reset-Repository {
  # Clean up generated code, so that next step will not be affected.
  git reset --hard
  git clean -fd .
}

function Install-typespec-client-generator-cli {
  Write-Host "$SeparatorBars"
  Write-Host "Installing typespec-client-generator-cli"
  Write-Host "npm install -g @azure-tools/typespec-client-generator-cli"
  Write-Host "$SeparatorBars"

  $output = npm install -g @azure-tools/typespec-client-generator-cli | Out-String
  if ($LastExitCode -ne 0) {
    Write-Host "Error installing @azure-tools/typespec-client-generator-cli"
    Write-Host "$output"
    exit 1
  }
}

# Returns true if there's an error, false otherwise
function TypeSpec-Compare-CurrentToCodegeneration {
  param(
    [Parameter(Mandatory=$true)]
    $ServiceDirectory
  )

  $tspYamls = Get-ChildItem -Path $ServiceDirectory -Filter "tsp-location.yaml" -Recurse
  if ($tspYamls.Count -eq 0) {
    Write-Host "$SeparatorBars"
    Write-Host "No TypeSpec files to regenerate for $ServiceDirectory"
    Write-Host "$SeparatorBars"
    return $false
  }

  Write-Host "$SeparatorBars"
  Write-Host "Invoking tsp-client update for tsp-location.yaml files in $ServiceDirectory"
  Write-Host "$SeparatorBars"

  $failedSdk = $null
  foreach ($tspLocationPath in $tspYamls) {
    $sdkPath = (get-item $tspLocationPath).Directory.FullName
    if ($sdkPath.Contains("arm-") -or $sdkPath.EndsWith("-rest"))
    {
      Write-Host "Generate SDK for $sdkPath"
      Push-Location
      Set-Location -Path $sdkPath
      tsp-client update --emitter-options generateMetadata=false| Out-Null
      if ($LastExitCode -ne 0) {
          $failedSdk += $sdkPath
          $failedSdk += " "
      }
      # TODO: anything needed (migration/snippets) before comparison
      Pop-Location
    } else {
      Write-Host "Skipping for $sdkPath"
    }
  }
  if ($failedSdk.Length -gt 0) {
    Write-Host "Code generation failed for following modules: $failedSdk"
    return $true
  }

  Write-Host "$SeparatorBars"
  Write-Host "Verify no diff for TypeSpec generated files in $ServiceDirectory"
  Write-Host "$SeparatorBars"

  # prevent warning related to EOL differences which triggers an exception for some reason
  git -c core.safecrlf=false diff --ignore-space-at-eol --exit-code -- "*.ts" "*.json"

  if ($LastExitCode -ne 0) {
    $status = git status -s | Out-String
    Write-Host "The following files are out of date:"
    Write-Host "$status"
    return $true
  }

  # Delete out TypeSpec temporary folders if they still exist.
  Get-ChildItem -Path $ServiceDirectory -Filter TempTypeSpecFiles -Recurse -Directory | ForEach-Object {
    Remove-Item -Path $_.FullName -Recurse -Force
  }
  return $false
}

$hasError = $false
if ($ServiceDirectories) {
  Install-typespec-client-generator-cli
  foreach ($ServiceDirectory in $ServiceDirectories.Split(',')) {
    $path = "sdk/$ServiceDirectory"
    $result = TypeSpec-Compare-CurrentToCodegeneration $path
    if ($result) {
      $hasError = $true
    }
  }
} else {
  Write-Host "The service directory list was empty for this PR, no TypeSpec files to regenerate"
}
Reset-Repository
if ($hasError) {
  exit 1
}
exit 0
