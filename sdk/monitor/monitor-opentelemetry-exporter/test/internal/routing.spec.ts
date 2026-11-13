// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it, vi } from "vitest";
import { diag } from "@opentelemetry/api";
import { addToRoutingGroups, getTelemetryRoute } from "../../src/utils/routing.js";
import type { RoutingGroups } from "../../src/utils/routing.js";
import type { TelemetryItem as Envelope } from "../../src/generated/index.js";

const attributes = {
  "microsoft.instrumentation_key": " key ",
  "microsoft.ingestion_endpoint": " https://EXAMPLE.test.:443/prefix/// ",
};

describe("multi-endpoint routing attributes", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("normalizes destinations, keys, authentication and roles", () => {
    expect(
      getTelemetryRoute({
        ...attributes,
        "microsoft.ingestion_auth": " AaD ",
        "microsoft.multi_endpoint_cloud_role": " tenant-service ",
      }),
    ).toEqual({
      instrumentationKey: "key",
      endpoint: "https://example.test/prefix/",
      isAad: true,
      cloudRole: "tenant-service",
    });
  });

  it.each([
    ["https://example.test", "https://example.test/"],
    ["HTTPS://Example.test:443///", "https://example.test/"],
    ["https://example.test:8443/path", "https://example.test:8443/path/"],
    ["https://[2001:0db8:0:0:0:0:0:1]:443/", "https://[2001:db8::1]/"],
    ["https://[::1]:8443/path/", "https://[::1]:8443/path/"],
  ])("normalizes %s", (endpoint, expected) => {
    expect(
      getTelemetryRoute({ ...attributes, "microsoft.ingestion_endpoint": endpoint })?.endpoint,
    ).toBe(expected);
  });

  it.each([
    undefined,
    null,
    123,
    [],
    "",
    " ",
    "http://example.test",
    "/path",
    "https:example.test",
    "https:///example.test",
    "https://",
    "https://user@example.test",
    "https://user:pass@example.test",
    "https://example.test?",
    "https://example.test#",
    "https://example.test/?x=1",
    "https://example.test/#fragment",
    "https://example.test\\path",
    "https://example.test/\npath",
    "https://example.test/\u0000",
    "https://example.test/\u007f",
    "https://example.test:65536/",
    "https://example.test:/",
    "https://[bad]/",
    "https://./",
    `https://example.test/${"x".repeat(2048)}`,
    "https://%65xample.test/",
    "https://bad!host.test/",
  ])("drops invalid endpoint %s", (endpoint) => {
    const debug = vi.spyOn(diag, "debug");
    expect(
      getTelemetryRoute({ ...attributes, "microsoft.ingestion_endpoint": endpoint }),
    ).toBeUndefined();
    expect(debug).toHaveBeenCalledOnce();
  });

  it.each([undefined, null, 123, [], "", " ", "x".repeat(201)])("drops invalid key %s", (key) => {
    expect(
      getTelemetryRoute({ ...attributes, "microsoft.instrumentation_key": key }),
    ).toBeUndefined();
  });

  it("accepts non-UUID keys and the exact attribute length limits", () => {
    const endpoint = `https://example.test/${"x".repeat(2027)}`;
    expect(endpoint).toHaveLength(2048);
    expect(
      getTelemetryRoute({
        ...attributes,
        "microsoft.instrumentation_key": "x".repeat(200),
        "microsoft.ingestion_endpoint": endpoint,
      }),
    ).toBeDefined();
  });

  it.each([undefined, null, 123, [], "", " "])(
    "does not fall back to a host role for %s",
    (role) => {
      expect(
        getTelemetryRoute({ ...attributes, "microsoft.multi_endpoint_cloud_role": role })
          ?.cloudRole,
      ).toBe("unknown_service");
    },
  );

  it.each([undefined, null, 123, true, [], "", "ikey", "Bearer"])(
    "uses key-only authentication for %s",
    (auth) => {
      expect(getTelemetryRoute({ ...attributes, "microsoft.ingestion_auth": auth })?.isAad).toBe(
        false,
      );
    },
  );

  it("groups by endpoint/auth without sharing per-item keys or tags", () => {
    const groups: RoutingGroups = new Map();
    const sharedTags = { "ai.cloud.role": "host", "ai.cloud.roleInstance": "instance" };
    const envelopes: Envelope[] = ["first", "second"].map((key) => ({
      name: key,
      time: new Date(0),
      tags: sharedTags,
      data: {
        baseType: "MessageData",
        baseData: {
          kind: "MessageData",
          version: 2,
          message: key,
          properties: {
            ...attributes,
            "microsoft.ingestion_auth": "aad",
            "microsoft.multi_endpoint_cloud_role": "role",
            custom: "value",
          },
        },
      },
    }));
    for (const [index, envelope] of envelopes.entries()) {
      const route = getTelemetryRoute({
        ...attributes,
        "microsoft.instrumentation_key": envelope.name,
        "microsoft.multi_endpoint_cloud_role": `role-${index}`,
      })!;
      addToRoutingGroups(groups, route, [envelope]);
    }
    expect(groups.size).toBe(1);
    expect(envelopes.map((item) => item.instrumentationKey)).toEqual(["first", "second"]);
    expect(envelopes.map((item) => item.tags?.["ai.cloud.role"])).toEqual(["role-0", "role-1"]);
    expect(sharedTags["ai.cloud.role"]).toBe("host");
    expect(envelopes[0].data?.baseData).toMatchObject({ properties: { custom: "value" } });
    expect(
      Object.keys(
        envelopes[0].data?.baseData && "properties" in envelopes[0].data.baseData
          ? envelopes[0].data.baseData.properties!
          : {},
      ),
    ).toEqual(["custom"]);
  });
});

describe("experimental feature selection", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it.each(["", "true", "unknown", "multi-endpoint-routing"])(
    "does not opt in for %s",
    async (value) => {
      vi.resetModules();
      vi.stubEnv("APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES", value);
      const { isMultiEndpointRoutingEnabled } = await import("../../src/utils/routing.js");
      expect(isMultiEndpointRoutingEnabled()).toBe(false);
    },
  );

  it("freezes a normalized comma-separated selection on first use", async () => {
    vi.resetModules();
    vi.stubEnv(
      "APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES",
      " unknown, MULTI_ENDPOINT_ROUTING, multi_endpoint_routing ",
    );
    const { isMultiEndpointRoutingEnabled } = await import("../../src/utils/routing.js");
    expect(isMultiEndpointRoutingEnabled()).toBe(true);
    vi.stubEnv("APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES", "");
    expect(isMultiEndpointRoutingEnabled()).toBe(true);
  });
});
