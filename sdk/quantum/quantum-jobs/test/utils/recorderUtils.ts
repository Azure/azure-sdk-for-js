// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, RecorderStartOptions, SanitizerOptions, assertEnvironmentVariable } from "@azure-tools/test-recorder";
type UriSanitizers = Required<RecorderStartOptions>["sanitizerOptions"]["uriSanitizers"];
type BodyKeySanitizers = Required<RecorderStartOptions>["sanitizerOptions"]["bodyKeySanitizers"];

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

export function getSanitizers(): SanitizerOptions {
  const sasParams = ["se", "sig", "sip", "sp", "spr", "srt", "ss", "sr", "st", "sv"];
  const regexSanitizers : UriSanitizers = sasParams.map(getUriSanitizerForQueryParam);
  regexSanitizers.push({
    regex: true,
    target: `https://(?<account>.*?).blob.core.windows.net`,
    groupForReplace: "account",
    value: "dummystorageaccount",
  });
  regexSanitizers.push({
    target: assertEnvironmentVariable("SUBSCRIPTION_ID"),
    value: "00000000-0000-0000-0000-000000000000",
  });
  regexSanitizers.push({
    target: assertEnvironmentVariable("AZURE_RESOURCE_GROUP"),
    value: "myresourcegroup",
  });
  regexSanitizers.push({
    target: assertEnvironmentVariable("AZURE_QUANTUM_WORKSPACE_NAME"),
    value: "myworkspace",
  });
  regexSanitizers.push({
    target: assertEnvironmentVariable("AZURE_QUANTUM_WORKSPACE_LOCATION"),
    value: "eastus",
  });

  const bodyKeySanitizers : BodyKeySanitizers = [
    {
      regex: "(?:\\?(sv|sig|se|srt|ss|sp)=)(?<secret>.*)",
      value: "Sanitized",
      groupForReplace: "secret",
      jsonPath: "$"
    },
    {
      value: "Sanitized",
      jsonPath: "$..sasUri"
    },
    {
      value: "Sanitized",
      jsonPath: "$..containerUri"
    },
    {
      value: "Sanitized",
      jsonPath: "$..inputDataUri"
    },
    {
      value: "Sanitized",
      jsonPath: "$..outputDataUri"
    },
  ];

  return {
    uriSanitizers: regexSanitizers,
    bodyKeySanitizers: bodyKeySanitizers,
  };
}
