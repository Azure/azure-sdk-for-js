// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createClientLogger } from "@azure/logger";
import type { Delivery, ServiceBusReceivedMessage } from "@azure/service-bus";
import type { ServiceBusMessageImpl } from "$internal/serviceBusMessage.js";

export function getDeliveryProperty(message: ServiceBusReceivedMessage): Delivery {
  if (
    message &&
    (message as ServiceBusMessageImpl).delivery &&
    typeof (message as ServiceBusMessageImpl).delivery === "object"
  ) {
    return (message as ServiceBusMessageImpl).delivery;
  }

  throw new Error(
    "Received message does not contain a .delivery member - not a ServiceBusMessageImpl instance.",
  );
}

export const testLogger = createClientLogger("test");
