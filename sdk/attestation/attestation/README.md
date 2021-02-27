# Azure Attestation client library for JavaScript

This package contains an isomorphic SDK for AttestationClient.

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher

### Install the `@azure/attestation` package

```bash
npm install @azure/attestation
```

### How to use

## Key concepts

This SDK provides the following functionality for the Microsoft Azure Attestation Service

- Microsoft Azure Attestation Enclave Attestation
- Attestation Policy Management APIs
- Attestation Policy Management Certificate Management APIs.

## Examples

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcdn%2Farm-cdn%2FREADME.png)
