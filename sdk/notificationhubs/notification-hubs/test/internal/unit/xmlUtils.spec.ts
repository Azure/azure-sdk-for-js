// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  isJSONLikeObject,
  parseXMLError,
  sanitizeSerializableObject,
  serializeToAtomXmlRequest,
} from "../../../src/utils/xmlUtils.js";

const NOTIFICATION_XML_ERROR = `
<Error>
    <Code>400</Code>
    <Detail>The HTTP header "ServiceBusNotification-Format" has an invalid value: "fcmlegacy". Allowed values are "windows", "apple", "gcm", "template", "adm", or "windowsphone".</Detail>
</Error>
`;

describe("xmlUtils", () => {
  describe("parseXMLError", () => {
    it("should return undefined for undefined", async () => {
      // @ts-expect-error - intentional error for testing purposes
      const error = await parseXMLError(undefined);
      assert.isUndefined(error);
    });

    it("should return undefined for an empty string", async () => {
      const error = await parseXMLError("");
      assert.isUndefined(error);
    });

    it("should return undefined for invalid XML", async () => {
      const error = await parseXMLError("<foobar>");
      assert.isUndefined(error);
    });

    it("should return undefined for XML without an error element", async () => {
      const error = await parseXMLError("<foo></foo>");
      assert.isUndefined(error);
    });

    it("should parse the error", async () => {
      const error = await parseXMLError(NOTIFICATION_XML_ERROR);
      assert.equal(
        error,
        `The HTTP header "ServiceBusNotification-Format" has an invalid value: "fcmlegacy". Allowed values are "windows", "apple", "gcm", "template", "adm", or "windowsphone".`,
      );
    });
  });

  describe("isJSONLikeObject", () => {
    it("should return true for JSON-like objects", () => {
      assert.equal(isJSONLikeObject({ abc: 1 }), true);
    });

    it("should return false for arrays", () => {
      assert.equal(isJSONLikeObject(["a", "b"]), false);
    });

    it("should return false for arrays of JSON-like objects", () => {
      assert.equal(isJSONLikeObject([{ a: 1 }, { b: 2 }]), false);
    });

    it("should return false for Date objects", () => {
      assert.equal(isJSONLikeObject(new Date()), false);
    });

    it("should return false for non-object types", () => {
      assert.equal(isJSONLikeObject(123), false);
    });
  });

  describe("sanitizeSerializableObject", () => {
    it("should remove undefined/null values", () => {
      const resource = {
        key1: "value1",
        key2: undefined,
        key3: null,
        key4: {
          key5: "value5",
          key6: undefined,
          key7: null,
        },
      };

      sanitizeSerializableObject(resource);

      assert.deepEqual(resource, {
        key1: "value1",
        key4: {
          key5: "value5",
        },
      } as any);
    });
  });

  describe("serializeToAtomXmlRequest", () => {
    it("should serialize a simple object", () => {
      const resourceName = "TestResource";
      const resource = { key1: "value1", key2: "value2" };

      const result = serializeToAtomXmlRequest(resourceName, resource);

      assert.deepStrictEqual(result, {
        updated: result.updated,
        content: {
          TestResource: {
            key1: "value1",
            key2: "value2",
            $: {
              xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
              "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance",
            },
          },
          $: {
            type: "application/xml",
          },
        },
        $: {
          xmlns: "http://www.w3.org/2005/Atom",
        },
      });
    });

    it("should sanitize the resource object", () => {
      const resourceName = "TestResource";
      const resource = { key1: "value1", key2: undefined, key3: null };

      const result = serializeToAtomXmlRequest(resourceName, resource);

      assert.deepStrictEqual(result, {
        updated: result.updated,
        content: {
          TestResource: {
            key1: "value1",
            $: {
              xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
              "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance",
            },
          },
          $: {
            type: "application/xml",
          },
        },
        $: {
          xmlns: "http://www.w3.org/2005/Atom",
        },
      });
    });
  });
});
