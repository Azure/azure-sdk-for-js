# Azure SDK TypeScript Guidelines - Introduction

These guidelines help create consistent, developer-friendly TypeScript client libraries for Azure services.

## Core Design Principles

### 1. Idiomatic

- Follow TypeScript/JavaScript conventions and patterns
- Feel natural to TypeScript and JavaScript developers
- Use modern language features (async/await, promises, iterators)

### 2. Consistent

- Be consistent within TypeScript, with the service, and between languages
- Priority order: TypeScript consistency > service consistency > cross-language consistency
- Use consistent patterns for logging, HTTP communication, and error handling

### 3. Approachable

- Provide excellent documentation and examples
- Use sensible defaults that follow best practices
- Make common scenarios discoverable and easy to implement
- Minimize the learning curve for new developers

### 4. Diagnosable

- Make it clear when network calls occur
- Provide meaningful error messages with actionable guidance
- Support debugging and troubleshooting
- Implement comprehensive logging and tracing

### 5. Dependable

- Avoid breaking changes
- Maintain backward compatibility
- Be careful with dependencies that could force breaking changes

## General Requirements

**MUST:**

- Follow the General Azure SDK Guidelines
- Place all code in the azure/azure-sdk-for-js repository
- Follow Azure SDK engineering systems guidelines
- Use these guidelines for `@azure` scope packages

**SHOULD:**

- Follow these guidelines even for non-Azure packages

## Key Terminology

- **CommonJS (CJS)**: Node.js module format using `require` and `module.exports`
- **ECMAScript Module (ESM)**: Standard import/export syntax from ES6
- **AMD Module**: Browser module format (e.g., RequireJS)
