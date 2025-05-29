// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncDelegator, __asyncGenerator, __asyncValues, __await } from "tslib";
import { createRequest, sendRequest } from "./_client.js";
import { registrationDescriptionParser } from "../../serializers/registrationSerializer.js";
export function listRegistrationsAll(context, options) {
    return __asyncGenerator(this, arguments, function* listRegistrationsAll_1() {
        var _a, e_1, _b, _c;
        try {
            for (var _d = true, _e = __asyncValues(listRegistrationPagingPage(context, options)), _f; _f = yield __await(_e.next()), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const page = _c;
                yield __await(yield* __asyncDelegator(__asyncValues(page)));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield __await(_b.call(_e));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
export function listRegistrationPagingPage(context, options) {
    return __asyncGenerator(this, arguments, function* listRegistrationPagingPage_1() {
        let result = yield __await(_listRegistrations(context, options));
        yield yield __await(result.registrations || []);
        let continuationToken = result.continuationToken;
        while (continuationToken) {
            result = yield __await(_listRegistrations(context, options, continuationToken));
            continuationToken = result.continuationToken;
            yield yield __await(result.registrations || []);
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
    const request = createRequest(endpoint, "GET", headers, options);
    const response = await sendRequest(context, request, 200);
    const registrations = await registrationDescriptionParser.parseRegistrationFeed(response.bodyAsText);
    const nextToken = response.headers.get("x-ms-continuationtoken");
    return {
        registrations,
        continuationToken: nextToken,
    };
}
//# sourceMappingURL=_listRegistrations.js.map