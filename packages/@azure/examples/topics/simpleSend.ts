import { Namespace } from "../../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const topic = process.env.TOPIC_NAME || "";

console.log("str: ", str);
console.log("path: ", topic);

let ns: Namespace;
async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);
  const client = ns.createTopicClient(topic);

  await client.send({
    body: "Red Message",
    label: "Red Message",
    userProperties: {
      Color: "Red"
    }
  });

  await client.send({
    body: "Blue Message",
    label: "Blue Message",
    userProperties: {
      Color: "Blue"
    }
  });

  await client.send({
    body: "Yellow Message",
    label: "Yellow Message",
    userProperties: {
      Color: "Yellow"
    }
  });
}

main()
  .then(() => {
    console.log(">>>> Calling close....");
    return ns.close();
  })
  .catch((err) => {
    console.log("error: ", err);
    return ns.close();
  });
