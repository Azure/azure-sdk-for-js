# JavaScript Sample Generation Guidelines

## Overview
Generate clear, runnable JavaScript code samples for SDK packages.

## Code Style
- Use ES modules (import/export) or CommonJS as appropriate for the package
- Use async/await for asynchronous operations
- Use const for constants, let for variables (never var)
- Use arrow functions where appropriate
- Use template literals for string interpolation
- Use destructuring for clean parameter handling

## Sample Structure
```javascript
// Sample: [Sample Name]
// Description: [Brief description]

const { ClientName } = require("@sdk/package-name");
// or: import { ClientName } from "@sdk/package-name";

async function main() {
    // Initialize client
    const client = new ClientName(/* credentials */);
    
    // Demonstrate feature
    const result = await client.someOperation();
    console.log("Result:", result);
}

main().catch(console.error);
```

## Documentation
- Include JSDoc comments for complex functions
- Add inline comments explaining key operations
- Document environment variables and configuration
- Include error handling examples

## Naming Conventions
- camelCase for variables and functions
- PascalCase for classes
- UPPER_SNAKE_CASE for constants
- Descriptive names that indicate purpose

## Error Handling
```javascript
try {
    const result = await client.operation();
} catch (error) {
    if (error.statusCode === 404) {
        console.error("Resource not found");
    } else {
        throw error;
    }
}
```

## Environment Configuration
```javascript
const endpoint = process.env.SDK_ENDPOINT || "<your-endpoint>";
const apiKey = process.env.SDK_API_KEY;
```

## Best Practices
- Show both sync and async patterns where applicable
- Include cleanup/disposal code when needed
- Demonstrate pagination for list operations
- Show retry patterns for transient failures
