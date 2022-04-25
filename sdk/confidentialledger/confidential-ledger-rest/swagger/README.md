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
  ## input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/confidentialledger/data-plane/Microsoft.ConfidentialLedger/preview/0.1-preview/confidentialledger.json
input-file: https://github.com/Azure/azure-rest-api-specs/blob/a4d582970bf41a4e6695d2cf974295e393f5c6b1/specification/confidentialledger/data-plane/Microsoft.ConfidentialLedger/preview/2022-20-04-preview/confidentialledger.json
package-version: 1.0.0-beta.3
hide-clients: true
rest-level-client: true
add-credentials: true
credential-scopes: "https://confidential-ledger.azure.com/.default"
use-extension:
  "@autorest/typescript": "https://aka.ms/azsdk/typescript/rlc"
```
