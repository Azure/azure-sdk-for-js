import {
  generateTestRecordingFilePath,
  isBrowser,
  testHasChanged,
  isContentTypeInNockFixture,
  decodeHexEncodingIfExistsInNockFixture,
  handleSingleQuotesInUrlPath
} from "../../src/utils";

import { nodeRequireRecordingIfExists, findRecordingsFolderPath } from "../../src/utils/recordings";

import chai, { expect } from "chai";

describe("NodeJS utils", () => {
  describe("nodeRequireRecordingIfExists", () => {
    it("should be able to load the contents of a recording file if the file exists", function() {
      const mockFs = require("mock-fs");
      const mockRequire = require("mock-require");

      // This needs to change if findRecordingsFolderPath changes.
      mockFs({
        // Our lazy require doesn't use the fs module internally.
        "recordings/recording.json": "",
        "test/myTest.spec.ts": "",
        "../../sdk/": {},
        "../../../rush.json": ""
      });

      const path = require("path");
      const testAbsolutePath = path.resolve("test/myTest.spec.ts");

      // If rollup bundle is used to execute the tests - `dist-test/index.node.js`, `recordings` folder is present one level above.
      mockRequire("../recordings/recording.json", {
        property: "value"
      });

      // If the dist-esm files are used to execute the tests - `dist-esm/test/node/utils.spec.js`, `recordings` folder is present three levels above.
      mockRequire("../../../recordings/recording.json", {
        property: "value"
      });

      expect(nodeRequireRecordingIfExists("recording.json", testAbsolutePath).property).to.equal(
        "value"
      );

      mockFs.restore();
      mockRequire.stopAll();
    });

    it("should throw if the file at a given recording path doesn't exist", function() {
      if (isBrowser()) {
        this.skip();
      }

      // Require shouldn't be mocked in this test since we should be preventing require from being reached.

      const mockFs = require("mock-fs");

      // This needs to change if findRecordingsFolderPath changes.
      mockFs({
        recordings: {},
        "test/myTest.spec.ts": "",
        "../../sdk/": {},
        "../../../rush.json": ""
      });

      const path = require("path");
      const testAbsolutePath = path.resolve("test/myTest.spec.ts");

      let error: Error | undefined;

      try {
        nodeRequireRecordingIfExists("recording.json", testAbsolutePath);
      } catch (e) {
        error = e;
      }

      expect(error!.message).to.equal(
        `The recording recording.json was not found in ${findRecordingsFolderPath(
          "recording.json"
        )}`
      );

      mockFs.restore();
    });
  });

  describe("testHasChanged", () => {
    it("should not crash if the recorded file doesn't exist", function() {
      const mockFs = require("mock-fs");
      const mockRequire = require("mock-require");
      const testSuiteTitle = this.test!.parent!.fullTitle();
      const testTitle = this.test!.title;

      // This needs to change if findRecordingsFolderPath changes.
      mockFs({
        // Our lazy require doesn't use the fs module internally.
        recordings: {},
        "test/myTest.spec.ts": "",
        "../../sdk/": {},
        "../../../rush.json": ""
      });

      // We won't be testing whether MD5 works or not.
      const newHash = "new hash";

      const path = require("path");
      const testAbsolutePath = path.resolve("test/myTest.spec.ts");

      expect(testHasChanged(testSuiteTitle, testTitle, testAbsolutePath, newHash)).to.equal(true);

      mockFs.restore();
      mockRequire.stopAll();
    });

    it("should return true if the older hash doesn't exist", function() {
      const mockFs = require("mock-fs");
      const mockRequire = require("mock-require");
      const platform = "node";
      const testSuiteTitle = this.test!.parent!.fullTitle();
      const testTitle = this.test!.title;
      const filePath = generateTestRecordingFilePath(platform, testSuiteTitle, testTitle);

      // This needs to change if findRecordingsFolderPath changes.
      mockFs({
        // Our lazy require doesn't use the fs module internally.
        [`recordings/${filePath}`]: "",
        "test/myTest.spec.ts": "",
        "../../sdk/": {},
        "../../../rush.json": ""
      });

      mockRequire(`../recordings/${filePath}`, {});

      // We won't be testing whether MD5 works or not.
      const newHash = "new hash";

      const path = require("path");
      const testAbsolutePath = path.resolve("test/myTest.spec.ts");

      expect(testHasChanged(testSuiteTitle, testTitle, testAbsolutePath, newHash)).to.equal(true);

      mockFs.restore();
      mockRequire.stopAll();
    });

    it("should return false if the older hash is the same as the new hash", function() {
      const mockFs = require("mock-fs");
      const mockRequire = require("mock-require");
      const platform = "node";
      const testSuiteTitle = this.test!.parent!.fullTitle();
      const testTitle = this.test!.title;
      const filePath = generateTestRecordingFilePath(platform, testSuiteTitle, testTitle);

      // This needs to change if findRecordingsFolderPath changes.
      mockFs({
        // Our lazy require doesn't use the fs module internally.
        [`recordings/${filePath}`]: "",
        "test/myTest.spec.ts": "",
        "../../sdk/": {},
        "../../../rush.json": ""
      });

      // If rollup bundle is used to execute the tests - `dist-test/index.node.js`, `recordings` folder is present one level above.
      mockRequire(`../recordings/${filePath}`, {
        // We won't be testing whether MD5 works or not.
        hash: "same old hash"
      });

      // If the dist-esm files are used to execute the tests - `dist-esm/test/node/utils.spec.js`, `recordings` folder is present three levels above.
      mockRequire(`../../../recordings/${filePath}`, {
        // We won't be testing whether MD5 works or not.
        hash: "same old hash"
      });

      // We won't be testing whether MD5 works or not.
      const newHash = "same old hash";

      const path = require("path");
      const testAbsolutePath = path.resolve("test/myTest.spec.ts");

      expect(testHasChanged(testSuiteTitle, testTitle, testAbsolutePath, newHash)).to.equal(false);

      mockFs.restore();
      mockRequire.stopAll();
    });

    it("should return true if the older hash is different than the new hash", function() {
      const mockFs = require("mock-fs");
      const mockRequire = require("mock-require");
      const platform = "node";
      const testSuiteTitle = this.test!.parent!.fullTitle();
      const testTitle = this.test!.title;
      const filePath = generateTestRecordingFilePath(platform, testSuiteTitle, testTitle);

      // This needs to change if findRecordingsFolderPath changes.
      mockFs({
        // Our lazy require doesn't use the fs module internally.
        [`recordings/${filePath}`]: "",
        "test/myTest.spec.ts": "",
        "../../sdk/": {},
        "../../../rush.json": ""
      });

      mockRequire(`../recordings/${filePath}`, {
        // We won't be testing whether MD5 works or not.
        hash: "old hash"
      });

      // We won't be testing whether MD5 works or not.
      const newHash = "new hash";

      const path = require("path");
      const testAbsolutePath = path.resolve("test/myTest.spec.ts");

      expect(testHasChanged(testSuiteTitle, testTitle, testAbsolutePath, newHash)).to.equal(true);

      mockFs.restore();
      mockRequire.stopAll();
    });
  });

  describe("decodeHexEncodingIfExistsInNockFixture", () => {
    [
      {
        name: `Hex encoding decodes for "avro/binary" content type`,
        input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/path', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><Expression>select * from BlobStorage</Expression></QueryRequest>")
  .query(true)
  .reply(200, "4f626a0131c2", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'avro/binary',
  'Last-Modified',
  'Thu, 20 Aug 2020 09:22:11 GMT',
]);`,
        output: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/path', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><Expression>select * from BlobStorage</Expression></QueryRequest>")
  .query(true)
  .reply(200, Buffer.from("4f626a0131c2", "hex"), [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'avro/binary',
  'Last-Modified',
  'Thu, 20 Aug 2020 09:22:11 GMT',
]);`
      },
      {
        name: `Hex encoding is not decoded for "something/else" content type`,
        input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/path', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><Expression>select * from BlobStorage</Expression></QueryRequest>")
  .query(true)
  .reply(200, "4f626a0131c2", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'something/else',
  'Last-Modified',
  'Thu, 20 Aug 2020 09:22:11 GMT',
]);`,
        output: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/path', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><Expression>select * from BlobStorage</Expression></QueryRequest>")
  .query(true)
  .reply(200, "4f626a0131c2", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'something/else',
  'Last-Modified',
  'Thu, 20 Aug 2020 09:22:11 GMT',
]);`
      },
      {
        name: `Hex encoding decodes for "avro/binary" content type even for partial success(status code 206)`,
        input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/path', "<?xml version=\"1.0\">")
  .query(true)
  .reply(206, "4f626a0131c2", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'avro/binary',
  'Last-Modified',
  'Thu, 20 Aug 2020 09:22:11 GMT',
]);`,
        output: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/path', "<?xml version=\"1.0\">")
  .query(true)
  .reply(206, Buffer.from("4f626a0131c2", "hex"), [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'avro/binary',
  'Last-Modified',
  'Thu, 20 Aug 2020 09:22:11 GMT',
]);`
      },
      {
        name: `Hex encoding is not decoded for non-successful status codes`,
        input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/path', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><Expression>select * from BlobStorage</Expression></QueryRequest>")
  .query(true)
  .reply(400, "4f626a0131c2", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'avro/binary',
  'Last-Modified',
  'Thu, 20 Aug 2020 09:22:11 GMT',
]);`,
        output: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/path', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><Expression>select * from BlobStorage</Expression></QueryRequest>")
  .query(true)
  .reply(400, "4f626a0131c2", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'avro/binary',
  'Last-Modified',
  'Thu, 20 Aug 2020 09:22:11 GMT',
]);`
      }
    ].forEach((test) => {
      it(test.name, () => {
        chai.assert.equal(
          decodeHexEncodingIfExistsInNockFixture(test.input),
          test.output,
          `Unexpected output`
        );
      });
    });
  });

  describe("isContentTypeInNockFixture", () => {
    [
      {
        name: `"avro/binary" matches`,
        input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/path', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><Expression>select * from BlobStorage</Expression></QueryRequest>")
  .query(true)
  .reply(200, "4f626a0131c2", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'avro/binary',
  'Last-Modified',
  'Thu, 20 Aug 2020 09:22:11 GMT',
]);`,
        expectedContentTypes: ["avro/binary"],
        output: true
      },
      {
        name: `"avro/binary" matches with an array of expected content types`,
        input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
          .post('/path', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><Expression>select * from BlobStorage</Expression></QueryRequest>")
          .query(true)
          .reply(200, "4f626a0131c2", [
          'Transfer-Encoding',
          'chunked',
          'Content-Type',
          'avro/binary',
          'Last-Modified',
          'Thu, 20 Aug 2020 09:22:11 GMT',
        ]);`,
        expectedContentTypes: ["avro/binary", "application/xml"],
        output: true
      },
      {
        name: `"text/plain" should not match with an array of different content types`,
        input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
          .post('/path', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><Expression>select * from BlobStorage</Expression></QueryRequest>")
          .query(true)
          .reply(200, "4f626a0131c2", [
          'Transfer-Encoding',
          'chunked',
          'Content-Type',
          'text/plain',
          'Last-Modified',
          'Thu, 20 Aug 2020 09:22:11 GMT',
        ]);`,
        expectedContentTypes: ["avro/binary", "application/xml"],
        output: false
      }
    ].forEach((test) => {
      it(test.name, () => {
        chai.assert.equal(
          isContentTypeInNockFixture(test.input, test.expectedContentTypes),
          test.output,
          `Unexpected result - content types ${test.expectedContentTypes} ${
            test.output ? "do not match" : "matched"
          }`
        );
      });
    });
  });

  describe("handleSingleQuotesInUrlPath", () => {
    [
      // {
      //   name: `single quotes in get request in the fixture with request body`,
      //   input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
      //             .get('/'path'', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><Expression>select * from BlobStorage</Expression></QueryRequest>")
      //             .query(true)
      //             .reply(200, "4f626a0131c2", [
      //             'Transfer-Encoding',
      //             'chunked'
      //           ]);`,
      //   output: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
      //             .get(\`/'path'\`, "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueryRequest><Expression>select * from BlobStorage</Expression></QueryRequest>")
      //             .query(true)
      //             .reply(200, "4f626a0131c2", [
      //             'Transfer-Encoding',
      //             'chunked'
      //           ]);`
      // },
      {
        name: `single quotes in get request in the fixture with no request body`,
        input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
                  .get('/'path'')
                  .query(true)
                  .reply(200, "4f626a0131c2", [
                  'Transfer-Encoding',
                  'chunked'
                ]);`,
        output: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
                  .get(\`/'path'\`)
                  .query(true)
                  .reply(200, "4f626a0131c2", [
                  'Transfer-Encoding',
                  'chunked'
                ]);`
      },
      {
        name: `single quotes in delete request in the fixture with no request body`,
        input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
                  .delete('/'path'pathx')
                  .query(true)
                  .reply(200, "4f626a0131c2", [
                  'Transfer-Encoding',
                  'chunked'
                ]);`,
        output: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
                  .delete(\`/'path'pathx\`)
                  .query(true)
                  .reply(200, "4f626a0131c2", [
                  'Transfer-Encoding',
                  'chunked'
                ]);`
      },
      {
        name: `no single quotes in get request in the fixture`,
        input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
                  .delete('/path')
                  .query(true)
                  .reply(200, "4f626a0131c2", [
                  'Transfer-Encoding',
                  'chunked'
                ]);`,
        output: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
                  .delete('/path')
                  .query(true)
                  .reply(200, "4f626a0131c2", [
                  'Transfer-Encoding',
                  'chunked'
                ]);`
      },
      {
        name: `more than two single quotes in delete request in the fixture`,
        input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
                  .delete('/p'''a't'h')
                  .query(true)
                  .reply(200, "4f626a0131c2", [
                  'Transfer-Encoding',
                  'chunked'
                ]);`,
        output: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
                  .delete(\`/p'''a't'h\`)
                  .query(true)
                  .reply(200, "4f626a0131c2", [
                  'Transfer-Encoding',
                  'chunked'
                ]);`
      }
      // {
      //   name: `no single quotes in the path and single quotes in the request body should not affect`,
      //   input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
      //             .post('/$batch', "--batch_fakeId\\r\\nDELETE https://endpoint.net/node(key='batchTest',RowKey='1') HTTP/1.1\\r\\nAccept: application/json\\r\\n")
      //             .query(true)
      //             .reply(200, "4f626a0131c2", [
      //             'Transfer-Encoding',
      //             'chunked'
      //           ]);`,
      //   output: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
      //             .post('/$batch', "--batch_fakeId\\r\\nDELETE https://endpoint.net/node(key='batchTest',RowKey='1') HTTP/1.1\\r\\nAccept: application/json\\r\\n")
      //             .query(true)
      //             .reply(200, "4f626a0131c2", [
      //             'Transfer-Encoding',
      //             'chunked'
      //           ]);`
      // },
      // {
      //   name: `single quotes in the path and the request body should work`,
      //   input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
      //             .post('/$batch'hello'', "--batch_fakeId\\r\\nDELETE https://endpoint.net/node(key='batchTest',RowKey='1') HTTP/1.1\\r\\nAccept: application/json\\r\\n")
      //             .query(true)
      //             .reply(200, "4f626a0131c2", [
      //             'Transfer-Encoding',
      //             'chunked'
      //           ]);`,
      //   output: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
      //             .post(\`/$batch'hello'\`, "--batch_fakeId\\r\\nDELETE https://endpoint.net/node(key='batchTest',RowKey='1') HTTP/1.1\\r\\nAccept: application/json\\r\\n")
      //             .query(true)
      //             .reply(200, "4f626a0131c2", [
      //             'Transfer-Encoding',
      //             'chunked'
      //           ]);`
      // },
      // {
      //   name: `single quotes in the path and the request body should work - without space`,
      //   input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
      //             .post('/$batch'hello'',"--batch_fakeId\\r\\nDELETE https://endpoint.net/node(key='batchTest',RowKey='1') HTTP/1.1\\r\\nAccept: application/json\\r\\n")
      //             .query(true)
      //             .reply(200, "4f626a0131c2", [
      //             'Transfer-Encoding',
      //             'chunked'
      //           ]);`,
      //   output: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
      //             .post(\`/$batch'hello'\`,"--batch_fakeId\\r\\nDELETE https://endpoint.net/node(key='batchTest',RowKey='1') HTTP/1.1\\r\\nAccept: application/json\\r\\n")
      //             .query(true)
      //             .reply(200, "4f626a0131c2", [
      //             'Transfer-Encoding',
      //             'chunked'
      //           ]);`
      // },
      // {
      //   name: `single quotes in the path and the request body should work`,
      //   input: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
      //             .post('/$batch'hello'', "--batch_fakeId\\r\\nDELETE https://endpoint.net/node(key='batchTest',RowKey='1') HTTP/1.1\\r\\nAccept: application/json\\r\\n")
      //             .query(true)
      //             .reply(200, "4f626a0131c2", [
      //             'Transfer-Encoding',
      //             'chunked'
      //           ]);`,
      //   output: `nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
      //             .post(\`/$batch'hello'\`, "--batch_fakeId\\r\\nDELETE https://endpoint.net/node(key='batchTest',RowKey='1') HTTP/1.1\\r\\nAccept: application/json\\r\\n")
      //             .query(true)
      //             .reply(200, "4f626a0131c2", [
      //             'Transfer-Encoding',
      //             'chunked'
      //           ]);`
      // }
    ].forEach((test) => {
      it(test.name, () => {
        chai.assert.equal(
          handleSingleQuotesInUrlPath(test.input),
          test.output,
          `Output from "handleSingleQuotesInUrlPath" did not match the expected output`
        );
      });
    });
  });
});
