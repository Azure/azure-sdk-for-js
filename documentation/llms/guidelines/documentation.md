# Azure SDK TypeScript Guidelines - Documentation

## Required Documentation Deliverables

1. **README.md** - In library root directory with installation and usage info
2. **API Reference** - Generated from docstrings, published on docs.microsoft.com
3. **Code Snippets** - Short examples for champion scenarios
4. **Quickstart** - docs.microsoft.com article expanding on README
5. **Conceptual Documentation** - Long-form tutorials, how-to guides, etc.

## General Documentation Requirements

**MUST:**

- Include service content developer in architecture review
- Follow Azure SDK Contributors Guide
- Follow Microsoft style guides:
  - Microsoft Writing Style Guide
  - Microsoft Cloud Style Guide
- Document required `tsconfig.json` settings in README under "Configure TypeScript" section (after "Install the Package")

**SHOULD:**

- Document library into silence - preempt usage questions
- Include information on service limits, errors, and recovery strategies

## Code Snippets

**MUST:**

- Include example code snippets alongside library code in repository
- Build and test snippets using CI to ensure they remain functional
- Include snippets in library docstrings for API reference
- Include snippets for every common operation and complex scenarios
- Cover all champion scenarios identified for the library

**MUST NOT:**

- Combine multiple operations in one snippet unless required for demonstration
- Force developers to understand tangential code to extract what they need

**Guidelines for Snippets:**

- Show atomic operations clearly
- Make code copy-pastable into projects
- Focus on single operation per snippet
- Provide separate snippets for each distinct operation

### Example Structure

```typescript
// Good - Single operation focus
async function createContainer() {
  const containerClient = new ContainerClient(connectionString, containerName);
  await containerClient.create();
}

// Good - Separate snippet for different operation
async function listBlobs() {
  const containerClient = new ContainerClient(connectionString, containerName);
  for await (const blob of containerClient.listBlobs()) {
    console.log(blob.name);
  }
}

// Avoid - Multiple unrelated operations
async function createAndList() {
  // Creates cognitive load - user has to understand container creation
  // even if they just want to list blobs
  const containerClient = new ContainerClient(connectionString, containerName);
  await containerClient.create(); // Not needed for listing scenario
  for await (const blob of containerClient.listBlobs()) {
    console.log(blob.name);
  }
}
```

## Samples

**MUST:**

- Have samples available for JavaScript

**SHOULD:**

- Have samples available in both JavaScript and TypeScript
- Have browser samples tailored for browser scenarios (don't duplicate all samples)

### Sample Organization

- Organize by scenario, not by language feature
- Include both basic and advanced usage patterns
- Provide samples for different environments (Node.js, browser)
- Include error handling examples
- Show authentication patterns

### Sample Quality

- Samples should be production-ready code style
- Include proper error handling
- Use realistic variable names and scenarios
- Include comments explaining key concepts
- Be self-contained and runnable

## README.md Structure

**Required Sections:**

1. **Installation** - How to install the package
2. **Configure TypeScript** - Required tsconfig.json settings (if any)
3. **Authentication** - How to authenticate with the service
4. **Basic Usage** - Simple code examples for main scenarios
5. **Advanced Usage** - Complex scenarios and configuration options
6. **Troubleshooting** - Common issues and solutions
7. **Next Steps** - Links to more documentation

**Example README Flow:**

````markdown
# Azure Service Client Library for JavaScript

## Install the Package

```bash
npm install @azure/service-name
```
````

## Configure TypeScript

This library requires the following TypeScript compiler options:

```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true
  }
}
```

## Authentication

// Clear auth examples

## Basic Usage

// Champion scenario examples

## Advanced Usage

// Complex scenarios, configuration

## Troubleshooting

// Common issues, error handling

## Next Steps

// Links to more docs

````

## API Documentation (Docstrings)

**MUST:**
- Document all public APIs with clear descriptions
- Include parameter descriptions and types
- Document return values and types
- Include example usage in docstrings
- Document exceptions that can be thrown
- Explain when network calls are made

**SHOULD:**
- Include performance considerations
- Document service limitations
- Provide links to service documentation
- Include version information when features were added

### Docstring Format
```typescript
/**
 * Creates a new container in the storage account.
 *
 * @param containerName - The name of the container to create
 * @param options - Optional parameters for container creation
 * @returns Promise that resolves when container is created
 *
 * @throws {@link StorageError} When container already exists or name is invalid
 *
 * @example
 * ```typescript
 * const client = new BlobServiceClient(connectionString);
 * await client.createContainer("my-container");
 * ```
 *
 * @remarks
 * Container names must be lowercase and between 3-63 characters.
 * This operation makes a network call to the Azure Storage service.
 */
async createContainer(
  containerName: string,
  options: CreateContainerOptions = {}
): Promise<CreateContainerResponse>
````

## Error Documentation

**MUST:**

- Document all error types that methods can throw
- Provide error handling examples
- Explain error recovery strategies
- Include error codes and meanings

**Example Error Documentation:**

````typescript
/**
 * @throws {@link NotFoundError} When the specified resource doesn't exist
 * @throws {@link AuthenticationError} When credentials are invalid
 * @throws {@link ServiceError} When the service returns an error response
 *
 * @example Handle specific errors
 * ```typescript
 * try {
 *   await client.getItem("nonexistent");
 * } catch (error) {
 *   if (error.name === "NotFoundError") {
 *     // Handle missing resource
 *   } else if (error.name === "AuthenticationError") {
 *     // Handle auth failure
 *   }
 * }
 * ```
 */
````

## Documentation Testing

**MUST:**

- Test code snippets in documentation as part of CI
- Ensure all examples are runnable and current
- Validate links in documentation

**SHOULD:**

- Use automated tools to validate documentation quality
- Include documentation review as part of PR process
- Test documentation with real users when possible

## Browser-Specific Documentation

**MUST:**

- Document any browser-specific requirements or limitations
- Provide browser setup instructions if needed
- Include CORS configuration guidance when applicable

**SHOULD:**

- Provide browser-specific code examples when patterns differ from Node.js
- Document bundler configuration recommendations
