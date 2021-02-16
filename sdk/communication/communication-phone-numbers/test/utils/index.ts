// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PhoneNumberCapabilitiesRequest, PhoneNumberCapabilityValue } from "../../src";

export const buildCapabilityUpdate = (
  capabilities: PhoneNumberCapabilitiesRequest
): PhoneNumberCapabilitiesRequest => {
  const values: PhoneNumberCapabilityValue[] = ["none", "inbound", "outbound", "inbound+outbound"];

  return {
    sms: shuffle(values).find((val) => val != capabilities.sms),
    calling: shuffle(values).find((val) => val != capabilities.calling)
  };
};

// Fisher-Yates Shuffle algo implementation
const shuffle = <T>(list: T[]): T[] => {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }

  return list;
};
