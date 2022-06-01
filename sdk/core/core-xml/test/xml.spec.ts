// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseXML, stringifyXML } from "../src";
import { assert } from "chai";

describe("XML serializer", function () {
  describe("parseXML(string)", function () {
    it("with undefined", async function () {
      try {
        // @ts-expect-error - intentional error for test
        await parseXML(undefined);
        assert.fail("Expected error");
      } catch (error: any) {
        assert.ok(
          error.message.indexOf("Document is empty") !== -1 || // Chrome
            (error.message.startsWith("XML Parsing Error: syntax error") &&
              error.message.indexOf("undefined") !== -1), // Firefox
          `error.message ("${error.message}") should have contained "Document is empty" or "undefined"`
        );
      }
    });

    it("with null", async function () {
      try {
        // @ts-expect-error - intentional error for test
        await parseXML(null);
        assert.fail("Expected error");
      } catch (error: any) {
        assert.ok(
          error.message.indexOf("Document is empty") !== -1 || // Chrome
            (error.message.startsWith("XML Parsing Error: syntax error") &&
              error.message.indexOf("null") !== -1), // Firefox
          `error.message ("${error.message}") should have contained "Document is empty" or "null"`
        );
      }
    });

    it("with empty", async function () {
      try {
        await parseXML("");
        assert.fail("Expected error");
      } catch (error: any) {
        // ignored
      }
    });

    it("with text", async function () {
      try {
        await parseXML("");
        assert.fail("Hello World!");
      } catch (error: any) {
        // ignored
      }
    });

    it("with empty element", async function () {
      const xml = await parseXML("<fruit/>");
      assert.deepStrictEqual(xml, ``);
    });

    it("with empty element with attribute", async function () {
      const xml = await parseXML(`<fruit healthy="true" />`);
      assert.deepStrictEqual(xml, {
        $: {
          healthy: "true",
        },
      });
    });

    it("with element", async function () {
      const xml = await parseXML("<fruit></fruit>");
      assert.deepStrictEqual(xml, ``);
    });

    it("with element with value", async function () {
      const xml = await parseXML("<fruit>hurray</fruit>");
      assert.deepStrictEqual(xml, `hurray`);
    });

    it("with element with attribute", async function () {
      const xml = await parseXML(`<fruit healthy="true"></fruit>`);
      assert.deepStrictEqual(xml, {
        $: {
          healthy: "true",
        },
      });
    });

    it("with element with nested attribute", async function () {
      const xml = await parseXML(`<vegetable><fruit healthy="true"/></vegetable>`);
      assert.deepStrictEqual(xml, {
        fruit: {
          $: {
            healthy: "true",
          },
        },
      });
    });

    it("with element with nested attribute and root", async function () {
      const xml = await parseXML(`<vegetable><fruit healthy="true"/></vegetable>`, {
        includeRoot: true,
      });
      assert.deepStrictEqual(xml, {
        vegetable: {
          fruit: {
            $: {
              healthy: "true",
            },
          },
        },
      });
    });

    it("with element with attribute and value", async function () {
      const xml = await parseXML(`<fruit healthy="true">yum</fruit>`);
      assert.deepStrictEqual(xml, {
        $: {
          healthy: "true",
        },
        _: "yum",
      });
    });

    it("with element with child empty element", async function () {
      const xml = await parseXML(`<fruit><apples/></fruit>`);
      assert.deepStrictEqual(xml, {
        apples: ``,
      });
    });

    it("with element with child empty element with attribute", async function () {
      const xml = await parseXML(`<fruit><apples tasty="true"/></fruit>`);
      assert.deepStrictEqual(xml, {
        apples: {
          $: {
            tasty: "true",
          },
        },
      });
    });

    it("with element with child element with value", async function () {
      const xml = await parseXML(`<fruit><apples>yum</apples></fruit>`);
      assert.deepStrictEqual(xml, {
        apples: "yum",
      });
    });

    it("with element with child element with attribute and value", async function () {
      const xml = await parseXML(`<fruit><apples tasty="true">yum</apples></fruit>`);
      assert.deepStrictEqual(xml, {
        apples: {
          $: {
            tasty: "true",
          },
          _: "yum",
        },
      });
    });
  });

  describe("parseXML(string) with root", function () {
    it("with empty element", async function () {
      const json: any = await parseXML("<fruit/>", { includeRoot: true });
      assert.deepStrictEqual(json, { fruit: `` });
    });

    it("with empty element with attribute", async function () {
      const json: any = await parseXML(`<fruit healthy="true" />`, {
        includeRoot: true,
      });
      assert.deepStrictEqual(json, {
        fruit: {
          $: {
            healthy: "true",
          },
        },
      });
    });

    it("with empty element with numeric attribute", async function () {
      const json: any = await parseXML(`<fruit days="3"/>`, {
        includeRoot: true,
      });
      assert.deepStrictEqual(json, {
        fruit: {
          $: {
            days: "3",
          },
        },
      });
    });

    it("with empty element with numeric value", async function () {
      const json: any = await parseXML(`<fruit>3</fruit>`, {
        includeRoot: true,
      });
      assert.deepStrictEqual(json, {
        fruit: "3",
      });
    });

    it("with empty element with string value", async function () {
      const json: any = await parseXML(`<fruit>foo</fruit>`, {
        includeRoot: true,
      });
      assert.deepStrictEqual(json, {
        fruit: "foo",
      });
    });

    it("with element", async function () {
      const json: any = await parseXML("<fruit></fruit>", { includeRoot: true });
      assert.deepStrictEqual(json, { fruit: `` });
    });

    it("with atribute namespace", async () => {
      const json = await parseXML(
        `<h:table xmlns:h="http://www.w3.org/TR/html4/">
          <h:tr>
            <h:td>Apples</h:td>
            <h:td>Bananas</h:td>
          </h:tr>
        </h:table>`,
        { includeRoot: true }
      );

      assert.deepEqual(json, {
        "h:table": {
          $: { "xmlns:h": "http://www.w3.org/TR/html4/" },
          "h:tr": {
            "h:td": ["Apples", "Bananas"],
          },
        },
      });
    });

    it("with element with value", async function () {
      const json: any = await parseXML("<fruit>hurray</fruit>", { includeRoot: true });
      assert.deepStrictEqual(json, { fruit: `hurray` });
    });

    it("with unwanted BOM characters", async function () {
      const json: any = await parseXML("\uFEFF<fruit>apple</fruit>", {
        includeRoot: true,
      });
      assert.deepStrictEqual(json, { fruit: "apple" });
    });

    it("with element with attribute", async function () {
      const json: any = await parseXML(`<fruit healthy="true"></fruit>`, {
        includeRoot: true,
      });
      assert.deepStrictEqual(json, {
        fruit: {
          $: {
            healthy: "true",
          },
        },
      });
    });

    it("with element with attribute and value", async function () {
      const json: any = await parseXML(`<fruit healthy="true">yum</fruit>`, {
        includeRoot: true,
      });
      assert.deepStrictEqual(json, {
        fruit: {
          $: {
            healthy: "true",
          },
          _: "yum",
        },
      });
    });

    it("with element with child empty element", async function () {
      const json: any = await parseXML(`<fruit><apples/></fruit>`, {
        includeRoot: true,
      });
      assert.deepStrictEqual(json, {
        fruit: {
          apples: ``,
        },
      });
    });

    it("with element with child empty element with attribute", async function () {
      const json: any = await parseXML(`<apples tasty="true"/>`, { includeRoot: true });
      assert.deepStrictEqual(json, {
        apples: {
          $: {
            tasty: "true",
          },
        },
      });
    });

    it("with element with child element with value", async function () {
      const json: any = await parseXML(`<apples>yum</apples>`, { includeRoot: true });
      assert.deepStrictEqual(json, {
        apples: "yum",
      });
    });

    it("with element with child element with attribute and value", async function () {
      const json: any = await parseXML(`<apples tasty="true">yum</apples>`, {
        includeRoot: true,
      });
      assert.deepStrictEqual(json, {
        apples: {
          $: {
            tasty: "true",
          },
          _: "yum",
        },
      });
    });

    it("should handle errors gracefully", async function () {
      try {
        await parseXML("INVALID", { includeRoot: true });
        throw new Error("did not throw");
      } catch (err: any) {
        if (err.message === "did not throw") {
          throw err;
        }
      }
    });
  });

  describe("stringifyXML(JSON) with root", function () {
    it("with empty element with attribute", async function () {
      const xml = stringifyXML(
        {
          fruit: {
            $: {
              healthy: "true",
            },
          },
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit healthy="true"/></fruits>`
      );
    });

    it("with element", async function () {
      const xml = stringifyXML({ fruit: `` }, { rootName: "fruits" });
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit/></fruits>`
      );
    });

    it("with element with value", async function () {
      const xml = stringifyXML({ fruit: `hurray` }, { rootName: "fruits" });
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit>hurray</fruit></fruits>`
      );
    });

    it("with element with attribute", async function () {
      const xml = stringifyXML(
        {
          fruit: {
            $: {
              healthy: "true",
            },
          },
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit healthy="true"/></fruits>`
      );
    });

    it("with element with attribute nested", async function () {
      const xml = stringifyXML(
        {
          vegetable: {
            $: { green: false },
            fruit: {
              $: {
                healthy: "true",
              },
            },
          },
        },
        { includeRoot: false }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><root><vegetable green="false"><fruit healthy="true"/></vegetable></root>`
      );
    });

    it("with element with attribute and value", async function () {
      const xml = stringifyXML(
        {
          fruit: {
            $: {
              healthy: "true",
            },
            _: "yum",
          },
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit healthy="true">yum</fruit></fruits>`
      );
    });

    it("with element with attribute and value", async function () {
      const xml = stringifyXML(
        {
          fruit: {
            $: {
              healthy: "true",
            },
            _: "yum",
          },
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit healthy="true">yum</fruit></fruits>`
      );
    });

    it("with element with child empty element", async function () {
      const xml = stringifyXML(
        {
          fruit: {
            apples: "",
          },
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><fruit><apples/></fruit></fruits>`
      );
    });

    it("with element with child empty element with attribute", async function () {
      const xml = stringifyXML(
        {
          apples: {
            $: {
              tasty: "true",
            },
          },
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><apples tasty="true"/></fruits>`
      );
    });

    it("with element with child element with value", async function () {
      const xml = stringifyXML(
        {
          apples: "yum",
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><apples>yum</apples></fruits>`
      );
    });

    it("with element with child element with attribute and value", async function () {
      const xml = stringifyXML(
        {
          apples: {
            $: {
              tasty: "true",
            },
            _: "yum",
          },
        },
        { rootName: "fruits" }
      );
      assert.deepStrictEqual(
        xml,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><fruits><apples tasty="true">yum</apples></fruits>`
      );
    });

    it("with underscore element", async function () {
      const str = "<Metadata><h>v</h><_>underscore</_></Metadata>";
      const parsed = await parseXML(str, { xmlCharKey: "#" });
      assert.deepStrictEqual(parsed, {
        h: "v",
        _: "underscore",
      });
    });
  });

  it("should parse xml with root <?xml?> element", async () => {
    const str = `<?xml version="1.0" encoding="utf-8"?><SignedIdentifiers><SignedIdentifier><Id>null</Id></SignedIdentifier><SignedIdentifier><Id>empty</Id></SignedIdentifier><SignedIdentifier><Id>partial</Id><AccessPolicy><Permission>r</Permission></AccessPolicy></SignedIdentifier><SignedIdentifier><Id>full</Id><AccessPolicy><Start>2021-07-08T09:10:09.0000000Z</Start><Expiry>2021-07-08T09:10:09.0000000Z</Expiry><Permission>r</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>`;
    const parsed = await parseXML(str);
    assert.deepEqual(parsed, {
      SignedIdentifier: [
        {
          Id: "null",
        },
        {
          Id: "empty",
        },
        {
          AccessPolicy: {
            Permission: "r",
          },
          Id: "partial",
        },
        {
          AccessPolicy: {
            Expiry: "2021-07-08T09:10:09.0000000Z",
            Permission: "r",
            Start: "2021-07-08T09:10:09.0000000Z",
          },
          Id: "full",
        },
      ],
    });
  });

  it("should handle urlEncoded content", async () => {
    const input = `<entry xmlns="http://www.w3.org/2005/Atom"><id>https://daschulttest1.servicebus.windows.net/testQueuePath/?api-version=2017-04&amp;enrich=False</id><title type="text">testQueuePath</title><published>2018-10-09T19:56:34Z</published><updated>2018-10-09T19:56:35Z</updated><author><name>daschulttest1</name></author><link rel="self" href="https://daschulttest1.servicebus.windows.net/testQueuePath/?api-version=2017-04&amp;enrich=False"/><content type="application/xml"><QueueDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><LockDuration>PT1M</LockDuration><MaxSizeInMegabytes>1024</MaxSizeInMegabytes><RequiresDuplicateDetection>false</RequiresDuplicateDetection><RequiresSession>false</RequiresSession><DefaultMessageTimeToLive>P14D</DefaultMessageTimeToLive><DeadLetteringOnMessageExpiration>false</DeadLetteringOnMessageExpiration><DuplicateDetectionHistoryTimeWindow>PT10M</DuplicateDetectionHistoryTimeWindow><MaxDeliveryCount>10</MaxDeliveryCount><EnableBatchedOperations>true</EnableBatchedOperations><SizeInBytes>0</SizeInBytes><MessageCount>0</MessageCount><IsAnonymousAccessible>false</IsAnonymousAccessible><AuthorizationRules></AuthorizationRules><Status>Active</Status><CreatedAt>2018-10-09T19:56:34.903Z</CreatedAt><UpdatedAt>2018-10-09T19:56:35.013Z</UpdatedAt><AccessedAt>0001-01-01T00:00:00Z</AccessedAt><SupportOrdering>true</SupportOrdering><CountDetails xmlns:d2p1="http://schemas.microsoft.com/netservices/2011/06/servicebus"><d2p1:ActiveMessageCount>0</d2p1:ActiveMessageCount><d2p1:DeadLetterMessageCount>0</d2p1:DeadLetterMessageCount><d2p1:ScheduledMessageCount>0</d2p1:ScheduledMessageCount><d2p1:TransferMessageCount>0</d2p1:TransferMessageCount><d2p1:TransferDeadLetterMessageCount>0</d2p1:TransferDeadLetterMessageCount></CountDetails><AutoDeleteOnIdle>P10675199DT2H48M5.4775807S</AutoDeleteOnIdle><EnablePartitioning>false</EnablePartitioning><EntityAvailabilityStatus>Available</EntityAvailabilityStatus><EnableExpress>false</EnableExpress></QueueDescription></content></entry>`;
    const parsed = await parseXML(input);
    assert.equal(
      parsed.id,
      "https://daschulttest1.servicebus.windows.net/testQueuePath/?api-version=2017-04&enrich=False"
    );
  });

  it("should handle errors gracefully", async function () {
    try {
      await parseXML("INVALID");
      throw new Error("did not throw");
    } catch (err: any) {
      if (err.message === "did not throw") {
        throw err;
      }
    }
  });
});
