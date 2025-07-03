/// <summary>
/// Decodes a structured message stream as the data is read.
/// </summary>
/// <remarks>
/// Wraps the inner stream in a <see cref="BufferedStream"/>, which avoids using its internal
/// buffer if individual Read() calls are larger than it. This ensures one of the three scenarios
/// <list type="number">
/// <item>
/// Read buffer &gt;= stream buffer:
/// There is enough space in the read buffer for inline metadata to be safely
/// extracted in only one read to the true inner stream.
/// </item>
/// <item>
/// Read buffer &lt; next inline metadata:
/// The stream buffer has been activated, and we can read multiple small times from the inner stream
/// without multi-reading the real stream, even when partway through an existing stream buffer.
/// </item>
/// <item>
/// Else:
/// Same as #1, but also the already-allocated stream buffer has been used to slightly improve
/// resource churn when reading inner stream.
/// </item>
/// </list>
/// </remarks>

import { StorageCRC64Calculator } from "./StorageCRC64Calculator.js";
import { isNodeLike } from "@azure/core-util";

const MESSAGE_VERSION: number = 1;
const MESSAGE_HEADER_LENGTH: number = 13;
const SEGMENT_HEADER_LENGTH: number = 10;
const FOOTER_LENGTH: number = 8;

enum SMRegion {
  StreamHeader,
  StreamFooter,
  SegmentHeader,
  SegmentFooter,
  SegmentContent,
}

export class StructuredMessageDecoding {
  private pushData: (data: any) => any;
  private messageLength: number;
  private messageFlags: number;
  private segmentsCount: number;
  //   private currentState: SMRegion;
  private currentOffset: number;

  private currentDataOffset: number;

  private messageHeaderBuffer: Uint8Array;
  private messageHeaderOffset: number;

  private segmentNumber: number;
  private segmentHeaderOffset: number;
  private segmentHeaderBuffer: Uint8Array;

  private segmentContentOffset: number;
  private segmentContentLength: number;

  private segmentFooterOffset: number;
  private segmentFooterBuffer: Uint8Array;

  private messageFooterOffset: number;
  private messageFooterBuffer: Uint8Array;

  private segmentCrc64: StorageCRC64Calculator;
  private messageCrc64: StorageCRC64Calculator;

  private state: SMRegion;

  public constructor(pushData: (data: any) => any) {
    this.pushData = pushData;
    this.currentOffset = 0;
    this.messageLength = 0;
    this.messageFlags = 0;
    this.segmentsCount = 0;

    this.messageHeaderOffset = 0;
    this.messageHeaderBuffer = new Uint8Array(MESSAGE_HEADER_LENGTH);

    this.currentDataOffset = 0;

    this.segmentNumber = 0;
    this.segmentHeaderOffset = 0;
    this.segmentHeaderBuffer = new Uint8Array(SEGMENT_HEADER_LENGTH);

    this.segmentContentOffset = 0;
    this.segmentContentLength = 0;

    this.state = SMRegion.StreamHeader;

    this.segmentFooterOffset = 0;
    this.segmentFooterBuffer = new Uint8Array(FOOTER_LENGTH);

    this.messageFooterOffset = 0;
    this.messageFooterBuffer = new Uint8Array(FOOTER_LENGTH);

    this.segmentCrc64 = new StorageCRC64Calculator();
    this.messageCrc64 = new StorageCRC64Calculator();
  }

  public sourceDataHandler = (data: Buffer) => {
    this.currentDataOffset = 0;

    if (this.state === SMRegion.StreamHeader) {
      this.parseMessageHeader(data);
    }

    while (this.segmentNumber < this.segmentsCount && this.currentDataOffset < data.length) {
      if (this.state === SMRegion.SegmentHeader) {
        this.parseSegmentHeader(data);
      }

      if (this.state === SMRegion.SegmentContent) {
        this.parseSegmentContent(data);
      }
      if (this.state === SMRegion.SegmentFooter) {
        this.parseSegmentFooter(data);
      }
    }

    if (this.state === SMRegion.StreamFooter) {
      this.parseMessageFooter(data);
    }
  };

  private parseMessageHeader(data: Buffer) {
    const length = Math.min(
      MESSAGE_HEADER_LENGTH - this.messageHeaderOffset,
      data.length - this.currentDataOffset,
    );
    this.messageHeaderBuffer.set(
      Uint8Array.prototype.slice.call(
        data,
        this.currentDataOffset,
        this.currentDataOffset + length,
      ),
      this.messageHeaderOffset,
    );

    this.currentDataOffset += length;
    this.messageHeaderOffset += length;
    this.currentOffset += length;

    if (this.messageHeaderOffset === MESSAGE_HEADER_LENGTH) {
      const currentVersion = this.messageHeaderBuffer[0];
      if (currentVersion !== MESSAGE_VERSION) {
        throw new Error("Unexpected message version");
      }

      this.messageLength = this.toInt64(this.messageHeaderBuffer, 1);
      this.messageLength;

      this.messageFlags = this.toInt16(
        Uint8Array.prototype.slice.call(this.messageHeaderBuffer, 9, 11),
      );
      this.messageFlags;

      this.segmentsCount = this.toInt16(
        Uint8Array.prototype.slice.call(this.messageHeaderBuffer, 11, 13),
      );
      this.segmentsCount;
      this.state = SMRegion.SegmentHeader;
    }
  }

