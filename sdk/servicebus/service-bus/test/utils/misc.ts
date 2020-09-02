// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defaultLock } from "@azure/core-amqp";
import { Delivery, ReceivedMessage } from "../../src";
import { LinkEntity } from "../../src/core/linkEntity";
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

export function isLinkLocked(linkEntity: LinkEntity<any>): boolean {
  return defaultLock.isBusy(linkEntity["_openLock"]);
}
