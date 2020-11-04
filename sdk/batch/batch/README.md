## Azure BatchServiceClient SDK for JavaScript

This package contains an isomorphic SDK for BatchServiceClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/batch
```

### How to use

#### nodejs - Authentication, client creation and list application as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Authentication

1. Use `AzureCliCredentials` exported from `@azure/ms-rest-nodeauth`.
   **Please make sure to install Azure CLI and login using `az login`.**

```typescript
import { BatchServiceClient } from "@azure/batch";
import { AzureCliCredentials } from "@azure/ms-rest-nodeauth";

const batchEndpoint = process.env["AZURE_BATCH_ENDPOINT"] || "";
async function main(): Promise<void> {
  try {
    const creds = await AzureCliCredentials.create({ resource: "https://batch.core.windows.net/" });
    const client = new BatchServiceClient(creds, batchEndpoint);
  } catch (err) {
    console.log(err);
  }
}
```

2. Use the `BatchSharedKeyCredentials` exported from `@azure/batch`.

```typescript
import { BatchServiceClient, BatchSharedKeyCredentials } from "@azure/batch";

const batchAccountName = process.env["AZURE_BATCH_ACCOUNT_NAME"] || "";
const batchAccountKey = process.env["AZURE_BATCH_ACCOUNT_KEY"] || "";
const batchEndpoint = process.env["AZURE_BATCH_ENDPOINT"] || "";

async function main(): Promise<void> {
  try {
    const creds = new BatchSharedKeyCredentials(batchAccountName, batchAccountKey);
    const client = new BatchServiceClient(creds, batchEndpoint);
  } catch (err) {
    console.log(err);
  }
}
```

3. Use the `MSIVmTokenCredentials` exported from `@azure/ms-rest-nodeauth`.

```typescript
import { BatchServiceClient } from "@azure/batch";
import { loginWithVmMSI } from "@azure/ms-rest-nodeauth";

const batchEndpoint = process.env["AZURE_BATCH_ENDPOINT"] || "";

async function main(): Promise<void> {
  try {
    const creds = await loginWithVmMSI({
      resource: "https://batch.core.windows.net/"
    });
    const client = new BatchServiceClient(creds, batchEndpoint);
  } catch (err) {
    console.log(err);
  }
}
```

##### Sample code

```typescript
import { BatchServiceClient, BatchServiceModels, BatchSharedKeyCredentials } from "@azure/batch";

const batchAccountName = process.env["AZURE_BATCH_ACCOUNT_NAME"] || "";
const batchAccountKey = process.env["AZURE_BATCH_ACCOUNT_KEY"] || "";
const batchEndpoint = process.env["AZURE_BATCH_ENDPOINT"] || "";

const creds = new BatchSharedKeyCredentials(batchAccountName, batchAccountKey);
const client = new BatchServiceClient(creds, batchEndpoint);

const options: BatchServiceModels.JobListOptionalParams = {
  jobListOptions: { maxResults: 10 }
};

async function loop(res: BatchServiceModels.JobListResponse, nextLink?: string): Promise<void> {
  if (nextLink !== undefined) {
    const res1 = await client.job.listNext(nextLink);
    if (res1.length) {
      for (const item of res1) {
        res.push(item);
      }
    }
    return loop(res, res1.odatanextLink);
  }
  return Promise.resolve();
}

async function main(): Promise<void> {
  const result = await client.job.list(options);
  await loop(result, result.odatanextLink);
  console.dir(result, { depth: null, colors: true });
}

main().catch((err) => console.log("An error occurred: ", err));
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fbatch%2Fbatch%2FREADME.png)
