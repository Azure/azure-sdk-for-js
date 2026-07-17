// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Unit tests for the pure `translateForJsSerializer` helper in
 * clientHelpers.ts. The JS SDK's typed model serializer expects
 * `field.itemDefinition` on the wire but reads `field.items` from our
 * schema files, so we pre-rename before handing off. These tests pin
 * down the scoping rules so the rename does NOT clobber user field
 * names that happen to be `items` or `$ref`.
 */

import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { _translateForJsSerializer as translate } from "./clientHelpers.js";

describe("translateForJsSerializer", () => {
  it("renames array-field `items` to `itemDefinition` on the field descriptor", () => {
    const input = {
      type: "array",
      method: "extract",
      items: { type: "object", properties: {} },
    };
    const out = translate(input) as Record<string, unknown>;
    assert.equal(out["itemDefinition"] !== undefined, true, "should be renamed to itemDefinition");
    assert.equal("items" in out, false, "original `items` key should be dropped");
  });

  it("does NOT rename a user field literally named `items`", () => {
    // A very common analyzer schema pattern: a field for line items named
    // "items" (extract-method array). The rename must NOT clobber that
    // user-chosen key, because `fieldSchema.fields.<name>` and
    // `properties.<name>` are keyed by user names, not by our wire vocab.
    const input = {
      fieldSchema: {
        fields: {
          items: {
            type: "array",
            method: "extract",
            description: "the line-item table",
            items: {
              type: "object",
              properties: {
                sku: { type: "string", method: "extract", description: "SKU column" },
              },
            },
          },
        },
      },
    };

    const out = translate(input) as {
      fieldSchema: { fields: Record<string, unknown> };
    };
    const fields = out.fieldSchema.fields;

    // User field name preserved.
    assert.equal("items" in fields, true, "user field name `items` must survive");
    assert.equal(
      "itemDefinition" in fields,
      false,
      "must not have created an itemDefinition sibling",
    );

    // The array-descriptor level DID get renamed (that's the whole point).
    const desc = fields["items"] as Record<string, unknown>;
    assert.equal(
      desc["itemDefinition"] !== undefined,
      true,
      "array descriptor should have itemDefinition",
    );
    assert.equal("items" in desc, false, "array descriptor `items` should be renamed");
  });

  it("does not rename anything under `properties.<name>` (user field names)", () => {
    // The children of `properties` are user field names, not the wire
    // vocabulary. They must never be renamed.
    const input = {
      type: "object",
      method: "extract",
      properties: {
        items: { type: "string", method: "extract", description: "not an array" },
        $ref: { type: "string", method: "extract", description: "user named it $ref" },
        ordinary: { type: "string", method: "extract" },
      },
    };
    const out = translate(input) as { properties: Record<string, unknown> };
    assert.equal("items" in out.properties, true);
    assert.equal("$ref" in out.properties, true);
    assert.equal("ordinary" in out.properties, true);
    // No spurious renames at property-map level.
    assert.equal("itemDefinition" in out.properties, false);
    assert.equal("ref" in out.properties, false);
  });

  it("renames `$ref` to `ref` on a field descriptor", () => {
    const input = { type: "string", $ref: "#/definitions/foo" };
    const out = translate(input) as Record<string, unknown>;
    assert.equal(out["ref"], "#/definitions/foo");
    assert.equal("$ref" in out, false);
  });

  it("recurses into nested object properties and array items", () => {
    // Full schema, three levels deep. Confirms recursion works AND scoping
    // holds under recursion.
    const input = {
      fieldSchema: {
        fields: {
          invoice: {
            type: "object",
            method: "extract",
            properties: {
              lineItems: {
                type: "array",
                method: "extract",
                items: {
                  type: "object",
                  properties: {
                    itemCode: { type: "string", method: "extract" },
                  },
                },
              },
            },
          },
        },
      },
    };
    const out = translate(input) as {
      fieldSchema: {
        fields: {
          invoice: {
            properties: {
              lineItems: { itemDefinition?: { properties: unknown }; items?: unknown };
            };
          };
        };
      };
    };
    const lineItems = out.fieldSchema.fields.invoice.properties.lineItems;
    assert.equal(lineItems.itemDefinition !== undefined, true);
    assert.equal(lineItems.items, undefined);
  });

  it("passes through primitives and arrays of primitives unchanged", () => {
    assert.equal(translate("hello"), "hello");
    assert.equal(translate(42), 42);
    assert.equal(translate(null), null);
    assert.deepEqual(translate([1, 2, 3]), [1, 2, 3]);
  });
});
