# Azure Schema Registry client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Schema Registry in some common scenarios.

| **File Name**                                   | **Description**                                                                 |
| ----------------------------------------------- | ------------------------------------------------------------------------------- |
| [schemaRegistrySample.js][schemaregistrysample] | Demonstrates the use of a SchemaRegistryClient to register and retrieve schema. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Schema Registry resource][createinstance_azureschemaregistryresource]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node schemaRegistrySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env SCHEMA_REGISTRY_ENDPOINT="<schema registry endpoint>" SCHEMA_REGISTRY_GROUP="<schema registry group>" node schemaRegistrySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[schemaregistrysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/schemaregistry/schema-registry/samples/v1/javascript/schemaRegistrySample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/schema-registry
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureschemaregistryresource]: https://aka.ms/schemaregistry
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/schemaregistry/schema-registry/README.md
