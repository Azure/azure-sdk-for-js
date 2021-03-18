import { WebPubSubCloudEventsHandler } from "../src";
import express from "express";

const handler = new WebPubSubCloudEventsHandler("chat", ["http://localhost:8080"], {
  dumpRequest: false,
  onConnect: async (connectRequest) => {
    console.log(JSON.stringify(connectRequest));
    return {};
  },
  onConnected: async (connectedRequest) => {
    console.log(JSON.stringify(connectedRequest));
  },
  onUserEvent: async (userRequest) => {
    console.log(JSON.stringify(userRequest));
    return {
      payload: {
        data: "Hey " + userRequest.payload.data,
        dataType: userRequest.payload.dataType
      }
    };
  }
});

const app = express();

app.use(handler.getMiddleware());

app.listen(3000, () =>
  console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`)
);
