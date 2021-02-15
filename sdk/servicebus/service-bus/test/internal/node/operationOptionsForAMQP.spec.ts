// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { setTracer, SpanGraph, TestTracer } from "@azure/core-tracing";
import { EnvironmentCredential, GetTokenOptions } from "@azure/identity";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import Long from "long";
import { AmqpError, delay, generate_uuid } from "rhea-promise";
import {
  OperationOptionsBase,
  ServiceBusAdministrationClient,
  ServiceBusClient
} from "../../../src";
import { ConnectionContext } from "../../../src/connectionContext";
import { ServiceBusReceiverImpl } from "../../../src/receivers/receiver";
import { ServiceBusSenderImpl } from "../../../src/sender";
import { DispositionType, ServiceBusReceivedMessage } from "../../../src/serviceBusMessage";
import { getOperationOptionsBase } from "../../../src/util/utils";
import { getEnvVars } from "../../public/utils/envVarUtils";
import { recreateQueue } from "../../public/utils/managementUtils";
import { TestMessage } from "../../public/utils/testUtils";
const should = chai.should();
chai.use(chaiAsPromised);

describe("OperationOptions reach getToken at `@azure/identity`", () => {
  const env = getEnvVars();
  const serviceBusEndpoint = (env.SERVICEBUS_CONNECTION_STRING.match(
    "Endpoint=sb://((.*).servicebus.windows.net)"
  ) || "")[1];

  let credential = new EnvironmentCredential();
  const sbAdminClient = new ServiceBusAdministrationClient(serviceBusEndpoint, credential);
  let sbClient: ServiceBusClient;

  async function verifyOperationOptionsAtGetToken(
    context: ConnectionContext,
    operationOptions: OperationOptionsBase,
    func: Function,
    plugAfterMockingGetToken?: Function
  ) {
    let verifiedOperationOptions = false;
    let actualOptions: OperationOptionsBase = {};
    let getTokenInvocationDone: Function;
    const waitUntilGetTokenIsInvoked = new Promise((resolve) => {
      getTokenInvocationDone = resolve;
    });

    context.tokenCredential.getToken = async (_scopes: string, options: GetTokenOptions) => {
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
      if (plugAfterMockingGetToken) await plugAfterMockingGetToken();

      getTokenInvocationDone();
      return null;
    };

    try {
      await func();
      should.fail("Something went wrong - should not have reached here");
    } catch (err) {
      await waitUntilGetTokenIsInvoked;
      should.equal(
        verifiedOperationOptions,
        true,
        `OperationOptions were not the same as expected,
        Actual   - ${JSON.stringify(actualOptions)}
        Expected - ${JSON.stringify(getOperationOptionsBase(operationOptions))}\n`
      );
    }
  }

  describe("RequestOptions", () => {
    const sampleOperationOptions = {
      requestOptions: {
        timeout: 199
      }
    };

    beforeEach(() => {
      credential = new EnvironmentCredential();
      sbClient = new ServiceBusClient(serviceBusEndpoint, credential);
    });

    afterEach(async () => {
      await sbClient.close();
    });

    describe("Sender", () => {
      it("RequestOptions is plumbed through sendMessages", async () => {
        const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;
        sender["_context"].cbsSession.init = async () => {};

        await verifyOperationOptionsAtGetToken(
          sender["_context"],
          sampleOperationOptions,
          async () => {
            await sender.sendMessages(
              {
                body: "message"
              },
              sampleOperationOptions
            );
          }
        );
      });

      it("RequestOptions is plumbed through sendMessages - overrides the ServiceBusClientOptions", async () => {
        await sbClient.close();
        sbClient = new ServiceBusClient(serviceBusEndpoint, credential, {
          requestOptions: {
            timeout: 198
          }
        });
        const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;
        sender["_context"].cbsSession.init = async () => {};
        await verifyOperationOptionsAtGetToken(
          sender["_context"],
          sampleOperationOptions,
          async () => {
            await sender.sendMessages(
              {
                body: "message"
              },
              sampleOperationOptions
            );
          }
        );
      });

      it("RequestOptions is plumbed through createMessageBatch", async () => {
        const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;
        sender["_context"].cbsSession.init = async () => {};

        await verifyOperationOptionsAtGetToken(
          sender["_context"],
          sampleOperationOptions,
          async () => {
            await sender.createMessageBatch(sampleOperationOptions);
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
          sampleOperationOptions,
          async () => {
            await receiver.receiveMessages(1, sampleOperationOptions);
          }
        );
      });

      it("RequestOptions is plumbed through subscribe", async () => {
        const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
        receiver["_context"].cbsSession.init = async () => {};

        await verifyOperationOptionsAtGetToken(
          receiver["_context"],
          sampleOperationOptions,
          async () => {
            receiver.subscribe(
              {
                processMessage: async () => {},
                processError: async () => {}
              },
              sampleOperationOptions
            );
            await delay(1);
            await receiver.close();
          },
          () => {
            if (receiver["_streamingReceiver"]) {
              receiver["_streamingReceiver"]["_initOnce"] = async () => {};
            }
          }
        );
      });

      it("RequestOptions is plumbed through _createStreamingReceiver", async () => {
        const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
        receiver["_context"].cbsSession.init = async () => {};

        await verifyOperationOptionsAtGetToken(
          receiver["_context"],
          sampleOperationOptions,
          async () => {
            await receiver["_createStreamingReceiver"]({
              ...sampleOperationOptions,
              receiveMode: "peekLock",
              onError: () => {},
              lockRenewer: undefined
            });
            await receiver.close();
          },
          () => {
            if (receiver["_streamingReceiver"]) {
              receiver["_streamingReceiver"]["_initOnce"] = async () => {};
            }
          }
        );
      });

      it("RequestOptions is plumbed through getMessageIterator", async () => {
        const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
        receiver["_context"].cbsSession.init = async () => {};

        await verifyOperationOptionsAtGetToken(
          receiver["_context"],
          sampleOperationOptions,
          async () => {
            for await (const _ of receiver.getMessageIterator(sampleOperationOptions)) {
            }
          }
        );
      });

      // No test for settlement since init doesn't happen, we only settle with an existing receiver
    });

    describe("ManagementClient - Non-session", () => {
      it("RequestOptions is plumbed through scheduleMessages", async () => {
        const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;

        await verifyOperationOptionsAtGetToken(
          sender["_context"],
          sampleOperationOptions,
          async () => {
            await sender.scheduleMessages(
              {
                body: "message"
              },
              new Date(),
              sampleOperationOptions
            );
          }
        );
      });

      it("RequestOptions is plumbed through cancelScheduledMessages", async () => {
        const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;

        await verifyOperationOptionsAtGetToken(
          sender["_context"],
          sampleOperationOptions,
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
        const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;

        await verifyOperationOptionsAtGetToken(
          receiver["_context"],
          sampleOperationOptions,
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
        const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
        receiver["_context"].wasConnectionCloseCalled = false;
        await verifyOperationOptionsAtGetToken(
          receiver["_context"],
          sampleOperationOptions,
          async () => {
            await receiver.completeMessage(
              {
                body: "message",
                lockToken: generate_uuid(),
                _rawAmqpMessage: { body: "message" },
                delivery: { link: undefined }
              } as any,
              sampleOperationOptions
            );
          }
        );
      });

      it("RequestOptions is plumbed through updateDispositionStatus", async () => {
        const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
        const managementClient = receiver["_context"].getManagementClient("queue");
        managementClient["_context"].wasConnectionCloseCalled = false;
        await verifyOperationOptionsAtGetToken(
          managementClient["_context"],
          sampleOperationOptions,
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
        const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;

        await verifyOperationOptionsAtGetToken(
          receiver["_context"],
          sampleOperationOptions,
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
        const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
        receiver.receiveMode = "peekLock";
        await verifyOperationOptionsAtGetToken(
          receiver["_context"],
          sampleOperationOptions,
          async () => {
            await receiver.renewMessageLock(
              {
                body: "message",
                lockToken: generate_uuid(),
                _rawAmqpMessage: { body: "message" },
                delivery: { link: undefined }
              } as any,
              sampleOperationOptions
            );
          }
        );
      });
    });

    describe("SessionReceiver", () => {
      const queueName = `queue-session-${Math.ceil(Math.random() * 1000)}`;

      before(async () => {
        await recreateQueue(queueName, {
          requiresSession: true
        });
        sbClient = new ServiceBusClient(serviceBusEndpoint, new EnvironmentCredential());
        const sender = sbClient.createSender(queueName);
        await sender.sendMessages({
          body: "message",
          sessionId: "session-id"
        });
        await sender.close();
        await sbClient.close();
      });

      after(async () => {
        await sbAdminClient.deleteQueue(queueName);
      });

      beforeEach(() => {
        sbClient = new ServiceBusClient(serviceBusEndpoint, new EnvironmentCredential());
      });

      afterEach(async () => {
        await sbClient.close();
      });

      it("RequestOptions is plumbed through acceptSession", async () => {
        await verifyOperationOptionsAtGetToken(
          sbClient["_connectionContext"],
          sampleOperationOptions,
          async () => {
            await sbClient.acceptSession("queue", "session-id", sampleOperationOptions);
          }
        );
      });

      it("RequestOptions is plumbed through acceptNextSession", async () => {
        await verifyOperationOptionsAtGetToken(
          sbClient["_connectionContext"],
          sampleOperationOptions,
          async () => {
            await sbClient.acceptNextSession("queue", sampleOperationOptions);
          }
        );
      });

      it("RequestOptions is plumbed through renewSessionLock", async () => {
        const receiver = await sbClient.acceptNextSession(queueName);
        await verifyOperationOptionsAtGetToken(
          sbClient["_connectionContext"],
          sampleOperationOptions,
          async () => {
            await receiver.renewSessionLock(sampleOperationOptions);
          }
        );
      });

      it("RequestOptions is plumbed through setSessionState", async () => {
        const receiver = await sbClient.acceptNextSession(queueName);
        await verifyOperationOptionsAtGetToken(
          sbClient["_connectionContext"],
          sampleOperationOptions,
          async () => {
            await receiver.setSessionState("set-state", sampleOperationOptions);
          }
        );
      });

      it("RequestOptions is plumbed through getSessionState", async () => {
        const receiver = await sbClient.acceptNextSession(queueName);
        await verifyOperationOptionsAtGetToken(
          sbClient["_connectionContext"],
          sampleOperationOptions,
          async () => {
            await receiver.getSessionState(sampleOperationOptions);
          }
        );
      });

      it("RequestOptions is plumbed through peekMessages", async () => {
        const receiver = await sbClient.acceptNextSession(queueName);
        await verifyOperationOptionsAtGetToken(
          sbClient["_connectionContext"],
          sampleOperationOptions,
          async () => {
            await receiver.peekMessages(1, sampleOperationOptions);
          }
        );
      });

      it("RequestOptions is plumbed through receive deferred messages", async () => {
        const receiver = await sbClient.acceptNextSession(queueName);
        await verifyOperationOptionsAtGetToken(
          sbClient["_connectionContext"],
          sampleOperationOptions,
          async () => {
            await receiver.receiveDeferredMessages(Long.ZERO, sampleOperationOptions);
          }
        );
      });
      // No similar test for `receiveMessages` or `getMessageIterator` because the init happens only at the acceptSession level
      // No Backup settlement test for sessions because it is not supported
    });

    describe("ServiceBusClient", () => {
      // Tests to make sure each operation gets options from SBClient if defined

      beforeEach(async () => {
        sbClient = new ServiceBusClient(
          serviceBusEndpoint,
          new EnvironmentCredential(),
          sampleOperationOptions
        );
      });

      afterEach(async () => {
        await sbClient.close();
      });

      describe("Sender methods", () => {
        it("RequestOptions is plumbed through sendMessages", async () => {
          const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;
          sender["_context"].cbsSession.init = async () => {};

          await verifyOperationOptionsAtGetToken(
            sender["_context"],
            sampleOperationOptions,
            async () => {
              await sender.sendMessages({
                body: "message"
              });
            }
          );
        });

        it("RequestOptions is plumbed through createMessageBatch", async () => {
          const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;
          sender["_context"].cbsSession.init = async () => {};

          await verifyOperationOptionsAtGetToken(
            sender["_context"],
            sampleOperationOptions,
            async () => {
              await sender.createMessageBatch();
            }
          );
        });
      });

      describe("Receiver Methods", () => {
        it("RequestOptions is plumbed through receiveMessages", async () => {
          const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
          receiver["_context"].cbsSession.init = async () => {};

          await verifyOperationOptionsAtGetToken(
            receiver["_context"],
            sampleOperationOptions,
            async () => {
              await receiver.receiveMessages(1);
            }
          );
        });

        it("RequestOptions is plumbed through getMessageIterator", async () => {
          const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
          receiver["_context"].cbsSession.init = async () => {};

          await verifyOperationOptionsAtGetToken(
            receiver["_context"],
            sampleOperationOptions,
            async () => {
              for await (const _ of receiver.getMessageIterator()) {
              }
            }
          );
        });

        // TODO: subscribe
        // TODO: createStreamingReceiver

        it("onDetached upon a disconnect", async function(): Promise<void> {
          const queueName = `queue-${Math.ceil(Math.random() * 10000)}`;
          await recreateQueue(queueName);
          const sender = sbClient.createSender(queueName);
          await sender.sendMessages(TestMessage.getSample());

          const receiver = sbClient.createReceiver(queueName) as ServiceBusReceiverImpl;

          const connectionContext = receiver["_context"];
          let onDetachedCalled = false;
          let testingDone: Function;
          const testingInProgress = new Promise((resolve) => {
            testingDone = resolve;
          });

          const mockOnDetached = () => {
            if (receiver["_streamingReceiver"]?.onDetached) {
              const onDetached = receiver["_streamingReceiver"].onDetached;
              receiver["_streamingReceiver"].onDetached = async (
                receiverError?: AmqpError | Error | undefined,
                operationOptions?: OperationOptionsBase | undefined
              ) => {
                onDetachedCalled = true;
                return onDetached.call(
                  receiver["_streamingReceiver"],
                  receiverError,
                  operationOptions
                );
              };
            }
          };

          // Start the receiver.
          receiver.subscribe({
            async processMessage(message: ServiceBusReceivedMessage) {
              await receiver.completeMessage(message);
              mockOnDetached();
              // Simulate a disconnect
              connectionContext.connection["_connection"].idle();

              await verifyOperationOptionsAtGetToken(
                connectionContext,
                sampleOperationOptions,
                () => {},
                () => {
                  if (receiver["_streamingReceiver"])
                    receiver["_streamingReceiver"]["_initOnce"] = async () => {};
                }
              );
              testingDone();
            },
            processError: async () => {}
          });
          await testingInProgress;
          should.equal(onDetachedCalled, true, "onDetached was not called");
          await sbAdminClient.deleteQueue(queueName);
        });
      });

      describe("ManagementClient - Non-session", () => {
        it("RequestOptions is plumbed through scheduleMessages", async () => {
          const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;

          await verifyOperationOptionsAtGetToken(
            sender["_context"],
            sampleOperationOptions,
            async () => {
              await sender.scheduleMessages(
                {
                  body: "message"
                },
                new Date()
              );
            }
          );
        });

        it("RequestOptions is plumbed through cancelScheduledMessages", async () => {
          const sender = sbClient.createSender("queue") as ServiceBusSenderImpl;

          await verifyOperationOptionsAtGetToken(
            sender["_context"],
            sampleOperationOptions,
            async () => {
              await sender.cancelScheduledMessages(Long.ZERO);
            }
          );
        });

        it("RequestOptions is plumbed through peek", async () => {
          const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;

          await verifyOperationOptionsAtGetToken(
            receiver["_context"],
            sampleOperationOptions,
            async () => {
              await receiver.peekMessages(1);
            }
          );
        });

        it("RequestOptions is plumbed through backup settlement", async () => {
          const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
          receiver["_context"].wasConnectionCloseCalled = false;
          await verifyOperationOptionsAtGetToken(
            receiver["_context"],
            sampleOperationOptions,
            async () => {
              await receiver.completeMessage({
                body: "message",
                lockToken: generate_uuid(),
                _rawAmqpMessage: { body: "message" },
                delivery: { link: undefined }
              } as any);
            }
          );
        });

        it("RequestOptions is plumbed through receive-deferred-messages", async () => {
          const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;

          await verifyOperationOptionsAtGetToken(
            receiver["_context"],
            sampleOperationOptions,
            async () => {
              await receiver.receiveDeferredMessages(Long.ZERO);
            }
          );
        });

        it("RequestOptions is plumbed through renew message lock", async () => {
          const receiver = sbClient.createReceiver("queue") as ServiceBusReceiverImpl;
          receiver.receiveMode = "peekLock";
          await verifyOperationOptionsAtGetToken(
            receiver["_context"],
            sampleOperationOptions,
            async () => {
              await receiver.renewMessageLock({
                body: "message",
                lockToken: generate_uuid(),
                _rawAmqpMessage: { body: "message" },
                delivery: { link: undefined }
              } as any);
            }
          );
        });
      });

      describe("SessionReceiver methods", () => {
        const queueName = `queue-session-${Math.ceil(Math.random() * 1000)}`;

        before(async () => {
          await recreateQueue(queueName, {
            requiresSession: true
          });
          sbClient = new ServiceBusClient(serviceBusEndpoint, new EnvironmentCredential());
          const sender = sbClient.createSender(queueName);
          await sender.sendMessages({
            body: "message",
            sessionId: "session-id"
          });
          await sender.close();
          await sbClient.close();
        });

        after(async () => {
          await sbAdminClient.deleteQueue(queueName);
        });

        it("RequestOptions is plumbed through acceptSession", async () => {
          await verifyOperationOptionsAtGetToken(
            sbClient["_connectionContext"],
            sampleOperationOptions,
            async () => {
              await sbClient.acceptSession("queue", "session-id");
            }
          );
        });

        it("RequestOptions is plumbed through acceptNextSession", async () => {
          await verifyOperationOptionsAtGetToken(
            sbClient["_connectionContext"],
            sampleOperationOptions,
            async () => {
              await sbClient.acceptNextSession("queue");
            }
          );
        });

        it("RequestOptions is plumbed through renewSessionLock", async () => {
          const receiver = await sbClient.acceptNextSession(queueName);
          await verifyOperationOptionsAtGetToken(
            sbClient["_connectionContext"],
            sampleOperationOptions,
            async () => {
              await receiver.renewSessionLock();
            }
          );
        });

        it("RequestOptions is plumbed through setSessionState", async () => {
          const receiver = await sbClient.acceptNextSession(queueName);
          await verifyOperationOptionsAtGetToken(
            sbClient["_connectionContext"],
            sampleOperationOptions,
            async () => {
              await receiver.setSessionState("set-state");
            }
          );
        });

        it("RequestOptions is plumbed through getSessionState", async () => {
          const receiver = await sbClient.acceptNextSession(queueName);
          await verifyOperationOptionsAtGetToken(
            sbClient["_connectionContext"],
            sampleOperationOptions,
            async () => {
              await receiver.getSessionState();
            }
          );
        });

        it("RequestOptions is plumbed through peekMessages", async () => {
          const receiver = await sbClient.acceptNextSession(queueName);
          await verifyOperationOptionsAtGetToken(
            sbClient["_connectionContext"],
            sampleOperationOptions,
            async () => {
              await receiver.peekMessages(1);
            }
          );
        });

        it("RequestOptions is plumbed through receive deferred messages", async () => {
          const receiver = await sbClient.acceptNextSession(queueName);
          await verifyOperationOptionsAtGetToken(
            sbClient["_connectionContext"],
            sampleOperationOptions,
            async () => {
              await receiver.receiveDeferredMessages(Long.ZERO);
            }
          );
        });
      });
    });
  });

  describe("AbortSignal", () => {
    // TODO: Add tests to make sure abortSignal works at each level
  });

  describe("TracingOptions", () => {
    // TODO: Add tests to make sure the tracing works end-to-end for all the methods
    const queueName = `queue-${Math.ceil(Math.random() * 1000)}`;
    beforeEach(() => {
      sbClient = new ServiceBusClient(serviceBusEndpoint, new EnvironmentCredential());
    });

    afterEach(async () => {
      await sbClient.close();
    });

    before(async () => {
      await recreateQueue(queueName);
    });

    after(async () => {
      await sbAdminClient.deleteQueue(queueName);
    });

    describe("Sender", () => {
      it("TracingOptions is plumbed through sendMessages", async () => {
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
      });
    });

    describe("Receiver", () => {
      it("TracingOptions is plumbed through receiveMessages", async () => {
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
      });
    });
  });
});
