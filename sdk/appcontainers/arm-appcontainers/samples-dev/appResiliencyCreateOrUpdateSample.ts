// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AppResiliency,
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update container app resiliency policy.
 *
 * @summary Create or update container app resiliency policy.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/AppResiliency_CreateOrUpdate.json
 */
async function createOrUpdateAppResiliency(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const appName = "testcontainerApp0";
  const name = "resiliency-policy-1";
  const resiliencyEnvelope: AppResiliency = {
    circuitBreakerPolicy: {
      consecutiveErrors: 5,
      intervalInSeconds: 10,
      maxEjectionPercent: 50,
    },
    httpConnectionPool: {
      http1MaxPendingRequests: 1024,
      http2MaxRequests: 1024,
    },
    httpRetryPolicy: {
      errors: [
        "5xx",
        "connect-failure",
        "reset",
        "retriable-headers",
        "retriable-status-codes",
      ],
      headers: [{ header: "X-Content-Type", prefixMatch: "GOATS" }],
      httpStatusCodes: [502, 503],
      initialDelayInMilliseconds: 1000,
      maxIntervalInMilliseconds: 10000,
      maxRetries: 5,
    },
    tcpConnectionPool: { maxConnections: 100 },
    tcpRetryPolicy: { maxConnectAttempts: 3 },
    timeoutPolicy: {
      connectionTimeoutInSeconds: 5,
      responseTimeoutInSeconds: 15,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.appResiliencyOperations.createOrUpdate(
    resourceGroupName,
    appName,
    name,
    resiliencyEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAppResiliency();
}

main().catch(console.error);
