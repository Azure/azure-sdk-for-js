// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { parseXML } from "@azure/core-xml";
import { createAdmRegistrationDescription, createAdmTemplateRegistrationDescription, createAppleRegistrationDescription, createAppleTemplateRegistrationDescription } from "../../../src/serializers/registrationSerializer";

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
  });
});
