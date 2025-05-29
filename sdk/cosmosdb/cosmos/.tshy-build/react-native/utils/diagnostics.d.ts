import type { MetadataLookUpType } from "../CosmosDiagnostics.js";
import { CosmosDiagnostics } from "../CosmosDiagnostics.js";
import type { DiagnosticDataValue } from "../diagnostics/DiagnosticNodeInternal.js";
import { DiagnosticNodeInternal, DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal.js";
import type { ClientContext } from "../ClientContext.js";
/**
 * @hidden
 * Utility function to create an Empty CosmosDiagnostic object.
 */
export declare function getEmptyCosmosDiagnostics(): CosmosDiagnostics;
/**
 * @hidden
 */
export type ExtractPromise<T> = T extends Promise<infer U> ? U : never;
/**
 * A supporting utility wrapper function, to be used inside a diagnostic session started
 * by `withDiagnostics` function.
 * Created a Diagnostic node and add it as a child to existing diagnostic session.
 * @hidden
 */
export declare function addDiagnosticChild<Callback extends (node: DiagnosticNodeInternal) => Promise<any>>(callback: Callback, node: DiagnosticNodeInternal, type: DiagnosticNodeType, data?: Partial<DiagnosticDataValue>): Promise<ExtractPromise<ReturnType<Callback>>>;
/**
 * A supporting utility wrapper function, to be used inside a diagnostic session started
 * by `withDiagnostics` function.
 * Treats requests originating in  provided `callback` as metadata calls.
 * To realize this, starts a temporary diagnostic session, after execution of callback is
 * finished. Merges this temporary diagnostic session to the original diagnostic session
 * represented by the input parameter `node`.
 * @hidden
 */
export declare function withMetadataDiagnostics<Callback extends (node: DiagnosticNodeInternal) => Promise<any>>(callback: Callback, node: DiagnosticNodeInternal, type: MetadataLookUpType): Promise<ExtractPromise<ReturnType<Callback>>>;
/**
 * Utility wrapper function to managed lifecycle of a Diagnostic session.
 * Meant to be used at the root of the client operation. i.e. item.read(),
 * queryIterator.fetchAll().
 *
 * This utility starts a new diagnostic session. So using it any where else
 * other than start of operation, will result is different diagnostic sessions.
 *
 * Workings :
 * 1. Takes a callback function as input.
 * 2. Creates a new instance of DiagnosticNodeInternal, which can be though as starting
 * a new diagnostic session.
 * 3. Executes the callback function.
 * 4. If execution was successful. Converts DiagnosticNodeInternal to CosmosDiagnostics
 * and injects it to the response object and returns this object.
 * 5. If execution threw an exception. Sill converts DiagnosticNodeInternal to CosmosDiagnostics
 * and injects it to the Error object, and rethrows the Error object.
 *
 * @hidden
 */
export declare function withDiagnostics<Callback extends (node: DiagnosticNodeInternal) => Promise<any>>(callback: Callback, clientContext: ClientContext, type?: DiagnosticNodeType): Promise<ExtractPromise<ReturnType<Callback>>>;
//# sourceMappingURL=diagnostics.d.ts.map