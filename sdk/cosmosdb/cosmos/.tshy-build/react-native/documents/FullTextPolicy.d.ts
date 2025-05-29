/**
 * Represents a full text policy for a collection in the Azure Cosmos DB service.
 */
export interface FullTextPolicy {
    /**
     * The default language for the full text .
     */
    defaultLanguage: string;
    /**
     * The paths to be indexed for full text search.
     */
    fullTextPaths: FullTextPath[];
}
/**
 * Represents a full text path to be indexed in the Azure Cosmos DB service.
 */
export interface FullTextPath {
    /**
     * The path to be indexed for full text search.
     */
    path: string;
    /**
     * The language for the full text path.
     */
    language: string;
}
//# sourceMappingURL=FullTextPolicy.d.ts.map