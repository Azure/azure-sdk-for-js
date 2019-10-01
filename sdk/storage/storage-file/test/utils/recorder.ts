import * as dotenv from "dotenv";
import fs from "fs-extra";
import nise from "nise";
import queryString from "query-string";

import { getUniqueName, isBrowser } from "../utils";
import { delay as restDelay } from "@azure/core-http";
import { blobToString } from "./index.browser";

dotenv.config({ path: "../.env" });

let nock: any;
if (!isBrowser()) {
  if (process.env.TEST_MODE === "record" || process.env.TEST_MODE === "playback") {
    nock = require("nock");
  }
} else if ((window as any).__env__.TEST_MODE === "record") {
  // Converting content corresponding to all the console statements
  //  into (JSON.stringify)-ed content in record mode for browser tests.
  //
  // In browser, once the content to be recorded is ready, recordings
  //  are supposed to be sent to the appropriate karma reporter(jsonToFileReporter)
  //  in order to generate the corresponding recording file.
  // The way to do this is by printing the recordings as JSON strings to `console.log()`.
  // As a result, the console gets filled with lots of prints while recording.
  //
  // We solve this issue by
  // - disabling the console.logs from karma and
  // - by adding a custom console.log() which converts all the console statements into
  //   console.log() with stringified JSON objects.
  // - Handle all the console.logs with stringified JSON objects in karma.conf.js
  //   as explained below.
  //
  // Karma.conf.js
  // - jsonToFileReporter in karma.conf.js filters the JSON strings in console.logs.
  // - Console logs with `.writeFile` property are captured and are written to a file(recordings).
  // - The other console statements are captured and printed normally.
  // - Example - console.warn("hello"); -> console.log({ warn: "hello" });
  // - Example - console.log("hello"); -> console.log({ log: "hello" });
  const consoleLog = window.console.log;
  for (const method in window.console) {
    if (
      window.console.hasOwnProperty(method) &&
      typeof (window.console as any)[method] === "function"
    ) {
      (window.console as any)[method] = function(obj: any) {
        try {
          if (!JSON.parse(obj).writeFile) {
            // If the JSON string doesn't contain `.writeFile` property,
            // we wrap the object as a JSON object and apply JSON.stringify()
            // Example - console.warn("hello"); -> console.log({ warn: "hello" });
            const newObj: any = {};
            newObj[method] = obj;
            consoleLog(JSON.stringify(newObj));
          } else {
            // If the JSON strings contain `.writeFile` property,
            // use the console.log as it is.
            consoleLog(obj);
          }
        } catch (error) {
          // If the object is not a JSON string, the try block fails and
          // we wrap the object as a JSON object and apply JSON.stringify()
          // (same as the if block in try)
          const newObj: any = {};
          newObj[method] = obj;
          consoleLog(JSON.stringify(newObj));
        }
      };
    }
  }
}

const env = isBrowser() ? (window as any).__env__ : process.env;
const isRecording = env.TEST_MODE === "record";
const isPlayingBack = env.TEST_MODE === "playback";

