// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TypeError } from './errors.js';

export function allocateBuffer(size: number): Buffer {
  return Buffer.alloc(size);
}

export function generateUuid(): string {
  return uuidToString(uuid4());
}

export function uuid4(): Buffer {
  const bytes = allocateBuffer(16);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = Math.random() * 255 | 0;
  }

  // From RFC4122, the version bits are set to 0100
  bytes[7] &= 0x0F;
  bytes[7] |= 0x40;

  // From RFC4122, the top two bits of byte 8 get set to 01
  bytes[8] &= 0x3F;
  bytes[8] |= 0x80;

  return bytes;
}

export function uuidToString(buffer: Buffer): string {
  if (buffer.length === 16) {
    const chunks = [
      buffer.slice(0, 4),
      buffer.slice(4, 6),
      buffer.slice(6, 8),
      buffer.slice(8, 10),
      buffer.slice(10, 16)
    ];
    return chunks.map((b) => b.toString('hex')).join('-');
  }
  throw new TypeError('Not a UUID, expecting 16 byte buffer');
}

const parseUuid = /^([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/;

export function stringToUuid(uuidString: string): Buffer {
  const parts = parseUuid.exec(uuidString.toLowerCase());
  if (parts) {
    return Buffer.from(parts.slice(1).join(''), 'hex');
  }
  throw new TypeError('Not a valid UUID string: ' + uuidString);
}

export function clone<T extends object>(o: T): T {
  return Object.create(Object.getPrototypeOf(o), Object.getOwnPropertyDescriptors(o));
}

type PredicateFunction<T> = (o: T) => boolean;

export function and<T>(f: PredicateFunction<T>, g?: PredicateFunction<T>): PredicateFunction<T> {
  if (g === undefined) return f;
  return (o: T) => f(o) && g(o);
}

interface AmqpEntity {
  is_sender(): boolean;
  is_receiver(): boolean;
}

export function isSender(o: AmqpEntity): boolean {
  return o.is_sender();
}

export function isReceiver(o: AmqpEntity): boolean {
  return o.is_receiver();
}

export function senderFilter<T extends AmqpEntity>(filter?: PredicateFunction<T>): PredicateFunction<T> {
  return and(isSender as PredicateFunction<T>, filter);
}

export function receiverFilter<T extends AmqpEntity>(filter?: PredicateFunction<T>): PredicateFunction<T> {
  return and(isReceiver as PredicateFunction<T>, filter);
}

export function isDefined<T>(field: T | undefined | null): field is T {
  return field !== undefined && field !== null;
}
