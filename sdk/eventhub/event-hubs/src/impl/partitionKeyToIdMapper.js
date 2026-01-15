// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable no-fallthrough */
export function mapPartitionKeyToId(partitionKey, partitionCount) {
    const hashedParitionKey = hashPartitionKey(partitionKey);
    return Math.abs(hashedParitionKey % partitionCount);
}
/**
 * @internal
 */
export function hashPartitionKey(partitionKey) {
    const hash = computeHash(Buffer.from(partitionKey, "utf8"));
    return castToInt16(hash.c ^ hash.b);
}
function readUInt32(data, offset) {
    return data.readUInt32LE(offset);
}
function castToInt16(n) {
    return new Int16Array([n])[0];
}
function computeHash(data, seed1 = 0, seed2 = 0) {
    let a, b, c;
    a = b = c = 0xdeadbeef + data.length + seed1;
    c += seed2;
    let index = 0, size = data.length;
    while (size > 12) {
        a += readUInt32(data, index);
        b += readUInt32(data, index + 4);
        c += readUInt32(data, index + 8);
        a -= c;
        a ^= (c << 4) | (c >>> 28);
        c += b;
        b -= a;
        b ^= (a << 6) | (a >>> 26);
        a += c;
        c -= b;
        c ^= (b << 8) | (b >>> 24);
        b += a;
        a -= c;
        a ^= (c << 16) | (c >>> 16);
        c += b;
        b -= a;
        b ^= (a << 19) | (a >>> 13);
        a += c;
        c -= b;
        c ^= (b << 4) | (b >>> 28);
        b += a;
        index += 12;
        size -= 12;
    }
    let curr = size;
    switch (curr) {
        case 12:
            a += readUInt32(data, index);
            b += readUInt32(data, index + 4);
            c += readUInt32(data, index + 8);
            break;
        case 11:
            c += data[index + 10] << 16;
            curr = 10;
        case 10:
            c += data[index + 9] << 8;
            curr = 9;
        case 9:
            c += data[index + 8];
            curr = 8;
        case 8:
            b += readUInt32(data, index + 4);
            a += readUInt32(data, index);
            break;
        case 7:
            b += data[index + 6] << 16;
            curr = 6;
        case 6:
            b += data[index + 5] << 8;
            curr = 5;
        case 5:
            b += data[index + 4];
            curr = 4;
        case 4:
            a += readUInt32(data, index);
            break;
        case 3:
            a += data[index + 2] << 16;
            curr = 2;
        case 2:
            a += data[index + 1] << 8;
            curr = 1;
        case 1:
            a += data[index];
            break;
        case 0:
            return { b: b >>> 0, c: c >>> 0 };
    }
    c ^= b;
    c -= (b << 14) | (b >>> 18);
    a ^= c;
    a -= (c << 11) | (c >>> 21);
    b ^= a;
    b -= (a << 25) | (a >>> 7);
    c ^= b;
    c -= (b << 16) | (b >>> 16);
    a ^= c;
    a -= (c << 4) | (c >>> 28);
    b ^= a;
    b -= (a << 14) | (a >>> 18);
    c ^= b;
    c -= (b << 24) | (b >>> 8);
    return { b: b >>> 0, c: c >>> 0 };
}
//# sourceMappingURL=partitionKeyToIdMapper.js.map