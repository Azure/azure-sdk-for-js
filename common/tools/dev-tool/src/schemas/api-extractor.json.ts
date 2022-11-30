import { ReifySchema, Schema } from "../util/schema";

export type ApiExtractorJson = ReifySchema<typeof API_EXTRACTOR_SCHEMA>;

export const API_EXTRACTOR_SCHEMA = Schema.object({
  $schema: Schema.literal(
    "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json"
  ),
  mainEntryPointFilePath: Schema.literal("types/src/index.d.ts" as const),
  docModel: Schema.object({
    enabled: Schema.literal(true as const),
  }),
  apiReport: Schema.object({
    enabled: Schema.literal(true as const),
    reportFolder: Schema.literal("./review" as const),
  }),
  dtsRollup: Schema.object({
    enabled: Schema.literal(true as const),
    untrimmedFilePath: Schema.union(Schema.undefined, Schema.literal("" as const)),
    publicTrimmedFilePath: Schema.regex(/\.\/types\/latest\/[a-z-]+\.d\.ts/),
    // TODO: betaTrimmedFilePath: Schema.undefined,
  }),
  messages: Schema.object({
    tsdocMessageReporting: Schema.object({
      default: Schema.object({
        logLevel: Schema.literal("none" as const),
      }),
    }),
    extractorMessageReporting: Schema.object({
      "ae-missing-release-tag": Schema.object({
        logLevel: Schema.literal("none" as const),
      }),
      "ae-unresolved-link": Schema.object({
        logLevel: Schema.literal("none" as const),
      }),
    }),
  }),
});
