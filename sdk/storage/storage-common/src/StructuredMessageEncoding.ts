import { StorageCRC64Calculator } from "./StorageCRC64Calculator.js";
import { isNodeLike } from "@azure/core-util";

export const MESSAGE_VERSION: number = 1;
export const MESSAGE_HEADER_LENGTH: number = 13;
export const SEGMENT_HEADER_LENGTH: number = 10;
export const FOOTER_LENGTH: number = 8;
export const MAX_SEGMENT_CONTENT_LENGTH = 4 * 1024 * 1024;

enum SMRegion {
  StreamHeader,
  StreamFooter,
  SegmentHeader,
  SegmentFooter,
  SegmentContent,
  Completed,
}

export class StructuredMessageEncoding {
  private pushData: (data: any) => any;
  private contentLength: number;
  public readonly messageLength: number;

  public constructor(pushData: (data: any) => any, contentLength: number) {
    this.pushData = pushData;
    this.contentLength = contentLength;
    this.contentOffset = 0;
    this.currentDataOffset = 0;
    this.segmentsCount = Math.ceil(this.contentLength / MAX_SEGMENT_CONTENT_LENGTH);

    this.messageLength =
      this.contentLength +
      MESSAGE_HEADER_LENGTH +
      (SEGMENT_HEADER_LENGTH + FOOTER_LENGTH) * this.segmentsCount +
      FOOTER_LENGTH;

    this.messageHeaderBuffer = new Uint8Array(MESSAGE_HEADER_LENGTH);

    this.segmentNumber = 0;

    this.segmentContentLength = 0;
    this.segmentContentOffset = 0;

    this.state = SMRegion.StreamHeader;

    this.segmentCrc64 = new StorageCRC64Calculator();
    this.messageCrc64 = new StorageCRC64Calculator();
  }

  private currentDataOffset: number;
  private contentOffset: number;
  private segmentsCount: number;

  private messageHeaderBuffer: Uint8Array;

  private segmentNumber: number;

  private segmentContentLength: number;
  private segmentContentOffset: number;

  private segmentCrc64: StorageCRC64Calculator;
  private messageCrc64: StorageCRC64Calculator;

  private state: SMRegion;

  public sourceDataHandler = (data: Buffer) => {
    this.currentDataOffset = 0;

    if (this.state === SMRegion.StreamHeader) {
      this.handlingMessageHeader();
    }

    while (this.segmentNumber < this.segmentsCount) {
      this.segmentContentLength = Math.min(
        MAX_SEGMENT_CONTENT_LENGTH,
        this.contentLength - this.contentOffset,
      );

      if (this.state === SMRegion.SegmentHeader) {
        this.handlingSegmentHeader();
      }

      if (this.state === SMRegion.SegmentContent) {
        this.handlingSegmentContent(data);
      }

      if (this.state === SMRegion.SegmentFooter) {
        this.handlingSegmentFooter();
        this.contentOffset += this.segmentContentLength;
      }

      if (this.currentDataOffset === data.length) {
        break;
      }
    }

    if (this.state === SMRegion.StreamFooter) {
      this.handlingMessageFooter();
    }
  };

  private handlingMessageHeader() {
    this.messageHeaderBuffer[0] = MESSAGE_VERSION;

    this.fillInt64(this.messageHeaderBuffer, 1, this.messageLength); //content length

    this.fillInt16(this.messageHeaderBuffer, 9, 1);

    this.fillInt16(this.messageHeaderBuffer, 11, this.segmentsCount);

    this.pushData(this.messageHeaderBuffer);
    this.state = SMRegion.SegmentHeader;
  }

  private handlingSegmentHeader() {
    const segmentHeaderBuffer = new Uint8Array(SEGMENT_HEADER_LENGTH);
    this.fillInt16(segmentHeaderBuffer, 0, this.segmentNumber + 1);

    this.fillInt64(segmentHeaderBuffer, 2, this.segmentContentLength);
    this.segmentContentOffset = 0;

    this.pushData(segmentHeaderBuffer);
    this.state = SMRegion.SegmentContent;
  }

  private handlingSegmentContent(data: Buffer) {
    const length = Math.min(
      this.segmentContentLength - this.segmentContentOffset,
      data.length - this.currentDataOffset,
    );

    if (length !== 0) {
      const current_content = Uint8Array.prototype.slice.call(
        data,
        this.currentDataOffset,
        this.currentDataOffset + length,
      );
      this.messageCrc64.Append(current_content, length);
      this.segmentCrc64.Append(current_content, length);
      this.pushData(current_content);
    }

    this.segmentContentOffset += length;
    this.currentDataOffset += length;

    if (this.segmentContentOffset === this.segmentContentLength) {
      this.state = SMRegion.SegmentFooter;
    }
  }

  private handlingSegmentFooter() {
    const crc64Result = this.segmentCrc64.Final(new Uint8Array([]), 0);
    this.pushData(crc64Result);

    this.segmentCrc64 = new StorageCRC64Calculator();

    ++this.segmentNumber;
    if (this.segmentNumber === this.segmentsCount) {
      this.state = SMRegion.StreamFooter;
    } else {
      this.state = SMRegion.SegmentHeader;
    }
  }

  private handlingMessageFooter() {
    const crc64Result = this.messageCrc64.Final(new Uint8Array([]), 0);
    this.pushData(crc64Result);
    if (isNodeLike) {
      this.pushData(null);
    }
    this.state = SMRegion.Completed;
  }

  private fillInt64(buffer: Uint8Array, offset: number, input: number) {
    if (buffer.length < offset + 8) {
      throw new Error("Buffer length is not expected.");
    }

    if (isNodeLike) {
      const internalBuffer = Buffer.alloc(8);
      internalBuffer.writeBigUInt64LE(BigInt(input));

      for (let index = 0; index < 6; ++index) {
        buffer[offset + index] = internalBuffer[index];
      }
    } else {
      const view = new DataView(buffer.buffer, offset, 8);
      view.setBigUint64(0, BigInt(input), true);
    }
  }

  private fillInt16(buffer: Uint8Array, offset: number, input: number) {
    if (buffer.length < offset + 2) {
      throw new Error("Buffer length is not expected.");
    }

    if (isNodeLike) {
      const internalBuffer = Buffer.alloc(2);
      internalBuffer.writeInt16LE(input);

      for (let index = 0; index < 2; ++index) {
        buffer[offset + index] = internalBuffer[index];
      }
    } else {
      const view = new DataView(buffer.buffer, offset, 2);
      view.setUint16(0, input, true);
    }
  }
}
