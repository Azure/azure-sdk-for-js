/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as fssync from "fs";
import { promises as fs } from "fs";

export function arrayContains<T>(array: T[], el: T): boolean {
    return array.indexOf(el) != -1
}

export async function isDirectory(directoryPath: string): Promise<boolean> {
    const stats = await fs.lstat(directoryPath);
    return stats.isDirectory();
}

export async function pathExists(path: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        fssync.exists(path, exists => {
            resolve(exists);
        })
    });
}

export function startsWith(value: string, prefix: string): boolean {
    return value && prefix && value.indexOf(prefix) === 0;
}

export function endsWith(value: string, suffix: string): boolean {
    return value && suffix && value.length >= suffix.length && value.lastIndexOf(suffix) === value.length - suffix.length;
}

export function contains(values: string[], searchString: string): boolean {
    return values.indexOf(searchString) !== -1;
}
