// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Unit tests for pure helpers in createAndTestRouterCommand.ts. Mirrors
 * the portion of Python's tests/test_skills_classify_route_router.py that
 * does not require mocking the Azure client.
 */

import { strict as assert } from "node:assert";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  discoverInnerFromDir,
  summarizeRouted,
  versionSortKey,
  wireInnerIds,
} from "./createAndTestRouterCommand.js";

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

describe("versionSortKey — pure key extractor", () => {
  it("returns group 0 for the bare alias (no suffix)", () => {
    const [g, v] = versionSortKey("invoice", "invoice");
    assert.equal(g, 0);
    assert.equal(v, 0);
  });

  it("returns group 1 with numeric version for `_v<N>` suffix (v10 > v9)", () => {
    const v9 = versionSortKey("invoice_v9", "invoice");
    const v10 = versionSortKey("invoice_v10", "invoice");
    assert.deepEqual(v9, [1, 9, ""]);
    assert.deepEqual(v10, [1, 10, ""]);
    // The whole point of the fix.
    assert.ok(v10[1] > v9[1], "v10 must sort higher than v9 by numeric version");
  });

  it("also recognises `_<N>` (no `v` prefix) as a numeric version", () => {
    assert.deepEqual(versionSortKey("invoice_42", "invoice"), [1, 42, ""]);
  });

  it("returns group 2 with lexicographic suffix for non-numeric suffixes", () => {
    assert.deepEqual(versionSortKey("invoice_draft", "invoice"), [2, 0, "draft"]);
  });
});

