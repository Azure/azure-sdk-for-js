import { HttpClient } from "@azure/core-rest-pipeline";
import { createPipelineRequest, HttpMethods } from "@azure/core-rest-pipeline";
import { getRealAndFakePairs } from "./utils/connectionStringHelpers";
import { paths } from "./utils/paths";
import { RecorderError } from "./utils/utils";

export interface SanitizerOptions {
  generalRegexSanitizers?: Array<{
    value: string;
    regex: string;
  }>;
  connectionStringSanitizers?: Array<{
    actualConnString: string;
    fakeConnString: string;
  }>;
  bodyKeySanitizers?: Array<{ value: string; regex: string; jsonPath: string }>;
  bodyRegexSanitizers?: Array<{ value: string; regex: string; groupForReplace?: string }>;
  continuationSanitizers?: Array<{ key: string; method?: string; resetAfterFirst: boolean }>;
  headerRegexSanitizers?: Array<{ key: string; value: string; groupForReplace?: string }>;
  uriRegexSanitizers?: Array<{ value: string; regex: string; groupForReplace?: string }>;
  removeHeaderSanitizer?: { headersForRemoval: string[] };
  oAuthResponseSanitizer?: boolean;
  uriSubscriptionIdSanitizer?: { value: string };
}

// TODO:
// - Add docs
// - Simplify or merge _createRecordingRequest
// - See if sessionFile is needed or recording ID is just enough
// - Test in live mode

export class Sanitizer {
  constructor(private mode: string, private url: string, private httpClient?: HttpClient) {}
  private recordingId: string | undefined;

  setRecordingId(recordingId: string) {
    this.recordingId = recordingId;
  }

  async transformsInfo(): Promise<string | null | undefined> {
    if (this.recordingId !== undefined) {
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

  async addSanitizers(options: SanitizerOptions): Promise<void> {
    if (options.connectionStringSanitizers) {
      for (const connectionStringSanitizer of options.connectionStringSanitizers) {
        await this.addConnectionStringSanitizer(connectionStringSanitizer);
      }
    }
    if (options.generalRegexSanitizers) {
      for (const replacer of options.generalRegexSanitizers) {
        await this.addRegexSanitizer(replacer);
      }
    }
    if (options.removeHeaderSanitizer) {
      this.addSanitizer({
        sanitizer: "RemoveHeaderSanitizer",
        body: JSON.stringify({
          headersForRemoval: options.removeHeaderSanitizer.headersForRemoval.toString()
        })
      });
    }
    if (options.bodyKeySanitizers) {
      for (const replacer of options.bodyKeySanitizers) {
        await this.addSanitizer({
          sanitizer: "BodyKeySanitizer",
          body: JSON.stringify(replacer)
        });
      }
    }
    if (options.bodyRegexSanitizers) {
      for (const replacer of options.bodyRegexSanitizers) {
        await this.addSanitizer({
          sanitizer: "BodyRegexSanitizer",
          body: JSON.stringify(replacer)
        });
      }
    }
    if (options.continuationSanitizers) {
      // TODO: Test
      for (const replacer of options.continuationSanitizers) {
        await this.addSanitizer({
          sanitizer: "ContinuationSanitizer",
          body: JSON.stringify({
            ...replacer,
            resetAfterFirst: replacer.resetAfterFirst.toString()
          })
        });
      }
    }
    if (options.headerRegexSanitizers) {
      // TODO: Test
      for (const replacer of options.headerRegexSanitizers) {
        await this.addSanitizer({
          sanitizer: "HeaderRegexSanitizer",
          body: JSON.stringify(replacer)
        });
      }
    }
    if (options.oAuthResponseSanitizer) {
      // TODO: Test
      await this.addSanitizer({
        sanitizer: "OAuthResponseSanitizer",
        body: undefined
      });
    }
    if (options.uriRegexSanitizers) {
      // TODO: Test
      for (const replacer of options.uriRegexSanitizers) {
        await this.addSanitizer({
          sanitizer: "UriRegexSanitizer",
          body: JSON.stringify(replacer)
        });
      }
    }
    if (options.uriSubscriptionIdSanitizer) {
      // TODO: Test
      await this.addSanitizer({
        sanitizer: "UriSubscriptionIdSanitizer",
        body: JSON.stringify(options.uriSubscriptionIdSanitizer)
      });
    }
  }

  async addConnectionStringSanitizer(replacer: {
    actualConnString: string;
    fakeConnString: string;
  }): Promise<void> {
    // extract connection string parts and match call
    const pairsMatched = getRealAndFakePairs(replacer.actualConnString, replacer.fakeConnString);
    for (const [key, value] of Object.entries(pairsMatched)) {
      await this.addRegexSanitizer({ value: value, regex: key });
    }
  }

  async addRegexSanitizer(replacer: { value: string; regex: string }): Promise<void> {
    return this.addSanitizer({
      sanitizer: "GeneralRegexSanitizer",
      body: JSON.stringify(replacer)
    });
  }

  private async addSanitizer(options: {
    sanitizer:
      | "GeneralRegexSanitizer"
      | "RemoveHeaderSanitizer"
      | "BodyKeySanitizer"
      | "BodyRegexSanitizer"
      | "ContinuationSanitizer"
      | "HeaderRegexSanitizer"
      | "OAuthResponseSanitizer"
      | "UriRegexSanitizer"
      | "UriSubscriptionIdSanitizer";
    body: string | undefined;
  }): Promise<void> {
    if (this.recordingId !== undefined) {
      const infoUri = `${this.url}${paths.admin}${paths.addSanitizer}`;
      const req = this._createRecordingRequest(infoUri);
      req.headers.set("x-abstraction-identifier", options.sanitizer);
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
   * @private
   * @param {string} url
   */
  private _createRecordingRequest(url: string, method: HttpMethods | undefined = "POST") {
    const req = createPipelineRequest({ url: url, method });
    if (this.recordingId !== undefined) {
      req.headers.set("x-recording-id", this.recordingId);
    }
    return req;
  }
}
