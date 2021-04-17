# Azure Purview Scanning Rest-Level client library for JavaScript

## Getting started

### Currently supported environments

- Node.js version 13.x.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure-rest/purview-scanning` package

Install the Azure Purview Scanning client library for JavaScript with `npm`:

```bash
npm install @azure-rest/purview-scanning
```

### Create and authenticate a `PurviewScanning`

## Key concepts

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

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/purview/purview-scanning/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fpurview%2Fpurview-scanning-rest%2FREADME.png)
