// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BaseRecorder } from "./baseRecorder";

import nise from "nise";
import {
  parseUrl,
  blobToString,
  RecorderEnvironmentSetup,
  windowLens,
  isRecordMode,
  isPlaybackMode
} from "./utils";
import { customConsoleLog } from "./customConsoleLog";

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
  private recordingInFlight: Promise<void>[] = [];
  private xhr: nise.FakeXMLHttpRequestStatic | undefined;

  constructor(hash: string, testSuiteTitle: string, testTitle: string) {
    super("browsers", hash, testSuiteTitle, testTitle);
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
      if (!this.environmentSetup.queryParametersToSkip.includes(param) && param !== "_") {
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

    // There shouldn't be parameters in the request that are not present in the recording (except for queryParametersToSkip and "_")
    for (const param in request.query) {
      if (
        recording.query[param] === undefined &&
        !this.environmentSetup.queryParametersToSkip.includes(param) &&
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
  public record(recorderEnvironmentSetup: RecorderEnvironmentSetup): void {
    this.environmentSetup = recorderEnvironmentSetup;
    const self = this;
    const xhr = nise.fakeXhr.useFakeXMLHttpRequest();
    this.xhr = xhr;

    // The following filter allows every request to be sent to the server without being mocked
    xhr.useFilters = true;
    xhr.addFilter(() => true);

    // 'onCreate' function is called when a new fake XMLHttpRequest object (req) is created
    // Our intent is to override the request's 'onreadystatechange' function so we can create a recording once the response is ready
    // We can only override 'onreadystatechange' AFTER the 'send' function is called because we need to make sure our implementation won't be overridden by the client
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
              self.recordingInFlight.push(self.recordRequest(req, data));
            }
            // Sometimes the client doesn't implement an 'onreadystatechange' function, so we need to make sure it exists before calling the original implementation
            if (reqStateChange) {
              reqStateChange.apply(null, arguments);
            }
          };

          // Now that we have overridden 'onreadystatechange', we can send the request to the server
          reqSend.apply(req, arguments);
        };
      };
    };
  }

  // When playing back, we want to intercept requests, find a corresponding match in our recordings and respond to it with the recorded data
  // We must override the request's 'send' function because all the request information (body, url, method, queries) will be ready when it's called
  public playback(recorderEnvironmentSetup: RecorderEnvironmentSetup): void {
    this.environmentSetup = recorderEnvironmentSetup;
    const self = this;
    const xhr = nise.fakeXhr.useFakeXMLHttpRequest();
    this.xhr = xhr;

    // 'karma-json-preprocessor' helps us to retrieve recordings
    this.recordings = windowLens.get([
      "__json__",
      "recordings/" + this.relativeTestRecordingFilePath,
      "recordings"
    ]);
    this.uniqueTestInfo = windowLens.get([
      "__json__",
      "recordings/" + this.relativeTestRecordingFilePath,
      "uniqueTestInfo"
    ]);

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
            setTimeout(() => {
              if (!req.aborted) {
                req.respond(status, responseHeaders, response);
              }
            });
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

  public async stop(): Promise<void> {
    if (isRecordMode()) {
      await Promise.all(this.recordingInFlight);
      // recordings at this point are in the JSON format.
      this.recordings = this.filterSecrets(this.recordings);

      // We're sending the recordings to the 'karma-json-to-file-reporter' via console.log
      console.log(
        JSON.stringify({
          writeFile: true,
          path: "./recordings/" + this.relativeTestRecordingFilePath,
          content: {
            recordings: this.recordings,
            uniqueTestInfo: this.uniqueTestInfo,
            hash: this.hash
          }
        })
      );
    } else if (isPlaybackMode()) {
      // TO DO - playback cleanup if any necessary
    }

    // Resetting the XHR behavior to it's original state.
    // Necessary if any code wants to use the browser outside of the recorder once the recorder is stopped.
    if (this.xhr) {
      this.xhr.useFilters = false;
      this.xhr.restore();
    }
  }
}

/**
 * Creates an instance of the recorder that is appropriate for the current
 * environment.
 */
export function createRecorder(
  currentHash: string,
  testHierarchy: string,
  testTitle: string
): BaseRecorder {
  if (isRecordMode()) {
    customConsoleLog();
  }

  return new NiseRecorder(currentHash, testHierarchy, testTitle);
}
