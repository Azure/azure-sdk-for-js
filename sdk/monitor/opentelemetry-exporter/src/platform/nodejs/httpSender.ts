import * as http from "http";
import * as zlib from "zlib";
import { Logger } from "@opentelemetry/api";
import { ConsoleLogger, LogLevel } from "@opentelemetry/core";
import { Sender, SenderCallback } from "../../types";
import { Envelope } from "../../Declarations/Contracts";
import { DEFAULT_SENDER_OPTIONS, NodejsPlatformConfig } from "../types";
import { makeRequest } from "./utils/httpUtils";

export class HttpSender implements Sender {
  private readonly _logger: Logger;

  constructor(private _options: NodejsPlatformConfig = DEFAULT_SENDER_OPTIONS) {
    this._logger = _options.logger || new ConsoleLogger(LogLevel.ERROR);
  }

  send(envelopes: Envelope[], callback: SenderCallback = () => {}): void {
    const endpointUrl = `${this._options.endpointUrl}/v2/track`;
    const payload = Buffer.from(JSON.stringify(envelopes));

    // todo: investigate specifying an agent here: https://nodejs.org/api/http.html#http_class_http_agent
    const options = {
      method: "POST",
      withCredentials: false,
      headers: <{ [key: string]: string }>{
        "Content-Type": "application/x-json-stream",
      },
    };

    zlib.gzip(payload, (err, buffer) => {
      let dataToSend = buffer;
      if (err) {
        this._logger.warn(`Failed to gzip payload: ${err.message}. Sending payload uncompressed`);
        dataToSend = payload; // something went wrong so send without gzip
        options.headers["Content-Length"] = payload.length.toString();
      } else {
        options.headers["Content-Encoding"] = "gzip";
        options.headers["Content-Length"] = String(buffer.length);
      }

      this._logger.debug(`HTTPS Options:`, options);

      const requestCallback = (res: http.IncomingMessage) => {
        res.setEncoding("utf-8");

        // returns empty if the data is accepted
        let responseString = "";
        res.on("data", (data: string) => {
          responseString += data;
        });

        res.on("end", () => {
          this._logger.info(`Azure HTTP response: ${responseString}`);
          callback(null, res.statusCode, responseString);
        });
      };

      const req = makeRequest(this._options, endpointUrl, options, requestCallback);

      req.on("error", callback);

      req.write(dataToSend);
      req.end();
    });
  }

  shutdown(): void {
    this._logger.info("HttpSender shutting down");
  }
}
