import { createSpanFunction } from "@azure/core-http";

export const createSpan = createSpanFunction({
  namespace: "Azure.Synapse.Spark",
  packagePrefix: "Microsoft.Synapse"
});
