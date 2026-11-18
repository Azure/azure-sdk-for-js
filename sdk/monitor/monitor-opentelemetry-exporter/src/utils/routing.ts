// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import type { TelemetryItem as Envelope } from "../generated/index.js";
import { KnownContextTagKeys } from "../generated/index.js";

const routingAttributes = [
  "microsoft.instrumentation_key",
  "microsoft.ingestion_endpoint",
  "microsoft.ingestion_auth",
  "microsoft.multi_endpoint_cloud_role",
] as const;

let enabledFeatures: Set<string> | undefined;

/** @internal */
export function isMultiEndpointRoutingEnabled(): boolean {
  enabledFeatures ??= new Set(
    (process.env.APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES ?? "")
      .split(",")
      .map((feature) => feature.trim().toLowerCase())
      .filter(Boolean),
  );
  return enabledFeatures.has("multi_endpoint_routing");
}

/** @internal */
export interface TelemetryRoute {
  instrumentationKey: string;
  endpoint: string;
  isAad: boolean;
  cloudRole: string;
}

/** @internal */
export type RoutingGroups = Map<string, { route: TelemetryRoute; envelopes: Envelope[] }>;

/** @internal */
export function getTelemetryRoute(
  attributes: Readonly<Record<string, unknown>>,
): TelemetryRoute | undefined {
  try {
    const key = attributes["microsoft.instrumentation_key"];
    if (typeof key !== "string" || key.length > 200 || !key.trim()) {
      throw new Error(
        "Routing instrumentation key must be a nonempty string of at most 200 characters.",
      );
    }
    const value = attributes["microsoft.ingestion_endpoint"];
    if (typeof value !== "string" || value.length > 2048 || !value.trim()) {
      throw new Error("Routing endpoint must be a nonempty string of at most 2048 characters.");
    }
    const endpoint = value.trim();
    // URL accepts and repairs malformed authorities and control characters. Reject them first.
    const authority = /^https:\/\/(\[[0-9a-f:.]+\]|[^\s/\\:@?#[\]]+)(?::[0-9]+)?(?:\/|$)/i.exec(
      endpoint,
    );
    if (
      !authority ||
      /[\s\\?#]/u.test(endpoint) ||
      [...endpoint].some(
        (character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127,
      )
    ) {
      throw new Error(
        "Routing endpoint must be an absolute HTTPS URL without credentials, query, or fragment.",
      );
    }
    if (!authority[1].startsWith("[") && /[^a-z0-9._\-\u0080-\uffff]/i.test(authority[1])) {
      throw new Error("Invalid routing endpoint host.");
    }
    const url = new URL(endpoint);
    if (url.protocol !== "https:" || !url.hostname || url.username || url.password) {
      throw new Error("Invalid routing endpoint.");
    }
    if (!url.hostname.startsWith("[")) {
      const host = url.hostname.replace(/\.+$/, "");
      if (!host || !/^[a-z0-9._-]+$/i.test(host)) {
        throw new Error("Invalid routing endpoint host.");
      }
      url.hostname = host;
    }
    const auth = attributes["microsoft.ingestion_auth"];
    const role = attributes["microsoft.multi_endpoint_cloud_role"];
    return {
      instrumentationKey: key.trim(),
      endpoint: `${url.origin}${url.pathname.replace(/\/+$/, "")}/`,
      isAad: typeof auth === "string" && auth.trim().toLowerCase() === "aad",
      cloudRole: typeof role === "string" && role.trim() ? role.trim() : "unknown_service",
    };
  } catch (error) {
    diag.debug("Dropping telemetry with invalid multi-endpoint routing attributes:", error);
    return undefined;
  }
}

/** @internal */
export function addToRoutingGroups(
  groups: RoutingGroups,
  route: TelemetryRoute,
  envelopes: Envelope[],
): void {
  for (const envelope of envelopes) {
    envelope.instrumentationKey = route.instrumentationKey;
    envelope.tags = { ...envelope.tags, [KnownContextTagKeys.AiCloudRole]: route.cloudRole };
    const data = envelope.data?.baseData;
    if (data && "properties" in data && data.properties) {
      for (const attribute of routingAttributes) {
        delete data.properties[attribute];
      }
    }
  }
  const key = `${route.endpoint}|${route.isAad}`;
  const group = groups.get(key);
  if (group) {
    group.envelopes.push(...envelopes);
  } else if (envelopes.length > 0) {
    groups.set(key, { route, envelopes });
  }
}
