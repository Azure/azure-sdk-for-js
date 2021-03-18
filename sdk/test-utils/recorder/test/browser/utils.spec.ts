import {
  testHasChanged,
  generateTestRecordingFilePath,
  stripNewLines,
  windowLens,
  maskAccessTokenInRecording,
  isContentTypeInBrowserRecording
} from "../../src/utils";
import { expect } from "chai";

describe("Browser utils", () => {
  describe("windowLens", () => {
    it("should set and set at one level of depth", () => {
      windowLens.set(["A"], "A");
      expect(windowLens.get(["A"])).to.equal("A");
      // Cleaning what we just did.
      windowLens.set(["A"], undefined);
    });

    it("should set and set at more than one level of depth", () => {
      windowLens.set(["A", "B", "C"], "ABC");
      expect(windowLens.get(["A", "B", "C"])).to.equal("ABC");
      // Cleaning what we just did.
      windowLens.set(["A", "B", "C"], undefined);
      windowLens.set(["A", "B"], undefined);
      windowLens.set(["A"], undefined);
    });
  });

  describe("testHasChanged", () => {
    it("Should not crash if the recorded file doesn't exist", function() {
      const testSuiteTitle = this.test!.parent!.fullTitle();
      const testTitle = this.test!.title;

      windowLens.set(["__json__"], {});

      // We won't be testing whether MD5 works or not.
      const newHash = "new hash";

      expect(testHasChanged(testSuiteTitle, testTitle, "test/myTest.spec.ts", newHash)).to.equal(
        true
      );
    });

    it("Should return true if the older hash doesn't exist", function() {
      const platform = "browsers";
      const testSuiteTitle = this.test!.parent!.fullTitle();
      const testTitle = this.test!.title;
      const filePath = generateTestRecordingFilePath(platform, testSuiteTitle, testTitle);

      windowLens.set(["__json__"], {
        ["recordings/" + filePath]: {}
      });

      // We won't be testing whether MD5 works or not.
      const newHash = "new hash";

      expect(testHasChanged(testSuiteTitle, testTitle, "test/myTest.spec.ts", newHash)).to.equal(
        true
      );
    });
  });

  describe("stripNewLines", () => {
    it("should remove new lines", () => {
      const targetString = "a\r\nb\nc\rd";
      expect(stripNewLines(targetString)).to.equal("abcd");
    });
  });

  describe("Mask access tokens in browser recordings", () => {
    [
      {
        name: `mask "access_token"s in json response`,
        input: `{
                  "method": "POST",
                  "url": "https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token",
                  "query": {},
                  "requestBody": "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default",
                  "status": 200,
                  "response": "{"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"e6z-9_g"}",
                  "responseHeaders": {
                    "content-length": "1315",
                    "content-type": "application/json; charset=utf-8",
                    "date": "Tue, 16 Feb 2021 18:21:34 GMT"
                  }
                }`,
        output: `{
                  "method": "POST",
                  "url": "https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token",
                  "query": {},
                  "requestBody": "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default",
                  "status": 200,
                  "response": "{\"token_type\":\"Bearer\",\"expires_in\":86399,\"ext_expires_in\":86399,\"access_token\":\"access_token\"}",
                  "responseHeaders": {
                    "content-length": "1315",
                    "content-type": "application/json; charset=utf-8",
                    "date": "Tue, 16 Feb 2021 18:21:34 GMT"
                  }
                }`
      },
      {
        name: `doesn't mask "access_token"s in json response since the content-type is not application/json`,
        input: `{
                  "method": "POST",
                  "url": "https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token",
                  "query": {},
                  "requestBody": "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default",
                  "status": 200,
                  "response": "{"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"e6z-9_g"}",
                  "responseHeaders": {
                    "content-length": "1315",
                    "content-type": "something; charset=utf-8",
                    "date": "Tue, 16 Feb 2021 18:21:34 GMT"
                  }
                }`,
        output: `{
                  "method": "POST",
                  "url": "https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token",
                  "query": {},
                  "requestBody": "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default",
                  "status": 200,
                  "response": "{\"token_type\":\"Bearer\",\"expires_in\":86399,\"ext_expires_in\":86399,\"access_token\":"e6z-9_g"}",
                  "responseHeaders": {
                    "content-length": "1315",
                    "content-type": "something; charset=utf-8",
                    "date": "Tue, 16 Feb 2021 18:21:34 GMT"
                  }
                }`
      },
      {
        name: `no impact on other recordings`,
        input: `{
                  "method": "PUT",
                  "url": "https://fakestorageaccount.blob.core.windows.net/container159218753534504901",
                  "query": {
                    "restype": "container"
                  },
                  "requestBody": null,
                  "status": 201,
                  "response": "",
                  "responseHeaders": {
                  }
                }`,
        output: `{
                  "method": "PUT",
                  "url": "https://fakestorageaccount.blob.core.windows.net/container159218753534504901",
                  "query": {
                    "restype": "container"
                  },
                  "requestBody": null,
                  "status": 201,
                  "response": "",
                  "responseHeaders": {
                  }
                }`
      }
    ].forEach((test) => {
      it(test.name, () => {
        expect(maskAccessTokenInRecording(test.input)).to.equal(
          test.output,
          `Unexpected result - access_token is not masked`
        );
      });
    });
  });

  describe("isContentTypeInNockFixture", () => {
    [
      {
        name: `"avro/binary" matches`,
        input: `{
                  "method": "POST",
                  "url": "https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token",
                  "query": {},
                  "requestBody": "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default",
                  "status": 200,
                  "response": "{\"token_type\":\"Bearer\",\"expires_in\":86399,\"ext_expires_in\":86399,\"access_token\":"e6z-9_g"}",
                  "responseHeaders": {
                    "content-length": "1315",
                    "content-type": "avro/binary",
                    "date": "Tue, 16 Feb 2021 18:21:34 GMT"
                  }
                }`,
        expectedContentTypes: ["avro/binary"],
        output: true
      },
      {
        name: `"avro/binary" matches with an array of expected content types`,
        input: `{
                  "method": "POST",
                  "url": "https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token",
                  "query": {},
                  "requestBody": "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default",
                  "status": 200,
                  "response": "{\"token_type\":\"Bearer\",\"expires_in\":86399,\"ext_expires_in\":86399,\"access_token\":"e6z-9_g"}",
                  "responseHeaders": {
                    "content-length": "1315",
                    "content-type": "avro/binary",
                    "date": "Tue, 16 Feb 2021 18:21:34 GMT"
                  }
                }`,
        expectedContentTypes: ["avro/binary", "application/xml"],
        output: true
      },
      {
        name: `"text/plain" should not match with an array of different content types`,
        input: `{
                  "method": "POST",
                  "url": "https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token",
                  "query": {},
                  "requestBody": "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default",
                  "status": 200,
                  "response": "{\"token_type\":\"Bearer\",\"expires_in\":86399,\"ext_expires_in\":86399,\"access_token\":"e6z-9_g"}",
                  "responseHeaders": {
                    "content-length": "1315",
                    "content-type": "text/plain",
                    "date": "Tue, 16 Feb 2021 18:21:34 GMT"
                  }
                }`,
        expectedContentTypes: ["avro/binary", "application/xml"],
        output: false
      }
    ].forEach((test) => {
      it(test.name, () => {
        expect(isContentTypeInBrowserRecording(test.input, test.expectedContentTypes)).to.equal(
          test.output,
          `Unexpected result - content types ${test.expectedContentTypes} ${
            test.output ? "do not match" : "matched"
          }`
        );
      });
    });
  });
});
