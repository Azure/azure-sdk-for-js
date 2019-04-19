import fs from "fs";
import nock from "nock";
import { getUniqueName } from "../utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

export function record(folderpath: string, filename: string): { [key: string]: any } {
  let fp = folderpath.toLowerCase().replace(/ /g, "_") + "/recording_" + filename.toLowerCase().replace(/ /g, "_") + ".js";
  let importNock = "let nock = require('nock');\n";
  let uniqueTestInfo: any = {};
  return {
    before: function() {
      if (process.env.TEST_MODE === "playback") {
        uniqueTestInfo = require("../../recordings/" + fp).testInfo;
      } else {
        nock.recorder.rec({
          dont_print: true
        });
      }
    },
    after: function() {
      if (process.env.TEST_MODE !== "playback") {
        let fixtures = nock.recorder.play();
        let nockScript =
          importNock + "\n" + "module.exports.testInfo = " + JSON.stringify(uniqueTestInfo) + "\n" + fixtures.join("\n");
        fs.writeFile("./recordings/" + fp, nockScript, function(err) {
          if (err) {
            return console.log(err);
          }
        });
        nock.recorder.clear();
        nock.restore();
      }
    },
    getUniqueName: function(prefix: string, recorderId?: string): string {
      let name: string;
      if (!recorderId) {
        recorderId = prefix;
      }
      if (process.env.TEST_MODE === "playback") {
        name = uniqueTestInfo[recorderId];
      } else {
        name = getUniqueName(prefix);
        uniqueTestInfo[recorderId] = name;
      }
      return name!;
    }
  };
}
