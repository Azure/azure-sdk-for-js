# Azure Communication Services Short Codes Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-domain-verification"
title: Domain Verification Client
description: Domain Verification Client
package-version: 1.0.0-alpha.20230310.1
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-domainverification-2022-09-01-preview
input-file: ./domainVerification.json
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
add-credentials: false
azure-arm: false
skip-enum-validation: true
generate-test: false
```

### Disable extensible enums

```yaml
directive:
  - from: swagger-document
    where: $.definitions.status["x-ms-enum"]
    transform: >
      if ($.modelAsString) {
        $.modelAsString = false
      }
```

### Rename CreateDomainOwnershipVerificationChallengeResponse to DomainOwnershipChallenge

```yaml
directive:
  - from: swagger-document
    where: $.definitions.CreateDomainOwnershipVerificationChallengeResponse
    transform: >
      $["x-ms-client-name"] = "DomainOwnershipChallenge";
```

### Rename DomainOwnershipVerificationResponse to DomainOwnership

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DomainOwnershipVerificationResponse
    transform: >
      $["x-ms-client-name"] = "DomainOwnership";
```
