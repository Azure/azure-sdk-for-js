import type { DTDL } from "./psuedoDtdl.js";
import type { DtmiResolver } from "./dtmiResolver.js";
/**
 * The PsuedoParser is an interesting implementation. Essentially, this
 * codebase works in tandem with a Digital Twins Parser, which simultaneously
 * defines the DTDL structure and validates models match the correct DTDL format.
 * In lieu of using that Parser as a dependency (for a complex network of reasons),
 * we implement this class, which kind of parses. Because it uses the resovler too,
 * we can, during psuedo-parsing, identify any times we should resolve a dependency,
 * and then resolve the dependencies until the dependency tree is fully resolved.
 *
 * @internal
 */
export declare class PseudoParser {
    private _resolver;
    constructor(resolver: DtmiResolver);
    expand(models: DTDL[], tryFromExpanded: boolean): Promise<{
        [dtmi: string]: DTDL;
    }>;
    private _expand;
    private _getModelDependencies;
}
//# sourceMappingURL=psuedoParser.d.ts.map