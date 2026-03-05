// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Collection for tests that modify global state (environment variables, Console streams).
/// Tests in this collection run sequentially and not in parallel with other tests.
/// </summary>
[CollectionDefinition("ToolPathResolver", DisableParallelization = true)]
public class ToolPathResolverCollection : ICollectionFixture<ToolPathResolverFixture>
{
}

/// <summary>
/// Fixture for ToolPathResolver tests. Can be used to share setup/cleanup logic.
/// </summary>
public class ToolPathResolverFixture
{
    // Empty fixture - used only to control parallelization
}

/// <summary>
/// Collection for tests that invoke external tools (JBang, Node, Go, Python).
/// Tests in this collection run sequentially to avoid resource contention.
/// </summary>
[CollectionDefinition("LanguageContext", DisableParallelization = true)]
public class LanguageContextCollection : ICollectionFixture<LanguageContextFixture>
{
}

/// <summary>
/// Fixture for language context integration tests.
/// </summary>
public class LanguageContextFixture
{
    // Empty fixture - used only to control parallelization
}

/// <summary>
/// Collection for tests that modify DockerSandbox global state (environment variables).
/// Tests in this collection run sequentially.
/// </summary>
[CollectionDefinition("DockerSandbox", DisableParallelization = true)]
public class DockerSandboxCollection
{
}

/// <summary>
/// Collection for tests that modify EngineAvailability global state (caches, environment variables).
/// Tests in this collection run sequentially.
/// </summary>
[CollectionDefinition("EngineAvailability", DisableParallelization = true)]
public class EngineAvailabilityCollection
{
}
