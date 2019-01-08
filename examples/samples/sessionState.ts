import { generateUuid, SendableMessageInfo, Namespace } from "../../lib";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "";
const userEventsQueue = process.env.QUEUE_NAME || "";

console.log("connection string: ", connectionString);
console.log("path: ", userEventsQueue);

let ns: Namespace;

/*
  This sample demonstrates usage of SessionState.
  Ref - https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions

  We take for example the context of an online shopping app and see how we can use Session State
  to implement the maintaining of shopping cart information completely on server side i.e.,
  remembering the users' shopped items even if they leave the site and return later.

  The scenario in sample walks through user activity of two customers Alice and Bob.
  Alice adds 3 items to the shopping cart and checks out, whereas Bob adds 3 items and leaves without
  checking out to likely return later.
  The session state keeps track of the cart items accordingly.
*/
async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(connectionString);

  await runScenario();

  await ns.close();
  console.log("\n>>>> sample Done!!!!");
}

async function runScenario(): Promise<void> {
  // User activity data for Alice and Bob
  const shoppingEventsDataAlice = [
    { event_name: "Add Item", event_details: "Milk" },
    { event_name: "Add Item", event_details: "Bread" },
    { event_name: "Add Item", event_details: "Eggs" },
    { event_name: "Checkout", event_details: "Success" }
  ];

  const shoppingEventsDataBob = [
    { event_name: "Add Item", event_details: "Pencil" },
    { event_name: "Add Item", event_details: "Paper" },
    { event_name: "Add Item", event_details: "Stapler" }
  ];

  // Simulating user events
  await sendMessagesForSession(shoppingEventsDataAlice, "alice");
  await sendMessagesForSession(shoppingEventsDataBob, "bob");

  await processMessageFromSession("alice");
  await processMessageFromSession("alice");

  // Displaying snapshot of Alice's shopping cart (SessionState) after processing 2 events
  // This will show two items
  await getSessionState("alice");

  await processMessageFromSession("alice");
  await processMessageFromSession("alice");
  await processMessageFromSession("bob");
  await processMessageFromSession("bob");
  await processMessageFromSession("bob");

  // Displaying snapshot of Alice's shopping cart (SessionState) after processing remaining events
  // This will show null as Alice checksout and cart is cleared
  await getSessionState("alice");
  // Displaying snapshot of Bob's shopping cart (SessionState) after processing all the events
  // This will show three items
  await getSessionState("bob");
}

async function getSessionState(sessionId: string): Promise<void> {
  const client = ns.createQueueClient(userEventsQueue);
  const messageSession = await client.acceptSession({ sessionId: sessionId });

  const sessionState = await messageSession.getState();
  if (sessionState) {
    // Get list of items
    console.log(`\nItems in cart for ${sessionId}: ${sessionState}\n`);
  } else {
    console.log(`\nNo Items were added to cart for ${sessionId}\n`);
  }

  await messageSession.close();
  await client.close();
}

async function sendMessagesForSession(shoppingEvents: any[], sessionId: string): Promise<void> {
  const client = ns.createQueueClient(userEventsQueue);

  for (let index = 0; index < shoppingEvents.length; index++) {
    const message: SendableMessageInfo = {
      sessionId: sessionId,
      body: shoppingEvents[index],
      label: "Shopping Step",
      timeToLive: 10 * 60 * 1000, // 2 minutes
      messageId: generateUuid()
    };
    await client.send(message);
  }
  await client.close();
}

async function processMessageFromSession(sessionId: string): Promise<void> {
  const client = ns.createQueueClient(userEventsQueue);
  const messageSession = await client.acceptSession({ sessionId: sessionId });

  const messages = await messageSession.receiveBatch(1, 10);

  // Custom logic for processing the messages
  if (messages.length > 0) {
    // Update sessionState
    if (messages[0].body.event_name === "Checkout") {
      // Clear cart if customer exits, else retain items.
      await messageSession.setState(JSON.stringify([]));
    } else if (messages[0].body.event_name === "Add Item") {
      // Update cart if customer adds items and store it in session state.
      const currentSessionState = await messageSession.getState();
      let newSessionState: string[] = [];
      if (currentSessionState) {
        newSessionState = JSON.parse(currentSessionState);
      }
      newSessionState.push(messages[0].body.event_details);
      await messageSession.setState(JSON.stringify(newSessionState));
    }

    console.log(
      `Received message: Customer '${messageSession.sessionId}' did '${
        messages[0].body.event_name
      } ${messages[0].body.event_details}'`
    );
    await messages[0].complete();
  } else {
    console.log(`No events were received for Customer: ${sessionId}\n`);
  }

  await messageSession.close();
  await client.close();
}

main().catch((err) => {
  console.log(">>>>> Error occurred: ", err);
  return ns.close();
});
