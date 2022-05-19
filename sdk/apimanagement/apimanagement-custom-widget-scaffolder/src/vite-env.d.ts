/// <reference types="vite/client" />

declare module "virtual:templates" {
  // @ts-ignore
  import type {TScaffoldTech, TemplateFile} from "index"

  type TTemplates = {
    [key in "_shared" | TScaffoldTech]: TemplateFile[];
  };

  const templates: TTemplates

  export default templates
}

declare const __CONFIG_DEPLOY__: import("./scaffolding").TConfigDeploy
