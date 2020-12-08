import { createSpanFunction } from "@azure/core-http";

export const createSpan = createSpanFunction({
  namespace: "Azure.Synapse.ManagedPrivateEndpoints",
  packagePrefix: "Microsoft.Synapse"
});
