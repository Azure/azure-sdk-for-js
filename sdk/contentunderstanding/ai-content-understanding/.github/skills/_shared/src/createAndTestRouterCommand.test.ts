// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Unit tests for pure helpers in createAndTestRouterCommand.ts. Mirrors
 * the portion of Python's tests/test_skills_classify_route_router.py that
 * does not require mocking the Azure client.
 *
 * Note: JS wireInnerIds returns only the patched schema (errors are
 * surfaced elsewhere in runCreateAndTestRouter), so the "errors on
 * missing alias" / "errors on extra inner" tests from Python are covered
 * at the integration level, not here.
 */

import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { summarizeRouted, wireInnerIds } from "./createAndTestRouterCommand.js";

function field(value: string, confidence: number): Record<string, unknown> {
  return { valueString: value, confidence };
}

function segment(category: string, fields: Record<string, unknown>): Record<string, unknown> {
  return { category, fields };
}

describe("summarizeRouted — per-category denominator", () => {
  it("does not dilute invoice fill rate by other categories' segments", () => {
    const results = [
      {
        name: "packet_a",
        doc: {
          contents: [
            segment("invoice", { InvoiceNumber: field("INV-1", 0.9) }),
            segment("invoice", { InvoiceNumber: field("INV-2", 0.91) }),
            segment("invoice", { InvoiceNumber: field("INV-3", 0.92) }),
            segment("bank_statement", { AccountNumber: field("12345", 0.8) }),
          ],
        },
      },
    ];

    const text = summarizeRouted(results);

    // Invoice: 3 segments, 3 filled → 100%
    assert.ok(text.includes("category: invoice  (3 segments)"), "invoice segment count wrong");
    assert.ok(text.includes("InvoiceNumber") && text.includes("100.0%"), "invoice not at 100%");
    // Bank statement: 1 segment, 1 filled → 100%
    assert.ok(
      text.includes("category: bank_statement  (1 segment)") ||
        text.includes("category: bank_statement  (1 segments)"),
      "bank_statement segment count wrong",
    );
    assert.ok(text.includes("AccountNumber"), "AccountNumber missing");
    // Packet-wide denominator must NOT leak through.
    assert.ok(!text.includes("33.3%"), "33.3% leaked (packet-wide denom)");
    assert.ok(!text.includes("25.0%"), "25.0% leaked (packet-wide denom)");
  });

  it("reports zero fill for a missing field in some segments", () => {
    const results = [
      {
        name: "packet",
        doc: {
          contents: [
            segment("invoice", {
              InvoiceNumber: field("INV-1", 0.9),
              TotalAmount: field("$100", 0.7),
            }),
            segment("invoice", { InvoiceNumber: field("INV-2", 0.91) }),
          ],
        },
      },
    ];

    const text = summarizeRouted(results);
    assert.ok(text.includes("category: invoice  (2 segments)"), "segment count wrong");
    // InvoiceNumber appears in both segments → 100%
    // TotalAmount appears in 1 of 2 → 50%
    assert.ok(text.includes("InvoiceNumber") && text.includes("100.0%"), "InvoiceNumber not 100%");
    assert.ok(text.includes("TotalAmount") && text.includes(" 50.0%"), "TotalAmount not 50%");
  });
});

describe("wireInnerIds — alias-to-id substitution", () => {
  it("substitutes analyzerId for matching aliases and leaves the rest alone", () => {
    const outer = {
      baseAnalyzerId: "prebuilt-document",
      config: {
        enableSegment: true,
        contentCategories: {
          invoice: { description: "d", analyzerId: "invoice" },
          loan: { description: "d", analyzerId: "loan_application" },
        },
      },
    };

    const patched = wireInnerIds(outer, new Map([["invoice", "real-invoice-id"]]));
    const cats = (patched["config"] as Record<string, unknown>)["contentCategories"] as Record<
      string,
      Record<string, unknown>
    >;
    assert.equal(cats["invoice"]["analyzerId"], "real-invoice-id");
    // Unmatched alias retained — the caller (runCreateAndTestRouter) is
    // responsible for surfacing this as an error to the user.
    assert.equal(cats["loan"]["analyzerId"], "loan_application");
    // Outer schema must not be mutated in place.
    assert.equal(
      ((outer.config as Record<string, unknown>)["contentCategories"] as Record<
        string,
        Record<string, unknown>
      >)["invoice"]["analyzerId"],
      "invoice",
      "wireInnerIds mutated its input",
    );
  });
});
