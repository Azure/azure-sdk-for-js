// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update container app resiliency policy.
 *
 * @summary create or update container app resiliency policy.
 * x-ms-original-file: 2025-10-02-preview/AppResiliency_CreateOrUpdate.json
 */
async function createOrUpdateAppResiliency() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.appResiliency.createOrUpdate(
    "rg",
    "testcontainerApp0",
    "resiliency-policy-1",
    {
      circuitBreakerPolicy: { consecutiveErrors: 5, intervalInSeconds: 10, maxEjectionPercent: 50 },
      httpConnectionPool: { http1MaxPendingRequests: 1024, http2MaxRequests: 1024 },
      httpRetryPolicy: {
        errors: ["5xx", "connect-failure", "reset", "retriable-headers", "retriable-status-codes"],
        headers: [{ header: "X-Content-Type", prefixMatch: "GOATS" }],
        httpStatusCodes: [502, 503],
        maxRetries: 5,
        initialDelayInMilliseconds: 1000,
        maxIntervalInMilliseconds: 10000,
      },
      tcpConnectionPool: { maxConnections: 100 },
      tcpRetryPolicy: { maxConnectAttempts: 3 },
      timeoutPolicy: { connectionTimeoutInSeconds: 5, responseTimeoutInSeconds: 15 },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAppResiliency();
}

main().catch(console.error);