if (isPlayingBack) {
  // Providing dummy values to avoid the error
  env.ACCOUNT_NAME = "fakestorageaccount";
  env.ACCOUNT_KEY = "aaaaa";
  env.ACCOUNT_SAS = "aaaaa";
  env.STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${env.ACCOUNT_NAME};AccountKey=${env.ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
}

export function delay(milliseconds: number): Promise<void> | null {
  return isPlayingBack ? null : restDelay(milliseconds);
}

/**
 * Possible reasons for skipping a test:
 * * Abort: browser testing unexpectedly finishes when a request is aborted during playback (unknown reason; probably related to the way nise handles it)
 * * Character: there are characters in the message that are not supported in browser logging or in ECMAScript
 * * Progress: Nock does not record a request if it's aborted in a 'progress' callback
 * * Size: the generated recording file is too big and would considerably increase the size of the package
 * * Tempfile: the request makes use of a random tempfile created locally, and the recorder does not support recording it as unique information
 * * UUID: a UUID is randomly generated within the SDK and used in an HTTP request, resulting in Nock being unable to recognize it
 */
const skip = [
  // Abort
  "browsers/aborter/recording_should_abort_after_aborter_timeout.json",
  // Abort
  "browsers/aborter/recording_should_abort_after_parent_aborter_calls_abort.json",
  // Abort
  "browsers/aborter/recording_should_abort_after_parent_aborter_timeout.json",
  // Abort
  "browsers/aborter/recording_should_abort_when_calling_abort_before_request_finishes.json",
  // Unknown reason (playback fails, probably same as Nock)
  "browsers/fileclient/recording_download_should_update_progress_and_abort_successfully.json",
  // Unknown reason (recording throws an error, but file is generated and playback works)
  "browsers/fileclient/recording_uploadrange_with_progress_event.json",
  // Progress
  "node/fileclient/recording_download_should_update_progress_and_abort_successfully.js",
  // Abort. Nock doesn't record aborted request, should investigate
  "node/highlevel_nodejs_only/recording_uploadfile_should_abort_for_large_data.js",
  // Abort. Nock doesn't record aborted request, should investigate
  "node/highlevel_nodejs_only/recording_uploadfile_should_abort_for_small_data.js",
  // Nock issue: https://github.com/Azure/azure-sdk-for-js/issues/5229
  "node/fileclient/recording_uploadrange_with_progress_event.js",
  // Abort. Nock doesn't record aborted request, should investigate
  "node/highlevel_nodejs_only/recording_uploadstream_should_abort.js",
  // Progress, Size (15MB), Tempfile
  "node/highlevel_nodejs_only/recording_fileclientdownload_should_abort_after_retrys.js",
  // Size (15MB), Tempfile
  "node/highlevel_nodejs_only/recording_fileclientdownload_should_download_data_failed_when_exceeding_max_stream_retry_requests.js",
  // Size (30MB), Tempfile
  "node/highlevel_nodejs_only/recording_fileclientdownload_should_download_full_data_successfully_when_internal_stream_unexcepted_ends.js",
  // Size (15MB), Tempfile
  "node/highlevel_nodejs_only/recording_fileclientdownload_should_download_partial_data_when_internal_stream_unexcepted_ends.js",
  // Size (30MB), Tempfile
  "node/highlevel_nodejs_only/recording_fileclientdownload_should_success_when_internal_stream_unexcepted_ends_at_the_stream_end.js",
  // Size (263MB), Tempfile
  "node/highlevel_nodejs_only/recording_downloadtobuffer_should_abort.js",
  // Size (526MB), Tempfile
  "node/highlevel_nodejs_only/recording_downloadtobuffer_should_success.js",
  // Progress, Size (15MB), Tempfile
  "node/highlevel_nodejs_only/recording_downloadtobuffer_should_update_progress_event.js",
  // Size (526MB), Tempfile
  "node/highlevel_nodejs_only/recording_uploadfile_should_success_for_large_data.js",
  // Size (30MB), Tempfile
  "node/highlevel_nodejs_only/recording_uploadfile_should_success_for_small_data.js",
  // Progress, Size (4MB), Tempfile
  "node/highlevel_nodejs_only/recording_uploadfile_should_update_progress_for_large_data.js",
  // Progress, Size (3MB), Tempfile
  "node/highlevel_nodejs_only/recording_uploadfile_should_update_progress_for_small_data.js",
  // Size (526MB), Tempfile
  "node/highlevel_nodejs_only/recording_uploadstream_should_success.js",
  // Size (263MB), Tempfile
  "node/highlevel_nodejs_only/recording_uploadstream_should_update_progress_event.js",
  // Size (30MB), Tempfile
  "node/highlevel_nodejs_only/recording_downloadtofile_should_success.js",
  "node/highlevel_nodejs_only/recording_uploadfiletoazurefile_should_abort_for_large_data.js",
  // Abort. Nock doesn't record aborted request, should investigate
  "node/highlevel_nodejs_only/recording_uploadfiletoazurefile_should_abort_for_small_data.js",
  // Abort. Nock doesn't record aborted request, should investigate
  "node/highlevel_nodejs_only/recording_uploadstreamtoazurefile_should_abort.js",
  // Progress
  "node/fileurl/recording_download_should_update_progress_and_abort_successfully.js",
  // Progress, Size (15MB), Tempfile
  "node/highlevel_nodejs_only/recording_bloburldownload_should_abort_after_retrys.js",
  // Size (15MB), Tempfile
  "node/highlevel_nodejs_only/recording_bloburldownload_should_download_data_failed_when_exceeding_max_stream_retry_requests.js",
  // Size (30MB), Tempfile
  "node/highlevel_nodejs_only/recording_bloburldownload_should_download_full_data_successfully_when_internal_stream_unexcepted_ends.js",
  // Size (15MB), Tempfile
  "node/highlevel_nodejs_only/recording_bloburldownload_should_download_partial_data_when_internal_stream_unexcepted_ends.js",
  // Size (30MB), Tempfile
  "node/highlevel_nodejs_only/recording_bloburldownload_should_success_when_internal_stream_unexcepted_ends_at_the_stream_end.js",
  // Size (263MB), Tempfile
  "node/highlevel_nodejs_only/recording_downloadazurefiletobuffer_should_abort.js",
  // Size (526MB), Tempfile
  "node/highlevel_nodejs_only/recording_downloadazurefiletobuffer_should_success.js",
  // Progress, Size (15MB), Tempfile
  "node/highlevel_nodejs_only/recording_downloadazurefiletobuffer_should_update_progress_event.js",
  // Size (526MB), Tempfile
  "node/highlevel_nodejs_only/recording_uploadfiletoazurefile_should_success_for_large_data.js",
  // Size (30MB), Tempfile
  "node/highlevel_nodejs_only/recording_uploadfiletoazurefile_should_success_for_small_data.js",
  // Progress, Size (4MB), Tempfile
  "node/highlevel_nodejs_only/recording_uploadfiletoazurefile_should_update_progress_for_large_data.js",
  // Progress, Size (3MB), Tempfile
  "node/highlevel_nodejs_only/recording_uploadfiletoazurefile_should_update_progress_for_small_data.js",
  // Size (526MB), Tempfile
  "node/highlevel_nodejs_only/recording_uploadstreamtoazurefile_should_success.js",
  // Size (263MB), Tempfile
  "node/highlevel_nodejs_only/recording_uploadstreamtoazurefile_should_update_progress_event.js",
  // Skipping for now, further investigation needed on the errors in playback
  "browsers/fileclient/recording_startcopyfromurl.json"
];

abstract class Recorder {
  protected readonly filepath: string;
  public uniqueTestInfo: any = {};

  constructor(env: string, testHierarchy: string, testTitle: string, ext: string) {
    this.filepath =
      env +
      "/" +
      this.formatPath(testHierarchy) +
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
    let updatedRecording = recording.replace(
      new RegExp(env.ACCOUNT_NAME, "g"),
      "fakestorageaccount"
    );
    if (env.ACCOUNT_KEY) {
      updatedRecording = updatedRecording.replace(new RegExp(env.ACCOUNT_KEY, "g"), "aaaaa");
    }
    if (env.ACCOUNT_SAS) {
      updatedRecording = updatedRecording.replace(
        new RegExp(env.ACCOUNT_SAS.match("(.*)&sig=(.*)")[2], "g"),
        "aaaaa"
      );
    }
    return updatedRecording;
  }

  public skip(): boolean {
    return skip.includes(this.filepath);
  }

  public abstract record(): void;
  public abstract playback(): void;
  public abstract stop(): void;
}

class NockRecorder extends Recorder {
  constructor(testHierarchy: string, testTitle: string) {
    super("node", testHierarchy, testTitle, "js");
  }

  public record(): void {
    nock.recorder.rec({
      dont_print: true
    });
  }

  public playback(): void {
    this.uniqueTestInfo = require("../recordings/" + this.filepath).testInfo;
  }

  public stop(): void {
    const importNock = "let nock = require('nock');\n";
    const fixtures = nock.recorder.play();

    // Create the directories recursively incase they don't exist
    try {
      // Stripping away the filename from the filepath and retaining the directory structure
      fs.ensureDirSync(
        "./recordings/" + this.filepath.substring(0, this.filepath.lastIndexOf("/") + 1)
      );
    } catch (err) {
      if (err.code !== "EEXIST") throw err;
    }

    const file = fs.createWriteStream("./recordings/" + this.filepath, {
      flags: "w"
    });

    // Some tests expect errors to happen and, if a writing error is thrown in one of these tests, it may be captured in a catch block by accident,
    // resulting in unexpected behavior. For this reason we're printing it to the console as well
    file.on("error", (err: any) => {
      console.log(err);
      throw err;
    });

    file.write(
      importNock + "\n" + "module.exports.testInfo = " + JSON.stringify(this.uniqueTestInfo) + "\n"
    );

    for (const fixture of fixtures) {
      // We're not matching query string parameters because they may contain sensitive information, and Nock does not allow us to customize it easily
      const updatedFixture = fixture.replace(/\.query\(.*\)/, ".query(true)");
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
class NiseRecorder extends Recorder {
  private readonly sasQueryParameters = ["se", "sig", "sp", "spr", "srt", "ss", "st", "sv"];
  private recordings: any[] = [];

  constructor(testHierarchy: string, testTitle: string) {
    super("browsers", testHierarchy, testTitle, "json");
  }

  // Inserts a request/response pair into the recordings array
  private async recordRequest(request: any, data: any): Promise<void> {
    const responseHeaders: any = {};
    const responseHeadersPairs = request.getAllResponseHeaders().split("\r\n");
    for (const pair of responseHeadersPairs) {
      const [key, value] = pair.split(": ");
      responseHeaders[key] = value;
    }

    // We're not storing SAS Query Parameters because they may contain sensitive information
    // We're ignoring the "_" parameter as well because it's not being added by our code
    // More info on "_": https://stackoverflow.com/questions/3687729/who-add-single-underscore-query-parameter
    const parsedUrl = queryString.parseUrl(request.url);
    const query: any = {};
    for (const param in parsedUrl.query) {
      if (!this.sasQueryParameters.includes(param) && param !== "_") {
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
        !this.sasQueryParameters.includes(param) &&
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
            // Record the request once the response is obtained
            if (req.readyState === 4) {
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
    this.recordings = (window as any).__json__["recordings/" + this.filepath].recordings;
    this.uniqueTestInfo = (window as any).__json__["recordings/" + this.filepath].uniqueTestInfo;

    // 'onCreate' function is called when a new fake XMLHttpRequest object (req) is created
    xhr.onCreate = function(req: any) {
      // We'll override the 'send' function, so we need to store a handle to its original implementation
      const reqSend = req.send;
      req.send = async function(data: any) {
        // Here we're calling the original send method. Nise will make the request wait for a mock response that we'll send later
        reqSend.call(req, data);

        // formattedRequest contains all the necessary information to look for a match in our recordings
        const parsedUrl = queryString.parseUrl(req.url);
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
    // We're sending the recordings to the 'karma-json-to-file-reporter' via console.log
    console.log(
      this.filterSecrets(
        JSON.stringify({
          writeFile: true,
          path: "./recordings/" + this.filepath,
          content: { recordings: this.recordings, uniqueTestInfo: this.uniqueTestInfo }
        })
      )
    );
  }
}

export function record(testContext: any) {
  let recorder: Recorder;
  let testHierarchy: string;
  let testTitle: string;

  // In a hook ("before all" or "before each"), testContext.test points to the hook, while testContext.currentTest
  // points to the individual test that will be run next.  A "before all" hook is run once before all tests,
  // so the hook itself should be used to identify recordings.  However, a "before each" hook is run once before each
  // test, so the individual test should be used instead.
  if (testContext.test.type == "hook" && testContext.test.title.includes("each")) {
    testHierarchy = testContext.currentTest.parent.fullTitle();
    testTitle = testContext.currentTest.title;
  } else {
    testHierarchy = testContext.test.parent.fullTitle();
    testTitle = testContext.test.title;
  }

  if (isBrowser()) {
    recorder = new NiseRecorder(testHierarchy, testTitle);
  } else {
    recorder = new NockRecorder(testHierarchy, testTitle);
  }

  if (recorder.skip() && (isRecording || isPlayingBack)) {
    testContext.skip();
  }

  // If neither recording nor playback is enabled, requests hit the live-service and no recordings are generated
  if (isRecording) {
    recorder.record();
  } else if (isPlayingBack) {
    recorder.playback();
  }

  return {
    stop: function() {
      if (isRecording) {
        recorder.stop();
      }
    },
    getUniqueName: function(prefix: string, recorderId?: string): string {
      let name: string;
      if (!recorderId) {
        recorderId = prefix;
      }
      if (isRecording) {
        name = getUniqueName(prefix);
        recorder.uniqueTestInfo[recorderId] = name;
      } else if (isPlayingBack) {
        name = recorder.uniqueTestInfo[recorderId];
      } else {
        name = getUniqueName(prefix);
      }
      return name;
    },
    newDate: function(recorderId: string): Date {
      let date: Date;
      if (isRecording) {
        date = new Date();
        recorder.uniqueTestInfo[recorderId] = date.toISOString();
      } else if (isPlayingBack) {
        date = new Date(recorder.uniqueTestInfo[recorderId]);
      } else {
        date = new Date();
      }
      return date;
    }
  };
}
