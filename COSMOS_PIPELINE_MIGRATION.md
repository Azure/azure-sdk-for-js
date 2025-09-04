# Cosmos DB Pipeline Migration Documentation

## Overview
This document describes the migration of the Cosmos DB SDK from using a custom pipeline template (`cosmos-sdk-client.yml`) to the standard Azure SDK pipeline template (`archetype-sdk-client.yml`).

## Changes Made

### Stage 1: Extended archetype-sdk-client.yml
Added new parameters to support service-specific customizations:

- `UseIsolatedTestStage`: Boolean to enable isolated test stage
- `IsolatedTestParameters`: Object to pass test-specific configurations
- `TestEnvVars`: Object for custom environment variables
- `PreTestSteps`: Step list for pre-test setup
- `PostTestSteps`: Step list for post-test cleanup
- `UseFederatedAuth`: Boolean to control authentication method

### Stage 2: Updated Cosmos CI Configuration
Modified `sdk/cosmosdb/ci.yml` to use the standard template with:

- `UseIsolatedTestStage: true` - Enables isolated test stage
- `IsolatedTestParameters` - Configured with Cosmos-specific settings
- `PreTestSteps` - Points to Cosmos emulator setup
- `PostTestSteps` - Points to Cosmos integration tests
- `TestEnvVars` - Sets Cosmos-specific environment variables
- `UseFederatedAuth: false` - Disables federated auth for Cosmos
- `MatrixFilters` - Restricts tests to Node.js only (no browser tests)

## Cosmos-Specific Requirements

### Environment Variables
- `MOCHA_TIMEOUT: 100000` - Extended timeout for integration tests
- `NODE_TLS_REJECT_UNAUTHORIZED: 0` - Required for Cosmos emulator SSL

### Custom Steps
- **PreTestSteps**: `cosmos-integration-public.yml` - Sets up Cosmos DB emulator
- **PostTestSteps**: `cosmos-additional-steps.yml` - Runs integration tests

### Authentication
- `UseFederatedAuth: false` - Cosmos requires non-federated authentication

### Test Matrix
- Only Node.js tests are run (browser tests excluded)
- Uses LTS maintenance Node.js version

## Benefits of Migration

1. **Unified Pipeline**: Uses the same template as other Azure SDK services
2. **Maintainability**: Reduces duplicate pipeline code
3. **Consistency**: Follows standard Azure SDK pipeline patterns
4. **Flexibility**: Can be extended for other services with special requirements

## Backward Compatibility

The original `cosmos-sdk-client.yml` template has been backed up as `cosmos-sdk-client.yml.backup` and can be restored if needed.

## Testing

The migration maintains all existing Cosmos-specific functionality:
- Cosmos DB emulator setup
- Extended timeouts for integration tests
- Node.js-only test execution
- Custom authentication settings

## Future Improvements

1. Consider if any Cosmos-specific requirements can be generalized for other services
2. Evaluate if browser tests should be enabled for Cosmos SDK
3. Document best practices for other services needing custom pipeline configurations
