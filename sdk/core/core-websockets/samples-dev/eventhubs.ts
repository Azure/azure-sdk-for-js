// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import WebSocket from 'ws';
import { randomUUID } from '@azure/core-util';
import { DefaultAzureCredential, getBearerTokenProvider } from '@azure/identity';
import 'dotenv/config';

/**
 * Writes an AMQP null (0x40).
 */
function encodeNull(): Buffer {
  return Buffer.from([0x40]);
}

/**
 * Encodes an AMQP uint:
 *  - 0 => 0x43 (uint0)
 *  - <256 => 0x52 + 1 byte
 *  - else => 0x70 + 4 bytes
 */
function encodeUint(val: number): Buffer {
  if (val === 0) {
    return Buffer.from([0x43]);
  }
  if (val < 256) {
    return Buffer.from([0x52, val]);
  }
  const buf = Buffer.alloc(5);
  buf[0] = 0x70;
  buf.writeUInt32BE(val, 1);
  return buf;
}

/**
 * Encodes a 16-bit signed short (0x61).
 * Some brokers expect channel-max in this 16-bit form if <32767.
 */
function encodeShort(val: number): Buffer {
  const buf = Buffer.alloc(3);
  buf[0] = 0x61;
  buf.writeInt16BE(val, 1);
  return buf;
}

/**
 * Encodes a UTF-8 string with short or long format.
 */
function encodeString(str: string): Buffer {
  const data = Buffer.from(str, 'utf8');
  if (data.length < 256) {
    return Buffer.concat([Buffer.from([0xA1, data.length]), data]);
  }
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  return Buffer.concat([Buffer.from([0xB1]), lenBuf, data]);
}

/**
 * Encodes a list => 0xC0, size, count, content
 */
function encodeList(items: Buffer[]): Buffer {
  const content = Buffer.concat(items);
  const count = items.length;
  const size = 1 + content.length;
  return Buffer.concat([Buffer.from([0xC0, size, count]), content]);
}

/**
 * Builds a complete AMQP frame => 8-byte header + performative + 0xCE
 */
function buildFrame(performative: Buffer, channel: number = 0): Buffer {
  const header = Buffer.alloc(8);
  const frameSize = 8 + performative.length + 1;
  header.writeUInt32BE(frameSize, 0);
  header.writeUInt8(2, 4);
  header.writeUInt8(0, 5);
  header.writeUInt16BE(channel, 6);
  return Buffer.concat([header, performative, Buffer.from([0xCE])]);
}

/**
 * FIXED: We no longer encode `idle-time-out` as a 64-bit ulong (0x80).
 * Instead, we use a 32-bit encoding (via encodeUint) so the broker doesn't reject 0x80.
 * If you want an extremely large idle-time-out, be aware it can't exceed 4294967295 (32-bit max).
 */
function encodeOpen(containerId: string, hostname: string): Buffer {
  const containerIdBuf = encodeString(containerId);
  const hostnameBuf = encodeString(hostname);

  // Stays 32-bit: 65536 => code 0x70 for max-frame-size
  const maxFrameSize = encodeUint(65536);
  
  // channel-max => 16-bit short => code 0x61
  const channelMax = encodeShort(8191);

  // idle-time-out => use 32-bit, e.g. 300000 (5 minutes) or the 32-bit maximum if you need very large
  // We'll use 300000 as an example. If you need bigger, you can do up to 4294967295.
  const idleTimeout = encodeUint(300000);

  // The rest: outgoing-locales, incoming-locales, offered-capabilities, desired-capabilities, properties
  const outgoingLocales = encodeNull();
  const incomingLocales = encodeNull();
  const offeredCapabilities = encodeNull();
  const desiredCapabilities = encodeNull();
  const properties = encodeNull();

  // 10 fields
  const fields: Buffer[] = [
    containerIdBuf,
    hostnameBuf,
    maxFrameSize,
    channelMax,
    idleTimeout,
    outgoingLocales,
    incomingLocales,
    offeredCapabilities,
    desiredCapabilities,
    properties
  ];

  const list = encodeList(fields);
  const descriptor = Buffer.from([0x00, 0x53, 0x10]); 
  return Buffer.concat([descriptor, list]);
}

/**
 * Minimal Begin with 4 fields => [0]1, [1]5000, [2]5000, [3]4294967295
 */
