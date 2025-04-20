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

import { Readable } from "stream";
import { AbortError } from "@azure/abort-controller";
import { HttpRequestBody } from "../Pipeline";
import { isNodeReadableStream } from "./utils.common";
import { StorageCRC64Calculator } from "./StorageCRC64Calculator";
import { isNodeLike } from "@azure/core-util";

const MESSAGE_VERSION: number = 1;
const MESSAGE_HEADER_LENGTH: number = 13;
const SEGMENT_HEADER_LENGTH: number = 10;
const FOOTER_LENGTH: number = 8;
const MAX_SEGMENT_CONTENT_LENGTH = 4 * 1024 * 1024;

enum SMRegion {
  StreamHeader,
  StreamFooter,
  SegmentHeader,
  SegmentFooter,
  SegmentContent,
  Completed
}

export interface StructuredMessageEncodingStreamOptions {
  /**
   * Read progress event handler
   */
  // TODO: onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Debug purpose only. Used to inject an unexpected end to existing internal stream,
   * to test stream retry works well or not.
   *
   * When assign it to true, for next incoming "data" event of internal stream,
   * RetriableReadableStream will try to emit an "end" event to existing internal
   * stream to force it end and start retry from the breaking point.
   * The value will then update to "undefined", once the injection works.
   */
  doInjectErrorOnce?: boolean;

  /**
   * A threshold, not a limit. Dictates the amount of data that a stream buffers before it stops asking for more data.
   */
  highWaterMark?: number;
}

async function pump(
  reader: ReadableStreamDefaultReader, 
  controller: ReadableStreamDefaultController,
  encodingStream: StructuredMessageEncoding) : Promise<void> {
  const { done, value } = await reader.read();
  // When no more data needs to be consumed, close the stream
  if (done) {
    controller.close();
    return;
  }
  
  // Enqueue the next data chunk into our target stream
  encodingStream.sourceDataHandler(value);
}

export async function BrowserStream(source: Blob | ReadableStream<Uint8Array>, content_length: number): Promise<{content: Blob, encodedContentLength: number}> {
  const sourceStream = (source instanceof Blob) ? source.stream() : source;
  const reader = sourceStream.getReader();

  let encodingStream : StructuredMessageEncoding | undefined = undefined;
  const stream = new ReadableStream({
    start(controller) { 
      encodingStream = new StructuredMessageEncoding((data) => {
        controller.enqueue(data)
      }, content_length);
    },
    pull (controller) {
      pump(reader, controller, encodingStream!).then(() =>{});
    }
  });

  const response = new Response(stream);
  return {
    content: await response.blob(),
    encodedContentLength: encodingStream!.messageLength,
  }
}

export class StructuredMessageEncodingStream extends Readable {
  private source: NodeJS.ReadableStream
  private options: StructuredMessageEncodingStreamOptions;
  private encodingMethods: StructuredMessageEncoding;
  
  public static async init(
    source: HttpRequestBody,
    content_length: number,
  ): Promise<{ body: HttpRequestBody, encoded_content_length: number }> {
    if (source === null) {
      return {
        body: source,
        encoded_content_length: content_length,
      }
    }
    
    if (isNodeReadableStream(source)) {
      const encodingMessage = new StructuredMessageEncodingStream((source as any), content_length, {});
      return {
      body: encodingMessage,
      encoded_content_length: encodingMessage.messageLength(),
    }}

    // if (typeof (source) === 'function') {
    //     return {
    //     body: new StructuredMessageEncodingStream((source() as any), content_length, {}),
    //     encoded_content_length: content_length + MESSAGE_HEADER_LENGTH + SEGMENT_HEADER_LENGTH + FOOTER_LENGTH * 2,
    //   }
    // }

    if (source instanceof FormData) {
      const blob = await (new Response(source).blob());
      const encoding = await BrowserStream(blob, blob.size);
      return {
        body: encoding.content,
        encoded_content_length: encoding.encodedContentLength
      }
    }

    if (source instanceof Blob) {
      const encoding = await BrowserStream(source, content_length);
      return {
        body: encoding.content,
        encoded_content_length: encoding.encodedContentLength
      }
    }

    if ((typeof source) === 'string') {
      const s = new Readable();
      s._read = () => {};
      s.push(source);
      s.push(null);
      const string_content_length = Buffer.byteLength(source as string);
      return {
        body: await new StructuredMessageEncodingStream(s, string_content_length, {}),
        encoded_content_length: string_content_length + MESSAGE_HEADER_LENGTH + SEGMENT_HEADER_LENGTH + FOOTER_LENGTH * 2
      }
    }

    if (source instanceof ArrayBuffer){
      const stream = Readable.from(Buffer.from(source));
      return {
        body: await new StructuredMessageEncodingStream(stream, content_length, {}),
        encoded_content_length: content_length + MESSAGE_HEADER_LENGTH + SEGMENT_HEADER_LENGTH + FOOTER_LENGTH * 2
       }
    }

    if (ArrayBuffer.isView(source)){
      const stream = Readable.from(Buffer.from(source.buffer, source.byteOffset, source.byteLength));
      return {
        body: await new StructuredMessageEncodingStream(stream, content_length, {}),
        encoded_content_length: content_length + MESSAGE_HEADER_LENGTH + SEGMENT_HEADER_LENGTH + FOOTER_LENGTH * 2
       }
    }

    return {
      body: source,
      encoded_content_length: content_length
    };
  }

