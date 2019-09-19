// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
declare module "proxy-agent" {
  import { Agent } from "http";
  interface ProxyAgentConstructor {
    (options: string): Agent;
    new (options: string): Agent;
  }

  const proxy: ProxyAgentConstructor;

  export = proxy;
}
