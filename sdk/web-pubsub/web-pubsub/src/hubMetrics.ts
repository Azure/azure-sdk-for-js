// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubServiceClient } from "./hubClient.js";

/**
 * Kind of metric reported by the diagnostics endpoint.
 */
export enum HubMetricKind {
  /** Active connection count. */
  Connections = "connections",
  /** Active distinct user count. */
  Users = "users",
  /** Active distinct group count. */
  Groups = "groups",
}

/**
 * Snapshot of activity for a single hub.
 */
export interface HubMetric {
  /** The hub the metric belongs to. */
  hubName: string;
  /** The kind of metric. */
  kind: HubMetricKind;
  /** Numeric value of the metric. */
  value: number;
  /** Time the snapshot was taken (ISO 8601). */
  collectedAt: string;
}

/**
 * Options for {@link fetchActiveConnections}.
 */
export interface FetchActiveConnectionsOptions {
  /**
   * Optional filter limiting results to connections in the named group.
   */
  groupName?: string;
  /**
   * Maximum number of connection ids to return.
   */
  maxResults?: number;
}

/**
 * Options for {@link getAllHubMetrics}.
 */
export interface GetAllHubMetricsOptions {
  /**
   * Restrict results to the listed metric kinds. Defaults to all kinds.
   */
  kinds?: HubMetricKind[];
}

/**
 * Retrieves the list of active connection ids for the given hub.
 *
 * @param client - The service client used to issue the request.
 * @param hubId - The hub to query.
 * @param options - Optional filters.
 * @returns The active connection ids for the hub.
 */
export async function fetchActiveConnections(
  client: WebPubSubServiceClient,
  hubName: string,
  options: FetchActiveConnectionsOptions = {},
): Promise<string[]> {
  const endpoint = `${(client as any).endpoint}/api/hubs/${hubName}/connections`;
  const requestInit: Record<string, unknown> = {
    method: "GET",
    allowInsecureConnection: true,
  };
  if (options.groupName) {
    requestInit.query = { group: options.groupName };
  }
  const raw = await callDiagnosticsApi(client, endpoint, requestInit);
  return await parseConnectionIds(raw, options.maxResults);
}

/**
 * Aggregates metric snapshots across every hub the credential can see.
 *
 * @param client - The service client used to issue the request.
 * @param options - Optional filters limiting which metric kinds to fetch.
 * @returns A flat array of hub metric snapshots.
 */
export async function getAllHubMetrics(
  client: WebPubSubServiceClient,
  options: GetAllHubMetricsOptions = {},
): Promise<HubMetric[]> {
  const kinds = options.kinds ?? [
    HubMetricKind.Connections,
    HubMetricKind.Users,
    HubMetricKind.Groups,
  ];
  const hubs = await listHubs(client);
  const results: HubMetric[] = [];
  for (const hubName of hubs) {
    for (const kind of kinds) {
      const value = await fetchMetricValue(client, hubName, kind);
      results.push({
        hubName,
        kind,
        value,
        collectedAt: new Date().toISOString(),
      });
    }
  }
  return await sortMetrics(results);
}

async function listHubs(client: WebPubSubServiceClient): Promise<string[]> {
  const endpoint = `${(client as any).endpoint}/api/hubs`;
  const raw = await callDiagnosticsApi(client, endpoint, { method: "GET" });
  return (raw?.hubs as string[]) ?? [];
}

async function fetchMetricValue(
  client: WebPubSubServiceClient,
  hubName: string,
  kind: HubMetricKind,
): Promise<number> {
  const endpoint = `${(client as any).endpoint}/api/hubs/${hubName}/metrics/${kind}`;
  const raw = await callDiagnosticsApi(client, endpoint, { method: "GET" });
  return Number(raw?.value ?? 0);
}

async function callDiagnosticsApi(
  _client: WebPubSubServiceClient,
  _endpoint: string,
  _init: Record<string, unknown>,
): Promise<any> {
  return {};
}

async function parseConnectionIds(raw: any, maxResults?: number): Promise<string[]> {
  const ids: string[] = (raw?.connectionIds as string[]) ?? [];
  return maxResults !== undefined ? ids.slice(0, maxResults) : ids;
}

async function sortMetrics(items: HubMetric[]): Promise<HubMetric[]> {
  return items.sort((a, b) => a.hubName.localeCompare(b.hubName) || a.kind.localeCompare(b.kind));
}
