// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Cross-platform test helpers for integration tests.
 * Uses vitest's inject() to receive values from globalSetup.ts
 * which runs in Node.js and provides endpoint/masterKey via provide().
 */
import type {
  ClientConfigDiagnostic,
  CosmosClientOptions,
  DatabaseDefinition,
  PartitionKeyRange,
  QueryIterator,
  RequestOptions,
  Response,
} from "../../../src/index.js";
import {
  ClientContext,
  ConnectionMode,
  ConsistencyLevel,
  Constants,
  CosmosClient,
  CosmosDbDiagnosticLevel,
  GlobalEndpointManager,
} from "../../../src/index.js";
import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "../../../src/diagnostics/DiagnosticNodeInternal.js";
import { assert, expect, inject, vi } from "vitest";

declare module "vitest" {
  interface ProvidedContext {
    cosmosEndpoint: string;
    cosmosMasterKey: string;
    skipTestForSignOff: boolean;
  }
}

export function getDefaultClient(): CosmosClient {
  return new CosmosClient({
    endpoint: inject("cosmosEndpoint"),
    key: inject("cosmosMasterKey"),
    connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    diagnosticLevel: CosmosDbDiagnosticLevel.info,
  });
}

export async function removeAllDatabases(client?: CosmosClient): Promise<void> {
  try {
    if (!client) {
      client = getDefaultClient();
    }
    const { resources: databases } = await client.databases.readAll().fetchAll();
    const length = databases.length;

    if (length === 0) {
      return;
    }

    await Promise.all(
      databases.map<Promise<Response<DatabaseDefinition>>>(async (database: DatabaseDefinition) =>
        client.database(database.id).delete(),
      ),
    );
  } catch (err: any) {
    console.log("An error occured", err);
    assert.fail(err);
    throw err;
  }
}

export function createDummyDiagnosticNode(
  diagnosticLevel: CosmosDbDiagnosticLevel = CosmosDbDiagnosticLevel.info,
): DiagnosticNodeInternal {
  return new DiagnosticNodeInternal(diagnosticLevel, DiagnosticNodeType.CLIENT_REQUEST_NODE, null);
}

export function createTestClientContext(
  options: Partial<CosmosClientOptions>,
  diagnosticLevel: CosmosDbDiagnosticLevel,
): ClientContext {
  const clientOps: CosmosClientOptions = {
    endpoint: "",
    connectionPolicy: {
      connectionMode: ConnectionMode.Gateway,
      requestTimeout: 60000,
      enableEndpointDiscovery: true,
      preferredLocations: [],
      retryOptions: {
        maxRetryAttemptCount: 9,
        fixedRetryIntervalInMilliseconds: 0,
        maxWaitTimeInSeconds: 30,
      },
      useMultipleWriteLocations: true,
      endpointRefreshRateInMs: 300000,
      enableBackgroundEndpointRefreshing: true,
    },
    ...options,
  };
  const globalEndpointManager = new GlobalEndpointManager(
    clientOps,
    async (diagnosticNode: DiagnosticNodeInternal, opts: RequestOptions) => {
      expect(opts).to.exist;
      const dummyAccount: any = diagnosticNode;
      return dummyAccount;
    },
  );
  const clientConfig: ClientConfigDiagnostic = {
    endpoint: "",
    resourceTokensConfigured: true,
    tokenProviderConfigured: true,
    aadCredentialsConfigured: true,
    connectionPolicyConfigured: true,
    consistencyLevel: ConsistencyLevel.BoundedStaleness,
    defaultHeaders: {},
    agentConfigured: true,
    userAgentSuffix: "",
    pluginsConfigured: true,
    sDKVersion: Constants.SDKVersion,
    ...options,
  };
  const clientContext = new ClientContext(
    clientOps,
    globalEndpointManager,
    clientConfig,
    diagnosticLevel,
  );
  return clientContext;
}

export function initializeMockPartitionKeyRanges(
  createMockPartitionKeyRange: (
    id: string,
    minInclusive: string,
    maxExclusive: string,
  ) => {
    id: string;
    _rid: string;
    minInclusive: string;
    maxExclusive: string;
    _etag: string;
    _self: string;
    throughputFraction: number;
    status: string;
  },
  clientContext: ClientContext,
  ranges: [string, string][],
): void {
  const partitionKeyRanges = ranges.map((range, index) =>
    createMockPartitionKeyRange(index.toString(), range[0], range[1]),
  );

  const fetchAllInternalStub = vi.fn().mockResolvedValue({
    resources: partitionKeyRanges,
    headers: { "x-ms-request-charge": "1.23" },
    code: 200,
  });
  vi.spyOn(clientContext, "queryPartitionKeyRanges").mockReturnValue({
    fetchAllInternal: fetchAllInternalStub,
  } as unknown as QueryIterator<PartitionKeyRange>);
}
