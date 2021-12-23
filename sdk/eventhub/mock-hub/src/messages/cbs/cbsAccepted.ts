// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Message, types } from "rhea";

export interface CreateCbsAcceptedOptions {
  correlationId?: string;
  toLinkName?: string;
}

export function createCbsAccepted(options: CreateCbsAcceptedOptions = {}): Message {
  const amqpMessage: Message = {
    body: undefined,
    application_properties: {
      "status-code": types.wrap_int(202),
      "status-description": "Accepted",
    },
  };

  if (options.toLinkName) {
    amqpMessage.to = options.toLinkName;
  }
  if (options.correlationId) {
    amqpMessage.correlation_id = options.correlationId;
  }

  return amqpMessage;
}
