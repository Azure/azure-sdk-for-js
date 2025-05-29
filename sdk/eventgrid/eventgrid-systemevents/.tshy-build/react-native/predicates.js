// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * isCloudEventLike returns "true" when the event is a CloudEvent
 *
 * @param o - Either an EventGrid our CloudEvent event.
 */
function isCloudEventLike(o) {
    return o.source !== undefined;
}
export function isSystemEvent(eventType, event) {
    if (isCloudEventLike(event)) {
        return event.type === eventType;
    }
    else {
        return event.eventType === eventType;
    }
}
//# sourceMappingURL=predicates.js.map