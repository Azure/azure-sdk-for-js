import { retry as realRetry } from "./retry";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import * as path from "path";
import { isPlaybackMode } from "@azure/test-utils-recorder";

if (isNode) {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

export async function retry<T>(
  target: () => Promise<T>,
  delay?: number,
  timeout?: number,
  increaseFactor?: number
): Promise<T> {
  return realRetry(
    target,
    isPlaybackMode() ? 0 : delay || 10000,
    timeout || Infinity,
    increaseFactor
  );
}

export function uniqueString(): string {
  return isPlaybackMode()
    ? ""
    : Math.random()
        .toString()
        .slice(2);
}

export const testPollerProperties = {
  intervalInMs: isPlaybackMode() ? 0 : undefined
};
