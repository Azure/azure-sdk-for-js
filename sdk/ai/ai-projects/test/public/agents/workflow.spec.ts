// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

describe("agents - workflow multi-agent", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let agents: AgentsOperations;
  let openAIClient: OpenAI;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents;
    openAIClient = projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create multi-agent workflow and process streaming response", async function () {
    // Create teacher agent
    const teacherAgent = await agents.createVersion("teacher-agent", {
      kind: "prompt",
      model: "gpt-5.2",
      instructions: `You are a teacher that create pre-school math question for student and check answer.
                   If the answer is correct, you stop the conversation by saying [COMPLETE].
                   If the answer is wrong, you ask student to fix it.`,
    });
    assert.isNotNull(teacherAgent);
    assert.isNotNull(teacherAgent.id);
    assert.equal(teacherAgent.name, "teacher-agent");
    console.log(
      `Teacher agent created (id: ${teacherAgent.id}, name: ${teacherAgent.name}, version: ${teacherAgent.version})`,
    );

    // Create student agent
    const studentAgent = await agents.createVersion("student-agent", {
      kind: "prompt",
      model: "gpt-5.2",
      instructions: `You are a student who answers questions from the teacher.
                   When the teacher gives you a question, you answer it.`,
    });
    assert.isNotNull(studentAgent);
    assert.isNotNull(studentAgent.id);
    assert.equal(studentAgent.name, "student-agent");
    console.log(
      `Student agent created (id: ${studentAgent.id}, name: ${studentAgent.name}, version: ${studentAgent.version})`,
    );

    // Create workflow agent
    const workflowYaml = `
kind: workflow
trigger:
  kind: OnConversationStart
  id: my_workflow
  actions:
    - kind: SetVariable
      id: set_variable_input_task
      variable: Local.LatestMessage
      value: "=UserMessage(System.LastMessageText)"

    - kind: CreateConversation
      id: create_student_conversation
      conversationId: Local.StudentConversationId

    - kind: CreateConversation
      id: create_teacher_conversation
      conversationId: Local.TeacherConversationId

    - kind: InvokeAzureAgent
      id: student_agent
      description: The student node
      conversationId: "=Local.StudentConversationId"
      agent:
        name: ${studentAgent.name}
      input:
        messages: "=Local.LatestMessage"
      output:
        messages: Local.LatestMessage

    - kind: InvokeAzureAgent
      id: teacher_agent
      description: The teacher node
      conversationId: "=Local.TeacherConversationId"
      agent:
        name: ${teacherAgent.name}
      input:
        messages: "=Local.LatestMessage"
      output:
        messages: Local.LatestMessage

    - kind: SetVariable
      id: set_variable_turncount
      variable: Local.TurnCount
      value: "=Local.TurnCount + 1"

    - kind: ConditionGroup
      id: completion_check
      conditions:
        - condition: '=!IsBlank(Find("[COMPLETE]", Upper(Last(Local.LatestMessage).Text)))'
          id: check_done
          actions:
            - kind: EndConversation
              id: end_workflow

        - condition: "=Local.TurnCount >= 4"
          id: check_turn_count_exceeded
          actions:
            - kind: SendActivity
              id: send_activity_tired
              activity: "Let's try again later...I am tired."

      elseActions:
        - kind: GotoAction
          id: goto_student_agent
          actionId: student_agent
`;

    const workflow = await agents.createVersion(
      "student-teacher-workflow",
      {
        kind: "workflow",
        workflow: workflowYaml,
      },
      {
        foundryFeatures: "WorkflowAgents=V1Preview",
      },
    );
    assert.isNotNull(workflow);
    assert.isNotNull(workflow.id);
    assert.equal(workflow.name, "student-teacher-workflow");
    console.log(
      `Workflow created (id: ${workflow.id}, name: ${workflow.name}, version: ${workflow.version})`,
    );

    // Create conversation
    const conversation = await openAIClient.conversations.create();
    assert.isNotNull(conversation);
    assert.isNotNull(conversation.id);
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send request with streaming
    const stream = await openAIClient.responses.create(
      {
        conversation: conversation.id,
        input: "1 + 1 = ?",
        stream: true,
      },
      {
        body: {
          agent: { name: workflow.name, type: "agent_reference" },
          metadata: { "x-ms-debug-mode-enabled": "1" },
        },
      },
    );

    let responseCreated = false;
    let responseCompleted = false;

    for await (const event of stream) {
      if (event.type === "response.created") {
        responseCreated = true;
        console.log(`Response created with ID: ${event.response.id}`);
      } else if (event.type === "response.completed") {
        responseCompleted = true;
        console.log("Response completed");
      }
    }

    assert.isTrue(responseCreated, "Expected response.created event");
    assert.isTrue(responseCompleted, "Expected response.completed event");

    // Clean up
    await openAIClient.conversations.delete(conversation.id);
    console.log("Conversation deleted");

    await agents.deleteVersion(workflow.name, workflow.version);
    console.log("Workflow deleted");

    await agents.deleteVersion(studentAgent.name, studentAgent.version);
    console.log("Student agent deleted");

    await agents.deleteVersion(teacherAgent.name, teacherAgent.version);
    console.log("Teacher agent deleted");
  });
});
