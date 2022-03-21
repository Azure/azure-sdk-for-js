# Azure Model Parser client library for JavaScript


This project is used as a template package for the Azure SDK for JavaScript. It is intended to help Azure SDK developers bootstrap new packages, and it provides an example of how to organize the code and documentation of a client library for an Azure service.
This project provides the generation code for producing the @azure/dtdl-parser library. It is intended for use within the Azure SDK 
repository for updating the code for the @azure/dtdl-parser library. This package is not released on npm.

## Getting started

### Currently supported environments

- Node.js version 12.x or higher



## Key concepts

### ConfigurationClient

Describe your primary client here. Talk about what operations it can do and when a developer would want to use it.

## Examples

### First Example

<!-- Examples should showcase the primary, or "champion" scenarios of the client SDK. -->

```ts
import {CodeGenerator} from 'dtdl-parser-generator';

CodeGenerator.execute('dtdl/digest.json', 'src/generated', '2');
// CodeGenerator.execute('samples/typescript/parserGenerator/sample_digest.json', 'src/generated', '2');
```

## Troubleshooting

### Logging

*TODO: This package currently does not support Azure Logging.*

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/digitaltwins/dtdl-parser-generator/samples) directory for detailed examples that demonstrate how to use the client libraries.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

TODO: Ask Azure SDK Team what these impressions are.
![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftemplate%2Ftemplate%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
