import { HttpPipelineLogLevel, IHttpPipelineLogger } from "../../src/Pipeline";
import { padStart } from "../../src/utils/utils.common";
import { BlobMetadata } from '../../src/generated/src/models';

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getUniqueName(prefix: string): string {
  return `${prefix}${new Date().getTime()}${padStart(
    Math.floor(Math.random() * 10000).toString(),
    5,
    "00000"
  )}`;
}

export function base64encode(content: string): string {
  return isBrowser() ? btoa(content) : Buffer.from(content).toString("base64");
}

export function base64decode(encodedString: string): string {
  return isBrowser() ? atob(encodedString) : Buffer.from(encodedString, "base64").toString();
}

export class ConsoleHttpPipelineLogger implements IHttpPipelineLogger {
  constructor(public minimumLogLevel: HttpPipelineLogLevel) {}
  public log(logLevel: HttpPipelineLogLevel, message: string): void {
    const logMessage = `${new Date().toISOString()} ${HttpPipelineLogLevel[logLevel]}: ${message}`;
    switch (logLevel) {
      case HttpPipelineLogLevel.ERROR:
        // tslint:disable-next-line:no-console
        console.error(logMessage);
        break;
      case HttpPipelineLogLevel.WARNING:
        // tslint:disable-next-line:no-console
        console.warn(logMessage);
        break;
      case HttpPipelineLogLevel.INFO:
        // tslint:disable-next-line:no-console
        console.log(logMessage);
        break;
    }
  }
}

/**
 * Validate if m1 is super set of m2.
 * 
 * @param m1 BlobMetadata
 * @param m2 BlobMetadata
 */
export function isSuperSet(m1: BlobMetadata, m2: BlobMetadata): boolean {
  if (!m1 || !m2) {
    throw new RangeError("m1 or m2 is invalid");
  }

  for (let p in m2) {
    if (m1[p] !== m2[p]) {
      return false;
    }
  }
  
  return true;
}
