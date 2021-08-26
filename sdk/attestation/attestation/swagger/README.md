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
package-version: 1.0.1
tag: package-2020-10-01
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
source-code-folder-path: .
clear-output-folder: true
typescript: true
require: 
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/attestation/data-plane/readme.md
add-credentials: false
#credential-scopes:
#  - https://attest.azure.net/.default
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

```yaml
directive:
  from: swagger-document
  where: $.definitions.AttestationResult
  transform: >
    $["x-ms-client-name"] = "GeneratedAttestationResult";
    $.required = [ 
      "iss",
      "x-ms-ver",
      "x-ms-policy-hash", 
      "x-ms-sgx-mrsigner", 
      "x-ms-sgx-is-debuggable",
      "x-ms-sgx-mrenclave",
      "x-ms-sgx-product-id",
      "x-ms-sgx-svn",
      "jti",
      "x-ms-attestation-type",
    ]
```

```yaml
directive:
  from: swagger-document
  where: $.definitions.PolicyResult
  transform: >
    $.required = [ 
     "x-ms-policy-result",
     "x-ms-policy-token-hash"
    ]
```

```yaml
directive:
  from: swagger-document
  where: $.definitions.PolicyCertificatesModificationResult
  transform: >
    $.required = [ "x-ms-certificate-thumbprint", "x-ms-policycertificates-result" ]
```

```yaml
directive:
  from: swagger-document
  where: $.definitions.PolicyCertificatesModifyResponse
  transform: >
    $.required = [ "token" ];
```

```yaml
directive:
  from: swagger-document
  where: $.definitions.PolicyCertificatesResponse
  transform: >
    $.required = [ "token", "x-ms-policy-certificates" ];
```

```yaml
directive:
  from: swagger-document
  where: $.definitions.PolicyCertificatesResult
  transform: >
    $.required = [ "x-ms-policy-certificates" ];
```

```yaml
directive:
  from: swagger-document
  where: $.definitions.JSONWebKeySet
  transform: >
    $.required = [ "keys" ];
```
