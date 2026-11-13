// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KnownEkmConnectivityMode } from "../../src/index.js";
import { createEkmConnection, updateEkmConnection } from "../../src/api/operations.js";
import { describe, it, expect } from "vitest";

describe("EKM connectivity mode", () => {
  it("serializes and deserializes connectivityMode on create and update", async () => {
    const connection = {
      host: "ekm-private-endpoint",
      serverCaCertificates: [new Uint8Array([1, 2, 3])],
      connectivityMode: KnownEkmConnectivityMode.PrivateEndpoint,
    };
    const requestBodies: unknown[] = [];
    const responseBody = {
      host: connection.host,
      server_ca_certificates: ["AQID"],
      connectivity_mode: "PrivateEndpoint",
    };
    const context = {
      apiVersion: "2026-07-01-preview",
      path: () => ({
        post: ({ body }: { body: unknown }) => {
          requestBodies.push(body);
          return Promise.resolve({ status: "200", body: responseBody });
        },
        patch: ({ body }: { body: unknown }) => {
          requestBodies.push(body);
          return Promise.resolve({ status: "200", body: responseBody });
        },
      }),
    } as unknown as Parameters<typeof createEkmConnection>[0];

    const created = await createEkmConnection(context, connection);
    expect(requestBodies[0]).toMatchObject({ connectivity_mode: "PrivateEndpoint" });
    expect(created.connectivityMode).toEqual(KnownEkmConnectivityMode.PrivateEndpoint);

    const updated = await updateEkmConnection(context, connection);
    expect(requestBodies[1]).toMatchObject({ connectivity_mode: "PrivateEndpoint" });
    expect(updated.connectivityMode).toEqual(KnownEkmConnectivityMode.PrivateEndpoint);
  });
});
