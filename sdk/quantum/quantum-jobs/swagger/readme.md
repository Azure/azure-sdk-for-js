# Azure Quantum SDK

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/quantum-jobs"
package-version: "1.0.0-beta.2"
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/quantum/data-plane/Microsoft.Quantum/preview/2019-11-04-preview/quantum.json
add-credentials: true
credential-scopes: ["https://quantum.microsoft.com/.default"]
security: AADToken
title: QuantumJobClient
v3: true
use-extension:
  "@autorest/typescript": "6.0.0-rc.1"
tracing-info:
  namespace: "Microsoft.Quantum"
  packagePrefix: "Azure.Quantum.QuantumJobs"
use-core-v2: true
```
