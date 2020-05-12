// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import fs from "fs-extra";
import nise from "nise";
import {
  isBrowser,
  blobToString,
  escapeRegExp,
  env,
  TestInfo,
  isPlaybackMode,
  isRecordMode,
  parseUrl,
  findRecordingsFolderPath
} from "./utils";
import { customConsoleLog } from "./customConsoleLog";

let nock: any;

let replaceableVariables: { [x: string]: string } = {};
export function setReplaceableVariables(a: { [x: string]: string }): void {
  replaceableVariables = a;
  if (isPlaybackMode()) {
    // Providing dummy values to avoid the error
    Object.keys(a).map((k) => {
      env[k] = a[k];
    });
  }
}

let replacements: any[] = [];
export function setReplacements(maps: any): void {
  replacements = maps;
}

let queryParameters: string[] = [];
/**
 *  Query Parameters, for example from the SAS token may contain sensitive information.
 *  Query Parameters provided by calling this method will be skipped.
 * @param {string[]} [params] Query Parameters to be skipped
 */
export function skipQueryParams(params: string[]): void {
  queryParameters = params;
}

export function setEnvironmentOnLoad() {
  if (!isBrowser() && (isRecordMode || isPlaybackMode)) {
    nock = require("nock");
  }

  if (isBrowser() && isRecordMode()) {
    customConsoleLog();
  }
}

export abstract class BaseRecorder {
  // relative file path of the test recording inside the `recordings` folder
  // Example - node/some_random_test_suite/recording_first_test.js
  protected readonly relativeTestRecordingFilePath: string;
  public uniqueTestInfo: TestInfo = { uniqueName: {}, newDate: {} };

  constructor(platform: "node" | "browsers", testSuiteTitle: string, testTitle: string) {
    // File Extension
    // nock recordings for node tests - .js extension
    // recordings are saved in json format for browser tests - .json extension
    const ext = platform === "node" ? "js" : "json";
    // Filepath - `{node|browsers}/<describe-block-title>/recording_<test-title>.{js|json}`
    this.relativeTestRecordingFilePath =
      platform +
      "/" +
      this.formatPath(testSuiteTitle) +
      "/recording_" +
      this.formatPath(testTitle) +
      "." +
      ext;
  }

  protected formatPath(path: string): string {
    return path
      .toLowerCase()
      .replace(/ /g, "_")
      .replace(/<=/g, "lte")
      .replace(/>=/g, "gte")
      .replace(/</g, "lt")
      .replace(/>/g, "gt")
      .replace(/=/g, "eq")
      .replace(/\W/g, "");
  }

  /**
   * Additional layer of security to avoid unintended/accidental occurrences of secrets in the recordings
   * */
  protected filterSecrets(recording: string): string {
    let updatedRecording = recording;
    for (const k of Object.keys(replaceableVariables)) {
      if (env[k]) {
        const escaped = escapeRegExp(env[k]);
        updatedRecording = updatedRecording.replace(
          new RegExp(escaped, "g"),
          replaceableVariables[k]
        );
      }
    }
    for (const map of replacements) {
      updatedRecording = map(updatedRecording);
    }

    return updatedRecording;
  }

  public abstract record(): void;
  /**
   * Finds the recording for the corresponding test and replays the saved responses from the recording.
   *
   * @abstract
   * @param {string} filePath Test file path (can be obtained from the mocha's context object - Mocha.Context.currentTest)
   * @memberof BaseRecorder
   */
  public abstract playback(filePath: string): void;
  public abstract stop(): void;
}

export class NockRecorder extends BaseRecorder {
  constructor(testSuiteTitle: string, testTitle: string) {
    super("node", testSuiteTitle, testTitle);
  }

  public record(): void {
    nock.recorder.rec({
      dont_print: true
    });
  }

  public playback(filePath: string): void {
    /**
     * `@azure/test-utils-recorder` package is used for both the browser and node tests
     *
     * During the playback mode,
     *  `path` module is leveraged to import the node test recordings and `path` module can't be imported in the browser.
     *  So, instead of `import`-ing the `path` library, `require` is being used and this code path is never executed in the browser.
     *
     * [A diiferent strategy is in place to import recordings for browser tests by leveraging `karma` plugins.]
     */
    let path = require("path");
    // Get the full path of the `recordings` folder by navigating through the hierarchy of the test file path.
    const recordingsFolderPath = findRecordingsFolderPath(filePath);
    const recordingPath = path.resolve(recordingsFolderPath, this.relativeTestRecordingFilePath);
    if (fs.existsSync(recordingPath)) {
      this.uniqueTestInfo = require(recordingPath).testInfo;
    } else {
      throw new Error(
        `Recording (${this.relativeTestRecordingFilePath}) is not found at ${recordingsFolderPath}`
      );
    }
  }

