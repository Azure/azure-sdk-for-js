# Azure Maps Common client library for JavaScript/TypeScript

An internal library for the various Azure Maps client libraries.

This package contains common code that needs to be shared among the other Azure Maps libraries. It is not published to NPM and is not meant for usage by any other consumers.

## Maps client libraries

The following client libraries use this package:

- @azure/maps-search
- @azure-rest/maps-route

## Getting started

For information on getting started, please see our [Maps client libraries](#maps-client-libraries).

## Key concepts

For information on key concepts, please see our [Maps client libraries](#maps-client-libraries).

## Examples

For examples, please see our [Maps client libraries](#maps-client-libraries).

## Next steps

For information on next steps, please see our [Maps client libraries](#maps-client-libraries).

## Troubleshooting

If you run into issues while using this library, directly or indirectly, please feel free to [file an issue](https://github.com/Azure/azure-sdk-for-js/issues/new).

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
