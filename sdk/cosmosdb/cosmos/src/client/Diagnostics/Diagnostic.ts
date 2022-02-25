// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 } from "uuid";
import { createClientLogger } from "@azure/logger";

const uuid = v4;

/**
 * Cosmos Diagnostics used for all clients within the Cosmos package
 */
export class CosmosTraceDiagnostics implements CosmosDiagnostics {
  logger = createClientLogger("Cosmos Diagnostics");
  public traceId: string;
  public startTime: number;
  private duration: number = 0;
  private traceContactedRegions: Array<TraceComponent>;
  private trace: Array<TraceComponent>;

  public endCosmosDiagnosticTrace(time: number): void {
    this.duration = time - this.startTime;
    //console.log(JSON.stringify(this));
  }

  public startCosmosDiagnosticTrace(): void {
    this.startChild("Starting Cosmos trace diagnostics: ", this.startTime);
    this.startChild("Trace ID: ", this.correlationTraceId(uuid()));
  }

  public correlationTraceId(correlationId: string) {
    this.traceId = correlationId;
    this.startChild("Trace ID: ", correlationId);
  }

  public getClientElapsedTime(): number {
    return this.duration;
  }

  public toString(): string {
    return JSON.stringify(this.trace);
  }

  public getContactedRegions() {
    return JSON.stringify(this.traceContactedRegions);
  }

  public addTrace(
    targetHandler: string,
    levelInfo: string,
    trace: string,
    requestHandler?: string
  ) {
    this.startChild("traceId: ", this.traceId);
    this.startChild("targetHandler", targetHandler);
    this.startChild("requestHandler", requestHandler);
    this.startChild("traceLevel", levelInfo);
    this.startChild("trace", trace);
  }

  public addRegion(key: string, value: TraceComponent | any): any {
    this.startChild(key, value);
  }

  private startChild(key: string, value: TraceComponent | any): any {
    this.trace.push(this.startChild(key, this.startChild(key, value)));
  }
}
interface CosmosDiagnostics {
  getClientElapsedTime(): number;
  toString(): string;
  getContactedRegions(): string;
}
interface TraceComponent {
  (key: string, value: TraceComponent): void;
}
