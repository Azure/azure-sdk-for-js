// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { parseXMLError } from "../../../src/utils/xmlUtils.js";

const NOTIFICATION_XML_ERROR = `
<Error>
    <Code>400</Code>
    <Detail>The HTTP header 'ServiceBusNotification-Format' has an invalid value: 'fcmlegacy'. Allowed values are 'windows', 'apple', 'gcm', 'template', 'adm', or 'windowsphone'.</Detail>
</Error>
`;

describe("xmlUtils", () => {
  describe("parseXMLError", () => {
    it("should parse the error", async () => {
      const error = await parseXMLError(NOTIFICATION_XML_ERROR);
      assert.equal(
        error,
        "The HTTP header 'ServiceBusNotification-Format' has an invalid value: 'fcmlegacy'. Allowed values are 'windows', 'apple', 'gcm', 'template', 'adm', or 'windowsphone'.",
      );
    });
  });
});
