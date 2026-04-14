// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Services;

namespace Microsoft.SdkChat.Tests.Services;

/// <summary>
/// Base class for PackageInfoService entity tests.
/// Provides common setup and teardown for test directories.
/// </summary>
public abstract class PackageInfoTestBase : IDisposable
{
    protected readonly string TestRoot;
    protected readonly PackageInfoService Service;

    protected PackageInfoTestBase()
    {
        TestRoot = Path.Combine(Path.GetTempPath(), $"PackageInfoTests_{Guid.NewGuid():N}");
        Directory.CreateDirectory(TestRoot);
        Service = new PackageInfoService();
    }

    public void Dispose()
    {
        try
        {
            if (Directory.Exists(TestRoot))
                Directory.Delete(TestRoot, recursive: true);
        }
        catch { }
        GC.SuppressFinalize(this);
    }
}
