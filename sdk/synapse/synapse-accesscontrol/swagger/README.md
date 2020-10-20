# Synapse AccessControl Configuration

> see https://aka.ms/autorest

```yaml
typescript:
  package-name: "@azure/synapse-accesscontrol"
use-extension:
  "@autorest/typescript": "6.0.0-dev.20201013.1"
azure-arm: false
generate-metadata: false
add-credentials: false
title: SynapseAccessControl
license-header: MICROSOFT_MIT_NO_VERSION
modelerfour:
  lenient-model-deduplication: true
output-folder: ../src/generated
tag: package-artifacts-2019-06-01-preview
```

### Tag: package-access-control-2020-02-01-preview

These settings apply only when `--tag=package-access-control-2020-02-01-preview` is specified on the command line.

```yaml $(tag) == 'package-access-control-2020-02-01-preview'
input-file:
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2020-02-01-preview/roles.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2020-02-01-preview/roleAssignments.json
```
