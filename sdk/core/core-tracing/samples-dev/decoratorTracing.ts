// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates using TypeScript 5.0 decorators with @azure/core-tracing to automatically instrument methods.
 */

import {
  createTracingClient,
  traced,
  traceable,
  OperationTracingOptions,
  TracingClient,
} from "@azure/core-tracing";

/**
 * Represents common operation options
 */
interface OperationOptions {
  tracingOptions?: OperationTracingOptions;
}

/**
 * Options for getting a user
 */
interface GetUserOptions extends OperationOptions {
  includeDetails?: boolean;
}

/**
 * Options for updating a user
 */
interface UpdateUserOptions extends OperationOptions {
  validateOnly?: boolean;
}

/**
 * Represents a user in the system
 */
interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Example Azure client that uses the @traced decorator to automatically
 * instrument methods with tracing.
 *
 * The @traceable decorator is optional and serves as documentation that
 * this class uses tracing.
 */
@traceable
class UserServiceClient {
  private tracingClient: TracingClient;

  constructor() {
    // Create a tracing client in the constructor
    this.tracingClient = createTracingClient({
      packageName: "@azure/example-users",
      packageVersion: "1.0.0",
      namespace: "Microsoft.Users",
    });
  }

  /**
   * Gets a user by ID. The @traced decorator automatically wraps this method
   * with tracing, creating a span named "UserServiceClient.getUser".
   *
   * @param userId - The ID of the user to retrieve
   * @param options - Operation options including tracing context
   */
  @traced()
  async getUser(userId: string, options: GetUserOptions = {}): Promise<User> {
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Return mock data
    return {
      id: userId,
      name: "John Doe",
      email: "john.doe@example.com",
    };
  }

  /**
   * Updates a user. Uses a custom span name via decorator options.
   *
   * @param user - The user data to update
   * @param options - Operation options
   */
  @traced({
    spanName: "UserServiceClient.updateUser",
    spanOptions: {
      spanKind: "client",
      spanAttributes: { "operation.type": "update" },
    },
  })
  async updateUser(user: User, options: UpdateUserOptions = {}): Promise<User> {
    // Simulate validation
    if (options.validateOnly) {
      return user;
    }

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 150));

    return user;
  }

  /**
   * Deletes a user by ID. Demonstrates error handling with tracing.
   *
   * @param userId - The ID of the user to delete
   * @param options - Operation options
   */
  @traced()
  async deleteUser(userId: string, options: OperationOptions = {}): Promise<void> {
    // Simulate validation error
    if (userId === "admin") {
      throw new Error("Cannot delete admin user");
    }

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  /**
   * Lists all users. Demonstrates a method with the options parameter
   * in a different position.
   *
   * @param options - Operation options
   * @param maxResults - Maximum number of results to return
   */
  @traced({ optionsIndex: 0 })
  async listUsers(options: OperationOptions = {}, maxResults: number = 10): Promise<User[]> {
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Return mock data
    const users: User[] = [];
    for (let i = 0; i < Math.min(maxResults, 5); i++) {
      users.push({
        id: `user${i}`,
        name: `User ${i}`,
        email: `user${i}@example.com`,
      });
    }

    return users;
  }

  /**
   * Example of a method that calls another traced method.
   * The tracing context will be propagated automatically.
   *
   * @param userId - The ID of the user
   * @param options - Operation options
   */
  @traced()
  async getUserWithDetails(userId: string, options: GetUserOptions = {}): Promise<User> {
    // This call will be traced as a child span of getUserWithDetails
    const user = await this.getUser(userId, {
      ...options,
      includeDetails: true,
    });

    // Additional processing could happen here
    return user;
  }
}

/**
 * Example client without decorators for comparison
 */
class UserServiceClientManual {
  private tracingClient: TracingClient;

  constructor() {
    this.tracingClient = createTracingClient({
      packageName: "@azure/example-users",
      packageVersion: "1.0.0",
      namespace: "Microsoft.Users",
    });
  }

  /**
   * Same operation as above but manually using withSpan
   */
  async getUser(userId: string, options: GetUserOptions = {}): Promise<User> {
    return this.tracingClient.withSpan(
      "UserServiceClientManual.getUser",
      options,
      async (_updatedOptions) => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return {
          id: userId,
          name: "John Doe",
          email: "john.doe@example.com",
        };
      },
    );
  }
}

export async function main(): Promise<void> {
  console.log("=== Demonstrating @traced decorator ===\n");

  const client = new UserServiceClient();

  // Example 1: Simple operation
  console.log("1. Getting user...");
  const user = await client.getUser("user123");
  console.log(`   Retrieved user: ${user.name}`);

  // Example 2: Operation with custom span options
  console.log("\n2. Updating user...");
  const updatedUser = await client.updateUser({
    id: "user123",
    name: "Jane Doe",
    email: "jane.doe@example.com",
  });
  console.log(`   Updated user: ${updatedUser.name}`);

  // Example 3: Nested operations (parent-child spans)
  console.log("\n3. Getting user with details (nested operation)...");
  const detailedUser = await client.getUserWithDetails("user456");
  console.log(`   Retrieved detailed user: ${detailedUser.name}`);

  // Example 4: Listing with custom parameter position
  console.log("\n4. Listing users...");
  const users = await client.listUsers({}, 3);
  console.log(`   Retrieved ${users.length} users`);

  // Example 5: Error handling
  console.log("\n5. Attempting to delete admin user (will fail)...");
  try {
    await client.deleteUser("admin");
  } catch (error: any) {
    console.log(`   Error caught: ${error.message}`);
    console.log("   (Error will be recorded on the span)");
  }

  console.log("\n=== Comparison with manual withSpan ===\n");
  const manualClient = new UserServiceClientManual();
  const manualUser = await manualClient.getUser("user789");
  console.log(`Retrieved user manually: ${manualUser.name}`);

  console.log("\n✓ All examples completed successfully!");
  console.log("\nNote: To see actual traces, configure an OpenTelemetry instrumentation library.");
  console.log("See: https://www.npmjs.com/package/@azure/opentelemetry-instrumentation-azure-sdk");
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
