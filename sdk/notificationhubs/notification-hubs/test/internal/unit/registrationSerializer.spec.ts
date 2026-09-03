// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type {
  AdmRegistrationDescription,
  AdmTemplateRegistrationDescription,
  AppleRegistrationDescription,
  AppleTemplateRegistrationDescription,
  BaiduRegistrationDescription,
  BaiduTemplateRegistrationDescription,
  BrowserRegistrationDescription,
  BrowserTemplateRegistrationDescription,
  FcmV1RegistrationDescription,
  FcmV1TemplateRegistrationDescription,
  GcmRegistrationDescription,
  GcmTemplateRegistrationDescription,
  MpnsRegistrationDescription,
  MpnsTemplateRegistrationDescription,
  XiaomiRegistrationDescription,
  XiaomiTemplateRegistrationDescription,
  WindowsRegistrationDescription,
  WindowsTemplateRegistrationDescription,
} from "../../../src/models/registration.js";
import {
  createAdmRegistrationDescription,
  createAdmTemplateRegistrationDescription,
  createAppleRegistrationDescription,
  createAppleTemplateRegistrationDescription,
  createBaiduRegistrationDescription,
  createBaiduTemplateRegistrationDescription,
  createBrowserRegistrationDescription,
  createBrowserTemplateRegistrationDescription,
  createFcmLegacyRegistrationDescription,
  createFcmLegacyTemplateRegistrationDescription,
  createFcmV1RegistrationDescription,
  createFcmV1TemplateRegistrationDescription,
  createXiaomiRegistrationDescription,
  createXiaomiTemplateRegistrationDescription,
  createWindowsRegistrationDescription,
  createWindowsTemplateRegistrationDescription,
} from "../../../src/models/registration.js";
import {
  registrationDescriptionParser,
  registrationDescriptionSerializer,
} from "../../../src/serializers/registrationSerializer.js";

const ADM_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <AdmRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <AdmRegistrationId>{ADM Registration Id}</AdmRegistrationId>
        </AdmRegistrationDescription>
    </content>
</entry>`;

const ADM_TEMPLATE_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <AdmTemplateRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <AdmRegistrationId>{ADM Registration Id}</AdmRegistrationId>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>
        </AdmTemplateRegistrationDescription>
    </content>
</entry>`;

const APPLE_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <AppleRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <DeviceToken>{DeviceToken}</DeviceToken> 
        </AppleRegistrationDescription>
    </content>
</entry>`;

const APPLE_TEMPLATE_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <AppleTemplateRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <DeviceToken>{DeviceToken}</DeviceToken> 
            <BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>
            <ApnsHeaders>
                <ApnsHeader>
                    <Header>apns-priority</Header>
                    <Value>10</Value>
                </ApnsHeader>
                <ApnsHeader>
                    <Header>apns-expiration</Header>
                    <Value>0</Value>
                </ApnsHeader>
            </ApnsHeaders>
        </AppleTemplateRegistrationDescription>
    </content>
</entry>`;

const APPLE_TEMPLATE_REGISTRATION_SINGLE_APNSHEADER = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <AppleTemplateRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <DeviceToken>{DeviceToken}</DeviceToken> 
            <BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>
            <ApnsHeaders>
                <ApnsHeader>
                    <Header>apns-priority</Header>
                    <Value>10</Value>
                </ApnsHeader>
            </ApnsHeaders>
        </AppleTemplateRegistrationDescription>
    </content>
</entry>`;

const BAIDU_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <BaiduRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <BaiduChannelId>{Baidu Channel Id}</BaiduChannelId>
            <BaiduUserId>{Baidu User Id}</BaiduUserId> 
        </BaiduRegistrationDescription>
    </content>
</entry>`;

const BAIDU_TEMPLATE_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <BaiduTemplateRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <BaiduChannelId>{Baidu Channel Id}</BaiduChannelId>
            <BaiduUserId>{Baidu User Id}</BaiduUserId> 
            <BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>
        </BaiduTemplateRegistrationDescription>
    </content>
