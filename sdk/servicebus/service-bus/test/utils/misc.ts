// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReceivedMessage, Delivery } from "../../src";
import { ServiceBusMessageImpl } from "../../src/serviceBusMessage";

// some functions useful as we transition between interfaces and classes.

export function getDeliveryProperty(message: ReceivedMessage): Delivery {
  if (
    message &&
    (message as ServiceBusMessageImpl).delivery &&
    typeof (message as ServiceBusMessageImpl).delivery === "object"
  ) {
    return (message as ServiceBusMessageImpl).delivery;
  }

  throw new Error(
    "Received message does not contain a .delivery member - not a ServiceBusMessageImpl instance."
  );
}
