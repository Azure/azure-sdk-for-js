"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiMap = void 0;
class MultiMap {
    constructor() {
        this._map = new Map();
    }
    set(key, value) {
        let values = this._map.get(key);
        if (!values) {
            values = [];
            this._map.set(key, values);
        }
        values.push(value);
    }
    get(key) {
        return this._map.get(key) || [];
    }
    has(key) {
        return this._map.has(key);
    }
    delete(key, value) {
        const values = this._map.get(key);
        if (!values) {
            return;
        }
        if (values.includes(value)) {
            this._map.set(key, values.filter((v) => value !== v));
        }
    }
    deleteAll(key) {
        this._map.delete(key);
    }
    hasValue(key, value) {
        const values = this._map.get(key);
        if (!values) {
            return false;
        }
        return values.includes(value);
    }
    get size() {
        return this._map.size;
    }
    [Symbol.iterator]() {
        return this._map[Symbol.iterator]();
    }
    keys() {
        return this._map.keys();
    }
    values() {
        const result = [];
        for (const key of this.keys()) {
            result.push(...this.get(key));
        }
        return result;
    }
    clear() {
        this._map.clear();
    }
}
exports.MultiMap = MultiMap;
//# sourceMappingURL=multimap.js.map