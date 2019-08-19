import { ContainerDefinition } from "./ContainerDefinition";

export interface ContainerRequest extends ContainerDefinition {
  /** Throughput for this container. */
  throughput?: number;
}
