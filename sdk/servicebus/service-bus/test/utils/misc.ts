// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReceivedMessage, Delivery, ServiceBusMessage } from "../../src";

// some functions useful as we transition between interfaces and classes.

export function getDeliveryProperty(message: ReceivedMessage): Delivery {
  if (
    message &&
    (message as ServiceBusMessage).delivery &&
    typeof (message as ServiceBusMessage).delivery === "object"
  ) {
    return (message as ServiceBusMessage).delivery;
  }

  throw new Error(
    "Received message does not contain a .delivery member - not a ServiceBusMessage instance."
  );
}
