# Azure SDK for JavaScript - AI Agent Instructions

## Core Requirements

**Technologies:** Node.js, TypeScript, JavaScript, Vitest, Rush

**Non-negotiable Rules:**

- Never disable `eslint-plugin-azure-sdk` rules
- Always use LRO primitives from core packages (never write LROs manually)
- All options types must extend `OperationOptions`

**Code Quality Standards:**

- Prioritize clarity, maintainability, and testability
- Include tests and documentation with all code suggestions
- Provide detailed justifications for complex solutions
- Ask for clarification when requirements are ambiguous

## Key Reference Documentation

**Coding Guidelines:**

- [TypeScript Guidelines](../documentation/llms/guidelines/introduction.md)
- [Implementation Guidelines](../documentation/llms/guidelines/implementation.md)
- [Documentation Guidelines](../documentation/llms/guidelines/documentation.md)
- [Design and Naming Guidelines](../documentation/llms/guidelines/design.md)

**Repository Resources:**

- [Testing Guide](../documentation/Quickstart-on-how-to-write-tests.md)
- [Linting Documentation](../documentation/linting.md)

## Repository Structure

**Core Packages:** Use in-repository packages, not external versions

- `@azure/core-auth`: `sdk/core/core-auth`
- `@azure/core-client`: `sdk/core/core-client`
- `@azure/core-lro`: `sdk/core/core-lro`
- `@azure/core-paging`: `sdk/core/core-paging`
- `@azure/core-rest-pipeline`: `sdk/core/core-rest-pipeline`
- `@azure/core-tracing`: `sdk/core/core-tracing`
- `@azure/core-util`: `sdk/core/core-util`
- `@azure-rest/core-client`: `sdk/core/core-client-rest`

**Important:** When modifying core packages, remind users to run `rush build -t .`
