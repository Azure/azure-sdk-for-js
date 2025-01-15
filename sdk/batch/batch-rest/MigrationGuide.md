<!-- dev-tool snippets ignore -->

# Guide for migrating to `@azure-rest/batch` from `@azure/batch`

This guide is intended to assist customers in migrating to `@azure-rest/batch` from the legacy `@azure/batch` package. It will focus on side-by-side comparisons of similar operations between the two packages.

Familiarity with the legacy client library is assumed. For those new to the Azure Batch JavaScript client library, please refer to the [README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/batch/batch-rest/README.md) and [samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/batch/batch-rest/samples) of `@azure-rest/batch` instead of this guide.

## Table of Contents

- [Migration Benefits](#migration-benefits)
- [Constructing the Clients](#constructing-the-clients)
  - [Authenticate with Shared Key Credentials](#authenticate-with-shared-key-credentials)
  - [Authenticate with Microsoft Entra ID](#authenticate-with-microsoft-entra-id)
- [Operation Response Differences](#operation-response-differences)
- [Error Handling](#error-handling)
- [More Examples](#more-examples)
  - [Create Pools](#create-pools)
  - [Create Jobs](#create-jobs)
  - [Submit Tasks](#submit-tasks)

## Migration Benefits

- Reduced package size: `@azure-rest/batch` is a [REST client](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md), which is more lightweight compared to the `@azure/batch` package. It takes advantage of TypeScript type inferences and reduces bundle size when used in a browser environment. For more information, please see this [doc](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) and our introduction [blog](https://devblogs.microsoft.com/azure-sdk/azure-rest-libraries-for-javascript/).

- Embrace the latest Azure JavaScript SDK ecosystem: Works with [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) for simpler and more secure authentication. Also leverages common paging and logging utilities used by all REST clients.

- Get the latest features of the Azure Batch service: The `@azure/batch` package is scheduled for deprecation and may not support new features and API versions of the service as they become available.

## Constructing the Clients

### Authenticate with Shared Key Credentials

Both `@azure/batch` and `@azure-rest/batch` support shared key authentication.

Previously in `@azure/batch`, you could use the `BatchSharedKeyCredentials` class exported from `@azure/batch` to construct a shared key credential, then pass the credential and account endpoint to the `BatchServiceClient` constructor to create a client instance.

```typescript
import { BatchSharedKeyCredentials, BatchServiceClient } from "@azure/batch";

const credential = new BatchSharedKeyCredentials("<account-name>", "<account-key>");
const client = new BatchServiceClient(credential, "<account-endpoint>");
```

Now in `@azure-rest/batch`, you need to install the [`@azure/core-auth`](https://www.npmjs.com/package/@azure/core-auth) package and use the `AzureNamedKeyCredential` class exported from `@azure/core-auth` to construct a shared key credential. Then, pass the credential and account endpoint to the default exported `createClient` method from `@azure-rest/batch` to create a client instance.

```typescript
import { AzureNamedKeyCredential } from "@azure/core-auth";
import createClient from "@azure-rest/batch";

const credential = new AzureNamedKeyCredential("<account-name>", "<account-key>");
const client = createClient("<account-endpoint>", credential);
```

### Authenticate with Microsoft Entra ID

Previously in `@azure/batch`, it only supported the legacy [@azure/ms-rest-nodeauth](https://www.npmjs.com/package/@azure/ms-rest-nodeauth) package, and the browser environment was not supported. The following example uses the `loginWithVmMSI` method exported from `@azure/ms-rest-nodeauth` to authenticate with the Azure Batch service using MSI (Managed Service Identity) based login from a virtual machine created in Azure.

```typescript
import { BatchServiceClient } from "@azure/batch";
import { loginWithVmMSI } from "@azure/ms-rest-nodeauth";

const credential = await loginWithVmMSI({
  resource: "https://batch.core.windows.net/",
});
const client = new BatchServiceClient(credential, "<account-endpoint>");
```

Now in `@azure-rest/batch`, you can pass any of the [credentials from the `@azure/identity` package](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md) to the `createClient` method to make use of your Microsoft Entra ID credentials. In the following sample, it creates an instance of [`DefaultAzureCredential`](https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential) to authenticate with the Azure Batch service.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import createClient from "@azure-rest/batch";

const credential = new DefaultAzureCredential();
const client = createClient("<account-endpoint>", credential);
```

## Operation Response Differences

Previously in `@azure/batch`, the client operation returned a `Promise` that resolves to the result of the response body JSON. The following example demonstrates how to get a job with the `BatchServiceClient` instance.

```typescript
const job = await client.job.get("<job-id>");
console.log(`Job id: ${job.id}, state: ${job.state}`);
```

Now in `@azure-rest/batch`, the client operation returns a `Promise` that resolves to the response object, which contains the response body and the status code. In order to get the response body JSON, you need to first check if the response is unexpected with the `isUnexpected` helper method, then access the response body. The following example demonstrates how to get a job in `@azure-rest/batch`.

```typescript
import { isUnexpected } from "@azure-rest/batch";
const response = await client.path("/jobs/{jobId}", "<job-id>").get();
if (isUnexpected(response)) {
  throw new Error(`Failed to get job: ${response.body.message}`);
}
console.log(`Response status code: ${response.status}`);

const job = response.body;
console.log(`Job id: ${job.id}, state: ${job.state}`);
```

## Error Handling

Previously in `@azure/batch`, the client operation succeeded only when the service returned the expected HTTP status code, for example `201` for create resource operations or `200` for general HTTP GET requests. Unexpected HTTP status codes would throw a `RestError` from the `@azure/ms-rest-js` package. The following example demonstrates how to handle different errors that might occur in the get pool request.

```typescript
import { RestError } from "@azure/ms-rest-js";

try {
  const pool = await client.pool.get("<pool-id>");
  console.log("Get pool success: ", pool);
} catch (error) {
  if (error instanceof RestError) {
    // Returned HTTP status is not 200
    console.log(`Service returned unexpected status code ${error.statusCode}: ${error.body}`);
  } else {
    // Other errors like connection errors or other exceptions
    console.log("Failed to get pool with error: ", error);
  }
}
```

Now, for `@azure-rest/batch`, the client operation won't throw errors even when the returned HTTP status code is unexpected. Instead, it exports a helper method `isUnexpected` to help you check if the response is unexpected. The following example demonstrates how to handle different errors that might occur in the get pool request.

```typescript
try {
  const response = await client.path("/pools/{poolId}", "<pool-id>").get();
  if (isUnexpected(response)) {
    // Returned HTTP status is not 200
    console.log(`Service returned unexpected status code ${response.status}: ${response.body}`);
  }
  {
    console.log("Get pool success: ", response.body);
  }
} catch (error) {
  // Other errors like connection errors or other exceptions
  console.log("Failed to get pool with error: ", error);
}
```

## More Examples

### Create Pools

Previously in `@azure/batch`, you could use the `BatchServiceClient` instance to create a pool with the `pool.add` method. The following example demonstrates how to create a pool with the `BatchServiceClient` instance.

```typescript
import { BatchServiceModels } from "@azure/batch";
import { RestError } from "@azure/ms-rest-js";
const poolParams: BatchServiceModels.PoolAddParameter = {
  id: "<pool-name>",
  vmSize: "Standard_D1_v2",
  virtualMachineConfiguration: {
    nodeAgentSKUId: "batch.node.windows amd64",
    imageReference: {
      publisher: "microsoftwindowsserver",
      offer: "windowsserver",
      sku: "2022-datacenter",
    },
  },
  networkConfiguration: {
    enableAcceleratedNetworking: true,
  },
  targetDedicatedNodes: 1,
};
const result = await client.pool.add(poolParams);
console.log("Pool created");
```

Now in `@azure-rest/batch`, you can use the `path` method of the client instance to send a POST request to the `/pools` endpoint with the pool parameters. Note that the `CreatePoolParameters` interface has a `body` field to hold the request body and a `contentType` field to specify the content type of the request.

```typescript
import { CreatePoolParameters, isUnexpected } from "@azure-rest/batch";

const poolParams: CreatePoolParameters = {
  body: {
    id: "<pool-name>",
    vmSize: "Standard_D1_v2",
    virtualMachineConfiguration: {
      nodeAgentSKUId: "batch.node.windows amd64",
      imageReference: {
        publisher: "microsoftwindowsserver",
        offer: "windowsserver",
        sku: "2022-datacenter",
      },
    },
    networkConfiguration: {
      enableAcceleratedNetworking: true,
    },
    targetDedicatedNodes: 1,
  },
  contentType: "application/json; odata=minimalmetadata",
};

const result = await client.path("/pools").post(poolParams);
if (isUnexpected(result)) {
  throw new Error(`Failed to create pool: ${result.body.message}`);
}
console.log("Pool created");
```

## Create jobs

Previously in `@azure/batch`, you could use the `BatchServiceClient` instance to create a job with the `job.add` method. The following example demonstrates how to create a job with the `BatchServiceClient` instance.

```typescript
import { BatchServiceModels } from "@azure/batch";
const jobAddParam: BatchServiceModels.JobAddParameter = {
  id: "<job-id>",
  poolInfo: { poolId: "<pool-id>" },
};
const result = await client.job.add(JobAddParameter);
console.log("Job created");
```

Now in `@azure-rest/batch`, you can use the `path` method of the client instance to send a POST request to the `/jobs` endpoint with the job parameters.

```typescript
import { CreateJobParameters, isUnexpected } from "@azure-rest/batch";

const jobAddParam: CreateJobParameters = {
  body: {
    id: "<job-id>",
    poolInfo: { poolId: "<pool-id>" },
  },
  contentType: "application/json; odata=minimalmetadata",
};

const result = await client.path("/jobs").post(jobAddParam);
if (isUnexpected(result)) {
  throw new Error(`Failed to create job: ${result.body.message}`);
}
console.log(`Job created`);
```

## Submit tasks

Previously in `@azure/batch`, you could use the `BatchServiceClient` instance to submit a task to a job with the `task.add` method. The following example demonstrates how to submit a task with the `BatchServiceClient` instance.

```typescript
import { BatchServiceModels } from "@azure/batch";
const taskAddParam: BatchServiceModels.TaskAddParameter = {
  id: "<task-id>",
  commandLine: "cmd /c echo hello",
};
const result = await client.task.add("<job-id>", taskAddParam);
console.log("Task submitted");
```

Now in `@azure-rest/batch`, you can use the `path` method of the client instance to send a POST request to the `/jobs/{jobId}/tasks` endpoint with the task parameters.

```typescript
import { CreateTaskParameters, isUnexpected } from "@azure-rest/batch";

const taskAddParam: CreateTaskParameters = {
  body: {
    id: "<task-id>",
    commandLine: "cmd /c echo hello",
  },
  contentType: "application/json; odata=minimalmetadata",
};

const result = await client.path("/jobs/{jobId}/tasks", "<job-id>").post(taskAddParam);
if (isUnexpected(result)) {
  throw new Error(`Failed to submit task: ${result.body.message}`);
}
console.log("Task submitted");
```
