// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { hmac } from "./hmac";
import { HTTPMethod, ResourceType, Constants } from "../common";

export async function generateHeaders(
  masterKey: string,
  method: HTTPMethod,
  resourceType: ResourceType = ResourceType.none,
  resourceId: string = "",
  date = new Date()
): Promise<{
  [x: string]: string;
}> {
  if (masterKey.startsWith("type=sas&")) {
    return {
      [Constants.HttpHeaders.Authorization]: encodeURIComponent(masterKey),
      [Constants.HttpHeaders.XDate]: date.toUTCString(),
    };
  }
  const sig = await signature(masterKey, method, resourceType, resourceId, date);

  return {
    [Constants.HttpHeaders.Authorization]: sig,
    [Constants.HttpHeaders.XDate]: date.toUTCString(),
  };
}

function getEffectiveResourceIdForSignature(resourceId: string) {
  if (resourceId.endsWith("%20")) {
    let i = resourceId.length;
    while (resourceId.substring(i - 3, i) === "%20") {
      i -= 3;
    }

    return resourceId.substring(0, i) + " ".repeat((resourceId.length - i) / 3);
  }

  return resourceId;
}

async function signature(
  masterKey: string,
  method: HTTPMethod,
  resourceType: ResourceType,
  resourceId: string = "",
  date = new Date()
): Promise<string> {
  const type = "master";
  const version = "1.0";

  const text =
    method.toLowerCase() +
    "\n" +
    resourceType.toLowerCase() +
    "\n" +
    getEffectiveResourceIdForSignature(resourceId) +
    "\n" +
    date.toUTCString().toLowerCase() +
    "\n" +
    "" +
    "\n";

  const signed = await hmac(masterKey, text);

  return encodeURIComponent("type=" + type + "&ver=" + version + "&sig=" + signed);
}
