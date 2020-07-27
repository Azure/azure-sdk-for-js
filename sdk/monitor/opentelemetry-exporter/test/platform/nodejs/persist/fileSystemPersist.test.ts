import * as assert from "assert";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { FileSystemPersist } from "../../../../src/platform/nodejs/persist/fileSystemPersist";
import { Envelope } from "../../../../src/Declarations/Contracts";

const deleteFolderRecursive = (dirPath: string) => {
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

const assertFirstFile = (tempDir: string, expectation: unknown, done: Mocha.Done) => {
  fs.stat(tempDir, (statErr: Error | null, stats: fs.Stats) => {
    if (statErr) {
      done(statErr);
    }
    if (stats.isDirectory()) {
      fs.readdir(tempDir, (error, origFiles) => {
        if (!error) {
          const files = origFiles.filter((f) => path.basename(f).includes(".ai.json"));
          if (files.length > 0) {
            const firstFile = files[0];
            const filePath = path.join(tempDir, firstFile);
            fs.readFile(filePath, (readFileErr, payload) => {
              assert.deepStrictEqual(
                JSON.parse(payload.toString()),
                JSON.parse(JSON.stringify(expectation))
              );
              if (!readFileErr) {
                // delete the file first to prevent double sending
                fs.unlink(filePath, (unlinkError) => {
                  if (!unlinkError) {
                    done();
                  } else {
                    done(unlinkError);
                  }
                });
              } else {
                done(readFileErr);
              }
            });
          }
        } else {
          done(error);
        }
      });
    }
  });
};

describe("FileSystemPersist", () => {
  const instrumentationKey = "abc";
  const tempDir = path.join(
    os.tmpdir(),
    `${FileSystemPersist.TEMPDIR_PREFIX}${instrumentationKey}`
  );

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
    it("should store to disk the value provided", (done) => {
      const persister = new FileSystemPersist({ instrumentationKey });
      const envelopes = [new Envelope()];
      persister.push(envelopes, (err, success) => {
        assert.strictEqual(err, null);
        assert.strictEqual(success, true);

        /**
         * Note: parse(stringify(envelopes)) is because we are storing an Envelope class instance.
         * When writing a class instance to file, it does not store class constructors,
         * functions, etc. So we are asserting on a serialized "object" here.
         * */
        assertFirstFile(tempDir, JSON.parse(JSON.stringify(envelopes)), done);
      });
    });
  });

  describe("#shift()", () => {
    it("should not crash if folder does not exist", (done) => {
      const persister = new FileSystemPersist({ instrumentationKey });
      persister.shift((err) => {
        assert.strictEqual(err, null);
        done();
      });
    });

    it("should not crash if file does not exist", (done) => {
      const persister = new FileSystemPersist({ instrumentationKey });
      fs.mkdir(tempDir, () => {
        persister.shift((err) => {
          assert.strictEqual(err, null);
          done();
        });
      });
    });

    it("should get the first file on disk and return it", (done) => {
      const persister = new FileSystemPersist({ instrumentationKey });

      const firstBatch = [{ batch: "first" }];
      const secondBatch = [{ batch: "second" }];
      persister.push(firstBatch, (err1, success1) => {
        assert.strictEqual(err1, null);
        assert.strictEqual(success1, true);
        setTimeout(() => {
          // wait 1 ms so that we don't overwrite previous file
          persister.push(secondBatch, (err2, success2) => {
            assert.strictEqual(err2, null);
            assert.strictEqual(success2, true);
            persister.shift((errRead1, value1) => {
              assert.strictEqual(errRead1, null);
              assert.deepStrictEqual(value1, firstBatch);
              persister.shift((errRead2, value2) => {
                assert.strictEqual(errRead2, null);
                assert.deepStrictEqual(value2, secondBatch);
                done();
              });
            });
          });
        }, 1);
      });
    });
  });
});
