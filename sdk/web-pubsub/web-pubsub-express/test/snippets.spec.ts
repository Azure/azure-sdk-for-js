// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MqttConnectRequest,
  MqttDisconnectedRequest,
  WebPubSubEventHandler,
} from "../src/index.js";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
// @ts-ignore
import express from "express";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const handler = new WebPubSubEventHandler("chat");
    // @ts-preserve-whitespace
    const app = express();
    // @ts-preserve-whitespace
    app.use(handler.getMiddleware());
    // @ts-preserve-whitespace
    app.listen(3000, () =>
      console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`),
    );
  });

  it("ReadmeSampleConnect", async () => {
    const handler = new WebPubSubEventHandler("chat", {
      handleConnect: (req, res) => {
        // auth the connection and set the userId of the connection
        res.success({
          userId: "<userId>",
        });
      },
      allowedEndpoints: ["https://<yourAllowedService>.webpubsub.azure.com"],
    });
    // @ts-preserve-whitespace
    const app = express();
    // @ts-preserve-whitespace
    app.use(handler.getMiddleware());
    // @ts-preserve-whitespace
    app.listen(3000, () =>
      console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`),
    );
  });

  it("ReadmeSampleConnectAndReject", async () => {
    const handler = new WebPubSubEventHandler("chat", {
      handleConnect: (req, res) => {
        // auth the connection and reject the connection if auth failed
        res.fail(401, "Unauthorized");
        // the following method is also a valid approach
        // res.failWith({ code: 401, detail: "Unauthorized" });
      },
      allowedEndpoints: ["https://<yourAllowedService>.webpubsub.azure.com"],
    });
    // @ts-preserve-whitespace
    const app = express();
    // @ts-preserve-whitespace
    app.use(handler.getMiddleware());
    // @ts-preserve-whitespace
    app.listen(3000, () =>
      console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`),
    );
  });

  it("ReadmeSampleConnected", async () => {
    const handler = new WebPubSubEventHandler("chat", {
      onConnected: (connectedRequest) => {
        // Your onConnected logic goes here
      },
      allowedEndpoints: ["https://<yourAllowedService>.webpubsub.azure.com"],
    });
    // @ts-preserve-whitespace
    const app = express();
    // @ts-preserve-whitespace
    app.use(handler.getMiddleware());
    // @ts-preserve-whitespace
    app.listen(3000, () =>
      console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`),
    );
  });

  it("ReadmeSampleDisconnected", async () => {
    const handler = new WebPubSubEventHandler("chat", {
      onDisconnected: (disconnectedRequest) => {
        // Your onDisconnected logic goes here
      },
      allowedEndpoints: ["https://<yourAllowedService>.webpubsub.azure.com"],
    });
    // @ts-preserve-whitespace
    const app = express();
    // @ts-preserve-whitespace
    app.use(handler.getMiddleware());
    // @ts-preserve-whitespace
    app.listen(3000, () =>
      console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`),
    );
  });

  it("ReadmeSampleConnectMqtt", async () => {
    const handler = new WebPubSubEventHandler("chat", {
      handleConnect: (req, res) => {
        if (req.context.clientProtocol === "mqtt") {
          // return mqtt response when request is of MQTT kind
          // get connect request as mqtt request and print it
          const mqttRequest = req as MqttConnectRequest;
          console.log(mqttRequest);
          // @ts-preserve-whitespace
          // auth the connection and return mqtt response
          res.success({
            userId: "user1",
            mqtt: { userProperties: [{ name: "a", value: "b" }] },
          });
        } else {
          res.success({
            userId: "user1",
          });
        }
      },
      allowedEndpoints: ["https://<yourAllowedService>.webpubsub.azure.com"],
    });
    // @ts-preserve-whitespace
    const app = express();
    // @ts-preserve-whitespace
    app.use(handler.getMiddleware());
    // @ts-preserve-whitespace
    app.listen(3000, () =>
      console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`),
    );
  });

  it("ReadmeSampleConnectMqttAndReject", async () => {
    const handler = new WebPubSubEventHandler("chat", {
      handleConnect: (req, res) => {
        // auth the connection and reject the connection if auth failed
        if (req.context.clientProtocol === "mqtt") {
          // return mqtt error response when request is of MQTT kind
          // get connect request as mqtt request and print it
          const mqttRequest = req as MqttConnectRequest;
          console.log(mqttRequest);
          // @ts-preserve-whitespace
          // auth the connection and return mqtt failure response
          res.fail(401, "Not Authorized");
          // @ts-preserve-whitespace
          // Or use below method for more fine-grained control over the MQTT return code
          // res.failWith({ mqtt: { code: MqttV500ConnectReasonCode.NotAuthorized } });
        } else res.success();
      },
      allowedEndpoints: ["https://<yourAllowedService>.webpubsub.azure.com"],
    });
    // @ts-preserve-whitespace
    const app = express();
    // @ts-preserve-whitespace
    app.use(handler.getMiddleware());
    // @ts-preserve-whitespace
    app.listen(3000, () =>
      console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`),
    );
  });

  it("ReadmeSampleDisconnectedMqtt", async () => {
    const handler = new WebPubSubEventHandler("chat", {
      onDisconnected: (disconnectedRequest) => {
        if (disconnectedRequest.context.clientProtocol === "mqtt") {
          // get disconnect request as mqtt request and print it
          const mqttRequest = disconnectedRequest as MqttDisconnectedRequest;
          console.log(mqttRequest.mqtt);
          // Your onDisconnected logic goes here
        } else {
          console.log(disconnectedRequest);
          // Your onDisconnected logic goes here
        }
      },
      allowedEndpoints: ["https://<yourAllowedService>.webpubsub.azure.com"],
    });
    // @ts-preserve-whitespace
    const app = express();
    // @ts-preserve-whitespace
    app.use(handler.getMiddleware());
    // @ts-preserve-whitespace
    app.listen(3000, () =>
      console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`),
    );
  });

  it("ReadmeSampleAllowedEndpoints", async () => {
    const handler = new WebPubSubEventHandler("chat", {
      allowedEndpoints: [
        "https://<yourAllowedService1>.webpubsub.azure.com",
        "https://<yourAllowedService2>.webpubsub.azure.com",
      ],
    });
    // @ts-preserve-whitespace
    const app = express();
    // @ts-preserve-whitespace
    app.use(handler.getMiddleware());
    // @ts-preserve-whitespace
    app.listen(3000, () =>
      console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`),
    );
  });

  it("ReadmeSampleCustomPath", async () => {
    const handler = new WebPubSubEventHandler("chat", {
      path: "/customPath1",
    });
    // @ts-preserve-whitespace
    const app = express();
    // @ts-preserve-whitespace
    app.use(handler.getMiddleware());
    // @ts-preserve-whitespace
    app.listen(3000, () =>
      // Azure WebPubSub Upstream ready at http://localhost:3000/customPath1
      console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`),
    );
  });

  it("ReadmeSampleState", async () => {
    const handler = new WebPubSubEventHandler("chat", {
      handleConnect(req, res) {
        // You can set the state for the connection, it lasts throughout the lifetime of the connection
        res.setState("calledTime", 1);
        res.success();
      },
      handleUserEvent(req, res) {
        const calledTime = req.context.states.calledTime++;
        console.log(calledTime);
        // You can also set the state here
        res.setState("calledTime", calledTime);
        res.success();
      },
    });
    // @ts-preserve-whitespace
    const app = express();
    // @ts-preserve-whitespace
    app.use(handler.getMiddleware());
    // @ts-preserve-whitespace
    app.listen(3000, () =>
      console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`),
    );
  });

  it("WebPubSubEventHandlerHandleMessages", async () => {
    const endpoint = "https://xxxx.webpubsubdev.azure.com";
    const handler = new WebPubSubEventHandler("chat", {
      handleConnect: (req, res) => {
        console.log(JSON.stringify(req));
        return {};
      },
      onConnected: (req) => {
        console.log(JSON.stringify(req));
      },
      handleUserEvent: (req, res) => {
        console.log(JSON.stringify(req));
        res.success("Hey " + req.data, req.dataType);
      },
      allowedEndpoints: [endpoint],
    });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
