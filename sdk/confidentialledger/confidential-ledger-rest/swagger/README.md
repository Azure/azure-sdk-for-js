# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
flavor: azure
openapi-type: data-plane
generate-test: true
package-name: "@azure-rest/confidential-ledger"
title: ConfidentialLedger
description: The ConfidentialLedgerClient writes and retrieves ledger entries against the Confidential Ledger service.
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: $(typescript-sdks-folder)/sdk/confidentialledger/confidential-ledger-rest
input-file: https://github.com/Azure/azure-rest-api-specs/blob/main/specification/confidentialledger/data-plane/Microsoft.ConfidentialLedger/stable/2022-05-13/confidentialledger.json
package-version: 1.0.1
hide-clients: true
rest-level-client: true
security: "AADToken"
security-scopes: "https://confidential-ledger.azure.com/.default"
use-extension:
  "@autorest/typescript": "6.0.5"
```

```yaml
directive:
  - from: swagger-document
    where: $.paths["/app/transactions"].get
    transform: >
      $["x-ms-pageable"].nextLinkName = "@nextLink"
```
