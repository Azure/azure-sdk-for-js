// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as http from "node:http";
import * as https from "node:https";
import { BaseHttpTest } from "./baseHttpTest.js";

export class HttpRequestTest extends BaseHttpTest {
  static httpAgent = new http.Agent({ keepAlive: true });
  static httpsAgent = new https.Agent({ keepAlive: true });

  agent!: http.Agent;
  requestOptions!: http.RequestOptions;
  isInsecure!: boolean;

  async globalSetup(): Promise<void> {
    await super.globalSetup();
    this.isInsecure = new URL(this.url).protocol !== "https:";
    this.agent = this.isInsecure ? HttpRequestTest.httpAgent : HttpRequestTest.httpsAgent;
    this.requestOptions = {
      agent: this.agent,
    };
  }

  async run(): Promise<void> {
    const res = await new Promise<http.IncomingMessage>((resolve, reject) => {
      const req = this.isInsecure
        ? http.request(this.url, this.requestOptions, resolve)
        : https.request(this.url, this.requestOptions, resolve);
      req.once("error", (err: Error) => reject(err));
      req.end();
    });

    await this.streamToText(res);
  }

  streamToText(stream: NodeJS.ReadableStream): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const buffer: Buffer[] = [];

      stream.on("data", (chunk) => {
        if (Buffer.isBuffer(chunk)) {
          buffer.push(chunk);
        } else {
          buffer.push(Buffer.from(chunk));
        }
      });
      stream.on("end", () => {
        resolve(Buffer.concat(buffer).toString("utf8"));
      });
      stream.on("error", (e) => {
        reject(e);
      });
    });
  }
}
