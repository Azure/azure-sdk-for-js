import { getUserAgent as userAgent } from "universal-user-agent";
import { Constants } from "./constants";

/**
 * @ignore
 */
export function getUserAgent(suffix?: string) {
  let ua = `${userAgent()} ${Constants.SDKName}/${Constants.SDKVersion}`;
  if (suffix) {
    return ua + " " + suffix;
  }
  return ua;
}
