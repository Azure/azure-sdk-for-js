// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AIProjectClient,
  type AgentState,
  type Agent,
  type AgentDefinitionUnion,
  type AgentVersion,
  type RealtimeAudioFormatsAudioPcm,
  type RealtimeConversationItemUnion,
  type VoiceRecordingResponse,
  type VoiceAgentDefinition,
  type VoiceAgentConnection,
  type VoiceAgentServerEvent,
} from "@azure/ai-projects";
import { MicrophoneCapture, PcmAudioPlayer } from "./audio.js";
import { LocalAzureCredential } from "./localAzureCredential.js";
import "./styles.css";

const preview = "VoiceAgents=V1Preview" as const;
const preferredAgentName = import.meta.env["VITE_FOUNDRY_VOICE_AGENT_NAME"]?.trim();
type ManagementView = "agents" | "versions";
type ManagementEditorAction = "create-agent" | "update-agent" | "create-version";
type ManagementCreationMode = "definition" | "generate";

class VoiceAgentConsole {
  private client?: AIProjectClient;
  private connection?: VoiceAgentConnection;
  private eventTask?: Promise<void>;
  private loadedEndpoint?: string;
  private conversationAudioUrl?: string;
  private conversationFetching = false;
  private managementBusy = false;
  private managementEditorAction?: ManagementEditorAction;
  private pendingManagementAction?: () => Promise<void>;
  private microphoneSend = Promise.resolve();
  private manuallyDisconnecting = false;
  private pendingToolOutput = false;
  private assistantText = "";
  private assistantTextSource?: "text" | "transcript";
  private assistantMessage?: HTMLElement;
  private userVoiceMessage?: HTMLElement;
  private readonly microphone = new MicrophoneCapture();
  private readonly player = new PcmAudioPlayer();

  private readonly form = element<HTMLFormElement>("connectionForm");
  private readonly connectButton = element<HTMLButtonElement>("connectButton");
  private readonly disconnectButton = element<HTMLButtonElement>("disconnectButton");
  private readonly endpointInput = element<HTMLInputElement>("endpoint");
  private readonly agentSelect = element<HTMLSelectElement>("agentName");
  private readonly loadAgentsButton = element<HTMLButtonElement>("loadAgentsButton");
  private readonly conversationIdInput = element<HTMLInputElement>("conversationId");
  private readonly conversationIdDisplay = element<HTMLElement>("conversationIdDisplay");
  private readonly fetchConversationButton = element<HTMLButtonElement>("fetchConversationButton");
  private readonly conversationAudioPanel = element<HTMLElement>("conversationAudioPanel");
  private readonly conversationAudio = element<HTMLAudioElement>("conversationAudio");
  private readonly conversationAudioDetails = element<HTMLElement>("conversationAudioDetails");
  private readonly conversationAudioStatus = element<HTMLElement>("conversationAudioStatus");
  private readonly downloadConversationAudio = element<HTMLAnchorElement>(
    "downloadConversationAudio",
  );
  private readonly messageInput = element<HTMLTextAreaElement>("messageInput");
  private readonly sendButton = element<HTMLButtonElement>("sendButton");
  private readonly clearTranscriptButton = element<HTMLButtonElement>("clearTranscriptButton");
  private readonly microphoneButton = element<HTMLButtonElement>("microphoneButton");
  private readonly microphoneLevel = element<HTMLElement>("microphoneLevel");
  private readonly transcript = element<HTMLElement>("transcript");
  private readonly eventLog = element<HTMLOListElement>("eventLog");
  private readonly conversationTab = element<HTMLButtonElement>("conversationTab");
  private readonly managementTab = element<HTMLButtonElement>("managementTab");
  private readonly conversationControls = element<HTMLElement>("conversationControls");
  private readonly agentReadout = element<HTMLElement>("agentReadout");
  private readonly conversationPanel = element<HTMLElement>("conversationPanel");
  private readonly managementPanel = element<HTMLElement>("managementPanel");
  private readonly managementAgentsTab = element<HTMLButtonElement>("managementAgentsTab");
  private readonly managementVersionsTab = element<HTMLButtonElement>("managementVersionsTab");
  private readonly managementAgentsPanel = element<HTMLElement>("managementAgentsPanel");
  private readonly managementEditor = element<HTMLElement>("managementEditor");
  private readonly managementEditorHeading = element<HTMLElement>("managementEditorHeading");
  private readonly managementCreationModes = element<HTMLElement>("managementCreationModes");
  private readonly managementDefinitionModeButton = element<HTMLButtonElement>(
    "managementDefinitionModeButton",
  );
  private readonly managementGenerateModeButton = element<HTMLButtonElement>(
    "managementGenerateModeButton",
  );
  private readonly managementDefinitionPanel = element<HTMLElement>("managementDefinitionPanel");
  private readonly managementGeneratePanel = element<HTMLElement>("managementGeneratePanel");
  private readonly managementVersionsPanel = element<HTMLElement>("managementVersionsPanel");
  private readonly managementForm = element<HTMLFormElement>("managementForm");
  private readonly managementAgentName = element<HTMLInputElement>("managementAgentName");
  private readonly managementAgentNames = element<HTMLDataListElement>("managementAgentNames");
  private readonly managementInitialStateField = element<HTMLElement>(
    "managementInitialStateField",
  );
  private readonly managementInitialState = element<HTMLSelectElement>("managementInitialState");
  private readonly managementDefinition = element<HTMLTextAreaElement>("managementDefinition");
  private readonly managementDescription = element<HTMLInputElement>("managementDescription");
  private readonly managementVersion = element<HTMLInputElement>("managementVersion");
  private readonly managementOperation = element<HTMLElement>("managementOperation");
  private readonly managementOutput = element<HTMLElement>("managementOutput");
  private readonly managementLog = element<HTMLOListElement>("managementLog");
  private readonly managementDialog = element<HTMLDialogElement>("managementConfirmDialog");
  private readonly managementConfirmHeading = element<HTMLElement>("managementConfirmHeading");
  private readonly managementConfirmMessage = element<HTMLElement>("managementConfirmMessage");
  private readonly managementConfirmButton = element<HTMLButtonElement>("confirmManagementButton");
  private readonly managementState = element<HTMLElement>("managementState");