</entry>`;

const BROWSER_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <BrowserRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <Endpoint>{Endpoint}</Endpoint>
            <P256DH>{P256DH}</P256DH>
            <Auth>{Auth Secret}</Auth>
        </BrowserRegistrationDescription>
    </content>
</entry>`;

const BROWSER_TEMPLATE_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <BrowserTemplateRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <Endpoint>{Endpoint}</Endpoint>
            <P256DH>{P256DH}</P256DH>
            <Auth>{Auth Secret}</Auth>
            <BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>
        </BrowserTemplateRegistrationDescription>
    </content>
</entry>`;

const FCMV1_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <FcmV1RegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <FcmV1RegistrationId>{FCM V1 Registration Id}</FcmV1RegistrationId> 
        </FcmV1RegistrationDescription>
    </content>
</entry>`;

const FCMV1_TEMPLATE_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <FcmV1TemplateRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <FcmV1RegistrationId>{FCM V1 Registration Id}</FcmV1RegistrationId> 
            <BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>
        </FcmV1TemplateRegistrationDescription>
    </content>
</entry>`;

const GCM_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <GcmRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <GcmRegistrationId>{GCM Registration Id}</GcmRegistrationId> 
        </GcmRegistrationDescription>
    </content>
</entry>`;

const GCM_TEMPLATE_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <GcmTemplateRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <GcmRegistrationId>{GCM Registration Id}</GcmRegistrationId> 
            <BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>
        </GcmTemplateRegistrationDescription>
    </content>
</entry>`;

const MPNS_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <MpnsRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <ChannelUri>https://www.microsoft.com/</ChannelUri>
        </MpnsRegistrationDescription>
    </content>
</entry>`;

const MPNS_TEMPLATE_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <MpnsTemplateRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <ChannelUri>https://www.microsoft.com/</ChannelUri>
            <BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>
            <MpnsHeaders>
                <MpnsHeader>
                    <Header>X-WindowsPhone-Target</Header>
                    <Value>toast</Value>
                </MpnsHeader>
                <MpnsHeader>
                    <Header>X-NotificationClass</Header>
                    <Value>[batching interval]</Value>
                </MpnsHeader>
            </MpnsHeaders>
        </MpnsTemplateRegistrationDescription>
    </content>
</entry>`;

const XIAOMI_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <XiaomiRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <XiaomiRegistrationId>{Xiaomi Registration Id}</XiaomiRegistrationId>
        </XiaomiRegistrationDescription>
    </content>
</entry>`;

const XIAOMI_TEMPLATE_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <XiaomiTemplateRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <XiaomiRegistrationId>{Xiaomi Registration Id}</XiaomiRegistrationId>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>
        </XiaomiTemplateRegistrationDescription>
    </content>
</entry>`;

const WNS_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <WindowsRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <ChannelUri>https://www.microsoft.com/</ChannelUri>
        </WindowsRegistrationDescription>
    </content>
</entry>`;

const WINDOWS_TEMPLATE_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <WindowsTemplateRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <ChannelUri>https://www.microsoft.com/</ChannelUri>
            <BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>
            <WnsHeaders>
                <WnsHeader>
                    <Header>X-WNS-Type</Header>
                    <Value>toast</Value>
                </WnsHeader>
                <WnsHeader>
                    <Header>X-NotificationClass</Header>
                    <Value>[batching interval]</Value>
                </WnsHeader>
            </WnsHeaders>
        </WindowsTemplateRegistrationDescription>
    </content>
