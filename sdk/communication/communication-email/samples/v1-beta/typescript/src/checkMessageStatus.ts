// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Checks the message status of a sent email
 */

import { EmailClient, EmailMessage } from "@azure/communication-email";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";
const senderAddress = process.env["SENDER_ADDRESS"] || "";
const recipientAddress = process.env["RECIPIENT_ADDRESS"] || "";

const getMessageStatusFromEmail = async (): Promise<void> => {
  // Create the Email Client
  const emailClient: EmailClient = new EmailClient(connectionString);

  // Create the Email Message to be sent
  const emailMessage: EmailMessage = {
    sender: senderAddress,
    content: {
      subject: "This is the subject",
      plainText: "This is the body",
      html: "<html><h1>This is the body</h1></html>",
    },
    recipients: {
      to: [
        { email: recipientAddress, displayName: "Customer Name" },
      ],
    },
  };

  try {
    // Send the email message
    const sendEmailResponse = await emailClient.send(emailMessage);

    // Use the message id to get the status of the email
    const messageId = sendEmailResponse.messageId || "";
    const getMessageStatusResponse = await emailClient.getSendStatus(messageId);

    console.log("Message Status: " + getMessageStatusResponse);
  } catch (error) {
    console.log(error);
  }
};

void getMessageStatusFromEmail();
