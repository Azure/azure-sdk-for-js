import type { RequestPolicy, RequestPolicyOptionsLike as RequestPolicyOptions, RequestPolicyFactory } from "@azure/core-http-compat";
import { StorageBrowserPolicy } from "./policies/StorageBrowserPolicy.js";
export { StorageBrowserPolicy };
/**
 * StorageBrowserPolicyFactory is a factory class helping generating StorageBrowserPolicy objects.
 */
export declare class StorageBrowserPolicyFactory implements RequestPolicyFactory {
    /**
     * Creates a StorageBrowserPolicyFactory object.
     *
     * @param nextPolicy -
     * @param options -
     */
    create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageBrowserPolicy;
}
//# sourceMappingURL=StorageBrowserPolicyFactory.d.ts.map