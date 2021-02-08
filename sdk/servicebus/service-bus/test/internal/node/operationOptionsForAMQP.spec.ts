// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { setTracer, SpanGraph, TestTracer } from "@azure/core-tracing";
import { EnvironmentCredential, GetTokenOptions } from "@azure/identity";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  OperationOptionsBase,
  ServiceBusAdministrationClient,
  ServiceBusClient,
  TokenCredential
} from "../../../src";
import { ConnectionContext } from "../../../src/connectionContext";
import { ServiceBusReceiverImpl } from "../../../src/receivers/receiver";
import { ServiceBusSenderImpl } from "../../../src/sender";
import { getEnvVars } from "../../public/utils/envVarUtils";
const should = chai.should();
chai.use(chaiAsPromised);

describe("OperationOptions reach getToken at `@azure/identity`", () => {
  const env = getEnvVars();
  const serviceBusEndpoint = (env.SERVICEBUS_CONNECTION_STRING.match(
    "Endpoint=sb://((.*).servicebus.windows.net)"
  ) || "")[1];

  let credential: TokenCredential;
  let sbClient: ServiceBusClient;
  let sbAdminClient: ServiceBusAdministrationClient;

  beforeEach(() => {
    credential = new EnvironmentCredential();
    sbClient = new ServiceBusClient(serviceBusEndpoint, credential);
    sbAdminClient = new ServiceBusAdministrationClient(serviceBusEndpoint, credential);
  });

  afterEach(async () => {
    await sbClient.close();
  });

  async function verifyOperationOptionsAtGetToken(
    context: ConnectionContext,
    operationOptions: OperationOptionsBase,
    func: Function
  ) {
    let getTokenIsInvoked = false;
    let verifiedOperationOptions = false;

    const preservedGetTokenMethod = (context.tokenCredential as TokenCredential).getToken;
    context.tokenCredential.getToken = async (scopes: string, options: GetTokenOptions) => {
      getTokenIsInvoked = true;
      should.equal(
        options.requestOptions?.timeout === operationOptions.requestOptions?.timeout,
        true,
        "Timeout is not set as expected"
      );
      should.equal(
        options.abortSignal,
        operationOptions.abortSignal,
        "AbortSignal is not set as expected"
      );
      chai.assert.deepEqual(
        options.tracingOptions,
        operationOptions.tracingOptions,
        "TracingOptions are not set as expected"
      );
      verifiedOperationOptions = true;
      return preservedGetTokenMethod(scopes, options);
    };

    try {
      await func();
      should.fail("Something went wrong - should not have reached here");
    } catch (err) {
      should.equal(getTokenIsInvoked, true, "getToken is not invoked");
      should.equal(
        verifiedOperationOptions,
        true,
        "OperationOptions were not the same as expected"
      );
    }
  }

  describe("Sender", () => {
    it("RequestOptions is plumbed through sendMessages", async () => {
      const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;
      sender["_context"].cbsSession.init = async () => {};

      await verifyOperationOptionsAtGetToken(
        sender["_context"],
        { requestOptions: { timeout: 369 } },
        async () => {
          await sender.sendMessages(
            {
              body: "message"
            },
            { requestOptions: { timeout: 369 } }
          );
        }
      );
    });

    it("RequestOptions is plumbed through sendMessages - overrides the ServiceBusClientOptions", async () => {
      sbClient = new ServiceBusClient(serviceBusEndpoint, credential, {
        requestOptions: { timeout: 199 }
      });
      const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;
      sender["_context"].cbsSession.init = async () => {};
      await verifyOperationOptionsAtGetToken(
        sender["_context"],
        { requestOptions: { timeout: 369 } },
        async () => {
          await sender.sendMessages(
            {
              body: "message"
            },
            { requestOptions: { timeout: 369 } }
          );
        }
      );
    });

    it("TracingOptions is plumbed through sendMessages", async () => {
      const queueName = `queue-${Math.ceil(Math.random() * 1000)}`;
      await sbAdminClient.createQueue(queueName);
      const tracer = new TestTracer();
      setTracer(tracer);
      const rootSpan = tracer.startSpan("root");
      const sender = sbClient.createSender(queueName) as ServiceBusSenderImpl;

      await sender.sendMessages(
        {
          body: "message"
        },
        { tracingOptions: { spanOptions: { parent: rootSpan.context() } } }
      );
      rootSpan.end();
      const expectedGraph: SpanGraph = {
        roots: [
          {
            name: "root",
            children: [
              {
                name: "Azure.Identity.EnvironmentCredential-getToken",
                children: [
                  {
                    name: "Azure.Identity.ClientSecretCredential-getToken",
                    children: [
                      {
                        name: `/${env.AZURE_TENANT_ID}/oauth2/v2.0/token`,
                        children: []
                      }
                    ]
                  }
                ]
              },
              { name: "Azure.ServiceBus.message", children: [] },
              { name: "Azure.ServiceBus.send", children: [] }
            ]
          }
        ]
      };
      chai.assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.context().traceId), expectedGraph);
      chai.assert.strictEqual(
        tracer.getActiveSpans().length,
        0,
        "All spans should have had end called"
      );
      await sbAdminClient.deleteQueue(queueName);
    });
  });

  describe("Receiver", () => {
    it("RequestOptions is plumbed through receiveMessages", async () => {
      const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
      receiver["_context"].cbsSession.init = async () => {};

      await verifyOperationOptionsAtGetToken(
        receiver["_context"],
        { requestOptions: { timeout: 369 } },
        async () => {
          await receiver.receiveMessages(1, { requestOptions: { timeout: 369 } });
        }
      );
    });

    it("TracingOptions is plumbed through receiveMessages", async () => {
      const queueName = `queue-${Math.ceil(Math.random() * 1000)}`;
      await sbAdminClient.createQueue(queueName);
      const tracer = new TestTracer();
      setTracer(tracer);
      const sender = sbClient.createSender(queueName);

      await sender.sendMessages({
        body: "message"
      });
      const expectedGraph: SpanGraph = {
        roots: [
          {
            name: "root",
            children: [
              {
                name: "Azure.Identity.EnvironmentCredential-getToken",
                children: [
                  {
                    name: "Azure.Identity.ClientSecretCredential-getToken",
                    children: [
                      {
                        name: `/${env.AZURE_TENANT_ID}/oauth2/v2.0/token`,
                        children: []
                      }
                    ]
                  }
                ]
              },
              { name: "Azure.ServiceBus.process", children: [] }
            ]
          }
        ]
      };

      const rootSpan = tracer.startSpan("root");
      const receiver = sbClient.createReceiver(queueName);
      await receiver.receiveMessages(1, {
        tracingOptions: { spanOptions: { parent: rootSpan.context() } }
      });
      rootSpan.end();

      chai.assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.context().traceId), expectedGraph);
      chai.assert.strictEqual(
        tracer.getActiveSpans().length,
        0,
        "All spans should have had end called"
      );
      await sbAdminClient.deleteQueue(queueName);
    });
  });

  describe("ServiceBusClient", () => {
    it("RequestOptions is plumbed through sendMessages", async () => {
      sbClient = new ServiceBusClient(serviceBusEndpoint, credential, {
        requestOptions: { timeout: 199 }
      });
      const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;
      sender["_context"].cbsSession.init = async () => {};

      await verifyOperationOptionsAtGetToken(
        sender["_context"],
        { requestOptions: { timeout: 199 } },
        async () => {
          await sender.sendMessages({
            body: "message"
          });
        }
      );
    });
  });
});
