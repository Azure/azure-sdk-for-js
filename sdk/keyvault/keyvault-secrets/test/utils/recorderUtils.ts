import { env } from "@azure/test-utils-recorder";
import { retry as realRetry } from "./retry";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import * as path from "path";

if (isNode) {
  dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
}

export const isRecording = env.TEST_MODE === "record";
export const isPlayingBack = env.TEST_MODE === "playback";

export async function retry<T>(
  target: () => Promise<T>,
  delay?: number,
  timeout?: number,
  increaseFactor?: number
): Promise<T> {
  return realRetry(target, isPlayingBack ? 0 : delay || 10000, timeout || Infinity, increaseFactor);
}

export function uniqueString(): string {
  return isPlayingBack
    ? ""
    : Math.random()
        .toString()
        .slice(2);
}

export const testPollerProperties = {
  intervalInMs: isPlayingBack ? 0 : undefined
};
