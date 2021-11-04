# Azure Synapse Access Control Rest client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Synapse Access Control Rest in some common scenarios.

| **File Name**                                   | **Description**           |
| ----------------------------------------------- | ------------------------- |
| [listRoleAssignments.ts][listroleassignments]   | list role assignments     |
| [createRoleAssignment.ts][createroleassignment] | creates a role assignment |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Creating and managing Synapse compute resources][createinstance_creatingandmanagingsynapsecomputeresources]

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
node dist/listRoleAssignments.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" node dist/listRoleAssignments.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[listroleassignments]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/synapse/synapse-access-control-rest/samples/v1/typescript/src/listRoleAssignments.ts
[createroleassignment]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/synapse/synapse-access-control-rest/samples/v1/typescript/src/createRoleAssignment.ts
[apiref]: https://docs.microsoft.com/rest/api/synapse/
[freesub]: https://azure.microsoft.com/free/
[createinstance_creatingandmanagingsynapsecomputeresources]: https://docs.microsoft.com/azure/synapse-analytics/security/synapse-workspace-access-control-overview#creating-and-managing-synapse-compute-resources
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/synapse/synapse-access-control-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
