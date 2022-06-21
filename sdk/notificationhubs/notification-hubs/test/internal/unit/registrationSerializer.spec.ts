// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { parseXML } from "@azure/core-xml";
import { 
  createAdmRegistrationDescription, 
  createAdmTemplateRegistrationDescription, 
  createAppleRegistrationDescription, 
  createAppleTemplateRegistrationDescription, 
  createBaiduRegistrationDescription, 
  createBaiduTemplateRegistration,
  createBrowserRegistrationDescription,
  createBrowserTemplateRegistrationDescription,
  createFirebaseLegacyRegistrationDescription,
  createFirebaseLegacyTemplateRegistrationDescription,
  createWindowsRegistrationDescription,
  createWindowsTemplateRegistrationDescription,
} from "../../../src/serializers/registrationSerializer";

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

describe("createAdmRegistrationDescription", () => {
  it("should parse an Amazon Device Messaging registration description", async () => {
    const xml = await parseXML(ADM_REGISTEATION, { includeRoot: true });
    const registrationXML = xml.entry.content.AdmRegistrationDescription;
    const registration = createAdmRegistrationDescription(registrationXML);

    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.admRegistrationId, "{ADM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });
});

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

describe("createAdmTemplateRegistrationDescription", () => {
  it("should parse an Amazon Device Messaging template registration description", async () => {
    const xml = await parseXML(ADM_TEMPLATE_REGISTRATION, { includeRoot: true });
    const registrationXML = xml.entry.content.AdmTemplateRegistrationDescription;
    const registration = createAdmTemplateRegistrationDescription(registrationXML);

    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.admRegistrationId, "{ADM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });
});

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

describe("createAppleRegistrationDescription", () => {
  it("should parse an Apple registration description", async () => {
    const xml = await parseXML(APPLE_REGISTRATION, { includeRoot: true });
    const registrationXML = xml.entry.content.AppleRegistrationDescription;
    const registration = createAppleRegistrationDescription(registrationXML);

    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.deviceToken, "{DeviceToken}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });
});

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

describe("createAppleTemplateRegistrationDescription", () => {
  it("should parse an Apple template registration description", async () => {
    const xml = await parseXML(APPLE_TEMPLATE_REGISTRATION, { includeRoot: true });
    const registrationXML = xml.entry.content.AppleTemplateRegistrationDescription;
    const registration = createAppleTemplateRegistrationDescription(registrationXML);

    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.deviceToken, "{DeviceToken}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
    assert.equal(registration.apnsHeaders!["apns-priority"], "10");
    assert.equal(registration.apnsHeaders!["apns-expiration"], "0");
  });
});

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

describe("createBaiduRegistrationDescription", () => {
  it("should parse an Baidu registration description", async () => {
    const xml = await parseXML(BAIDU_REGISTRATION, { includeRoot: true });
    const registrationXML = xml.entry.content.BaiduRegistrationDescription;
    const registration = createBaiduRegistrationDescription(registrationXML);

    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.baiduChannelId, "{Baidu Channel Id}");
    assert.equal(registration.baiduUserId, "{Baidu User Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });
});

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

describe("createBaiduTemplateRegistrationDescription", () => {
  it("should parse an Baidu template registration description", async () => {
    const xml = await parseXML(BAIDU_TEMPLATE_REGISTRATION, { includeRoot: true });
    const registrationXML = xml.entry.content.BaiduTemplateRegistrationDescription;
    const registration = createBaiduTemplateRegistration(registrationXML);

    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.baiduChannelId, "{Baidu Channel Id}");
    assert.equal(registration.baiduUserId, "{Baidu User Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });
});

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

describe("createBrowserRegistrationDescription", () => {
  it("should parse an Browser registration description", async () => {
    const xml = await parseXML(BROWSER_REGISTRATION, { includeRoot: true });
    const registrationXML = xml.entry.content.BrowserRegistrationDescription;
    const registration = createBrowserRegistrationDescription(registrationXML);

    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.endpoint, "{Endpoint}");
    assert.equal(registration.p256DH, "{P256DH}");
    assert.equal(registration.auth, "{Auth Secret}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });
});

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

describe("createBrowserTemplateRegistrationDescription", () => {
  it("should parse an Browser template registration description", async () => {
    const xml = await parseXML(BROWSER_TEMPLATE_REGISTRATION, { includeRoot: true });
    const registrationXML = xml.entry.content.BrowserTemplateRegistrationDescription;
    const registration = createBrowserTemplateRegistrationDescription(registrationXML);

    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.endpoint, "{Endpoint}");
    assert.equal(registration.p256DH, "{P256DH}");
    assert.equal(registration.auth, "{Auth Secret}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });
});

const FIREBASE_LEGACY_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <GcmRegistrationDescription xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
            <Tags>myTag,myOtherTag</Tags>
            <RegistrationId>{Registration Id}</RegistrationId> 
            <GcmRegistrationId>{GCM Registration Id}</GcmRegistrationId> 
        </GcmRegistrationDescription>
    </content>
</entry>`;

describe("createFirebaseLegacyRegistrationDescription", () => {
  it("should parse an Firebase Legacy registration description", async () => {
    const xml = await parseXML(FIREBASE_LEGACY_REGISTRATION, { includeRoot: true });
    const registrationXML = xml.entry.content.GcmRegistrationDescription;
    const registration = createFirebaseLegacyRegistrationDescription(registrationXML);

    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.fcmLegacyRegistrationId, "{GCM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });
});

const FIREBASE_LEGACY_TEMPLATE_REGISTRATION = `<?xml version="1.0" encoding="utf-8"?>
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

describe("createFirebaseTemplateRegistrationDescription", () => {
  it("should parse an Firebase Legacy  template registration description", async () => {
    const xml = await parseXML(FIREBASE_LEGACY_TEMPLATE_REGISTRATION, { includeRoot: true });
    const registrationXML = xml.entry.content.GcmTemplateRegistrationDescription;
    const registration = createFirebaseLegacyTemplateRegistrationDescription(registrationXML);

    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.fcmLegacyRegistrationId, "{GCM Registration Id}");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
  });
});

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

describe("createWindowsRegistrationDescription", () => {
  it("should parse an Windows registration description", async () => {
    const xml = await parseXML(WNS_REGISTRATION, { includeRoot: true });
    const registrationXML = xml.entry.content.WindowsRegistrationDescription;
    const registration = createWindowsRegistrationDescription(registrationXML);

    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.channelUri, "https://www.microsoft.com/");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
  });
});

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

describe("createWindowsTemplateRegistrationDescription", () => {
  it("should parse an Windows template registration description", async () => {
    const xml = await parseXML(WINDOWS_TEMPLATE_REGISTRATION, { includeRoot: true });
    const registrationXML = xml.entry.content.WindowsTemplateRegistrationDescription;
    const registration = createWindowsTemplateRegistrationDescription(registrationXML);

    assert.equal(registration.registrationId, "{Registration Id}");
    assert.equal(registration.channelUri, "https://www.microsoft.com/");
    assert.deepEqual(registration.tags, ["myTag","myOtherTag"]);
    assert.equal(registration.bodyTemplate, "{Template for the body}");
    assert.equal(registration.wnsHeaders!["X-WNS-Type"], "toast");
    assert.equal(registration.wnsHeaders!["X-NotificationClass"], "[batching interval]");
  });
});
