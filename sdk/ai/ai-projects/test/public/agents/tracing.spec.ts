// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentOutput, AgentsOperations, AgentThreadOutput, AIProjectsClient, ThreadMessageOutput, ThreadRunOutput } from "../../../src/index.js";
import { createMockProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe, vi } from "vitest";
import { MockInstrumenter, MockTracingSpan } from "@azure-tools/test-utils-vitest";
import { AddEventOptions, Instrumenter, InstrumenterSpanOptions, TracingContext, TracingSpan, useInstrumenter } from "@azure/core-tracing";

interface ExtendedMockTrackingSpan extends MockTracingSpan {
    events?: { name: string, attributes: Record<string, unknown> }[]
    addEvent?(eventName: string, options?: AddEventOptions): void;
}
class ExtendedMockInstrumenter extends MockInstrumenter {
    extendSpan(span: any): void {
        if (!span.events) {
            span.events = [];
        }
        span.addEvent = (eventName: string, options?: AddEventOptions) => {
            span.events.push({ name: eventName, ...options });
        }
    }
    startSpan(name: string,
        spanOptions?: InstrumenterSpanOptions): { span: TracingSpan; tracingContext: TracingContext } {
        const { span, tracingContext } = super.startSpan(name, spanOptions);
        this.extendSpan(span);
        return { span, tracingContext }
    }

}

