// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { parseXML, stringifyXML } from "../../../src/index.js";
import { describe, it, assert } from "vitest";

/**
 * React Native uses the fast-xml-parser implementation (same as Node).
 * These tests verify the XML API works correctly under the react-native
 * condition once a vitest.react-native.config.ts is added.
 */
describe("XML API (react-native)", function () {
  describe("parseXML", function () {
    it("parses a simple element", async function () {
      const result = await parseXML("<fruit>apple</fruit>");
      assert.strictEqual(result, "apple");
    });

    it("parses element with attributes", async function () {
      const result = await parseXML(`<fruit healthy="true">apple</fruit>`);
      assert.deepStrictEqual(result, {
        $: { healthy: "true" },
        _: "apple",
      });
    });

    it("parses nested elements", async function () {
      const result = await parseXML("<container><name>test</name><size>42</size></container>");
      assert.deepStrictEqual(result, { name: "test", size: "42" });
    });

    it("rejects empty input", async function () {
      try {
        await parseXML("");
        assert.fail("Expected error");
      } catch {
        // expected
      }
    });
  });

  describe("stringifyXML", function () {
    it("stringifies a simple object", function () {
      const xml = stringifyXML({ name: "test" }, { rootName: "item" });
      assert.include(xml, "<item>");
      assert.include(xml, "<name>test</name>");
      assert.include(xml, "</item>");
    });

    it("stringifies with attributes", function () {
      const xml = stringifyXML({ $: { id: "1" }, _: "value" }, { rootName: "item" });
      assert.include(xml, 'id="1"');
      assert.include(xml, "value");
    });
  });

  describe("round-trip", function () {
    it("preserves structure through stringify → parse", async function () {
      const obj = {
        Blobs: {
          Blob: [
            { Name: "file1.txt", Properties: { ContentLength: "1024" } },
            { Name: "file2.txt", Properties: { ContentLength: "2048" } },
          ],
        },
      };
      const xml = stringifyXML(obj, { rootName: "EnumerationResults" });
      const parsed = await parseXML(xml);
      assert.deepStrictEqual(parsed, obj);
    });

    it("round-trips with includeRoot", async function () {
      const obj = { root: { value: "test" } };
      const xml = stringifyXML(obj.root, { rootName: "root" });
      const parsed = await parseXML(xml, { includeRoot: true });
      assert.deepStrictEqual(parsed, obj);
    });
  });
});
