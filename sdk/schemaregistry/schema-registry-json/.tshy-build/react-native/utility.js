// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export function isMessageContent(message) {
    const castMessage = message;
    return castMessage.data !== undefined && castMessage.contentType !== undefined;
}
//# sourceMappingURL=utility.js.map