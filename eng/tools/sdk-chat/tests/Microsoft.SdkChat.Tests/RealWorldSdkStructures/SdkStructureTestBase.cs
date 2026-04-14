// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.SdkChat.Services;

namespace Microsoft.SdkChat.Tests.RealWorldSdkStructures;

/// <summary>
/// Base class for SDK structure tests providing common setup and helper methods.
/// </summary>
public abstract class SdkStructureTestBase : IDisposable
{
    protected readonly string _testRoot;

    protected SdkStructureTestBase()
    {
        SdkInfo.ClearCache();
        _testRoot = Path.Combine(Path.GetTempPath(), $"SdkStructureTest_{Guid.NewGuid():N}");
        Directory.CreateDirectory(_testRoot);
    }

    public void Dispose()
    {
        SdkInfo.ClearCache();
        try
        {
            if (Directory.Exists(_testRoot))
                Directory.Delete(_testRoot, recursive: true);
        }
        catch { }
        GC.SuppressFinalize(this);
    }

    protected string CreatePath(params string[] paths)
    {
        var fullPath = Path.Combine(_testRoot, Path.Combine(paths));
        Directory.CreateDirectory(fullPath);
        return fullPath;
    }

    protected void CreateFile(string path, string name)
    {
        var filePath = Path.Combine(path, name);
        Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);
        File.WriteAllText(filePath, "// test content");
    }

    protected void CreateFile(string name)
    {
        CreateFile(_testRoot, name);
    }
}
