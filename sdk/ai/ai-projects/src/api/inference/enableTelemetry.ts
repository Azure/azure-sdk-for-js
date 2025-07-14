// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as opentelemetry from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import { OpenAIInstrumentation } from "@traceloop/instrumentation-openai";
import { LangChainInstrumentation } from "@traceloop/instrumentation-langchain";
import {
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import type { SpanExporter } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { logs } from "@opentelemetry/api-logs";
import {
  LoggerProvider,
  SimpleLogRecordProcessor,
  ConsoleLogRecordExporter,
} from "@opentelemetry/sdk-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-grpc";
import { logger } from "../../logger.js";

/**
 * Enables telemetry collection with OpenTelemetry for Azure AI clients and popular GenAI libraries.
 *
 * Following instrumentations are enabled (when corresponding packages are installed):
 * - Azure AI Agents (`@azure/ai-agents`)
 * - Azure AI Inference (`@azure-rest/ai-inference`)
 * - OpenAI (`@traceloop/instrumentation-openai`)
 * - Langchain (`@traceloop/instrumentation-langchain`)
 *
 * When destination is provided, the method configures OpenTelemetry SDK to export traces to
 * stdout or OTLP (OpenTelemetry protocol) gRPC endpoint. It's recommended for local
 * development only. For production use, make sure to configure OpenTelemetry SDK directly.
 *
 * @param destination - Recommended for local testing only. Set it to `"stdout"` for
 *        tracing to console output, or a string holding the OpenTelemetry protocol (OTLP)
 *        endpoint such as "http://localhost:4317".
 *        If not provided, the method enables instrumentations, but does not configure OpenTelemetry
 *        SDK to export traces.
 */
export function enableTelemetry(destination?: string): void {
  const spanExporter = getTraceExporter(destination);
  configureTracing(spanExporter);

  const logExporter = getLogExporter(destination);
  configureLogging(logExporter);

  // Try to configure Azure SDK tracing and instrument AI Inference
  try {
    registerInstrumentations({
      instrumentations: [createAzureSdkInstrumentation()],
    });
  } catch (error) {
    logger.warning("Could not register `createAzureSdkInstrumentation()`");
  }

  // TODO: Try to instrument AI Agents

  // Try to instrument OpenAI
  try {
    registerInstrumentations({
      instrumentations: [new OpenAIInstrumentation()],
    });
  } catch (error) {
    logger.warning("Could not register `new OpenAIInstrumentation()`");
  }

  // Try to instrument Langchain
  try {
    registerInstrumentations({
      instrumentations: [new LangChainInstrumentation()],
    });
  } catch (error) {
    logger.warning(
      "Could not call LangchainInstrumentor().instrument()` since " +
        "`@traceloop/instrumentation-langchain` is not installed",
    );
  }
}

/**
 * Gets the appropriate trace exporter based on the destination
 * @param destination - The destination for exporting traces
 * @returns The trace exporter instance or undefined
 */
function getTraceExporter(
  destination?: string,
): ConsoleSpanExporter | OTLPTraceExporter | undefined {
  if (!destination) {
    return undefined;
  }

  try {
    if (destination === "stdout") {
      return new ConsoleSpanExporter();
    } else if (typeof destination === "string") {
      return new OTLPTraceExporter({ url: destination });
    }
  } catch (error) {
    logger.error("Failed to create trace exporter", error);
    return undefined;
  }

  return undefined;
}

/**
 * Gets the appropriate log exporter based on the destination
 * @param destination - The destination for exporting logs
 * @returns The log exporter instance or undefined
 */
function getLogExporter(
  destination?: string,
): ConsoleLogRecordExporter | OTLPLogExporter | undefined {
  if (!destination) {
    return undefined;
  }

  try {
    if (destination === "stdout") {
      return new ConsoleLogRecordExporter();
    } else if (typeof destination === "string") {
      return new OTLPLogExporter({ url: destination });
    }
  } catch (error) {
    logger.warning("Failed to configure OpenTelemetry logging exporter.");
    return undefined;
  }

  return undefined;
}

/**
 * Configures OpenTelemetry tracing
 * @param spanExporter - The span exporter to use
 */
function configureTracing(spanExporter?: ConsoleSpanExporter | OTLPTraceExporter): void {
  if (!spanExporter) {
    return;
  }

  try {
    let provider: NodeTracerProvider;
    // Check if tracing was not set up before
    try {
      const existingProvider = opentelemetry.trace.getTracerProvider();
      // Check if the provider is already a NodeTracerProvider by checking for addSpanProcessor method
      if (
        !("register" in existingProvider) ||
        typeof existingProvider.register !== "function" ||
        existingProvider.register.name !== "register"
      ) {
        // If the provider is not a NodeTracerProvider, we need to set up a new provider
        provider = new NodeTracerProvider({
          spanProcessors: [new SimpleSpanProcessor(spanExporter as SpanExporter)],
        });
        provider.register();
      } else {
        // If the provider is already a NodeTracerProvider, we can use it
        provider = existingProvider as NodeTracerProvider;
      }
    } catch (error) {
      // If we get here, we need to set up a new provider
      provider = new NodeTracerProvider({
        spanProcessors: [new SimpleSpanProcessor(spanExporter as SpanExporter)],
      });
      provider.register();
    }
  } catch (error) {
    throw error as Error;
  }
}

/**
 * Configures OpenTelemetry logging
 * @param logExporter - The log exporter to use
 */
function configureLogging(logExporter?: ConsoleLogRecordExporter | OTLPLogExporter): void {
  if (!logExporter) {
    return;
  }

  try {
    let loggerProvider: LoggerProvider;
    try {
      const existingProvider = logs.getLoggerProvider();
      if (!(existingProvider instanceof LoggerProvider)) {
        loggerProvider = new LoggerProvider();
        logs.setGlobalLoggerProvider(loggerProvider);
      } else {
        loggerProvider = existingProvider as LoggerProvider;
      }
    } catch (error) {
      // If we get here, we need to set up a new provider
      loggerProvider = new LoggerProvider();
      logs.setGlobalLoggerProvider(loggerProvider);
    }

    loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(logExporter));
  } catch (error) {
    logger.warning(
      "Failed to configure OpenTelemetry logging. This might be because OpenTelemetry logs API is still experimental.",
    );
  }
}
