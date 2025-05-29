"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.spanKey = exports.MockContext = void 0;
exports.createMockTracingContext = createMockTracingContext;
/**
 * This is the implementation of the {@link TracingContext} interface
 * Represents a tracing context
 */
class MockContext {
    /**
     * Initializes the context map
     * @param parentContext - If present the context map is initialized to the contextMap of the parentContext
     */
    constructor(parentContext) {
        if (parentContext && !(parentContext instanceof MockContext)) {
            throw new Error("received parent context, but it is not mock context...");
        }
        this.contextMap = new Map((parentContext === null || parentContext === void 0 ? void 0 : parentContext.contextMap) || new Map());
    }
    setValue(key, value) {
        const newContext = new MockContext(this);
        newContext.contextMap.set(key, value);
        return newContext;
    }
    getValue(key) {
        return this.contextMap.get(key);
    }
    deleteValue(key) {
        const newContext = new MockContext(this);
        newContext.contextMap.delete(key);
        return newContext;
    }
}
exports.MockContext = MockContext;
exports.spanKey = Symbol.for("span");
function createMockTracingContext(parentContext) {
    return new MockContext(parentContext);
}
//# sourceMappingURL=mockContext.js.map