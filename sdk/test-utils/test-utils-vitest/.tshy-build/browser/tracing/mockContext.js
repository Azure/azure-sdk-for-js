// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This is the implementation of the {@link TracingContext} interface
 * Represents a tracing context
 */
export class MockContext {
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
export const spanKey = Symbol.for("span");
export function createMockTracingContext(parentContext) {
    return new MockContext(parentContext);
}
//# sourceMappingURL=mockContext.js.map