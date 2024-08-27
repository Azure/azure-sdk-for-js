// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sends an email with an inline image attachment
 */

const { EmailClient } = require("@azure/communication-email");

// Load the .env file (you will need to set these environment variables)
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";
const senderAddress = process.env["SENDER_ADDRESS"] || "";
const recipientAddress = process.env["RECIPIENT_ADDRESS"] || "";

const sendEmailWithAttachments = async () => {
  // Create the Email Client
  const emailClient = new EmailClient(connectionString);

  // Create the Email Message to be sent
  const message = {
    senderAddress: senderAddress,
    content: {
      subject: "This is the subject",
      plainText: "This is the body",
      html: '<html><h1>This is the body<img src="cid:inline_image" /></h1></html>',
    },
    recipients: {
      to: [{ address: recipientAddress, displayName: "Customer Name" }],
    },
    attachments: [
      {
        name: "myinlineimage.jpg",
        contentType: "image/jpeg",
        contentInBase64: "ZW1haWwgdGVzdCBhdHRhY2htZW50",
        contentId: "inline_image",
      },
    ],
  };

  try {
    // Send the email message
    const poller = await emailClient.beginSend(message);
    const response = await poller.pollUntilDone();

    // Get the OperationId so that it can be used for tracking the message for troubleshooting
    console.log("Operation ID: " + response.id);
  } catch (error) {
    console.log(error);
  }
};

void sendEmailWithAttachments();
