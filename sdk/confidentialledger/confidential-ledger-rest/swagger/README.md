# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/confidential-ledger"
title: ConfidentialLedger
description: The ConfidentialLedgerClient writes and retrieves ledger entries against the Confidential Ledger service.
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/feature/confidential_ledger/specification/confidentialledger/data-plane/Microsoft.ConfidentialLedger/preview/0.1-preview/confidentialledger.json
package-version: 1.0.0-beta.1
hide-clients: true
rest-level-client: true
add-credentials: true
credential-scopes: "https://cognitiveservices.azure.com/.default"
credential-key-header-name: "Ocp-Apim-Subscription-Key"
use-extension:
  "@autorest/typescript": "https://aka.ms/azsdk/typescript/rlc"
```