  private parseSegmentHeader(data: Buffer) {
    const length = Math.min(
      SEGMENT_HEADER_LENGTH - this.segmentHeaderOffset,
      data.length - this.currentDataOffset,
    );
    this.segmentHeaderBuffer.set(
      Uint8Array.prototype.slice.call(
        data,
        this.currentDataOffset,
        this.currentDataOffset + length,
      ),
      this.segmentHeaderOffset,
    );

    this.currentDataOffset += length;
    this.segmentHeaderOffset += length;
    this.currentOffset += length;

    if (this.segmentHeaderOffset === SEGMENT_HEADER_LENGTH) {
      const currentSegmentNumber = this.toInt16(
        Uint8Array.prototype.slice.call(this.segmentHeaderBuffer, 0, 2),
      );
      if (currentSegmentNumber !== this.segmentNumber + 1) {
        throw new Error("Segment number is unexpected.");
      }

      this.segmentContentLength = this.toInt64(this.segmentHeaderBuffer, 2);
      this.segmentContentOffset = 0;

      this.state = SMRegion.SegmentContent;
    }
  }

  private parseSegmentContent(data: Buffer) {
    const length = Math.min(
      this.segmentContentLength - this.segmentContentOffset,
      data.length - this.currentDataOffset,
    );
    const dataToHandle = Uint8Array.prototype.slice.call(
      data,
      this.currentDataOffset,
      this.currentDataOffset + length,
    );
    this.segmentCrc64.Append(dataToHandle, length);
    this.messageCrc64.Append(dataToHandle, length);

    this.pushData(dataToHandle);

    this.currentDataOffset += length;
    this.segmentContentOffset += length;
    this.currentOffset += length;

    if (this.segmentContentOffset === this.segmentContentLength) {
      this.state = SMRegion.SegmentFooter;
    }
  }

  private parseSegmentFooter(data: Buffer) {
    const length = Math.min(
      FOOTER_LENGTH - this.segmentFooterOffset,
      data.length - this.currentDataOffset,
    );

    this.segmentFooterBuffer.set(
      Uint8Array.prototype.slice.call(
        data,
        this.currentDataOffset,
        this.currentDataOffset + length,
      ),
      this.segmentFooterOffset,
    );

    this.currentDataOffset += length;
    this.segmentFooterOffset += length;
    this.currentOffset += length;

    if (this.segmentFooterOffset === FOOTER_LENGTH) {
      const crc64Result = this.segmentCrc64.Final(new Uint8Array([]), 0);
      if (!this.checkCrc64CheckSum(crc64Result, this.segmentFooterBuffer)) {
        throw new Error("Segment check sum mismatch"); //TODO: segment number and offset
      }

      ++this.segmentNumber;
      if (this.segmentNumber === this.segmentsCount) {
        this.state = SMRegion.StreamFooter;
      } else {
        this.segmentHeaderOffset = 0;
        this.segmentFooterOffset = 0;
        this.segmentCrc64 = new StorageCRC64Calculator();
        this.state = SMRegion.SegmentHeader;
      }
    }
  }

  private parseMessageFooter(data: Buffer) {
    const length = Math.min(
      FOOTER_LENGTH - this.messageFooterOffset,
      data.length - this.currentDataOffset,
    );
    this.messageFooterBuffer.set(
      Uint8Array.prototype.slice.call(
        data,
        this.currentDataOffset,
        this.currentDataOffset + length,
      ),
      this.messageFooterOffset,
    );

    this.currentDataOffset += length;
    this.messageFooterOffset += length;
    this.currentOffset += length;

    if (this.messageFooterOffset === FOOTER_LENGTH) {
      const crc64Result = this.messageCrc64.Final(new Uint8Array([]), 0);
      if (!this.checkCrc64CheckSum(crc64Result, this.messageFooterBuffer)) {
        throw new Error("Check sum mismatch");
      }
      this.pushData(null);
    }
  }

  private toInt64(input: Uint8Array, offset: number): number {
    if (input.length < offset + 8) {
      return 0;
      // TODO: throw out error
    }

    if (isNodeLike) {
      const internalBuffer = Buffer.alloc(8);
      for (let index = 0; index < 6; ++index) {
        internalBuffer[index] = input[offset + index];
      }

      return Number(internalBuffer.readBigInt64LE());
    } else {
      const view = new DataView(input.buffer, offset, 8);
      return Number(view.getBigUint64(0, true));
    }
  }

  private toInt16(input: Uint8Array): number {
    if (input.length !== 2) {
      return 0;
      // TODO: throw out error
    }

    if (isNodeLike) {
      const internalBuffer = Buffer.alloc(2);
      for (let index = 0; index < 2; ++index) {
        internalBuffer[index] = input[index];
      }

      return Number(internalBuffer.readInt16LE());
    } else {
      return input[0] + input[1] * 256;
    }
  }

  private checkCrc64CheckSum(first: Uint8Array, second: Uint8Array): boolean {
    if (first.length !== 8 || second.length !== 8) {
      throw new Error("CRC64 buffer error, something wrong with crc64 calculator");
    }

    for (let index = 0; index < 8; ++index) {
      if (first[index] !== second[index]) {
        return false;
      }
    }

    return true;
  }
}
