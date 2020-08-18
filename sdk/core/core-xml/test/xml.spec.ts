// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseXML, stringifyXML } from "../src";
import { assert } from "chai";

describe("XML serializer", function() {
  describe("parseXML(string)", function() {
    it("with undefined", async function() {
      try {
        // @ts-expect-error
        await parseXML(undefined);
        assert.fail("Expected error");
      } catch (error) {
        assert.ok(
          error.message.indexOf("Document is empty") !== -1 || // Chrome
            (error.message.startsWith("XML Parsing Error: syntax error") &&
              error.message.indexOf("undefined") !== -1), // Firefox
          `error.message ("${error.message}") should have contained "Document is empty" or "undefined"`
        );
      }
    });

    it("with null", async function() {
      try {
        // @ts-expect-error
        await parseXML(null);
        assert.fail("Expected error");
      } catch (error) {
        assert.ok(
          error.message.indexOf("Document is empty") !== -1 || // Chrome
            (error.message.startsWith("XML Parsing Error: syntax error") &&
              error.message.indexOf("null") !== -1), // Firefox
          `error.message ("${error.message}") should have contained "Document is empty" or "null"`
        );
      }
    });

    it("with empty", async function() {
      try {
        await parseXML("");
        assert.fail("Expected error");
      } catch (error) {
        // ignored
      }
    });

    it("with text", async function() {
      try {
        await parseXML("");
        assert.fail("Hello World!");
      } catch (error) {
        // ignored
      }
    });

    it("with empty element", async function() {
      const xml = await parseXML("<fruit/>");
      assert.deepStrictEqual(xml, ``);
    });

    it("with empty element with attribute", async function() {
      const xml = await parseXML(`<fruit healthy="true" />`);
      assert.deepStrictEqual(xml, {
        $: {
          healthy: "true"
        }
      });
    });

    it("with element", async function() {
      const xml = await parseXML("<fruit></fruit>");
      assert.deepStrictEqual(xml, ``);
    });

    it("with element with value", async function() {
      const xml = await parseXML("<fruit>hurray</fruit>");
      assert.deepStrictEqual(xml, `hurray`);
    });

    it("with element with attribute", async function() {
      const xml = await parseXML(`<fruit healthy="true"></fruit>`);
      assert.deepStrictEqual(xml, {
        $: {
          healthy: "true"
        }
      });
    });

    it("with element with attribute and value", async function() {
      const xml = await parseXML(`<fruit healthy="true">yum</fruit>`);
      assert.deepStrictEqual(xml, {
        $: {
          healthy: "true"
        },
        _: "yum"
      });
    });

    it("with element with child empty element", async function() {
      const xml = await parseXML(`<fruit><apples/></fruit>`);
      assert.deepStrictEqual(xml, {
        apples: ``
      });
    });

    it("with element with child empty element with attribute", async function() {
      const xml = await parseXML(`<fruit><apples tasty="true"/></fruit>`);
      assert.deepStrictEqual(xml, {
        apples: {
          $: {
            tasty: "true"
          }
        }
      });
    });

    it("with element with child element with value", async function() {
      const xml = await parseXML(`<fruit><apples>yum</apples></fruit>`);
      assert.deepStrictEqual(xml, {
        apples: "yum"
      });
    });

    it("with element with child element with attribute and value", async function() {
      const xml = await parseXML(`<fruit><apples tasty="true">yum</apples></fruit>`);
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

  describe("parseXML(string) with root", function() {
    it("with empty element", async function() {
      const json: any = await parseXML("<fruit/>", { includeRoot: true });
      assert.deepStrictEqual(json, { fruit: `` });
    });

    it("with empty element with attribute", async function() {
      const json: any = await parseXML(`<fruit healthy="true" />`, {
        includeRoot: true
      });
      assert.deepStrictEqual(json, {
        fruit: {
          $: {
            healthy: "true"
          }
        }
      });
    });

    it("with element", async function() {
      const json: any = await parseXML("<fruit></fruit>", { includeRoot: true });
      assert.deepStrictEqual(json, { fruit: `` });
    });

    it("with element with value", async function() {
      const json: any = await parseXML("<fruit>hurray</fruit>", { includeRoot: true });
      assert.deepStrictEqual(json, { fruit: `hurray` });
    });

    it("with unwanted BOM characters", async function() {
      const json: any = await parseXML("\uFEFF<fruit>apple</fruit>", {
        includeRoot: true
      });
      assert.deepStrictEqual(json, { fruit: "apple" });
    });

    it("with element with attribute", async function() {
      const json: any = await parseXML(`<fruit healthy="true"></fruit>`, {
        includeRoot: true
      });
      assert.deepStrictEqual(json, {
        fruit: {
          $: {
            healthy: "true"
          }
        }
      });
    });

    it("with element with attribute and value", async function() {
      const json: any = await parseXML(`<fruit healthy="true">yum</fruit>`, {
        includeRoot: true
      });
      assert.deepStrictEqual(json, {
        fruit: {
          $: {
            healthy: "true"
          },
          _: "yum"
        }
      });
    });

    it("with element with child empty element", async function() {
      const json: any = await parseXML(`<fruit><apples/></fruit>`, {
        includeRoot: true
      });
      assert.deepStrictEqual(json, {
        fruit: {
          apples: ``
        }
      });
    });

    it("with element with child empty element with attribute", async function() {
      const json: any = await parseXML(`<apples tasty="true"/>`, { includeRoot: true });
      assert.deepStrictEqual(json, {
        apples: {
          $: {
            tasty: "true"
          }
        }
      });
    });

    it("with element with child element with value", async function() {
      const json: any = await parseXML(`<apples>yum</apples>`, { includeRoot: true });
      assert.deepStrictEqual(json, {
        apples: "yum"
      });
    });

    it("with element with child element with attribute and value", async function() {
      const json: any = await parseXML(`<apples tasty="true">yum</apples>`, {
        includeRoot: true
      });
      assert.deepStrictEqual(json, {
        apples: {
          $: {
            tasty: "true"
          },
          _: "yum"
        }
      });
    });

    it("should handle errors gracefully", async function() {
      try {
        await parseXML("INVALID", { includeRoot: true });
        throw new Error("did not throw");
      } catch (err) {
        if (err.message === "did not throw") {
          throw err;
        }
      }
    });
  });

  describe("stringifyXML(JSON) with root", function() {
    it("with empty element with attribute", async function() {
      const xml = await stringifyXML(
        {
          fruit: {
            $: {
              healthy: "true"
            }
          }
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit healthy="true"/></fruits>`
      );
    });

    it("with element", async function() {
      const xml = await stringifyXML({ fruit: `` }, { rootName: "fruits" });
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit/></fruits>`
      );
    });

    it("with element with value", async function() {
      const xml = await stringifyXML({ fruit: `hurray` }, { rootName: "fruits" });
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit>hurray</fruit></fruits>`
      );
    });

    it("with element with attribute", async function() {
      const xml = await stringifyXML(
        {
          fruit: {
            $: {
              healthy: "true"
            }
          }
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit healthy="true"/></fruits>`
      );
    });

    it("with element with attribute and value", async function() {
      const xml = await stringifyXML(
        {
          fruit: {
            $: {
              healthy: "true"
            },
            _: "yum"
          }
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit healthy="true">yum</fruit></fruits>`
      );
    });

    it("with element with attribute and value", async function() {
      const xml = await stringifyXML(
        {
          fruit: {
            $: {
              healthy: "true"
            },
            _: "yum"
          }
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit healthy="true">yum</fruit></fruits>`
      );
    });

    it("with element with child undefined element", async function() {
      const xml = await stringifyXML(
        {
          fruit: {
            apples: undefined
          }
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit><apples/></fruit></fruits>`
      );
    });

    it("with element with child empty element with attribute", async function() {
      const xml = await stringifyXML(
        {
          apples: {
            $: {
              tasty: "true"
            }
          }
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><apples tasty="true"/></fruits>`
      );
    });

    it("with element with child element with value", async function() {
      const xml = await stringifyXML(
        {
          apples: "yum"
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><apples>yum</apples></fruits>`
      );
    });

    it("with element with child element with attribute and value", async function() {
      const xml = await stringifyXML(
        {
          apples: {
            $: {
              tasty: "true"
            },
            _: "yum"
          }
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><apples tasty="true">yum</apples></fruits>`
      );
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
