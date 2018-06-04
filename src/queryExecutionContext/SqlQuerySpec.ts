export interface SqlQuerySpec {
    query: string;
    parameters?: SqlParameter[];
}

export interface SqlParameter {
    name: string;
    value: string | number | boolean;
}
