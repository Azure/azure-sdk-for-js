// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

public class DirectoryFingerprintTests : IDisposable
{
    private readonly string _tempDir;

    public DirectoryFingerprintTests()
    {
        _tempDir = Path.Combine(Path.GetTempPath(), $"sdk-chat-test-{Guid.NewGuid():N}");
        Directory.CreateDirectory(_tempDir);
    }

    public void Dispose()
    {
        if (Directory.Exists(_tempDir))
            Directory.Delete(_tempDir, recursive: true);
    }

    [Fact]
    public void Compute_NonExistentDirectory_ReturnsEmpty()
    {
        var result = DirectoryFingerprint.Compute("/no/such/path", [".cs"]);
        Assert.Equal("", result);
    }

    [Fact]
    public void Compute_EmptyDirectory_ReturnsEmpty()
    {
        var result = DirectoryFingerprint.Compute(_tempDir, [".cs"]);
        Assert.Equal("", result);
    }

    [Fact]
    public void Compute_NoMatchingExtensions_ReturnsEmpty()
    {
        File.WriteAllText(Path.Combine(_tempDir, "readme.md"), "hello");
        var result = DirectoryFingerprint.Compute(_tempDir, [".cs"]);
        Assert.Equal("", result);
    }

    [Fact]
    public void Compute_WithMatchingFiles_ReturnsNonEmpty()
    {
        File.WriteAllText(Path.Combine(_tempDir, "file.cs"), "class Foo {}");
        var result = DirectoryFingerprint.Compute(_tempDir, [".cs"]);
        Assert.NotEqual("", result);
        Assert.Equal(32, result.Length);
    }

    [Fact]
    public void Compute_SameState_ReturnsSameFingerprint()
    {
        File.WriteAllText(Path.Combine(_tempDir, "file.cs"), "class Foo {}");

        var fp1 = DirectoryFingerprint.Compute(_tempDir, [".cs"]);
        var fp2 = DirectoryFingerprint.Compute(_tempDir, [".cs"]);

        Assert.Equal(fp1, fp2);
    }

    [Fact]
    public void Compute_FileAdded_ChangesFingerprint()
    {
        File.WriteAllText(Path.Combine(_tempDir, "a.py"), "x = 1");
        var fp1 = DirectoryFingerprint.Compute(_tempDir, [".py"]);

        File.WriteAllText(Path.Combine(_tempDir, "b.py"), "y = 2");
        var fp2 = DirectoryFingerprint.Compute(_tempDir, [".py"]);

        Assert.NotEqual(fp1, fp2);
    }

    [Fact]
    public void Compute_FileDeleted_ChangesFingerprint()
    {
        File.WriteAllText(Path.Combine(_tempDir, "a.py"), "x = 1");
        File.WriteAllText(Path.Combine(_tempDir, "b.py"), "y = 2");
        var fp1 = DirectoryFingerprint.Compute(_tempDir, [".py"]);

        File.Delete(Path.Combine(_tempDir, "b.py"));
        var fp2 = DirectoryFingerprint.Compute(_tempDir, [".py"]);

        Assert.NotEqual(fp1, fp2);
    }

    [Fact]
    public void Compute_FileModified_ChangesFingerprint()
    {
        var filePath = Path.Combine(_tempDir, "file.cs");
        File.WriteAllText(filePath, "class Foo {}");
        var fp1 = DirectoryFingerprint.Compute(_tempDir, [".cs"]);

        // Ensure different mtime (filesystem resolution can be 1-2 seconds)
        Thread.Sleep(50);
        File.WriteAllText(filePath, "class Foo { int X; }");
        var fp2 = DirectoryFingerprint.Compute(_tempDir, [".cs"]);

        Assert.NotEqual(fp1, fp2);
    }

    [Fact]
    public void Compute_IgnoresNonMatchingExtensions()
    {
        File.WriteAllText(Path.Combine(_tempDir, "file.cs"), "class Foo {}");
        File.WriteAllText(Path.Combine(_tempDir, "readme.md"), "hello");

        var fp1 = DirectoryFingerprint.Compute(_tempDir, [".cs"]);

        // Adding a non-matching file shouldn't change the fingerprint
        File.WriteAllText(Path.Combine(_tempDir, "notes.txt"), "notes");
        var fp2 = DirectoryFingerprint.Compute(_tempDir, [".cs"]);

        Assert.Equal(fp1, fp2);
    }

