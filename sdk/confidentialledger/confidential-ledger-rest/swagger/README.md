# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
flavor: azure
openapi-type: data-plane
package-name: "@azure-rest/confidential-ledger"
title: ConfidentialLedger
description: The ConfidentialLedgerClient writes and retrieves ledger entries against the Confidential Ledger service.
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ../generated
input-file: https://github.com/Azure/azure-rest-api-specs/blob/main/specification/confidentialledger/data-plane/Microsoft.ConfidentialLedger/preview/2024-12-09-preview/confidentialledger.json
package-version: 1.1.2-beta.2
hide-clients: true
rest-level-client: true
security: "AADToken"
security-scopes: "https://confidential-ledger.azure.com/.default"
use-extension:
  "@autorest/typescript": "6.0.34"
module-kind: esm
```

```yaml
directive:
  - from: swagger-document
    where: $.paths["/app/transactions"].get
    transform: >
      $["x-ms-pageable"].nextLinkName = "@nextLink"
```
