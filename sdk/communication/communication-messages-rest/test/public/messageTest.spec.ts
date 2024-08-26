// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorderWithConnectionString } from "./utils/recordedClient";
import { Context } from "mocha";
import {
  MessagesServiceClient,
  Send202Response,
  MessageTemplate,
  MessageTemplateValue,
  MessageTemplateBindings,
  PagedMessageTemplateItemOutput,
} from "../../generated";

describe("Notification Messages Test", () => {
  let recorder: Recorder;
  let client: MessagesServiceClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecorderWithConnectionString(this));
  });

  afterEach(async function () {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("send simple text message test", async function () {
    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "text",
        content: "Arif The Great!!!",
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send image message test", async function () {
    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "image",
        mediaUri: "https://www.w3schools.com/w3css/img_lights.jpg",
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send simple text template message test", async function () {
    const DaysTemplateValue: MessageTemplateValue = {
      kind: "text",
      name: "Days",
      text: "5",
    };

    const templateBindings: MessageTemplateBindings = {
      kind: "whatsApp",
      body: [
        {
          refValue: "Days",
        },
      ],
    };

    const template: MessageTemplate = {
      name: "sample_shipping_confirmation",
      language: "en_US",
      bindings: templateBindings,
      values: [DaysTemplateValue],
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "template",
        template: template,
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send template message with video test", async function () {
    const HeaderVideo: MessageTemplateValue = {
      kind: "video",
      name: "HappyHourVideo",
      url: "https://youtu.be/PSdJX1TKlNI?si=_OI_cxd5IdAFCAev",
    };

    const VenueTemplateValue: MessageTemplateValue = {
      kind: "text",
      name: "Venue",
      text: "HardRockCafe",
    };

    const TimeTemplateValue: MessageTemplateValue = {
      kind: "text",
      name: "Time",
      text: "Today 2-4PM",
    };

    const templateBindings: MessageTemplateBindings = {
      kind: "whatsApp",
      header: [
        {
          refValue: "HappyHourVideo",
        },
      ],
      body: [
        {
          refValue: "Venue",
        },
        {
          refValue: "Time",
        },
      ],
    };

    const template: MessageTemplate = {
      name: "sample_happy_hour_announcement",
      language: "en_US",
      bindings: templateBindings,
      values: [HeaderVideo, VenueTemplateValue, TimeTemplateValue],
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "template",
        template: template,
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send template message with image test", async function () {
    const HeaderImage: MessageTemplateValue = {
      kind: "image",
      name: "CompanyPhoto",
      url: "https://upload.wikimedia.org/wikipedia/commons/3/30/Building92microsoft.jpg",
    };

    const ProductTemplateValue: MessageTemplateValue = {
      kind: "text",
      name: "Product",
      text: "Microsoft Office",
    };

    const templateBindings: MessageTemplateBindings = {
      kind: "whatsApp",
      header: [
        {
          refValue: "CompanyPhoto",
        },
      ],
      body: [
        {
          refValue: "Product",
        },
      ],
    };

    const template: MessageTemplate = {
      name: "sample_purchase_feedback",
      language: "en_US",
      bindings: templateBindings,
      values: [HeaderImage, ProductTemplateValue],
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "template",
        template: template,
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send template message with document test", async function () {
    const HeaderDoc: MessageTemplateValue = {
      kind: "document",
      name: "BoardingPass",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    };

    const OriginTemplateValue: MessageTemplateValue = {
      kind: "text",
      name: "OriginDestination",
      text: "RDU",
    };

    const FinalDestinationTemplateValue: MessageTemplateValue = {
      kind: "text",
      name: "FinalDestination",
      text: "LAX",
    };

    const TimeTemplateValue: MessageTemplateValue = {
      kind: "text",
      name: "BoardingTime",
      text: "June 4th, 2024 @ 2PM",
    };

    const templateBindings: MessageTemplateBindings = {
      kind: "whatsApp",
      header: [
        {
          refValue: "BoardingPass",
        },
      ],
      body: [
        {
          refValue: "OriginDestination",
        },
        {
          refValue: "FinalDestination",
        },
        {
          refValue: "BoardingTime",
        },
      ],
    };

    const template: MessageTemplate = {
      name: "sample_flight_confirmation",
      language: "en_US",
      bindings: templateBindings,
      values: [HeaderDoc, OriginTemplateValue, FinalDestinationTemplateValue, TimeTemplateValue],
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "template",
        template: template,
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });

  it("send template message with quick reply buttons test", async function () {
    const NameTemplateValue: MessageTemplateValue = {
      kind: "text",
      name: "NameValue",
      text: "Arif",
    };

    const YesQuickActionTemplateValue: MessageTemplateValue = {
      kind: "quickAction",
      name: "Yes",
      payload: "yes",
    };

    const NoQuickActionTemplateValue: MessageTemplateValue = {
      kind: "quickAction",
      name: "No",
      payload: "no",
    };

    const templateBindings: MessageTemplateBindings = {
      kind: "whatsApp",
      body: [
        {
          refValue: "NameValue",
        },
      ],
      buttons: [
        {
          subType: "quickReply",
          refValue: "Yes",
        },
        {
          subType: "quickReply",
          refValue: "No",
        },
      ],
    };

    const template: MessageTemplate = {
      name: "sample_issue_resolution",
      language: "en_US",
      bindings: templateBindings,
      values: [NameTemplateValue, YesQuickActionTemplateValue, NoQuickActionTemplateValue],
    };

    const result = await client.path("/messages/notifications:send").post({
      contentType: "application/json",
      body: {
        channelRegistrationId: env.CHANNEL_ID || "",
        to: [env.RECIPIENT_PHONE_NUMBER || ""],
        kind: "template",
        template: template,
      },
    });
    assert.equal(result.status, "202");
    const response: Send202Response = result as Send202Response;
    assert.equal(response.body.receipts.length, 1);
    assert.isDefined(response.body.receipts[0].messageId);
  });
});

describe("Message Template Read Test", () => {
  let recorder: Recorder;
  let client: MessagesServiceClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecorderWithConnectionString(this));
  });

  afterEach(async function () {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("get template test", async function () {
    const result = await client
      .path("/messages/channels/{channelId}/templates", env.CHANNEL_ID || "")
      .get();
    assert.equal(result.status, "200");
    const response: PagedMessageTemplateItemOutput = result.body as PagedMessageTemplateItemOutput;
    assert.isAtLeast(response.value.length, 1);
  });
});
