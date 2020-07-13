import { AvroReaderFactory } from "./AvroReaderFactory";
import { ContainerClient } from "@azure/storage-blob";
import { Chunk } from "./Chunk";
import { AvroReader } from "../../storage-internal-avro/src";
import { bodyToAvroReadable } from "./utils/utils.node";

export class ChunkFactory {
  private readonly _avroReaderFactory: AvroReaderFactory;

  constructor(avroReaderFactory: AvroReaderFactory) {
    this._avroReaderFactory = avroReaderFactory;
  }

  public async create(
    containerClient: ContainerClient,
    chunkPath: string,
    blockOffset?: number,
    eventIndex?: number
  ): Promise<Chunk> {
    const blobClient = containerClient.getBlobClient(chunkPath);
    blockOffset = blockOffset || 0;
    eventIndex = eventIndex || 0;

    const downloadRes = await blobClient.download(blockOffset);

    const dataStream = bodyToAvroReadable(downloadRes);
    let avroReader: AvroReader;
    if (blockOffset !== 0) {
      const headerDownloadRes = await blobClient.download(0);
      const headerStream = bodyToAvroReadable(headerDownloadRes);
      avroReader = this._avroReaderFactory.create(
        dataStream,
        headerStream,
        blockOffset,
        eventIndex
      );
    } else {
      avroReader = this._avroReaderFactory.create(dataStream);
    }

    return new Chunk(avroReader, blockOffset, eventIndex);
  }
}
