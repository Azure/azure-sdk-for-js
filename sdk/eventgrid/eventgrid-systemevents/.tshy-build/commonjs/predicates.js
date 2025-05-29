"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSystemEvent = isSystemEvent;
/**
 * isCloudEventLike returns "true" when the event is a CloudEvent
 *
 * @param o - Either an EventGrid our CloudEvent event.
 */
function isCloudEventLike(o) {
    return o.source !== undefined;
}
function isSystemEvent(eventType, event) {
    if (isCloudEventLike(event)) {
        return event.type === eventType;
    }
    else {
        return event.eventType === eventType;
    }
}
//# sourceMappingURL=predicates.js.map