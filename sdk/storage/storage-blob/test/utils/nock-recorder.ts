import fs from "fs";
import nock from "nock";
import { getUniqueName } from "../utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const skip: any = [
];

export function record(this: any, folderpath: string, testTitle?: string): { [key: string]: any } {
  const filename = "recording_" + (testTitle || this.currentTest.title);
  const fp = folderpath.toLowerCase().replace(/ /g, "_").replace(/\W/g, "") +
    "/" + filename.toLowerCase().replace(/ /g, "_").replace(/\W/g, "") + ".js";
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
