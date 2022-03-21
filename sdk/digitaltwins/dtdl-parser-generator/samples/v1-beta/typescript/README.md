---
page_type: sample
languages:
  - typescript
products:
  - azure
urlFragment: dtdl-parser-generator-typescript-beta
---

# Azure Digital Twins Model Parser Generator client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Digital Twins Model Parser Generator in some common scenarios.

| **File Name**                                     | **Description**                                                                                               |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [codeGenerationExample.ts][codegenerationexample] | Demonstrates the use of a Model Parser Generator to validate a PnP model.                                     |
| [parserGeneratorDemo.ts][parsergeneratordemo]     | Demonstrates the use of the Digital Twins Parser Generator to generate a parser based on a given digest file. |
| [test.ts][test]                                   | Test File used for code-genning inline blocks.                                                                |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/codeGenerationExample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/codeGenerationExample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[codegenerationexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/dtdl-parser-generator/samples/v1-beta/typescript/src/codeGenerationExample.ts
[parsergeneratordemo]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/dtdl-parser-generator/samples/v1-beta/typescript/src/parserGeneratorDemo.ts
[test]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/dtdl-parser-generator/samples/v1-beta/typescript/src/test.ts
[apiref]: https://docs.microsoft.com/javascript/api/
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/digitaltwins/dtdl-parser-generator/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
