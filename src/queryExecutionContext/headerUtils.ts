import * as assert from "assert";
import * as util from "util";
import { Constants } from "../common";

export interface IHeaders {
    [key: string]: string | boolean | number;
}

// TODO: docs
export class HeaderUtils {
    public static getRequestChargeIfAny(headers: IHeaders): number {
        if (typeof headers === "number") {
            return headers;
        } else if (typeof headers === "string") {
            return parseFloat(headers);
        }

        if (headers) {
            const rc = headers[Constants.HttpHeaders.RequestCharge];
            if (rc) {
                return parseFloat(rc as string);
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    public static getInitialHeader(): IHeaders {
        const headers: IHeaders = {};
        headers[Constants.HttpHeaders.RequestCharge] = 0;
        return headers;
    }

    // TODO: The name of this method isn't very accurate to what it does
    public static mergeHeaders(headers: IHeaders, toBeMergedHeaders: IHeaders) {
        if (headers[Constants.HttpHeaders.RequestCharge] === undefined) {
            headers[Constants.HttpHeaders.RequestCharge] = 0;
        }
        if (!toBeMergedHeaders) {
            return;
        }
        (headers[Constants.HttpHeaders.RequestCharge] as number) +=
            HeaderUtils.getRequestChargeIfAny(toBeMergedHeaders);
        if (toBeMergedHeaders[Constants.HttpHeaders.IsRUPerMinuteUsed]) {
            headers[Constants.HttpHeaders.IsRUPerMinuteUsed] =
                toBeMergedHeaders[Constants.HttpHeaders.IsRUPerMinuteUsed];
        }
    }
}
