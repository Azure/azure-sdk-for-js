// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { parseXML } from "../lib/util/xml";
import { assert } from "chai";
import * as msAssert from "./msAssert";

describe("XML serializer", function() {
  describe("parseXML(string)", function() {
    it("with undefined", async function() {
      const error: Error = await msAssert.throwsAsync(parseXML(undefined as any));
      assert.notStrictEqual(
        error.message.indexOf("Document is empty"),
        -1,
        `error.message ("${error.message}") should have contained "Document is empty"`
      );
    });

    it("with null", async function() {
      // tslint:disable-next-line:no-null-keyword
      const error: Error = await msAssert.throwsAsync(parseXML(null as any));
      assert.notStrictEqual(
        error.message.indexOf("Document is empty"),
        -1,
        `error.message ("${error.message}") should have contained "Document is empty"`
      );
    });

    it("with empty", async function() {
      await msAssert.throwsAsync(parseXML(""));
    });

    it("with text", async function() {
      await msAssert.throwsAsync(parseXML("Hello World!"));
    });

    it("with empty element", async function() {
      const xml: any = await parseXML("<fruit/>");
      assert.deepStrictEqual(xml, ``);
    });

    it("with empty element with attribute", async function() {
      const xml: any = await parseXML(`<fruit healthy="true" />`);
      assert.deepStrictEqual(xml, {
        $: {
          healthy: "true"
        }
      });
    });

    it("with element", async function() {
      const xml: any = await parseXML("<fruit></fruit>");
      assert.deepStrictEqual(xml, ``);
    });

    it("with element with value", async function() {
      const xml: any = await parseXML("<fruit>hurray</fruit>");
      assert.deepStrictEqual(xml, `hurray`);
    });

    it("with element with attribute", async function() {
      const xml: any = await parseXML(`<fruit healthy="true"></fruit>`);
      assert.deepStrictEqual(xml, {
        $: {
          healthy: "true"
        }
      });
    });

    it("with element with attribute and value", async function() {
      const xml: any = await parseXML(`<fruit healthy="true">yum</fruit>`);
      assert.deepStrictEqual(xml, {
        $: {
          healthy: "true"
        },
        _: "yum"
      });
    });

    it("with element with child empty element", async function() {
      const xml: any = await parseXML(`<fruit><apples/></fruit>`);
      assert.deepStrictEqual(xml, {
        apples: ``
      });
    });

    it("with element with child empty element with attribute", async function() {
      const xml: any = await parseXML(`<fruit><apples tasty="true"/></fruit>`);
      assert.deepStrictEqual(xml, {
        apples: {
          $: {
            tasty: "true"
          }
        }
      });
    });

    it("with element with child element with value", async function() {
      const xml: any = await parseXML(`<fruit><apples>yum</apples></fruit>`);
      assert.deepStrictEqual(xml, {
        apples: "yum"
      });
    });

    it("with element with child element with attribute and value", async function() {
      const xml: any = await parseXML(`<fruit><apples tasty="true">yum</apples></fruit>`);
      assert.deepStrictEqual(xml, {
        apples: {
          $: {
            tasty: "true"
          },
          _: "yum"
        }
      });
    });
  });

  it("should handle errors gracefully", async function() {
    try {
      await parseXML("INVALID");
      throw new Error("did not throw");
    } catch (err) {
      if (err.message === "did not throw") {
        throw err;
      }
    }
  });
});
