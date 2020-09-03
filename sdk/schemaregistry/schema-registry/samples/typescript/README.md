<!-- The following YAML bit is needed by the docs system to publish the samples online. Uncomment/Update it when the samples can be published publicly -->

<!-- ---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-schema-registry
urlFragment: schema-registry-typescript
--- -->

# Azure Schema Registry client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure schema-registry in some common scenarios.

| **File Name**                                   | **Description**        |
| ----------------------------------------------- | ---------------------- |
| [schemaRegistrySample.ts][schemaregistrysample] | schema-registry sample |

## Prerequisites

The samples are compatible with Node.js >= 10.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs. Samples retrieve credentials to access the endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/schemaRegistrySample.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env SCHEMA_REGISTRY_ENDPOINT="<endpoint>" AZURE_TENANT_ID="<tenant id>" AZURE_CLIENT_ID="<client id>" AZURE_CLIENT_SECRET="<secret>" node dist/schemaRegistrySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[schemaregistrysample]: ./src/schemaRegistrySample.ts
[apiref]: https://docs.microsoft.com/javascript/api
[freesub]: https://azure.microsoft.com/free/
[package]: ../../README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
