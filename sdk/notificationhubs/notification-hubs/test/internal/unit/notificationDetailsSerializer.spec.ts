// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { parseNotificationDetails } from "../../../src/serializers/notificationDetailsSerializer.js";

const NOTIFICATION_DETAILS = `<NotificationDetails xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
  <NotificationId>{Your message id}</NotificationId>
  <Location>sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04</Location>
  <State>Completed</State>
  <EnqueueTime>2015-11-02T21:19:43Z</EnqueueTime>
  <StartTime>2015-11-02T21:19:43.9926996Z</StartTime>
  <EndTime>2015-11-02T21:19:43.9926996Z</EndTime>
  <NotificationBody>&lt;?xml version="1.0" encoding="utf-16"?&gt;&lt;toast&gt;&lt;visual&gt;&lt;binding template="ToastText01"&gt;&lt;text id="1"&gt;Hello from a .NET App!&lt;/text&gt;&lt;/binding&gt;&lt;/visual&gt;&lt;/toast&gt;</NotificationBody>
  <TargetPlatforms>windows</TargetPlatforms>
  <WnsOutcomeCounts>
    <Outcome>
      <Name>Success</Name>
      <Count>3</Count>
    </Outcome>
    <Outcome>
      <Name>WrongToken</Name>
      <Count>1</Count>
    </Outcome>
  </WnsOutcomeCounts>
  <PnsErrorDetailsUri>{Blob uri}</PnsErrorDetailsUri>
</NotificationDetails>`;

describe("parseNotificationDetails", () => {
  it("should parse notification details", async () => {
    const parsedXML = await parseNotificationDetails(NOTIFICATION_DETAILS);

    assert.equal(parsedXML.wnsOutcomeCounts?.length, 2);
    assert.equal(parsedXML.pnsErrorDetailsUrl, "{Blob uri}");
    assert.equal(parsedXML.targetPlatforms, "windows");
    assert.equal(
      parsedXML.location,
      "sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04",
    );
    assert.equal(parsedXML.state, "Completed");
    assert.equal(parsedXML.notificationId, "{Your message id}");
    assert.equal(
      parsedXML.notificationBody,
      `<?xml version="1.0" encoding="utf-16"?><toast><visual><binding template="ToastText01"><text id="1">Hello from a .NET App!</text></binding></visual></toast>`,
    );
    assert.isUndefined(parsedXML.admOutcomeCounts);
    assert.isUndefined(parsedXML.apnsOutcomeCounts);
    assert.isUndefined(parsedXML.baiduOutcomeCounts);
    assert.isUndefined(parsedXML.browserOutcomeCounts);
    assert.isUndefined(parsedXML.fcmOutcomeCounts);
  });
});
