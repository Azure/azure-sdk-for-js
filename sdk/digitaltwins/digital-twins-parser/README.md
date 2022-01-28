# Azure Model Parser client library for JavaScript

Use this library to parse your DTDL models and validate their structure conforms to the DTDL specification. 

The Digital Twin Definition Language (DTDL) defines a JSON-LD based schema for creating Digital Twin models. As the DTDL specification evolves, this parser will be updated accordingly. A key characteristic of Azure Digital Twins is the ability to define your own vocabulary and build your twin graph in the self-defined terms of your business. This capability is provided through user-provided models. You can think of models as the nouns in a description of your world.

Learn more about DTDL [here](https://docs.microsoft.com/en-us/azure/digital-twins/concepts-models).

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

None.

### Install the `@azure/digital-twins-parser` package

Install the Digital Twins Model Parser client library for JavaScript with `npm`:

```bash
npm install @azure/digital-twins-parser
```

### Access the Public DTDL Model Repository

If you have not already written a DTDL model, you can access the full repository of publicly available DTDL models here: [Github: Repository of IoT Plug and Play models using DTDL](https://github.com/Azure/iot-plugandplay-models)

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

### Further examples

Top-level examples usually include things like creating and authenticating the main Client. If your service supports multiple means of authenticating (e.g. key-based and Azure Active Directory) you can give a separate example of each.

## Key concepts

### DTDL Parser

DTDL (Digital Twins Definition Language) defines a contract for interacting with models of Digital Twin Plug and Plan devices. The DTDL Parser is a langauge parser that is partially hand-written, partially generated based on a DTDL schema definition, which can validate if a string provided to it conforms to DTDL langauge definitions.

You can learn more about DTDL for models by reading "Learn about twin models and how to define them in (Azure Digital Twins](https://docs.microsoft.com/azure/digital-twins/concepts-models)

## Examples

### Parse a DTDL Model

To parse a sample DTDL model, either start with one you have already written or use one located in the public DTDL database (referenced above). Once you have installed the package via `npm`, create a TypeScript sample:

```javascript
import * as fs from "fs";
import { createParser, ModelParsingOption } from "@azure/digital-twins-parser";

async function main() {
  const rawDtdlDigest: string = fs.readFileSync(
    "./samples-dev/InterfaceContentsEmbeddedV2.json",
    "utf-8"
  );
  const modelParser = createParser(ModelParsingOption.PermitAnyTopLevelElement);
  modelParser.options = ModelParsingOption.PermitAnyTopLevelElement;
  const modelDict = await modelParser.parse([rawDtdlDigest]);
  console.log(modelDict);
  Object.entries(modelDict).forEach(([key, value]) => {
    console.log(key);
    console.log(typeof value);
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

```

## Troubleshooting

### Logging

*NOTE: This package currently does not support Azure Logging, but will have support by the GA release.*

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/digitaltwins/digital-twins-parser/samples) directory for detailed examples that demonstrate how to use the client libraries.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftemplate%2Ftemplate%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
