import type { HTTPMethod } from "../common/index.js";
import { ResourceType } from "../common/index.js";
export declare function generateHeaders(masterKey: string, method: HTTPMethod, resourceType?: ResourceType, resourceId?: string, date?: Date): Promise<{
    [x: string]: string;
}>;
//# sourceMappingURL=headers.d.ts.map