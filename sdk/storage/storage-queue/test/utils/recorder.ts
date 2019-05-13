import fs from "fs";
import nise from "nise";
import { getUniqueName } from "../utils";
import { isBrowser } from "./testutils.common";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

let nock: any;
if (!isBrowser()) {
  nock = require("nock");
}

function writeFileInBrowser(_filename: string, _obj: any) {
  // TODO
}

/**
 * Possible reasons for skipping a test:
 * * Progress: Nock does not record a request if it's aborted in a 'progress' callback
 * * Size: the generated recording file is too big and would considerably increase the size of the package
 * * Tempfile: the request makes use of a random tempfile created locally, and the recorder does not support recording it as unique information
 * * UUID: a UUID is randomly generated within the SDK and used in an HTTP request, resulting in Nock being unable to recognize it
*/
const skip: any = [
];

function formatPath(path: string): string {
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

function nockRecorder(folderpath: string, testTitle: string) {
  const filename = "recording_" + testTitle;
  const fp = formatPath(folderpath) + "/" + formatPath(filename) + ".js";
  const importNock = "let nock = require('nock');\n";
  let uniqueTestInfo: any = {};

  return {
    skip: skip.includes(fp),
    getUniqueTestInfoHandle: () => uniqueTestInfo,
    record: function() {
      nock.recorder.rec({
        dont_print: true
      });
    },
    playback: function() {
      uniqueTestInfo = require("../../recordings/node/" + fp).testInfo;
    },
    stop: function() {
      let fixtures = nock.recorder.play();
      let file = fs.createWriteStream("./recordings/node/" + fp, { flags: "w" });
      file.on("error", err => console.log(err));
      file.write(importNock + "\n" + "module.exports.testInfo = " + JSON.stringify(uniqueTestInfo) + "\n");
      for (let i = 0; i < fixtures.length; i++) {
        file.write(fixtures[i] + "\n");
      }
      file.end();
      nock.recorder.clear();
      nock.restore();
    }
  };
}

function niseRecorder(folderpath: string, testTitle: string) {
  const filename = "recording_" + testTitle;
  const fp = formatPath(folderpath) + "/" + formatPath(filename) + ".json";
  let uniqueTestInfo: any = {};
  let recordings: any[] = [];
  let xhr: nise.FakeXMLHttpRequestStatic;

  return {
    skip: skip.includes(fp),
    getUniqueTestInfoHandle: () => uniqueTestInfo,
    record: function() {
      xhr = nise.fakeXhr.useFakeXMLHttpRequest();
      xhr.useFilters = true;
      xhr.addFilter(() => true);

      xhr.onCreate = function(req: any) {
        const reqOpen = req.open;
        req.open = function() {
          reqOpen.apply(req, arguments);

          const requestHeaders: any = {};
          const reqSetReqHeader = req.setRequestHeader;
          req.setRequestHeader = function(header: string, value: any) {
            requestHeaders[header] = value;
            reqSetReqHeader.apply(req, arguments);
          }

          const reqSend = req.send;
          req.send = function() {
            const reqStateChange = req.onreadystatechange;
            req.onreadystatechange = function() {
              if (req.readyState === 4) {
                recordRequest(req, requestHeaders);
              }
              reqStateChange && reqStateChange.apply(null, arguments);
            }
            reqSend.apply(req, arguments);
          }
        }
      }

      function recordRequest(req: any, requestHeaders: any[]) {
        const responseHeaders: any = {};
        const responseHeadersPairs = req.getAllResponseHeaders().split("\r\n");
        for (const pair of responseHeadersPairs) {
          const [key, value] = pair.split(": ");
          responseHeaders[key] = value;
        }

        recordings.push({
          method: req.method,
          url: req.url,
          requestBody: req.requestBody,
          requestHeaders: requestHeaders,
          status: req.status,
          response: req.response,
          responseHeaders: responseHeaders
        });
      }
    },
    playback: function() {
    },
    stop: function() {
      writeFileInBrowser("./recordings/browser/" + fp, {
        recordings: recordings,
        uniqueTestInfo: uniqueTestInfo
      });
      xhr.restore();
    }
  };
}

export function record(this: any, folderpath: string, testTitle?: string) {
  let recorder: any;
  let isRecording: boolean;
  let isPlayingBack: boolean;

  if (isBrowser()) {
    recorder = niseRecorder(folderpath, testTitle || this.currentTest.title);
    isRecording = ((window as any).__env__.TEST_MODE === "record");
    isPlayingBack = ((window as any).__env__.TEST_MODE === "playback");
  } else {
    recorder = nockRecorder(folderpath, testTitle || this.currentTest.title);
    isRecording = (process.env.TEST_MODE === "record");
    isPlayingBack = (process.env.TEST_MODE === "playback");
  }

  if (recorder.skip && (isRecording || isPlayingBack)) {
    this.skip();
  }

  if (isRecording) {
    recorder.record();
  } else if (isPlayingBack) {
    recorder.playback();
  }

  const uniqueTestInfo = recorder.getUniqueTestInfoHandle();

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
        uniqueTestInfo[recorderId] = name;
      }
      else if (isPlayingBack) {
        name = uniqueTestInfo[recorderId];
      } else {
        name = getUniqueName(prefix);
      }
      return name;
    },
    newDate: function(recorderId: string): Date {
      let date: Date;
      if (isRecording) {
        date = new Date();
        uniqueTestInfo[recorderId] = date.toISOString();
      }
      else if (isPlayingBack) {
        date = new Date(uniqueTestInfo[recorderId]);
      } else {
        date = new Date();
      }
      return date;
    }
  };
}
