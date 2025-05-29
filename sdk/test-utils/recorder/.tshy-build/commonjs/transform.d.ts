import { HttpClient } from "@azure/core-rest-pipeline";
interface ApplyCondition {
    uriRegex: string;
}
type TransformType<TType extends string, TParams = undefined> = {
    type: TType;
    applyCondition?: ApplyCondition;
} & (TParams extends undefined ? unknown : {
    params: TParams;
});
interface HeaderTransformParams {
    key: string;
    value: string;
}
export type Transform = TransformType<"ApiVersionTransform"> | TransformType<"ClientIdTransform"> | TransformType<"StorageRequestIdTransform"> | TransformType<"HeaderTransform", HeaderTransformParams>;
export declare function addTransform(recorderUrl: string, httpClient: HttpClient, transform: Transform, recordingId: string): Promise<void>;
export {};
//# sourceMappingURL=transform.d.ts.map