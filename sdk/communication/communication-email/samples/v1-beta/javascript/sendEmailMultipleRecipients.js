// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sends an email with multiple recipients
 */

// TODO: Adjust these to point to the published package
const { EmailClient } = require("../src/emailClient");

// Load the .env file (you will need to set these enviornment variables)
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";
const senderAddress = process.env["SENDER_ADDRESS"] || "";
const recipientAddress = process.env["RECIPIENT_ADDRESS"] || "";

const sendEmailMultipleRecipients = async () => {
  // Create the Email Client
  const emailClient = new EmailClient(connectionString);

  // Create the Email Message to be sent
  const emailMessage = {
    sender: senderAddress,
    content: {
      subject: "This is the subject",
      body: {
        plainText: "This is the body",
        html: "<html><h1>This is the body</h1></html>",
      },
    },
    recipients: {
      toRecipients: [
        {
          email: recipientAddress,
          displayName: "Customer Name",
        },
        {
          email: recipientAddress,
          displayName: "Customer Name",
        },
      ],
      ccRecipients: [
        {
          email: recipientAddress,
          displayName: "Customer Name",
        },
      ],
      bccRecipients: [
        {
          email: recipientAddress,
          displayName: "Customer Name",
        },
      ],
    },
  };

  try {
    // Send the email message
    const response = await emailClient.sendEmail(emailMessage);

    console.log("Message ID: " + response.messageId);
  } catch (error) {
    console.log(error);
  }
};

void sendEmailMultipleRecipients();
