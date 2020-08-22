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
) {
  const sig = await signature(masterKey, method, resourceType, resourceId, date);

  return {
    [Constants.HttpHeaders.Authorization]: sig,
    [Constants.HttpHeaders.XDate]: date.toUTCString()
  };
}

async function signature(
  masterKey: string,
  method: HTTPMethod,
  resourceType: ResourceType,
  resourceId: string = "",
  date = new Date()
) {
  const type = "master";
  const version = "1.0";
  const text =
    method.toLowerCase() +
    "\n" +
    resourceType.toLowerCase() +
    "\n" +
    resourceId +
    "\n" +
    date.toUTCString().toLowerCase() +
    "\n" +
    "" +
    "\n";

  const signed = await hmac(masterKey, text);

  return encodeURIComponent("type=" + type + "&ver=" + version + "&sig=" + signed);
}
