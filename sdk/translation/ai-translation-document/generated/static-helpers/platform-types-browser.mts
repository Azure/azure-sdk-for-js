/**
 * Browser platform variant — NodeReadableStream resolves to `never`
 * so it drops out of union types and optional properties become effectively absent.
 */
export type NodeReadableStream = never;
