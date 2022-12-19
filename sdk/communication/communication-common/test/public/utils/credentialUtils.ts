import { assert } from "chai";

export const assertPropertyNames = (expectedInstance: any, actualInstance: any): void => {
    assert.includeMembers(
        Object.getOwnPropertyNames(expectedInstance),
        Object.getOwnPropertyNames(actualInstance),
        `Object is not an instance of ${expectedInstance.constructor.name}.`
    );
}