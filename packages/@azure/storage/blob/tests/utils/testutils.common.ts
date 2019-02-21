import { HttpPipelineLogLevel, IHttpPipelineLogger } from "../../lib/Pipeline";
import { padStart } from "../../lib/utils/utils.common";

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

export async function sleep(time: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, time);
  });
}

export function base64encode(content: string): string {
  return isBrowser() ? btoa(content) : Buffer.from(content).toString("base64");
}

export function base64decode(encodedString: string): string {
  return isBrowser()
    ? atob(encodedString)
    : Buffer.from(encodedString, "base64").toString();
}

export class ConsoleHttpPipelineLogger implements IHttpPipelineLogger {
  constructor(public minimumLogLevel: HttpPipelineLogLevel) {}
  public log(logLevel: HttpPipelineLogLevel, message: string): void {
    const logMessage = `${new Date().toISOString()} ${
      HttpPipelineLogLevel[logLevel]
    }: ${message}`;
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

export async function wait(time: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, time);
  });
}
