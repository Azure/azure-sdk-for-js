// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { ServiceBusMessageBatchImpl } from "../../src/serviceBusMessageBatch";
import { ClientEntityContext } from "../../src/clientEntityContext";
import { ServiceBusMessage } from "../../src";
import { isServiceBusMessageBatch } from "../../src/sender";
const assert = chai.assert;

describe("sender unit tests", () => {
  it("isServiceBusMessageBatch", () => {
    assert.isTrue(
      isServiceBusMessageBatch(new ServiceBusMessageBatchImpl({} as ClientEntityContext, 100))
    );

    assert.isFalse(isServiceBusMessageBatch(undefined));
    assert.isFalse(isServiceBusMessageBatch((4 as any) as ServiceBusMessage));
    assert.isFalse(isServiceBusMessageBatch(({} as any) as ServiceBusMessage));
  });
});
