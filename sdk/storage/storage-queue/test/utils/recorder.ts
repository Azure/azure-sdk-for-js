import fs from "fs";
import nise from "nise";
import queryString from "query-string";
import { getUniqueName, isBrowser } from "../utils";
import { blobToString } from "./index.browser"
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

let nock: any;
if (!isBrowser()) {
  nock = require("nock");
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
  // Character
  "browsers/messagesurl/recording_enqueue_peek_dequeue_special_characters.json"
];

abstract class Recorder {
  protected readonly filepath: string;
  public uniqueTestInfo: any = {};

  constructor(env: string, testHierarchy: string, testTitle: string, ext: string) {
    this.filepath = env + "/" + this.formatPath(testHierarchy) + "/recording_" + this.formatPath(testTitle) + "." + ext;
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

    // It's important to print writing errors because some tests end up catching them
    const file = fs.createWriteStream("./recordings/" + this.filepath, { flags: "w" });
    file.on("error", err => {
      console.log(err);
      throw err;
    });
    file.write(importNock + "\n" + "module.exports.testInfo = " + JSON.stringify(this.uniqueTestInfo) + "\n");
    for (const fixture of fixtures) {
      file.write(fixture + "\n");
    }
    file.end();

    nock.recorder.clear();
    nock.restore();
  }
}

class NiseRecorder extends Recorder {
  private readonly sasQueryParameters = ["se", "sig", "sp", "spr", "srt", "ss", "st", "sv"];
  private readonly xhr = nise.fakeXhr.useFakeXMLHttpRequest();
  private recordings: any[] = [];

  constructor(testHierarchy: string, testTitle: string) {
    super("browsers", testHierarchy, testTitle, "json");
  }

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
      requestBody: (data instanceof Blob) ? await blobToString(data) : data,
      status: request.status,
      response: (request.response instanceof Blob) ? await blobToString(request.response) : request.response,
      responseHeaders: responseHeaders
    });
  }

  // We're not matching request headers
  private matchRequest(recording: any, request: any): boolean {
    for (const param in recording.query) {
      if (recording.query[param] !== request.query[param]) {
        return false;
      }
    }

    for (const param in request.query) {
      if (recording.query[param] === undefined && !this.sasQueryParameters.includes(param) && param !== "_") {
        return false;
      }
    }

    return (
      recording.method === request.method &&
      recording.url === request.url &&
      recording.requestBody === request.requestBody
    );
  }

  public record(): void {
    const self = this;

    this.xhr.useFilters = true;
    this.xhr.addFilter(() => true);

    this.xhr.onCreate = function(req: any) {
      const reqOpen = req.open;
      req.open = function() {
        reqOpen.apply(req, arguments);

        const reqSend = req.send;
        req.send = function(data: any) {
          const reqStateChange = req.onreadystatechange;
          req.onreadystatechange = function() {
            if (req.readyState === 4) {
              self.recordRequest(req, data);
            }
            reqStateChange && reqStateChange.apply(null, arguments);
          }
          reqSend.apply(req, arguments);
        }
      }
    }
  }

  public playback(): void {
    const self = this;

    this.recordings = (window as any).__json__["recordings/" + this.filepath].recordings;
    this.uniqueTestInfo = (window as any).__json__["recordings/" + this.filepath].uniqueTestInfo;

    this.xhr.onCreate = function(req: any) {
      const reqSend = req.send;
      req.send = async function(data: any) {
        reqSend.call(req, data);

        const parsedUrl = queryString.parseUrl(req.url);
        const formattedRequest = {
          method: req.method,
          url: parsedUrl.url,
          query: parsedUrl.query,
          requestBody: (data instanceof Blob) ? await blobToString(data) : data
        };

        let recordingFound = false;
        for (let i = 0; !recordingFound && i < self.recordings.length; i++) {
          if (self.matchRequest(self.recordings[i], formattedRequest)) {
            const status = self.recordings[i].status;
            const responseHeaders = self.recordings[i].responseHeaders;
            const response = self.recordings[i].response;
            setTimeout(() => req.respond(status, responseHeaders, response));
            self.recordings.splice(i, 1);
            recordingFound = true;
          }
        }

        // It's important to print matching errors because some tests end up catching them
        if (!recordingFound) {
          const err = new Error("No match for request " + JSON.stringify(formattedRequest, null, " "));
          console.log(err);
          throw err;
        }
      }
    }
  }

  public stop(): void {
    console.log(JSON.stringify({
      writeFile: true,
      path: "./recordings/" + this.filepath,
      content: { recordings: this.recordings, uniqueTestInfo: this.uniqueTestInfo }
    }));
  }
}

export function record(testContext: any) {
  let recorder: Recorder;
  let isRecording: boolean;
  let isPlayingBack: boolean;
  let testHierarchy: string;
  let testTitle: string;

  if (testContext.currentTest) {
    testHierarchy = testContext.currentTest.parent.fullTitle();
    testTitle = testContext.currentTest.title;
  } else {
    testHierarchy = testContext.test.parent.fullTitle();
    testTitle = testContext.test.title;
  }

  if (isBrowser()) {
    recorder = new NiseRecorder(testHierarchy, testTitle);
    isRecording = ((window as any).__env__.TEST_MODE === "record");
    isPlayingBack = ((window as any).__env__.TEST_MODE === "playback");
  } else {
    recorder = new NockRecorder(testHierarchy, testTitle);
    isRecording = (process.env.TEST_MODE === "record");
    isPlayingBack = (process.env.TEST_MODE === "playback");
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
      }
      else if (isPlayingBack) {
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
      }
      else if (isPlayingBack) {
        date = new Date(recorder.uniqueTestInfo[recorderId]);
      } else {
        date = new Date();
      }
      return date;
    }
  };
}
