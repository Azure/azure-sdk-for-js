---
name: ado-pipeline-audit
description: 'Audit Azure DevOps registrations for repository ci.yml entry points. USE FOR: "check ci.yml correctness", "find unmapped ci.yml files", "find stale ADO pipelines", "check pipeline registration", "create a missing JS pipeline", "disable pipelines whose YAML was deleted". DO NOT USE FOR: diagnosing a failed pipeline run or fixing CI failures.'
compatibility: "Azure CLI with the azure-devops extension and access to the azure-sdk/internal project"
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
