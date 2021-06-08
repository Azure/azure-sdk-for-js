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
override-client-name: GeneratedClient
title: AzureAttestationRestClient
v3: true
no-namespace-folders: true
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

```yaml
directive:
  from: swagger-document
  where: $.definitions.PolicyResponse
  transform: >
    $.required = [ "token" ];
```

```yaml
directive:
  from: swagger-document
  where: $.definitions.AttestationResponse
  transform: >
    $.required = [ "token" ];
```
