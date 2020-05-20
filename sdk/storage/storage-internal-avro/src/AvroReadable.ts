export abstract class AvroReadable {
  public abstract get position(): number;
  public abstract async read(size: number): Promise<Uint8Array>;
}
