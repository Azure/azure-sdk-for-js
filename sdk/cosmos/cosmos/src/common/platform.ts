import * as os from "os";
import { Constants } from "./constants";

/** @hidden */

export function getPlatformDefaultHeaders(): { [key: string]: string } {
  const defaultHeaders: { [key: string]: string } = {};
  defaultHeaders[Constants.HttpHeaders.UserAgent] = getUserAgent();
  return defaultHeaders;
}

export function getDecodedDataLength(encodedData: string): number {
  const buffer = Buffer.from(encodedData, "base64");
  return buffer.length;
}

export function getUserAgent() {
  // gets the user agent in the following format
  // "{OSName}/{OSVersion} Nodejs/{NodejsVersion} documentdb-nodejs-sdk/{SDKVersion}"
  // for example:
  // "linux/3.4.0+ Nodejs/v0.10.25 documentdb-nodejs-sdk/1.10.0"
  // "win32/10.0.14393 Nodejs/v4.4.7 documentdb-nodejs-sdk/1.10.0"
  const osName = getSafeUserAgentSegmentInfo(os.platform());
  const osVersion = getSafeUserAgentSegmentInfo(os.release());
  const nodejsVersion = getSafeUserAgentSegmentInfo(process.version);

  const userAgent = `${osName}/${osVersion} Nodejs/${nodejsVersion} ${Constants.SDKName}/${Constants.SDKVersion}`;
  return userAgent;
}

export function getSafeUserAgentSegmentInfo(s: string) {
  // catch null, undefined, etc
  if (typeof s !== "string") {
    s = "unknown";
  }
  // remove all white spaces
  s = s.replace(/\s+/g, "");
  if (!s) {
    s = "unknown";
  }
  return s;
}
