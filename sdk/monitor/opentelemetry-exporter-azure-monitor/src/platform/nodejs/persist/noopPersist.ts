import { PersistentStorage } from "../../../types";

export class NoopPersist implements PersistentStorage {
  async shift(): Promise<unknown> {
    return [];
  }
  async push(_: unknown[]): Promise<boolean> {
    return false;
  }
}
