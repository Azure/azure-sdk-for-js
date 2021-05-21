# Azure Attestation Service client library for TypeScript

## Setup

```ps
npm install -g autorest
```

## Generation

```ps
cd <swagger-folder>
autorest README.md
```

### Code generation settings


```yaml
package-name: "@azure/attestation"
package-version: 1.0.0-beta.2
tag: package-2020-10-01
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
source-code-folder-path: .
clear-output-folder: true
typescript: true
require: 
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/attestation/data-plane/readme.md
add-credentials: true
credential-scopes: https://attest.azure.net/.default
title: AzureAttestationRestClient
v3: true
no-namespace-folders: true

use-extension:
  "@autorest/typescript": "6.0.0-dev.20201204.2"


#directive:
#  from: swagger-document
#  where: "$.definitions.PolicyCertificatesModificationResult"
#  transform: >
#    $["x-ms-client-name"] = "GeneratedPolicyCertificatesModificationResult"

```
