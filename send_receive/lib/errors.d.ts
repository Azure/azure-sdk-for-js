// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export declare class MessagingEntityNotFoundError extends Error {
    constructor(message: string);
}

export declare class ArgumentOutOfRangeError extends Error {
    constructor(message: string);
}

// tslint:disable-next-line: class-name
export declare class translate extends Error {
    constructor(err: Error);
}
