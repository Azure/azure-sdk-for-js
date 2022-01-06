// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { FileSystemPersist } from "../../src/platform/nodejs/persist/fileSystemPersist";
import { TelemetryItem as Envelope } from "../../src/generated";
import { promisify } from "util";

const statAsync = promisify(fs.stat);
const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

const instrumentationKey = "abc";
const tempDir = path.join(os.tmpdir(), `${FileSystemPersist.TEMPDIR_PREFIX}${instrumentationKey}`);

const deleteFolderRecursive = (dirPath: string): void => {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = `${dirPath}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
};

const assertFirstFile = async (tempDir: string, expectation: unknown): Promise<void> => {
  // Assert that tempDir is a directory
  const stats = await statAsync(tempDir);
  assert.strictEqual(stats.isDirectory(), true);

  // Read the first file in tempDir
  const origFiles = await readdirAsync(tempDir);
  const files = origFiles.filter((f) => path.basename(f).includes(".ai.json"));
  assert.ok(files.length > 0);

  // Assert file matches expectation
  const firstFile = files[0];
  const filePath = path.join(tempDir, firstFile);
  const payload = await readFileAsync(filePath);
  assert.deepStrictEqual(JSON.parse(payload.toString()), JSON.parse(JSON.stringify(expectation)));

  // Cleanup
  await unlinkAsync(filePath);
};

describe("FileSystemPersist", () => {
  beforeEach(() => {
    deleteFolderRecursive(tempDir);
  });

  afterEach((done) => {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        done();
      } else {
        assert.deepStrictEqual(files, []);
        done();
      }
    });
  });

  describe("#push()", () => {
    it("should store to disk the value provided", async () => {
      const envelope: Envelope = {
        name: "name",
        time: new Date(),
      };
      const persister = new FileSystemPersist({ instrumentationKey });
      const envelopes = [envelope];
      const success = await persister.push(envelopes);
      assert.strictEqual(success, true);

      /**
       * Note: parse(stringify(envelopes)) is because we are storing an Envelope class instance.
       * When writing a class instance to file, it does not store class constructors,
       * functions, etc. So we are asserting on a serialized "object" here.
       * */
      await assertFirstFile(tempDir, JSON.parse(JSON.stringify(envelopes)));
    });

    it("should store to disk several values", async () => {
      const envelopes: Envelope[] = new Array(10).fill({
        name: "name",
        time: new Date(),
      });
      const persister = new FileSystemPersist({ instrumentationKey });

      const success = (
        await Promise.all(new Array(50).fill(null).map(() => persister.push(envelopes)))
      ).reduce((count, v) => (v === true ? count + 1 : count), 0);
      assert.strictEqual(success, 50);
      deleteFolderRecursive(tempDir);
    });
  });

  describe("#shift()", () => {
    it("should not crash if folder does not exist", () => {
      const persister = new FileSystemPersist({ instrumentationKey });
      assert.doesNotThrow(async () => {
        await persister.shift();
      });
    });

    it("should not crash if file does not exist", () => {
      const persister = new FileSystemPersist({ instrumentationKey });
      const mkdirAsync = promisify(fs.mkdir);
      assert.doesNotThrow(async () => {
        await mkdirAsync(tempDir);
        await persister.shift();
      });
    });

    it("should get the first file on disk and return it", async () => {
      const sleep = promisify(setTimeout);
      const persister = new FileSystemPersist({ instrumentationKey });

      const firstBatch = [{ batch: "first" }];
      const secondBatch = [{ batch: "second" }];
      const success1 = await persister.push(firstBatch);
      assert.strictEqual(success1, true);
      // wait 1 ms so that we don't overwrite previous file
      await sleep(1);
      const success2 = await persister.push(secondBatch);
      assert.strictEqual(success2, true);
      const value1 = await persister.shift();
      assert.deepStrictEqual(value1, firstBatch);
      const value2 = await persister.shift();
      assert.deepStrictEqual(value2, secondBatch);
    });
  });

  describe("#fileCleanupTask()", () => {
    it("must clean old files from temp location", async () => {
      const sleep = promisify(setTimeout);
      const persister = new FileSystemPersist({ instrumentationKey });
      const firstBatch = [{ batch: "first" }];
      const success1 = await persister.push(firstBatch);
      assert.strictEqual(success1, true);
      persister.fileRetemptionPeriod = 1;
      // wait 100 ms
      await sleep(100);
      const cleanup = await persister["_fileCleanupTask"]();
      assert.strictEqual(cleanup, true);
      const fileValue = await persister.shift();
      assert.deepStrictEqual(fileValue, null); // File doesn't exist anymore
    });
  });
});