  public stop(): void {
    // Importing "nock" library in the recording and appending the testInfo part in the recording
    const importNockStatement =
      "let nock = require('nock');\n" +
      "\n" +
      "module.exports.testInfo = " +
      JSON.stringify(this.uniqueTestInfo) +
      "\n";

    const fixtures = nock.recorder.play();

    // Create the directories recursively incase they don't exist
    try {
      // Stripping away the filename from the filepath and retaining the directory structure
      fs.ensureDirSync(
        "./recordings/" +
          this.relativeTestRecordingFilePath.substring(
            0,
            this.relativeTestRecordingFilePath.lastIndexOf("/") + 1
          )
      );
    } catch (err) {
      if (err.code !== "EEXIST") throw err;
    }

    const file = fs.createWriteStream("./recordings/" + this.relativeTestRecordingFilePath, {
      flags: "w"
    });

    // Some tests expect errors to happen and, if a writing error is thrown in one of these tests, it may be captured in a catch block by accident,
    // resulting in unexpected behavior. For this reason we're printing it to the console as well
    file.on("error", (err: any) => {
      console.log(err);
      throw err;
    });

    file.write(importNockStatement);

    // Saving the recording to the file
    for (const fixture of fixtures) {
      // We're not matching query string parameters because they may contain sensitive information, and Nock does not allow us to customize it easily
      const updatedFixture = fixture.toString().replace(/\.query\(.*\)/, ".query(true)");
      file.write(this.filterSecrets(updatedFixture) + "\n");
    }

    file.end();

    nock.recorder.clear();
    nock.restore();
  }
}

// To better understand how this class works, it's necessary to comprehend how HTTP async requests are made:
// A new request object is created
//    let req = new XMLHttpRequest();
// The request is opened with some important information
//    req.open(method, url, async, user, password);
// Since we're dealing with an async request, we must set a way to know when the response is ready
//    req.onreadystatechange = function() {
//      if (req.readyState === 4) do_something;
//    }
// Finally, the request is sent to the server
//    req.send(data);

// Nise module does not have a native implementation of record/playback like Nock does
// This class overrides requests' 'open', 'send' and 'onreadystatechange' functions, adding our own code to them to deal with requests
export class NiseRecorder extends BaseRecorder {
  private recordings: any[] = [];

  constructor(testSuiteTitle: string, testTitle: string) {
    super("browsers", testSuiteTitle, testTitle);
  }

  // Inserts a request/response pair into the recordings array
  private async recordRequest(request: any, data: any): Promise<void> {
    const responseHeaders: any = {};
    const responseHeadersPairs = request.getAllResponseHeaders().split("\r\n");
    for (const pair of responseHeadersPairs) {
      const [key, value] = pair.split(": ");
      responseHeaders[key] = value;
    }

    // We're not storing Query Parameters because they may contain sensitive information
    // We're ignoring the "_" parameter as well because it's not being added by our code
    // More info on "_": https://stackoverflow.com/questions/3687729/who-add-single-underscore-query-parameter
    const parsedUrl = parseUrl(request.url);
    const query: any = {};
    for (const param in parsedUrl.query) {
      if (!queryParameters.includes(param) && param !== "_") {
        query[param] = parsedUrl.query[param];
      }
    }

    this.recordings.push({
      method: request.method,
      url: parsedUrl.url,
      query: query,
      requestBody: data instanceof Blob ? await blobToString(data) : data,
      status: request.status,
      response:
        request.response instanceof Blob ? await blobToString(request.response) : request.response,
      responseHeaders: responseHeaders
    });
  }

  // Checks whether a recording matches a request or not (we're not matching request headers)
  private matchRequest(recording: any, request: any): boolean {
    // Every parameter in the recording must be present and have the same value in the request
    for (const param in recording.query) {
      if (recording.query[param] !== request.query[param]) {
        return false;
      }
    }

    // There shouldn't be parameters in the request that are not present in the recording (except for SAS Query Parameters and "_")
    for (const param in request.query) {
      if (
        recording.query[param] === undefined &&
        !queryParameters.includes(param) &&
        param !== "_"
      ) {
        return false;
      }
    }

    return (
      recording.method === request.method &&
      recording.url === request.url &&
      recording.requestBody === request.requestBody
    );
  }

  // When recording, we want to hit the server and intercept requests/responses
  // Nise does not allow us to intercept requests if they're sent to the server, so we need to override its behavior
  public record(): void {
    const self = this;
    const xhr = nise.fakeXhr.useFakeXMLHttpRequest();

    // The following filter allows every request to be sent to the server without being mocked
    xhr.useFilters = true;
    xhr.addFilter(() => true);

