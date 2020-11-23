# Azure Synapse Spark client library for JavaScript

Azure Synapse is a limitless analytics service that brings together enterprise data warehousing and Big Data analytics. It gives you the freedom to query data on your terms, using either serverless on-demand or provisioned resources—at scale. Azure Synapse brings these two worlds together with a unified experience to ingest, prepare, manage, and serve data for immediate BI and machine learning needs.If you would like to know more about Azure Synapse, you may want to review: [What is Azure Synapse?](https://docs.microsoft.com/azure/synapse-analytics/overview-what-is)

Azure Synapse Spark allows you to conveniently and quickly manage spark job under specified Synapse workspace.Including batch jobs, sesssions and statements.

Use the client library for Azure Synapse Spark to:

- Create, get, list and cancel spark jobs.
- Create, get, list and cancel spark session.
- Create, get, list and cancel spark statement under a specified spark session.

## Getting started

### Prerequisites:

You must have an [Azure subscription](https://azure.microsoft.com/free/),
[Synapse workspace resource](https://docs.microsoft.com/azure/synapse-analytics/get-started-create-workspace) and an [Apache Spark pool](https://docs.microsoft.com/azure/synapse-analytics/quickstart-create-apache-spark-pool-portal) to use this package.

### Installing

```bash
npm install @azure/synapse-spark
```

## Key concepts

Apache Spark for Azure Synapse deeply and seamlessly integrates Apache Spark--the most popular open source big data engine used for data preparation, data engineering, ETL, and machine learning.

### SparkClient

`SparkClient` is the primary interface for developers using this client library. It provides asynchronous methods to create/get/list/cancel spark jobs at specified spark pool.

## Examples

### Initialize `SparkClient`

Use workspace endpoint, Sparkpool name and client secret credential to initialize synapse spark client.

```TypeScript
import { SparkClient } from '@azure/synapse-spark';
import { ClientSecretCredential } from "@azure/identity";

const credential = await new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
);

const workspaceEndpoint = `https://${workspaceName}.dev.azuresynapse.net`;
const sparkpoolName = '<SPARK_POOL_NAME>';
const client = new SparkClient(workspaceEndpoint, sparkpoolName, credential);
```

### `Spark Bacth Job` creation

```typescript
let file: string =
  "abfss://${fileSystem}@${storageAccount}.dfs.core.windows.net/samples/java/wordcount/wordcount.jar";

let sparkBatchJob: SparkBatchJobOptions = {
  name: "SampleBatchJob",
  file: file,
  className: "WordCount",
  arguments: [
    "abfss://${fileSystem}@${storageAccount}.dfs.core.windows.net/samples/java/wordcount/shakespeare.txt",
    "abfss://${fileSystem}@${storageAccount}.dfs.core.windows.net/samples/java/wordcount/result/"
  ],
  driverMemory: "28g",
  driverCores: 4,
  executorMemory: "28g",
  executorCores: 4,
  executorCount: 2
};

let options: CreateSparkBatchJobOptions = {
  detailed: true
};

let createResult = await client.createSparkBatchJob(sparkBatchJob, options);
```

### `Spark Bacth Job` get/list/cancel

```typescript
// Get
let options: GetSparkBatchOptions = {
  detailed: true
};
let getResult = await client.getSparkBatch(batchId, options);

// List
let options: ListSparkBatchJobsOptions = {
  fromParam: batchId,
  size: size,
  detailed: true
};
let listResult = await client.listSparkBatchJobs(options);

// Cancel
client.cancelSparkBatchJob();
```

### `Spark Session` creation

```typescript
let sparkSession: SparkSessionOptions = {
  name: sessionName,
  executorCount: 2,
  driverCores: 4,
  driverMemory: "8g",
  executorCores: 4,
  executorMemory: "8g"
};
let options: CreateSparkSessionOptions = {
  detailed: true
};

let createResult = await client.createSparkSession(sparkSession, options);
```

### `Spark Session` get/list/cancel

```typescript
// Get
let options: GetSparkSessionOptions = {
  detailed: true
};
let getResult = await client.getSparkSession(sessionId, options);

// List
let options: ListSparkSessionsOptions = {
  fromParam: sessionId,
  size: size,
  detailed: true
};
let listResult = await client.listSparkSessions(options);

// Cancel
client.cancelSparkSession();
```

### `Spark Statement` creation

```typescript
let sparkStatement: sparkStatementOptions = {
  code: "<customer running code>",
  kind: "spark"
};

let createResult = await client.createSparkStatement(sessionId, sparkStatement);
```

### `Spark Statement` get/list/cancel

```typescript
// Get
let getResult = await client.getSparkStatement(sessionId, statementId);

// List
let listResult = await client.listSparkStatements(sessionId);

// Cancel
client.cancelSparkSession();
```

## Troubleshooting

## Next steps

- [Analyze with Apache Spark](https://docs.microsoft.com/azure/synapse-analytics/get-started-analyze-spark)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.
