// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { AbortSignalLike } from "@azure/abort-controller";
import { AbortError } from "@azure/abort-controller";
import type { TestRunOutput } from "../outputModels";

const REJECTED_ERR = new AbortError("The polling was aborted.");

export function sleep(ms: number, signal: AbortSignalLike): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(REJECTED_ERR);
      return;
    }

    const id = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);

      if (signal.aborted) {
        reject(REJECTED_ERR);
        return;
      }

      resolve();
    }, ms);

    signal.addEventListener("abort", onAbort, { once: true });

    function onAbort(): void {
      clearTimeout(id);
      reject(REJECTED_ERR);
    }
  });
}

export function isTestRunInProgress(testRunOutput: TestRunOutput): boolean {
  switch (testRunOutput.status) {
    case "ACCEPTED":
    case "NOTSTARTED":
    case "PROVISIONING":
    case "PROVISIONED":
    case "CONFIGURING":
    case "CONFIGURED":
    case "EXECUTING":
    case "EXECUTED":
    case "DEPROVISIONING":
    case "DEPROVISIONED":
    case "CANCELLING":
      return true;
    default:
      return false;
  }
}
