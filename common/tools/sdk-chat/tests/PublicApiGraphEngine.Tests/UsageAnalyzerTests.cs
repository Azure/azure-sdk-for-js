// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.DotNet;
using Xunit;

using GoModels = PublicApiGraphEngine.Go;
using JavaModels = PublicApiGraphEngine.Java;
using PyModels = PublicApiGraphEngine.Python;
using TsModels = PublicApiGraphEngine.TypeScript;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for the CSharpUsageAnalyzer.
/// </summary>
public class UsageAnalyzerTests
{
    private readonly CSharpUsageAnalyzer _analyzer = new();

    [Fact]
    public async Task AnalyzeAsync_EmptyDirectory_ReturnsEmptyIndex()
    {
        // Arrange
        var tempDir = Path.Combine(Path.GetTempPath(), $"usage_test_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);

        try
        {
            var apiIndex = CreateTestApiIndex();

            // Act
            var result = await _analyzer.AnalyzeAsync(tempDir, apiIndex);

            // Assert
            Assert.Equal(0, result.FileCount);
            Assert.Empty(result.CoveredOperations);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    [Fact]
    public async Task AnalyzeAsync_DetectsDirectMethodCall()
    {
        // Arrange
        var (tempDir, _) = await SetupTestFilesAsync(
            ("sample.cs", """
                using TestSdk;

                var client = new ChatClient();
                var result = await client.GetCompletionAsync("Hello");
                Console.WriteLine(result);
                """));

        try
        {
            var apiIndex = CreateTestApiIndex();

            // Act
            var result = await _analyzer.AnalyzeAsync(tempDir, apiIndex);

            // Assert
            Assert.Equal(1, result.FileCount);
            Assert.Single(result.CoveredOperations);
            Assert.Equal("ChatClient", result.CoveredOperations[0].ClientType);
            Assert.Equal("GetCompletionAsync", result.CoveredOperations[0].Operation);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    [Fact]
    public async Task AnalyzeAsync_DetectsMultipleMethods()
    {
        // Arrange
        var (tempDir, _) = await SetupTestFilesAsync(
            ("sample.cs", """
                using TestSdk;
                var chatClient = new ChatClient();
                var completion = await chatClient.GetCompletionAsync("Hi");
                var stream = chatClient.GetStreamingCompletionAsync("Hi");

                var embedClient = new EmbeddingClient();
                var embeddings = await embedClient.GetEmbeddingsAsync(["text"]);
                """));

        try
        {
            var apiIndex = CreateTestApiIndex();

            // Act
            var result = await _analyzer.AnalyzeAsync(tempDir, apiIndex);

            // Assert
            Assert.Equal(3, result.CoveredOperations.Count);

            var chatOps = result.CoveredOperations.Where(o => o.ClientType == "ChatClient").ToList();
            Assert.Equal(2, chatOps.Count);
            Assert.Contains(chatOps, o => o.Operation == "GetCompletionAsync");
            Assert.Contains(chatOps, o => o.Operation == "GetStreamingCompletionAsync");

            var embedOps = result.CoveredOperations.Where(o => o.ClientType == "EmbeddingClient").ToList();
            Assert.Single(embedOps);
            Assert.Equal("GetEmbeddingsAsync", embedOps[0].Operation);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    [Fact]
    public async Task AnalyzeAsync_IdentifiesUncoveredOperations()
    {
        // Arrange
        var (tempDir, _) = await SetupTestFilesAsync(
            ("sample.cs", """
                using TestSdk;
                var client = new ChatClient();
                await client.GetCompletionAsync("test");
                """));

        try
        {
            var apiIndex = CreateTestApiIndex();

            // Act
            var result = await _analyzer.AnalyzeAsync(tempDir, apiIndex);

            // Assert - GetStreamingCompletionAsync should be uncovered
            Assert.Contains(result.UncoveredOperations,
                o => o.ClientType == "ChatClient" && o.Operation == "GetStreamingCompletionAsync");

            // EmbeddingClient.GetEmbeddingsAsync should also be uncovered
            Assert.Contains(result.UncoveredOperations,
                o => o.ClientType == "EmbeddingClient" && o.Operation == "GetEmbeddingsAsync");
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    [Fact]
    public async Task AnalyzeAsync_DetectsSubclientMethodCall()
    {
        // Arrange
        var (tempDir, _) = await SetupTestFilesAsync(
            ("sample.cs", """
                using TestSdk;
                var client = new EmptyClient();
                await client.Widgets.ListWidgetsAsync();
                """));

        try
        {
            var apiIndex = CreateTestApiIndex();

            // Act
            var result = await _analyzer.AnalyzeAsync(tempDir, apiIndex);

            // Assert
            Assert.Contains(result.CoveredOperations,
                o => o.ClientType == "WidgetClient" && o.Operation == "ListWidgetsAsync");
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    [Fact]
    public async Task AnalyzeAsync_DeduplicatesOperations()
    {
        // Arrange - same method called multiple times
        var (tempDir, _) = await SetupTestFilesAsync(
            ("sample1.cs", """
                using TestSdk;
                var client = new ChatClient();
                await client.GetCompletionAsync("test1");
                """),
            ("sample2.cs", """
                using TestSdk;
                var client = new ChatClient();
                await client.GetCompletionAsync("test2");
                await client.GetCompletionAsync("test3");
                """));

        try
        {
            var apiIndex = CreateTestApiIndex();

            // Act
            var result = await _analyzer.AnalyzeAsync(tempDir, apiIndex);

            // Assert - should only appear once despite 3 calls
            var chatOps = result.CoveredOperations.Where(o =>
                o.ClientType == "ChatClient" && o.Operation == "GetCompletionAsync").ToList();
            Assert.Single(chatOps);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    [Fact]
    public async Task AnalyzeAsync_IgnoresBinObjFolders()
    {
        // Arrange
        var tempDir = Path.Combine(Path.GetTempPath(), $"usage_test_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);
        Directory.CreateDirectory(Path.Combine(tempDir, "obj"));

        // Put a file in obj that should be ignored
        await File.WriteAllTextAsync(Path.Combine(tempDir, "obj", "sample.cs"), """
            var client = new ChatClient();
            await client.GetCompletionAsync("test");
            """);

        try
        {
            var apiIndex = CreateTestApiIndex();

            // Act
            var result = await _analyzer.AnalyzeAsync(tempDir, apiIndex);

            // Assert - file in obj should be ignored
            Assert.Equal(0, result.FileCount);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    [Fact]
    public void Format_ProducesReadableOutput()
    {
        // Arrange
        var usage = new Contracts.UsageIndex
        {
            FileCount = 5,
            CoveredOperations =
            [
                new() { ClientType = "ChatClient", Operation = "GetCompletionAsync", File = "sample1.cs", Line = 10 },
                new() { ClientType = "ChatClient", Operation = "GetStreamingCompletionAsync", File = "sample2.cs", Line = 15 }
            ],
            UncoveredOperations =
            [
                new() { ClientType = "EmbeddingClient", Operation = "GetEmbeddingsAsync", Signature = "GetEmbeddingsAsync(...)" }
            ]
        };

        // Act
        var output = _analyzer.Format(usage);

        // Assert
        Assert.Contains("Analyzed 5 files", output);
        Assert.Contains("COVERED OPERATIONS", output);
        Assert.Contains("ChatClient.GetCompletionAsync", output);
        Assert.Contains("UNCOVERED OPERATIONS", output);
        Assert.Contains("EmbeddingClient.GetEmbeddingsAsync", output);
    }

    [Fact]
    public async Task AnalyzeAsync_NoApiClients_ReturnsEmptyIndex()
    {
        // Arrange
        var (tempDir, _) = await SetupTestFilesAsync(
            ("sample.cs", """
                Console.WriteLine("Hello World");
                """));

        try
        {
            // Empty API index with no clients
            var apiIndex = new ApiIndex { Package = "TestSdk" };

            // Act
            var result = await _analyzer.AnalyzeAsync(tempDir, apiIndex);

            // Assert
            Assert.Empty(result.CoveredOperations);
            Assert.Empty(result.UncoveredOperations);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    #region Test Helpers

    private static ApiIndex CreateTestApiIndex() => new()
    {
        Package = "TestSdk",
        Namespaces =
        [
            new NamespaceInfo
            {
                Name = "TestSdk",
                Types =
                [
                    new TypeInfo
                    {
                        Name = "ChatClient",
                        Kind = "class",
                        Members =
                        [
                            new MemberInfo { Name = "GetCompletionAsync", Kind = "method", Signature = "Task<string> GetCompletionAsync(string prompt)" },
                            new MemberInfo { Name = "GetStreamingCompletionAsync", Kind = "method", Signature = "IAsyncEnumerable<string> GetStreamingCompletionAsync(string prompt)" },
                            new MemberInfo { Name = "Widgets", Kind = "property", Signature = "WidgetClient Widgets { get; }" }
                        ]
                    },
                    new TypeInfo
                    {
                        Name = "EmptyClient",
                        Kind = "class",
                        Members =
                        [
                            new MemberInfo { Name = "Widgets", Kind = "property", Signature = "WidgetClient Widgets { get; }" }
                        ]
                    },
                    new TypeInfo
                    {
                        Name = "WidgetClient",
                        Kind = "class",
                        Members =
                        [
                            new MemberInfo { Name = "ListWidgetsAsync", Kind = "method", Signature = "Task<IReadOnlyList<string>> ListWidgetsAsync()" }
                        ]
                    },
                    new TypeInfo
                    {
                        Name = "EmbeddingClient",
                        Kind = "class",
                        Members =
                        [
                            new MemberInfo { Name = "GetEmbeddingsAsync", Kind = "method", Signature = "Task<float[][]> GetEmbeddingsAsync(string[] inputs)" }
                        ]
                    }
                ]
            }
        ]
    };

    private static async Task<(string TempDir, string[] Files)> SetupTestFilesAsync(params (string Name, string Content)[] files)
    {
        var tempDir = Path.Combine(Path.GetTempPath(), $"usage_test_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);

        var paths = new List<string>();
        foreach (var (name, content) in files)
        {
            var path = Path.Combine(tempDir, name);
            await File.WriteAllTextAsync(path, content);
            paths.Add(path);
        }

        return (tempDir, paths.ToArray());
    }

    #endregion

    #region Regression: Shared UsageFormatter

    [Fact]
    public void UsageFormatter_MatchesAnalyzerFormat()
    {
        // The shared UsageFormatter.Format must produce identical output
        // to what the per-analyzer Format used to produce.
        var usage = new Contracts.UsageIndex
        {
            FileCount = 3,
            CoveredOperations =
            [
                new() { ClientType = "ChatClient", Operation = "SendAsync", File = "s1.cs", Line = 5 }
            ],
            UncoveredOperations =
            [
                new() { ClientType = "ChatClient", Operation = "ListAsync", Signature = "() -> Task" }
            ]
        };

        var fromAnalyzer = _analyzer.Format(usage);
        var fromShared = UsageFormatter.Format(usage);

        Assert.Equal(fromShared, fromAnalyzer);
    }

    [Fact]
    public void UsageFormatter_EmptyIndex_ProducesMinimalOutput()
    {
        var usage = new Contracts.UsageIndex
        {
            FileCount = 0,
            CoveredOperations = [],
            UncoveredOperations = []
        };

        var result = UsageFormatter.Format(usage);

        Assert.Contains("Analyzed 0 files", result);
        Assert.DoesNotContain("COVERED OPERATIONS", result);
        Assert.DoesNotContain("UNCOVERED OPERATIONS", result);
    }

    [Fact]
    public void UsageFormatter_SortsOperationsCorrectly()
    {
        var usage = new Contracts.UsageIndex
        {
            FileCount = 2,
            CoveredOperations =
            [
                new() { ClientType = "Zebra", Operation = "B", File = "f.cs", Line = 1 },
                new() { ClientType = "Alpha", Operation = "Z", File = "f.cs", Line = 2 },
                new() { ClientType = "Alpha", Operation = "A", File = "f.cs", Line = 3 }
            ],
            UncoveredOperations = []
        };

        var result = UsageFormatter.Format(usage);

        // Alpha.A should come before Alpha.Z, and both before Zebra.B
        var alphaA = result.IndexOf("Alpha.A", StringComparison.Ordinal);
        var alphaZ = result.IndexOf("Alpha.Z", StringComparison.Ordinal);
        var zebraB = result.IndexOf("Zebra.B", StringComparison.Ordinal);

        Assert.True(alphaA < alphaZ, "Alpha.A should appear before Alpha.Z");
        Assert.True(alphaZ < zebraB, "Alpha.Z should appear before Zebra.B");
    }

    #endregion

    #region Regression: Case-Insensitive Client Type Resolution (Fix #2)

    [Fact]
    public async Task CSharpUsageAnalyzer_CaseInsensitiveClientTypeResolution()
    {
        // This tests that stylistic casing differences in code don't affect detection
        var (tempDir, _) = await SetupTestFilesAsync(
            ("sample.cs", """
                using TestSdk;
                var chatClient = new ChatClient();
                chatClient.GetCompletionAsync("hello");
                """));

        try
        {
            var apiIndex = new ApiIndex
            {
                Package = "TestSdk",
                Namespaces =
                [
                    new NamespaceInfo
                    {
                        Name = "TestSdk",
                        Types =
                        [
                            new TypeInfo
                            {
                                Name = "ChatClient",
                                Kind = "class",
                                Members =
                                [
                                    new MemberInfo { Name = "GetCompletionAsync", Kind = "method", Signature = "Task<string> GetCompletionAsync(string prompt)" }
                                ]
                            }
                        ]
                    }
                ]
            };

            var result = await _analyzer.AnalyzeAsync(tempDir, apiIndex);

            // Should detect the method call regardless of variable casing
            Assert.NotEmpty(result.CoveredOperations);
            // The ClientType should be the canonical name from API index
            Assert.Equal("ChatClient", result.CoveredOperations[0].ClientType);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    #endregion

    #region Regression: Uncovered Operations Use Real Signatures

    [Fact]
    public async Task AnalyzeAsync_UncoveredOperations_UseRealSignaturesFromApiIndex()
    {
        // Arrange: API index with a method signature, but no sample code covers it
        var tempDir = Path.Combine(Path.GetTempPath(), $"usage_sig_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);

        try
        {
            // Write an empty sample file — no calls to GetResourceAsync
            await File.WriteAllTextAsync(Path.Combine(tempDir, "sample.cs"),
                """
                using System;
                class Sample { void Main() { } }
                """);

            var apiIndex = new ApiIndex
            {
                Package = "TestPackage",
                Namespaces =
                [
                    new NamespaceInfo
                    {
                        Name = "TestPackage",
                        Types =
                        [
                            new TypeInfo
                            {
                                Name = "SampleClient",
                                Kind = "class",
                                EntryPoint = true,
                                Members =
                                [
                                    new MemberInfo { Name = "GetResourceAsync", Kind = "method", Signature = "Task<Resource> GetResourceAsync(string id, CancellationToken ct)" }
                                ]
                            }
                        ]
                    }
                ]
            };

            var result = await _analyzer.AnalyzeAsync(tempDir, apiIndex);

            // The uncovered operation should use the real signature from API index
            var uncovered = result.UncoveredOperations.FirstOrDefault(u => u.Operation == "GetResourceAsync");
            Assert.NotNull(uncovered);
            Assert.Contains("GetResourceAsync", uncovered.Signature);
            Assert.DoesNotContain("(...)", uncovered.Signature);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    #endregion

    #region C# Case-Sensitive Variable Names

    [Fact]
    public async Task CSharp_CaseSensitiveVarNames_DistinguishVariables()
    {
        var (tempDir, _) = await SetupTestFilesAsync(
            ("sample.cs", """
                using Test;
                using System;
                var Client = new ChatClient();
                Client.GetCompletionAsync("test");
                """));

        try
        {
            var apiIndex = new ApiIndex
            {
                Package = "Test",
                Namespaces =
                [
                    new NamespaceInfo
                    {
                        Name = "Test",
                        Types =
                        [
                            new TypeInfo
                            {
                                Name = "ChatClient",
                                Kind = "class",
                                Members =
                                [
                                    new MemberInfo { Name = "GetCompletionAsync", Kind = "method", Signature = "Task<string> GetCompletionAsync(string prompt)" }
                                ]
                            }
                        ]
                    }
                ]
            };

            var result = await _analyzer.AnalyzeAsync(tempDir, apiIndex);
            Assert.NotEmpty(result.CoveredOperations);
            Assert.Equal("ChatClient", result.CoveredOperations[0].ClientType);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    #endregion

    #region C# Nullable Type Resolution

    [Fact]
    public async Task CSharp_NullableType_InVariableDeclaration_Resolves()
    {
        var tempDir = Path.Combine(Path.GetTempPath(), $"nullable_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);

        try
        {
            await File.WriteAllTextAsync(Path.Combine(tempDir, "sample.cs"), """
                using Test;
                ChatClient? client = new ChatClient();
                client.GetCompletionAsync("test");
                """);

            var apiIndex = new ApiIndex
            {
                Package = "Test",
                Namespaces =
                [
                    new NamespaceInfo
                    {
                        Name = "Test",
                        Types =
                        [
                            new TypeInfo
                            {
                                Name = "ChatClient",
                                Kind = "class",
                                Members =
                                [
                                    new MemberInfo { Name = "GetCompletionAsync", Kind = "method", Signature = "Task<string> GetCompletionAsync(string prompt)" }
                                ]
                            }
                        ]
                    }
                ]
            };

            var result = await _analyzer.AnalyzeAsync(tempDir, apiIndex);
            Assert.NotEmpty(result.CoveredOperations);
            Assert.Equal("ChatClient", result.CoveredOperations[0].ClientType);
            Assert.Equal("GetCompletionAsync", result.CoveredOperations[0].Operation);
        }
        finally
        {
            Directory.Delete(tempDir, true);
        }
    }

    #endregion

    #region Reachability with Explicit Entry Points

    [Fact]
    public void ReachabilityAnalyzer_WithExplicitEntryPoint_FindsReachableTypes()
    {
        var typeNodes = new List<ReachabilityAnalyzer.TypeNode>
        {
            new()
            {
                Name = "ServiceClient",
                HasOperations = true,
                IsExplicitEntryPoint = true,
                IsRootCandidate = true,
                ReferencedTypes = new HashSet<string> { "Options", "Response" }
            },
            new()
            {
                Name = "Options",
                HasOperations = false,
                IsRootCandidate = true,
                ReferencedTypes = new HashSet<string>()
            },
            new()
            {
                Name = "Response",
                HasOperations = false,
                IsRootCandidate = true,
                ReferencedTypes = new HashSet<string>()
            },
            new()
            {
                Name = "InternalHelper",
                HasOperations = true,
                IsRootCandidate = true,
                ReferencedTypes = new HashSet<string>()
            }
        };

        var reachable = ReachabilityAnalyzer.FindReachable(
            typeNodes,
            new Dictionary<string, List<string>>(),
            StringComparer.Ordinal);

        Assert.Contains("ServiceClient", reachable);
        Assert.Contains("Options", reachable);
        Assert.Contains("Response", reachable);
    }

    #endregion

    #region Fix #16: BuildSignatureLookup tests

    [Fact]
    public void TypeScript_BuildSignatureLookup_ProducesCorrectSignatures()
    {
        // Arrange: TS API index with classes and interfaces in modules
        var apiIndex = new TsModels.ApiIndex
        {
            Package = "test-pkg",
            Modules =
            [
                new TsModels.ModuleInfo
                {
                    Name = "main",
                    Classes =
                    [
                        new TsModels.ClassInfo
                        {
                            Name = "BlobClient",
                            Methods =
                            [
                                new TsModels.MethodInfo { Name = "download", Sig = "(offset?: number, count?: number)" },
                                new TsModels.MethodInfo { Name = "upload", Sig = "(data: Buffer)" }
                            ]
                        }
                    ],
                    Interfaces =
                    [
                        new TsModels.InterfaceInfo
                        {
                            Name = "BlobOptions",
                            Methods =
                            [
                                new TsModels.MethodInfo { Name = "validate", Sig = "(strict: boolean)" }
                            ]
                        }
                    ]
                }
            ]
        };

        // Act
        var lookup = TsModels.TypeScriptUsageAnalyzer.BuildSignatureLookup(apiIndex);

        // Assert: key = "TypeName.MethodName", value = "MethodName(Sig)"
        Assert.Equal("download(offset?: number, count?: number)", lookup["BlobClient.download"]);
        Assert.Equal("upload(data: Buffer)", lookup["BlobClient.upload"]);
        Assert.Equal("validate(strict: boolean)", lookup["BlobOptions.validate"]);
    }

    [Fact]
    public void TypeScript_BuildSignatureLookup_CaseSensitive()
    {
        var apiIndex = new TsModels.ApiIndex
        {
            Package = "test",
            Modules =
            [
                new TsModels.ModuleInfo
                {
                    Name = "m",
                    Classes = [new TsModels.ClassInfo { Name = "Client", Methods = [new TsModels.MethodInfo { Name = "Get", Sig = "()" }] }]
                }
            ]
        };

        var lookup = TsModels.TypeScriptUsageAnalyzer.BuildSignatureLookup(apiIndex);

        // TypeScript is case-sensitive: exact case required
        Assert.True(lookup.ContainsKey("Client.Get"));
        Assert.False(lookup.ContainsKey("client.get"));
        Assert.False(lookup.ContainsKey("CLIENT.GET"));
    }

    [Fact]
    public void Python_BuildSignatureLookup_ProducesCorrectSignatures()
    {
        var apiIndex = new PyModels.ApiIndex(
            "example-storage-blob",
            [
                new PyModels.ModuleInfo("main",
                    Classes:
                    [
                        new PyModels.ClassInfo
                        {
                            Name = "BlobClient",
                            Methods =
                            [
                                new PyModels.MethodInfo("download_blob", "self, offset=None, length=None", null, null, null, null),
                                new PyModels.MethodInfo("upload_blob", "self, data, **kwargs", null, null, null, null)
                            ]
                        }
                    ],
                    Functions: null)
            ]);

        var lookup = PyModels.PythonUsageAnalyzer.BuildSignatureLookup(apiIndex);

        Assert.Equal("download_blob(self, offset=None, length=None)", lookup["BlobClient.download_blob"]);
        Assert.Equal("upload_blob(self, data, **kwargs)", lookup["BlobClient.upload_blob"]);
    }

    [Fact]
    public void Python_BuildSignatureLookup_CaseSensitive()
    {
        var apiIndex = new PyModels.ApiIndex(
            "test",
            [new PyModels.ModuleInfo("m",
                Classes: [new PyModels.ClassInfo { Name = "Client", Methods = [new PyModels.MethodInfo("get_item", "self", null, null, null, null)] }],
                Functions: null)]);

        var lookup = PyModels.PythonUsageAnalyzer.BuildSignatureLookup(apiIndex);

        Assert.True(lookup.ContainsKey("Client.get_item"));
        // Python uses Ordinal (case-sensitive)
        Assert.False(lookup.ContainsKey("client.get_item"));
    }

    [Fact]
    public void Go_BuildSignatureLookup_ProducesCorrectSignatures()
    {
        var apiIndex = new GoModels.ApiIndex
        {
            Package = "azblob",
            Packages =
            [
                new GoModels.PackageApi
                {
                    Name = "azblob",
                    Structs =
                    [
                        new GoModels.StructApi
                        {
                            Name = "Client",
                            Methods =
                            [
                                new GoModels.FuncApi { Name = "Download", Sig = "ctx context.Context, name string", Ret = "*DownloadResponse, error" },
                                new GoModels.FuncApi { Name = "Delete", Sig = "ctx context.Context", Ret = "" }
                            ]
                        }
                    ],
                    Interfaces =
                    [
                        new GoModels.IfaceApi
                        {
                            Name = "Sizer",
                            Methods = [new GoModels.FuncApi { Name = "Size", Sig = "", Ret = "int64" }]
                        }
                    ]
                }
            ]
        };

        var lookup = GoModels.GoUsageAnalyzer.BuildSignatureLookup(apiIndex);

        // value = "MethodName(Sig) Ret" (with leading space before Ret)
        Assert.Equal("Download(ctx context.Context, name string) *DownloadResponse, error", lookup["Client.Download"]);
        // Empty Ret → no trailing space
        Assert.Equal("Delete(ctx context.Context)", lookup["Client.Delete"]);
        Assert.Equal("Size() int64", lookup["Sizer.Size"]);
    }

    [Fact]
    public void Go_BuildSignatureLookup_CaseSensitive()
    {
        var apiIndex = new GoModels.ApiIndex
        {
            Package = "test",
            Packages = [new GoModels.PackageApi
            {
                Name = "test",
                Structs = [new GoModels.StructApi { Name = "Client", Methods = [new GoModels.FuncApi { Name = "Get", Sig = "" }] }]
            }]
        };

        var lookup = GoModels.GoUsageAnalyzer.BuildSignatureLookup(apiIndex);

        Assert.True(lookup.ContainsKey("Client.Get"));
        // Go uses Ordinal (case-sensitive)
        Assert.False(lookup.ContainsKey("client.get"));
    }

    [Fact]
    public void Java_BuildSignatureLookup_ProducesCorrectSignatures()
    {
        var apiIndex = new JavaModels.ApiIndex
        {
            Package = "com.example.storage.blob",
            Packages =
            [
                new JavaModels.PackageInfo
                {
                    Name = "com.example.storage.blob",
                    Classes =
                    [
                        new JavaModels.ClassInfo
                        {
                            Name = "BlobClient",
                            Methods =
                            [
                                new JavaModels.MethodInfo { Name = "download", Sig = "(OutputStream stream)", Ret = "void" },
                                new JavaModels.MethodInfo { Name = "exists", Sig = "()", Ret = "boolean" }
                            ]
                        }
                    ],
                    Interfaces =
                    [
                        new JavaModels.ClassInfo
                        {
                            Name = "BlobTier",
                            Methods =
                            [
                                new JavaModels.MethodInfo { Name = "getValue", Sig = "()", Ret = "String" }
                            ]
                        }
                    ]
                }
            ]
        };

        var lookup = JavaModels.JavaUsageAnalyzer.BuildSignatureLookup(apiIndex);

        // value = "Ret MethodName(Sig)" with Ret prefix
        Assert.Equal("void download(OutputStream stream)", lookup["BlobClient.download"]);
        Assert.Equal("boolean exists()", lookup["BlobClient.exists"]);
        Assert.Equal("String getValue()", lookup["BlobTier.getValue"]);
    }

    [Fact]
    public void Java_BuildSignatureLookup_CaseSensitive()
    {
        var apiIndex = new JavaModels.ApiIndex
        {
            Package = "test",
            Packages = [new JavaModels.PackageInfo
            {
                Name = "test",
                Classes = [new JavaModels.ClassInfo { Name = "Client", Methods = [new JavaModels.MethodInfo { Name = "get", Sig = "()" }] }]
            }]
        };

        var lookup = JavaModels.JavaUsageAnalyzer.BuildSignatureLookup(apiIndex);

        // Java is case-sensitive: exact case required
        Assert.True(lookup.ContainsKey("Client.get"));
        Assert.False(lookup.ContainsKey("CLIENT.GET"));
    }

    [Fact]
    public void BuildSignatureLookup_EmptyApiIndex_ReturnsEmptyDictionary()
    {
        // All languages handle empty indexes gracefully
        var tsLookup = TsModels.TypeScriptUsageAnalyzer.BuildSignatureLookup(
            new TsModels.ApiIndex { Package = "", Modules = [] });
        var pyLookup = PyModels.PythonUsageAnalyzer.BuildSignatureLookup(
            new PyModels.ApiIndex("", []));
        var goLookup = GoModels.GoUsageAnalyzer.BuildSignatureLookup(
            new GoModels.ApiIndex { Package = "", Packages = [] });
        var javaLookup = JavaModels.JavaUsageAnalyzer.BuildSignatureLookup(
            new JavaModels.ApiIndex { Package = "", Packages = [] });

        Assert.Empty(tsLookup);
        Assert.Empty(pyLookup);
        Assert.Empty(goLookup);
        Assert.Empty(javaLookup);
    }

    #endregion

    #region Availability

    [Fact]
    public void CSharpUsageAnalyzer_IsAvailable_ReturnsTrue()
    {
        var analyzer = new CSharpUsageAnalyzer();
        Assert.True(analyzer.IsAvailable());
    }

    [Fact]
    public void AllUsageAnalyzers_HaveLanguageProperty()
    {
        Assert.Equal("csharp", new CSharpUsageAnalyzer().Language);
        Assert.Equal("go", new GoModels.GoUsageAnalyzer().Language);
        Assert.Equal("java", new JavaModels.JavaUsageAnalyzer().Language);
        Assert.Equal("python", new PyModels.PythonUsageAnalyzer().Language);
        Assert.Equal("typescript", new TsModels.TypeScriptUsageAnalyzer().Language);
    }

    #endregion

    #region Telemetry

    [Fact]
    public void StartUsageAnalysis_ReturnsActivity()
    {
        // Activity may be null if no listener is configured, but the method should not throw.
        var activity = EngineTelemetry.StartUsageAnalysis("csharp", "/some/path");
        activity?.Dispose();
    }

    #endregion
}

/// <summary>
/// Tests for <see cref="ScriptUsageAnalyzerHelper"/> shared helper records.
/// </summary>
public class ScriptUsageAnalyzerHelperTests
{
    [Fact]
    public void AnalysisResult_DefaultErrors_IsEmpty()
    {
        var result = new ScriptUsageAnalyzerHelper.AnalysisResult();
        Assert.Empty(result.Errors);
        Assert.Null(result.Index);
    }

    [Fact]
    public void AnalysisResult_WithErrors_ReturnsErrors()
    {
        var result = new ScriptUsageAnalyzerHelper.AnalysisResult
        {
            Errors = ["Error 1", "Error 2"]
        };
        Assert.Equal(2, result.Errors.Count);
    }

    [Fact]
    public void ScriptArgs_DefaultWorkingDirectory_IsNull()
    {
        var args = new ScriptUsageAnalyzerHelper.ScriptArgs(["--api", "/tmp/api.json"]);
        Assert.Null(args.WorkingDirectory);
        Assert.Equal(2, args.Arguments.Count());
    }

    [Fact]
    public void ScriptArgs_WithWorkingDirectory_SetsIt()
    {
        var args = new ScriptUsageAnalyzerHelper.ScriptArgs(
            ["--api", "/tmp/api.json"],
            "/some/dir"
        );
        Assert.Equal("/some/dir", args.WorkingDirectory);
    }

    [Fact]
    public void ScriptInvocationConfig_RequiredProperties_AreSet()
    {
        var config = new ScriptUsageAnalyzerHelper.ScriptInvocationConfig
        {
            Language = "python",
            Availability = EngineAvailabilityResult.NativeBinary("/usr/bin/python3"),
            ApiJson = "{}",
            SamplesPath = "/samples",
            BuildArgs = (avail, samplesPath) =>
                new ScriptUsageAnalyzerHelper.ScriptArgs(["-", samplesPath])
        };

        Assert.Equal("python", config.Language);
        Assert.Null(config.SignatureLookup);
    }
}
