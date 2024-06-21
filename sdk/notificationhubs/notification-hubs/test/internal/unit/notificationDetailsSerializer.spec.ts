// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { parseNotificationDetails } from "../../../src/serializers/notificationDetailsSerializer.js";

const APNS_NOTIFICATION_DETAILS = `<NotificationDetails xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
  <NotificationId>{Your message id}</NotificationId>
  <Location>sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04</Location>
  <State>Completed</State>
  <EnqueueTime>2015-11-02T21:19:43Z</EnqueueTime>
  <StartTime>2015-11-02T21:19:43.9926996Z</StartTime>
  <EndTime>2015-11-02T21:19:43.9926996Z</EndTime>
  <NotificationBody>{"aps":{"alert":"hello"}}</NotificationBody>
  <TargetPlatforms>apple</TargetPlatforms>
  <ApnsOutcomeCounts>
    <Outcome>
      <Name>Success</Name>
      <Count>3</Count>
    </Outcome>
    <Outcome>
      <Name>WrongToken</Name>
      <Count>1</Count>
    </Outcome>
  </ApnsOutcomeCounts>
  <PnsErrorDetailsUri>{Blob uri}</PnsErrorDetailsUri>
</NotificationDetails>`;

const ADM_NOTIFICATION_DETAILS = `<NotificationDetails xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
  <NotificationId>{Your message id}</NotificationId>
  <Location>sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04</Location>
  <State>Completed</State>
  <EnqueueTime>2015-11-02T21:19:43Z</EnqueueTime>
  <StartTime>2015-11-02T21:19:43.9926996Z</StartTime>
  <EndTime>2015-11-02T21:19:43.9926996Z</EndTime>
  <NotificationBody>{"message":{"alert":"hello"}}</NotificationBody>
  <TargetPlatforms>adm</TargetPlatforms>
  <AdmOutcomeCounts>
    <Outcome>
      <Name>Success</Name>
      <Count>3</Count>
    </Outcome>
    <Outcome>
      <Name>WrongToken</Name>
      <Count>1</Count>
    </Outcome>
  </AdmOutcomeCounts>
  <PnsErrorDetailsUri>{Blob uri}</PnsErrorDetailsUri>
</NotificationDetails>`;

const BAIDU_NOTIFICATION_DETAILS = `<NotificationDetails xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
  <NotificationId>{Your message id}</NotificationId>
  <Location>sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04</Location>
  <State>Completed</State>
  <EnqueueTime>2015-11-02T21:19:43Z</EnqueueTime>
  <StartTime>2015-11-02T21:19:43.9926996Z</StartTime>
  <EndTime>2015-11-02T21:19:43.9926996Z</EndTime>
  <NotificationBody>{"message":{"alert":"hello"}}</NotificationBody>
  <TargetPlatforms>baidu</TargetPlatforms>
  <BaiduOutcomeCounts>
    <Outcome>
      <Name>Success</Name>
      <Count>3</Count>
    </Outcome>
    <Outcome>
      <Name>WrongToken</Name>
      <Count>1</Count>
    </Outcome>
  </BaiduOutcomeCounts>
  <PnsErrorDetailsUri>{Blob uri}</PnsErrorDetailsUri>
</NotificationDetails>`;

const BROWSER_NOTIFICATION_DETAILS = `<NotificationDetails xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
  <NotificationId>{Your message id}</NotificationId>
  <Location>sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04</Location>
  <State>Completed</State>
  <EnqueueTime>2015-11-02T21:19:43Z</EnqueueTime>
  <StartTime>2015-11-02T21:19:43.9926996Z</StartTime>
  <EndTime>2015-11-02T21:19:43.9926996Z</EndTime>
  <NotificationBody>{"message":{"alert":"hello"}}</NotificationBody>
  <TargetPlatforms>browser</TargetPlatforms>
  <BrowserOutcomeCounts>
    <Outcome>
      <Name>Success</Name>
      <Count>3</Count>
    </Outcome>
    <Outcome>
      <Name>WrongToken</Name>
      <Count>1</Count>
    </Outcome>
  </BrowserOutcomeCounts>
  <PnsErrorDetailsUri>{Blob uri}</PnsErrorDetailsUri>
</NotificationDetails>`;

