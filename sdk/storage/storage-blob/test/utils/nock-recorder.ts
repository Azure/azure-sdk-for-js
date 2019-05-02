import fs from "fs";
import nock from "nock";
import { getUniqueName } from "../utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const skip: any = [
  "highlevel/recording_bloburldownload_should_abort_after_retrys.js", // Recording too big: 15MB
  "highlevel/recording_bloburldownload_should_download_data_failed_when_exceeding_max_stream_retry_requests.js", // Recording too big: 15MB
  "highlevel/recording_bloburldownload_should_download_full_data_successfully_when_internal_stream_unexcepted_ends.js", // Recording too big: 30MB
  "highlevel/recording_bloburldownload_should_download_partial_data_when_internal_stream_unexcepted_ends.js", // Recording too big: 15MB
  "highlevel/recording_bloburldownload_should_success_when_internal_stream_unexcepted_ends_at_the_stream_end.js", // Recording too big: 30MB
  "highlevel/recording_downloadblobtobuffer_should_abort.js", // Recording too big: 263MB
  "highlevel/recording_downloadblobtobuffer_should_success.js", // Recording too big: 526MB
  "highlevel/recording_downloadblobtobuffer_should_update_progress_event.js", // Recording too big: 15MB
  "highlevel/recording_uploadfiletoblockblob_should_success_when_blob_gte_block_blob_max_upload_blob_bytes.js", // Recording too big: 526MB
  "highlevel/recording_uploadfiletoblockblob_should_success_when_blob_lt_block_blob_max_upload_blob_bytes.js", // Recording too big: 30MB
  "highlevel/recording_uploadfiletoblockblob_should_success_when_blob_lt_block_blob_max_upload_blob_bytes_and_configured_maxsingleshotsize.js", // Recording too big: 30MB
  "highlevel/recording_uploadfiletoblockblob_should_update_progress_when_blob_gte_block_blob_max_upload_blob_bytes.js", // Recording too big: 4MB
  "highlevel/recording_uploadstreamtoblockblob_should_success.js", // Recording too big: 526MB
  "highlevel/recording_uploadstreamtoblockblob_should_success_for_tiny_buffers.js", // Not working (needs debugging)
  "highlevel/recording_uploadstreamtoblockblob_should_update_progress_event.js" // Recording too big: 263MB
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

export function record(this: any, folderpath: string, testTitle?: string): { [key: string]: any } {
  const filename = "recording_" + (testTitle || this.currentTest.title);
  const fp = formatPath(folderpath) + "/" + formatPath(filename) + ".js";
  const importNock = "let nock = require('nock');\n";
  let uniqueTestInfo: any = {};

  const isRecording = (process.env.TEST_MODE === "record");
  const isPlayingBack = (process.env.TEST_MODE === "playback");

  if (skip.includes(fp) && (isRecording || isPlayingBack)) {
    this.skip();
  }

  if (isRecording) {
    nock.recorder.rec({
      dont_print: true
    });
  } else if (isPlayingBack) {
    uniqueTestInfo = require("../../recordings/" + fp).testInfo;
  }

  return {
    stop: function() {
      if (isRecording) {
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
