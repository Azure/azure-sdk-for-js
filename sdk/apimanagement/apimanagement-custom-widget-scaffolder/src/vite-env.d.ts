/// <reference types="vite/client" />

declare module "virtual:templates" {
  // @ts-ignore
  import type {TTech, TemplateFile} from "./scaffold"

  type TTemplates = {
    [key in "_shared" | TTech]: TemplateFile[];
  };

  const templates: TTemplates

  export default templates
}

declare const __CONFIG_DEPLOY__: import("./index").TConfigDeploy
