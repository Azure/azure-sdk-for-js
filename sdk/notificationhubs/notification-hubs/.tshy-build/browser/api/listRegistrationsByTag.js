// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncDelegator, __asyncGenerator, __asyncValues, __await } from "tslib";
import { createRequest, sendRequest } from "./internal/_client.js";
import { registrationDescriptionParser } from "../serializers/registrationSerializer.js";
import { tracingClient } from "../utils/tracing.js";
const OPERATION_NAME = "listRegistrationsByTag";
/**
 * Lists all registrations with the matching tag.
 * @param context - The Notification Hubs client.
 * @param tag - The tag to query for matching registrations.
 * @param options - The query options such as $top.
 * @returns A paged async iterable containing the matching registrations for the notification hub.
 */
export function listRegistrationsByTag(context, tag, options = {}) {
    const { span, updatedOptions } = tracingClient.startSpan(`NotificationHubsClientContext.${OPERATION_NAME}`, options);
    try {
        const iter = listRegistrationsByTagAll(context, tag, updatedOptions);
        return {
            next() {
                return iter.next();
            },
            [Symbol.asyncIterator]() {
                return this;
            },
            byPage: () => {
                return listRegistrationsByTagPagingPage(context, tag, options);
            },
        };
    }
    catch (e) {
        span.setStatus({ status: "error", error: e });
        throw e;
    }
    finally {
        span.end();
    }
}
function listRegistrationsByTagAll(context, tag, options) {
    return __asyncGenerator(this, arguments, function* listRegistrationsByTagAll_1() {
        var _a, e_1, _b, _c;
        try {
            for (var _d = true, _e = __asyncValues(listRegistrationsByTagPagingPage(context, tag, options)), _f; _f = yield __await(_e.next()), _a = _f.done, !_a; _d = true) {
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
function listRegistrationsByTagPagingPage(context, tag, options) {
    return __asyncGenerator(this, arguments, function* listRegistrationsByTagPagingPage_1() {
        let result = yield __await(_listRegistrationsByTag(context, tag, options));
        yield yield __await(result.registrations || []);
        let continuationToken = result.continuationToken;
        while (continuationToken) {
            result = yield __await(_listRegistrationsByTag(context, tag, options, continuationToken));
            continuationToken = result.continuationToken;
            yield yield __await(result.registrations || []);
        }
    });
}
async function _listRegistrationsByTag(context, tag, options, continuationToken) {
    const endpoint = context.requestUrl();
    endpoint.pathname += `/tags/${tag}/registrations`;
    if (options.top !== undefined) {
        endpoint.searchParams.set("$top", `${options.top}`);
    }
    if (continuationToken !== undefined) {
        endpoint.searchParams.set("continuationtoken", continuationToken);
    }
    const headers = await context.createHeaders(OPERATION_NAME);
    const request = createRequest(endpoint, "GET", headers, options);
    const response = await sendRequest(context, request, 200);
    const registrations = await registrationDescriptionParser.parseRegistrationFeed(response.bodyAsText);
    const nextToken = response.headers.get("x-ms-continuationtoken");
    return {
        registrations,
        continuationToken: nextToken,
    };
}
//# sourceMappingURL=listRegistrationsByTag.js.map