  public constructor(
    source: NodeJS.ReadableStream,
    contentLength: number,
    options: StructuredMessageEncodingStreamOptions,
  ) {
    super({ highWaterMark: options.highWaterMark });
    this.options = options;
    this.source = source;
    this.encodingMethods = new StructuredMessageEncoding((dataToHandle) =>{      
        if (!this.push(dataToHandle)) {
          source.pause();
        }
      }, contentLength);
    // if (objectType !== "string" &&
    //     typeof value.pipe !== "function" && // NodeJS.ReadableStream
    //     typeof value.tee !== "function" && // browser ReadableStream
    //     !(value instanceof ArrayBuffer) &&
    //     !ArrayBuffer.isView(value) &&
    //     // File objects count as a type of Blob, so we want to use instanceof explicitly
    //     !((typeof Blob === "function" || typeof Blob === "object") && value instanceof Blob) &&
    //     objectType !== "function") {
    this.setSourceEventHandlers();
  }

  public messageLength(): number{
    return this.encodingMethods.messageLength;
  }

  private setSourceEventHandlers() {
    this.source.on("data", this.sourceDataHandler);
    this.source.on("end", this.sourceErrorOrEndHandler);
    this.source.on("error", this.sourceErrorOrEndHandler);
    // needed for Node14
    this.source.on("aborted", this.sourceAbortedHandler);
  }

  private removeSourceEventHandlers() {
    this.source.removeListener("data", this.sourceDataHandler);
    this.source.removeListener("end", this.sourceErrorOrEndHandler);
    this.source.removeListener("error", this.sourceErrorOrEndHandler);
    this.source.removeListener("aborted", this.sourceAbortedHandler);
  }

  private sourceDataHandler = (data: Buffer) => {
    this.encodingMethods.sourceDataHandler(data);
  };
  private sourceAbortedHandler = () => {
    const abortError = new AbortError("The operation was aborted.");
    this.destroy(abortError);
  };

  private sourceErrorOrEndHandler = (err?: Error) => {
    if (err && err.name === "AbortError") {
      this.destroy(err);
      return;
    }

    // console.log(
    //   `Source stream emits end or error, offset: ${
    //     this.offset
    //   }, dest end : ${this.end}`
    // );
    this.removeSourceEventHandlers();
  };

  public _read(): void {
    this.source.resume();
    this.options;
  }

  _destroy(error: Error | null, callback: (error?: Error) => void): void {
    // remove listener from source and release source
    //this.removeSourceEventHandlers();
    //(this.source as Readable).destroy();

    callback(error === null ? undefined : error);
  }
}

export class StructuredMessageEncoding {
  private pushData: (data: any) => any;
  private contentLength: number;
  public readonly messageLength: number;

  public constructor(
    pushData: (data: any) => any,
    contentLength: number,
  ) {
    this.pushData = pushData;
    this.contentLength = contentLength;
    this.contentOffset = 0;
    this.currentDataOffset = 0;
    this.segmentsCount = Math.ceil(this.contentLength / MAX_SEGMENT_CONTENT_LENGTH);
    
    this.messageLength = this.contentLength + MESSAGE_HEADER_LENGTH + (SEGMENT_HEADER_LENGTH + FOOTER_LENGTH) * this.segmentsCount + FOOTER_LENGTH;
    
    this.messageHeaderBuffer = new Uint8Array(MESSAGE_HEADER_LENGTH);
        
    this.segmentNumber = 0;
    this.segmentHeaderBuffer = new Uint8Array(SEGMENT_HEADER_LENGTH);
    
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
  private segmentHeaderBuffer: Uint8Array;
  
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
        this.contentLength - this.contentOffset);
      
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

  private handlingSegmentHeader(){
    this.fillInt16(this.segmentHeaderBuffer, 0, this.segmentNumber + 1);

    this.fillInt64(this.segmentHeaderBuffer, 2, this.segmentContentLength);
    this.segmentContentOffset = 0;

    this.pushData(this.segmentHeaderBuffer);
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
      }
      else {
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
    }
    else {
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
    }
    else {
      const view = new DataView(buffer.buffer, offset, 2);
      view.setUint16(0, input, true);
    }
  }
}
