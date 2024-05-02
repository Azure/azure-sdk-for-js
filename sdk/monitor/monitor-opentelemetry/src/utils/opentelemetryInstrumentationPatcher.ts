// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AZURE_MONITOR_STATSBEAT_FEATURES,
  StatsbeatEnvironmentConfig,
  StatsbeatInstrumentation,
} from "../types";

/**
 * Patch OpenTelemetry instrumentations for statsbeat colleciton.
 * @internal
 */
export function patchOpenTelemetryInstrumentations(): void {
  const emptyStatsbeatConfig: string = JSON.stringify({ instrumentation: 0, feature: 0 });
  /** AMQPLIB */
  try {
    require.resolve("@opentelemetry/instrumentation-amqplib");
    const { AmqplibInstrumentation } = require("@opentelemetry/instrumentation-amqplib");
    const originalInit = AmqplibInstrumentation.prototype.init;
    AmqplibInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.AMQPLIB),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // amqplib instrumentation not found
  }
  /** CUCUMBER */
  try {
    require.resolve("@opentelemetry/instrumentation-cucumber");
    const { CucumberInstrumentation } = require("@opentelemetry/instrumentation-cucumber");
    const originalInit = CucumberInstrumentation.prototype.init;
    CucumberInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.CUCUMBER),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // cucumber instrumentation not found
  }
  /** DATALOADER */
  try {
    require.resolve("@opentelemetry/instrumentation-dataloader");
    const { DataloaderInstrumentation } = require("@opentelemetry/instrumentation-dataloader");
    const originalInit = DataloaderInstrumentation.prototype.init;
    DataloaderInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.DATALOADER),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // dataloader instrumentation not found
  }
  /** FS */
  try {
    require.resolve("@opentelemetry/instrumentation-fs");
    const { FsInstrumentation } = require("@opentelemetry/instrumentation-fs");
    const originalInit = FsInstrumentation.prototype.init;
    FsInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.FS),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // fs instrumentation not found
  }
  /** LRU MEMOIZER */
  try {
    require.resolve("@opentelemetry/instrumentation-lru-memoizer");
    const { LruMemoizerInstrumentation } = require("@opentelemetry/instrumentation-lru-memoizer");
    const originalInit = LruMemoizerInstrumentation.prototype.init;
    LruMemoizerInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |=
          StatsbeatInstrumentation.LRU_MEMOIZER),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // LRU memoizer instrumentation not found
  }
  /** MONGOOSE */
  try {
    require.resolve("@opentelemetry/instrumentation-mongoose");
    const { MongooseInstrumentation } = require("@opentelemetry/instrumentation-mongoose");
    const originalInit = MongooseInstrumentation.prototype.init;
    MongooseInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.MONGOOSE),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // mongoose instrumentation not found
  }
  /** RUNTIME NODE */
  try {
    require.resolve("@opentelemetry/instrumentation-runtime-node");
    const { RuntimeNodeInstrumentation } = require("@opentelemetry/instrumentation-runtime-node");
    const originalInit = RuntimeNodeInstrumentation.prototype.init;
    RuntimeNodeInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |=
          StatsbeatInstrumentation.RUNTIME_NODE),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // runtime node instrumentation not found
  }
  /** SOCKET.IO */
  try {
    require.resolve("@opentelemetry/instrumentation-socket.io");
    const { SocketIoInstrumentation } = require("@opentelemetry/instrumentation-socket.io");
    const originalInit = SocketIoInstrumentation.prototype.init;
    SocketIoInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.SOCKET_IO),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // socket.io instrumentation not found
  }
  /** TEDIOUS */
  try {
    require.resolve("@opentelemetry/instrumentation-tedious");
    const { TediousInstrumentation } = require("@opentelemetry/instrumentation-tedious");
    const originalInit = TediousInstrumentation.prototype.init;
    TediousInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.TEDIOUS),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // tedious instrumentation not found
  }
  /** UNDICI */
  try {
    require.resolve("@opentelemetry/instrumentation-undici");
    const { UndiciInstrumentation } = require("@opentelemetry/instrumentation-undici");
    const originalInit = UndiciInstrumentation.prototype.init;
    UndiciInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.UNDICI),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // undici instrumentation not found
  }
  /** CASSANDRA */
  try {
    require.resolve("@opentelemetry/instrumentation-cassandra-driver");
    const {
      CassandraDriverInstrumentation,
    } = require("@opentelemetry/instrumentation-cassandra-driver");
    const originalInit = CassandraDriverInstrumentation.prototype.init;
    CassandraDriverInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.CASSANDRA),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // cassandra instrumentation not found
  }
  /** CONNECT */
  try {
    require.resolve("@opentelemetry/instrumentation-connect");
    const { ConnectInstrumentation } = require("@opentelemetry/instrumentation-connect");
    const originalInit = ConnectInstrumentation.prototype.init;
    ConnectInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.CONNECT),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // connect instrumentation not found
  }
  /** DNS */
  try {
    require.resolve("@opentelemetry/instrumentation-dns");
    const { DnsInstrumentation } = require("@opentelemetry/instrumentation-dns");
    const originalInit = DnsInstrumentation.prototype.init;
    DnsInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.DNS),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // dns instrumentation not found
  }
  /** EXPRESS */
  try {
    require.resolve("@opentelemetry/instrumentation-express");
    const { ExpressInstrumentation } = require("@opentelemetry/instrumentation-express");
    const originalInit = ExpressInstrumentation.prototype.init;
    ExpressInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.EXPRESS),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // express instrumentation not found
  }
  /** FASTIFY */
  try {
    require.resolve("@opentelemetry/instrumentation-fastify");
    const { FastifyInstrumentation } = require("@opentelemetry/instrumentation-fastify");
    const originalInit = FastifyInstrumentation.prototype.init;
    FastifyInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.FASTIFY),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // fastify instrumentation not found
  }
  /** GENERIC POOL */
  try {
    require.resolve("@opentelemetry/instrumentation-generic-pool");
    const { GenericPoolInstrumentation } = require("@opentelemetry/instrumentation-generic-pool");
    const originalInit = GenericPoolInstrumentation.prototype.init;
    GenericPoolInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |=
          StatsbeatInstrumentation.GENERIC_POOL),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // generic pool instrumentation not found
  }
  /** GRAPHQL */
  try {
    require.resolve("@opentelemetry/instrumentation-graphql");
    const { GraphQLInstrumentation } = require("@opentelemetry/instrumentation-graphql");
    const originalInit = GraphQLInstrumentation.prototype.init;
    GraphQLInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.GRAPHQL),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // graphQL instrumentation not found
  }
  /** HAPI */
  try {
    require.resolve("@opentelemetry/instrumentation-hapi");
    const { HapiInstrumentation } = require("@opentelemetry/instrumentation-hapi");
    const originalInit = HapiInstrumentation.prototype.init;
    HapiInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.HAPI),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // hapi instrumentation not found
  }
  /** IO REDIS */
  try {
    require.resolve("@opentelemetry/instrumentation-ioredis");
    const { IORedisInstrumentation } = require("@opentelemetry/instrumentation-ioredis");
    const originalInit = IORedisInstrumentation.prototype.init;
    IORedisInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.IOREDIS),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // IO Redis instrumentation not found
  }
  /** KNEX */
  try {
    require.resolve("@opentelemetry/instrumentation-knex");
    const { KnexInstrumentation } = require("@opentelemetry/instrumentation-knex");
    const originalInit = KnexInstrumentation.prototype.init;
    KnexInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.KNEX),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // Knex instrumentation not found
  }
  /** KOA */
  try {
    require.resolve("@opentelemetry/instrumentation-koa");
    const { KoaInstrumentation } = require("@opentelemetry/instrumentation-koa");
    const originalInit = KoaInstrumentation.prototype.init;
    KoaInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.KOA),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // Koa instrumentation not found
  }
  /** MEMCACHED */
  try {
    require.resolve("@opentelemetry/instrumentation-memcached");
    const { MemcachedInstrumentation } = require("@opentelemetry/instrumentation-memcached");
    const originalInit = MemcachedInstrumentation.prototype.init;
    MemcachedInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.MEMCACHED),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // Memcached instrumentation not found
  }
  /** MYSQL2 */
  try {
    require.resolve("@opentelemetry/instrumentation-mysql2");
    const { MySQL2Instrumentation } = require("@opentelemetry/instrumentation-mysql2");
    const originalInit = MySQL2Instrumentation.prototype.init;
    MySQL2Instrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.MYSQL2),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // mysql2 instrumentation not found
  }
  /** NESTJS CORE */
  try {
    require.resolve("@opentelemetry/instrumentation-nestjs-core");
    const { NestInstrumentation } = require("@opentelemetry/instrumentation-nestjs-core");
    const originalInit = NestInstrumentation.prototype.init;
    NestInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.NESTJS_CORE),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // nestjs core instrumentation not found
  }
  /** NET */
  try {
    require.resolve("@opentelemetry/instrumentation-net");
    const { NetInstrumentation } = require("@opentelemetry/instrumentation-net");
    const originalInit = NetInstrumentation.prototype.init;
    NetInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.NET),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // net instrumentation not found
  }
  /** PINO */
  try {
    require.resolve("@opentelemetry/instrumentation-pino");
    const { PinoInstrumentation } = require("@opentelemetry/instrumentation-pino");
    const originalInit = PinoInstrumentation.prototype.init;
    PinoInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.PINO),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // pino instrumentation not found
  }
  /** RESTIFY */
  try {
    require.resolve("@opentelemetry/instrumentation-restify");
    const { RestifyInstrumentation } = require("@opentelemetry/instrumentation-restify");
    const originalInit = RestifyInstrumentation.prototype.init;
    RestifyInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.RESTIFY),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // restify instrumentation not found
  }
  /** ROUTER */
  try {
    require.resolve("@opentelemetry/instrumentation-router");
    const { RouterInstrumentation } = require("@opentelemetry/instrumentation-router");
    const originalInit = RouterInstrumentation.prototype.init;
    RouterInstrumentation.prototype.init = function () {
      const statsbeatOptions: StatsbeatEnvironmentConfig = JSON.parse(
        process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || emptyStatsbeatConfig,
      );
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: (statsbeatOptions.instrumentation |= StatsbeatInstrumentation.ROUTER),
        feature: statsbeatOptions.feature,
      });
      return originalInit.apply(this, arguments);
    };
  } catch (error) {
    // router instrumentation not found
  }
}