const FIREBASE_NOTIFICATION_DETAILS = `<NotificationDetails xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
  <NotificationId>{Your message id}</NotificationId>
  <Location>sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04</Location>
  <State>Completed</State>
  <EnqueueTime>2015-11-02T21:19:43Z</EnqueueTime>
  <StartTime>2015-11-02T21:19:43.9926996Z</StartTime>
  <EndTime>2015-11-02T21:19:43.9926996Z</EndTime>
  <NotificationBody>{"message":{"alert":"hello"}}</NotificationBody>
  <TargetPlatforms>gcm</TargetPlatforms>
  <GcmOutcomeCounts>
    <Outcome>
      <Name>Success</Name>
      <Count>3</Count>
    </Outcome>
    <Outcome>
      <Name>WrongToken</Name>
      <Count>1</Count>
    </Outcome>
  </GcmOutcomeCounts>
  <PnsErrorDetailsUri>{Blob uri}</PnsErrorDetailsUri>
</NotificationDetails>`;

const FIREBASE_V1__NOTIFICATION_DETAILS = `<NotificationDetails xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
  <NotificationId>{Your message id}</NotificationId>
  <Location>sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04</Location>
  <State>Completed</State>
  <EnqueueTime>2015-11-02T21:19:43Z</EnqueueTime>
  <StartTime>2015-11-02T21:19:43.9926996Z</StartTime>
  <EndTime>2015-11-02T21:19:43.9926996Z</EndTime>
  <NotificationBody>{"message":{"alert":"hello"}}</NotificationBody>
  <TargetPlatforms>fcm</TargetPlatforms>
  <FcmV1OutcomeCounts>
    <Outcome>
      <Name>Success</Name>
      <Count>3</Count>
    </Outcome>
    <Outcome>
      <Name>WrongToken</Name>
      <Count>1</Count>
    </Outcome>
  </FcmV1OutcomeCounts>
  <PnsErrorDetailsUri>{Blob uri}</PnsErrorDetailsUri>
</NotificationDetails>`;

const XIAOMI__NOTIFICATION_DETAILS = `<NotificationDetails xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
  <NotificationId>{Your message id}</NotificationId>
  <Location>sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04</Location>
  <State>Completed</State>
  <EnqueueTime>2015-11-02T21:19:43Z</EnqueueTime>
  <StartTime>2015-11-02T21:19:43.9926996Z</StartTime>
  <EndTime>2015-11-02T21:19:43.9926996Z</EndTime>
  <NotificationBody>{"message":{"alert":"hello"}}</NotificationBody>
  <TargetPlatforms>xiaomi</TargetPlatforms>
  <XiaomiOutcomeCounts>
    <Outcome>
      <Name>Success</Name>
      <Count>3</Count>
    </Outcome>
    <Outcome>
      <Name>WrongToken</Name>
      <Count>1</Count>
    </Outcome>
  </XiaomiOutcomeCounts>
  <PnsErrorDetailsUri>{Blob uri}</PnsErrorDetailsUri>
</NotificationDetails>`;

