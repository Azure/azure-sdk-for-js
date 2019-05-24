import * as karma from "karma";

export type Config = karma.Config & {
    rollupPreprocessor: any;
    set: (config: ConfigOptions) => void;
}

export type ConfigOptions = karma.ConfigOptions & {
    rollupPreprocessor: any;
}
