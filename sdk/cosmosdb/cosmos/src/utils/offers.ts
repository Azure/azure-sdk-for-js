import { ContainerRequest } from "../client/Container/ContainerRequest";

export function validateOffer(body: ContainerRequest): boolean {
  if (body.maxThroughput || body.autoUpgradePolicy) {
    const policyIsValid =
      body.autoUpgradePolicy &&
      body.autoUpgradePolicy.throughputPolicy &&
      body.autoUpgradePolicy.throughputPolicy.incrementPercent &&
      typeof body.autoUpgradePolicy.throughputPolicy.incrementPercent === "number";
    const bodyIsValid = typeof body.maxThroughput === "number" && policyIsValid;
    if (!bodyIsValid) {
      throw new Error("Must specify maxThroughput with autoUpgradePolicy");
    }
    if (body.throughput) {
      throw new Error("Cannot specify throughput with maxThroughput and autoUpgradePolicy");
    }
    return bodyIsValid;
  }
}
