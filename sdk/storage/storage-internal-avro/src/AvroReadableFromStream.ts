import { AvroReadable } from "./AvroReadable";

export class AvroReadableFromStream extends AvroReadable {
  private _position: number;
  private _readable: NodeJS.ReadableStream;

  private toUint8Array(data: string | Buffer): Uint8Array {
    if (typeof data === "string") {
      return Buffer.from(data);
    }
    return data;
  }

  // private _stillReadable: boolean;
  constructor(readable: NodeJS.ReadableStream) {
    super();
    this._readable = readable;
    this._position = 0;
    // workaround due to Readable.readable only availabe after Node.js v11.4
    // this._stillReadable = true;
    // this._readable.on("end", () => {
    //   this._stillReadable = false;
    // });
    // this._readable.on("error", () => {
    //   this._stillReadable = false;
    // });
  }
  public get position(): number {
    return this._position;
  }
  public async read(size: number): Promise<Uint8Array> {
    if (size < 0) {
      throw new Error(`size parameter should be positive: ${size}`);
    }

    if (size === 0) {
      return new Uint8Array();
    }

    // readable is true if it is safe to call readable.read(), which means the stream has not been destroyed or emitted 'error' or 'end'.
    // if (!this._stillReadable || this._readable.destroyed) {
    if (!this._readable.readable) {
      throw new Error("Stream no longer readable.");
    }
    // See if there is already enough data, note that "Only after readable.read() returns null, 'readable' will be emitted."
    let chunk = this._readable.read(size);
    if (chunk) {
      this._position += chunk.length;
      // chunk.lenght maybe less than desired size if the stream ends.
      return this.toUint8Array(chunk);
    } else {
      // register callback to wait for enough data to read
      return new Promise((resolve, reject) => {
        const callback = () => {
          let chunk = this._readable.read(size);
          if (chunk) {
            this._position += chunk.length;
            // chunk.lenght maybe less than desired size if the stream ends.
            resolve(this.toUint8Array(chunk));
            this._readable.removeListener("readable", callback);
          }
        };
        this._readable.on("readable", callback);
        this._readable.once("error", reject);
        this._readable.once("end", reject);
        this._readable.once("close", reject);
      });
    }
  }
}