  public constructor() {
    this.endpointInput.value = import.meta.env["VITE_FOUNDRY_PROJECT_ENDPOINT"]?.trim() ?? "";
    this.resetAgentOptions();
    this.managementVersionsPanel.after(this.managementEditor);
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      void this.connect();
    });
    this.endpointInput.addEventListener("input", () => this.resetAgentOptions());
    this.agentSelect.addEventListener("change", () => this.setConnecting(false));
    this.loadAgentsButton.addEventListener("click", () => {
      void this.loadAgents().catch((error: unknown) => this.showError(error));
    });
    this.conversationIdInput.addEventListener("input", () => this.setConnecting(false));
    this.fetchConversationButton.addEventListener("click", () => {
      void this.fetchConversation().catch((error: unknown) => this.showError(error));
    });
    this.conversationTab.addEventListener("click", () => this.showView("conversation"));
    this.managementTab.addEventListener("click", () => this.showView("management"));
    this.managementAgentsTab.addEventListener("click", () => this.showManagementView("agents"));
    this.managementVersionsTab.addEventListener("click", () => this.showManagementView("versions"));
    element<HTMLButtonElement>("openGenerateAgentButton").addEventListener("click", () =>
      this.openManagementEditor("create-agent", "generate"),
    );
    element<HTMLButtonElement>("openCreateDefinitionButton").addEventListener("click", () =>
      this.openManagementEditor("create-agent", "definition"),
    );
    element<HTMLButtonElement>("openUpdateAgentButton").addEventListener("click", () =>
      this.openManagementEditor("update-agent"),
    );
    element<HTMLButtonElement>("openCreateVersionButton").addEventListener("click", () =>
      this.openManagementEditor("create-version"),
    );
    element<HTMLButtonElement>("closeManagementEditorButton").addEventListener("click", () =>
      this.closeManagementEditor(),
    );
    this.managementDefinitionModeButton.addEventListener("click", () =>
      this.showManagementCreationMode("definition"),
    );
    this.managementGenerateModeButton.addEventListener("click", () =>
      this.showManagementCreationMode("generate"),
    );
    this.managementForm.addEventListener("submit", (event) => event.preventDefault());
    this.addManagementHandler("listAgentsButton", () => this.listManagementAgents());
    this.addManagementHandler("getAgentButton", () => this.getManagementAgent());
    this.addManagementHandler("createAgentButton", () => this.createManagementAgent());
    this.addManagementHandler("generateAgentButton", () => this.generateManagementAgent());
    this.addManagementHandler("updateAgentButton", () => this.updateManagementAgent());
    this.addManagementHandler("enableAgentButton", () => this.setManagementAgentEnabled(true));
    this.addManagementHandler("disableAgentButton", () => this.setManagementAgentEnabled(false));
    this.addManagementHandler("listVersionsButton", () => this.listManagementVersions());
    this.addManagementHandler("getVersionButton", () => this.getManagementVersion());
    this.addManagementHandler("createVersionButton", () => this.createManagementVersion());
    element<HTMLButtonElement>("deleteAgentButton").addEventListener("click", () => {
      this.confirmDeleteManagementAgent();
    });
    element<HTMLButtonElement>("deleteVersionButton").addEventListener("click", () => {
      this.confirmDeleteManagementVersion();
    });
    element<HTMLButtonElement>("cancelManagementButton").addEventListener("click", () => {
      this.pendingManagementAction = undefined;
      this.managementDialog.close();
    });
    this.managementDialog.addEventListener("cancel", () => {
      this.pendingManagementAction = undefined;
    });
    this.managementConfirmButton.addEventListener("click", () => {
      const action = this.pendingManagementAction;
      this.pendingManagementAction = undefined;
      this.managementDialog.close();
      if (action) {
        void action().catch((error: unknown) => this.showError(error));
      }
    });
    this.disconnectButton.addEventListener("click", () => void this.disconnect());
    this.clearTranscriptButton.addEventListener("click", () => this.clearTranscript());
    this.sendButton.addEventListener("click", () => void this.sendText());
    this.messageInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        void this.sendText();
      }
    });
    this.microphoneButton.addEventListener("click", () => void this.toggleMicrophone());
    element<HTMLButtonElement>("eventToggle").addEventListener("click", (event) => {
      const button = event.currentTarget as HTMLButtonElement;
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      this.eventLog.hidden = expanded;
    });
    element<HTMLButtonElement>("dismissError").addEventListener("click", () => {
      element<HTMLElement>("errorToast").hidden = true;
    });
    window.addEventListener("beforeunload", () => {
      this.clearConversationAudio();
      void this.connection?.dispose();
      void this.microphone.stop();
      void this.player.dispose();
    });
  }

  private showView(view: "conversation" | "management"): void {
    if (this.managementBusy) {
      return;
    }
    if (view === "management" && this.connection) {
      this.showError(new Error("Disconnect the active conversation before opening Management."));
      return;
    }
    const showConversation = view === "conversation";
    this.conversationTab.setAttribute("aria-selected", String(showConversation));
    this.managementTab.setAttribute("aria-selected", String(!showConversation));
    this.conversationControls.hidden = !showConversation;
    this.agentReadout.hidden = !showConversation;
    this.conversationPanel.hidden = !showConversation;
    this.managementPanel.hidden = showConversation;
  }

  private showManagementView(view: ManagementView): void {
    if (this.managementBusy) {
      return;
    }
    const views = [
      ["agents", this.managementAgentsTab, this.managementAgentsPanel],
      ["versions", this.managementVersionsTab, this.managementVersionsPanel],
    ] as const;
    for (const [name, tab, panel] of views) {
      const selected = name === view;
      tab.setAttribute("aria-selected", String(selected));
      panel.hidden = !selected;
    }
    this.closeManagementEditor();
  }

  private openManagementEditor(
    action: ManagementEditorAction,
    creationMode: ManagementCreationMode = "definition",
  ): void {
    this.managementEditorAction = action;
    this.managementEditor.hidden = false;
    this.managementEditorHeading.textContent =
      action === "create-agent"
        ? "Create agent"
        : action === "update-agent"
          ? "Edit definition"
          : "Create version";
    this.managementCreationModes.hidden = action !== "create-agent";
    this.managementInitialStateField.hidden = action !== "create-agent";
    element<HTMLButtonElement>("createAgentButton").hidden = action !== "create-agent";
    element<HTMLButtonElement>("updateAgentButton").hidden = action !== "update-agent";
    element<HTMLButtonElement>("createVersionButton").hidden = action !== "create-version";
    this.showManagementCreationMode(action === "create-agent" ? creationMode : "definition");
    this.managementEditor.scrollIntoView({ block: "nearest" });
  }

  private showManagementCreationMode(mode: ManagementCreationMode): void {
    if (mode === "generate" && this.managementEditorAction !== "create-agent") {
      return;
    }
    const showDefinition = mode === "definition";
    if (this.managementEditorAction === "create-agent") {
      this.managementEditorHeading.textContent = showDefinition
        ? "Create from definition"
        : "Generate agent";
    }
    this.managementDefinitionModeButton.setAttribute("aria-pressed", String(showDefinition));
    this.managementGenerateModeButton.setAttribute("aria-pressed", String(!showDefinition));
    this.managementDefinitionPanel.hidden = !showDefinition;
    this.managementGeneratePanel.hidden = showDefinition;
  }

  private closeManagementEditor(): void {
    this.managementEditorAction = undefined;
    this.managementEditor.hidden = true;
  }

  private getClient(endpoint: string): AIProjectClient {
    if (this.client && this.loadedEndpoint === endpoint) {
      return this.client;
    }
    const client = new AIProjectClient(endpoint, new LocalAzureCredential());
    this.client = client;
    this.loadedEndpoint = endpoint;
    return client;
  }

  private async loadAgents(): Promise<void> {
    const endpoint = this.endpointInput.value.trim();
    if (!endpoint) {
      throw new Error("Enter the Foundry project endpoint.");
    }

    this.setConnecting(true);
    this.loadAgentsButton.textContent = "Loading...";
    this.setRestState("checking");
    try {
      const client = this.getClient(endpoint);
      const agentNames: string[] = [];
      for await (const agent of client.agents.list({ kind: "voice", limit: 100 })) {
        if (agent.state === "enabled") {
          agentNames.push(agent.name);
        }
      }
      agentNames.sort((left, right) => left.localeCompare(right));
      if (agentNames.length === 0) {
        throw new Error("No enabled voice agents were found in this project.");
      }

      this.agentSelect.replaceChildren(...agentNames.map((name) => new Option(name, name)));
      this.agentSelect.value =
        preferredAgentName && agentNames.includes(preferredAgentName)
          ? preferredAgentName
          : agentNames[0];
      this.client = client;
      this.loadedEndpoint = endpoint;
      this.setRestState("ready");
      element<HTMLElement>("managementStatus").textContent = `${agentNames.length} enabled`;
      this.recordEvent(`Loaded ${agentNames.length} enabled voice agent(s)`);
    } catch (error) {
      this.resetAgentOptions(false);
      this.setRestState("error");
      throw error;
    } finally {
      this.loadAgentsButton.textContent = "Load agents";
      this.setConnecting(false);
    }
  }

  private async fetchConversation(): Promise<void> {
    const endpoint = this.endpointInput.value.trim();
    const agentName = this.agentSelect.value;
    const conversationId = this.conversationIdInput.value.trim();
    if (!endpoint) {
      throw new Error("Enter the Foundry project endpoint.");
    }
    if (!agentName) {
      throw new Error("Load and select the voice agent that owns the conversation.");
    }
    if (!conversationId) {
      throw new Error("Enter a conversation ID.");
    }
    if (this.connection) {
      throw new Error("Disconnect the active conversation before fetching persisted history.");
    }

    this.clearConversationAudio();
    this.setConversationFetching(true);
    this.setRestState("checking");
    try {
      const client = this.getClient(endpoint);
      const conversation = await client.beta.agentEndpointConversations.getAgentConversation(
        preview,
        agentName,
        conversationId,
      );
      const items: RealtimeConversationItemUnion[] = [];
      for await (const item of client.beta.agentEndpointConversations.listAgentConversationItems(
        preview,
        agentName,
        conversationId,
        { limit: 100, order: "asc" },
      )) {
        items.push(item);
      }

      this.setConversationId(conversation.id);
      const messageCount = this.renderFetchedConversation(items);
      const audioState = await this.fetchConversationAudio(client, agentName, conversation.id);
      this.setRestState("ready");
      this.recordEvent(
        `Fetched ${conversation.id} (${conversation.status}, ${messageCount} message(s), ${audioState})`,
      );
    } catch (error) {
      this.setRestState("error");
      throw error;
    } finally {
      this.setConversationFetching(false);
    }
  }

  private addManagementHandler(id: string, operation: () => Promise<void>): void {
    element<HTMLButtonElement>(id).addEventListener("click", () => {
      void operation().catch((error: unknown) => this.showError(error));
    });
  }

  private async listManagementAgents(): Promise<void> {
    await this.runManagementOperation("agents.list", async (client) => {
      const agents: Agent[] = [];
      for await (const agent of client.agents.list({ kind: "voice", limit: 100 })) {
        agents.push(agent);
      }
      this.managementAgentNames.replaceChildren(
        ...agents.map((agent) => {
          const option = document.createElement("option");
          option.value = agent.name;
          return option;
        }),
      );
      return agents.map((agent) => {
        // Some projects contain agents whose model_type predates this contract; don't let one
        // unrecognized agent abort the whole list.
        let model: string;
        try {
          model = getVoiceDefinition(agent).model;
        } catch (error) {
          model = `(${getErrorMessage(error)})`;
        }
        return {
          name: agent.name,
          state: agent.state,
          latestVersion: agent.versions.latest.version,
          model,
        };
      });
    });
  }

  private async getManagementAgent(): Promise<void> {
    const name = this.getManagementAgentName();
    await this.runManagementOperation("agents.get", async (client) => {
      const agent = await client.agents.get(name);
      this.applyManagementAgent(agent);
      return agent;
    });
  }

  private async createManagementAgent(): Promise<void> {
    const name = this.getManagementAgentName();
    const definition = this.getManagementDefinition();
    const description = this.managementDescription.value.trim();
    const initialState = this.managementInitialState.value;
    await this.runManagementOperation("agents.create", async (client) => {
      const agent = await client.agents.create(name, definition, {
        foundryFeatures: preview,
        ...(description ? { description } : {}),
        ...(initialState ? { state: initialState as AgentState } : {}),
      });
      this.applyManagementAgent(agent);
      return agent;
    });
  }

  private async generateManagementAgent(): Promise<void> {
    const name = this.getManagementAgentName();
    await this.runManagementOperation("agents.generateAgent", async (client) => {
      const agent = await client.agents.generateAgent({ kind: "voice", name });
      this.applyManagementAgent(agent);
      return agent;
    });
  }

  private async updateManagementAgent(): Promise<void> {
    const name = this.getManagementAgentName();
    const definition = this.getManagementDefinition();
    const description = this.managementDescription.value.trim();
    await this.runManagementOperation("agents.update", async (client) => {
      const agent = await client.agents.update(name, definition, {
        foundryFeatures: preview,
        ...(description ? { description } : {}),
      });
      this.applyManagementAgent(agent);
      return agent;
    });
  }

  private async setManagementAgentEnabled(enabled: boolean): Promise<void> {
    const name = this.getManagementAgentName();
    const operation = enabled ? "agents.enable" : "agents.disable";
    await this.runManagementOperation(operation, async (client) => {
      if (enabled) {
        await client.agents.enable(name);
      } else {
        await client.agents.disable(name);
      }
      return { name, state: enabled ? "enabled" : "disabled" };
    });
  }

  private async listManagementVersions(): Promise<void> {
    const name = this.getManagementAgentName();
    await this.runManagementOperation("agents.listVersions", async (client) => {
      const versions: AgentVersion[] = [];
      for await (const version of client.agents.listVersions(name, {
        limit: 100,
      })) {
        versions.push(version);
      }
      return versions.map((version) => ({
        version: version.version,
        status: version.status,
        draft: version.draft ?? false,
        createdAt: version.created_at,
      }));
    });
  }

  private async getManagementVersion(): Promise<void> {
    const name = this.getManagementAgentName();
    const version = this.getManagementVersionName();
    await this.runManagementOperation("agents.getVersion", async (client) => {
      const result = await client.agents.getVersion(name, version);
      this.applyManagementVersion(result);
      return result;
    });
  }

  private async createManagementVersion(): Promise<void> {
    const name = this.getManagementAgentName();
    const definition = this.getManagementDefinition();
    const description = this.managementDescription.value.trim();
    await this.runManagementOperation("agents.createVersion", async (client) => {
      const version = await client.agents.createVersion(name, definition, {
        foundryFeatures: preview,
        ...(description ? { description } : {}),
      });
      this.applyManagementVersion(version);
      return version;
    });
  }

  private confirmDeleteManagementAgent(): void {
    try {
      const name = this.getManagementAgentName();
      this.confirmManagementOperation(
        "Delete voice agent?",
        `Delete ${name} and all of its versions? This operation cannot be undone.`,
        "Delete agent",
        () =>
          this.runManagementOperation("agents.delete", async (client) => {
            await client.agents.delete(name);
            return { name, deleted: true };
          }),
      );
    } catch (error) {
      this.showError(error);
    }
  }

  private confirmDeleteManagementVersion(): void {
    try {
      const name = this.getManagementAgentName();
      const version = this.getManagementVersionName();
      this.confirmManagementOperation(
        "Delete voice agent version?",
        `Delete version ${version} from ${name}? This operation cannot be undone.`,
        "Delete version",
        () =>
          this.runManagementOperation("agents.deleteVersion", async (client) => {
            await client.agents.deleteVersion(name, version);
            return { name, version, deleted: true };
          }),
      );
    } catch (error) {
      this.showError(error);
    }
  }

  private confirmManagementOperation(
    heading: string,
    message: string,
    buttonLabel: string,
    action: () => Promise<void>,
  ): void {
    this.managementConfirmHeading.textContent = heading;
    this.managementConfirmMessage.textContent = message;
    this.managementConfirmButton.textContent = buttonLabel;
    this.pendingManagementAction = action;
    this.managementDialog.showModal();
  }

  private async runManagementOperation(
    operation: string,
    action: (client: AIProjectClient) => Promise<unknown>,
  ): Promise<void> {
    const endpoint = this.endpointInput.value.trim();
    if (!endpoint) {
      this.endpointInput.focus();
      throw new Error("Enter the Foundry project endpoint before calling a management API.");
    }
    if (this.connection) {
      throw new Error("Disconnect the active conversation before calling a management API.");
    }

    this.setManagementBusy(true);
    this.setManagementState("Running", "checking");
    this.managementOperation.textContent = operation;
    this.appendManagementLog(`${operation} started.`);
    try {
      const result = await action(this.getClient(endpoint));
      this.managementOutput.textContent =
        JSON.stringify(result, undefined, 2) ?? "No response body.";
      this.setManagementState("Completed", "ready");
      this.appendManagementLog(`${operation} completed.`);
    } catch (error) {
      this.managementOutput.textContent = getErrorMessage(error);
      this.setManagementState("Failed", "error");
      this.appendManagementLog(`${operation} failed: ${getErrorMessage(error)}`);
      throw error;
    } finally {
      this.setManagementBusy(false);
    }
  }

  private getManagementAgentName(): string {
    const name = this.managementAgentName.value.trim();
    if (!name) {
      this.managementAgentName.focus();
      throw new Error("Agent name is required for this management API.");
    }
    return name;
  }

  private getManagementVersionName(): string {
    const version = this.managementVersion.value.trim();
    if (!version) {
      this.managementVersion.focus();
      throw new Error("Version is required for this management API.");
    }
    return version;
  }

  private getManagementDefinition(): VoiceAgentDefinition {
    let value: unknown;
    try {
      value = JSON.parse(this.managementDefinition.value);
    } catch (error) {
      throw new Error(`Definition JSON is invalid: ${getErrorMessage(error)}`);
    }
    if (!value || typeof value !== "object") {
      throw new Error("Definition JSON must be an object.");
    }
    const definition = value as Partial<VoiceAgentDefinition>;
    if (definition.kind !== "voice" || !definition.model_type || !definition.model) {
      throw new Error('Definition requires kind "voice", model_type, and model.');
    }
    return definition as VoiceAgentDefinition;
  }

  private applyManagementAgent(agent: Agent): void {
    this.managementAgentName.value = agent.name;
    this.managementVersion.value = agent.versions.latest.version;
    this.managementDescription.value = agent.versions.latest.description ?? "";
    this.managementDefinition.value = JSON.stringify(
      agent.versions.latest.definition,
      undefined,
      2,
    );
    if (![...this.managementAgentNames.options].some((option) => option.value === agent.name)) {
      const option = document.createElement("option");
      option.value = agent.name;
      this.managementAgentNames.append(option);
    }
  }

  private applyManagementVersion(version: AgentVersion): void {
    this.managementAgentName.value = version.name;
    this.managementVersion.value = version.version;
    this.managementDescription.value = version.description ?? "";
    this.managementDefinition.value = JSON.stringify(version.definition, undefined, 2);
  }

  private setManagementBusy(busy: boolean): void {
    this.managementBusy = busy;
    for (const control of this.managementForm.elements) {
      (
        control as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement
      ).disabled = busy;
    }
    this.conversationTab.disabled = busy;
    this.managementTab.disabled = busy;
    this.endpointInput.disabled = busy || this.connection !== undefined;
    this.loadAgentsButton.disabled =
      busy || this.connection !== undefined || !this.endpointInput.value.trim();
    this.connectButton.disabled = busy || this.connection !== undefined || !this.agentSelect.value;
  }

  private setManagementState(label: string, state: "checking" | "ready" | "error"): void {
    this.managementState.textContent = label;
    this.managementState.className = `state-chip ${state}`;
  }

  private appendManagementLog(message: string): void {
    if (!this.managementLog.querySelector("time")) {
      this.managementLog.replaceChildren();
    }
    const item = document.createElement("li");
    const time = document.createElement("time");
    time.textContent = new Date().toLocaleTimeString();
    const text = document.createElement("span");
    text.textContent = message;
    item.append(time, text);
    this.managementLog.append(item);
    item.scrollIntoView({ block: "nearest" });
  }

  private async connect(): Promise<void> {
    this.setConnecting(true);
    this.manuallyDisconnecting = false;

    try {
      const endpoint = this.endpointInput.value.trim();
      const agentName = this.agentSelect.value;
      if (!this.client || this.loadedEndpoint !== endpoint || !agentName) {
        throw new Error("Load and select a voice agent before connecting.");
      }

      this.setRestState("checking");
      const agent = await this.client.agents.get(agentName).catch((error: unknown) => {
        this.setRestState("error");
        throw error;
      });
      const definition = getVoiceDefinition(agent);
      const outputFormat = definition.audio?.output?.format;
      const outputIsPcm = outputFormat === undefined || outputFormat.type === "audio/pcm";
      // `RealtimeAudioFormats`'s fallback `type` field isn't narrowed to a single literal (see the
      // matching comment in src/realtime/protocol.ts), so an explicit cast is needed here too.
      const outputRate =
        outputFormat?.type === "audio/pcm"
          ? ((outputFormat as RealtimeAudioFormatsAudioPcm).rate ?? 24_000)
          : 24_000;
      this.player.setSampleRate(outputRate);
      this.renderAgent(
        agent.name,
        agent.versions.latest.version,
        definition.model,
        outputIsPcm ? `PCM ${outputRate / 1000} kHz` : outputFormat.type,
      );
      this.setRestState("ready");

      this.clearConversationAudio();
      this.setConversationId(undefined, "Waiting for session...");
      this.connection = await this.client.realtime.connect(agentName, {
        store: true,
        onConnectionStateChange: (state) => this.setSocketState(state),
      });
      this.eventTask = this.consumeEvents(this.connection);
      await this.connection.configureSession({
        type: "realtime",
        output_modalities: outputIsPcm ? ["text", "audio"] : ["text"],
        audio: {
          input: {
            format: { type: "audio/pcm", rate: 24_000 },
            turn_detection: {
              type: "server_vad",
              create_response: true,
              interrupt_response: true,
              silence_duration_ms: 500,
            },
          },
        },
        tools: [
          {
            type: "function",
            name: "get_local_time",
            description: "Get the current local date, time, and time zone from the browser.",
            parameters: { type: "object", properties: {} },
          },
        ],
      });

      this.setConnected(true);
      this.recordEvent("Agent verified over REST");
      this.recordEvent("Voice WebSocket connected");
    } catch (error) {
      this.showError(error);
      await this.disconnect();
      if (!this.conversationIdInput.value) {
        this.setConversationId(undefined);
      }
    } finally {
      this.setConnecting(false);
    }
  }

  private async disconnect(): Promise<void> {
    this.manuallyDisconnecting = true;
    await this.stopMicrophone();
    await this.player.dispose();
    const connection = this.connection;
    this.connection = undefined;
    if (connection) {
      try {
        await connection.dispose();
      } catch (error) {
        this.showError(error);
      }
    }
    this.setConnected(false);
    this.setSocketState("disconnected");
  }

  private async sendText(): Promise<void> {
    const text = this.messageInput.value.trim();
    if (!text || !this.connection) {
      return;
    }
    this.messageInput.value = "";
    this.addMessage("user", text);
    this.sendButton.disabled = true;
    try {
      await this.connection.sendText(text);
    } catch (error) {
      this.showError(error);
    } finally {
      this.sendButton.disabled = false;
      this.messageInput.focus();
    }
  }

  private async toggleMicrophone(): Promise<void> {
    if (this.microphone.active) {
      await this.stopMicrophone();
      return;
    }
    if (!this.connection) {
      return;
    }

    try {
      await this.microphone.start(
        (audio) => {
          const connection = this.connection;
          if (!connection) {
            return;
          }
          this.microphoneSend = this.microphoneSend
            .then(() => connection.sendAudio(audio))
            .catch((error: unknown) => this.showError(error));
        },
        (level) => {
          this.microphoneLevel.style.transform = `scaleX(${level})`;
        },
      );
      this.microphoneButton.textContent = "Stop microphone";
      this.microphoneButton.classList.add("active");
      this.recordEvent("Microphone started");
    } catch (error) {
      this.showError(error);
    }
  }

  private async stopMicrophone(): Promise<void> {
    if (!this.microphone.active) {
      return;
    }
    await this.microphone.stop();
    await this.microphoneSend;
    this.microphoneLevel.style.transform = "scaleX(0)";
    this.microphoneButton.textContent = "Start microphone";
    this.microphoneButton.classList.remove("active");
    this.recordEvent("Microphone stopped");
  }

  private async consumeEvents(connection: VoiceAgentConnection): Promise<void> {
    try {
      for await (const event of connection) {
        this.recordEvent(event.type);
        await this.handleEvent(event, connection);
      }
    } catch (error) {
      if (!this.manuallyDisconnecting) {
        this.showError(error);
        this.setConnected(false);
      }
    }
  }

  private async handleEvent(
    event: VoiceAgentServerEvent,
    connection: VoiceAgentConnection,
  ): Promise<void> {
    switch (event.type) {
      case "session.created":
        this.setConversationId(event.conversation_id, "Not persisted");
        break;
      case "response.created":
        this.player.stop();
        this.assistantText = "";
        this.assistantTextSource = undefined;
        this.assistantMessage = this.addMessage("assistant", "", true);
        break;
      case "response.output_text.delta":
        this.appendAssistantText(event.delta, "text");
        break;
      case "response.output_audio_transcript.delta":
        this.appendAssistantText(event.delta, "transcript");
        break;
      case "response.output_audio.delta":
        await this.player.enqueue(event.delta);
        break;
      case "input_audio_buffer.speech_started":
        this.player.stop();
        this.userVoiceMessage = this.addMessage("user", "Listening...", true);
        break;
      case "input_audio_buffer.speech_stopped":
        if (this.userVoiceMessage) {
          this.updateMessage(this.userVoiceMessage, "Voice message sent", false);
        }
        break;
      case "conversation.item.input_audio_transcription.delta":
        if (this.userVoiceMessage) {
          const content = this.userVoiceMessage.querySelector<HTMLElement>(".message-content");
          if (content) {
            const shouldFollow = this.shouldFollowTranscript();
            content.textContent = `${content.dataset["transcript"] ?? ""}${event.delta}`;
            content.dataset["transcript"] = content.textContent;
            this.followTranscript(shouldFollow);
          }
        }
        break;
      case "conversation.item.input_audio_transcription.completed":
        if (this.userVoiceMessage) {
          this.updateMessage(this.userVoiceMessage, event.transcript || "Voice message", false);
          this.userVoiceMessage = undefined;
        }
        break;
      case "response.function_call_arguments.done":
        this.pendingToolOutput = true;
        await connection.sendToolOutput(
          event.call_id,
          JSON.stringify({
            localTime: new Date().toLocaleString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
          { createResponse: false },
        );
        break;
      case "response.done":
        if (this.pendingToolOutput) {
          this.pendingToolOutput = false;
          if (this.assistantMessage && !this.assistantText) {
            this.assistantMessage.remove();
            this.assistantMessage = undefined;
            this.updateClearTranscriptButton();
          }
          await connection.requestResponse();
        } else if (this.assistantMessage) {
          this.updateMessage(
            this.assistantMessage,
            this.assistantText || "Response completed without text.",
            false,
          );
        }
        break;
      case "error":
        throw new Error(`${event.error.code ?? "voice_agent_error"}: ${event.error.message}`);
    }
  }

  private appendAssistantText(delta: string, source: "text" | "transcript"): void {
    if (this.assistantTextSource && this.assistantTextSource !== source) {
      return;
    }
    this.assistantTextSource = source;
    this.assistantText += delta;
    this.assistantMessage ??= this.addMessage("assistant", "", true);
    this.updateMessage(this.assistantMessage, this.assistantText, true);
  }

  private addMessage(role: "user" | "assistant", text: string, streaming = false): HTMLElement {
    const shouldFollow = this.shouldFollowTranscript();
    element<HTMLElement>("emptyTranscript").hidden = true;
    const message = document.createElement("article");
    message.className = `message ${role}`;
    const label = document.createElement("span");
    label.className = "message-role";
    label.textContent = role === "user" ? "You" : "Agent";
    const content = document.createElement("p");
    content.className = "message-content";
    content.textContent = text;
    if (streaming) {
      content.classList.add("streaming");
    }
    message.append(label, content);
    this.transcript.append(message);
    this.updateClearTranscriptButton();
    this.followTranscript(shouldFollow, streaming ? "auto" : "smooth");
    return message;
  }

  private updateMessage(message: HTMLElement, text: string, streaming: boolean): void {
    const content = message.querySelector<HTMLElement>(".message-content");
    if (!content) {
      return;
    }
    const shouldFollow = this.shouldFollowTranscript();
    content.textContent = text;
    content.classList.toggle("streaming", streaming);
    this.followTranscript(shouldFollow);
  }

  private setConversationId(conversationId?: string, emptyLabel = "Not available"): void {
    const previousConversationId = this.conversationIdInput.value;
    this.conversationIdInput.value = conversationId ?? "";
    this.conversationIdDisplay.textContent = conversationId ?? emptyLabel;
    this.conversationIdDisplay.title = conversationId ?? "";
    if (conversationId && conversationId !== previousConversationId) {
      this.recordEvent(`Persisted conversation ID: ${conversationId}`);
    }
  }

  private renderFetchedConversation(items: RealtimeConversationItemUnion[]): number {
    const messages = items.flatMap((item) => {
      const message = getPersistedMessage(item);
      return message ? [message] : [];
    });
    this.resetTranscript();
    const emptyTranscript = element<HTMLElement>("emptyTranscript");
    emptyTranscript.textContent = "No persisted user or assistant messages were found.";
    emptyTranscript.hidden = messages.length > 0;
    for (const message of messages) {
      this.addMessage(message.role, message.text);
    }
    return messages.length;
  }

  private clearTranscript(): void {
    this.resetTranscript();
    this.recordEvent("Chat cleared");
  }

  private resetTranscript(): void {
    this.assistantText = "";
    this.assistantTextSource = undefined;
    this.assistantMessage = undefined;
    this.userVoiceMessage = undefined;
    this.transcript.querySelectorAll(".message").forEach((message) => message.remove());
    const emptyTranscript = element<HTMLElement>("emptyTranscript");
    emptyTranscript.textContent = "No messages yet.";
    emptyTranscript.hidden = false;
    this.transcript.scrollTop = 0;
    this.updateClearTranscriptButton();
  }

  private updateClearTranscriptButton(): void {
    this.clearTranscriptButton.disabled = !this.transcript.querySelector(".message");
  }

  private async fetchConversationAudio(
    client: AIProjectClient,
    agentName: string,
    conversationId: string,
  ): Promise<string> {
    this.conversationAudioDetails.textContent = "";
    this.conversationAudioDetails.hidden = true;
    this.showConversationAudioStatus("Loading recording...");
    try {
      const recording = await client.beta.agentEndpointConversations.getAgentConversationAudio(
        preview,
        agentName,
        conversationId,
      );
      this.conversationAudioDetails.textContent = formatRecordingDetails(recording);
      this.conversationAudioDetails.hidden = false;
      if (recording.blob_uri) {
        this.showConversationAudioStatus(
          "BYOS recording metadata loaded; audio bytes are not proxied.",
        );
        return "BYOS audio metadata";
      }

      const content = await client.beta.agentEndpointConversations.getAgentConversationAudioContent(
        preview,
        agentName,
        conversationId,
      );
      const blob = await content.blobBody;
      if (!blob) {
        throw new Error("The browser response did not contain audio data.");
      }

      this.clearConversationAudioUrl();
      this.conversationAudioUrl = URL.createObjectURL(blob);
      this.conversationAudio.src = this.conversationAudioUrl;
      this.conversationAudio.hidden = false;
      this.downloadConversationAudio.href = this.conversationAudioUrl;
      this.downloadConversationAudio.download = `${conversationId}.wav`;
      this.downloadConversationAudio.hidden = false;
      this.conversationAudioStatus.hidden = true;
      return "audio loaded";
    } catch (error) {
      const message = getErrorMessage(error);
      this.showConversationAudioStatus(`Audio unavailable: ${message}`);
      this.recordEvent(`Conversation audio unavailable: ${message}`);
      return "audio unavailable";
    }
  }

  private showConversationAudioStatus(message: string): void {
    this.clearConversationAudioUrl();
    this.conversationAudioPanel.hidden = false;
    this.conversationAudio.hidden = true;
    this.downloadConversationAudio.hidden = true;
    this.conversationAudioStatus.textContent = message;
    this.conversationAudioStatus.hidden = false;
  }

  private clearConversationAudio(): void {
    this.clearConversationAudioUrl();
    this.conversationAudioDetails.textContent = "";
    this.conversationAudioDetails.hidden = true;
    this.conversationAudioStatus.textContent = "";
    this.conversationAudioPanel.hidden = true;
  }

  private clearConversationAudioUrl(): void {
    this.conversationAudio.pause();
    this.conversationAudio.removeAttribute("src");
    this.downloadConversationAudio.removeAttribute("href");
    if (this.conversationAudioUrl) {
      URL.revokeObjectURL(this.conversationAudioUrl);
      this.conversationAudioUrl = undefined;
    }
  }

  private shouldFollowTranscript(): boolean {
    const distanceFromBottom =
      this.transcript.scrollHeight - this.transcript.scrollTop - this.transcript.clientHeight;
    return distanceFromBottom <= 48;
  }

  private followTranscript(shouldFollow: boolean, behavior: ScrollBehavior = "auto"): void {
    if (!shouldFollow) {
      return;
    }
    const effectiveBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : behavior;
    this.transcript.scrollTo({ top: this.transcript.scrollHeight, behavior: effectiveBehavior });
  }

  private renderAgent(name: string, version: string, model: string, audio: string): void {
    element<HTMLElement>("agentSummaryName").textContent = name;
    element<HTMLElement>("agentVersion").textContent = version;
    element<HTMLElement>("agentModel").textContent = model;
    element<HTMLElement>("agentAudio").textContent = audio;
    element<HTMLElement>("managementStatus").textContent = "Verified";
  }

  private setConnecting(connecting: boolean): void {
    const connected = this.connection !== undefined;
    const busy = connecting || this.conversationFetching;
    this.endpointInput.disabled = busy || connected;
    this.agentSelect.disabled = busy || connected || this.agentSelect.options.length <= 1;
    this.loadAgentsButton.disabled = busy || connected || !this.endpointInput.value.trim();
    this.conversationIdInput.disabled = busy || connected;
    this.fetchConversationButton.disabled =
      busy || connected || !this.agentSelect.value || !this.conversationIdInput.value.trim();
    this.connectButton.disabled = busy || connected || !this.agentSelect.value;
    this.connectButton.textContent = connecting ? "Connecting..." : "Connect";
  }

  private setConversationFetching(fetching: boolean): void {
    this.conversationFetching = fetching;
    this.fetchConversationButton.textContent = fetching ? "Fetching..." : "Fetch conversation";
    this.setConnecting(false);
  }

  private setConnected(connected: boolean): void {
    this.disconnectButton.disabled = !connected;
    this.messageInput.disabled = !connected;
    this.sendButton.disabled = !connected;
    this.microphoneButton.disabled = !connected;
    element<HTMLElement>("connectionLabel").textContent = connected ? "Connected" : "Offline";
    element<HTMLElement>("connectionDot").classList.toggle("connected", connected);
    this.setConnecting(false);
  }

  private setRestState(state: "idle" | "checking" | "ready" | "error"): void {
    const target = element<HTMLElement>("restState");
    target.textContent =
      state === "idle"
        ? "REST idle"
        : state === "checking"
          ? "REST checking"
          : state === "ready"
            ? "REST verified"
            : "REST failed";
    target.className = `state-chip ${state}`;
  }

  private setSocketState(state: string): void {
    const target = element<HTMLElement>("socketState");
    target.textContent = state === "connected" ? "Socket connected" : `Socket ${state}`;
    target.className = `state-chip ${state}`;
  }

  private recordEvent(name: string): void {
    element<HTMLElement>("latestEvent").textContent = name;
    const latestItem = this.eventLog.firstElementChild as HTMLElement | null;
    if (latestItem?.dataset["eventName"] === name) {
      const count = Number(latestItem.dataset["eventCount"] ?? "1") + 1;
      latestItem.dataset["eventCount"] = String(count);
      const time = latestItem.querySelector("time");
      const label = latestItem.querySelector("span");
      if (time) {
        time.textContent = new Date().toLocaleTimeString();
      }
      if (label) {
        label.textContent = `${name} (${count})`;
      }
      return;
    }
    const item = document.createElement("li");
    item.dataset["eventName"] = name;
    item.dataset["eventCount"] = "1";
    const time = document.createElement("time");
    time.textContent = new Date().toLocaleTimeString();
    const label = document.createElement("span");
    label.textContent = name;
    item.append(time, label);
    this.eventLog.prepend(item);
    while (this.eventLog.children.length > 50) {
      this.eventLog.lastElementChild?.remove();
    }
  }

  private showError(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    element<HTMLElement>("errorMessage").textContent = message;
    element<HTMLElement>("errorToast").hidden = false;
    this.recordEvent(`Error: ${message}`);
  }

  private resetAgentOptions(resetRestState = true): void {
    this.client = undefined;
    this.loadedEndpoint = undefined;
    this.clearConversationAudio();
    this.setConversationId(undefined);
    this.agentSelect.replaceChildren(new Option("Load agents from project", ""));
    this.agentSelect.disabled = true;
    this.connectButton.disabled = true;
    element<HTMLElement>("managementStatus").textContent = "Not checked";
    if (resetRestState) {
      this.setRestState("idle");
    }
    this.setConnecting(false);
  }
}

function element<T extends HTMLElement>(id: string): T {
  const value = document.getElementById(id);
  if (!value) {
    throw new Error(`Missing element #${id}.`);
  }
  return value as T;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

// `RealtimeConversationItemUnion` does not enumerate a "message" item variant (see the matching
// comment in src/realtime/protocol.ts), so persisted user/assistant messages are read back from
// the REST API as the generic `{ type }` shape. Widen to the actual wire shape to read them.
function getPersistedMessage(
  item: RealtimeConversationItemUnion,
): { role: "user" | "assistant"; text: string } | undefined {
  const candidate = item as { type: string; role?: unknown; content?: unknown };
  if (
    candidate.type !== "message" ||
    !("role" in candidate) ||
    !("content" in candidate) ||
    !Array.isArray(candidate.content) ||
    (candidate.role !== "user" && candidate.role !== "assistant")
  ) {
    return undefined;
  }
  const message = candidate as { role: "user" | "assistant"; content: unknown[] };

  const parts: string[] = [];
  let hasAudio = false;
  for (const content of message.content) {
    if (!content || typeof content !== "object") {
      continue;
    }
    const text = "text" in content && typeof content.text === "string" ? content.text : undefined;
    const transcript =
      "transcript" in content && typeof content.transcript === "string"
        ? content.transcript
        : undefined;
    if (text || transcript) {
      parts.push(text || transcript || "");
    }
    hasAudio ||= "audio" in content && typeof content.audio === "string";
  }

  return {
    role: message.role,
    text: parts.join("\n") || (hasAudio ? "Audio message" : "Message without text content"),
  };
}

function formatRecordingDetails(recording: VoiceRecordingResponse): string {
  const sampleRate =
    recording.sample_rate >= 1000
      ? `${recording.sample_rate / 1000} kHz`
      : `${recording.sample_rate} Hz`;
  const channels =
    recording.channels === 1
      ? "mono"
      : recording.channels === 2
        ? "stereo"
        : `${recording.channels} channels`;
  return `${recording.format.toUpperCase()} | ${sampleRate} | ${channels} | ${formatDuration(recording.duration_ms)}`;
}

function formatDuration(durationMs: number): string {
  const totalSeconds = Math.max(0, Math.round(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function getVoiceDefinition(agent: Agent): VoiceAgentDefinition {
  const definition = agent.versions.latest.definition;
  if (!isVoiceAgentDefinition(definition)) {
    throw new Error(`Agent ${agent.name} is not a voice agent.`);
  }
  return definition;
}

function isVoiceAgentDefinition(
  definition: AgentDefinitionUnion,
): definition is VoiceAgentDefinition {
  return (
    definition.kind === "voice" &&
    "model_type" in definition &&
    (definition.model_type === "managed" || definition.model_type === "self_deployed") &&
    "model" in definition &&
    typeof definition.model === "string"
  );
}

new VoiceAgentConsole();
