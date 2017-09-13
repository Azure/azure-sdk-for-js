"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const msRest = require("../lib/msRest");
const should = require("should");
const TokenCredentials = msRest.TokenCredentials;
const BasicAuthenticationCredentials = msRest.BasicAuthenticationCredentials;
const dummyToken = "A-dummy-access-token";
const fakeScheme = "fake-auth-scheme";
const dummyuserName = "dummy@mummy.com";
const dummyPassword = "IL0veDummies";
describe("Token credentials", () => {
    describe("usage", () => {
        it("should set auth header with bearer scheme in request", (done) => {
            const creds = new TokenCredentials(dummyToken);
            const request = new msRest.WebResource();
            request.headers = {};
            creds.signRequest(request).then((signedRequest) => {
                should.exist(signedRequest.headers["authorization"]);
                signedRequest.headers["authorization"].should.match(new RegExp("^Bearer\\s+" + dummyToken + "$"));
                done();
            });
        });
        it("should set auth header with custom scheme in request", (done) => {
            const creds = new TokenCredentials(dummyToken, fakeScheme);
            const request = new msRest.WebResource();
            request.headers = {};
            creds.signRequest(request).then((signedRequest) => {
                should.exist(signedRequest.headers["authorization"]);
                signedRequest.headers["authorization"].should.match(new RegExp("^" + fakeScheme + "\\s+" + dummyToken + "$"));
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
    const encodedCredentials = Buffer.from(dummyuserName + ":" + dummyPassword).toString("base64");
    describe("usage", () => {
        it("should base64 encode the username and password and set auth header with baisc scheme in request", (done) => {
            const creds = new BasicAuthenticationCredentials(dummyuserName, dummyPassword);
            const request = new msRest.WebResource();
            request.headers = {};
            creds.signRequest(request).then((signedRequest) => {
                signedRequest.headers.should.have.property("authorization");
                signedRequest.headers["authorization"].should.match(new RegExp("^Basic\\s+" + encodedCredentials + "$"));
                done();
            });
        });
        it("should base64 encode the username and password and set auth header with custom scheme in request", (done) => {
            const creds = new BasicAuthenticationCredentials(dummyuserName, dummyPassword, fakeScheme);
            const request = new msRest.WebResource();
            request.headers = {};
            creds.signRequest(request).then((signedRequest) => {
                signedRequest.headers.should.have.property("authorization");
                signedRequest.headers["authorization"].should.match(new RegExp("^" + fakeScheme + "\\s+" + encodedCredentials + "$"));
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
        // it("should fail without credentials", () => {
        //   (() => {
        //     new BasicAuthenticationCredentials(null, null);
        //   }).should.throw();
        // });
        // it("should fail without userName and password", () => {
        //   (() => {
        //     new BasicAuthenticationCredentials(null, null, fakeScheme);
        //   }).should.throw();
        // });
    });
});
//# sourceMappingURL=credentialTests.js.map