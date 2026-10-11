// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventEmitter } from "node:events";
import { context, trace } from "@opentelemetry/api";
import { InMemorySpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { MySQLInstrumentation } from "@opentelemetry/instrumentation-mysql";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

type QueryCallback = (error: Error | null, rows: number[]) => void;
type ConnectionCallback = (error: Error | null, connection: TestConnection) => void;

// Exercise the real upstream instrumentation patches without a database dependency.
class TestConnection {
  readonly config = { host: "localhost", port: 3306, database: "test" };
  readonly pending: (() => void)[] = [];

  query(_sql: string, callback: QueryCallback): void {
    this.pending.push(() => callback(null, [42]));
  }

  complete(): void {
    for (const callback of this.pending.splice(0)) callback();
  }
}

class TestPool extends EventEmitter {
  readonly connection = new TestConnection();
  readonly config = { connectionConfig: this.connection.config };
  readonly _allConnections = [this.connection];
  readonly _freeConnections = [this.connection];

  getConnection(callback: ConnectionCallback): void {
    callback(null, this.connection);
  }

  query(sql: string, callback: QueryCallback): void {
    this.getConnection((error, connection) => {
      if (error) callback(error, []);
      else connection.query(sql, callback);
    });
  }

  complete(): void {
    this.connection.complete();
  }

  end(callback: () => void): void {
    callback();
  }
}

describe("upstream MySQL instrumentation lifecycle", () => {
  let instrumentation: MySQLInstrumentation;
  let exporter: InMemorySpanExporter;
  let provider: NodeTracerProvider;
  const mysql = {
    createConnection: (): TestConnection => new TestConnection(),
    createPool: (): TestPool => new TestPool(),
    createPoolCluster: (): object => ({}),
  };

  beforeEach(() => {
    trace.disable();
    context.disable();
    exporter = new InMemorySpanExporter();
    provider = new NodeTracerProvider({ spanProcessors: [new SimpleSpanProcessor(exporter)] });
    provider.register();
    instrumentation = new MySQLInstrumentation();
    instrumentation.setTracerProvider(provider);
    instrumentation.getModuleDefinitions()[0].patch?.(mysql);
  });

  afterEach(async () => {
    instrumentation.getModuleDefinitions()[0].unpatch?.(mysql);
    instrumentation.disable();
    await provider.shutdown();
    trace.disable();
    context.disable();
  });

  it.each(["connection", "pool"] as const)(
    "blocks disabled telemetry and resumes with a recreated %s",
    (kind) => {
      const createClient = (): TestConnection | TestPool =>
        kind === "connection" ? mysql.createConnection() : mysql.createPool();
      let client = createClient();
      for (const enabled of [true, false, true, false, true]) {
        exporter.reset();
        if (enabled) {
          instrumentation.enable();
          // The supported recovery path is to recreate clients after re-enabling.
          client = createClient();
        } else {
          instrumentation.disable();
        }
        let result: number[] | undefined;
        client.query("SELECT 42", (error, rows) => {
          expect(error).toBeNull();
          result = rows;
        });
        client.complete();
        expect(result).toEqual([42]);
        expect(exporter.getFinishedSpans()).toHaveLength(enabled ? (kind === "pool" ? 2 : 1) : 0);
      }
    },
  );

  it("allows an in-flight query to complete without instrumenting subsequent disabled queries", () => {
    const connection = mysql.createConnection();
    let callbacks = 0;
    connection.query("SELECT 42", () => callbacks++);
    instrumentation.disable();
    connection.complete();
    expect(callbacks).toBe(1);
    expect(exporter.getFinishedSpans()).toHaveLength(1);
    connection.query("SELECT 42", () => callbacks++);
    connection.complete();
    expect(callbacks).toBe(2);
    expect(exporter.getFinishedSpans()).toHaveLength(1);
  });
});
