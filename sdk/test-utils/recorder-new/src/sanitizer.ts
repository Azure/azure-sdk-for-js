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
  removeHeaderSanitizer?: { headers: string[] };
}

// TODO:
// - Add docs
// - Simplify or merge _createRecordingRequest
// - See if sessionFile is needed or recording ID is just enough
// - Test in live mode

export class Sanitizer {
  constructor(
    private mode: string,
    private url: string,
    private httpClient?: HttpClient,
    private sessionFile?: string
  ) {}
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
      await this.removeHeaderSanitizer(options.removeHeaderSanitizer.headers);
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
      headers: [],
      body: JSON.stringify(replacer)
    });
  }

  async removeHeaderSanitizer(headers: string[]): Promise<void> {
    return this.addSanitizer({
      sanitizer: "RemoveHeaderSanitizer",
      headers: [],
      body: JSON.stringify({ headersForRemoval: headers.toString() })
    });
  }

  private async addSanitizer(options: {
    sanitizer: "GeneralRegexSanitizer" | "RemoveHeaderSanitizer";
    headers: string[];
    body: string;
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
   * Adds the recording file and the recording id headers to the requests that are sent to the proxy tool.
   * These are required to appropriately save the recordings in the record mode and picking them up in playback.
   *
   * @private
   * @param {string} url
   */
  private _createRecordingRequest(url: string, method: HttpMethods | undefined = "POST") {
    const req = createPipelineRequest({ url: url, method });
    if (!this.sessionFile) {
      throw new RecorderError(
        `Something went wrong, TestProxyHttpClient.sessionFile should not have been undefined in ${this.mode} mode.`
      );
    }
    req.headers.set("x-recording-file", this.sessionFile);
    if (this.recordingId !== undefined) {
      req.headers.set("x-recording-id", this.recordingId);
    }
    return req;
  }
}
