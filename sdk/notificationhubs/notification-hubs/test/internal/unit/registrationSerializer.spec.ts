// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AdmRegistrationDescription, AdmTemplateRegistrationDescription, AppleRegistrationDescription, AppleTemplateRegistrationDescription, BaiduRegistrationDescription, BaiduTemplateRegistrationDescription, BrowserRegistrationDescription, BrowserTemplateRegistrationDescription, FcmRegistrationDescription, FcmTemplateRegistrationDescription, GcmRegistrationDescription, GcmTemplateRegistrationDescription, MpnsRegistrationDescription, MpnsTemplateRegistrationDescription, WindowsRegistrationDescription, WindowsTemplateRegistrationDescription } from "../../../src/models/registration";
import { assert } from "@azure/test-utils";
import {  registrationDescriptionParser } from "../../../src/serializers/registrationSerializer";

const ADM_REGISTEATION = `<?xml version="1.0" encoding="utf-8"?>
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

const FCM_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <FcmRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <FcmRegistrationId>{FCM Registration Id}</FcmRegistrationId> 
        </FcmRegistrationDescription>
    </content>
</entry>`;

const FCM_TEMPLATE_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <FcmTemplateRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <FcmRegistrationId>{FCM Registration Id}</FcmRegistrationId> 
            <BodyTemplate><![CDATA[{Template for the body}]]></BodyTemplate>
        </FcmTemplateRegistrationDescription>
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
    const registration = await registrationDescriptionParser.parseRegistrationEntry(ADM_REGISTEATION) as AdmRegistrationDescription;

    assert.equal(registration.platform, "Adm");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.admRegistrationId, "{ADM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });

  it("should parse an Amazon Device Messaging template registration description", async () => {
    const registration =  await registrationDescriptionParser.parseRegistrationEntry(ADM_TEMPLATE_REGISTRATION) as AdmTemplateRegistrationDescription;

    assert.equal(registration.platform, "AdmTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.admRegistrationId, "{ADM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });

  it("should parse an apple registration description", async () => {
    const registration = await registrationDescriptionParser.parseRegistrationEntry(APPLE_REGISTRATION) as AppleRegistrationDescription;

    assert.equal(registration.platform, "Apple");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.deviceToken, "{DeviceToken}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });

  it("should parse an apple template registration description", async () => {
    const registration =  await registrationDescriptionParser.parseRegistrationEntry(APPLE_TEMPLATE_REGISTRATION) as AppleTemplateRegistrationDescription;

    assert.equal(registration.platform, "AppleTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.deviceToken, "{DeviceToken}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
    assert.equal(registration.apnsHeaders!["apns-priority"], "10");
    assert.equal(registration.apnsHeaders!["apns-expiration"], "0");
  });

  it("should parse an Baidu registration description", async () => {
    const registration =  await registrationDescriptionParser.parseRegistrationEntry(BAIDU_REGISTRATION) as BaiduRegistrationDescription;

    assert.equal(registration.platform, "Baidu");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.baiduChannelId, "{Baidu Channel Id}");
    assert.equal(registration.baiduUserId, "{Baidu User Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });

  it("should parse an Baidu template registration description", async () => {
    const registration =  await registrationDescriptionParser.parseRegistrationEntry(BAIDU_TEMPLATE_REGISTRATION) as BaiduTemplateRegistrationDescription;

    assert.equal(registration.platform, "BaiduTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.baiduChannelId, "{Baidu Channel Id}");
    assert.equal(registration.baiduUserId, "{Baidu User Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });

  it("should parse an Browser registration description", async () => {
    const registration = await registrationDescriptionParser.parseRegistrationEntry(BROWSER_REGISTRATION) as BrowserRegistrationDescription;

    assert.equal(registration.platform, "Browser");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.endpoint, "{Endpoint}");
    assert.equal(registration.p256DH, "{P256DH}");
    assert.equal(registration.auth, "{Auth Secret}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });

  it("should parse an Browser template registration description", async () => {
    const registration = await registrationDescriptionParser.parseRegistrationEntry(BROWSER_TEMPLATE_REGISTRATION) as BrowserTemplateRegistrationDescription;

    assert.equal(registration.platform, "BrowserTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.endpoint, "{Endpoint}");
    assert.equal(registration.p256DH, "{P256DH}");
    assert.equal(registration.auth, "{Auth Secret}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });

  it("should parse a GCM registration description", async () => {
    const registration = await registrationDescriptionParser.parseRegistrationEntry(GCM_REGISTRATION) as GcmRegistrationDescription;

    assert.equal(registration.platform, "Gcm");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.gcmRegistrationId, "{GCM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });

  it("should parse a GCM template registration description", async () => {
    const registration = await registrationDescriptionParser.parseRegistrationEntry(GCM_TEMPLATE_REGISTRATION) as GcmTemplateRegistrationDescription;

    assert.equal(registration.platform, "GcmTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.gcmRegistrationId, "{GCM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });

  it("should parse an FCM registration description", async () => {
    const registration = await registrationDescriptionParser.parseRegistrationEntry(FCM_REGISTRATION) as FcmRegistrationDescription;

    assert.equal(registration.platform, "Fcm");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.fcmRegistrationId, "{FCM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });

  it("should parse an FCM template registration description", async () => {
    const registration = await registrationDescriptionParser.parseRegistrationEntry(FCM_TEMPLATE_REGISTRATION) as FcmTemplateRegistrationDescription;

    assert.equal(registration.platform, "FcmTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.fcmRegistrationId, "{FCM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });

  it("should parse an MPNS registration description", async () => {
    const registration = await registrationDescriptionParser.parseRegistrationEntry(MPNS_REGISTRATION) as MpnsRegistrationDescription;

    assert.equal(registration.platform, "Mpns");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.channelUri, "https://www.microsoft.com/");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });

  it("should parse an MPNS template registration description", async () => {
    const registration = await registrationDescriptionParser.parseRegistrationEntry(MPNS_TEMPLATE_REGISTRATION) as MpnsTemplateRegistrationDescription;

    assert.equal(registration.platform, "MpnsTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.channelUri, "https://www.microsoft.com/");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
    assert.equal(registration.mpnsHeaders!["X-WindowsPhone-Target"], "toast");
    assert.equal(registration.mpnsHeaders!["X-NotificationClass"], "[batching interval]");
  });

  it("should parse an Windows registration description", async () => {
    const registration = await registrationDescriptionParser.parseRegistrationEntry(WNS_REGISTRATION) as WindowsRegistrationDescription;

    assert.equal(registration.platform, "Windows");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.channelUri, "https://www.microsoft.com/");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });

  it("should parse an Windows template registration description", async () => {
    const registration = await registrationDescriptionParser.parseRegistrationEntry(WINDOWS_TEMPLATE_REGISTRATION) as WindowsTemplateRegistrationDescription;

    assert.equal(registration.platform, "WindowsTemplate");
    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.channelUri, "https://www.microsoft.com/");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
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

describe("parseRegistrationFeed", () => {
  it("should parse a registration feed", async () => {
    const registrations = await registrationDescriptionParser.parseRegistrationFeed(REGISTRATION_FEED);

    const windowsRegistration = registrations[0] as WindowsRegistrationDescription;
    assert.equal(windowsRegistration.platform, "Windows");
    assert.equal(windowsRegistration.registrationId, "{Registration Id}");
    assert.equal(windowsRegistration.channelUri, "https://www.microsoft.com/");
    assert.deepEqual(windowsRegistration.tags, ["myTag","myOtherTag"]);

    const appleRegistration = registrations[1] as AppleTemplateRegistrationDescription;
    assert.equal(appleRegistration.platform, "AppleTemplate");
    assert.equal(appleRegistration.registrationId, "{Registration Id}");
    assert.equal(appleRegistration.deviceToken, "{DeviceToken}");
    assert.deepEqual(appleRegistration.tags, ["myTag","myOtherTag"]);
  });
});
