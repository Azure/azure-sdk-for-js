// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a multi-agent workflow with a student agent answering the question first and then a teacher agent checking the answer.
 *
 * @summary This sample demonstrates how to create a multi-agent workflow with a student agent
 * and teacher agent, process streaming responses with workflow action events.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Create Teacher Agent
  console.log("Creating teacher agent...");
  const teacherAgent = await project.agents.createVersion("teacher-agent", {
    kind: "prompt",
    model: deploymentName,
    instructions: `You are a teacher that create pre-school math question for student and check answer.
                   If the answer is correct, you stop the conversation by saying [COMPLETE].
                   If the answer is wrong, you ask student to fix it.`,
  });
  console.log(
    `Agent created (id: ${teacherAgent.id}, name: ${teacherAgent.name}, version: ${teacherAgent.version})`,
  );

  // Create Student Agent
  console.log("\nCreating student agent...");
  const studentAgent = await project.agents.createVersion("student-agent", {
    kind: "prompt",
    model: deploymentName,
    instructions: `You are a student who answers questions from the teacher.
                   When the teacher gives you a question, you answer it.`,
  });
  console.log(
    `Agent created (id: ${studentAgent.id}, name: ${studentAgent.name}, version: ${studentAgent.version})`,
  );

  // Create Multi-Agent Workflow
  console.log("\nCreating multi-agent workflow...");
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

  const workflow = await project.agents.createVersion(
    "student-teacher-workflow",
    {
      kind: "workflow",
      workflow: workflowYaml,
    },
    {
      foundryFeatures: "WorkflowAgents=V1Preview",
    },
  );
  console.log(
    `Agent created (id: ${workflow.id}, name: ${workflow.name}, version: ${workflow.version})`,
  );

  // Create conversation
  console.log("\nCreating conversation...");
  const conversation = await openAIClient.conversations.create();
  console.log(`Created conversation (id: ${conversation.id})`);

  // Send request to the workflow with streaming
  console.log("\nSending request to multi-agent workflow with streaming...");
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

  // Process the streaming response
  for await (const event of stream) {
    console.log("Event received:", JSON.stringify(event, null, 2));
    if (event.type === "response.output_item.added" || event.type === "response.output_item.done") {
      const item = event.item;
      console.log(`\n ${JSON.stringify(item, null, 2)} added:`);
    }
  }

  // Clean up
  console.log("\nCleaning up resources...");
  await openAIClient.conversations.delete(conversation.id);
  console.log("Conversation deleted");

  await project.agents.deleteVersion(workflow.name, workflow.version);
  console.log("Workflow deleted");

  await project.agents.deleteVersion(studentAgent.name, studentAgent.version);
  console.log("Student Agent deleted");

  await project.agents.deleteVersion(teacherAgent.name, teacherAgent.version);
  console.log("Teacher Agent deleted");

  console.log("\nMulti-agent workflow sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
