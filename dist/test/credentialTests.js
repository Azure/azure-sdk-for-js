"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var msRest = require("../lib/msRest");
var should = require("should");
var TokenCredentials = msRest.TokenCredentials;
var BasicAuthenticationCredentials = msRest.BasicAuthenticationCredentials;
var ApiKeyCredentials = msRest.ApiKeyCredentials;
var dummyToken = "A-dummy-access-token";
var fakeScheme = "fake-auth-scheme";
var dummyuserName = "dummy@mummy.com";
var dummyPassword = "IL0veDummies";
describe("Token credentials", function () {
    describe("usage", function () {
        it("should set auth header with bearer scheme in request", function (done) {
            var creds = new TokenCredentials(dummyToken);
            var request = new msRest.WebResource();
            request.headers = {};
            creds.signRequest(request).then(function (signedRequest) {
                should.exist(signedRequest.headers["authorization"]);
                signedRequest.headers["authorization"].should.match(new RegExp("^Bearer\\s+" + dummyToken + "$"));
                done();
            });
        });
        it("should set auth header with custom scheme in request", function (done) {
            var creds = new TokenCredentials(dummyToken, fakeScheme);
            var request = new msRest.WebResource();
            request.headers = {};
            creds.signRequest(request).then(function (signedRequest) {
                should.exist(signedRequest.headers["authorization"]);
                signedRequest.headers["authorization"].should.match(new RegExp("^" + fakeScheme + "\\s+" + dummyToken + "$"));
                done();
            });
        });
    });
    describe("construction", function () {
        it("should succeed with token", function () {
            (function () {
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
describe("Basic Authentication credentials", function () {
    var encodedCredentials = Buffer.from(dummyuserName + ":" + dummyPassword).toString("base64");
    describe("usage", function () {
        it("should base64 encode the username and password and set auth header with baisc scheme in request", function (done) {
            var creds = new BasicAuthenticationCredentials(dummyuserName, dummyPassword);
            var request = new msRest.WebResource();
            request.headers = {};
            creds.signRequest(request).then(function (signedRequest) {
                signedRequest.headers.should.have.property("authorization");
                signedRequest.headers["authorization"].should.match(new RegExp("^Basic\\s+" + encodedCredentials + "$"));
                done();
            });
        });
        it("should base64 encode the username and password and set auth header with custom scheme in request", function (done) {
            var creds = new BasicAuthenticationCredentials(dummyuserName, dummyPassword, fakeScheme);
            var request = new msRest.WebResource();
            request.headers = {};
            creds.signRequest(request).then(function (signedRequest) {
                signedRequest.headers.should.have.property("authorization");
                signedRequest.headers["authorization"].should.match(new RegExp("^" + fakeScheme + "\\s+" + encodedCredentials + "$"));
                done();
            });
        });
    });
    describe("construction", function () {
        it("should succeed with userName and password", function () {
            (function () {
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
    describe('ApiKey credentials', function () {
        describe('usage', function () {
            it('should set header parameters properly in request', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var creds, request;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                creds = new ApiKeyCredentials({ inHeader: { 'key1': 'value1', 'key2': 'value2' } });
                                request = {
                                    headers: {}
                                };
                                return [4 /*yield*/, creds.signRequest(request)];
                            case 1:
                                _a.sent();
                                request.headers.should.have.property('key1');
                                request.headers.should.have.property('key2');
                                request.headers['key1'].should.match(new RegExp('^value1$'));
                                request.headers['key2'].should.match(new RegExp('^value2$'));
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('should set query parameters properly in the request url without any query parameters', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var creds, request;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                creds = new ApiKeyCredentials({ inQuery: { 'key1': 'value1', 'key2': 'value2' } });
                                request = {
                                    headers: {},
                                    url: 'https://example.com'
                                };
                                return [4 /*yield*/, creds.signRequest(request)];
                            case 1:
                                _a.sent();
                                request.url.should.equal('https://example.com?key1=value1&key2=value2');
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('should set query parameters properly in the request url with existing query parameters', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var creds, request;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                creds = new ApiKeyCredentials({ inQuery: { 'key1': 'value1', 'key2': 'value2' } });
                                request = {
                                    headers: {},
                                    url: 'https://example.com?q1=v2'
                                };
                                return [4 /*yield*/, creds.signRequest(request)];
                            case 1:
                                _a.sent();
                                request.url.should.equal('https://example.com?q1=v2&key1=value1&key2=value2');
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe('construction', function () {
            it('should fail with options.inHeader and options.inQuery set to null or undefined', function (done) {
                (function () {
                    new ApiKeyCredentials({ inHeader: null, inQuery: undefined });
                }).should.throw();
                done();
            });
            it('should fail without options', function (done) {
                (function () {
                    new ApiKeyCredentials();
                }).should.throw();
                done();
            });
            it('should fail with empty options', function (done) {
                (function () {
                    new ApiKeyCredentials({});
                }).should.throw();
                done();
            });
        });
    });
});
//# sourceMappingURL=credentialTests.js.map