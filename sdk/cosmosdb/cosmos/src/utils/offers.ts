import { ContainerRequest } from "../client/Container/ContainerRequest";

export function validateOffer(body: ContainerRequest): void {
  if (body.throughput) {
    if (body.maxThroughput) {
      throw new Error("Cannot specify throughput with maxThroughput");
    }
    if (body.autoUpgradePolicy) {
      throw new Error(
        "Cannot specify autoUpgradePolicy with throughput. Use `maxThroughtput` instead"
      );
    }
  }
}
