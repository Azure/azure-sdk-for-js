# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/confidential-ledger"
title: ConfidentialLedger
description: The ConfidentialLedgerClient writes and retrieves ledger entries against the Confidential Ledger service.
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder:
  ../src/generated
input-file: https://github.com/Azure/azure-rest-api-specs/blob/0e44f6c78600b144daea8c4cd2090acd11358024/specification/confidentialledger/data-plane/Microsoft.ConfidentialLedger/stable/2022-05-13/confidentialledger.json
package-version: 1.0.0-beta.3
hide-clients: true
rest-level-client: true
add-credentials: true
credential-scopes: "https://confidential-ledger.azure.com/.default"
use-extension:
  "@autorest/typescript": "https://aka.ms/azsdk/typescript/rlc"
```
