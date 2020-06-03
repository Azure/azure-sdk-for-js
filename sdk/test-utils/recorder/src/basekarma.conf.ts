import { isRecordMode } from "./utils";
import fs from "fs-extra";

// - jsonToFileReporter filters the JSON strings in console.logs.
// - Console logs with `.writeFile` property are captured and are written to a file(recordings).
// - The other console statements are captured and printed normally.
// - Example - console.warn("hello"); -> console.log({ warn: "hello" });
// - Example - console.log("hello"); -> console.log({ log: "hello" });

/**
 * When `jsonRecordingFilterFunction` is passed as a filter to `jsonToFileReporter` in karma.conf.js,
 * it captures the recordings(as JSON strings) from the console.logs.
 *
 * More Info -
 * 1. JSON objects with `writeFile` property are captured and saved as recordings as per the `path` property.
 * 2. If the captured object doesn't have the `writeFile` property, the object will be logged directly to the console.
 *
 * @param {{
 *   writeFile: boolean;
 *   path: string;
 *   content: string;
 * }} browserRecordingJsonObject
 * @returns
 */
export const jsonRecordingFilterFunction = function(browserRecordingJsonObject: {
  writeFile: boolean;
  path: string;
  content: string;
}) {
  if (isRecordMode()) {
    if (browserRecordingJsonObject.writeFile) {
      // Create the directories recursively incase they don't exist
      try {
        // Stripping away the filename from the file path and retaining the directory structure
        fs.ensureDirSync(
          browserRecordingJsonObject.path.substring(
            0,
            browserRecordingJsonObject.path.lastIndexOf("/") + 1
          )
        );
      } catch (err) {
        if (err.code !== "EEXIST") throw err;
      }
      fs.writeFile(
        browserRecordingJsonObject.path,
        JSON.stringify(browserRecordingJsonObject.content, null, " "),
        (err: any) => {
          if (err) {
            throw err;
          }
        }
      );
    } else {
      console.log(browserRecordingJsonObject);
    }
  }
};
