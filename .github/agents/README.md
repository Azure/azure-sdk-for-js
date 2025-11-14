# GitHub Copilot Custom Agents

This directory contains custom agent prompts for GitHub Copilot. These agents are specialized AI assistants that can help with specific tasks in the azure-sdk-for-js repository.

## Available Agents

### 1. Test Recording Agent

**File:** `test-recording.prompt.md`

**Purpose:** Diagnose and fix Azure SDK test recording issues, including sanitizer conflicts and asset sync problems.

**Use when:**

- Tests fail in playback but pass in record mode
- Need to add or remove sanitizers
- Dealing with recording asset sync issues
- Setting up `envSetupForPlayback` for test environment variables

**Key capabilities:**

- Identifies common sanitizer over-sanitization issues
- Provides guidance on global sanitizer removal
- Helps with test-proxy commands (init, restore, push, reset)
- Documents recording workflow best practices

### 2. Package Deprecation Agent

**File:** `deprecate-package.prompt.md`

**Purpose:** Safely remove deprecated Azure SDK packages from the repository.

**Use when:**

- A package needs to be completely removed from the repository
- Following up on deprecation issues labeled with `[Deprecate]`
- A service has been retired and its SDK needs removal

**Key capabilities:**

- Removes package directory and all contents
- Updates `.github/CODEOWNERS` file
- Runs `pnpm install --no-frozen-lockfile` to update lockfile
- Provides verification steps and error handling

**What it does:**

1. Removes the package directory (e.g., `sdk/hdinsight/arm-hdinsightcontainers/`)
2. Removes the package entry from `.github/CODEOWNERS`
3. Updates `pnpm-lock.yaml --no-frozen-lockfile` by running `pnpm install`

**Example usage:**
For issue requesting deprecation of `@azure/arm-hdinsightcontainers`, the agent will:

- Remove `sdk/hdinsight/arm-hdinsightcontainers/`
- Update CODEOWNERS
- Update lockfile

## How to Use Custom Agents

Custom agents are invoked through GitHub Copilot. The prompts in this directory define specialized behaviors and expertise for specific tasks.

### In GitHub Copilot Chat

When working on tasks that match an agent's specialty:

1. Mention the specific task (e.g., "I need to deprecate package @azure/arm-example")
2. GitHub Copilot may automatically route to the appropriate specialized agent
3. The agent will follow its defined workflow and provide step-by-step guidance

### Agent Capabilities

All custom agents:

- Have focused expertise in their domain
- Follow repository conventions and best practices
- Provide verification steps and error handling
- Include examples and common patterns
- Are designed to work autonomously when invoked

## Creating New Custom Agents

To create a new custom agent:

1. Create a new `.prompt.md` file in this directory
2. Start with the YAML frontmatter:
   ```yaml
   ---
   mode: "agent"
   ---
   ```
3. Define the agent's purpose, scope, and capabilities
4. Include:
   - Clear objectives and responsibilities
   - Step-by-step workflows
   - Examples and verification steps
   - Error handling guidance
   - Scope limitations
5. Follow the structure used in existing agent prompts

## Contributing

When adding or modifying agents:

- Ensure the agent has a single, well-defined responsibility
- Provide comprehensive examples
- Include verification and error handling steps
- Document what the agent does and does NOT do
- Test the agent prompt with sample scenarios
