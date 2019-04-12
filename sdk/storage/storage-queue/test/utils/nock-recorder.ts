import fs from "fs";
import nock from "nock";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

export function record(folderpath: string, filename: string): { [key: string]: any } {
  let fp = folderpath.toLowerCase().replace(/ /g, "_") + "/recording_" + filename.toLowerCase().replace(/ /g, "_") + ".js";
  let importNock = "let nock = require('nock');\n";
  let uniqueTestInfo = {};
  return {
    before: function() {
      if (process.env.TEST_MODE === "record") {
        nock.recorder.rec({
          dont_print: true
        });
        return uniqueTestInfo;
      } else if (process.env.TEST_MODE === "playback") {
        require("../../recordings/" + fp);
        uniqueTestInfo = require("../../recordings/" + fp).testInfo;
        return uniqueTestInfo;
      }
    },
    after: function(testInfo?: any) {
      if (process.env.TEST_MODE === "record") {
        let fixtures = nock.recorder.play();
        let nockScript =
          importNock + "\n" + "module.exports.testInfo = " + JSON.stringify(testInfo) + "\n" + fixtures.join("\n");
        fs.writeFile("./recordings/" + fp, nockScript, function(err) {
          if (err) {
            return console.log(err);
          }
        });
        nock.restore();
      }
    }
  };
}
