"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const core_paging_1 = require("@azure/core-paging");
const core_client_1 = require("@azure-rest/core-client");
/**
 * Helper to paginate results from an initial response that follows the specification of Autorest `x-ms-pageable` extension
 * @param client - Client to use for sending the next page requests
 * @param initialResponse - Initial response containing the nextLink and current page of elements
 * @param customGetPage - Optional - Function to define how to extract the page and next link to be used to paginate the results
 * @returns - PagedAsyncIterableIterator to iterate the elements
 */
function paginate(client, initialResponse, options = {}) {
    let firstRun = true;
    const itemName = "value";
    const nextLinkName = "nextLink";
    const { customGetPage } = options;
    const pagedResult = {
        firstPageLink: "",
        getPage: typeof customGetPage === "function"
            ? customGetPage
            : async (pageLink) => {
                const result = firstRun
                    ? initialResponse
                    : await client.pathUnchecked(pageLink).get();
                firstRun = false;
                checkPagingRequest(result);
                const nextLink = getNextLink(result.body, nextLinkName);
                const values = getElements(result.body, itemName);
                return {
                    page: values,
                    nextPageLink: nextLink,
                };
            },
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
    const nextLink = body[nextLinkName];
    if (typeof nextLink !== "string" && typeof nextLink !== "undefined") {
        throw new Error(`Body Property ${nextLinkName} should be a string or undefined`);
    }
    return nextLink;
}
/**
 * Gets the elements of the current request in the body.
 */
function getElements(body, itemName) {
    const value = body[itemName];
    // value has to be an array according to the x-ms-pageable extension.
    // The fact that this must be an array is used above to calculate the
    // type of elements in the page in PaginateReturn
    if (!Array.isArray(value)) {
        throw new Error(`Couldn't paginate response\n Body doesn't contain an array property with name: ${itemName}`);
    }
    return value !== null && value !== void 0 ? value : [];
}
/**
 * Checks if a request failed
 */
function checkPagingRequest(response) {
    const Http2xxStatusCodes = [
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
        throw (0, core_client_1.createRestError)(`Pagination failed with unexpected statusCode ${response.status}`, response);
    }
}
//# sourceMappingURL=paginateHelper.js.map