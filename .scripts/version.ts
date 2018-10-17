/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

export class Version {
    major: number;
    minor: number;
    patch: number;
    suffix?: string;

    constructor(version: string) {
        const parts = version.split("-");
        this.suffix = parts[1];

        const numbers = parts[0].split(".");
        this.major = Number.parseInt(numbers[0]);
        this.minor = Number.parseInt(numbers[1]);
        this.patch = Number.parseInt(numbers[2]);
    }

    static parse(version: string) {
        return new Version(version);
    }

    bumpMajor() {
        this.major = this.major + 1;
    }

    bumpMinor() {
        this.minor = this.minor + 1;
    }

    bumpPath() {
        this.patch = this.patch + 1;
    }

    toString(): string {
        const suffix = this.suffix ? `-${this.suffix}` : "";
        return `${this.major}.${this.minor}.${this.patch}${suffix}`;
    }
}
