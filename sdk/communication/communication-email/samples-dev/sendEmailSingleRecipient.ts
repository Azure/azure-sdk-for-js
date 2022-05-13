// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sends an email with a single recipient
 */

// TODO: Adjust these to point to the published package
import { EmailClient } from "../src/emailClient";
import { EmailMessage } from "../src/models";

// Load the .env file (you will need to set these enviornment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";
const senderAddress = process.env["SENDER_ADDRESS"] || "";
const recipientAddress = process.env["RECIPIENT_ADDRESS"] || "";

const sendSingleEmail = async (): Promise<void> => {
  // Create the Email Client
  const emailClient: EmailClient = new EmailClient(connectionString);

  // Create the Email Message to be sent
  const emailMessage: EmailMessage = {
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

void sendSingleEmail();
