# Azure Monitor Ingestion client library for JS

The Azure Monitor Ingestion client library is used to send custom logs to [Azure Monitor][azure_monitor_overview] using the [Logs Ingestion API][ingestion_overview].

This library allows you to send data from virtually any source to supported built-in tables or to custom tables that you create in Log Analytics workspace. You can even extend the schema of built-in tables with custom columns.

**Resources:**

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-ingestion/src)
- [Package (NPM)](https://www.npmjs.com/)
- [Service documentation][azure_monitor_overview]
- [Change log](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-ingestion/CHANGELOG.md)

## Getting started

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free)
- A [Data Collection Endpoint](https://learn.microsoft.com/azure/azure-monitor/essentials/data-collection-endpoint-overview)
- A [Data Collection Rule](https://learn.microsoft.com/azure/azure-monitor/essentials/data-collection-rule-overview)
- A [Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-workspace-overview)

### Install the package

Install the Azure Monitor Ingestion client library for JS with [npm](https://www.npmjs.com/):

```bash
npm install @azure/monitor-ingestion
```

### Authenticate the client

An authenticated client is required to ingest data. To authenticate, create an instance of a [TokenCredential](https://learn.microsoft.com/javascript/api/@azure/core-auth/tokencredential?view=azure-node-latest) class (see [@azure/identity](https://www.npmjs.com/package/@azure/identity) for `DefaultAzureCredential` and other `TokenCredential` implementations). Pass it to the constructor of your client class.

To authenticate, the following example uses `DefaultAzureCredential` from the [@azure/identity](https://www.npmjs.com/package/@azure/identity) package:

```ts
import { DefaultAzureCredential } from "@azure/identity";
import { LogsIngestionClient } from "@azure/monitor-ingestion";

import * as dotenv from "dotenv";
dotenv.config();

const logsIngestionEndpoint = process.env.LOGS_INGESTION_ENDPOINT || "logs_ingestion_endpoint";

const credential = new DefaultAzureCredential();
const logsIngestionClient = new LogsIngestionClient(logsIngestionEndpoint, credential);
```

## Key concepts

### Data Collection Endpoint

Data Collection Endpoints (DCEs) allow you to uniquely configure ingestion settings for Azure Monitor. [This
article][data_collection_endpoint] provides an overview of data collection endpoints including their contents and
structure and how you can create and work with them.

### Data Collection Rule

Data collection rules (DCR) define data collected by Azure Monitor and specify how and where that data should be sent or
stored. The REST API call must specify a DCR to use. A single DCE can support multiple DCRs, so you can specify a
different DCR for different sources and target tables.

The DCR must understand the structure of the input data and the structure of the target table. If the two don't match,
it can use a transformation to convert the source data to match the target table. You may also use the transform to
filter source data and perform any other calculations or conversions.

For more details, refer to [Data collection rules in Azure Monitor][data_collection_rule].For information on how to retrieve a DCR ID, see [this tutorial][data_collection_rule_tutorial].

### Log Analytics workspace tables

Custom logs can send data to any custom table that you create and to certain built-in tables in your Log Analytics
workspace. The target table must exist before you can send data to it. The following built-in tables are currently supported:

- [CommonSecurityLog](https://learn.microsoft.com/azure/azure-monitor/reference/tables/commonsecuritylog)
- [SecurityEvents](https://learn.microsoft.com/azure/azure-monitor/reference/tables/securityevent)
- [Syslog](https://learn.microsoft.com/azure/azure-monitor/reference/tables/syslog)
- [WindowsEvents](https://learn.microsoft.com/azure/azure-monitor/reference/tables/windowsevent)

## Examples

- [Upload custom logs](#upload-custom-logs)
- [Verify logs](#verify-logs)

You can familiarize yourself with different APIs using [Samples](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/monitor/Azure.Monitor.Ingestion/samples).

### Upload custom logs

You can create a client and call the client's `Upload` method. Take note of the data ingestion [limits](https://learn.microsoft.com/azure/azure-monitor/service-limits#custom-logs).

```js
const { isAggregateUploadLogsError, DefaultAzureCredential } = require("@azure/identity");
const { LogsIngestionClient } = require("@azure/monitor-ingestion");

require("dotenv").config();

async function main() {
  const logsIngestionEndpoint = process.env.LOGS_INGESTION_ENDPOINT || "logs_ingestion_endpoint";
  const ruleId = process.env.DATA_COLLECTION_RULE_ID || "data_collection_rule_id";
  const streamName = process.env.STREAM_NAME || "data_stream_name";
  const credential = new DefaultAzureCredential();
  const client = new LogsIngestionClient(logsIngestionEndpoint, credential);
  const logs = [
    {
      Time: "2021-12-08T23:51:14.1104269Z",
      Computer: "Computer1",
      AdditionalContext: "context-2",
    },
    {
      Time: "2021-12-08T23:51:14.1104269Z",
      Computer: "Computer2",
      AdditionalContext: "context",
    },
  ];
  try{
    await client.upload(ruleId, streamName, logs);
  }
  catch(e){
    let aggregateErrors = isAggregateUploadLogsError(e) ? e.errors : [];
    if (aggregateErrors.length > 0) {
      console.log("Some logs have failed to complete ingestion");
      for (const error of aggregateErrors) {
        console.log(`Error - ${JSON.stringify(error.cause)}`);
        console.log(`Log - ${JSON.stringify(error.failedLogs)}`);
      }
    } else {
      console.log(e);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

module.exports = { main };
```

### Verify logs

You can verify that your data has been uploaded correctly by using the [@azure/monitor-query](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/README.md#install-the-package) library. Run the [Upload custom logs](#upload-custom-logs) sample first before verifying the logs.

```js
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to run query against a Log Analytics workspace to verify if the logs were uploaded
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { LogsQueryClient } = require("@azure/monitor-query");

const monitorWorkspaceId = process.env.MONITOR_WORKSPACE_ID || "workspace_id";
const tableName = process.env.TABLE_NAME || "table_name";
require("dotenv").config();

async function main() {
  const credential = new DefaultAzureCredential();
  const logsQueryClient = new LogsQueryClient(credential);
  const queriesBatch = [
    {
      workspaceId: monitorWorkspaceId,
      query: tableName + " | count;",
      timespan: { duration: "P1D" },
    },
  ];

  const result = await logsQueryClient.queryBatch(queriesBatch);
  if (result[0].status === "Success") {
    console.log("Table entry count: ", JSON.stringify(result[0].tables));
  } else {
    console.log(
      `Some error encountered while retrieving the count. Status = ${result[0].status}`,
      JSON.stringify(result[0])
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

module.exports = { main };
```

### Uploading large batches of logs

When uploading more than 1MB of logs in a single call to the `upload` method on `LogsIngestionClient`, the upload will be split into several smaller batches, each no larger than 1MB. By default, these batches will be uploaded in parallel, with a maximum of 5 batches being uploaded concurrently. It may be desirable to decrease the maximum concurrency if memory usage is a concern. The maximum number of concurrent uploads can be controlled using the `maxConcurrency` option, as shown in this example:

```js
const { DefaultAzureCredential } = require("@azure/identity");
const { isAggregateUploadLogsError, LogsIngestionClient } = require("@azure/monitor-ingestion");

require("dotenv").config();

async function main() {
  const logsIngestionEndpoint = process.env.LOGS_INGESTION_ENDPOINT || "logs_ingestion_endpoint";
  const ruleId = process.env.DATA_COLLECTION_RULE_ID || "data_collection_rule_id";
  const streamName = process.env.STREAM_NAME || "data_stream_name";
  const credential = new DefaultAzureCredential();
  const client = new LogsIngestionClient(logsIngestionEndpoint, credential);

  // Constructing a large number of logs to ensure batching takes place
  const logs = [];
  for (let i = 0; i < 100000; ++i) {
    logs.push({
      Time: "2021-12-08T23:51:14.1104269Z",
      Computer: "Computer1",
      AdditionalContext: `context-${i}`,
    });
  }

  try{
    // Set the maximum concurrency to 1 to prevent concurrent requests entirely
    await client.upload(ruleId, streamName, logs, { maxConcurrency: 1 });
  }
  catch(e){
    let aggregateErrors = isAggregateUploadLogsError(e) ? e.errors : [];
    if (aggregateErrors.length > 0) {
      console.log("Some logs have failed to complete ingestion");
      for (const error of aggregateErrors) {
        console.log(`Error - ${JSON.stringify(error.cause)}`);
        console.log(`Log - ${JSON.stringify(error.failedLogs)}`);
      }
    } else {
      console.log(e);
    }
  }
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

module.exports = { main };
```

### Retrieve logs

Logs uploaded using the Monitor Ingestion client library can be retrieved using the [Monitor Query client library][monitor_query].

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. To see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For detailed instructions on how to enable logs, see the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

To learn more about Azure Monitor, see the [Azure Monitor service documentation][azure_monitor_overview]. Please take a look at the samples directory for detailed [examples][azure_monitor_samples] on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

<!-- LINKS -->

[azure_monitor_overview]: https://learn.microsoft.com/azure/azure-monitor/overview
[data_collection_endpoint]: https://learn.microsoft.com/azure/azure-monitor/essentials/data-collection-endpoint-overview
[data_collection_rule]: https://learn.microsoft.com/azure/azure-monitor/essentials/data-collection-rule-overview
[data_collection_rule_tutorial]: https://learn.microsoft.com/azure/azure-monitor/logs/tutorial-logs-ingestion-portal#collect-information-from-the-dcr
[ingestion_overview]: https://learn.microsoft.com/azure/azure-monitor/logs/logs-ingestion-api-overview
[azure_monitor_samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-ingestion/samples/v1-beta
[monitor_query]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-query

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/monitor/monitor-ingestion/README.png)
