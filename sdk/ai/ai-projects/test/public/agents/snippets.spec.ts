// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VitestTestContext } from "@azure-tools/test-recorder";
import type { AgentsOperations} from "../../../src/index.js";
import { AIProjectsClient } from "../../../src/index.js";
import { createProjectsClient } from "../utils/createClient.js";
import { DefaultAzureCredential } from "@azure/identity";
import { beforeEach, it, describe } from "vitest";

describe("snippets", function () {
  let projectsClient: AIProjectsClient;
  let agents: AgentsOperations;

  beforeEach(async function (context: VitestTestContext) {
    projectsClient = createProjectsClient();
    agents = projectsClient.agents;
  });

  it("setup", async function () {
    const connectionString = "<connectionString>";
    
    const client = AIProjectsClient.fromConnectionString(
      connectionString,
      new DefaultAzureCredential(),
    );
  });
  
  it("listConnections", async function () {
    
  });

  it("filterConnections", async function () {
    
  });

  it("getConnections", async function () {
    
  });

  it("getConnectionsWithSecrets", async function () {
    
  });

  it("createAgent", async function () {
    
  });

  it("toolSet", async function () {
    
  });

  it("fileSearch", async function () {
    
  });

  it("codeInterpreter", async function () {
    
  });

  it("bingGrounding", async function () {
    
  })

  it("AISearch", async function () {
    
  });

  it("functionTools", async function () {
    
  });

  it("createThread", async function () {
    
  }); 

  it("threadWithTool", async function () {
    
  }); 

  it("createMessage", async function () {
    
  }); 

  it("messageWithFileSearch", async function () {
    
  }); 

  it("messageWithCodeInterpreter", async function () {
    
  }); 

  it("createRun", async function () {
    
  });

  it("createThreadAndRun", async function () {
    
  });

  it("createRunStreaming", async function () {
    
  });

  it("eventHandling", async function () {
    
  });

  it("listMessages", async function () {
    
  });

  it("retrieveFile", async function () {
    
  });

  it("teardown", async function () {
    
  });

  it("tracing", async function () {
    
  });

  it("exceptions", async function () {
    
  });
});
