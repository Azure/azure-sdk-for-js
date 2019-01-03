import { Namespace, delay, ScheduleMessage } from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const path = process.env.QUEUE_NAME || "";
console.log("str: ", str);
console.log("path: ", path);

let ns: Namespace;
async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  const client = ns.createQueueClient(path);
  const scheduleTime1 = new Date(Date.now() + 30000); // 30 seconds from now
  const scheduleTime2 = new Date(Date.now() + 32000); // 32 seconds from now
  const messages: ScheduleMessage[] = [
    {
      message: { body: "Hello sb world!!" + scheduleTime1.toString() },
      scheduledEnqueueTimeUtc: scheduleTime1
    },
    {
      message: { body: "Hello sb world!!" + scheduleTime2.toString() },
      scheduledEnqueueTimeUtc: scheduleTime2
    }
  ];
  const sequenceNumbers = await client.scheduleMessages(messages);
  console.log("***********Created sender and sent the message... %o", sequenceNumbers);
  await delay(3000);
  console.log(">>>> Cancelling scheduled messages");
  await client.cancelScheduledMessages(sequenceNumbers);
  console.log(">>>>>>>> Done cancelling scheduled messages..");
}

main()
  .then(() => {
    console.log(">>>> Calling close....");
    return ns.close();
  })
  .catch((err) => {
    console.log("error: ", err);
  });
