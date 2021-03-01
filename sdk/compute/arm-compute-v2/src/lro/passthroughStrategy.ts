import { LROStrategy, BaseResult, LROOperationStep } from "./models";

/**
 * Creates a polling strategy based on BodyPolling which uses the provisioning state
 * from the result to determine the current operation state
 */
export function createPassthroughStrategy<TResult extends BaseResult>(
  initialOperation: LROOperationStep<TResult>
): LROStrategy<TResult> {
  return {
    isTerminal: () => {
      return true;
    },
    sendFinalRequest: () => {
      // BodyPolling doesn't require a final get so return the lastOperation
      return Promise.resolve(initialOperation);
    },
    poll: async () => {
      throw new Error("Passthrough strategy should never poll");
    }
  };
}