describe("Agent Tracing", () => {
    let instrumenter: Instrumenter;
    let projectsClient: AIProjectsClient;
    let agents: AgentsOperations;
    let response: any = {};
    let status = 200;
    beforeEach(async function () {
        instrumenter = new ExtendedMockInstrumenter()
        useInstrumenter(instrumenter);

        projectsClient = createMockProjectsClient(() => { return { bodyAsText: JSON.stringify(response), status: status } });
        agents = projectsClient.agents
    });

    afterEach(async function () {
        (instrumenter as MockInstrumenter).reset();
        vi.clearAllMocks();
        response = {};
        status = 200;
    });

    it("create agent", async function () {
        const agentResponse: Partial<AgentOutput> = { id: "agentId", object: "assistant" };
        response = agentResponse;
        status = 200;
        const request = { name: "agentName", instructions: "You are helpful agent", response_format: "json" };
        const model = "gpt-4o";
        await agents.createAgent(model, request);
        const mockedInstrumenter = instrumenter as MockInstrumenter;
        assert.isAbove(mockedInstrumenter.startedSpans.length, 0);
        const span = mockedInstrumenter.startedSpans[0] as ExtendedMockTrackingSpan;
        assert.equal(span.attributes["gen_ai.agent.id"], agentResponse.id);
        assert.equal(span.attributes["gen_ai.operation.name"], "create_agent");
        assert.equal(span.attributes["gen_ai.agent.name"], request.name);
        assert.equal(span.attributes["gen_ai.request.model"], model);
        const event = span.events?.find(e => e.name === "gen_ai.system.message");
        assert.isDefined(event);
        assert.equal(event?.attributes["gen_ai.event.content"], JSON.stringify({ content: request.instructions }));

    })

    it("create run", async function () {
        const runResponse: Partial<ThreadRunOutput> = { id: "runId", object: "thread.run", status: "queued", thread_id: "threadId", assistant_id: "agentId" };
        response = runResponse;
        status = 200;
        await agents.createRun("threadId", "agentId");
        const mockedInstrumenter = instrumenter as MockInstrumenter;
        assert.isAbove(mockedInstrumenter.startedSpans.length, 0);
        const span = mockedInstrumenter.startedSpans[0] as ExtendedMockTrackingSpan;
        assert.equal(span.attributes["gen_ai.thread.id"], runResponse.thread_id);
        assert.equal(span.attributes["gen_ai.operation.name"], "create_run");
        assert.equal(span.attributes["gen_ai.agent.id"], runResponse.assistant_id);
        assert.equal(span.attributes["gen_ai.thread.run.status"], runResponse.status);
        assert.equal(span.events!.length, 1);
    })

    it("create Thread", async function () {
        const threadResponse: Partial<AgentThreadOutput> = { id: "threadId", object: "thread" };
        response = threadResponse;
        status = 200;
        await agents.createThread();
        const mockedInstrumenter = instrumenter as MockInstrumenter;
        assert.isAbove(mockedInstrumenter.startedSpans.length, 0);
        const span = mockedInstrumenter.startedSpans[0];
        assert.equal(span.attributes["gen_ai.thread.id"], threadResponse.id);
        assert.equal(span.attributes["gen_ai.operation.name"], "create_thread");
    })

    it("create Message", async function () {
        const messageResponse: Partial<ThreadMessageOutput> = { id: "messageId", object: "thread.message", thread_id: "threadId" };
        projectsClient.telemetry.updateSettings({ enableContentRecording: true });
        response = messageResponse;
        status = 200;
        const request = { content: "hello, world!", role: "user" };
        await agents.createMessage("threadId", request);
        const mockedInstrumenter = instrumenter as MockInstrumenter;
        assert.isAbove(mockedInstrumenter.startedSpans.length, 0);
        const span = mockedInstrumenter.startedSpans[0] as ExtendedMockTrackingSpan;
        assert.equal(span.attributes["gen_ai.thread.id"], messageResponse.thread_id);
        assert.equal(span.attributes["gen_ai.operation.name"], "create_message");
        const event = span.events?.find(e => e.name === "gen_ai.user.message");
        assert.isDefined(event);
        assert.equal(event?.attributes["gen_ai.event.content"], JSON.stringify(request));
        assert.equal(event?.attributes["gen_ai.thread.id"], messageResponse.thread_id);
        assert.equal(event?.name, "gen_ai.user.message");
    })

    it("list messages", async function () {
        const listMessages = { object: "list", data: [{ id: "messageId", object: "thread.message", thread_id: "threadId", role: "assistant", content: [{ type: "text", text: { value: "You are helpful agent" } }] }, { id: "messageId2", object: "thread.message", thread_id: "threadId", role: "user", content: [{ type: "text", text: { value: "Hello, tell me a joke" } }] }] };
        response = listMessages;
        projectsClient.telemetry.updateSettings({ enableContentRecording: true });
        status = 200;
        await agents.listMessages("threadId");
        const mockedInstrumenter = instrumenter as MockInstrumenter;
        assert.isAbove(mockedInstrumenter.startedSpans.length, 0);
        const span = mockedInstrumenter.startedSpans[0] as ExtendedMockTrackingSpan;
        assert.isDefined(span.events);
        assert.equal(span.events!.length, 2);
        assert.equal(span.events![0].attributes["gen_ai.event.content"], JSON.stringify({ content: { text: listMessages.data[0].content[0].text }, role: listMessages.data[0].role }));
        assert.equal(span.events![0].name, "gen_ai.assistant.message");
        assert.equal(span.events![1].attributes["gen_ai.event.content"], JSON.stringify({ content: { text: listMessages.data[1].content[0].text }, role: listMessages.data[1].role }));
        assert.equal(span.events![1].name, "gen_ai.user.message");
    })

    it("Submit tool outputs to run", async function () {
        const submitToolOutputs = { object: "thread.run", id: "runId", status: "queued", thread_id: "threadId", assistant_id: "agentId" };
        response = submitToolOutputs;
        status = 200;
        const toolOutputs = [{ tool_call_id: "toolcallId1", output: "output1" }, { tool_call_id: "toolcallId2", output: "output2" }];
        await agents.submitToolOutputsToRun("threadId", "runId", toolOutputs);
        const mockedInstrumenter = instrumenter as MockInstrumenter;
        assert.isAbove(mockedInstrumenter.startedSpans.length, 0);
        const span = mockedInstrumenter.startedSpans[0] as ExtendedMockTrackingSpan;
        assert.equal(span.attributes["gen_ai.thread.id"], submitToolOutputs.thread_id);
        assert.equal(span.attributes["gen_ai.operation.name"], "submit_tool_outputs");
        assert.equal(span.attributes["gen_ai.thread.run.status"], submitToolOutputs.status);
        assert.isDefined(span.events);
        assert.equal(span.events!.length, 2);
        assert.equal(span.events![0].attributes["gen_ai.event.content"], JSON.stringify({ content: toolOutputs[0].output, id: toolOutputs[0].tool_call_id }));
        assert.equal(span.events![0].name, "gen_ai.tool.message");
        assert.equal(span.events![1].attributes["gen_ai.event.content"], JSON.stringify({ content: toolOutputs[1].output, id: toolOutputs[1].tool_call_id }));
        assert.equal(span.events![1].name, "gen_ai.tool.message");
    });
});
