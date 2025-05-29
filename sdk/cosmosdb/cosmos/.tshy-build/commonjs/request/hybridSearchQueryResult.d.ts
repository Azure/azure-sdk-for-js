import { ItemDefinition } from "../client/index.js";
export declare class HybridSearchQueryResult {
    rid: string;
    componentScores: number[];
    data: any;
    score: number;
    ranks: number[];
    constructor(rid: string, componentScores: number[], data: Record<string, unknown>);
    static create<T extends ItemDefinition>(document: T): HybridSearchQueryResult;
}
//# sourceMappingURL=hybridSearchQueryResult.d.ts.map