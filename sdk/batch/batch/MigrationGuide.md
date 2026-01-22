<!-- dev-tool snippets ignore -->

# Guide for migrating to `@azure/batch` v13 from v12

This guide is intended to assist customers in migrating to version 13.x of the `@azure/batch` package from version 12.x. It will focus on side-by-side comparisons of similar operations between the two versions.

## Table of Contents

- [Migration Benefits](#migration-benefits)
- [Constructing the Clients](#constructing-the-clients)
  - [Authenticate with Shared Key Credentials](#authenticate-with-shared-key-credentials)
  - [Authenticate with Microsoft Entra ID](#authenticate-with-microsoft-entra-id)
- [Paging Operations](#paging-operations)
- [Long-Running Operations](#long-running-operations)
- [Error Handling](#error-handling)
- [Operation Mapping](#operation-mapping)
- [More Examples](#more-examples)
  - [Create Pools](#create-pools)
  - [Create Jobs](#create-jobs)
  - [Submit Tasks](#submit-tasks)

## Migration Benefits

- Reduced package size: Version 13.x is a modular client built on top of the [REST client](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md), which is more lightweight compared to version 12.x. It provides an idiomatic API surface that is easy to use, while maintaining the reduced bundle size of the underlying REST client. The bundle size is reduced by approximately 52% (from ~66KB down to ~32KB gzipped with dependencies).

- Embrace the latest Azure JavaScript SDK ecosystem: Works with [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) for simpler and more secure authentication. Also leverages common paging and logging utilities used by all Azure SDK clients.

- Browser support with Microsoft Entra ID: Version 13.x supports browser environments when authenticating with Microsoft Entra ID credentials, while version 12.x only supported Node.js environments.

- Get the latest features of the Azure Batch service: Version 12.x is scheduled for deprecation and may not support new features and API versions of the service as they become available.

## Constructing the Clients

### Authenticate with Shared Key Credentials

Both versions support shared key authentication.

Previously in version 12.x, you could use the `BatchSharedKeyCredentials` class exported from `@azure/batch` to construct a shared key credential, then pass the credential and account endpoint to the `BatchServiceClient` constructor to create a client instance.

```typescript
import { BatchSharedKeyCredentials, BatchServiceClient } from "@azure/batch";

const credential = new BatchSharedKeyCredentials("<account-name>", "<account-key>");
const client = new BatchServiceClient(credential, "<account-endpoint>");
```

Now in version 13.x, you need to install the [`@azure/core-auth`](https://www.npmjs.com/package/@azure/core-auth) package and use the `AzureNamedKeyCredential` class exported from `@azure/core-auth` to construct a shared key credential. Then, pass the endpoint and credential to the `BatchClient` constructor to create a client instance. Note that shared key authentication is only supported in Node.js environments.

```typescript
import { AzureNamedKeyCredential } from "@azure/core-auth";
import { BatchClient } from "@azure/batch";

const credential = new AzureNamedKeyCredential("<account-name>", "<account-key>");
const client = new BatchClient("<account-endpoint>", credential);
```

### Authenticate with Microsoft Entra ID

Previously in version 12.x, only the legacy [@azure/ms-rest-nodeauth](https://www.npmjs.com/package/@azure/ms-rest-nodeauth) package was supported, and browser environments were not supported. The following example uses the `loginWithVmMSI` method exported from `@azure/ms-rest-nodeauth` to authenticate with the Azure Batch service using MSI (Managed Service Identity) based login from a virtual machine created in Azure.

```typescript
import { BatchServiceClient } from "@azure/batch";
import { loginWithVmMSI } from "@azure/ms-rest-nodeauth";

const credential = await loginWithVmMSI({
  resource: "https://batch.core.windows.net/",
});
const client = new BatchServiceClient(credential, "<account-endpoint>");
```

Now in version 13.x, you can pass any of the [credentials from the `@azure/identity` package](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md) to the `BatchClient` constructor to make use of your Microsoft Entra ID credentials. In the following sample, it creates an instance of [`DefaultAzureCredential`](https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential) to authenticate with the Azure Batch service.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { BatchClient } from "@azure/batch";

const credential = new DefaultAzureCredential();
const client = new BatchClient("<account-endpoint>", credential);
```

## Paging Operations

Previously in version 12.x, listing operations returned a promise of an array.

```typescript
const pools = await client.pool.list();
for (const pool of pools) {
  console.log(`Pool: ${pool.id}`);
}
```

Now in version 13.x, listing operations return `PagedAsyncIterableIterator` for efficient iteration over large result sets.

```typescript
import { BatchClient } from "@azure/batch";

const pools = client.listPools();
for await (const pool of pools) {
  console.log(`Pool: ${pool.id}`);
}
```

## Long-Running Operations

Version 13.x provides built-in support for long-running operations (LRO) through polling methods. For operations like deleting pools or jobs, you can use the `beginXxxAndWait` pattern.

```typescript
import { BatchClient } from "@azure/batch";

// Delete a pool and wait for completion
await client.beginDeletePoolAndWait("<pool-id>");
console.log("Pool deleted");

// Delete a job and wait for completion
await client.beginDeleteJobAndWait("<job-id>");
console.log("Job deleted");

// Terminate a job and wait for completion
await client.beginTerminateJobAndWait("<job-id>");
console.log("Job terminated");

// Resize a pool and wait for completion
await client.beginResizePoolAndWait("<pool-id>", {
  targetDedicatedNodes: 5,
});
console.log("Pool resized");
```

## Error Handling

Previously in version 12.x, unexpected HTTP status codes would throw a `RestError` from the `@azure/ms-rest-js` package. The following example demonstrates how to handle different errors that might occur in the get pool request.

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

Now in version 13.x, error handling follows the standard Azure SDK pattern. Unexpected HTTP status codes will cause a `RestError` to be thrown from `@azure/core-rest-pipeline`. The following example demonstrates how to handle different errors that might occur in the get pool request.

```typescript
import { RestError } from "@azure/core-rest-pipeline";

try {
  const pool = await client.getPool("<pool-id>");
  console.log("Get pool success: ", pool);
} catch (error) {
  if (error instanceof RestError) {
    // Returned HTTP status is not 200
    console.log(`Service returned unexpected status code ${error.statusCode}: ${error.message}`);
  } else {
    // Other errors like connection errors or other exceptions
    console.log("Failed to get pool with error: ", error);
  }
}
```

## Operation Mapping

The following table maps the old operation names from version 12.x to the new method names in version 13.x.

> **Note:** Operations marked with `*` are long-running operations (LRO) and use the `begin...AndWait` pattern in version 13.x.

### Pool Operations

| Old Method (v12) | New Method (v13) |
| --- | --- |
| `client.pool.add(pool)` | `client.createPool(pool)` |
| `client.pool.list()` | `client.listPools()` |
| `client.pool.get(poolId)` | `client.getPool(poolId)` |
| `client.pool.deleteMethod(poolId)` | `client.beginDeletePoolAndWait(poolId)` * |
| `client.pool.exists(poolId)` | `client.poolExists(poolId)` |
| `client.pool.patch(poolId, params)` | `client.updatePool(poolId, pool)` |
| `client.pool.updateProperties(poolId, params)` | `client.replacePoolProperties(poolId, pool)` |
| `client.pool.disableAutoScale(poolId)` | `client.disablePoolAutoScale(poolId)` |
| `client.pool.enableAutoScale(poolId, params)` | `client.enablePoolAutoScale(poolId, enableAutoScaleOptions)` |
| `client.pool.evaluateAutoScale(poolId, formula)` | `client.evaluatePoolAutoScale(poolId, evaluateAutoScaleOptions)` |
| `client.pool.resize(poolId, params)` | `client.beginResizePoolAndWait(poolId, resizeOptions)` * |
| `client.pool.stopResize(poolId)` | `client.beginStopPoolResizeAndWait(poolId)` * |
| `client.pool.removeNodes(poolId, params)` | `client.beginRemoveNodesAndWait(poolId, removeOptions)` * |
| `client.pool.listUsageMetrics()` | `client.listPoolUsageMetrics()` |

### Job Operations

| Old Method (v12) | New Method (v13) |
| --- | --- |
| `client.job.add(job)` | `client.createJob(job)` |
| `client.job.list()` | `client.listJobs()` |
| `client.job.get(jobId)` | `client.getJob(jobId)` |
| `client.job.deleteMethod(jobId)` | `client.beginDeleteJobAndWait(jobId)` * |
| `client.job.patch(jobId, params)` | `client.updateJob(jobId, job)` |
| `client.job.update(jobId, params)` | `client.replaceJob(jobId, job)` |
| `client.job.disable(jobId, disableTasks)` | `client.beginDisableJobAndWait(jobId, disableOptions)` * |
| `client.job.enable(jobId)` | `client.beginEnableJobAndWait(jobId)` * |
| `client.job.terminate(jobId)` | `client.beginTerminateJobAndWait(jobId)` * |
| `client.job.listFromJobSchedule(scheduleId)` | `client.listJobsFromSchedule(scheduleId)` |
| `client.job.listPreparationAndReleaseTaskStatus(jobId)` | `client.listJobPreparationAndReleaseTaskStatus(jobId)` |
| `client.job.getTaskCounts(jobId)` | `client.getJobTaskCounts(jobId)` |

### Job Schedule Operations

| Old Method (v12) | New Method (v13) |
| --- | --- |
| `client.jobSchedule.add(schedule)` | `client.createJobSchedule(jobSchedule)` |
| `client.jobSchedule.list()` | `client.listJobSchedules()` |
| `client.jobSchedule.get(scheduleId)` | `client.getJobSchedule(jobScheduleId)` |
| `client.jobSchedule.deleteMethod(scheduleId)` | `client.beginDeleteJobScheduleAndWait(jobScheduleId)` * |
| `client.jobSchedule.exists(scheduleId)` | `client.jobScheduleExists(jobScheduleId)` |
| `client.jobSchedule.patch(scheduleId, params)` | `client.updateJobSchedule(jobScheduleId, jobSchedule)` |
| `client.jobSchedule.update(scheduleId, params)` | `client.replaceJobSchedule(jobScheduleId, jobSchedule)` |
| `client.jobSchedule.disable(scheduleId)` | `client.disableJobSchedule(jobScheduleId)` |
| `client.jobSchedule.enable(scheduleId)` | `client.enableJobSchedule(jobScheduleId)` |
| `client.jobSchedule.terminate(scheduleId)` | `client.beginTerminateJobScheduleAndWait(jobScheduleId)` * |

### Task Operations

| Old Method (v12) | New Method (v13) |
| --- | --- |
| `client.task.add(jobId, task)` | `client.createTask(jobId, task)` |
| `client.task.list(jobId)` | `client.listTasks(jobId)` |
| `client.task.get(jobId, taskId)` | `client.getTask(jobId, taskId)` |
| `client.task.deleteMethod(jobId, taskId)` | `client.deleteTask(jobId, taskId)` |
| `client.task.update(jobId, taskId, params)` | `client.replaceTask(jobId, taskId, task)` |
| `client.task.addCollection(jobId, tasks)` | `client.createTaskCollection(jobId, taskCollection)` |
| `client.task.listSubtasks(jobId, taskId)` | `client.listSubTasks(jobId, taskId)` |
| `client.task.terminate(jobId, taskId)` | `client.terminateTask(jobId, taskId)` |
| `client.task.reactivate(jobId, taskId)` | `client.reactivateTask(jobId, taskId)` |

### Compute Node Operations

| Old Method (v12) | New Method (v13) |
| --- | --- |
| `client.computeNode.list(poolId)` | `client.listNodes(poolId)` |
| `client.computeNode.get(poolId, nodeId)` | `client.getNode(poolId, nodeId)` |
| `client.computeNode.addUser(poolId, nodeId, user)` | `client.createNodeUser(poolId, nodeId, user)` |
| `client.computeNode.deleteUser(poolId, nodeId, userName)` | `client.deleteNodeUser(poolId, nodeId, userName)` |
| `client.computeNode.updateUser(poolId, nodeId, userName, params)` | `client.replaceNodeUser(poolId, nodeId, userName, updateOptions)` |
| `client.computeNode.reboot(poolId, nodeId)` | `client.beginRebootNodeAndWait(poolId, nodeId)` * |
| `client.computeNode.reimage(poolId, nodeId)` | `client.beginReimageNodeAndWait(poolId, nodeId)` * |
| `client.computeNode.disableScheduling(poolId, nodeId)` | `client.disableNodeScheduling(poolId, nodeId)` |
| `client.computeNode.enableScheduling(poolId, nodeId)` | `client.enableNodeScheduling(poolId, nodeId)` |
| `client.computeNode.deallocate(poolId, nodeId)` | `client.beginDeallocateNodeAndWait(poolId, nodeId)` * |
| `client.computeNode.start(poolId, nodeId)` | `client.beginStartNodeAndWait(poolId, nodeId)` * |
| `client.computeNode.getRemoteLoginSettings(poolId, nodeId)` | `client.getNodeRemoteLoginSettings(poolId, nodeId)` |
| `client.computeNode.uploadBatchServiceLogs(poolId, nodeId, config)` | `client.uploadNodeLogs(poolId, nodeId, uploadOptions)` |

### Compute Node Extension Operations

| Old Method (v12) | New Method (v13) |
| --- | --- |
| `client.computeNodeExtension.list(poolId, nodeId)` | `client.listNodeExtensions(poolId, nodeId)` |
| `client.computeNodeExtension.get(poolId, nodeId, extName)` | `client.getNodeExtension(poolId, nodeId, extensionName)` |

### File Operations

| Old Method (v12) | New Method (v13) |
| --- | --- |
| `client.file.deleteFromTask(jobId, taskId, filePath)` | `client.deleteTaskFile(jobId, taskId, filePath)` |
| `client.file.getFromTask(jobId, taskId, filePath)` | `client.getTaskFile(jobId, taskId, filePath)` |
| `client.file.getPropertiesFromTask(jobId, taskId, filePath)` | `client.getTaskFileProperties(jobId, taskId, filePath)` |
| `client.file.listFromTask(jobId, taskId)` | `client.listTaskFiles(jobId, taskId)` |
| `client.file.deleteFromComputeNode(poolId, nodeId, filePath)` | `client.deleteNodeFile(poolId, nodeId, filePath)` |
| `client.file.getFromComputeNode(poolId, nodeId, filePath)` | `client.getNodeFile(poolId, nodeId, filePath)` |
| `client.file.getPropertiesFromComputeNode(poolId, nodeId, filePath)` | `client.getNodeFileProperties(poolId, nodeId, filePath)` |
| `client.file.listFromComputeNode(poolId, nodeId)` | `client.listNodeFiles(poolId, nodeId)` |

### Application Operations

| Old Method (v12) | New Method (v13) |
| --- | --- |
| `client.application.list()` | `client.listApplications()` |
| `client.application.get(applicationId)` | `client.getApplication(applicationId)` |

### Account Operations

| Old Method (v12) | New Method (v13) |
| --- | --- |
| `client.account.listSupportedImages()` | `client.listSupportedImages()` |
| `client.account.listPoolNodeCounts()` | `client.listPoolNodeCounts()` |

## More Examples

### Create Pools

Previously in `@azure/batch`, you could use the `BatchServiceClient` instance to create a pool with the `pool.add` method. The following example demonstrates how to create a pool with the `BatchServiceClient` instance.

```typescript
import { BatchServiceModels } from "@azure/batch";

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

Now in `@azure/batch`, you can use the `createPool` method directly on the client instance with a `BatchPoolCreateOptions` object.

```typescript
import { BatchClient, BatchPoolCreateOptions } from "@azure/batch";

const poolParams: BatchPoolCreateOptions = {
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

await client.createPool(poolParams);
console.log("Pool created");
```

### Create Jobs

Previously in `@azure/batch`, you could use the `BatchServiceClient` instance to create a job with the `job.add` method. The following example demonstrates how to create a job with the `BatchServiceClient` instance.

```typescript
import { BatchServiceModels } from "@azure/batch";

const jobAddParam: BatchServiceModels.JobAddParameter = {
  id: "<job-id>",
  poolInfo: { poolId: "<pool-id>" },
};
const result = await client.job.add(jobAddParam);
console.log("Job created");
```

Now in `@azure/batch`, you can use the `createJob` method directly on the client instance with a `BatchJobCreateOptions` object.

```typescript
import { BatchClient, BatchJobCreateOptions } from "@azure/batch";

const jobAddParam: BatchJobCreateOptions = {
  id: "<job-id>",
  poolInfo: { poolId: "<pool-id>" },
};

await client.createJob(jobAddParam);
console.log("Job created");
```

### Submit Tasks

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

Now in `@azure/batch`, you can use the `createTask` method directly on the client instance with a `BatchTaskCreateOptions` object.

```typescript
import { BatchClient, BatchTaskCreateOptions } from "@azure/batch";

const taskAddParam: BatchTaskCreateOptions = {
  id: "<task-id>",
  commandLine: "cmd /c echo hello",
};

await client.createTask("<job-id>", taskAddParam);
console.log("Task submitted");
```
