// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Xunit;

namespace Microsoft.SdkChat.Tests;

/// <summary>
/// Collection for tests that manipulate Console.Out.
/// Tests in this collection run sequentially to avoid race conditions.
/// </summary>
[CollectionDefinition("ConsoleOutput", DisableParallelization = true)]
public class ConsoleOutputCollection : ICollectionFixture<ConsoleOutputFixture>
{
}

/// <summary>
/// Empty fixture - just used to group tests that share Console.Out.
/// </summary>
public class ConsoleOutputFixture
{
}

/// <summary>
/// Collection for tests that depend on the SdkInfo static cache.
/// Tests in this collection run sequentially to avoid race conditions
/// caused by concurrent ClearCache() calls from parallel test classes.
/// </summary>
[CollectionDefinition("SdkInfoCache", DisableParallelization = true)]
public class SdkInfoCacheCollection
{
}
