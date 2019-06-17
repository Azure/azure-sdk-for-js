import fs from "fs-extra";
import { delay as restDelay } from "@azure/ms-rest-js";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function escapeRegExp(str: string): string {
  return encodeURIComponent(str).replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}

let nock: any;
if (!isBrowser()) {
  nock = require("nock");
}

export const env = isBrowser() ? (window as any).__env__ : process.env;
const isRecording = env.TEST_MODE === "record";
const isPlayingBack = env.TEST_MODE === "playback";

// IMPORTANT: These are my attempts to make this more generic without changing it significantly
let replaceableVariables = {};
export function setReplaceableVariables(a: object): void {
  replaceableVariables = a;
  if (isPlayingBack) {
    // Providing dummy values to avoid the error
    Object.keys(a).map((k) => {
      env[k] = a[k];
    });
  }
}
let skip = [];
export function setSkip(a: string[]): void {
  skip = a;
}
let replacements = [];
export function setReplacements(maps: any): void {
  replacements = maps;
}

export function delay(milliseconds: number): Promise<void> {
  return isPlayingBack ? null : restDelay(milliseconds);
}

abstract class Recorder {
  protected readonly filepath: string;
  public uniqueTestInfo: any = {};

  constructor(env: string, testHierarchy: string, testTitle: string, ext: string) {
    this.filepath =
      env +
      "/" +
      this.formatPath(testHierarchy) +
      "/recording_" +
      this.formatPath(testTitle) +
      "." +
      ext;
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

  /**
   * Additional layer of security to avoid unintended/accidental occurrences of secrets in the recordings
   * */
  protected filterSecrets(recording: string): string {
    let updatedRecording = recording;
    let lastRecording = recording;
    for (let k of Object.keys(replaceableVariables)) {
      lastRecording = updatedRecording;
      const escaped = escapeRegExp(env[k]);
      updatedRecording = updatedRecording.replace(
        new RegExp(escaped, "g"),
        replaceableVariables[k]
      );
    }
    for (const map of replacements) {
      updatedRecording = map(updatedRecording);
    }
    return updatedRecording;
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
    const path = "../../recordings/" + this.filepath;
    this.uniqueTestInfo = require(path).testInfo;
  }

  public stop(): void {
    const importNock = "let nock = require('nock');\n";
    const fixtures = nock.recorder.play();

    // Create the directories recursively incase they don't exist
    try {
      // Stripping away the filename from the filepath and retaining the directory structure
      fs.ensureDirSync(
        "./recordings/" + this.filepath.substring(0, this.filepath.lastIndexOf("/") + 1)
      );
    } catch (err) {
      if (err.code !== "EEXIST") throw err;
    }

    const file = fs.createWriteStream("./recordings/" + this.filepath, {
      flags: "w"
    });

    // Some tests expect errors to happen and, if a writing error is thrown in one of these tests, it may be captured in a catch block by accident,
    // resulting in unexpected behavior. For this reason we're printing it to the console as well
    file.on("error", (err: any) => {
      console.log(err);
      throw err;
    });

    file.write(
      importNock + "\n" + "module.exports.testInfo = " + JSON.stringify(this.uniqueTestInfo) + "\n"
    );

    for (const fixture of fixtures) {
      // We're not matching query string parameters because they may contain sensitive information, and Nock does not allow us to customize it easily
      const updatedFixture = fixture.replace(/\.query\(.*\)/, ".query(true)");
      file.write(this.filterSecrets(updatedFixture) + "\n");
    }

    file.end();

    nock.recorder.clear();
    nock.restore();
  }
}

// To better understand how this class works, it's necessary to comprehend how HTTP async requests are made:
// A new request object is created
//    let req = new XMLHttpRequest();
// The request is opened with some replaceableVariableseq.open(method, url, async, user, password);
// Since we're dealing with an async request, we must set a way to know when the response is ready
//    req.onreadystatechange = function() {
//      if (req.readyState === 4) do_something;
//    }
// Finally, the request is sent to the server
//    req.send(data);

export function record(testContext: any) {
  let recorder: Recorder;
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
    // TODO:
    // recorder = new NiseRecorder(testHierarchy, testTitle);
  } else {
    recorder = new NockRecorder(testHierarchy, testTitle);
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
    newDate: function(recorderId: string): Date {
      let date: Date;
      if (isRecording) {
        date = new Date();
        recorder.uniqueTestInfo[recorderId] = date.toISOString();
      } else if (isPlayingBack) {
        date = new Date(recorder.uniqueTestInfo[recorderId]);
      } else {
        date = new Date();
      }
      return date;
    }
  };
}
