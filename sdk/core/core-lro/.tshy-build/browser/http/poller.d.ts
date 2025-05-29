import type { RunningOperation } from "./models.js";
import type { OperationState, PollerLike } from "../poller/models.js";
import type { CreateHttpPollerOptions } from "./models.js";
/**
 * Creates a poller that can be used to poll a long-running operation.
 * @param lro - Description of the long-running operation
 * @param options - options to configure the poller
 * @returns an initialized poller
 */
export declare function createHttpPoller<TResult, TState extends OperationState<TResult>>(lro: RunningOperation, options?: CreateHttpPollerOptions<TResult, TState>): PollerLike<TState, TResult>;
//# sourceMappingURL=poller.d.ts.map