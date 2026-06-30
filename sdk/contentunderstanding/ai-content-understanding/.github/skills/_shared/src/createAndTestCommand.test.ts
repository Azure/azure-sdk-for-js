// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Unit tests for the pure helpers exported from createAndTestCommand.ts.
 * Mirrors Python's tests/test_skills_create_and_test.py. The CLI entry
 * point (runCreateAndTest) and the network-dependent helpers (ensureAnalyzer,
 * createAnalyzer, analyzeFile) are not covered here — they require an
 * Azure client and live recording infrastructure.
 */

import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { summarize } from "./createAndTestCommand.js";

function scalar(value: string, conf: number): Record<string, unknown> {
  return { type: "string", valueString: value, confidence: conf };
}

function num(value: number, conf: number): Record<string, unknown> {
  return { type: "number", valueNumber: value, confidence: conf };
}

function arrayOfObjects(items: Record<string, unknown>[]): Record<string, unknown> {
  return { type: "array", valueArray: items };
}

function obj(o: Record<string, unknown>): Record<string, unknown> {
  return { type: "object", valueObject: o };
}

describe("summarize — leaf-row flattening", () => {
  it("flattens nested valueArray and valueObject fields to leaf rows", () => {
    const doc = {
      contents: [
        {
          fields: {
            invoiceNumber: scalar("INV-100", 0.95),
            lineItems: arrayOfObjects([
              obj({
                itemCode: scalar("A123", 0.8),
                amount: num(60, 0.92),
              }),
              obj({
                itemCode: scalar("B456", 0.7),
                amount: num(30, 0.9),
              }),
            ]),
            address: obj({
              street: scalar("123 Main St", 0.88),
            }),
          },
        },
      ],
    };

    const out = summarize([{ name: "docX", doc }]);

    // Leaf rows present.
    assert.ok(out.includes("lineItems[].itemCode"), "leaf row lineItems[].itemCode missing");
    assert.ok(out.includes("lineItems[].amount"), "leaf row lineItems[].amount missing");
    assert.ok(out.includes("address.street"), "leaf row address.street missing");
    assert.ok(out.includes("invoiceNumber"), "leaf row invoiceNumber missing");

    // The old aggregate-only behaviour would emit a `lineItems` row with `n/a`
    // confidence and no children. The new behaviour must not emit a bare
    // `lineItems ` or `address ` row.
    for (const line of out.split("\n")) {
      const stripped = line.trim();
      assert.ok(
        !(stripped.startsWith("lineItems ") || stripped.startsWith("address ")),
        `aggregate-only row leaked: ${line}`,
      );
    }

    // Lowest-confidence list should rank the 0.700 leaf at the top.
    assert.ok(out.includes("0.700"), "missing 0.700 confidence row");
    const lowestSection = out.split("lowest-confidence")[1] ?? "";
    assert.ok(
      lowestSection.includes("lineItems[].itemCode"),
      "lowest-confidence section should mention lineItems[].itemCode",
    );
  });
});
