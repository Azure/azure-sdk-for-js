// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementClient } from "../../../src/core/managementClient.js";
import { translateServiceBusError } from "../../../src/serviceBusError.js";
import { createConnectionContextForTests } from "./unittestUtils.js";
import Long from "long";
import { message as RheaMessageUtil } from "rhea-promise";
import { describe, it } from "vitest";
import { assert } from "../../public/utils/chai.js";
import { toRheaMessage } from "../../../src/serviceBusMessage.js";
import { defaultDataTransformer } from "../../../src/dataTransformer.js";

describe("ManagementClient peek", () => {
  it("returns an empty list (does not throw) on a MessageNotFound rejection", async () => {
    // A message-not-found rejection means there is nothing to peek. The management
    // path translates the broker rejection via translateServiceBusError, producing a
    // ServiceBusError with code "MessageNotFound" and no statusCode -- the exact shape
    // production throws. peek must swallow it and return [], matching .NET. The error
    // is built through translateServiceBusError so this fails against a guard that
    // compares the un-normalized "MessageNotFoundError".
    const connectionContext = createConnectionContextForTests();
    const mgmtClient = new ManagementClient(connectionContext, "entityPath");
    (mgmtClient as any).initWithUniqueReplyTo = async (options: any) => options ?? {};
    (mgmtClient as any)._makeManagementRequest = async (): Promise<never> => {
      throw translateServiceBusError({
        condition: "com.microsoft:message-not-found",
        description: "The requested message was not found.",
      } as any);
    };

    const messages = await mgmtClient.peekBySequenceNumber(Long.fromNumber(1), 1);
    assert.deepEqual(messages, []);
  });

  it("re-throws a non-not-found rejection (does not swallow unrelated errors)", async () => {
    // The other side of the guard: any error that is NOT message-not-found must
    // propagate. A server-busy rejection normalizes to code "ServiceBusy", so peek
    // must re-throw it rather than return an empty list.
    const connectionContext = createConnectionContextForTests();
    const mgmtClient = new ManagementClient(connectionContext, "entityPath");
    (mgmtClient as any).initWithUniqueReplyTo = async (options: any) => options ?? {};
    (mgmtClient as any)._makeManagementRequest = async (): Promise<never> => {
      throw translateServiceBusError({
        condition: "com.microsoft:server-busy",
        description: "The service is busy.",
      } as any);
    };

    let threw = false;
    try {
      await mgmtClient.peekBySequenceNumber(Long.fromNumber(1), 1);
    } catch (e: any) {
      threw = true;
      assert.equal(e.code, "ServiceBusy");
    }
    assert.isTrue(threw, "peek must re-throw a non-message-not-found error");
  });

  it("preserves AMQP application property types when decoding peeked messages", async () => {
    const connectionContext = createConnectionContextForTests();
    const mgmtClient = new ManagementClient(connectionContext, "entityPath");
    (mgmtClient as any).initWithUniqueReplyTo = async (options: any) => options ?? {};
    const encodedMessage = RheaMessageUtil.encode(
      toRheaMessage(
        {
          body: "body",
          applicationProperties: {
            priority: { type: "ubyte", value: 200 },
          },
        },
        defaultDataTransformer,
      ),
    );
    (mgmtClient as any)._makeManagementRequest = async () => ({
      application_properties: { statusCode: 200 },
      body: { messages: [{ message: encodedMessage }] },
    });

    const [message] = await mgmtClient.peekBySequenceNumber(Long.fromNumber(1), 1);

    assert.deepEqual(message.applicationPropertiesWithAmqpTypes?.priority, {
      type: "ubyte",
      value: 200,
    });
  });
});
