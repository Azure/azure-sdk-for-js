# Synapse Spark Configuration

> see https://aka.ms/autorest

```yaml
typescript:
  package-name: "@azure/synapse-spark"
use-extension:
  "@autorest/typescript": "6.0.0-dev.20201120.2"
azure-arm: false
generate-metadata: false
add-credentials: false
title: SynapseSpark
license-header: MICROSOFT_MIT_NO_VERSION
modelerfour:
  lenient-model-deduplication: true
output-folder: ../src/generated
tag: package-spark-2019-11-01-preview
```

### Tag: package-spark-2019-11-01-preview

These settings apply only when `--tag=package-spark-2019-11-01-preview` is specified on the command line.

```yaml $(tag) == 'package-spark-2019-11-01-preview'
input-file:
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/3b1545ce83f3fa8a437f181ebfabd3bd4fa8e3e2/specification/synapse/data-plane/Microsoft.Synapse/preview/2019-11-01-preview/sparkJob.json
```
