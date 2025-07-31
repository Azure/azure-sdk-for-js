# Contributing to Azure Monitor OpenTelemetry Samples

Thank you for your interest in contributing to this project! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm 8+
- Git
- VS Code (recommended)

### Getting Started

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/your-username/azure-monitor-opentelemetry-js.git
   cd azure-monitor-opentelemetry-js
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Azure Application Insights connection string
   ```

## Development Workflow

### Code Quality

We use ESLint and Prettier to maintain code quality and consistency.

**Available Scripts:**
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted
- `npm run type-check` - Run TypeScript type checking
- `npm run validate` - Run all quality checks

### Before Committing

Always run the validation script before committing:
```bash
npm run validate
```

This will run:
- TypeScript compilation check
- ESLint linting
- Prettier formatting check

### Project Structure

```
src/
├── index.ts              # Main entry point
├── examples/             # Example implementations
│   ├── 01-basic-connection.ts
│   ├── 02-environment-connection.ts
│   └── ...
└── config/              # Configuration utilities
```

### Adding New Examples

1. Create a new file in `src/examples/` following the naming convention: `XX-description.ts`
2. Implement your example class with a static `run()` method
3. Add import and call in `src/index.ts` (commented out by default)
4. Update documentation as needed

### Example Template

```typescript
/**
 * Your Example Name
 * 
 * Description of what this example demonstrates.
 */

export class YourExampleName {
    static async run() {
        try {
            // Your implementation here
            console.log('Example completed successfully');
        } catch (error) {
            console.error('Error in example:', error);
        }
    }
}

// Usage instructions
if (require.main === module) {
    console.log('💡 Usage instructions for this example');
}
```

## Pull Request Process

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit:**
   ```bash
   git add .
   git commit -m "feat: add new example for XYZ"
   ```

3. **Run tests and validation:**
   ```bash
   npm run validate
   npm run build
   ```

4. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   ```

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test additions or modifications
- `chore:` - Maintenance tasks

## Code Style Guidelines

- Use TypeScript for all new code
- Follow the existing code style (enforced by Prettier and ESLint)
- Add JSDoc comments for public methods and classes
- Use descriptive variable and function names
- Include error handling in examples
- Add usage instructions for standalone examples

## Testing

Currently, this project focuses on example code. When adding new examples:

- Ensure they run without errors
- Include proper error handling
- Test with valid Azure Application Insights connection strings
- Verify the example works in different scenarios

## Documentation

- Update README.md if adding new features or examples
- Include inline comments for complex logic
- Add usage instructions for new examples
- Update this CONTRIBUTING.md if changing the development process

## Questions or Issues?

- Check existing issues on GitHub
- Create a new issue if you found a bug or have a feature request
- For questions about Azure Monitor or OpenTelemetry, refer to the official documentation

Thank you for contributing! 🚀
