# Azure Core HttpClients library for JavaScript

This package provides API to create instances that implements `HttpClient` interface used in Azure SDK client libraries.

## Getting started

### Requirements

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Installation

Install the Container Registry client library for JavaScript with `npm`:

```bash
npm install @azure/core-httpclients
```

## Key concepts

Most Azure SDK client libraries for JavaScript allow passing an instance of `HttpClient` to replace the default one used by service clients to send requests. This is done via the `CommonClientOptions.httpClient` option.

```javascript
const { createXhrHttpClient } = require("@azure/core-httpclients");
const azureIdentity = require("@azure/identity");
const appConfig = require("@azure/app-configuration");

const credential = new azureIdentity.InteractiveBrowserCredential({
  tenantId: "<YOUR_TENANT_ID>",
  clientId: "<YOUR_CLIENT_ID>"
});

const client = new appConfig.AppConfigurationClient(
  endpoint, // ex: <https://<your appconfig resource>.azconfig.io>
  credential,
  {
    httpClient: createXhrHttpClient()
  }
);
```

## Examples

Examples can be found in the `samples` folder.

## Next steps

You can build and run the tests locally by executing `rushx test`. Explore the `test` folder to see advanced usage and behavior of the public classes.

## Troubleshooting

If you run into issues while using this library, please feel free to [file an issue](https://github.com/Azure/azure-sdk-for-js/issues/new).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcore%2Fcore-httpclients%2FREADME.png)
