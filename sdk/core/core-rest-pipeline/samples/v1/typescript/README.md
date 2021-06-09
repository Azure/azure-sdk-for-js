---
page_type: sample
languages:
  - typescript
products:
  - azure
urlFragment: core-rest-pipeline-typescript
---

# Azure SDK Core client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure SDK Core in some common scenarios.

| **File Name**                 | **Description**                                                         |
| ----------------------------- | ----------------------------------------------------------------------- |
| [node-sample.ts][node-sample] | This samples shows how to make a GET request using default http client. |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

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

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/node-sample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[node-sample]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/core/core-rest-pipeline/samples/v1/typescript/src/node-sample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/core-rest-pipeline
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/core-rest-pipeline/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
