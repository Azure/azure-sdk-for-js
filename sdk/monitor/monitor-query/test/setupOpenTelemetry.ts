// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
// import { NodeTracerProvider } from "@opentelemetry/node";
// import { BatchSpanProcessor } from "@opentelemetry/tracing";
// import { TracerProvider } from "@opentelemetry/api";
// import * as dotenv from "dotenv";
// import { Context } from "mocha";
// import { getAppInsightsConnectionString } from "./public/shared/testShared";//

// dotenv.config();

// export function doNothing() {}
// export function runWithTelemetry(
//   mochaContext: Pick<Context, "skip">,
//   fn: (provider: TracerProvider) => void
// ): Promise<void> {
//   const appInsightsConnectionString = getAppInsightsConnectionString(mochaContext);//

//   const provider = new NodeTracerProvider({
//     // plugins: {
//     //   https: {
//     //     // Ignore Application Insights Ingestion Server
//     //     ignoreOutgoingUrls: [new RegExp(/dc.services.visualstudio.com/i)]
//     //   }
//     // }
//   });
//   provider.register();//

//   // Create an exporter instance
//   const exporter = new AzureMonitorTraceExporter({
//     connectionString: appInsightsConnectionString
//   });//

//   const batchSpanProcessor = new BatchSpanProcessor(exporter);//

//   // Add the exporter to the provider
//   // TODO: there is an API incompatiblity here.
//   provider.addSpanProcessor(batchSpanProcessor as any);//

//   fn(provider);//

//   return provider.shutdown();
// }
