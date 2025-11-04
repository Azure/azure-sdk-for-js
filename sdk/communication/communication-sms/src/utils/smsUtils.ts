// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SendMessageRequest, OptOutRequest } from "../generated/src/models/index.js";
import type { SmsSendOptions, SmsSendRequest } from "../smsClient.js";
import { Uuid } from "./uuid.js";
import type { SmsSendOptions as InternalOptions } from "../generated/src/models/index.js";

export function generateSendMessageRequest(
  smsRequest: SmsSendRequest,
  options: SmsSendOptions = {},
): SendMessageRequest {
  const _smsSendOptions: InternalOptions = {
    enableDeliveryReport: options.enableDeliveryReport ?? false,
  };
  if (options.tag) {
    _smsSendOptions["tag"] = options.tag;
  }

  return {
    from: smsRequest.from,
    smsRecipients: smsRequest.to.map((phoneNumberStr) => {
      return {
        to: phoneNumberStr,
        repeatabilityFirstSent: new Date(Date.now()).toUTCString(),
        repeatabilityRequestId: Uuid.generateUuid(),
      };
    }),
    message: smsRequest.message,
    smsSendOptions: {
      enableDeliveryReport: options.enableDeliveryReport ?? false,
      ...(options.tag && { tag: options.tag }),
      ...(options.deliveryReportTimeoutInSeconds && {
        deliveryReportTimeoutInSeconds: options.deliveryReportTimeoutInSeconds,
      }),
      ...(options.messagingConnect && {
        messagingConnect: options.messagingConnect,
      }),
    },
  };
}

export function generateOptOutRequest(from: string, to: string[]): OptOutRequest {
  return {
    from: from,
    recipients: to.map((phoneNumberStr) => {
      return {
        to: phoneNumberStr,
      };
    }),
  };
}
