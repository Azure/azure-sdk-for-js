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
  protected filename: string;
  protected fp!: string;
  public uniqueTestInfo: any;

  constructor(testTitle: string) {
    this.filename = "recording_" + testTitle;
    this.uniqueTestInfo = {};
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
    return skip.includes(this.fp);
  }

  public abstract record(): void;
  public abstract playback(): void;
  public abstract stop(): void;
}

class NockRecorder extends Recorder {
  constructor(folderpath: string, testTitle: string) {
    super(testTitle);
    this.fp = "node/" + this.formatPath(folderpath) + "/" + this.formatPath(this.filename) + ".js";
  }

  public record(): void {
    nock.recorder.rec({
      dont_print: true
    });
  }

  public playback(): void {
    this.uniqueTestInfo = require("../recordings/" + this.fp).testInfo;
  }

  public stop(): void {
    const importNock = "let nock = require('nock');\n";
    const fixtures = nock.recorder.play();

    const file = fs.createWriteStream("./recordings/" + this.fp, { flags: "w" });
    file.on("error", err => console.log(err));
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
  private recordings: any[];
  private xhr: nise.FakeXMLHttpRequestStatic;

  constructor(folderpath: string, testTitle: string) {
    super(testTitle);
    this.fp = "browsers/" + this.formatPath(folderpath) + "/" + this.formatPath(this.filename) + ".json";
    this.recordings = [];
    this.xhr = nise.fakeXhr.useFakeXMLHttpRequest();
  }

  private async recordRequest(req: any, data: any): Promise<void> {
    const responseHeaders: any = {};
    const responseHeadersPairs = req.getAllResponseHeaders().split("\r\n");
    for (const pair of responseHeadersPairs) {
      const [key, value] = pair.split(": ");
      responseHeaders[key] = value;
    }

    const parsedUrl = queryString.parseUrl(req.url);

    this.recordings.push({
      method: req.method,
      url: parsedUrl.url,
      query: parsedUrl.query,
      requestBody: (data instanceof Blob) ? await blobToString(data) : data,
      status: req.status,
      response: (req.response instanceof Blob) ? await blobToString(req.response) : req.response,
      responseHeaders: responseHeaders
    });
  }

  // We're not matching request headers
  private matchRequest(recording: any, request: any): boolean {
    for (const param in recording.query) {
      if (recording.query[param] !== request.query[param] && param !== "_") {
        return false;
      }
    }

    for (const param in request.query) {
      if (recording.query[param] === undefined) {
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

    this.recordings = (window as any).__json__["recordings/" + this.fp].recordings;
    this.uniqueTestInfo = (window as any).__json__["recordings/" + this.fp].uniqueTestInfo;

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

        if (!recordingFound) {
          throw new Error("No match for request " + JSON.stringify(formattedRequest, null, " "));
        }
      }
    }
  }

  public stop(): void {
    console.log(JSON.stringify({
      writeFile: true,
      path: "./recordings/" + this.fp,
      content: { recordings: this.recordings, uniqueTestInfo: this.uniqueTestInfo }
    }));
    this.xhr.restore();
  }
}

export function record(this: any, folderpath: string, testTitle?: string) {
  let recorder: Recorder;
  let isRecording: boolean;
  let isPlayingBack: boolean;

  if (isBrowser()) {
    recorder = new NiseRecorder(folderpath, testTitle || this.currentTest.title);
    isRecording = ((window as any).__env__.TEST_MODE === "record");
    isPlayingBack = ((window as any).__env__.TEST_MODE === "playback");
  } else {
    recorder = new NockRecorder(folderpath, testTitle || this.currentTest.title);
    isRecording = (process.env.TEST_MODE === "record");
    isPlayingBack = (process.env.TEST_MODE === "playback");
  }

  if (recorder.skip() && (isRecording || isPlayingBack)) {
    this.skip();
  }

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