const WNS_NOTIFICATION_DETAILS = `<NotificationDetails xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
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
  it("should parse ADM notification details", async () => {
    const parsedXML = await parseNotificationDetails(ADM_NOTIFICATION_DETAILS);

    assert.equal(parsedXML.admOutcomeCounts?.length, 2);
    assert.equal(parsedXML.pnsErrorDetailsUrl, "{Blob uri}");
    assert.equal(parsedXML.targetPlatforms, "adm");
    assert.equal(
      parsedXML.location,
      "sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04",
    );
    assert.equal(parsedXML.state, "Completed");
    assert.equal(parsedXML.notificationId, "{Your message id}");
    assert.equal(parsedXML.notificationBody, `{"message":{"alert":"hello"}}`);
    assert.isUndefined(parsedXML.apnsOutcomeCounts);
    assert.isUndefined(parsedXML.baiduOutcomeCounts);
    assert.isUndefined(parsedXML.browserOutcomeCounts);
    assert.isUndefined(parsedXML.fcmOutcomeCounts);
    assert.isUndefined(parsedXML.fcmV1OutcomeCounts);
    assert.isUndefined(parsedXML.xiaomiOutcomeCounts);
    assert.isUndefined(parsedXML.wnsOutcomeCounts);
  });

  it("should parse APNs notification details", async () => {
    const parsedXML = await parseNotificationDetails(APNS_NOTIFICATION_DETAILS);

    assert.equal(parsedXML.apnsOutcomeCounts?.length, 2);
    assert.equal(parsedXML.pnsErrorDetailsUrl, "{Blob uri}");
    assert.equal(parsedXML.targetPlatforms, "apple");
    assert.equal(
      parsedXML.location,
      "sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04",
    );
    assert.equal(parsedXML.state, "Completed");
    assert.equal(parsedXML.notificationId, "{Your message id}");
    assert.equal(parsedXML.notificationBody, `{"aps":{"alert":"hello"}}`);
    assert.isUndefined(parsedXML.admOutcomeCounts);
    assert.isUndefined(parsedXML.baiduOutcomeCounts);
    assert.isUndefined(parsedXML.browserOutcomeCounts);
    assert.isUndefined(parsedXML.fcmOutcomeCounts);
    assert.isUndefined(parsedXML.fcmV1OutcomeCounts);
    assert.isUndefined(parsedXML.xiaomiOutcomeCounts);
    assert.isUndefined(parsedXML.wnsOutcomeCounts);
  });

  it("should parse Baidu notification details", async () => {
    const parsedXML = await parseNotificationDetails(BAIDU_NOTIFICATION_DETAILS);

    assert.equal(parsedXML.baiduOutcomeCounts?.length, 2);
    assert.equal(parsedXML.pnsErrorDetailsUrl, "{Blob uri}");
    assert.equal(parsedXML.targetPlatforms, "baidu");
    assert.equal(
      parsedXML.location,
      "sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04",
    );
    assert.equal(parsedXML.state, "Completed");
    assert.equal(parsedXML.notificationId, "{Your message id}");
    assert.equal(parsedXML.notificationBody, `{"message":{"alert":"hello"}}`);
    assert.isUndefined(parsedXML.apnsOutcomeCounts);
    assert.isUndefined(parsedXML.admOutcomeCounts);
    assert.isUndefined(parsedXML.browserOutcomeCounts);
    assert.isUndefined(parsedXML.fcmOutcomeCounts);
    assert.isUndefined(parsedXML.fcmV1OutcomeCounts);
    assert.isUndefined(parsedXML.xiaomiOutcomeCounts);
    assert.isUndefined(parsedXML.wnsOutcomeCounts);
  });

  it("should parse Browser notification details", async () => {
    const parsedXML = await parseNotificationDetails(BROWSER_NOTIFICATION_DETAILS);

    assert.equal(parsedXML.browserOutcomeCounts?.length, 2);
    assert.equal(parsedXML.pnsErrorDetailsUrl, "{Blob uri}");
    assert.equal(parsedXML.targetPlatforms, "browser");
    assert.equal(
      parsedXML.location,
      "sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04",
    );
    assert.equal(parsedXML.state, "Completed");
    assert.equal(parsedXML.notificationId, "{Your message id}");
    assert.equal(parsedXML.notificationBody, `{"message":{"alert":"hello"}}`);
    assert.isUndefined(parsedXML.apnsOutcomeCounts);
    assert.isUndefined(parsedXML.admOutcomeCounts);
    assert.isUndefined(parsedXML.baiduOutcomeCounts);
    assert.isUndefined(parsedXML.fcmOutcomeCounts);
    assert.isUndefined(parsedXML.fcmV1OutcomeCounts);
    assert.isUndefined(parsedXML.xiaomiOutcomeCounts);
    assert.isUndefined(parsedXML.wnsOutcomeCounts);
  });

  it("should parse Firebase notification details", async () => {
    const parsedXML = await parseNotificationDetails(FIREBASE_NOTIFICATION_DETAILS);

    assert.equal(parsedXML.fcmOutcomeCounts?.length, 2);
    assert.equal(parsedXML.pnsErrorDetailsUrl, "{Blob uri}");
    assert.equal(parsedXML.targetPlatforms, "gcm");
    assert.equal(
      parsedXML.location,
      "sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04",
    );
    assert.equal(parsedXML.state, "Completed");
    assert.equal(parsedXML.notificationId, "{Your message id}");
    assert.equal(parsedXML.notificationBody, `{"message":{"alert":"hello"}}`);
    assert.isUndefined(parsedXML.apnsOutcomeCounts);
    assert.isUndefined(parsedXML.admOutcomeCounts);
    assert.isUndefined(parsedXML.baiduOutcomeCounts);
    assert.isUndefined(parsedXML.browserOutcomeCounts);
    assert.isUndefined(parsedXML.fcmV1OutcomeCounts);
    assert.isUndefined(parsedXML.xiaomiOutcomeCounts);
    assert.isUndefined(parsedXML.wnsOutcomeCounts);
  });

  it("should parse Firebase V1 notification details", async () => {
    const parsedXML = await parseNotificationDetails(FIREBASE_V1__NOTIFICATION_DETAILS);

    assert.equal(parsedXML.fcmV1OutcomeCounts?.length, 2);
    assert.equal(parsedXML.pnsErrorDetailsUrl, "{Blob uri}");
    assert.equal(parsedXML.targetPlatforms, "fcm");
    assert.equal(
      parsedXML.location,
      "sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04",
    );
    assert.equal(parsedXML.state, "Completed");
    assert.equal(parsedXML.notificationId, "{Your message id}");
    assert.equal(parsedXML.notificationBody, `{"message":{"alert":"hello"}}`);
    assert.isUndefined(parsedXML.apnsOutcomeCounts);
    assert.isUndefined(parsedXML.admOutcomeCounts);
    assert.isUndefined(parsedXML.baiduOutcomeCounts);
    assert.isUndefined(parsedXML.browserOutcomeCounts);
    assert.isUndefined(parsedXML.fcmOutcomeCounts);
    assert.isUndefined(parsedXML.xiaomiOutcomeCounts);
    assert.isUndefined(parsedXML.wnsOutcomeCounts);
  });

  it("should parse Xiaomi notification details", async () => {
    const parsedXML = await parseNotificationDetails(XIAOMI__NOTIFICATION_DETAILS);

    assert.equal(parsedXML.xiaomiOutcomeCounts?.length, 2);
    assert.equal(parsedXML.pnsErrorDetailsUrl, "{Blob uri}");
    assert.equal(parsedXML.targetPlatforms, "xiaomi");
    assert.equal(
      parsedXML.location,
      "sb://{Your namespace}.servicebus.windows.net/{your hub name}/messages/{your message id}?api-version=2015-04",
    );
    assert.equal(parsedXML.state, "Completed");
    assert.equal(parsedXML.notificationId, "{Your message id}");
    assert.equal(parsedXML.notificationBody, `{"message":{"alert":"hello"}}`);
    assert.isUndefined(parsedXML.apnsOutcomeCounts);
    assert.isUndefined(parsedXML.admOutcomeCounts);
    assert.isUndefined(parsedXML.baiduOutcomeCounts);
    assert.isUndefined(parsedXML.browserOutcomeCounts);
    assert.isUndefined(parsedXML.fcmOutcomeCounts);
    assert.isUndefined(parsedXML.fcmV1OutcomeCounts);
    assert.isUndefined(parsedXML.wnsOutcomeCounts);
  });

  it("should parse WNS notification details", async () => {
    const parsedXML = await parseNotificationDetails(WNS_NOTIFICATION_DETAILS);

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
    assert.isUndefined(parsedXML.fcmV1OutcomeCounts);
    assert.isUndefined(parsedXML.xiaomiOutcomeCounts);
  });
});
