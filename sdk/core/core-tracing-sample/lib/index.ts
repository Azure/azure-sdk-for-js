import tracing = require("@opencensus/nodejs");
import { EnvironmentCredential } from "@azure/identity";
import { ZipkinTraceExporter } from "@opencensus/exporter-zipkin";
