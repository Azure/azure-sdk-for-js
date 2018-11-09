/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as fssync from "fs";
import { promises as fs } from "fs";
import { execSync } from "child_process";
import { getLogger } from "./logger";

const _logger = getLogger();

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
    return arrayContains(values, searchString);
}

export function execute(command: string, packageFolderPath: string): void {
    if (!fssync.existsSync(packageFolderPath)) {
        _logger.logWithPath(packageFolderPath, "Folder not found.");
    } else {
        execSync(command, { cwd: packageFolderPath, stdio: "inherit" });
    }
}

export function npmRunBuild(packageFolderPath: string): void {
    execute("npm run build", packageFolderPath);
}

export function npmInstall(packageFolderPath: string): void {
    execute("npm install", packageFolderPath);
}
