# Synapse Artifacts Configuration

> see https://aka.ms/autorest

```yaml
typescript:
  package-name: "@azure/synapse-artifacts"
use-extension:
  "@autorest/typescript": "6.0.0-dev.20201013.1"
azure-arm: false
generate-metadata: false
add-credentials: false
title: SynapseArtifacts
license-header: MICROSOFT_MIT_NO_VERSION
modelerfour:
  lenient-model-deduplication: true
output-folder: ../src/generated
tag: package-artifacts-2019-06-01-preview
```

### Tag: package-artifacts-2019-06-01-preview

These settings apply only when `--tag=package-artifacts-2019-06-01-preview` is specified on the command line.

```yaml $(tag) == 'package-artifacts-2019-06-01-preview'
input-file:
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-06-01-preview/artifacts.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-06-01-preview/workspace.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-06-01-preview/sqlPools.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-06-01-preview/bigDataPools.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-06-01-preview/integrationRuntimes.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-06-01-preview/entityTypes/DataFlow.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-06-01-preview/entityTypes/Dataset.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-06-01-preview/entityTypes/LinkedService.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-06-01-preview/entityTypes/Notebook.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-06-01-preview/entityTypes/Pipeline.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-06-01-preview/entityTypes/SparkJobDefinition.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-06-01-preview/entityTypes/SqlScript.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ea6d1725ca9669714cd5f5f969d026b90ecffbd1/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-06-01-preview/entityTypes/Trigger.json
```
