# Troubleshooting Azure Monitor Query client library issues

This troubleshooting guide contains instructions to diagnose frequently encountered issues while using the Azure Monitor Query client library for JavaScript.

## Table of contents

- [General troubleshooting](#general-troubleshooting)
  - [Enable client logging](#enable-client-logging)
  - [Troubleshooting authentication issues with logs and metrics query requests](#authentication-errors)
- [Troubleshooting logs query](#troubleshooting-logs-query)
  - [Troubleshooting insufficient access error](#troubleshooting-insufficient-access-error-for-logs-query)
  - [Troubleshooting invalid Kusto query](#troubleshooting-invalid-kusto-query)
  - [Troubleshooting empty log query results](#troubleshooting-empty-log-query-results)
  - [Troubleshooting server timeouts when executing logs query request](#troubleshooting-server-timeouts-when-executing-logs-query-request)
  - [Troubleshooting partially successful logs query requests](#troubleshooting-partially-successful-logs-query-requests)
- [Troubleshooting metrics query](#troubleshooting-metrics-query)
  - [Troubleshooting authorization failed error](#troubleshooting-authorization-failed-error-for-metrics-query)
  - [Troubleshooting unsupported granularity for metrics query](#troubleshooting-unsupported-granularity-for-metrics-query)

## General troubleshooting

### Enable client logging

To troubleshoot issues with Azure Monitor Query library, it's important to first enable logging to monitor the behavior of the application. The errors and warnings in the logs generally provide useful insights into what went wrong and sometimes include corrective actions to fix issues.

The Azure client libraries for JavaScript allow you to enable logging either through the environment variable or at runtime.

The following log levels are supported from most verbose to least verbose:
- verbose
- info
- warning
- error

When setting a log level, either programmatically or via the `AZURE_LOG_LEVEL` environment variable, any logs that are written using a log level equal to or less than the one you choose will be emitted.

For example, setting the log level to `warning` will cause all logs that have the log level `warning` or `error` to be emitted.

#### Logging via environment variable

To see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`.

```ts
require("dotenv").config({ path: ".env" });
```
#### Logging using setLogLevel()

Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

**NOTE**: When logging the body of request and response, please ensure that they do not contain confidential information.

For detailed instructions on how to enable logs, see the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

### Authentication errors

Azure Monitor Query supports Azure Active Directory authentication. Both `logsQueryClient` and `metricsQueryClient` have methods to set the `credential`. To provide a valid credential, you can use `@azure/identity` dependency. For more details on getting started, refer to the [README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/README.md#create-the-client) of Azure Monitor Query library. You can also refer to the [Azure Identity documentation](https://aka.ms/azsdk/js/identity/troubleshoot) for more details on the various types of credential supported in `@azure/identity`.

## Troubleshooting Logs Query

### Troubleshooting insufficient access error for logs query

If you get an HTTP error with status code 403 (Forbidden), it means that the provided credentials does not have sufficient permissions to query the workspace.

```json
 {
  "name": "RestError",
  "code": "InsufficientAccessError",
  "statusCode": 403,
  "request": {
    "url": "https://api.loganalytics.io/v1/workspaces/08e1f3a5-9cf2-47a4-94b6-285bf25dc4be/query",
    "headers": {
      "content-type": "application/json",
      "accept": "application/json",
      "prefer": "REDACTED",
      "accept-encoding": "gzip,deflate",
      "user-agent": "azsdk-js-monitor-query/1.0.1 azsdk-js-monitor-log-query/1.0.1 core-rest-pipeline/1.7.0 Node/v14.16.1 OS/(x64-Windows_NT-10.0.19044)",
      "x-ms-client-request-id": "56ee42f9-56f3-41ec-866c-bdfa7aa708a3",
      "authorization": "REDACTED",
      "content-length": "79"
    },
    "method": "POST",
    "timeout": 0,
    "disableKeepAlive": false,
    "streamResponseStatusCodes": {},
    "withCredentials": false,
    "requestId": "56ee42f9-56f3-41ec-866c-bdfa7aa708a3",
    "allowInsecureConnection": false,
    "enableBrowserStreams": false
  },
  "details": {
    "error": {
      "code": "InsufficientAccessError",
      "message": "The provided credentials have insufficient access to perform the requested operation",
      "correlationId": "1e1ad3fe-88ab-43a4-af9b-15e75b67d8a9"
    }
  },
  "message": "The provided credentials have insufficient access to perform the requested operation"
}
```

1. Check that the application or user that is making the request has sufficient permissions:
   - You can refer to this document to [manage access to workspaces](https://docs.microsoft.com/azure/azure-monitor/logs/manage-access#manage-access-using-workspace-permissions)
2. If the user or application is granted sufficient privileges to query the workspace, make sure you are
   authenticating as that user/application. If you are authenticating using the
   [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#authenticating-with-the-defaultazurecredential)
   then check the logs to verify that the credential used is the one you expected. To enable logging, see [enable
   client logging](#enable-client-logging) section above.

### Troubleshooting invalid Kusto query

If you get an HTTP error with status code 400 (Bad Request), you may have an error in your Kusto query and you will see an error message similar to the one below.

```json
{
  "name": "RestError",
  "code": "BadArgumentError",
  "statusCode": 400,
  "request": {
    "url": "https://api.loganalytics.io/v1/workspaces/598029db-4756-4768-87f3-d6d45ed0ebd7/query",
    "headers": {
      "content-type": "application/json",
      "accept": "application/json",
      "prefer": "REDACTED",
      "accept-encoding": "gzip,deflate",
      "user-agent": "azsdk-js-monitor-query/1.0.0 azsdk-js-monitor-log-query/1.0.0 core-rest-pipeline/1.7.0 Node/v14.16.1 OS/(x64-Windows_NT-10.0.19044)",
      "x-ms-client-request-id": "6b3ee80a-c21d-4ecf-ba62-59c6ab970c83",
      "authorization": "REDACTED",
      "content-length": "157"
    },
    "method": "POST",
    "timeout": 0,
    "disableKeepAlive": false,
    "streamResponseStatusCodes": {},
    "withCredentials": false,
    "requestId": "6b3ee80a-c21d-4ecf-ba62-59c6ab970c83",
    "allowInsecureConnection": false,
    "enableBrowserStreams": false
  },
  "details": {
    "error": {
      "code": "BadArgumentError",
      "message": "The request had some invalid properties",
      "innerError": {
        "code": "SyntaxError",
        "message": "A recognition error occurred in the query.",
        "innerError": {
          "code": "SYN0002",
          "message": "Query could not be parsed at 'string' on line [1,4]",
          "line": 1,
          "pos": 4,
          "token": "string"
        }
      },
      "correlationId": "611dc354-bb4e-442f-955c-7b9469ca7f84"
    }
  },
  "message": "The request had some invalid properties"
}
```

The error message may include the line number and position where the Kusto query has an error (line 2, position 244
in the above example). You may also refer to the [Kusto Query Language](https://docs.microsoft.com/azure/data-explorer/kusto/query) reference docs to learn more about querying logs using KQL.

### Troubleshooting empty log query results

If your Kusto query returns empty no logs, please validate the following:

- You have the right workspace ID
- You are setting the correct time interval for the query. Try expanding the time interval for your query to see if that
  returns any results.
- If your Kusto query also has a time interval, the query is evaluated for the intersection of the time interval in the
  query string and the time interval set in the `QueryTimeInterval` param provided the query API. The intersection of
  these time intervals may not have any logs. To avoid any confusion, it's recommended to remove any time interval in
  the Kusto query string and use `QueryTimeInterval` explicitly.

### Troubleshooting server timeouts when executing logs query request

Some complex Kusto queries can take a long time to complete and such queries are aborted by the
service if they run for more than 3 minutes. For such scenarios, the query APIs on `LogsQueryClient`, provide options to
configure the timeout on the server. The server timeout can be extended up to 10 minutes.

You may see an error as follows:

```json
{
  "name": "RestError",
  "code": "GatewayTimeout",
  "statusCode": 504,
  "request": {
    "url": "https://api.loganalytics.io/v1/workspaces/598029db-4756-4768-87f3-d6d45ed0ebd7/query",
    "headers": {
      "content-type": "application/json",
      "accept": "application/json",
      "prefer": "REDACTED",
      "accept-encoding": "gzip,deflate",
      "user-agent": "azsdk-js-monitor-query/1.0.1 azsdk-js-monitor-log-query/1.0.1 core-rest-pipeline/1.7.0 Node/v14.16.1 OS/(x64-Windows_NT-10.0.19044)",
      "x-ms-client-request-id": "b3269277-18d7-4971-9eb8-4a2259bc8576",
      "authorization": "REDACTED",
      "content-length": "76"
    },
    "method": "POST",
    "timeout": 0,
    "disableKeepAlive": false,
    "streamResponseStatusCodes": {},
    "withCredentials": false,
    "requestId": "b3269277-18d7-4971-9eb8-4a2259bc8576",
    "allowInsecureConnection": false,
    "enableBrowserStreams": false
  },
  "details": {
    "error": {
      "code": "GatewayTimeout",
      "message": "Gateway timeout",
      "innerError": {
        "code": "GatewayTimeout",
        "message": "Kusto query timed out"
      },
      "correlationId": "2572d63e-99ae-4d3c-92d0-032ba7651ed3"
    }
  },
  "message": "Gateway timeout"
}
![image](https://user-images.githubusercontent.com/8968058/161323749-3b8810a3-85a3-4f47-9527-283c27b8b396.png)

```

The following code shows a sample on how to set the server timeout to 10 minutes. Note that by setting this server
timeout, the Azure Monitor Query library will automatically also extend the client timeout to wait for 10 minutes for
the server to respond. You don't need to configure your HTTP client to extend the response timeout as shown in the
previous section.

```ts
import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient } from "@azure/monitor-query";

const credential = new DefaultAzureCredential();
const logsQueryClient = new LogsQueryClient(credential);
const result = await logsQueryClient.queryWorkspace(
        monitorWorkspaceId,
        kustoQuery,
        { duration: Durations.oneHour },
        {serverTimeoutInSeconds: 600}
        );
```

### Troubleshooting partially successful logs query requests

By default, if the execution of a Kusto query resulted in a partially successful response, the Azure Monitor Query
client library will return the result of type `LogsQueryPartialResult` with the `status` field of `result` object set to `PartialFailure` to indicate to the user that the query was not fully successful. In case of multiple queries, when the results from all queries aren't successful, the `status` field of `result` object may be set to `Failure`.

In case of single query, there can be only two possibilities for the value of `status` field of `result` object - `Success` or `PartialFailure`. You can access the details of the partially successful results by the following code snippet -

```ts
const result = await logsQueryClient.queryWorkspace(${azureLogAnalyticsWorkspaceId}, ${kustoQuery}, {
    duration: ${duration}
  });

  if (result.status === LogsQueryResultStatus.Success) {
    const tablesFromResult: LogsTable[] = result.tables;

    if (tablesFromResult.length === 0) {
      console.log(`No results for query '${kustoQuery}'`);
      return;
    }
    console.log(`This query has returned table(s) - `);
    processTables(tablesFromResult);
  } else {
    console.log(`Error processing the query '${kustoQuery}' - ${result.partialError}`);
    if (result.partialTables.length > 0) {
      console.log(`This query has also returned partial data in the following table(s) - `);
      processTables(result.partialTables);
    }
  }
```
More details on the hierarchy of the response for single query can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/README.md#handle-logs-query-response)

In case of multiple queries, there can be three possibilities for the value of `status` field of `result` object - `Success`, `PartialFailure` or `Failure`. You can access the details of the partially successful results by the following code snippet -

```ts
async function processBatchResult(result: LogsQueryBatchResult) {
  let i = 0;
  for (const response of result) {
    console.log(`Results for query with query: ${queriesBatch[i]}`);
    if (response.status === LogsQueryResultStatus.Success) {
      console.log(
        `Printing results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`
      );
      processTables(response.tables);
    } else if (response.status === LogsQueryResultStatus.PartialFailure) {
      console.log(
        `Printing partial results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`
      );
      processTables(response.partialTables);
      console.log(
        ` Query had errors:${response.partialError.message} with code ${response.partialError.code}`
      );
    } else {
      console.log(`Printing errors from query '${queriesBatch[i].query}'`);
      console.log(` Query had errors:${response.message} with code ${response.code}`);
    }
    // next query
    i++;
  }
}
```
More details on the hierarchy of the response for multiple queries can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/README.md#handle-logs-batch-query-response)

## Troubleshooting Metrics Query

### Troubleshooting authorization failed error for metrics query

If you get an HTTP error with status code 403 (Forbidden), it means that the provided credentials does not have
sufficient permissions to query the workspace.

```json
{
  "name": "RestError",
  "code": "AuthorizationFailed",
  "statusCode": 403,
  "request": {
    "url": "https://management.azure.com//subscriptions/2cd617ea-1866-46b1-90e3-fffb087ebf9b/resourceGroups/metrics-advisor/providers/Microsoft.CognitiveServices/accounts/js-metrics-advisor/providers/Microsoft.Insights/metricDefinitions?api-version=2018-01-01",
    "headers": {
      "accept": "application/json",
      "accept-encoding": "gzip,deflate",
      "user-agent": "azsdk-js-monitor-query/1.0.1 azsdk-js-monitor-metrics-definitions/1.0.1 core-rest-pipeline/1.7.0 Node/v14.16.1 OS/(x64-Windows_NT-10.0.19044)",
      "x-ms-client-request-id": "66dbf2ce-390c-4f9a-ae7f-a5ee3869ab8d",
      "authorization": "REDACTED"
    },
    "method": "GET",
    "timeout": 0,
    "disableKeepAlive": false,
    "streamResponseStatusCodes": {},
    "withCredentials": false,
    "requestId": "66dbf2ce-390c-4f9a-ae7f-a5ee3869ab8d",
    "allowInsecureConnection": false,
    "enableBrowserStreams": false
  },
  "details": {
    "error": {
      "code": "AuthorizationFailed",
      "message": "The client 'c7074f99-78cc-49d5-8973-5f61b5fdf2f0' with object id 'c7074f99-78cc-49d5-8973-5f61b5fdf2f0' does not have authorization to perform action 'Microsoft.Insights/metricDefinitions/read' over scope '/subscriptions/2cd617ea-1866-46b1-90e3-fffb087ebf9b/resourceGroups/metrics-advisor/providers/Microsoft.CognitiveServices/accounts/js-metrics-advisor/providers/Microsoft.Insights' or the scope is invalid. If access was recently granted, please refresh your credentials."
    }
  },
  "message": "The client 'c7074f99-78cc-49d5-8973-5f61b5fdf2f0' with object id 'c7074f99-78cc-49d5-8973-5f61b5fdf2f0' does not have authorization to perform action 'Microsoft.Insights/metricDefinitions/read' over scope '/subscriptions/2cd617ea-1866-46b1-90e3-fffb087ebf9b/resourceGroups/metrics-advisor/providers/Microsoft.CognitiveServices/accounts/js-metrics-advisor/providers/Microsoft.Insights' or the scope is invalid. If access was recently granted, please refresh your credentials."
}![image](https://user-images.githubusercontent.com/8968058/161322403-a02f8e08-322c-43ef-899b-081e316253b7.png)

```

1. Check that the application or user that is making the request has sufficient permissions:
   - You can refer to this document to [manage access to workspaces](https://docs.microsoft.com/azure/azure-monitor/logs/manage-access#manage-access-using-workspace-permissions)
2. If the user or application is granted sufficient privileges to query the workspace, make sure you're authenticating as that user/application. If you're authenticating using the [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/identity/azure-identity/README.md#authenticating-with-defaultazurecredential), check the logs to verify that the credential used is the one you expected. To enable logging, see the [Enable client logging](#enable-client-logging) section.

### Troubleshooting unsupported granularity for metrics query

If you notice the following exception, this is due to an invalid time granularity in the metrics query request. Your query might look something like the following, where `MetricsQueryOptions().setGranularity()` is set to an unsupported duration.

```json
{
  "name": "RestError",
  "code": "BadRequest",
  "statusCode": 400,
  "request": {
    "url": "https://management.azure.com//subscriptions/2cd617ea-1866-46b1-90e3-fffb087ebf9b/resourceGroups/metrics-advisor/providers/Microsoft.CognitiveServices/accounts/js-metrics-advisor/providers/Microsoft.Insights/metrics?timespan=REDACTED&interval=REDACTED&metricnames=REDACTED&api-version=2018-01-01",
    "headers": {
      "accept": "application/json",
      "accept-encoding": "gzip,deflate",
      "user-agent": "azsdk-js-monitor-query/1.0.0 azsdk-js-monitor-metrics/1.0.0 core-rest-pipeline/1.7.0 Node/v14.16.1 OS/(x64-Windows_NT-10.0.19044)",
      "x-ms-client-request-id": "684a29a9-b01d-41e8-8ba1-98b49a6d6577",
      "authorization": "REDACTED"
    },
    "method": "GET",
    "timeout": 0,
    "disableKeepAlive": false,
    "streamResponseStatusCodes": {},
    "withCredentials": false,
    "requestId": "684a29a9-b01d-41e8-8ba1-98b49a6d6577",
    "allowInsecureConnection": false,
    "enableBrowserStreams": false
  },
  "details": {
    "code": "BadRequest",
    "message": "Invalid time grain duration: PT2M, supported ones are: PT1M,PT5M,PT15M,PT30M,PT1H,PT6H,PT12H,P1D,"
  },
  "message": "Invalid time grain duration: PT2M, supported ones are: PT1M,PT5M,PT15M,PT30M,PT1H,PT6H,PT12H,P1D,"
}
```

As documented in the error message, the supported granularity for metrics queries are 1 minute, 5 minutes, 15 minutes,
30 minutes, 1 hour, 6 hours, 12 hours and 1 day.
