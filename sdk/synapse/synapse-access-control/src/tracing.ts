import { createSpanFunction } from "@azure/core-http";

export const createSpan = createSpanFunction({
  namespace: "Azure.Synapse.AccessControl",
  packagePrefix: "Microsoft.Synapse"
});
