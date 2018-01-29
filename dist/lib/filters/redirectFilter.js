"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var baseFilter_1 = require("./baseFilter");
var utils = require("../util/utils");
var parse = require("url-parse");
var RedirectFilter = /** @class */ (function (_super) {
    __extends(RedirectFilter, _super);
    function RedirectFilter(maximumRetries) {
        if (maximumRetries === void 0) { maximumRetries = 20; }
        var _this = _super.call(this) || this;
        _this.maximumRetries = maximumRetries;
        return _this;
    }
    RedirectFilter.prototype.handleRedirect = function (operationResponse, currentRetries) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, urlObject, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = operationResponse.request;
                        response = operationResponse.response;
                        if (!(response && response.headers && response.headers.get("location") &&
                            (response.status === 300 || response.status === 307 || (response.status === 303 && request.method === "POST")) &&
                            (!this.maximumRetries || currentRetries < this.maximumRetries))) return [3 /*break*/, 5];
                        if (parse(response.headers.get("location")).hostname) {
                            request.url = response.headers.get("location");
                        }
                        else {
                            urlObject = parse(request.url);
                            urlObject.set("pathname", response.headers.get("location"));
                            request.url = urlObject.href;
                        }
                        // POST request with Status code 303 should be converted into a
                        // redirected GET request if the redirect url is present in the location header
                        if (response.status === 303) {
                            request.method = "GET";
                        }
                        res = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, utils.dispatchRequest(request)];
                    case 2:
                        res = _a.sent();
                        currentRetries++;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [2 /*return*/, this.handleRedirect(res, currentRetries)];
                    case 5: return [2 /*return*/, Promise.resolve(operationResponse)];
                }
            });
        });
    };
    RedirectFilter.prototype.after = function (operationResponse) {
        return this.handleRedirect(operationResponse, 0);
    };
    return RedirectFilter;
}(baseFilter_1.BaseFilter));
exports.RedirectFilter = RedirectFilter;
//# sourceMappingURL=redirectFilter.js.map