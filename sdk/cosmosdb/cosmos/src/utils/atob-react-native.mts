// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Use the same polyfill implementation as browser for React Native
let safeatob: (data: string) => string;

// base64 character set, plus padding character (=)
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
// Regular expression to check formal correctness of base64 encoded strings
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob === "undefined") {
    // Custom atob implementation for React Native
    safeatob = (str: string): string => {
        let fixedStr = String(str).replace(/[\t\n\f\r ]+/g, "");
        if (!b64re.test(fixedStr)) {
            throw new TypeError(
                "Failed to execute 'atob': The string to be decoded is not correctly encoded.",
            );
        }

        fixedStr += "==".slice(2 - (fixedStr.length & 3));
        let bitmap;
        let result = "";
        let r1;
        let r2;
        let i = 0;
        for (; i < fixedStr.length;) {
            bitmap =
                (b64.indexOf(fixedStr.charAt(i++)) << 18) |
                (b64.indexOf(fixedStr.charAt(i++)) << 12) |
                ((r1 = b64.indexOf(fixedStr.charAt(i++))) << 6) |
                (r2 = b64.indexOf(fixedStr.charAt(i++)));

            result +=
                r1 === 64
                    ? String.fromCharCode((bitmap >> 16) & 255)
                    : r2 === 64
                        ? String.fromCharCode((bitmap >> 16) & 255, (bitmap >> 8) & 255)
                        : String.fromCharCode((bitmap >> 16) & 255, (bitmap >> 8) & 255, bitmap & 255);
        }
        return result;
    };
} else {
    safeatob = atob;
}

export default safeatob;
