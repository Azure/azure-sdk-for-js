// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { computeSha256Hash, computeSha256Hmac } from "../../../src/index";

export interface HashMessage {
  type: "hash";
  algorithm: "sha256";
  encoding: "base64" | "hex";
  content: string;
}

export interface HmacMessage {
  type: "hmac";
  algorithm: "sha256";
  encoding: "base64" | "hex";
  key: string;
  stringToSign: string;
}

onmessage = async (event: MessageEvent<HashMessage | HmacMessage>) => {
  let result: string | undefined;
  switch (event.data.type) {
    case "hash":
      result = await handleHashMessage(event.data);
      break;
    case "hmac":
      result = await handleHmacMessage(event.data);
      break;
  }

  // https://github.com/microsoft/TypeScript/issues/20595
  (self as unknown as Worker).postMessage(result);
};

function handleHashMessage(message: HashMessage): Promise<string> {
  if (message.algorithm === "sha256") {
    return computeSha256Hash(message.content, message.encoding);
  }
  return Promise.resolve("");
}

function handleHmacMessage(message: HmacMessage): Promise<string> {
  if (message.algorithm === "sha256") {
    return computeSha256Hmac(message.key, message.stringToSign, message.encoding);
  }
  return Promise.resolve("");
}
