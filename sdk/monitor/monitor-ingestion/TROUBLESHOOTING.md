# Troubleshooting Azure Monitor Ingestion client library issues

This troubleshooting guide contains instructions to diagnose frequently encountered issues while using the Azure Monitor Ingestion client library for JavaScript.

## Table of contents

- [General troubleshooting](#general-troubleshooting)
  - [Enable client logging](#enable-client-logging)
  - [Troubleshooting authentication issues with ingestion requests](#authentication-errors)
- [Troubleshooting logs ingestion](#troubleshooting-logs-ingestion)
  - [Troubleshooting authorization errors](#troubleshooting-authorization-errors)
  - [Troubleshooting missing logs](#troubleshooting-missing-logs)
  - [Troubleshooting slow logs upload](#troubleshooting-slow-logs-upload)

## General troubleshooting

### Enable client logging

To troubleshoot issues with the Azure Monitor Ingestion library, it's important to first enable logging to monitor the behavior of the application. The errors and warnings in the logs generally provide useful insights into what went wrong and sometimes include corrective actions to fix issues.

This library uses the [Azure Logger client library](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger) for logging. The Azure SDK client libraries for JavaScript allow you to enable logging with one of the following approaches:

- Through the `AZURE_LOG_LEVEL` environment variable
- At runtime by calling `setLogLevel` in the Azure Logger library

#### Logging via environment variable

To see a log of HTTP requests and responses:

1.  Set the `AZURE_LOG_LEVEL` environment variable to `info` in your _.env_ file:

```text
AZURE_LOG_LEVEL = info
```

2. Add the following code to the app:

   ```ts snippet:DotEnvSample
   import { config } from "dotenv";

   config({ path: ".env" });
   ```

#### Logging using setLogLevel

Alternatively, logging can be enabled at runtime by calling the Azure Logger library's `setLogLevel` function:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

**NOTE**: When logging the body of request and response, ensure they don't contain confidential information. We already sanitize headers like `Authorization` that contain secrets.

For detailed instructions on how to enable logs, see the [Azure Logger library docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

### Authentication errors

The Azure Monitor Ingestion library supports Azure Active Directory authentication. Credentials can be passed through the `LogsIngestionClient` constructor. To provide a valid credential, you can use the Azure Identity client library. For more information on getting started, see the [README](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-ingestion#authenticate-the-client) of the Azure Monitor Ingestion library. For more information on the various types of credentials supported in the Azure Identity library, see the [Azure Identity documentation](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest).

For more help on troubleshooting authentication errors, see the Azure Identity library [troubleshooting guide](https://aka.ms/azsdk/js/identity/troubleshoot).

## Troubleshooting logs ingestion

### Troubleshooting authorization errors

If you get an HTTP response error with status code 403 and error message similar to the following, it means that the provided credential has insufficient permissions to upload logs to the specified Data Collection Endpoint (DCE) and Data Collection Rule (DCR) ID.

```text
Upload failed: (OperationFailed) The authentication token provided does not have access to ingest data for the data collection rule with immutable Id...
```

To resolve this issue:

1. Check that the application or user making the request has sufficient permissions:
   - See this document to [manage access to data collection rule][dcr_role_permissions].
   - To ingest logs, ensure the user or service principal is assigned the **Monitoring Metrics Publisher** role for the DCR.
1. If the user or application is granted sufficient privileges to upload logs, ensure you're authenticating as that user/application. If you're authenticating using the [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#authenticating-with-defaultazurecredential), check the logs to verify that the credential used is the one you expected. To enable logging, see the [Enable client logging](#enable-client-logging) section.
1. The permissions may take up to 30 minutes to propagate. So, if the permissions were granted recently, retry after some time.

### Troubleshooting missing logs

When you send logs to Azure Monitor for ingestion, the request may succeed, but you may not see the data appearing in the designated Log Analytics workspace table as configured in the DCR. To investigate and resolve this issue, confirm that:

- You're using the correct DCE when creating the `LogsIngestionClient`. Using the wrong endpoint can result in data not being properly sent to the Log Analytics workspace.
- You're providing the correct DCR ID to the `upload` method. The DCR ID is an immutable identifier that determines the transformation rules applied to the uploaded logs and directs them to the appropriate Log Analytics workspace table.
- The custom table specified in the DCR exists in the Log Analytics workspace. Ensure that you provide the accurate name of the custom table to the upload method. Mismatched table names can lead to logs not being stored correctly.
- The logs you're sending adhere to the format expected by the DCR. The data should be in the form of a JSON object or array, structured according to the requirements specified in the DCR. Additionally, it's essential to encode the request body in UTF-8 to avoid any data transmission issues.

Keep in mind that data ingestion may take some time, especially if you're sending data to a specific table for the first time. In such cases, allow up to 15 minutes for the data to be fully ingested and available for querying and analysis.

### Troubleshooting slow logs upload

If you experience delays when uploading logs, it could be due to reaching service limits, which may trigger the rate limiter to throttle your client. To determine if your client has reached service limits, you can enable logging and check if the service is returning errors with an HTTP status code 429. For more information on service limits, see the [Azure Monitor service limits documentation][ingestion_service_limits].

To enable client logging and to troubleshoot this issue further, see the [Enable client logging](#enable-client-logging) section.

<!-- LINKS -->

[azure_core_config]: https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/core/azure-core/README.md#configurations
[data_collection_rule]: https://learn.microsoft.com/azure/azure-monitor/essentials/data-collection-rule-overview
[data_collection_rule_structure]: https://learn.microsoft.com/azure/azure-monitor/essentials/data-collection-rule-structure
[dcr_immutable_id]: https://learn.microsoft.com/azure/azure-monitor/logs/tutorial-logs-ingestion-portal#collect-information-from-the-dcr
[dcr_role_permissions]: https://learn.microsoft.com/azure/azure-monitor/logs/tutorial-logs-ingestion-portal#assign-permissions-to-the-dcr
[ingestion_service_limits]: https://learn.microsoft.com/azure/azure-monitor/service-limits#logs-ingestion-api
