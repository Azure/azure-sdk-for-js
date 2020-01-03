import { env } from "./utils";
import fs from "fs-extra";

// - jsonToFileReporter filters the JSON strings in console.logs.
// - Console logs with `.writeFile` property are captured and are written to a file(recordings).
// - The other console statements are captured and printed normally.
// - Example - console.warn("hello"); -> console.log({ warn: "hello" });
// - Example - console.log("hello"); -> console.log({ log: "hello" });

/**
 * When jsonRecordingFilterFunction is passed as a filter to `jsonToFileReporter` in karma.conf.js,
 * it captures the recordings(as JSON strings) from the console.logs.
 * @param obj
 */
export const jsonRecordingFilterFunction = function(obj: any) {
  if (env.TEST_MODE === "record") {
    if (obj.writeFile) {
      // Create the directories recursively incase they don't exist
      try {
        // Stripping away the filename from the file path and retaining the directory structure
        fs.ensureDirSync(obj.path.substring(0, obj.path.lastIndexOf("/") + 1));
      } catch (err) {
        if (err.code !== "EEXIST") throw err;
      }
      fs.writeFile(obj.path, JSON.stringify(obj.content, null, " "), (err: any) => {
        if (err) {
          throw err;
        }
      });
    } else {
      console.log(obj);
    }
    return false;
  }
};