</entry>`;

describe("parseRegistrationEntry", () => {
  it("should parse an Amazon Device Messaging registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      ADM_REGISTRATION,
    )) as AdmRegistrationDescription;

    assert.equal(registration.kind, "Adm");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.admRegistrationId, "{ADM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
  });

  it("should parse an Amazon Device Messaging template registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      ADM_TEMPLATE_REGISTRATION,
    )) as AdmTemplateRegistrationDescription;

    assert.equal(registration.kind, "AdmTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.admRegistrationId, "{ADM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });

  it("should parse an apple registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      APPLE_REGISTRATION,
    )) as AppleRegistrationDescription;

    assert.equal(registration.kind, "Apple");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.deviceToken, "{DeviceToken}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
  });

  it("should parse an apple template registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      APPLE_TEMPLATE_REGISTRATION,
    )) as AppleTemplateRegistrationDescription;

    assert.equal(registration.kind, "AppleTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.deviceToken, "{DeviceToken}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
    assert.equal(registration.apnsHeaders!["apns-priority"], "10");
    assert.equal(registration.apnsHeaders!["apns-expiration"], "0");
  });

  it("should parse an apple template registration description with single apns header", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      APPLE_TEMPLATE_REGISTRATION_SINGLE_APNSHEADER,
    )) as AppleTemplateRegistrationDescription;

    assert.equal(registration.kind, "AppleTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.deviceToken, "{DeviceToken}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
    assert.equal(registration.apnsHeaders!["apns-priority"], "10");
  });

  it("should parse an Baidu registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      BAIDU_REGISTRATION,
    )) as BaiduRegistrationDescription;

    assert.equal(registration.kind, "Baidu");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.baiduChannelId, "{Baidu Channel Id}");
    assert.equal(registration.baiduUserId, "{Baidu User Id}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
  });

  it("should parse an Baidu template registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      BAIDU_TEMPLATE_REGISTRATION,
    )) as BaiduTemplateRegistrationDescription;

    assert.equal(registration.kind, "BaiduTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.baiduChannelId, "{Baidu Channel Id}");
    assert.equal(registration.baiduUserId, "{Baidu User Id}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });

  it("should parse an Browser registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      BROWSER_REGISTRATION,
    )) as BrowserRegistrationDescription;

    assert.equal(registration.kind, "Browser");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.endpoint, "{Endpoint}");
    assert.equal(registration.p256dh, "{P256DH}");
    assert.equal(registration.auth, "{Auth Secret}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
  });

  it("should parse an Browser template registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      BROWSER_TEMPLATE_REGISTRATION,
    )) as BrowserTemplateRegistrationDescription;

    assert.equal(registration.kind, "BrowserTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.endpoint, "{Endpoint}");
    assert.equal(registration.p256dh, "{P256DH}");
    assert.equal(registration.auth, "{Auth Secret}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });

  it("should parse an FCM V1 registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      FCMV1_REGISTRATION,
    )) as FcmV1RegistrationDescription;

    assert.equal(registration.kind, "FcmV1");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.fcmV1RegistrationId, "{FCM V1 Registration Id}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
  });

  it("should parse a FCM V1 template registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      FCMV1_TEMPLATE_REGISTRATION,
    )) as FcmV1TemplateRegistrationDescription;

    assert.equal(registration.kind, "FcmV1Template");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.fcmV1RegistrationId, "{FCM V1 Registration Id}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });

  it("should parse a GCM registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      GCM_REGISTRATION,
    )) as GcmRegistrationDescription;

    assert.equal(registration.kind, "Gcm");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.gcmRegistrationId, "{GCM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
  });

  it("should parse a GCM template registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      GCM_TEMPLATE_REGISTRATION,
    )) as GcmTemplateRegistrationDescription;

    assert.equal(registration.kind, "GcmTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.gcmRegistrationId, "{GCM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });

  it("should parse an MPNS registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      MPNS_REGISTRATION,
    )) as MpnsRegistrationDescription;

    assert.equal(registration.kind, "Mpns");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.channelUri, "https://www.microsoft.com/");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
  });

  it("should parse an MPNS template registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      MPNS_TEMPLATE_REGISTRATION,
    )) as MpnsTemplateRegistrationDescription;

    assert.equal(registration.kind, "MpnsTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.channelUri, "https://www.microsoft.com/");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
    assert.equal(registration.mpnsHeaders!["X-WindowsPhone-Target"], "toast");
    assert.equal(registration.mpnsHeaders!["X-NotificationClass"], "[batching interval]");
  });

  it("should parse an Xiaomi registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      XIAOMI_REGISTRATION,
    )) as XiaomiRegistrationDescription;

    assert.equal(registration.kind, "Xiaomi");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.xiaomiRegistrationId, "{Xiaomi Registration Id}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
  });

  it("should parse an Xiaomi template registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      XIAOMI_TEMPLATE_REGISTRATION,
    )) as XiaomiTemplateRegistrationDescription;

    assert.equal(registration.kind, "XiaomiTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.xiaomiRegistrationId, "{Xiaomi Registration Id}");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });

  it("should parse an Windows registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      WNS_REGISTRATION,
    )) as WindowsRegistrationDescription;

    assert.equal(registration.kind, "Windows");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.channelUri, "https://www.microsoft.com/");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
  });

  it("should parse an Windows template registration description", async () => {
    const registration = (await registrationDescriptionParser.parseRegistrationEntry(
      WINDOWS_TEMPLATE_REGISTRATION,
    )) as WindowsTemplateRegistrationDescription;

    assert.equal(registration.kind, "WindowsTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.channelUri, "https://www.microsoft.com/");
    assert.deepEqual(registration.tags, ["myTag", "myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
    assert.equal(registration.wnsHeaders!["X-WNS-Type"], "toast");
    assert.equal(registration.wnsHeaders!["X-NotificationClass"], "[batching interval]");
  });
});

const REGISTRATION_FEED = `<?xml version="1.0" encoding="utf-8" ?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title type="/{NotificationTopic}/channels/{channel hash}" />
  <id> https://{tenant}.windows.net/{NotificationTopic}/channels/{channel hash}</id>
  <updated>2012-08-17T17:32:00Z</updated>
  <entry xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" m:etag="W/&quot;1234567890&quot;">
    <id>https://{tenant}.windows.net/{NotificationTopic}/registrations/{registrationId}</id>
    <title type="text"> /{NotificationTopic}/registrations/{registrationId}</title>
    <updated>2012-08-17T17:32:00Z</updated>
    <content type="application/xml">
      <WindowsRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
        <ETag>{ETag}</ETag>
        <ExpirationTime>2012-07-16T19:20+01:00</ExpirationTime>
        <RegistrationId>{Registration Id}</RegistrationId>
        <Tags>myTag,myOtherTag</Tags>
        <ChannelUri>https://www.microsoft.com/</ChannelUri>
        </WindowsRegistrationDescription>
    </content>
  </entry>
  <entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
      <AppleTemplateRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
          <Tags>myTag,myOtherTag</Tags>
          <RegistrationId>{Registration Id}</RegistrationId>
          <DeviceToken>{DeviceToken}</DeviceToken>
          <BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>
          <Expiry>2011-10-05T14:48:00.000Z</Expiry>
      </AppleTemplateRegistrationDescription>
    </content>
  </entry>
