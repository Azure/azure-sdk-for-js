---
name: ado-pipeline-audit
description: 'Audit Azure DevOps registrations for repository ci.yml entry points. USE FOR: "check ci.yml correctness", "find unmapped ci.yml files", "find stale ADO pipelines", "check pipeline registration", "create a missing JS pipeline", "disable pipelines whose YAML was deleted". DO NOT USE FOR: diagnosing a failed pipeline run or fixing CI failures.'
compatibility: "Azure CLI with the azure-devops extension and access to the azure-sdk/internal project; .NET SDK for pipeline-generator"
---

# ADO Pipeline Registration Audit

Use the committed
[`eng/tools/ado-pipeline-audit.ps1`](../../../eng/tools/ado-pipeline-audit.ps1)
tool to compare `ci.yml` entry points on `origin/main` with Azure DevOps build
definitions for `Azure/azure-sdk-for-js`.

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

## Audit registrations

Run from the repository root:

```powershell
pwsh eng/tools/ado-pipeline-audit.ps1
```

The tool refreshes `origin/main`, compares paths case-insensitively, and reports
unmapped roots separately from stale enabled and stale disabled definitions.
It excludes files under `templates` directories because those are reusable
YAML, not pipeline roots. `sdk/template/ci.yml` remains a root because
`template` is the service directory name.

Also run the local template-structure check:

```powershell
node eng/tools/check-pipeline-templates.mjs
```

Do not mutate ADO during an audit unless the user explicitly asks.

## Create a missing definition

Use `Azure.Sdk.Tools.PipelineGenerator`, not `az pipelines create`. The generator
applies the standard triggers, managed variables, variable groups, and service
connection permissions in addition to creating the definition.

1. Confirm the YAML exists on refreshed `origin/main` and the local copy matches
   it. The generator scans local files, but the definition must use `main`.
2. Install the tool using the package version and feed in
   [`install-pipeline-generation.yml`](../../../eng/common/pipelines/templates/steps/install-pipeline-generation.yml).
   Set `$pipelineGeneratorVersion` to that template's `--version` value and
   `$pipelineGeneratorPath` to a tool directory outside the repository:

```powershell
dotnet tool install Azure.Sdk.Tools.PipelineGenerator `
  --version $pipelineGeneratorVersion `
  --add-source 'https://pkgs.dev.azure.com/azure-sdk/public/_packaging/azure-sdk-for-net/nuget/v3/index.json' `
  --tool-path $pipelineGeneratorPath
```

3. Ensure Azure CLI is logged in with permission to manage definitions and
   authorize their resources in `azure-sdk/internal`.
4. Scope `--path` to the directory containing the missing YAML. The generator
   recursively scans `ci.yml` and `ci.*.yml` and can update existing definitions.
   Inspect that subtree first; do not include reusable templates or mutate
   unrelated definitions without explicit approval.
5. Use the internal unified-pipeline invocation (`--convention up`) from
   [`prepare-pipelines.yml`](../../../eng/common/pipelines/templates/jobs/prepare-pipelines.yml),
   not the public PR-validation convention (`ci`). Keep the variable group IDs
   and service connection names aligned with that template's JS settings. The
   current JS invocation is:

```powershell
$yamlDirectory = Split-Path -Parent (Resolve-Path $yamlPath).Path
& (Join-Path $pipelineGeneratorPath 'pipeline-generator') generate `
  --organization azure-sdk `
  --project internal `
  --prefix js `
  --devopspath '\js' `
  --path $yamlDirectory `
  --endpoint Azure `
  --repository 'Azure/azure-sdk-for-js' `
  --convention up `
  --agentpool Hosted `
  --branch refs/heads/main `
  --set-managed-variables `
  --debug `
  --variablegroups 24 58 93 64 `
  --serviceconnections 'Azure' 'Azure SDK Artifacts' 'Azure SDK Engineering System' `
    'opensource-api-connection' 'AzureSDKEngKeyVault Secrets' `
    'Azure SDK PME Managed Identity' 'APIView prod deployment' `
    'azure-sdk-tests' 'azure-sdk-tests-preview' 'azure-sdk-tests-public' `
    'Azure SDK Test Resources - LiveTestSecrets'
if ($LASTEXITCODE -ne 0) {
  throw "Pipeline generation failed with exit code $LASTEXITCODE."
}
```

The variable groups are `NPM_Registry_Authentication`,
`Release_Secrets_for_GitHub`, `APIReview_AutoCreate_Configurations`, and
`Secrets_for_Resource_Provisioner`. The generator resolves the `Azure` repository
endpoint and `Hosted` queue by name and follows the `js - <service-or-tool>`
naming convention under `\js`; do not copy endpoint or queue IDs from another
definition.

After generation, inspect the definition with `az pipelines show --id <id>`
and verify its repository, YAML path, folder, and default branch. The generator
does not queue a run, so queue the first run explicitly:

```powershell
az pipelines run `
  --organization 'https://dev.azure.com/azure-sdk' `
  --project internal `
  --id $definitionId `
  --branch main
```

Follow the returned run with `az pipelines runs show --id <run-id>` (using the
same organization and project) and require it to complete successfully. Re-run
the audit to verify the YAML is no longer unmapped.

## Disable a stale definition

Never delete stale definitions by default. First exercise all guards without
changing ADO:

```powershell
pwsh eng/tools/ado-pipeline-audit.ps1 `
  -DisableDefinitionId <id> `
  -ExpectedYamlPath <path> `
  -WhatIf
```

After explicit user approval, repeat with `-Confirm:$false` instead of
`-WhatIf`. The tool refuses the mutation unless the definition belongs to
`Azure/azure-sdk-for-js`, still maps the expected pipeline-root path, and that
path is absent from refreshed `origin/main`. It re-fetches the definition after
the update and verifies the disabled state.
