// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { URL } from "url";

export class CallingServerUtils {
    public static isValidUrl(urlToVerify: string): boolean {
        let url;
        try {
            url = new URL(urlToVerify);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }
}
