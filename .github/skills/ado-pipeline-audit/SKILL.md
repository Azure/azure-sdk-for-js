---
name: ado-pipeline-audit
description: 'Audit Azure DevOps registrations for repository ci.yml entry points. USE FOR: "check ci.yml correctness", "find unmapped ci.yml files", "find stale ADO pipelines", "check pipeline registration", "create a missing JS pipeline", "disable pipelines whose YAML was deleted". DO NOT USE FOR: diagnosing a failed pipeline run or fixing CI failures.'
compatibility: "Azure CLI with the azure-devops extension and access to the azure-sdk/internal project"
---

# ADO Pipeline Registration Audit

Use this skill to compare checked-in `ci.yml` entry points with Azure DevOps
build definitions for `Azure/azure-sdk-for-js`.

## Fixed scope

- Organization: `https://dev.azure.com/azure-sdk`
- Project: `internal`
- Repository: `Azure/azure-sdk-for-js`
- Normal pipeline folder: `\js`
- Default branch: `main`

Install the CLI extension if needed:

```powershell
az extension add --name azure-devops --only-show-errors
```

## Distinguish entry points from templates

Do not assume every file named `ci.yml` is a standalone pipeline.

- Files under a `templates` directory are reusable YAML and should not have
  their own ADO definition.
- `eng/pipelines/templates/jobs/ci.yml` is the known example: root pipelines
  consume its jobs transitively.
- `sdk/template/ci.yml` is different: `template` is a service directory, so it
  is a real pipeline entry point.

ADO definitions map only to root YAML files. Normalize `\` to `/`, remove a
leading `/`, and compare paths case-insensitively.

## Audit registrations

Run from the repository root:

```powershell
$org = 'https://dev.azure.com/azure-sdk'
$project = 'internal'
$repo = 'Azure/azure-sdk-for-js'
$repoRoot = (git rev-parse --show-toplevel).Trim()

function Normalize-YamlPath([string]$path) {
  return $path.Replace('\', '/').TrimStart('/')
}

$allCi = @(
  git ls-files |
    ForEach-Object { Normalize-YamlPath $_ } |
    Where-Object { $_ -match '(^|/)ci\.yml$' } |
    Sort-Object -Unique
)

$pipelineRoots = @(
  $allCi | Where-Object { $_ -notmatch '(^|/)templates/' }
)

$response = az devops invoke `
  --organization $org `
  --area build `
  --resource definitions `
  --route-parameters project=$project `
  --query-parameters 'includeAllProperties=true' '$top=10000' `
  --http-method GET `
  --api-version 7.1 `
  --output json
if ($LASTEXITCODE -ne 0) { throw 'Failed to list ADO definitions.' }

$definitions = @(($response | ConvertFrom-Json).value)
$repoDefinitions = @(
  $definitions | Where-Object {
    $_.repository.name -eq $repo -or $_.repository.id -eq $repo
  }
)
$mappedPaths = @(
  $repoDefinitions |
    Where-Object { $_.process.yamlFilename } |
    ForEach-Object { Normalize-YamlPath $_.process.yamlFilename } |
    Sort-Object -Unique
)

$unmapped = @(
  $pipelineRoots | Where-Object { $_ -notin $mappedPaths }
)
$stale = @(
  $repoDefinitions |
    Where-Object {
      if (-not $_.process.yamlFilename) { return $false }
      $yaml = Normalize-YamlPath $_.process.yamlFilename
      ($yaml -eq 'ci.yml' -or $yaml -like '*/ci.yml') -and $yaml -notin $allCi
    } |
    Select-Object id, name, path, queueStatus,
      @{Name = 'yaml'; Expression = { Normalize-YamlPath $_.process.yamlFilename }}
)

"Unmapped pipeline roots: $($unmapped.Count)"
$unmapped
"Stale ADO definitions: $($stale.Count)"
$stale | Format-Table -AutoSize
```

Also run the repository's local template-structure check:

```powershell
node eng/tools/check-pipeline-templates.mjs
```

Report unmapped roots separately from stale enabled and stale disabled
definitions. Do not mutate ADO during an audit unless the user explicitly asks.
Before treating a definition as stale, update `origin/main` and confirm the file
is absent there; a feature branch can otherwise produce a false stale result.

## Create a missing definition

1. Confirm the YAML exists on `main`.
2. Inspect a comparable active JS definition with `az pipelines show --id <id>`.
3. Reuse its `repository.properties.connectedServiceId` and `queue.id`; do not
   hardcode IDs in this skill.
4. Follow the `js - <service-or-tool>` naming convention under `\js`.
5. Create and queue the first run:

```powershell
az pipelines create `
  --organization 'https://dev.azure.com/azure-sdk' `
  --project internal `
  --name 'js - <name>' `
  --folder-path '\js' `
  --repository 'Azure/azure-sdk-for-js' `
  --repository-type github `
  --service-connection $serviceConnectionId `
  --branch main `
  --yaml-path $yamlPath `
  --queue-id $queueId `
  --skip-first-run false
```

Follow the returned run with `az pipelines runs show --id <run-id>` and require
it to complete successfully.

## Disable a stale definition

Never delete stale definitions by default. Before disabling one, re-fetch it,
normalize its YAML path, and confirm the file is still absent. The
`az pipelines update` command cannot change `queueStatus`, so use the Build
Definitions GET/PUT API:

```powershell
$definitionJson = az devops invoke `
  --organization $org `
  --area build `
  --resource definitions `
  --route-parameters project=$project definitionId=$definitionId `
  --http-method GET `
  --api-version 7.1 `
  --output json
if ($LASTEXITCODE -ne 0) { throw "Failed to read definition $definitionId." }

$definition = $definitionJson | ConvertFrom-Json
$yaml = Normalize-YamlPath $definition.process.yamlFilename
if (Test-Path -LiteralPath (Join-Path $repoRoot $yaml)) {
  throw "Refusing to disable $definitionId because $yaml exists."
}

$definition.queueStatus = 'disabled'
$tempFile = [System.IO.Path]::GetTempFileName()
try {
  $definition |
    ConvertTo-Json -Depth 100 -Compress |
    Set-Content -LiteralPath $tempFile -Encoding utf8NoBOM

  az devops invoke `
    --organization $org `
    --area build `
    --resource definitions `
    --route-parameters project=$project definitionId=$definitionId `
    --http-method PUT `
    --api-version 7.1 `
    --in-file $tempFile `
    --output none
  if ($LASTEXITCODE -ne 0) { throw "Failed to disable definition $definitionId." }
} finally {
  Remove-Item -LiteralPath $tempFile -Force
}
```

Re-fetch every changed definition and verify `queueStatus` is `disabled`, then
rerun the registration audit.
