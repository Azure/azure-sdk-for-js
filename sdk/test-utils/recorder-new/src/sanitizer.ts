import { HttpClient } from "@azure/core-rest-pipeline";
import { createPipelineRequest, HttpMethods } from "@azure/core-rest-pipeline";
import { getRealAndFakePairs } from "./utils/connectionStringHelpers";
import { paths } from "./utils/paths";
import {
  ProxyToolSanitizers,
  RecorderError,
  sanitizerKeywordMapping,
  SanitizerOptions
} from "./utils/utils";

/**
 * Sanitizer class to handle communication with the proxy-tool relating to the sanitizers adding/resetting, etc.
 */
export class Sanitizer {
  constructor(private mode: string, private url: string, private httpClient: HttpClient) {}
  private recordingId: string | undefined;

  setRecordingId(recordingId: string) {
    this.recordingId = recordingId;
  }

  /**
   * Returns the html document of all the available transforms in the proxy-tool
   *
   * @returns
   */
  async transformsInfo(): Promise<string | null | undefined> {
    if (this.recordingId) {
      const infoUri = `${this.url}${paths.info}${paths.available}`;
      const req = this._createRecordingRequest(infoUri, "GET");
      if (!this.httpClient) {
        throw new RecorderError(
          `Something went wrong, TestProxyHttpClient.httpClient should not have been undefined in ${this.mode} mode.`
        );
      }
      const rsp = await this.httpClient.sendRequest({
        ...req,
        allowInsecureConnection: true
      });
      if (rsp.status !== 200) {
        throw new RecorderError("Info request failed.");
      }
      return rsp.bodyAsText;
    } else {
      throw new RecorderError(
        "Bad state, recordingId is not defined when called transformsInfo()."
      );
    }
  }

  /**
   * addSanitizers adds sanitizers to the current recording. Sanitizers will be applied before recordings are saved.
   *
   * Takes SanitizerOptions as the input, passes on to the proxy-tool.
   */
  async addSanitizers(options: SanitizerOptions): Promise<void> {
    if (options.connectionStringSanitizers) {
      await Promise.all(
        options.connectionStringSanitizers.map((replacer) =>
          this.addConnectionStringSanitizer(replacer.actualConnString, replacer.fakeConnString)
        )
      );
    }

    await Promise.all(
      ([
        // The following sanitizers have similar request bodies and this abstraction avoids duplication
        "generalRegexSanitizers",
        "bodyKeySanitizers",
        "bodyRegexSanitizers",
        "headerRegexSanitizers",
        "uriRegexSanitizers"
      ] as const).map((prop) => {
        const replacers = options[prop];
        if (replacers) {
          return Promise.all(
            replacers.map((replacer: unknown) =>
              this.addSanitizer({
                sanitizer: sanitizerKeywordMapping[prop],
                body: JSON.stringify(replacer)
              })
            )
          );
        } else return;
      })
    );

    await Promise.all(
      ([
        // The following sanitizers have similar request bodies and this abstraction avoids duplication
        "resetSanitizer",
        "oAuthResponseSanitizer"
      ] as const).map((prop) => {
        // TODO: Test
        if (options[prop]) {
          return this.addSanitizer({
            sanitizer: sanitizerKeywordMapping[prop],
            body: undefined
          });
        } else return;
      })
    );

    if (options.removeHeaderSanitizer) {
      this.addSanitizer({
        sanitizer: "RemoveHeaderSanitizer",
        body: JSON.stringify({
          headersForRemoval: options.removeHeaderSanitizer.headersForRemoval.toString()
        })
      });
    }

    if (options.continuationSanitizers) {
      // TODO: Test
      await Promise.all(
        options.continuationSanitizers.map((replacer) =>
          this.addSanitizer({
            sanitizer: "ContinuationSanitizer",
            body: JSON.stringify({
              ...replacer,
              resetAfterFirst: replacer.resetAfterFirst.toString()
            })
          })
        )
      );
    }

    if (options.uriSubscriptionIdSanitizer) {
      await this.addSanitizer({
        sanitizer: "UriSubscriptionIdSanitizer",
        body: JSON.stringify(options.uriSubscriptionIdSanitizer)
      });
    }
  }

  /**
   *  Internally,
   * - connection strings are parsed and
   * - each part of the connection string is mapped with its corresponding fake value
   * - generalRegexSanitizer is applied for each of the parts with the real and fake values that are parsed
   */
  async addConnectionStringSanitizer(
    actualConnString: string,
    fakeConnString: string
  ): Promise<void> {
    // extract connection string parts and match call
    const pairsMatched = getRealAndFakePairs(actualConnString, fakeConnString);
    await this.addSanitizers({
      generalRegexSanitizers: Object.entries(pairsMatched).map(([key, value]) => {
        return { value, regex: key };
      })
    });
  }

  /**
   * Atomic method to add a simple sanitizer.
   * @param options
   */
  private async addSanitizer(options: {
    sanitizer: ProxyToolSanitizers;
    body: string | undefined;
  }): Promise<void> {
    if (this.recordingId !== undefined) {
      const uri = `${this.url}${paths.admin}${
        options.sanitizer !== "Reset" ? paths.addSanitizer : paths.reset
      }`;
      const req = this._createRecordingRequest(uri);
      if (options.sanitizer !== "Reset") {
        req.headers.set("x-abstraction-identifier", options.sanitizer);
      }
      req.body = options.body;
      if (!this.httpClient) {
        throw new RecorderError(
          `Something went wrong, TestProxyHttpClient.httpClient should not have been undefined in ${this.mode} mode.`
        );
      }
      const rsp = await this.httpClient.sendRequest({
        ...req,
        allowInsecureConnection: true
      });
      if (rsp.status !== 200) {
        throw new RecorderError("addSanitizer request failed.");
      }
    } else {
      throw new RecorderError("Bad state, recordingId is not defined when called addSanitizer().");
    }
  }

  /**
   * Adds the recording id headers to the requests that are sent to the proxy tool.
   * These are required to appropriately save the recordings in the record mode and picking them up in playback.
   *
   * @param {string} url
   */
  private _createRecordingRequest(url: string, method: HttpMethods = "POST") {
    const req = createPipelineRequest({ url: url, method });
    if (this.recordingId !== undefined) {
      req.headers.set("x-recording-id", this.recordingId);
    }
    return req;
  }
}
