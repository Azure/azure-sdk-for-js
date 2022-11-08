// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { v4 as uuidv4 } from "uuid";
import uuidValidate from "uuid-validate";
import zlib from "zlib";
import pathlib from "path";
import fs from "fs";
import { Readable } from "stream";
import { file as tmpFile } from "tmp-promise";
import { promisify } from "util";

export enum CompressionType {
  ZIP = ".zip",
  GZIP = ".gz",
  None = "",
}

const getSourceId = (sourceId: string | null): string => {
  if (sourceId) {
    if (!uuidValidate(sourceId, 4)) {
      throw Error("sourceId is not a valid uuid/v4");
    }
    return sourceId;
  }
  return uuidv4();
};

export class FileDescriptor {
  readonly name: string;
  readonly extension: string;
  size: number | null;
  sourceId: string;
  zipped: boolean;
  compressionType: CompressionType;
  cleanupTmp?: () => Promise<void>;

  constructor(
    readonly filePath: string,
    sourceId: string | null = null,
    size: number | null = null,
    compressionType: CompressionType = CompressionType.None
  ) {
    this.compressionType = compressionType;
    this.name = pathlib.basename(this.filePath);
    this.extension = pathlib.extname(this.filePath).toLowerCase();
    this.size = size;
    this.zipped =
      compressionType !== CompressionType.None ||
      this.extension === ".gz" ||
      this.extension === ".zip";
    this.sourceId = getSourceId(sourceId);
  }

  async _gzip(): Promise<string> {
    const { path, cleanup } = await tmpFile({ postfix: ".gz", keep: false });
    this.cleanupTmp = cleanup;

    const zipper = zlib.createGzip();
    const input = fs.createReadStream(this.filePath, { autoClose: true });
    const output = fs.createWriteStream(path);

    await new Promise((resolve, reject) => {
      input
        .pipe(zipper)
        .pipe(output)
        .on("error", (err) => {
          reject(err);
        });
      output.once("close", () => {
        resolve(null);
      });
    });

    return path;
  }

  async prepare(): Promise<string> {
    if (this.zipped) {
      const estimatedCompressionModifier = 11;
      await this.calculateSize(estimatedCompressionModifier);
      return this.filePath;
    }

    const path = await this._gzip();
    await this.calculateSize();
    return path;
  }

  private async calculateSize(modifier: number = 1): Promise<void> {
    if (this.size == null || this.size <= 0) {
      const asyncStat = promisify(fs.stat);
      this.size = (await asyncStat(this.filePath)).size * modifier;
    }
  }

  async cleanup(): Promise<void> {
    if (this.cleanupTmp) {
      await this.cleanupTmp();
    }
  }
}

export class StreamDescriptor {
  name: string;
  size: number | null;
  compressionType: CompressionType;
  sourceId: string;

  constructor(
    readonly stream: Readable,
    sourceId: string | null = null,
    compressionType: CompressionType = CompressionType.None
  ) {
    this.name = "stream";
    this.size = null;
    this.compressionType = compressionType;
    this.sourceId = getSourceId(sourceId);
  }

  merge(other: StreamDescriptor) {
    this.name = other.name;
    this.size = other.size;
    this.compressionType = other.compressionType;
    this.sourceId = other.sourceId;
    return this;
  }
}

export class BlobDescriptor {
  size: number | null;
  sourceId: string;

  constructor(readonly path: string, size: number | null = null, sourceId: string | null = null) {
    this.size = size;
    this.sourceId = getSourceId(sourceId);
  }
}