describe("discoverInnerFromDir — alias-to-file resolution", () => {
  // Each test writes a fresh temp dir, sets up files, exercises the helper,
  // then rms. Mirrors the discovery behaviour of Python's
  // `_discover_inner_from_dir` and .NET's `DiscoverInnerFromDir`.

  function outerWith(aliases: Array<string | null>): Record<string, unknown> {
    // Build an outer classifier schema with N categories, each carrying the
    // supplied analyzerId (or none if `null`).
    const cats: Record<string, Record<string, unknown>> = {};
    aliases.forEach((a, i) => {
      const entry: Record<string, unknown> = { description: `d${i}` };
      if (a !== null) entry["analyzerId"] = a;
      cats[`cat_${i}`] = entry;
    });
    return {
      baseAnalyzerId: "prebuilt-document",
      config: {
        enableSegment: true,
        contentCategories: cats,
      },
    };
  }

  function withTempDir(fn: (dir: string) => void): void {
    const dir = mkdtempSync(join(tmpdir(), "cu-skill-discover-"));
    try {
      fn(dir);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }

  it("resolves aliases by exact-match filename stem", () => {
    withTempDir((dir) => {
      writeFileSync(join(dir, "invoice.json"), "{}");
      writeFileSync(join(dir, "bank_statement.json"), "{}");

      const outer = outerWith(["invoice", "bank_statement"]);
      const resolved = discoverInnerFromDir(outer, dir);

      assert.ok(resolved !== null, "should not return null on success");
      assert.equal(resolved!.size, 2);
      assert.equal(resolved!.get("invoice"), join(dir, "invoice.json"));
      assert.equal(resolved!.get("bank_statement"), join(dir, "bank_statement.json"));
    });
  });

  it("picks natural version max, so `_v10` beats `_v9` (regression: alphabetical was wrong)", () => {
    // Regression: the previous implementation did `.sort()` and took the
    // last element, so alphabetical order applied — but '1' < '9' char-
    // by-char, meaning `invoice_v10.json` sorted BEFORE `invoice_v9.json`.
    // "Alphabetical last" then picked v9, silently loading the older
    // schema. Copilot flagged this on the .NET PR (#60394); the natural
    // version sort fix mirrors what .NET / Java / Python ship now.
    withTempDir((dir) => {
      writeFileSync(join(dir, "invoice_v1.json"), "{}");
      writeFileSync(join(dir, "invoice_v2.json"), "{}");
      writeFileSync(join(dir, "invoice_v9.json"), "{}");
      writeFileSync(join(dir, "invoice_v10.json"), "{}");

      const resolved = discoverInnerFromDir(outerWith(["invoice"]), dir);
      assert.ok(resolved !== null);
      assert.equal(
        resolved!.get("invoice"),
        join(dir, "invoice_v10.json"),
        "v10 must beat v9 (natural version order, not alphabetical)",
      );
    });
  });

  it("prefers versioned suffix over bare alias baseline", () => {
    // A bare `<alias>.json` is group 0 (baseline); versioned files are
    // group 1 (numeric) or group 2 (other suffix). So any versioned
    // file beats the bare baseline as "newer".
    withTempDir((dir) => {
      writeFileSync(join(dir, "invoice.json"), "{}");
      writeFileSync(join(dir, "invoice_v1.json"), "{}");

      const resolved = discoverInnerFromDir(outerWith(["invoice"]), dir);
      assert.ok(resolved !== null);
      assert.equal(resolved!.get("invoice"), join(dir, "invoice_v1.json"));
    });
  });

  it("skips categories whose analyzerId starts with `prebuilt-`", () => {
    withTempDir((dir) => {
      writeFileSync(join(dir, "invoice.json"), "{}");
      // No `prebuilt-invoice.json` needed on disk — it's a service alias.

      const outer = outerWith(["invoice", "prebuilt-invoice"]);
      const resolved = discoverInnerFromDir(outer, dir);

      assert.ok(resolved !== null, "prebuilt-* must not cause a failure");
      assert.equal(resolved!.size, 1);
      assert.equal(resolved!.has("invoice"), true);
      assert.equal(resolved!.has("prebuilt-invoice"), false);
    });
  });

  it("skips categories without an `analyzerId` (classification-only buckets)", () => {
    withTempDir((dir) => {
      writeFileSync(join(dir, "invoice.json"), "{}");

      const outer = outerWith(["invoice", null]);
      const resolved = discoverInnerFromDir(outer, dir);

      assert.ok(resolved !== null);
      assert.equal(resolved!.size, 1);
    });
  });

  it("returns null and reports every missing alias in the error message", () => {
    withTempDir((dir) => {
      writeFileSync(join(dir, "invoice.json"), "{}");

      const errs: string[] = [];
      const origError = console.error;
      console.error = (msg: string): void => {
        errs.push(msg);
      };
      try {
        const resolved = discoverInnerFromDir(
          outerWith(["invoice", "bank_statement", "loan_application"]),
          dir,
        );
        assert.equal(resolved, null, "missing aliases must yield null");
      } finally {
        console.error = origError;
      }

      const joined = errs.join(" ");
      assert.ok(joined.includes("bank_statement"), "error must name bank_statement");
      assert.ok(joined.includes("loan_application"), "error must name loan_application");
      assert.ok(!joined.includes("[invoice]"), "resolved alias must not be listed as missing");
    });
  });

  it("ignores unrelated JSON files in the directory", () => {
    withTempDir((dir) => {
      writeFileSync(join(dir, "invoice.json"), "{}");
      writeFileSync(join(dir, "notes.json"), "{}"); // not a category alias
      writeFileSync(join(dir, "settings.json"), "{}"); // not a category alias

      const resolved = discoverInnerFromDir(outerWith(["invoice"]), dir);
      assert.ok(resolved !== null);
      assert.equal(resolved!.size, 1);
      assert.equal(resolved!.get("invoice"), join(dir, "invoice.json"));
    });
  });

  it("treats a category with a non-string analyzerId as skippable", () => {
    withTempDir((dir) => {
      writeFileSync(join(dir, "invoice.json"), "{}");

      const outer = {
        baseAnalyzerId: "prebuilt-document",
        config: {
          enableSegment: true,
          contentCategories: {
            invoice: { description: "d", analyzerId: "invoice" },
            broken: { description: "d", analyzerId: 42 as unknown as string },
          },
        },
      };
      const resolved = discoverInnerFromDir(outer, dir);
      assert.ok(resolved !== null, "non-string analyzerId must be tolerated");
      assert.equal(resolved!.size, 1);
    });
  });

  it("returns an empty map when the outer schema has no categories at all", () => {
    withTempDir((dir) => {
      const outer = {
        baseAnalyzerId: "prebuilt-document",
        config: { enableSegment: true, contentCategories: {} },
      };
      const resolved = discoverInnerFromDir(outer, dir);
      assert.ok(resolved !== null);
      assert.equal(resolved!.size, 0);
    });
  });
});
