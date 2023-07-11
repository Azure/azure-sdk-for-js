// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
type UriSanitizers = Required<RecorderStartOptions>["sanitizerOptions"]["uriSanitizers"];

export function getUniqueName(prefix: string): string {
  return `${prefix}${new Date().getTime()}${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(5, "00000")}`;
}

export function getRecorderUniqueVariable(recorder: Recorder, name: string): string {
  return recorder.variable(name, getUniqueName(name));
}

function getUriSanitizerForQueryParam(paramName: string) {
  return {
    regex: true,
    target: `http.+\\?([^&=]+=[^&=]+&)*(?<param>${paramName}=[^&=]+&?)`,
    groupForReplace: "param",
    value: "",
  };
}

const sasParams = ["se", "sig", "sip", "sp", "spr", "srt", "ss", "sr", "st", "sv"];
export const uriSanitizers: UriSanitizers = sasParams.map(getUriSanitizerForQueryParam);
uriSanitizers.push({
  regex: true,
  target: `https\:\/\/(?<account>.*?).blob.core.windows.net`,
  groupForReplace: "account",
  value: "dummystorageaccount",
});
