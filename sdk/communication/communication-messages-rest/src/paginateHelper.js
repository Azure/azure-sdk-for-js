"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
exports.paginate = void 0;
var core_paging_1 = require("@azure/core-paging");
var core_client_1 = require("@azure-rest/core-client");
/**
 * Helper to paginate results from an initial response that follows the specification of Autorest `x-ms-pageable` extension
 * @param client - Client to use for sending the next page requests
 * @param initialResponse - Initial response containing the nextLink and current page of elements
 * @param customGetPage - Optional - Function to define how to extract the page and next link to be used to paginate the results
 * @returns - PagedAsyncIterableIterator to iterate the elements
 */
function paginate(client, initialResponse, options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var firstRun = true;
    var itemName = "value";
    var nextLinkName = "nextLink";
    var customGetPage = options.customGetPage;
    var pagedResult = {
        firstPageLink: "",
        getPage: typeof customGetPage === "function"
            ? customGetPage
            : function (pageLink) { return __awaiter(_this, void 0, void 0, function () {
                var result, _a, nextLink, values;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!firstRun) return [3 /*break*/, 1];
                            _a = initialResponse;
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, client.pathUnchecked(pageLink).get()];
                        case 2:
                            _a = _b.sent();
                            _b.label = 3;
                        case 3:
                            result = _a;
                            firstRun = false;
                            checkPagingRequest(result);
                            nextLink = getNextLink(result.body, nextLinkName);
                            values = getElements(result.body, itemName);
                            return [2 /*return*/, {
                                    page: values,
                                    nextPageLink: nextLink,
                                }];
                    }
                });
            }); },
    };
    return (0, core_paging_1.getPagedAsyncIterator)(pagedResult);
}
exports.paginate = paginate;
/**
 * Gets for the value of nextLink in the body
 */
function getNextLink(body, nextLinkName) {
    if (!nextLinkName) {
        return undefined;
    }
    var nextLink = body[nextLinkName];
    if (typeof nextLink !== "string" && typeof nextLink !== "undefined") {
        throw new Error("Body Property ".concat(nextLinkName, " should be a string or undefined"));
    }
    return nextLink;
}
/**
 * Gets the elements of the current request in the body.
 */
function getElements(body, itemName) {
    var value = body[itemName];
    // value has to be an array according to the x-ms-pageable extension.
    // The fact that this must be an array is used above to calculate the
    // type of elements in the page in PaginateReturn
    if (!Array.isArray(value)) {
        throw new Error("Couldn't paginate response\n Body doesn't contain an array property with name: ".concat(itemName));
    }
    return value !== null && value !== void 0 ? value : [];
}
/**
 * Checks if a request failed
 */
function checkPagingRequest(response) {
    var Http2xxStatusCodes = [
        "200",
        "201",
        "202",
        "203",
        "204",
        "205",
        "206",
        "207",
        "208",
        "226",
    ];
    if (!Http2xxStatusCodes.includes(response.status)) {
        throw (0, core_client_1.createRestError)("Pagination failed with unexpected statusCode ".concat(response.status), response);
    }
}