    [Fact]
    public void Compute_MultipleExtensions_IncludesAll()
    {
        File.WriteAllText(Path.Combine(_tempDir, "main.ts"), "export {}");
        var fpTs = DirectoryFingerprint.Compute(_tempDir, [".ts"]);
        var fpTsJs = DirectoryFingerprint.Compute(_tempDir, [".ts", ".js"]);

        // Same result since only .ts exists
        Assert.Equal(fpTs, fpTsJs);

        // Adding .js file changes multi-extension fingerprint but not single
        File.WriteAllText(Path.Combine(_tempDir, "util.js"), "module.exports = {}");
        var fpTs2 = DirectoryFingerprint.Compute(_tempDir, [".ts"]);
        var fpTsJs2 = DirectoryFingerprint.Compute(_tempDir, [".ts", ".js"]);

        Assert.Equal(fpTs, fpTs2); // .ts fingerprint unchanged
        Assert.NotEqual(fpTsJs, fpTsJs2); // .ts+.js fingerprint changed
    }

    [Fact]
    public void Compute_ExcludesGitDirectory()
    {
        File.WriteAllText(Path.Combine(_tempDir, "file.cs"), "class Foo {}");

        var gitDir = Path.Combine(_tempDir, ".git");
        Directory.CreateDirectory(gitDir);
        File.WriteAllText(Path.Combine(gitDir, "HEAD.cs"), "ref: refs/heads/main");

        var fp = DirectoryFingerprint.Compute(_tempDir, [".cs"]);

        // Remove the .git dir and verify same fingerprint
        Directory.Delete(gitDir, recursive: true);
        var fp2 = DirectoryFingerprint.Compute(_tempDir, [".cs"]);

        Assert.Equal(fp, fp2);
    }

    [Fact]
    public void Compute_ExcludesNodeModules()
    {
        File.WriteAllText(Path.Combine(_tempDir, "index.ts"), "export {}");

        var nmDir = Path.Combine(_tempDir, "node_modules");
        Directory.CreateDirectory(nmDir);
        File.WriteAllText(Path.Combine(nmDir, "dep.ts"), "export {}");

        var fp1 = DirectoryFingerprint.Compute(_tempDir, [".ts"]);

        // Remove node_modules — fingerprint should be the same
        Directory.Delete(nmDir, recursive: true);
        var fp2 = DirectoryFingerprint.Compute(_tempDir, [".ts"]);

        Assert.Equal(fp1, fp2);
    }

    [Fact]
    public void Compute_ExcludesVendorDirectory()
    {
        File.WriteAllText(Path.Combine(_tempDir, "main.go"), "package main");

        var vendorDir = Path.Combine(_tempDir, "vendor");
        Directory.CreateDirectory(vendorDir);
        File.WriteAllText(Path.Combine(vendorDir, "dep.go"), "package dep");

        var fp1 = DirectoryFingerprint.Compute(_tempDir, [".go"]);

        Directory.Delete(vendorDir, recursive: true);
        var fp2 = DirectoryFingerprint.Compute(_tempDir, [".go"]);

        Assert.Equal(fp1, fp2);
    }

    [Fact]
    public void Compute_IncludesSubdirectories()
    {
        File.WriteAllText(Path.Combine(_tempDir, "root.py"), "x = 1");

        var subDir = Path.Combine(_tempDir, "pkg");
        Directory.CreateDirectory(subDir);
        File.WriteAllText(Path.Combine(subDir, "mod.py"), "y = 2");

        var fp1 = DirectoryFingerprint.Compute(_tempDir, [".py"]);

        // Fingerprint includes subdirectory files
        File.WriteAllText(Path.Combine(subDir, "mod2.py"), "z = 3");
        var fp2 = DirectoryFingerprint.Compute(_tempDir, [".py"]);

        Assert.NotEqual(fp1, fp2);
    }

    [Fact]
    public void Compute_ReturnsLowercaseHex()
    {
        File.WriteAllText(Path.Combine(_tempDir, "file.cs"), "class Foo {}");
        var fp = DirectoryFingerprint.Compute(_tempDir, [".cs"]);

        Assert.Equal(fp, fp.ToLowerInvariant());
        Assert.True(fp.All(c => char.IsAsciiHexDigitLower(c)));
    }
}
