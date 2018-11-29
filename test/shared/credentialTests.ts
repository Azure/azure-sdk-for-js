// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { should } from "chai";
import * as msRest from "../../lib/msRest";
import * as base64 from "../../lib/util/base64";
const TokenCredentials = msRest.TokenCredentials;
const BasicAuthenticationCredentials = msRest.BasicAuthenticationCredentials;
const ApiKeyCredentials = msRest.ApiKeyCredentials;
const dummyToken = "A-dummy-access-token";
const fakeScheme = "fake-auth-scheme";
const dummyuserName = "dummy@mummy.com";
const dummyPassword = "IL0veDummies";

describe("Token credentials", () => {
  describe("usage", () => {
    it("should set auth header with bearer scheme in request", (done) => {
      const creds = new TokenCredentials(dummyToken);
      const request = new msRest.WebResource();

      creds.signRequest(request).then((signedRequest: msRest.WebResource) => {
        should().exist(signedRequest.headers.get("authorization"));
        signedRequest.headers.get("authorization")!.should.match(new RegExp("^Bearer\\s+" + dummyToken + "$"));
        done();
      });
    });

    it("should set auth header with custom scheme in request", (done) => {
      const creds = new TokenCredentials(dummyToken, fakeScheme);
      const request = new msRest.WebResource();
      creds.signRequest(request).then((signedRequest: msRest.WebResource) => {
        signedRequest.headers.get("authorization")!.should.exist;
        signedRequest.headers.get("authorization")!.should.match(new RegExp("^" + fakeScheme + "\\s+" + dummyToken + "$"));
        done();
      });
    });
  });

  describe("construction", () => {

    it("should succeed with token", () => {
      (() => {
        new TokenCredentials(dummyToken);
      }).should.not.throw();
    });

    // it("should fail without credentials", () => {
    //   (() => {
    //     new TokenCredentials();
    //   }).should.throw();
    // });

    // it("should fail without token", () => {
    //   (() => {
    //     new TokenCredentials(null, fakeScheme);
    //   }).should.throw();
    // });
  });
});

describe("Basic Authentication credentials", () => {
  const encodedCredentials = base64.encodeString(dummyuserName + ":" + dummyPassword);
  describe("usage", () => {
    it("should base64 encode the username and password and set auth header with baisc scheme in request", (done) => {
      const creds = new BasicAuthenticationCredentials(dummyuserName, dummyPassword);
      const request = new msRest.WebResource();
      creds.signRequest(request).then((signedRequest: msRest.WebResource) => {
        signedRequest.headers.get("authorization")!.should.exist;
        signedRequest.headers.get("authorization")!.should.match(new RegExp("^Basic\\s+" + encodedCredentials + "$"));
        done();
      });
    });

    it("should base64 encode the username and password and set auth header with custom scheme in request", (done) => {
      const creds = new BasicAuthenticationCredentials(dummyuserName, dummyPassword, fakeScheme);
      const request = new msRest.WebResource();

      creds.signRequest(request).then((signedRequest: msRest.WebResource) => {
        signedRequest.headers.get("authorization")!.should.exist;
        signedRequest.headers.get("authorization")!.should.match(new RegExp("^" + fakeScheme + "\\s+" + encodedCredentials + "$"));
        done();
      });
    });
  });

  describe("construction", () => {
    it("should succeed with userName and password", () => {
      (() => {
        new BasicAuthenticationCredentials(dummyuserName, dummyPassword);
      }).should.not.throw();
    });
  });

describe("ApiKey credentials", () => {
  describe("usage", function () {
    it("should set header parameters properly in request", async function () {
      const creds = new ApiKeyCredentials({inHeader: {"key1": "value1", "key2": "value2"}});
      const request = new msRest.WebResource();
      request.headers = new msRest.HttpHeaders();

      await creds.signRequest(request);

      request.headers.get("key1")!.should.exist;
      request.headers.get("key2")!.should.exist;
      request.headers.get("key1")!.should.match(new RegExp("^value1$"));
      request.headers.get("key2")!.should.match(new RegExp("^value2$"));
    });

    it("should set query parameters properly in the request url without any query parameters", async function () {
      const creds = new ApiKeyCredentials({inQuery: {"key1": "value1", "key2": "value2"}});
      const request = {
        headers: {},
        url: "https://example.com"
      } as msRest.WebResource;

      await creds.signRequest(request);
      request.url.should.equal("https://example.com?key1=value1&key2=value2");
    });

    it("should set query parameters properly in the request url with existing query parameters", async function () {
      const creds = new ApiKeyCredentials({inQuery: {"key1": "value1", "key2": "value2"}});
      const request = {
        headers: {},
        url: "https://example.com?q1=v2"
      } as msRest.WebResource;

      await creds.signRequest(request);
      request.url.should.equal("https://example.com?q1=v2&key1=value1&key2=value2");
    });
  });

  describe("construction", function () {

    it("should fail with options.inHeader and options.inQuery set to null or undefined", function (done) {
      (function () {
        new ApiKeyCredentials({ inHeader: undefined, inQuery: undefined } as any);
      }).should.throw();
      done();
    });

    it("should fail without options", function (done) {
      (function () {
        new (ApiKeyCredentials as any)();
      }).should.throw();
      done();
    });

    it("should fail with empty options", function (done) {
      (function () {
        new ApiKeyCredentials({});
      }).should.throw();
      done();
    });
  });
  });
});