    // 'onCreate' function is called when a new fake XMLHttpRequest object (req) is created
    // Our intent is to override the request's 'onreadystatechange' function so we can create a recording once the response is ready
    // We can only override 'onreadystatechange' AFTER the 'send' function is called because we need to make sure our implementation won't be overriden by the client
    // But we can only override 'send' AFTER the 'open' function is called because the filter we set above makes Nise override it in 'open' body
    xhr.onCreate = function(req: any) {
      // We'll override the 'open' function, so we need to store a handle to its original implementation
      const reqOpen = req.open;
      req.open = function() {
        // Here we are calling the original 'open' function to make sure everything is set up correctly (HTTP method, url, filters)
        reqOpen.apply(req, arguments);

        // We'll override the 'send' function, so we need to store a handle to its original implementation
        // We can already override it because we know 'open' has already been called
        const reqSend = req.send;
        req.send = function(data: any) {
          // We'll override the 'onreadystatechange' function, so we need to store a handle to its original implementation
          // Now we can finally override 'onreadystatechange' because 'send' has already been called
          const reqStateChange = req.onreadystatechange;
          req.onreadystatechange = function() {
            // .readyState property returns the state an XMLHttpRequest client is in
            // readyState = 4 refers to the completion of the operation.
            // This could mean that either the data transfer has been completed successfully or failed.
            // More info on readyState - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
            if (req.readyState === 4) {
              // Record the request once the response is obtained
              self.recordRequest(req, data);
            }
            // Sometimes the client doesn't implement an 'onreadystatechange' function, so we need to make sure it exists before calling the original implementation
            if (reqStateChange) {
              reqStateChange.apply(null, arguments);
            }
          };

          // Now that we have overriden 'onreadystatechange', we can send the request to the server
          reqSend.apply(req, arguments);
        };
      };
    };
  }

  // When playing back, we want to intercept requests, find a corresponding match in our recordings and respond to it with the recorded data
  // We must override the request's 'send' function because all the request information (body, url, method, queries) will be ready when it's called
  public playback(): void {
    const self = this;
    const xhr = nise.fakeXhr.useFakeXMLHttpRequest();

    // 'karma-json-preprocessor' helps us to retrieve recordings
    this.recordings = (window as any).__json__[
      "recordings/" + this.relativeTestRecordingFilePath
    ].recordings;
    this.uniqueTestInfo = (window as any).__json__[
      "recordings/" + this.relativeTestRecordingFilePath
    ].uniqueTestInfo;

    // 'onCreate' function is called when a new fake XMLHttpRequest object (req) is created
    xhr.onCreate = function(req: any) {
      // We'll override the 'send' function, so we need to store a handle to its original implementation
      const reqSend = req.send;
      req.send = async function(data: any) {
        // Here we're calling the original send method. Nise will make the request wait for a mock response that we'll send later
        reqSend.call(req, data);

        // formattedRequest contains all the necessary information to look for a match in our recordings
        const parsedUrl = parseUrl(req.url);
        const formattedRequest = {
          method: req.method,
          url: parsedUrl.url,
          query: parsedUrl.query,
          requestBody: data instanceof Blob ? await blobToString(data) : data
        };

        // We look through our recordings to find a match to the current request
        // If we find a match, we remove it from the recordings list so we don't match it again by accident
        let recordingFound = false;
        for (let i = 0; !recordingFound && i < self.recordings.length; i++) {
          if (self.matchRequest(self.recordings[i], formattedRequest)) {
            const status = self.recordings[i].status;
            const responseHeaders = self.recordings[i].responseHeaders;
            const response = self.recordings[i].response;

            // We are dealing with async requests so we're responding to them asynchronously
            setTimeout(() => req.respond(status, responseHeaders, response));
            self.recordings.splice(i, 1);
            recordingFound = true;
          }
        }

        // If we can't find a match, we throw an error
        // Some tests expect errors to happen and, if a matching error is thrown in one of these tests, it may be captured in a catch block by accident,
        // resulting in unexpected behavior. For this reason we're printing it to the console as well
        if (!recordingFound) {
          const err = new Error(
            "No match for request " + JSON.stringify(formattedRequest, null, " ")
          );
          console.log(err);
          throw err;
        }
      };
    };
  }

  public stop(): void {
    for (let i = 0; i < this.recordings.length; i++) {
      for (const k of Object.keys(this.recordings[i])) {
        if (typeof this.recordings[i][k] === "string") {
          this.recordings[i][k] = this.filterSecrets(this.recordings[i][k]);
        }
      }
    }
    // We're sending the recordings to the 'karma-json-to-file-reporter' via console.log
    console.log(
      JSON.stringify({
        writeFile: true,
        path: "./recordings/" + this.relativeTestRecordingFilePath,
        content: { recordings: this.recordings, uniqueTestInfo: this.uniqueTestInfo }
      })
    );
  }
}
