// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { v4 as uuid } from "uuid";
import { env } from "@azure-tools/test-recorder";

// HACK: Intentionally block to:
//  * avoid 'duplicate sequence number' error from service (calling commands too fast?)
export function sleep(ms: number): Promise<any> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const timeoutMs: number = 15000;

export const getTestRunId = (staticId: string): string => {
  return ["record", "playback", "undefined"].includes(env.TEST_MODE!) ? staticId : uuid();
};
