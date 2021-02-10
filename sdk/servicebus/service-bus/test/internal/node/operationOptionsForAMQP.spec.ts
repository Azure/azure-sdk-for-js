// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { setTracer, SpanGraph, TestTracer } from "@azure/core-tracing";
import { EnvironmentCredential, GetTokenOptions } from "@azure/identity";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import Long from "long";
import { generate_uuid } from "rhea-promise";
import {
  OperationOptionsBase,
  ServiceBusAdministrationClient,
  ServiceBusClient,
  TokenCredential
} from "../../../src";
import { ConnectionContext } from "../../../src/connectionContext";
import { ServiceBusReceiverImpl } from "../../../src/receivers/receiver";
import { ServiceBusSenderImpl } from "../../../src/sender";
import { DispositionType } from "../../../src/serviceBusMessage";
import { getOperationOptionsBase } from "../../../src/util/utils";
import { getEnvVars } from "../../public/utils/envVarUtils";
const should = chai.should();
chai.use(chaiAsPromised);

describe("OperationOptions reach getToken at `@azure/identity`", () => {
  const env = getEnvVars();
  const serviceBusEndpoint = (env.SERVICEBUS_CONNECTION_STRING.match(
    "Endpoint=sb://((.*).servicebus.windows.net)"
  ) || "")[1];

  const credential = new EnvironmentCredential();
  const sbAdminClient = new ServiceBusAdministrationClient(serviceBusEndpoint, credential);
  let sbClient: ServiceBusClient;

  beforeEach(() => {
    sbClient = new ServiceBusClient(serviceBusEndpoint, credential);
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
    let actualOptions: OperationOptionsBase = {};

    const preservedGetTokenMethod = (context.tokenCredential as TokenCredential).getToken;
    context.tokenCredential.getToken = async (scopes: string, options: GetTokenOptions) => {
      getTokenIsInvoked = true;
      actualOptions = getOperationOptionsBase(options);
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
      should.equal(getTokenIsInvoked, true, `getToken is not invoked, instead failed with ${err}`);
      should.equal(
        verifiedOperationOptions,
        true,
        `OperationOptions were not the same as expected,
        Actual   - ${JSON.stringify(actualOptions)}
        Expected - ${JSON.stringify(operationOptions)}\n`
      );
      context.tokenCredential.getToken = preservedGetTokenMethod; // reset
    }
  }

  describe("Sender", () => {
    it("RequestOptions is plumbed through sendMessages", async () => {
      const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;
      sender["_context"].cbsSession.init = async () => {};

      await verifyOperationOptionsAtGetToken(
        sender["_context"],
        {
          requestOptions: {
            timeout: 369
          }
        },
        async () => {
          await sender.sendMessages(
            {
              body: "message"
            },
            {
              requestOptions: {
                timeout: 369
              }
            }
          );
        }
      );
    });

    it("RequestOptions is plumbed through sendMessages - overrides the ServiceBusClientOptions", async () => {
      sbClient = new ServiceBusClient(serviceBusEndpoint, credential, {
        requestOptions: {
          timeout: 199
        }
      });
      const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;
      sender["_context"].cbsSession.init = async () => {};
      await verifyOperationOptionsAtGetToken(
        sender["_context"],
        {
          requestOptions: {
            timeout: 369
          }
        },
        async () => {
          await sender.sendMessages(
            {
              body: "message"
            },
            {
              requestOptions: {
                timeout: 369
              }
            }
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
        {
          tracingOptions: {
            spanOptions: {
              parent: rootSpan.context()
            }
          }
        }
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
              {
                name: "Azure.ServiceBus.message",
                children: []
              },
              {
                name: "Azure.ServiceBus.send",
                children: []
              }
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

    it("RequestOptions is plumbed through createMessageBatch", async () => {
      const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;
      sender["_context"].cbsSession.init = async () => {};

      await verifyOperationOptionsAtGetToken(
        sender["_context"],
        {
          requestOptions: {
            timeout: 369
          }
        },
        async () => {
          await sender.createMessageBatch({
            requestOptions: {
              timeout: 369
            }
          });
        }
      );
    });
  });

  describe("Receiver", () => {
    it("RequestOptions is plumbed through receiveMessages", async () => {
      const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
      receiver["_context"].cbsSession.init = async () => {};

      await verifyOperationOptionsAtGetToken(
        receiver["_context"],
        {
          requestOptions: {
            timeout: 369
          }
        },
        async () => {
          await receiver.receiveMessages(1, {
            requestOptions: {
              timeout: 369
            }
          });
        }
      );
    });

    // TODO: Unable to stop the forever retry even though I tried closing it
    // it("RequestOptions is plumbed through subscribe", async () => {
    //   const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
    //   receiver["_context"].cbsSession.init = async () => {};

    //   await verifyOperationOptionsAtGetToken(
    //     receiver["_context"],
    //     {
    //       requestOptions: {
    //         timeout: 369
    //       }
    //     },
    //     async () => {
    //       receiver.subscribe(
    //         {
    //           processMessage: async () => {},
    //           processError: async (args: ProcessErrorArgs) => {
    //             throw args.error;
    //           }
    //         },
    //         {
    //           requestOptions: {
    //             timeout: 369
    //           }
    //         }
    //       );
    //       await delay(1);
    //       await receiver.close();
    //     }
    //   );
    // });

    it("RequestOptions is plumbed through settlement methods", async () => {
      const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
      receiver["_context"].cbsSession.init = async () => {};

      await verifyOperationOptionsAtGetToken(
        receiver["_context"],
        {
          requestOptions: {
            timeout: 369
          }
        },
        async () => {
          await receiver.completeMessage(
            { body: "message", _rawAmqpMessage: { body: "message" } },
            {
              requestOptions: {
                timeout: 369
              }
            }
          );
        }
      );
    });
    // subscribe
    // get message iterator
    // settlement

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
              {
                name: "Azure.ServiceBus.process",
                children: []
              }
            ]
          }
        ]
      };

      const rootSpan = tracer.startSpan("root");
      const receiver = sbClient.createReceiver(queueName);
      await receiver.receiveMessages(1, {
        tracingOptions: {
          spanOptions: {
            parent: rootSpan.context()
          }
        }
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

  describe("ManagementClient - Non-session", () => {
    it("RequestOptions is plumbed through scheduleMessages", async () => {
      sbClient = new ServiceBusClient(serviceBusEndpoint, credential);
      const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;

      await verifyOperationOptionsAtGetToken(
        sender["_context"],
        {
          requestOptions: {
            timeout: 199
          }
        },
        async () => {
          await sender.scheduleMessages(
            {
              body: "message"
            },
            new Date(),
            {
              requestOptions: {
                timeout: 199
              }
            }
          );
        }
      );
    });

    it("RequestOptions is plumbed through cancelScheduledMessages", async () => {
      sbClient = new ServiceBusClient(serviceBusEndpoint, credential);
      const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;

      await verifyOperationOptionsAtGetToken(
        sender["_context"],
        {
          requestOptions: {
            timeout: 199
          }
        },
        async () => {
          await sender.cancelScheduledMessages(Long.ZERO, {
            requestOptions: {
              timeout: 199
            }
          });
        }
      );
    });

    it("RequestOptions is plumbed through peek", async () => {
      sbClient = new ServiceBusClient(serviceBusEndpoint, credential);
      const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;

      await verifyOperationOptionsAtGetToken(
        receiver["_context"],
        {
          requestOptions: {
            timeout: 199
          }
        },
        async () => {
          await receiver.peekMessages(1, {
            requestOptions: {
              timeout: 199
            }
          });
        }
      );
    });

    it("RequestOptions is plumbed through backup settlement", async () => {
      sbClient = new ServiceBusClient(serviceBusEndpoint, credential);
      const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
      const managementClient = receiver["_context"].getManagementClient("queue");
      managementClient["_context"].wasConnectionCloseCalled = false;
      await verifyOperationOptionsAtGetToken(
        managementClient["_context"],
        {
          requestOptions: {
            timeout: 199
          }
        },
        async () => {
          await managementClient.updateDispositionStatus(
            generate_uuid(),
            DispositionType.complete,
            {
              requestOptions: {
                timeout: 199
              },
              associatedLinkName: generate_uuid()
            }
          );
        }
      );
    });

    it("RequestOptions is plumbed through receive-deferred-messages", async () => {
      sbClient = new ServiceBusClient(serviceBusEndpoint, credential);
      const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;

      await verifyOperationOptionsAtGetToken(
        receiver["_context"],
        {
          requestOptions: {
            timeout: 199
          }
        },
        async () => {
          await receiver.receiveDeferredMessages(Long.ZERO, {
            requestOptions: {
              timeout: 199
            }
          });
        }
      );
    });

    it("RequestOptions is plumbed through renew message lock", async () => {
      sbClient = new ServiceBusClient(serviceBusEndpoint, credential);
      const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
      receiver.receiveMode = "peekLock";
      await verifyOperationOptionsAtGetToken(
        receiver["_context"],
        {
          requestOptions: {
            timeout: 199
          }
        },
        async () => {
          await receiver.renewMessageLock(
            {
              body: "message",
              lockToken: generate_uuid(),
              _rawAmqpMessage: { body: "message" },
              delivery: { link: undefined }
            } as any,
            {
              requestOptions: {
                timeout: 199
              }
            }
          );
        }
      );
    });
  });

  describe("SessionReceiver", () => {
    const queueName = `queue-${Math.ceil(Math.random() * 1000)}`;

    before(async () => {
      await sbAdminClient.createQueue(queueName, { requiresSession: true });
      sbClient = new ServiceBusClient(serviceBusEndpoint, credential);
      const sender = sbClient.createSender(queueName);
      await sender.sendMessages({ body: "message", sessionId: "session-id" });
      await sender.close();
      await sbClient.close();
    });

    after(async () => {
      await sbAdminClient.deleteQueue(queueName);
    });

    beforeEach(() => {
      sbClient = new ServiceBusClient(serviceBusEndpoint, credential);
    });

    afterEach(async () => {
      await sbClient.close();
    });

    it("RequestOptions is plumbed through acceptSession", async () => {
      await verifyOperationOptionsAtGetToken(
        sbClient["_connectionContext"],
        {
          requestOptions: {
            timeout: 369
          }
        },
        async () => {
          await sbClient.acceptSession("queue", "session-id", {
            requestOptions: {
              timeout: 369
            }
          });
        }
      );
    });

    it("RequestOptions is plumbed through acceptNextSession", async () => {
      await verifyOperationOptionsAtGetToken(
        sbClient["_connectionContext"],
        {
          requestOptions: {
            timeout: 369
          }
        },
        async () => {
          await sbClient.acceptNextSession("queue", {
            requestOptions: {
              timeout: 369
            }
          });
        }
      );
    });

    it("RequestOptions is plumbed through renewSessionLock", async () => {
      const receiver = await sbClient.acceptNextSession(queueName);
      await verifyOperationOptionsAtGetToken(
        sbClient["_connectionContext"],
        {
          requestOptions: {
            timeout: 369
          }
        },
        async () => {
          await receiver.renewSessionLock({
            requestOptions: {
              timeout: 369
            }
          });
        }
      );
    });

    it("RequestOptions is plumbed through setSessionState", async () => {
      const receiver = await sbClient.acceptNextSession(queueName);
      await verifyOperationOptionsAtGetToken(
        sbClient["_connectionContext"],
        {
          requestOptions: {
            timeout: 369
          }
        },
        async () => {
          await receiver.setSessionState("set-state", {
            requestOptions: {
              timeout: 369
            }
          });
        }
      );
    });

    it("RequestOptions is plumbed through getSessionState", async () => {
      const receiver = await sbClient.acceptNextSession(queueName);
      await verifyOperationOptionsAtGetToken(
        sbClient["_connectionContext"],
        {
          requestOptions: {
            timeout: 369
          }
        },
        async () => {
          await receiver.getSessionState({
            requestOptions: {
              timeout: 369
            }
          });
        }
      );
    });

    it("RequestOptions is plumbed through peekMessages", async () => {
      const receiver = await sbClient.acceptNextSession(queueName);
      await verifyOperationOptionsAtGetToken(
        sbClient["_connectionContext"],
        {
          requestOptions: {
            timeout: 369
          }
        },
        async () => {
          await receiver.peekMessages(1, {
            requestOptions: {
              timeout: 369
            }
          });
        }
      );
    });

    it("RequestOptions is plumbed through receive deferred messages", async () => {
      const receiver = await sbClient.acceptNextSession(queueName);
      await verifyOperationOptionsAtGetToken(
        sbClient["_connectionContext"],
        {
          requestOptions: {
            timeout: 369
          }
        },
        async () => {
          await receiver.receiveDeferredMessages(Long.ZERO, {
            requestOptions: {
              timeout: 369
            }
          });
        }
      );
    });
    // No similar test for `receiveMessages` because the init happens at the acceptSession level
    // Backup settlement
    // getMessageIterator
    // subscribe
  });

  describe("ServiceBusClient", () => {
    it("RequestOptions from SBClient get used for sendMessages", async () => {
      sbClient = new ServiceBusClient(serviceBusEndpoint, credential, {
        requestOptions: {
          timeout: 199
        }
      });
      const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;
      sender["_context"].cbsSession.init = async () => {};

      await verifyOperationOptionsAtGetToken(
        sender["_context"],
        {
          requestOptions: {
            timeout: 199
          }
        },
        async () => {
          await sender.sendMessages({
            body: "message"
          });
        }
      );
    });
    // onDetached - subscribe will care
  });
  // TODO: Add tests to make sure each operation gets options from SBClient if defined
  // TODO: Add tests to make sure abortSignal works at each level
  // TODO: Add tests to make sure the tracing works end-to-end for all the methods
});
