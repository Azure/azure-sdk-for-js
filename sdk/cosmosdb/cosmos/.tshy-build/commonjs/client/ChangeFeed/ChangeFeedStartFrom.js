"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFeedStartFrom = void 0;
const ChangeFeedStartFromNow_js_1 = require("./ChangeFeedStartFromNow.js");
const ChangeFeedStartFromBeginning_js_1 = require("./ChangeFeedStartFromBeginning.js");
const ChangeFeedStartFromTime_js_1 = require("./ChangeFeedStartFromTime.js");
const ChangeFeedStartFromContinuation_js_1 = require("./ChangeFeedStartFromContinuation.js");
const ErrorResponse_js_1 = require("../../request/ErrorResponse.js");
const changeFeedUtils_js_1 = require("./changeFeedUtils.js");
/**
 * Base class for where to start a ChangeFeedIterator.
 */
/* eslint-disable @typescript-eslint/no-extraneous-class */
class ChangeFeedStartFrom {
    /**
     * Returns an object that tells the ChangeFeedIterator to start from the beginning of time.
     * @param cfResource - PartitionKey or FeedRange for which changes are to be fetched. Leave blank for fetching changes for entire container.
     */
    static Beginning(cfResource) {
        return new ChangeFeedStartFromBeginning_js_1.ChangeFeedStartFromBeginning(cfResource);
    }
    /**
     *  Returns an object that tells the ChangeFeedIterator to start reading changes from this moment onward.
     * @param cfResource - PartitionKey or FeedRange for which changes are to be fetched. Leave blank for fetching changes for entire container.
     **/
    static Now(cfResource) {
        return new ChangeFeedStartFromNow_js_1.ChangeFeedStartFromNow(cfResource);
    }
    /**
     * Returns an object that tells the ChangeFeedIterator to start reading changes from some point in time onward.
     * @param startTime - Date object specfiying the time to start reading changes from.
     * @param cfResource - PartitionKey or FeedRange for which changes are to be fetched. Leave blank for fetching changes for entire container.
     */
    static Time(startTime, cfResource) {
        if (!startTime) {
            throw new ErrorResponse_js_1.ErrorResponse("startTime must be present");
        }
        if (startTime instanceof Date === true) {
            return new ChangeFeedStartFromTime_js_1.ChangeFeedStartFromTime(startTime, cfResource);
        }
        else {
            throw new ErrorResponse_js_1.ErrorResponse("startTime must be a Date object.");
        }
    }
    /**
     * Returns an object that tells the ChangeFeedIterator to start reading changes from a save point.
     * @param continuation - The continuation to resume from.
     */
    static Continuation(continuationToken) {
        if (!continuationToken) {
            throw new ErrorResponse_js_1.ErrorResponse("Argument continuation must be passed.");
        }
        if ((0, changeFeedUtils_js_1.isNullOrEmpty)(continuationToken)) {
            throw new ErrorResponse_js_1.ErrorResponse("Argument continuationToken must be a non-empty string.");
        }
        return new ChangeFeedStartFromContinuation_js_1.ChangeFeedStartFromContinuation(continuationToken);
    }
}
exports.ChangeFeedStartFrom = ChangeFeedStartFrom;
//# sourceMappingURL=ChangeFeedStartFrom.js.map