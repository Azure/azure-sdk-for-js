export interface ConditionalOptions {
    endpoint: string;
}

export declare class ConditionalClient {
    constructor(options: ConditionalOptions);
    execute(): Promise<void>;
}
