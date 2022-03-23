const identity = require("@azure/identity");
const serviceBus = require("@azure/service-bus");
const dotenv = require("dotenv");
const { cachePersistencePlugin } = require("@azure/identity-cache-persistence");

identity.useIdentityPlugin(cachePersistencePlugin);

// Ensure you have a .env file in the same directory with something similar to:
//
//   AZURE_CLIENT_ID="value"
//   AZURE_TENANT_ID="value"
//   AZURE_CLIENT_SECRET="value"
//   SERVICE_BUS_ENDPOINT="value"
//   QUEUE_NAME="value"
//
dotenv.config();

const credential1 = new identity.InteractiveBrowserCredential({
  redirectUri: "http://localhost:8081",
  tenantId: process.env.AZURE_TENANT_ID,
  clientId: process.env.AZURE_CLIENT_ID,
  tokenCachePersistenceOptions: {
    name: "nodeTestSilent",
    unsafeAllowUnencryptedStorage: true
  }
});

(async () => {
  console.log("Manually authenticating...");

  const account = await credential1.authenticate(`https://servicebus.azure.net/.default`);

  const credential2 = new identity.InteractiveBrowserCredential({
    redirectUri: "http://localhost:8081",
    tenantId: process.env.AZURE_TENANT_ID,
    clientId: process.env.AZURE_CLIENT_ID,
    authenticationRecord: account,
    // To be able to re-use the account, the Token Cache must also have been provided.
    // TODO: Perhaps make the account parameter part of the tokenCachePersistenceOptions?
    tokenCachePersistenceOptions: {
      name: "nodeTestSilent",
      unsafeAllowUnencryptedStorage: true
    }
  });

  const client = new serviceBus.ServiceBusClient(process.env.SERVICE_BUS_ENDPOINT, credential2);

  console.log("Silently authenticating...");

  const sender = client.createSender(process.env.QUEUE_NAME);
  const body = [
    "--- Message ---",
    `Sent at: ${new Date()}`,
    "Body:",
    "Hello.",
    "--- Message End ---",
  ].join("\n");
  console.log("Attempting to send a message...");
  await sender.sendMessages({ body });
  console.log("Message sent successfully!");
  await sender.close();
  const receiver = client.createReceiver(process.env.QUEUE_NAME);
  const messages = await receiver.receiveMessages(10);
  for (let message of messages) {
    await receiver.completeMessage(message);
  }
  await receiver.close();
  const output = `Received messages:\n${messages.map((m) => m.body.toString()).join("\n")}`;
  console.log(output);
})().then(console.log).catch(console.error);