</feed>`;

const EMPTY_REGISTRATION_FEED = `<?xml version="1.0" encoding="utf-8" ?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title type="text">Registrations</title>
  <id>https://testns.servicebus.windows.net/testhub/registrations/?api-version=2020-06</id>
  <updated>2022-09-06T20:06:33Z</updated>
  <link rel="self" href="https://testns.servicebus.windows.net/testhub/registrations/?api-version=2020-06" />
</feed>`;

const SINGLE_REGISTRATION_FEED = `<?xml version="1.0" encoding="utf-8" ?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title type="text">Registrations</title>
  <id>https://testns.servicebus.windows.net/testhub/registrations/?api-version=2020-06</id>
  <updated>2022-09-06T20:06:33Z</updated>
  <link rel="self" href="https://testns.servicebus.windows.net/testhub/registrations/?api-version=2020-06" />
  <entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
      <AppleTemplateRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
          <Tags>myTag,myOtherTag</Tags>
          <RegistrationId>{Registration Id}</RegistrationId>
          <DeviceToken>{DeviceToken}</DeviceToken>
          <BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>
          <Expiry>2011-10-05T14:48:00.000Z</Expiry>
      </AppleTemplateRegistrationDescription>
    </content>
  </entry>
</feed>`;

describe("parseRegistrationFeed", () => {
  it("should parse a registration feed", async () => {
    const registrations =
      await registrationDescriptionParser.parseRegistrationFeed(REGISTRATION_FEED);

    const windowsRegistration = registrations[0] as WindowsRegistrationDescription;
    assert.equal(windowsRegistration.kind, "Windows");
    assert.equal(windowsRegistration.registrationId, "{Registration Id}");
    assert.equal(windowsRegistration.channelUri, "https://www.microsoft.com/");
    assert.deepEqual(windowsRegistration.tags, ["myTag", "myOtherTag"]);

    const appleRegistration = registrations[1] as AppleTemplateRegistrationDescription;
    assert.equal(appleRegistration.kind, "AppleTemplate");
    assert.equal(appleRegistration.registrationId, "{Registration Id}");
    assert.equal(appleRegistration.deviceToken, "{DeviceToken}");
    assert.deepEqual(appleRegistration.tags, ["myTag", "myOtherTag"]);
  });

  it("should parse a feed with one item", async () => {
    const registrations =
      await registrationDescriptionParser.parseRegistrationFeed(SINGLE_REGISTRATION_FEED);

    assert.equal(registrations.length, 1);

    const appleRegistration = registrations[0] as AppleTemplateRegistrationDescription;
    assert.equal(appleRegistration.kind, "AppleTemplate");
    assert.equal(appleRegistration.registrationId, "{Registration Id}");
    assert.equal(appleRegistration.deviceToken, "{DeviceToken}");
    assert.deepEqual(appleRegistration.tags, ["myTag", "myOtherTag"]);
  });

  it("should parse an empty feed", async () => {
    const registrations =
      await registrationDescriptionParser.parseRegistrationFeed(EMPTY_REGISTRATION_FEED);

    assert.equal(registrations.length, 0);
  });
});

describe("serializeRegistrationDescription", () => {
  it("should serialize an AdmRegistrationDescription", () => {
    const registration = createAdmRegistrationDescription({
      admRegistrationId: "{ADM Registration ID}",
      tags: ["myTag", "myOtherTag"],
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<AdmRegistrationDescription") !== -1);
    assert.isTrue(
      xml.indexOf("<AdmRegistrationId>{ADM Registration ID}</AdmRegistrationId>") !== -1,
    );
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(xml.indexOf("</AdmRegistrationDescription>") !== -1);
  });

  it("should serialize an AdmTemplateRegistrationDescription", () => {
    const registration = createAdmTemplateRegistrationDescription({
      admRegistrationId: "{ADM Registration ID}",
      tags: ["myTag", "myOtherTag"],
      bodyTemplate: "{Template for the body}",
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<AdmTemplateRegistrationDescription") !== -1);
    assert.isTrue(
      xml.indexOf("<AdmRegistrationId>{ADM Registration ID}</AdmRegistrationId>") !== -1,
    );
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(
      xml.indexOf("<BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>") !== -1,
    );
    assert.isTrue(xml.indexOf("</AdmTemplateRegistrationDescription>") !== -1);
  });

  it("should serialize an AppleRegistrationDescription", () => {
    const registration = createAppleRegistrationDescription({
      deviceToken: "{DeviceToken}",
      tags: ["myTag", "myOtherTag"],
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<AppleRegistrationDescription") !== -1);
    assert.isTrue(xml.indexOf("<DeviceToken>{DeviceToken}</DeviceToken>") !== -1);
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(xml.indexOf("</AppleRegistrationDescription>") !== -1);
  });

  it("should serialize an AppleTemplateRegistrationDescription", () => {
    const registration = createAppleTemplateRegistrationDescription({
      deviceToken: "{DeviceToken}",
      tags: ["myTag", "myOtherTag"],
      bodyTemplate: "{Template for the body}",
      apnsHeaders: {
        "apns-topic": "com.microsoft.SampleApp",
        "apns-priority": "10",
      },
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<AppleTemplateRegistrationDescription") !== -1);
    assert.isTrue(xml.indexOf("<DeviceToken>{DeviceToken}</DeviceToken>") !== -1);
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(
      xml.indexOf("<BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>") !== -1,
    );
    assert.isTrue(xml.indexOf("<ApnsHeaders>") !== -1);
    assert.isTrue(xml.indexOf("<Header>apns-topic</Header>") !== -1);
    assert.isTrue(xml.indexOf("<Value>com.microsoft.SampleApp</Value>") !== -1);
    assert.isTrue(xml.indexOf("<Header>apns-priority</Header>") !== -1);
    assert.isTrue(xml.indexOf("<Value>10</Value>") !== -1);
    assert.isTrue(xml.indexOf("</ApnsHeaders>") !== -1);
    assert.isTrue(xml.indexOf("</AppleTemplateRegistrationDescription>") !== -1);
  });

  it("should serialize a BaiduRegistrationDescription", () => {
    const registration = createBaiduRegistrationDescription({
      baiduChannelId: "{Baidu Channel ID}",
      baiduUserId: "{Baidu User ID}",
      tags: ["myTag", "myOtherTag"],
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<BaiduRegistrationDescription") !== -1);
    assert.isTrue(xml.indexOf("<BaiduChannelId>{Baidu Channel ID}</BaiduChannelId>") !== -1);
    assert.isTrue(xml.indexOf("<BaiduUserId>{Baidu User ID}</BaiduUserId>") !== -1);
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(xml.indexOf("</BaiduRegistrationDescription>") !== -1);
  });

  it("should serialize a BaiduTemplateRegistrationDescription", () => {
    const registration = createBaiduTemplateRegistrationDescription({
      baiduChannelId: "{Baidu Channel ID}",
      baiduUserId: "{Baidu User ID}",
      tags: ["myTag", "myOtherTag"],
      bodyTemplate: "{Template for the body}",
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<BaiduTemplateRegistrationDescription") !== -1);
    assert.isTrue(xml.indexOf("<BaiduChannelId>{Baidu Channel ID}</BaiduChannelId>") !== -1);
    assert.isTrue(xml.indexOf("<BaiduUserId>{Baidu User ID}</BaiduUserId>") !== -1);
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(
      xml.indexOf("<BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>") !== -1,
    );
    assert.isTrue(xml.indexOf("</BaiduTemplateRegistrationDescription>") !== -1);
  });

  it("should serialize a BrowserRegistrationDescription", () => {
    const registration = createBrowserRegistrationDescription({
      endpoint: "https://www.microsoft.com/",
      p256dh: "{P256DH}",
      auth: "{Auth Secret}",
      tags: ["myTag", "myOtherTag"],
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    // Check for ordering of the fields
    // Bug: https://github.com/Azure/azure-sdk-for-js/issues/29081
    assert.isTrue(xml.indexOf("<P256DH>{P256DH}</P256DH><Auth>{Auth Secret}</Auth>") !== -1);

    // Check the fields
    assert.isTrue(xml.indexOf("<BrowserRegistrationDescription") !== -1);
    assert.isTrue(xml.indexOf("<Endpoint>https://www.microsoft.com/</Endpoint>") !== -1);
    assert.isTrue(xml.indexOf("<P256DH>{P256DH}</P256DH>") !== -1);
    assert.isTrue(xml.indexOf("<Auth>{Auth Secret}</Auth>") !== -1);
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(xml.indexOf("</BrowserRegistrationDescription>") !== -1);
  });

  it("should serialize a BrowserTemplateRegistrationDescription", () => {
    const registration = createBrowserTemplateRegistrationDescription({
      endpoint: "https://www.microsoft.com/",
      p256dh: "{P256DH}",
      auth: "{Auth Secret}",
      tags: ["myTag", "myOtherTag"],
      bodyTemplate: "{Template for the body}",
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<BrowserTemplateRegistrationDescription") !== -1);
    assert.isTrue(xml.indexOf("<Endpoint>https://www.microsoft.com/</Endpoint>") !== -1);
    assert.isTrue(xml.indexOf("<P256DH>{P256DH}</P256DH>") !== -1);
    assert.isTrue(xml.indexOf("<Auth>{Auth Secret}</Auth>") !== -1);
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(
      xml.indexOf("<BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>") !== -1,
    );
    assert.isTrue(xml.indexOf("</BrowserTemplateRegistrationDescription>") !== -1);
  });

  it("should serialize a FcmV1RegistrationDescription", () => {
    const registration = createFcmV1RegistrationDescription({
      fcmV1RegistrationId: "{FCM V1 Registration ID}",
      tags: ["myTag", "myOtherTag"],
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<FcmV1RegistrationDescription") !== -1);
    assert.isTrue(
      xml.indexOf("<FcmV1RegistrationId>{FCM V1 Registration ID}</FcmV1RegistrationId>") !== -1,
    );
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(xml.indexOf("</FcmV1RegistrationDescription>") !== -1);
  });

  it("should serialize a FcmV1TemplateRegistrationDescription", () => {
    const registration = createFcmV1TemplateRegistrationDescription({
      fcmV1RegistrationId: "{FCM V1 Registration ID}",
      tags: ["myTag", "myOtherTag"],
      bodyTemplate: "{Template for the body}",
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<FcmV1TemplateRegistrationDescription") !== -1);
    assert.isTrue(
      xml.indexOf("<FcmV1RegistrationId>{FCM V1 Registration ID}</FcmV1RegistrationId>") !== -1,
    );
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(
      xml.indexOf("<BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>") !== -1,
    );
    assert.isTrue(xml.indexOf("</FcmV1TemplateRegistrationDescription>") !== -1);
  });

  it("should serialize a GcmRegistrationDescription", () => {
    const registration = createFcmLegacyRegistrationDescription({
      gcmRegistrationId: "{GCM Registration ID}",
      tags: ["myTag", "myOtherTag"],
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<GcmRegistrationDescription") !== -1);
    assert.isTrue(
      xml.indexOf("<GcmRegistrationId>{GCM Registration ID}</GcmRegistrationId>") !== -1,
    );
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(xml.indexOf("</GcmRegistrationDescription>") !== -1);
  });

  it("should serialize a GcmTemplateRegistrationDescription", () => {
    const registration = createFcmLegacyTemplateRegistrationDescription({
      gcmRegistrationId: "{GCM Registration ID}",
      tags: ["myTag", "myOtherTag"],
      bodyTemplate: "{Template for the body}",
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<GcmTemplateRegistrationDescription") !== -1);
    assert.isTrue(
      xml.indexOf("<GcmRegistrationId>{GCM Registration ID}</GcmRegistrationId>") !== -1,
    );
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(
      xml.indexOf("<BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>") !== -1,
    );
    assert.isTrue(xml.indexOf("</GcmTemplateRegistrationDescription>") !== -1);
  });

  it("should serialize an MpnsRegistrationDescription", () => {
    const registration: MpnsRegistrationDescription = {
      channelUri: "https://www.microsoft.com/",
      tags: ["myTag", "myOtherTag"],
      kind: "Mpns",
    };

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<MpnsRegistrationDescription") !== -1);
    assert.isTrue(xml.indexOf("<ChannelUri>https://www.microsoft.com/</ChannelUri>") !== -1);
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(xml.indexOf("</MpnsRegistrationDescription>") !== -1);
  });

  it("should serialize an MpnsTemplateRegistrationDescription", () => {
    const registration: MpnsTemplateRegistrationDescription = {
      channelUri: "https://www.microsoft.com/",
      tags: ["myTag", "myOtherTag"],
      bodyTemplate: "{Template for the body}",
      mpnsHeaders: {
        "X-MPNS-TYPE": "mpns/tile",
      },
      kind: "MpnsTemplate",
    };

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<MpnsTemplateRegistrationDescription") !== -1);
    assert.isTrue(xml.indexOf("<ChannelUri>https://www.microsoft.com/</ChannelUri>") !== -1);
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(
      xml.indexOf("<BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>") !== -1,
    );
    assert.isTrue(xml.indexOf("<MpnsHeaders>") !== -1);
    assert.isTrue(xml.indexOf("<Header>X-MPNS-TYPE</Header>") !== -1);
    assert.isTrue(xml.indexOf("<Value>mpns/tile</Value>") !== -1);
    assert.isTrue(xml.indexOf("</MpnsHeaders>") !== -1);
    assert.isTrue(xml.indexOf("</MpnsTemplateRegistrationDescription>") !== -1);
  });

  it("should serialize an XiaomiRegistrationDescription", () => {
    const registration = createXiaomiRegistrationDescription({
      xiaomiRegistrationId: "{Xiaomi Registration ID}",
      tags: ["myTag", "myOtherTag"],
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<XiaomiRegistrationDescription") !== -1);
    assert.isTrue(
      xml.indexOf("<XiaomiRegistrationId>{Xiaomi Registration ID}</XiaomiRegistrationId>") !== -1,
    );
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(xml.indexOf("</XiaomiRegistrationDescription>") !== -1);
  });

  it("should serialize an XiaomiTemplateRegistrationDescription", () => {
    const registration = createXiaomiTemplateRegistrationDescription({
      xiaomiRegistrationId: "{Xiaomi Registration ID}",
      tags: ["myTag", "myOtherTag"],
      bodyTemplate: "{Template for the body}",
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<XiaomiTemplateRegistrationDescription") !== -1);
    assert.isTrue(
      xml.indexOf("<XiaomiRegistrationId>{Xiaomi Registration ID}</XiaomiRegistrationId>") !== -1,
    );
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(
      xml.indexOf("<BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>") !== -1,
    );
    assert.isTrue(xml.indexOf("</XiaomiTemplateRegistrationDescription>") !== -1);
  });

  it("should serialize an WindowsRegistrationDescription", () => {
    const registration = createWindowsRegistrationDescription({
      channelUri: "https://www.microsoft.com/",
      tags: ["myTag", "myOtherTag"],
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<WindowsRegistrationDescription") !== -1);
    assert.isTrue(xml.indexOf("<ChannelUri>https://www.microsoft.com/</ChannelUri>") !== -1);
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(xml.indexOf("</WindowsRegistrationDescription>") !== -1);
  });

  it("should serialize an WindowsTemplateRegistrationDescription", () => {
    const registration = createWindowsTemplateRegistrationDescription({
      channelUri: "https://www.microsoft.com/",
      tags: ["myTag", "myOtherTag"],
      bodyTemplate: "{Template for the body}",
      wnsHeaders: {
        "X-WNS-TYPE": "wns/tile",
      },
    });

    const xml = registrationDescriptionSerializer.serializeRegistrationDescription(registration);

    assert.isTrue(xml.indexOf("<WindowsTemplateRegistrationDescription") !== -1);
    assert.isTrue(xml.indexOf("<ChannelUri>https://www.microsoft.com/</ChannelUri>") !== -1);
    assert.isTrue(xml.indexOf("<Tags>myTag,myOtherTag</Tags>") !== -1);
    assert.isTrue(
      xml.indexOf("<BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>") !== -1,
    );
    assert.isTrue(xml.indexOf("<WnsHeaders>") !== -1);
    assert.isTrue(xml.indexOf("<Header>X-WNS-TYPE</Header>") !== -1);
    assert.isTrue(xml.indexOf("<Value>wns/tile</Value>") !== -1);
    assert.isTrue(xml.indexOf("</WnsHeaders>") !== -1);
    assert.isTrue(xml.indexOf("</WindowsTemplateRegistrationDescription>") !== -1);
  });
});
