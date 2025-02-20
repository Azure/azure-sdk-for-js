// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable no-restricted-imports */

import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { randomUUID } from "@azure/core-util";
import type { ConnectionOptions, Message, Session } from "rhea";
import rhea from "rhea";
import "dotenv/config";

function openSession(connection: rhea.Connection): Promise<Session> {
  return new Promise((resolve, reject) => {
    const session = connection.create_session();
    session.open();
    session.on("session_open", () => {
      resolve(session);
    });
    session.on("session_error", (context) => {
      reject(context.session.error);
    });
    session.on("session_close", (context) => {
      reject(context.session.error);
    });
  });
}

async function establishCbsAuthentication(
  connection: rhea.Connection,
  token: string,
  audience: string,
  eventHubName: string
): Promise<Session> {
  const session = await openSession(connection);
  const cbsSender = session.open_sender({ target: { address: "$cbs" } });
  const cbsReceiver = session.open_receiver({ source: { address: "$cbs" } });

  return new Promise((resolve, reject) => {
    cbsReceiver.on("message", (context) => {
      const msg = context.message as Message;
      const statusCode = msg.application_properties?.["status-code"];
      if (statusCode && statusCode < 300) {
        resolve(session);
      } else {
        reject(new Error("CBS authentication failed with status code: " + statusCode));
      }
    });

    cbsReceiver.on("receiver_error", (context) => {
      reject(context.receiver.error);
    });
    cbsSender.on("sender_error", (context) => {
      reject(context.sender.error);
    });

    cbsSender.on("sendable", () => {
      const name = `sb://${audience}/${eventHubName}`;
      const putTokenRequest: Message = {
        message_id: randomUUID(),
        reply_to: "cbs",
        application_properties: {
          operation: "put-token",
          type: "jwt",
          name,
        },
        body: token,
      };
      cbsSender.send(putTokenRequest);
    });
  });
}

async function sendToEventHubs(connection: rhea.Connection, eventHubName: string): Promise<void> {
  const session = await openSession(connection);
  return new Promise((resolve, reject) => {
    const sender = session.open_sender({ name:eventHubName, target: { address: eventHubName } });
    sender.on("sendable", () => {
      const message: Message = {
        message_id: randomUUID(),
        body: "Hello Event Hub!",
      };
      sender.send(message);
      console.log(`Message sent to Event Hub "${eventHubName}"`);
      sender.close();
      session.close();
      resolve();
    });
    sender.on("sender_error", (context) => {
      reject(context.sender.error);
    });
  });
}

async function main(): Promise<void> {
  const fullyQualifiedNamespace =
    process.env.EVENTHUB_FQDN || "<your-namespace>.servicebus.windows.net";
  const eventHubName = process.env.EVENTHUB_NAME || "eventhub";
  const wsEndpoint = `wss://${fullyQualifiedNamespace}:443/$servicebus/websocket`;

  const credential = new DefaultAzureCredential();
  const tokenProvider = getBearerTokenProvider(credential, "https://eventhubs.azure.net//.default");
  const token = await tokenProvider();

  const connectionOptions: ConnectionOptions = {
    transport: "tls",
    host: fullyQualifiedNamespace,
    hostname: fullyQualifiedNamespace,
    port: 443,
    reconnect: false,
    username: 'defaultKeyName',
    connection_details: () => {
      return rhea.websocket_connect(WebSocket)(wsEndpoint, ["AMQPWSB10"], {})() as any;
    },
  };

  console.log("Connecting to Event Hubs using AMQP over WebSocket...");

  const container = rhea.create_container();
  const connection = container.connect(connectionOptions);

  connection.on("connection_open", async (context) => {
    console.log("Connected open.");
    try {
      await establishCbsAuthentication(context.connection, token, fullyQualifiedNamespace, eventHubName);
      console.log("CBS authentication completed successfully.");
      await sendToEventHubs(context.connection, eventHubName);
    } catch (err) {
      console.error("CBS authentication error:", err);
    } finally {
      connection.close();
    }
  });

  connection.on("connection_error", (context) => {
    console.error("Connection error:", context.connection.get_error());
  });

  connection.on("connection_close", () => {
    console.log("Connection closed.");
  });

  connection.on("disconnected", () => {
    console.log("Disconnected from the service.");
  });
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
