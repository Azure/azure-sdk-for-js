# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

[CmdletBinding(DefaultParameterSetName = "Audit", SupportsShouldProcess = $true, ConfirmImpact = "High")]
param(
  [Parameter(Mandatory = $true, ParameterSetName = "Disable")]
  [ValidateRange(1, 2147483647)]
  [int]$DisableDefinitionId,

  [Parameter(Mandatory = $true, ParameterSetName = "Disable")]
  [ValidateNotNullOrEmpty()]
  [string]$ExpectedYamlPath
)

$ErrorActionPreference = "Stop"

$organization = "https://dev.azure.com/azure-sdk"
$project = "internal"
$repository = "Azure/azure-sdk-for-js"
$sourceRef = "origin/main"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "../..")).Path

function ConvertTo-NormalizedYamlPath {
  param([string]$Path)

  if ([string]::IsNullOrWhiteSpace($Path)) {
    return ""
  }

  return $Path.Replace("\", "/").TrimStart("/")
}

function Invoke-NativeCommand {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Command,

    [Parameter(Mandatory = $true)]
    [string[]]$ArgumentList
  )

  $output = @(& $Command @ArgumentList)
  if ($LASTEXITCODE -ne 0) {
    throw "Command failed with exit code ${LASTEXITCODE}: $Command $($ArgumentList -join ' ')"
  }

  return $output
}

function Invoke-AzJson {
  param([string[]]$ArgumentList)

  $output = @(Invoke-NativeCommand -Command "az" -ArgumentList $ArgumentList)
  $json = $output -join [Environment]::NewLine
  if ([string]::IsNullOrWhiteSpace($json)) {
    throw "Azure CLI returned no JSON output."
  }

  return $json | ConvertFrom-Json
}

function Update-OriginMain {
  Invoke-NativeCommand `
    -Command "git" `
    -ArgumentList @(
      "-C", $repoRoot,
      "fetch", "--quiet", "origin",
      "+refs/heads/main:refs/remotes/origin/main"
    ) | Out-Null

  Invoke-NativeCommand `
    -Command "git" `
    -ArgumentList @("-C", $repoRoot, "rev-parse", "--verify", "${sourceRef}^{commit}") |
    Out-Null
}

function Get-CiPathsAtSourceRef {
  $paths = @(
    Invoke-NativeCommand `
      -Command "git" `
      -ArgumentList @("-C", $repoRoot, "ls-tree", "-r", "--name-only", $sourceRef)
  )

  return @(
    $paths |
      ForEach-Object { ConvertTo-NormalizedYamlPath $_ } |
      Where-Object { $_ -match "(^|/)ci\.yml$" } |
      Sort-Object -Unique
  )
}

function Test-PathAtSourceRef {
  param([string]$YamlPath)

  $normalizedYamlPath = ConvertTo-NormalizedYamlPath $YamlPath
  $ciPaths = @(Get-CiPathsAtSourceRef)

  return @(
    $ciPaths | Where-Object {
      [string]::Equals(
        $_,
        $normalizedYamlPath,
        [StringComparison]::OrdinalIgnoreCase
      )
    }
  ).Count -gt 0
}

function Get-AllDefinitions {
  $response = Invoke-AzJson -ArgumentList @(
    "devops", "invoke",
    "--organization", $organization,
    "--area", "build",
    "--resource", "definitions",
    "--route-parameters", "project=$project",
    "--query-parameters", "includeAllProperties=true", '$top=10000',
    "--http-method", "GET",
    "--api-version", "7.1",
    "--only-show-errors",
    "--output", "json"
  )

  return @($response.value)
}

function Get-Definition {
  param([int]$DefinitionId)

  return Invoke-AzJson -ArgumentList @(
    "devops", "invoke",
    "--organization", $organization,
    "--area", "build",
    "--resource", "definitions",
    "--route-parameters", "project=$project", "definitionId=$DefinitionId",
    "--http-method", "GET",
    "--api-version", "7.1",
    "--only-show-errors",
    "--output", "json"
  )
}

function Test-IsTargetRepository {
  param($Definition)

  return (
    [string]::Equals(
      [string]$Definition.repository.name,
      $repository,
      [StringComparison]::OrdinalIgnoreCase
    ) -or
    [string]::Equals(
      [string]$Definition.repository.id,
      $repository,
      [StringComparison]::OrdinalIgnoreCase
    )
  )
}

function Assert-TargetRepository {
  param($Definition)

  if (Test-IsTargetRepository $Definition) {
    return
  }

  $actualRepository = @(
    [string]$Definition.repository.name
    [string]$Definition.repository.id
  ) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Select-Object -Unique

  throw "Refusing to modify definition $($Definition.id): expected repository '$repository', found '$($actualRepository -join "', '")'."
}

