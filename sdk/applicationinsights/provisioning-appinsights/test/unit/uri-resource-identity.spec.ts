// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { deref, namingRequiredPolicy, Stack } from "@azure/provisioning-core";
import { renderBicepFiles } from "@azure/provisioning-core/internal";
import { deserialize, serialize } from "@azure/provisioning-core/serialization";
import {
  Component,
  ExportConfiguration,
  Favorite,
  type FavoriteProps,
  ProactiveDetectionConfig,
} from "@azure/provisioning-appinsights";
import { assert, describe, expect, expectTypeOf, it } from "vitest";

function createStack(): Stack {
  return new Stack("uri-identity", {
    targetScope: "resourceGroup",
    namingPolicy: namingRequiredPolicy,
  });
}

function resourceNodes(
  document: ReturnType<typeof serialize>,
): NonNullable<ReturnType<typeof serialize>["infras"][number]["resources"]>[string][] {
  const resources = document.infras[0]?.resources;
  assert(resources);
  return Object.values(resources);
}

describe("URI resource identity", () => {
  it("keeps the Favorites URL name and body Name independent through mutation and restoration", () => {
    expectTypeOf<FavoriteProps>().toHaveProperty("name");
    expectTypeOf<FavoriteProps>().toHaveProperty("Name");
    expectTypeOf<FavoriteProps>().not.toHaveProperty("favoriteId");
    const stack = createStack();
    const component = new Component(stack, {
      existing: true,
      name: "application",
    });
    const favorite = new Favorite(component, {
      name: "favorite-id",
      Name: "Display name",
      config: "{}",
      favoriteType: "shared",
      tags: ["example"],
    });
    expect(deref(favorite.name)).toBe("favorite-id");
    expect(deref(favorite.Name)).toBe("Display name");
    favorite.Name = "Updated display name";
    favorite.name = "updated-id";
    const document = serialize(stack);
    const node = resourceNodes(document).find(
      (resource) => resource.type === Favorite.resourceType,
    );
    expect(node).toMatchObject({
      apiVersion: "2015-05-01",
      value: {
        kind: "object",
        value: {
          name: { kind: "string", value: "updated-id" },
          Name: { kind: "string", value: "Updated display name" },
          Config: { kind: "string", value: "{}" },
          Tags: {
            kind: "array",
            items: [{ kind: "string", value: "example" }],
          },
        },
      },
    });
    const bicep = renderBicepFiles(stack)
      .map((file) => file.contents)
      .join("\n");
    expect(bicep).toContain("Microsoft.Insights/components/favorites@2015-05-01");
    expect(bicep).toContain("name: 'updated-id'");
    expect(bicep).toContain("Name: 'Updated display name'");
    const [restored] = deserialize(JSON.stringify(document));
    assert(restored);
    const restoredFavorite = restored.getResources(Favorite)[0];
    expect(restoredFavorite).toBeInstanceOf(Favorite);
    assert(restoredFavorite);
    expect(deref(restoredFavorite.name)).toBe("updated-id");
    expect(deref(restoredFavorite.Name)).toBe("Updated display name");
    expect(serialize(restored)).toEqual(document);
  });

  it("uses URI identity for export configuration and preserves its write-only body fields", () => {
    const stack = createStack();
    const component = new Component(stack, {
      existing: true,
      name: "application",
    });
    const resource = new ExportConfiguration(component, {
      name: "export-id",
      destinationType: "Blob",
      destinationAddress: "https://example.blob.core.windows.net/exports",
      recordTypes: "Requests",
    });
    const document = serialize(stack);
    const node = resourceNodes(document).find(
      (entry) => entry.type === ExportConfiguration.resourceType,
    );
    expect(node).toMatchObject({
      apiVersion: "2015-05-01",
      value: {
        value: {
          name: { kind: "string", value: "export-id" },
          DestinationType: { kind: "string", value: "Blob" },
          DestinationAddress: {
            kind: "string",
            value: "https://example.blob.core.windows.net/exports",
          },
          RecordTypes: { kind: "string", value: "Requests" },
        },
      },
    });
    expect(deref(resource.name)).toBe("export-id");
    const [restored] = deserialize(JSON.stringify(document));
    assert(restored);
    expect(restored.getResources(ExportConfiguration)[0]).toBeInstanceOf(ExportConfiguration);
    expect(serialize(restored)).toEqual(document);
  });

  it("restores existing URI-only resources and exposes the other ComponentAPIs resource", () => {
    const stack = createStack();
    const component = new Component(stack, {
      existing: true,
      name: "application",
    });
    new Favorite(component, { existing: true, name: "favorite-id" });
    new ExportConfiguration(component, {
      existing: true,
      name: "export-id",
    });
    new ProactiveDetectionConfig(component, {
      existing: true,
      name: "detection-id",
    });
    const document = serialize(stack);
    expect(resourceNodes(document)).toHaveLength(4);
    expect(resourceNodes(document).every((node) => node.existing)).toBe(true);
    const [restored] = deserialize(JSON.stringify(document));
    assert(restored);
    expect(deref(restored.getResources(Favorite)[0]!.name)).toBe("favorite-id");
    expect(deref(restored.getResources(ExportConfiguration)[0]!.name)).toBe("export-id");
    expect(restored.getResources(ProactiveDetectionConfig)[0]).toBeInstanceOf(
      ProactiveDetectionConfig,
    );
    expect(serialize(restored)).toEqual(document);
  });
});