function encodeBegin(): Buffer {
  const fields: Buffer[] = [
    encodeUint(1),
    encodeUint(5000),
    encodeUint(5000),
    encodeUint(4294967295)
  ];
  const list = encodeList(fields);
  const descriptor = Buffer.from([0x00, 0x53, 0x11]);
  return Buffer.concat([descriptor, list]);
}

/**
 * Decode a single AMQP frame => skip 8 + trailing 0xCE, parse descriptor
 */
function decodeFrame(buf: Buffer): { descriptor: number; payload: Buffer } {
  if (buf.length <= 8) {
    throw new Error('Not a full frame');
  }
  const body = buf.slice(8, buf.length - 1);
  if (body[0] !== 0x00 || body[1] !== 0x53) {
    throw new Error('Invalid frame descriptor');
  }
  const descriptor = body[2];
  const payload = body.slice(3);
  return { descriptor, payload };
}

/** Check if data is mostly ASCII */
function isMostlyPrintable(data: Buffer): boolean {
  let printable = 0;
  for (let i = 0; i < data.length; i++) {
    const b = data[i];
    if ((b >= 32 && b <= 126) || b === 9 || b === 10 || b === 13) {
      printable++;
    }
  }
  return data.length && (printable / data.length) > 0.8;
}

/**
 * Produce a human-readable decode of the frame
 */
function decodeFrameReadable(buf: Buffer): string {
  try {
    const { descriptor, payload } = decodeFrame(buf);
    const desc = `0x${descriptor.toString(16)}`;
    if (!payload.length) {
      return `Frame Descriptor ${desc}, payload <empty>`;
    }
    if (isMostlyPrintable(payload)) {
      return `Frame Descriptor ${desc}, payload="${payload.toString('utf8')}"`;
    }
    return `Frame Descriptor ${desc}, payload(hex)=${payload.toString('hex')}`;
  } catch (err) {
    return `Failed to decode: ${err}`;
  }
}

class AMQPConnection {
  ws: WebSocket;
  wsEndpoint: string;
  constructor(wsEndpoint: string) {
    this.wsEndpoint = wsEndpoint;
    this.ws = new WebSocket(wsEndpoint, ['AMQPWSB10']);
    this.ws.binaryType = 'arraybuffer';

    this.ws.on('message', (data) => {
      const buf = Buffer.isBuffer(data) ? data : Buffer.from(data as ArrayBuffer);
      if (buf.length === 8) {
        console.log('Received AMQP header from service:', buf.toString('utf8'));
      } else {
        console.log('Received incoming frame:', decodeFrameReadable(buf));
      }
    });
  }

  async connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.ws.on('open', () => {
        const amqpHeader = Buffer.from([0x41, 0x4D, 0x51, 0x50, 0x00, 0x01, 0x00, 0x00]);
        console.log('OUTGOING: AMQP header');
        this.ws.send(amqpHeader);

        const urlObj = new URL(this.wsEndpoint);
        const containerId = randomUUID();
        // 10-field Open (channelMax => short, idleTimeout => 32-bit)
        const openFrame = buildFrame(encodeOpen(containerId, urlObj.hostname));
        console.log('OUTGOING: Open frame (10 fields) =>', decodeFrameReadable(openFrame));
        this.ws.send(openFrame);

        const beginFrame = buildFrame(encodeBegin());
        console.log('OUTGOING: Begin frame =>', decodeFrameReadable(beginFrame));
        this.ws.send(beginFrame);

        resolve();
      });
      this.ws.on('error', reject);
    });
  }

  close() {
    this.ws.close();
  }
}

/**
 * Minimal main: connect, send 10-field Open with short channelMax and 32-bit idleTimeout, send Begin, then close.
 */
async function main() {
  const fqdn = process.env.EVENTHUB_FQDN || 'account.servicebus.windows.net';
  // Example => wss://defaultKeyName@account.servicebus.windows.net:443/$servicebus/websocket
  const wssUrl = `wss://defaultKeyName@${fqdn}:443/$servicebus/websocket`;
  console.log('Connecting to =>', wssUrl);

  const conn = new AMQPConnection(wssUrl);
  await conn.connect();

  // Wait a few seconds to observe
  setTimeout(() => {
    console.log('Closing...');
    conn.close();
  }, 5000);
}

main().catch((err) => console.error('Error running sample:', err));
