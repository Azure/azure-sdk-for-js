export interface StoredProcedureDefinition {
    id?: string;
    body?: string | ((...inputs: any[]) => void);
}
