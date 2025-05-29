"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRegistrationsAll = listRegistrationsAll;
exports.listRegistrationPagingPage = listRegistrationPagingPage;
const tslib_1 = require("tslib");
const _client_js_1 = require("./_client.js");
const registrationSerializer_js_1 = require("../../serializers/registrationSerializer.js");
function listRegistrationsAll(context, options) {
    return tslib_1.__asyncGenerator(this, arguments, function* listRegistrationsAll_1() {
        var _a, e_1, _b, _c;
        try {
            for (var _d = true, _e = tslib_1.__asyncValues(listRegistrationPagingPage(context, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const page = _c;
                yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(page)));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function listRegistrationPagingPage(context, options) {
    return tslib_1.__asyncGenerator(this, arguments, function* listRegistrationPagingPage_1() {
        let result = yield tslib_1.__await(_listRegistrations(context, options));
        yield yield tslib_1.__await(result.registrations || []);
        let continuationToken = result.continuationToken;
        while (continuationToken) {
            result = yield tslib_1.__await(_listRegistrations(context, options, continuationToken));
            continuationToken = result.continuationToken;
            yield yield tslib_1.__await(result.registrations || []);
        }
    });
}
async function _listRegistrations(context, options, continuationToken) {
    const endpoint = context.requestUrl();
    endpoint.pathname += "/registrations";
    if (options.top !== undefined) {
        endpoint.searchParams.set("$top", `${options.top}`);
    }
    if (options.filter !== undefined) {
        endpoint.searchParams.set("$filter", options.filter);
    }
    if (continuationToken !== undefined) {
        endpoint.searchParams.set("continuationtoken", continuationToken);
    }
    const headers = await context.createHeaders("listRegistrations");
    const request = (0, _client_js_1.createRequest)(endpoint, "GET", headers, options);
    const response = await (0, _client_js_1.sendRequest)(context, request, 200);
    const registrations = await registrationSerializer_js_1.registrationDescriptionParser.parseRegistrationFeed(response.bodyAsText);
    const nextToken = response.headers.get("x-ms-continuationtoken");
    return {
        registrations,
        continuationToken: nextToken,
    };
}
//# sourceMappingURL=_listRegistrations.js.map