// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { SmsClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connectionString = `endpoint=https://<resource-name>.communication.azure.com/;accessKey=<Base64-Encoded-Key>`;
    const client = new SmsClient(connectionString);
  });

  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new AzureKeyCredential("<Base64-Encoded-Key>");
    const client = new SmsClient(endpoint, credential);
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = new SmsClient(endpoint, credential);
  });

  it("ReadmeSampleSendSms", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = new SmsClient(endpoint, credential);
    // @ts-preserve-whitespace
    const sendResults = await client.send(
      {
        from: "<from-phone-number>", // Your E.164 formatted phone number used to send SMS
        to: ["<to-phone-number-1>", "<to-phone-number-2>"], // The list of E.164 formatted phone numbers to which message is being sent
        message: "Weekly Promotion!", // The message being sent
      },
      {
        enableDeliveryReport: true,
        tag: "marketing",
      },
    );
    // @ts-preserve-whitespace
    for (const sendResult of sendResults) {
      if (sendResult.successful) {
        console.log("Success: ", sendResult);
      } else {
        console.error("Something went wrong when trying to send this message: ", sendResult);
      }
    }
  });

  it("ReadmeSampleOptOutCheck", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = new SmsClient(endpoint, credential);
    // @ts-preserve-whitespace
    const optOutCheckResults = await client.optOuts.check(
      "<from-phone-number>", // Your E.164 formatted phone number used to send SMS
      ["<to-phone-number-1>", "<to-phone-number-2>"], // E.164 formatted recipient phone numbers
    );
    // @ts-preserve-whitespace
    for (const optOutCheckResult of optOutCheckResults) {
      if (optOutCheckResult.httpStatusCode === 200) {
        console.log("Success: ", optOutCheckResult);
      } else {
        console.error(
          "Something went wrong when trying to send opt out check request: ",
          optOutCheckResult,
        );
      }
    }
  });

  it("ReadmeSampleOptOutAdd", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = new SmsClient(endpoint, credential);
    // @ts-preserve-whitespace
    const optOutAddResults = await client.optOuts.add(
      "<from-phone-number>", // Your E.164 formatted phone number used to send SMS
      ["<to-phone-number-1>", "<to-phone-number-2>"], // E.164 formatted recipient phone numbers
    );
    // @ts-preserve-whitespace
    for (const optOutAddResult of optOutAddResults) {
      if (optOutAddResult.httpStatusCode === 200) {
        console.log("Success: ", optOutAddResult);
      } else {
        console.error(
          "Something went wrong when trying to send opt out add request: ",
          optOutAddResult,
        );
      }
    }
  });

  it("ReadmeSampleOptOutRemove", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = new SmsClient(endpoint, credential);
    // @ts-preserve-whitespace
    const optOutRemoveResults = await client.optOuts.remove(
      "<from-phone-number>", // Your E.164 formatted phone number used to send SMS
      ["<to-phone-number-1>", "<to-phone-number-2>"], // E.164 formatted recipient phone numbers
    );
    // @ts-preserve-whitespace
    for (const optOutRemoveResult of optOutRemoveResults) {
      if (optOutRemoveResult.httpStatusCode === 200) {
        console.log("Success: ", optOutRemoveResult);
      } else {
        console.error(
          "Something went wrong when trying to send opt out remove request: ",
          optOutRemoveResult,
        );
      }
    }
  });

  it("ReadmeSampleSendSmsErrorHandling", async () => {
    const endpoint = "https://<resource-name>.communication.azure.com";
    const credential = new DefaultAzureCredential();
    const client = new SmsClient(endpoint, credential);
    // @ts-preserve-whitespace
    try {
      const sendResults = await client.send({
        from: "<from-phone-number>", // Your E.164 formatted phone number used to send SMS
        to: ["<to-phone-number-1>", "<to-phone-number-2>"], // The list of E.164 formatted phone numbers to which message is being sent
        message: "Hello World via SMS!", // The message being sent
      });
      for (const sendResult of sendResults) {
        if (sendResult.successful) {
          console.log("Success: ", sendResult);
        } else {
          console.error("Something went wrong when trying to send this message: ", sendResult);
        }
      }
    } catch (e) {
      console.error(e.message);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
