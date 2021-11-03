// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import os from "os";

export function mapPartitionKeyToId(partitionKey: string, partitionCount: number): number {
    const hash = computeHash(Buffer.from(partitionKey, "utf8"));
    const hashedParitionKey = castToInt16(hash.c ^ hash.b);
    console.log(hashedParitionKey)
    return Math.abs(hashedParitionKey % partitionCount);
}

function readUInt32(data: Buffer, offset: number): number {
    return os.endianness() === "BE" ? data.readUInt32BE(offset) : data.readUInt32LE(offset);
}

function addUInt32(n1: number, n2: number): number {
    return (n1 + n2) % 4294967296;
}

function castToUInt32(n: number): number {
    return (new Uint32Array([n]))[0];
}

function castToInt16(n: number): number {
    return (new Int16Array([n]))[0];
}

function computeHash(data: Buffer, seed1: number = 0, seed2: number = 0): any {
    let a: number, b: number, c: number;

    a = b = c = castToUInt32((0xdeadbeef + data.length + seed1));
    c = addUInt32(c, seed2);

    let index = 0, size = data.length;
    while (size > 12) {
        a = addUInt32(a, readUInt32(data, index));
        b = addUInt32(b, readUInt32(data, index + 4));
        c = addUInt32(c, readUInt32(data, index + 8));

        a -= c;
        a ^= (c << 4) | (c >> 28);
        c = addUInt32(c, b);

        b -= a;
        b ^= (a << 6) | (a >> 26);
        a = addUInt32(a, c);

        c -= b;
        c ^= (b << 8) | (b >> 24);
        b = addUInt32(b, a);

        a -= c;
        a ^= (c << 16) | (c >> 16);
        c = addUInt32(c, b);

        b -= a;
        b ^= (a << 19) | (a >> 13);
        a = addUInt32(a, c);

        c -= b;
        c ^= (b << 4) | (b >> 28);
        b = addUInt32(b, a);

        index += 12;
        size -= 12;
    }

    let curr = size;
    switch (curr) {
        case 12:
            a = addUInt32(a, readUInt32(data, index));
            b = addUInt32(b, readUInt32(data, index + 4));
            c = addUInt32(c, readUInt32(data, index + 8));
            break;
        case 11:
            c = addUInt32(c, castToUInt32(data[index + 10]) << 16);
            curr = 10;
        case 10:
            c = addUInt32(c, castToUInt32(data[index + 9]) << 8);
            curr = 9;
        case 9:
            c = addUInt32(c, castToUInt32(data[index + 8]));
            curr = 8;
        case 8:
            b = addUInt32(b, readUInt32(data, index + 4));
            a = addUInt32(a, readUInt32(data, index));
            break;
        case 7:
            b = addUInt32(b, castToUInt32(data[index + 6]) << 16);
            curr = 6;
        case 6:
            b = addUInt32(b, castToUInt32(data[index + 5]) << 8);
            curr = 5;
        case 5:
            b = addUInt32(b, castToUInt32(data[index + 4]));
            curr = 4;
        case 4:
            a = addUInt32(a, readUInt32(data, index));
            break;
        case 3:
            a = addUInt32(a, castToUInt32(data[index + 2]) << 16);
            curr = 2;
        case 2:
            a = addUInt32(a, castToUInt32(data[index + 1]) << 8);
            curr = 1;
        case 1:
            a = addUInt32(a, castToUInt32(data[index]));
            break;
        case 0:
            return { b, c };
    }

    c = castToUInt32(c ^ b);
    c = castToUInt32(c - ((b << 14) | (b >>> 18)));

    a = castToUInt32(a ^ c);
    a = castToUInt32(a - ((c << 11) | (c >>> 21)));

    b = castToUInt32(b ^ a);
    b = castToUInt32(b - ((a << 25) | (a >>> 7)));

    c = castToUInt32(c ^ b);
    c = castToUInt32(c - ((b << 16) | (b >>> 16)));

    a = castToUInt32(a ^ c);
    a = castToUInt32(a - ((c << 4) | (c >>> 28)));

    b = castToUInt32(b ^ a);
    b = castToUInt32(b - ((a << 14) | (a >>> 18)));

    c = castToUInt32(c ^ b);
    c = castToUInt32(c - ((b << 24) | (b >>> 8)));

    return { b, c };
}