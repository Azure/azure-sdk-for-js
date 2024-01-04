// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MmsSendMessageRequest } from "../generated/src/models";
import { MmsSendOptions, MmsSendRequest } from "../mmsClient";
import { Uuid } from "./uuid";
import { SmsSendOptions as InternalOptions } from "../generated/src/models";

export function generateMmsSendMessageRequest(
  mmsRequest: MmsSendRequest,
  options: MmsSendOptions = {}
): MmsSendMessageRequest {
  const _smsSendOptions: InternalOptions = {
    enableDeliveryReport: options.enableDeliveryReport ?? false,
  };
  if (options.tag) {
    _smsSendOptions["tag"] = options.tag;
  }

  return {
    from: mmsRequest.from,
    recipients: mmsRequest.to.map((phoneNumberStr) => {
      return {
        to: phoneNumberStr,
        repeatabilityFirstSent: new Date(Date.now()).toUTCString(),
        repeatabilityRequestId: Uuid.generateUuid(),
      };
    }),
    attachments: mmsRequest.attachments,
    message: mmsRequest.message,
    sendOptions: {
      enableDeliveryReport: options.enableDeliveryReport ?? false,
      ...(options.tag && { tag: options.tag }),
    },
  };
}
