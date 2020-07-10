// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-unused-expressions */

import "chai/register-should";
import * as msRest from "../src/coreHttp";
import * as base64 from "../src/util/base64";
const BasicAuthenticationCredentials = msRest.BasicAuthenticationCredentials;
const ApiKeyCredentials = msRest.ApiKeyCredentials;
const fakeScheme = "fake-auth-scheme";
const dummyUsername = "dummy@mummy.com";
const dummyPassword = "IL0veDummies";

describe("Basic Authentication credentials", () => {
  const encodedCredentials = base64.encodeString(dummyUsername + ":" + dummyPassword);
  describe("usage", () => {
    it("should base64 encode the username and password and set auth header with basic scheme in request", async () => {
      const creds = new BasicAuthenticationCredentials(dummyUsername, dummyPassword);
      const request = new msRest.WebResource();
      const signedRequest = await creds.signRequest(request);
      signedRequest.headers.get("authorization")!.should.exist;
      signedRequest.headers
        .get("authorization")!
        .should.match(new RegExp("^Basic\\s+" + encodedCredentials + "$"));
    });

    it("should base64 encode the username and password and set auth header with custom scheme in request", async () => {
      const creds = new BasicAuthenticationCredentials(dummyUsername, dummyPassword, fakeScheme);
      const request = new msRest.WebResource();

      const signedRequest = await creds.signRequest(request);
      signedRequest.headers.get("authorization")!.should.exist;
      signedRequest.headers
        .get("authorization")!
        .should.match(new RegExp("^" + fakeScheme + "\\s+" + encodedCredentials + "$"));
    });
  });

  describe("construction", () => {
    it("should succeed with userName and password", () => {
      (() => {
        new BasicAuthenticationCredentials(dummyUsername, dummyPassword);
      }).should.not.throw();
    });
  });

  describe("ApiKey credentials", () => {
    describe("usage", function() {
      it("should set header parameters properly in request", async function() {
        const creds = new ApiKeyCredentials({ inHeader: { key1: "value1", key2: "value2" } });
        const request = new msRest.WebResource();
        request.headers = new msRest.HttpHeaders();

        await creds.signRequest(request);

        request.headers.get("key1")!.should.exist;
        request.headers.get("key2")!.should.exist;
        request.headers.get("key1")!.should.match(new RegExp("^value1$"));
        request.headers.get("key2")!.should.match(new RegExp("^value2$"));
      });

      it("should set query parameters properly in the request url without any query parameters", async function() {
        const creds = new ApiKeyCredentials({ inQuery: { key1: "value1", key2: "value2" } });
        const request = {
          headers: {},
          url: "https://example.com"
        } as msRest.WebResource;

        await creds.signRequest(request);
        request.url.should.equal("https://example.com?key1=value1&key2=value2");
      });

      it("should set query parameters properly in the request url with existing query parameters", async function() {
        const creds = new ApiKeyCredentials({ inQuery: { key1: "value1", key2: "value2" } });
        const request = {
          headers: {},
          url: "https://example.com?q1=v2"
        } as msRest.WebResource;

        await creds.signRequest(request);
        request.url.should.equal("https://example.com?q1=v2&key1=value1&key2=value2");
      });
    });

    describe("construction", function() {
      it("should fail with options.inHeader and options.inQuery set to null or undefined", function(done) {
        (function() {
          new ApiKeyCredentials({ inHeader: undefined, inQuery: undefined } as any);
        }.should.throw());
        done();
      });

      it("should fail without options", function(done) {
        (function() {
          new (ApiKeyCredentials as any)();
        }.should.throw());
        done();
      });

      it("should fail with empty options", function(done) {
        (function() {
          new ApiKeyCredentials({});
        }.should.throw());
        done();
      });
    });
  });
});
