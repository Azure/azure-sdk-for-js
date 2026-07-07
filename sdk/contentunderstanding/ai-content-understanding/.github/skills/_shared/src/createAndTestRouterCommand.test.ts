// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Unit tests for pure helpers in createAndTestRouterCommand.ts. Mirrors
 * the portion of Python's tests/test_skills_classify_route_router.py that
 * does not require mocking the Azure client.
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
  it("substitutes analyzerId for matching aliases (keyed by value, not category name)", () => {
    // Category name is deliberately different from the analyzerId value
    // to catch the "keyed off cat name instead of alias" regression.
    const outer = {
      baseAnalyzerId: "prebuilt-document",
      config: {
        enableSegment: true,
        contentCategories: {
          invoice_bucket: { description: "d", analyzerId: "invoice" },
          loan_bucket: { description: "d", analyzerId: "loan_application" },
        },
      },
    };

    const wired = wireInnerIds(
      outer,
      new Map([
        ["invoice", "real-invoice-id"],
        ["loan_application", "real-loan-id"],
      ]),
    );

    assert.deepEqual(wired.errors, [], "expected no errors");
    const cats = (wired.patched["config"] as Record<string, unknown>)[
      "contentCategories"
    ] as Record<string, Record<string, unknown>>;
    assert.equal(cats["invoice_bucket"]["analyzerId"], "real-invoice-id");
    assert.equal(cats["loan_bucket"]["analyzerId"], "real-loan-id");
    // Outer schema must not be mutated in place.
    assert.equal(
      (
        (outer.config as Record<string, unknown>)["contentCategories"] as Record<
          string,
          Record<string, unknown>
        >
      )["invoice_bucket"]["analyzerId"],
      "invoice",
      "wireInnerIds mutated its input",
    );
  });

  it("keeps 'prebuilt-*' analyzerId values as-is (no --inner-schema required)", () => {
    const outer = {
      baseAnalyzerId: "prebuilt-document",
      config: {
        enableSegment: true,
        contentCategories: {
          invoice: { description: "d", analyzerId: "prebuilt-invoice" },
          receipt: { description: "d", analyzerId: "prebuilt-receipt" },
        },
      },
    };

    const wired = wireInnerIds(outer, new Map());
    assert.deepEqual(wired.errors, [], "prebuilt-* values must not require aliases");
    const cats = (wired.patched["config"] as Record<string, unknown>)[
      "contentCategories"
    ] as Record<string, Record<string, unknown>>;
    assert.equal(cats["invoice"]["analyzerId"], "prebuilt-invoice");
    assert.equal(cats["receipt"]["analyzerId"], "prebuilt-receipt");
  });

  it("returns an error when a category references an unknown alias", () => {
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

    const wired = wireInnerIds(outer, new Map([["invoice", "real-invoice-id"]]));
    assert.ok(wired.errors.length > 0, "expected an error for missing alias");
    assert.ok(
      wired.errors.some((e) => e.includes("loan_application") && e.includes("loan")),
      `expected error to name missing alias + category, got: ${JSON.stringify(wired.errors)}`,
    );
  });

  it("returns an error when an inner-schema alias is supplied but never used", () => {
    const outer = {
      baseAnalyzerId: "prebuilt-document",
      config: {
        enableSegment: true,
        contentCategories: {
          invoice: { description: "d", analyzerId: "invoice" },
        },
      },
    };

    const wired = wireInnerIds(
      outer,
      new Map([
        ["invoice", "real-invoice-id"],
        ["extra", "real-extra-id"],
      ]),
    );
    assert.ok(wired.errors.length > 0, "expected an error for unused alias");
    assert.ok(
      wired.errors.some((e) => e.includes("extra") && e.includes("no category")),
      `expected error to name unused alias, got: ${JSON.stringify(wired.errors)}`,
    );
  });

  it("allows categories without analyzerId (classification-only bucket)", () => {
    const outer = {
      baseAnalyzerId: "prebuilt-document",
      config: {
        enableSegment: true,
        contentCategories: {
          invoice: { description: "d", analyzerId: "invoice" },
          other: { description: "catch-all classification bucket" },
        },
      },
    };

    const wired = wireInnerIds(outer, new Map([["invoice", "real-invoice-id"]]));
    assert.deepEqual(wired.errors, [], "categories without analyzerId must be allowed");
    const cats = (wired.patched["config"] as Record<string, unknown>)[
      "contentCategories"
    ] as Record<string, Record<string, unknown>>;
    assert.ok(!("analyzerId" in cats["other"]), "'other' must remain analyzerId-less");
  });
});
