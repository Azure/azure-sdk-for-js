export declare function serializeRecord<T extends string | number | boolean | Date | null, R>(item: Record<string, T>): Record<string, R>;
export declare function serializeRecord<T, R>(item: Record<string, T>, serializer: (item: T) => R): Record<string, R>;
//# sourceMappingURL=serializerHelpers.d.ts.map