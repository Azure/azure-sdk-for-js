// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "@azure/core-rest-pipeline";
export const apiVersionPolicyName = "CustomizedTestPolicy";

/**
 * The test recorder will change underlying url so we need to revert change when send new calls
 * @returns customized policy in testing
 */
export function customizedTestPolicy(): PipelinePolicy {
  return {
    name: apiVersionPolicyName,
    sendRequest: (req, next) => {
      const isLocalUrlReg: RegExp = /http:\/\/localhost:([0-9.\-A-Za-z]+)\//;
      if (isLocalUrlReg.test(req.url)) {
        req.url = req.url.replace(isLocalUrlReg, "https://management.azure.com/");
      }
      return next(req);
    },
  };
}
