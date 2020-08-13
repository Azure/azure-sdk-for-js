import * as zlib from "zlib";
import { Logger } from "@opentelemetry/api";
import { ConsoleLogger, LogLevel } from "@opentelemetry/core";
import { Sender, SenderCallback } from "../../types";
import { Envelope } from "../../Declarations/Contracts";
import { DEFAULT_SENDER_OPTIONS, NodejsPlatformConfig } from "../types";
import { promisify } from "util";
import * as coreHttp from "@azure/core-http";

export class HttpSender implements Sender {
  private readonly _logger: Logger;

  private readonly _httpClient: coreHttp.HttpClient;

  constructor(private _options: NodejsPlatformConfig = DEFAULT_SENDER_OPTIONS) {
    this._logger = _options.logger || new ConsoleLogger(LogLevel.ERROR);
    this._httpClient = new coreHttp.DefaultHttpClient();
  }

  async send(envelopes: Envelope[], callback: SenderCallback = () => {}): Promise<void> {
    const endpointUrl = `${this._options.endpointUrl}/v2/track`;
    const payload = Buffer.from(JSON.stringify(envelopes));

    // todo: investigate specifying an agent here: https://nodejs.org/api/http.html#http_class_http_agent
    const headers = new coreHttp.HttpHeaders({ "Content-Type": "application/x-json-stream" });

    const gzipAsync = promisify<zlib.InputType, Buffer>(zlib.gzip);
    let dataToSend: Buffer;
    try {
      dataToSend = await gzipAsync(payload);
      headers.set("Content-Encoding", "gzip");
    } catch (err) {
      this._logger.warn(`Failed to gzip payload: ${err.message}. Sending payload uncompressed`);
      dataToSend = payload; // something went wrong so send without gzip
    }
    headers.set("Content-Length", dataToSend.length);

    const options = new coreHttp.WebResource(
      endpointUrl,
      "POST",
      dataToSend,
      undefined,
      headers,
      undefined,
      false // withCredentials: false
    );
    try {
      const res = await this._httpClient.sendRequest(options);
      callback(null, res.status, res.bodyAsText || "");
    } catch (err) {
      callback(err);
    }
  }

  shutdown(): void {
    this._logger.info("HttpSender shutting down");
  }
}
