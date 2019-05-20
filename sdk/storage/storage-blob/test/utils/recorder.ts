import fs from "fs";
import nise from "nise";
import { bodyToString, getUniqueName, isBrowser } from "../utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

let nock: any;
if (!isBrowser()) {
  nock = require("nock");
}

/**
 * Possible reasons for skipping a test:
 * * Abort: browser testing unexpectedly finishes when a request is aborted during playback (unknown reason; probably related to the way nise handles it)
 * * Character: there are characters in the message that are not supported in browser logging
 * * Progress: Nock does not record a request if it's aborted in a 'progress' callback
 * * Size: the generated recording file is too big and would considerably increase the size of the package
 * * Tempfile: the request makes use of a random tempfile created locally, and the recorder does not support recording it as unique information
 * * UUID: a UUID is randomly generated within the SDK and used in an HTTP request, resulting in Nock being unable to recognize it
*/
const skip: any = [
  // Abort
  "browsers/aborter/recording_should_abort_after_aborter_timeout.json",
  // Abort
  "browsers/aborter/recording_should_abort_after_father_aborter_calls_abort.json",
  // Abort
  "browsers/aborter/recording_should_abort_after_father_aborter_timeout.json",
  // Abort
  "browsers/aborter/recording_should_abort_when_calling_abort_before_request_finishes.json",
  // Fake XMLHttpRequest failed
  "browsers/bloburl/recording_download_all_parameters_set.json",
  // Fake XMLHttpRequest failed
  "browsers/bloburl/recording_download_with_with_default_parameters.json",
  // Progress, Size (15MB), Tempfile
  "node/highlevel/recording_bloburldownload_should_abort_after_retrys.js",
  // Size (15MB), Tempfile
  "node/highlevel/recording_bloburldownload_should_download_data_failed_when_exceeding_max_stream_retry_requests.js",
  // Size (30MB), Tempfile
  "node/highlevel/recording_bloburldownload_should_download_full_data_successfully_when_internal_stream_unexcepted_ends.js",
  // Size (15MB), Tempfile
  "node/highlevel/recording_bloburldownload_should_download_partial_data_when_internal_stream_unexcepted_ends.js",
  // Size (30MB), Tempfile
  "node/highlevel/recording_bloburldownload_should_success_when_internal_stream_unexcepted_ends_at_the_stream_end.js",
  // Size (263MB), Tempfile, UUID (uploadStreamToBlockBlob)
  "node/highlevel/recording_downloadblobtobuffer_should_abort.js",
  // Size (526MB), Tempfile, UUID (uploadStreamToBlockBlob)
  "node/highlevel/recording_downloadblobtobuffer_should_success.js",
  // Progress, Size (15MB), Tempfile, UUID (uploadStreamToBlockBlob)
  "node/highlevel/recording_downloadblobtobuffer_should_update_progress_event.js",
  // Size (526MB), Tempfile
  "node/highlevel/recording_uploadfiletoblockblob_should_success_when_blob_gte_block_blob_max_upload_blob_bytes.js",
  // Size (30MB), Tempfile
  "node/highlevel/recording_uploadfiletoblockblob_should_success_when_blob_lt_block_blob_max_upload_blob_bytes.js",
  // Size (30MB), Tempfile
  "node/highlevel/recording_uploadfiletoblockblob_should_success_when_blob_lt_block_blob_max_upload_blob_bytes_and_configured_maxsingleshotsize.js",
  // Progress, Size (4MB), Tempfile
  "node/highlevel/recording_uploadfiletoblockblob_should_update_progress_when_blob_gte_block_blob_max_upload_blob_bytes.js",
  // Progress, Tempfile
  "node/highlevel/recording_uploadfiletoblockblob_should_update_progress_when_blob_lt_block_blob_max_upload_blob_bytes.js",
  // Size (526MB), Tempfile, UUID (uploadStreamToBlockBlob)
  "node/highlevel/recording_uploadstreamtoblockblob_should_success.js",
  // UUID (uploadStreamToBlockBlob)
  "node/highlevel/recording_uploadstreamtoblockblob_should_success_for_tiny_buffers.js",
  // Size (263MB), Tempfile, UUID (uploadStreamToBlockBlob)
  "node/highlevel/recording_uploadstreamtoblockblob_should_update_progress_event.js"
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
  const fp = "node/" + formatPath(folderpath) + "/" + formatPath(filename) + ".js";
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
      uniqueTestInfo = require("../../recordings/" + fp).testInfo;
    },
    stop: function() {
      let fixtures = nock.recorder.play();
      let file = fs.createWriteStream("./recordings/" + fp, { flags: "w" });
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
  const fp = "browsers/" + formatPath(folderpath) + "/" + formatPath(filename) + ".json";
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

          const reqSend = req.send;
          req.send = function(data: any) {
            const reqStateChange = req.onreadystatechange;
            req.onreadystatechange = function() {
              if (req.readyState === 4) {
                recordRequest(req, data);
              }
              reqStateChange && reqStateChange.apply(null, arguments);
            }
            reqSend.apply(req, arguments);
          }
        }
      }

      async function recordRequest(req: any, requestBody: any) {
        let response: string;

        if (req.responseType === "blob") {
          response = await bodyToString({ blobBody: req.response });
        } else {
          response = req.response;
        }

        const responseHeaders: any = {};
        const responseHeadersPairs = req.getAllResponseHeaders().split("\r\n");
        for (const pair of responseHeadersPairs) {
          const [key, value] = pair.split(": ");
          responseHeaders[key] = value;
        }

        recordings.push({
          method: req.method,
          url: req.url.split("?")[0],
          requestBody: requestBody,
          status: req.status,
          response: response,
          responseHeaders: responseHeaders
        });
      }
    },
    playback: function() {
      xhr = nise.fakeXhr.useFakeXMLHttpRequest();
      recordings = (window as any).__json__["recordings/" + fp].recordings;
      uniqueTestInfo = (window as any).__json__["recordings/" + fp].uniqueTestInfo;

      xhr.onCreate = function(req: any) {
        const reqSend = req.send;
        req.send = function(data: any) {
          reqSend.apply(req, arguments);

          let recordingFound = false;
          for (let i = 0; !recordingFound && i < recordings.length; i++) {
            if (matchRequest(recordings[i], req)) {
              let status = recordings[i].status;
              let responseHeaders = recordings[i].responseHeaders;
              let response = recordings[i].response;
              setTimeout(() => req.respond(status, responseHeaders, response));
              recordings.splice(i, 1);
              recordingFound = true;
            }
          }

          if (!recordingFound) {
            throw new Error("No match for request " + JSON.stringify({
              method: req.method,
              url: req.url.split("?")[0],
              requestBody: data
            }, null, " "));
          }
        }
      }

      // We're not matching request headers nor query string parameters
      function matchRequest(recording: any, req: any): boolean {
        return (
          recording.method === req.method &&
          recording.url === req.url.split("?")[0] &&
          recording.requestBody === req.requestBody
        );
      }
    },
    stop: function() {
      console.log(JSON.stringify({
        writeFile: true,
        path: "./recordings/" + fp,
        content: { recordings: recordings, uniqueTestInfo: uniqueTestInfo }
      }));
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
