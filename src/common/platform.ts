import userAgent from "universal-user-agent";
import { Constants } from "./constants";

/** @hidden */

export function getPlatformDefaultHeaders(): { [key: string]: string } {
  const defaultHeaders: { [key: string]: string } = {};
  defaultHeaders[Constants.HttpHeaders.UserAgent] = getUserAgent();
  return defaultHeaders;
}

export function getUserAgent() {
  return `${userAgent()} ${Constants.SDKName}/${Constants.SDKVersion}`;
}
