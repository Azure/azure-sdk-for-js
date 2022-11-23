import {WebPubSubClient, DefaultWebPubSubClientCredential, WebPubSubDataType, SendToGroupOptions} from "@azure/web-pubsub-client"
import { WebPubSubServiceClient } from "@azure/web-pubsub";

const serviceClient = new WebPubSubServiceClient(process.env.WPS_CONNECTION_STRING!, "chat");

let fetchClientAccessUrl = async() => {
  return (await serviceClient.getClientAccessToken({roles: ["webpubsub.joinLeaveGroup", "webpubsub.sendToGroup"]})).url
}

async function main() {
  let client = new WebPubSubClient(new DefaultWebPubSubClientCredential(async _ => {
    return await fetchClientAccessUrl();
  }));

  client.on("connected", e => {
    console.log(`Connection ${e.connectionId} is connected.`);
  });

  client.on("disconnected", e => {
    console.log(`Connection disconnected: ${e.message}`);
  });

  client.on("server-message", e => {
    if (e.message.data instanceof ArrayBuffer) {
      console.log(`Received message ${Buffer.from(e.message.data).toString('base64')}`);
    } else {
      console.log(`Received message ${e.message.data}`);  
    }
  });

  client.on("group-message", e => {
    if (e.message.data instanceof ArrayBuffer) {
      console.log(`Received message from testGroup ${Buffer.from(e.message.data).toString('base64')}`);
    } else {
      console.log(`Received message from testGroup ${e.message.data}`);  
    }
  });
  
  await client.start();

  await client.joinGroup("testGroup");
  await client.sendToGroup("testGroup", "hello world", "text", {fireAndForget: true} as SendToGroupOptions);
  await client.sendToGroup("testGroup", {a: 12, b: "hello"}, "json");
  await client.sendToGroup("testGroup", "hello json", "json");
  var buf = Buffer.from('aGVsbG9w', 'base64');
  await client.sendToGroup("testGroup", buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), "binary");
  console.log("Sent message");
  await delay(100000);
}

main().catch((e) => {
  console.error("Sample encountered an error", e);
  process.exit(1);
});

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}