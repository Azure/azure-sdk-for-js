import {
  OnSessionMessage, OnError, MessagingError, delay, ServiceBusMessage, ReceiveMode, Namespace
} from "../../lib";
import * as dotenv from "dotenv";
import { MessageSession } from '../../lib/session/messageSession';
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const path = process.env.QUEUE_NAME || "";
console.log("str: ", str);
console.log("path: ", path);

let ns: Namespace;
async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  const client = ns.createQueueClient(path, { receiveMode: ReceiveMode.peekLock });
  const onMessage: OnSessionMessage = async (messageSession: MessageSession, brokeredMessage: ServiceBusMessage) => {
    console.log(">>> Message: ", brokeredMessage);
    console.log("### Actual message:", brokeredMessage.body ? brokeredMessage.body.toString() : undefined);
    const sequenceNumber = brokeredMessage.sequenceNumber!;
    console.log(">>>>>> SequenceNumber: %d", sequenceNumber.toNumber());
    const result = await brokeredMessage.defer();
    console.log(">>>>> Deferred message result: ", result);
    await delay(2000);
    const msg = await messageSession.receiveDeferredMessage(sequenceNumber);
    console.log(">>>>> Received deferred Message: %o", msg);
    await messageSession.close();
  };
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  const messageSession = await client.acceptSession({ sessionId: "session-3" });
  messageSession.receive(onMessage, onError, { autoComplete: false });
  await delay(30000);
}

main().then(() => {
  console.log(">>>> Calling close....");
  return ns.close();
}).catch((err) => {
  console.log("error: ", err);
});
