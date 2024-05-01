// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createWindowsBadgeNotificationBody } from "../../../src/models/notificationBodyBuilder.js";
import { assert } from "@azure/test-utils";

describe("createWindowsBadgeNotificationBody", () => {
  it("should handle a notification count", () => {
    const body = createWindowsBadgeNotificationBody({
      value: 99,
    });

    assert.equal(
      body,
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><badge value="99"/>`,
    );
  });

  it("should handle a glyph", () => {
    const body = createWindowsBadgeNotificationBody({
      value: "newMessage",
    });

    assert.equal(
      body,
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><badge value="newMessage"/>`,
    );
  });
});