function Show-Audit {
  $allCi = @(Get-CiPathsAtSourceRef)
  $pipelineRoots = @(
    $allCi | Where-Object { $_ -notmatch "(^|/)templates/" }
  )
  $definitions = @(Get-AllDefinitions)
  $repoDefinitions = @(
    $definitions | Where-Object { Test-IsTargetRepository $_ }
  )

  $mappedPaths = [Collections.Generic.HashSet[string]]::new(
    [StringComparer]::OrdinalIgnoreCase
  )
  foreach ($definition in $repoDefinitions) {
    $yamlPath = ConvertTo-NormalizedYamlPath $definition.process.yamlFilename
    if (-not [string]::IsNullOrWhiteSpace($yamlPath)) {
      [void]$mappedPaths.Add($yamlPath)
    }
  }

  $allCiPaths = [Collections.Generic.HashSet[string]]::new(
    [StringComparer]::OrdinalIgnoreCase
  )
  foreach ($yamlPath in $allCi) {
    [void]$allCiPaths.Add($yamlPath)
  }

  $unmapped = @(
    $pipelineRoots | Where-Object { -not $mappedPaths.Contains($_) }
  )
  $stale = @(
    foreach ($definition in $repoDefinitions) {
      $yamlPath = ConvertTo-NormalizedYamlPath $definition.process.yamlFilename
      if (
        ($yamlPath -eq "ci.yml" -or $yamlPath -like "*/ci.yml") -and
        -not $allCiPaths.Contains($yamlPath)
      ) {
        [pscustomobject]@{
          Id          = $definition.id
          Name        = $definition.name
          QueueStatus = $definition.queueStatus
          Yaml        = $yamlPath
        }
      }
    }
  )
  $staleEnabled = @($stale | Where-Object { $_.QueueStatus -ne "disabled" })
  $staleDisabled = @($stale | Where-Object { $_.QueueStatus -eq "disabled" })

  Write-Host "Source ref: $sourceRef"
  Write-Host "Pipeline roots: $($pipelineRoots.Count)"
  Write-Host "Unmapped pipeline roots: $($unmapped.Count)"
  if ($unmapped.Count -gt 0) {
    $unmapped |
      ForEach-Object { [pscustomobject]@{ Yaml = $_ } } |
      Format-Table -AutoSize |
      Out-Host
  }

  Write-Host "Stale enabled definitions: $($staleEnabled.Count)"
  if ($staleEnabled.Count -gt 0) {
    $staleEnabled | Format-Table -AutoSize | Out-Host
  }

  Write-Host "Stale disabled definitions: $($staleDisabled.Count)"
  if ($staleDisabled.Count -gt 0) {
    $staleDisabled | Format-Table -AutoSize | Out-Host
  }
}

foreach ($command in @("az", "git")) {
  if (-not (Get-Command $command -ErrorAction SilentlyContinue)) {
    throw "Required command '$command' was not found."
  }
}

Invoke-NativeCommand `
  -Command "az" `
  -ArgumentList @(
    "extension", "show",
    "--name", "azure-devops",
    "--only-show-errors",
    "--output", "none"
  ) | Out-Null

Update-OriginMain

if ($PSCmdlet.ParameterSetName -eq "Audit") {
  Show-Audit
  return
}

$definition = Get-Definition -DefinitionId $DisableDefinitionId
if (
  [int]$definition.id -ne $DisableDefinitionId -or
  $null -eq $definition.revision
) {
  throw "Definition $DisableDefinitionId did not return the expected ID and revision."
}

Assert-TargetRepository $definition

$actualYamlPath = ConvertTo-NormalizedYamlPath $definition.process.yamlFilename
$expectedYamlPath = ConvertTo-NormalizedYamlPath $ExpectedYamlPath
if (-not [string]::Equals(
    $actualYamlPath,
    $expectedYamlPath,
    [StringComparison]::OrdinalIgnoreCase
  )) {
  throw "Refusing to modify definition $DisableDefinitionId because it maps '$actualYamlPath', not the expected path '$expectedYamlPath'."
}

if (
  $actualYamlPath -notmatch "(^|/)ci\.yml$" -or
  $actualYamlPath -match "(^|/)templates/"
) {
  throw "Refusing to modify definition $DisableDefinitionId because '$actualYamlPath' is not a pipeline-root ci.yml path."
}

if (Test-PathAtSourceRef -YamlPath $actualYamlPath) {
  throw "Refusing to disable definition $DisableDefinitionId because '$actualYamlPath' exists on $sourceRef."
}

if ($definition.queueStatus -eq "disabled") {
  Write-Host "Definition $DisableDefinitionId is already disabled."
  return
}

$target = "$($definition.name) ($DisableDefinitionId), $actualYamlPath"
if (-not $PSCmdlet.ShouldProcess($target, "Disable Azure DevOps pipeline")) {
  return
}

$definition.queueStatus = "disabled"
$tempFile = [IO.Path]::GetTempFileName()
try {
  $definition |
    ConvertTo-Json -Depth 100 -Compress |
    Set-Content -LiteralPath $tempFile -Encoding utf8NoBOM

  Invoke-NativeCommand `
    -Command "az" `
    -ArgumentList @(
      "devops", "invoke",
      "--organization", $organization,
      "--area", "build",
      "--resource", "definitions",
      "--route-parameters", "project=$project", "definitionId=$DisableDefinitionId",
      "--query-parameters",
      "secretsSourceDefinitionId=$($definition.id)",
      "secretsSourceDefinitionRevision=$($definition.revision)",
      "--http-method", "PUT",
      "--api-version", "7.1",
      "--in-file", $tempFile,
      "--only-show-errors",
      "--output", "none"
    ) | Out-Null
} finally {
  if (Test-Path -LiteralPath $tempFile) {
    Remove-Item -LiteralPath $tempFile -Force
  }
}

$verifiedDefinition = Get-Definition -DefinitionId $DisableDefinitionId
Assert-TargetRepository $verifiedDefinition
$verifiedYamlPath = ConvertTo-NormalizedYamlPath $verifiedDefinition.process.yamlFilename
if (
  $verifiedDefinition.queueStatus -ne "disabled" -or
  -not [string]::Equals(
    $verifiedYamlPath,
    $actualYamlPath,
    [StringComparison]::OrdinalIgnoreCase
  )
) {
  throw "Definition $DisableDefinitionId did not retain the expected disabled state and YAML path."
}

Write-Host "Disabled definition $DisableDefinitionId ($actualYamlPath)."
