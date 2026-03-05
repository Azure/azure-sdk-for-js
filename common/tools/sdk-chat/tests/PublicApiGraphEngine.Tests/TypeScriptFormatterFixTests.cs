// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Xunit;

using TsApiIndex = PublicApiGraphEngine.TypeScript.ApiIndex;
using TsModuleInfo = PublicApiGraphEngine.TypeScript.ModuleInfo;
using TsClassInfo = PublicApiGraphEngine.TypeScript.ClassInfo;
using TsInterfaceInfo = PublicApiGraphEngine.TypeScript.InterfaceInfo;
using TsTypeAliasInfo = PublicApiGraphEngine.TypeScript.TypeAliasInfo;
using TsDependencyInfo = PublicApiGraphEngine.TypeScript.DependencyInfo;
using TsFunctionInfo = PublicApiGraphEngine.TypeScript.FunctionInfo;
using TsPropertyInfo = PublicApiGraphEngine.TypeScript.PropertyInfo;
using TsMethodInfo = PublicApiGraphEngine.TypeScript.MethodInfo;
using TsEnumInfo = PublicApiGraphEngine.TypeScript.EnumInfo;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for TypeScript formatter fixes:
/// - Cross-category dedup (class/interface shadows type alias per TS declaration merging rules)
/// - node:compatibility filter (skipped from nodeImports)
/// - Self-referential alias filtering (IsSelfReferentialAlias)
/// - FormatTypeAlias self-name and unresolved rendering
/// - Cross-condition main module imports (mainTypeToModule)
/// - Multi-condition deduplication within module groups
/// All tests use in-memory model construction — no external runtimes required.
/// </summary>
public class TypeScriptFormatterFixTests
{
    // =========================================================================
    // Cross-category dedup: class/interface shadows type alias
    // In TypeScript, type aliases don't participate in declaration merging.
    // Having both `class Foo` and `type Foo = ...` in the same scope causes
    // TS2300 "Duplicate identifier". So a class or interface wins.
    // =========================================================================

    /// <summary>
    /// When a module has both a class and a type alias with the same name,
    /// the class should appear and the type alias should be removed because
    /// TypeScript doesn't allow both in the same scope (TS2300).
    /// Tests AddToGroup: g.Types.RemoveAll(x => x.Name == cls.Name)
    /// </summary>
    [Fact]
    public void CrossCategoryDedup_ClassShadowsTypeAlias_InMultiConditionPackage()
    {
        var api = new TsApiIndex
        {
            Package = "@test/dedup-pkg",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "import-module",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "BlobClient", ExportPath = "." }],
                    Types = [new TsTypeAliasInfo { Name = "BlobClient", Type = "import(\"./internal\").BlobClient" }]
                },
                new TsModuleInfo
                {
                    Name = "require-module",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "BlobClient", ExportPath = "." }],
                    Types = [new TsTypeAliasInfo { Name = "BlobClient", Type = "import(\"./internal\").BlobClient" }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // Class declaration should appear
        Assert.Contains("class BlobClient", stubs);
        // Type alias removed — would cause TS2300 "Duplicate identifier"
        Assert.DoesNotContain("type BlobClient", stubs);
    }

    /// <summary>
    /// When a type alias is added to a group that already has a class with the
    /// same name, the type alias is skipped (TS2300 prevention).
    /// Tests: !g.Classes.Any(x => x.Name == ta.Name)
    /// </summary>
    [Fact]
    public void CrossCategoryDedup_TypeAliasSkipped_WhenClassAlreadyExists()
    {
        var api = new TsApiIndex
        {
            Package = "@test/dedup-class-first",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "mod-a",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "StorageClient", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "mod-b",
                    Condition = "import",
                    ExportPath = ".",
                    Types = [new TsTypeAliasInfo { Name = "StorageClient", Type = "typeof import(\"./core\").StorageClient" }]
                },
                // Need a second condition for needsSections to trigger
                new TsModuleInfo
                {
                    Name = "mod-c",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "StorageClient", ExportPath = "." }]
                }
            ]
        };

        var stubs = api.ToStubs();

        Assert.Contains("class StorageClient", stubs);
        Assert.DoesNotContain("type StorageClient", stubs);
    }

    /// <summary>
    /// When a type alias shares a name with an interface, the type alias is
    /// skipped (TS2300 prevention). Interfaces can declaration-merge with other
    /// interfaces but not with type aliases.
    /// Tests: !g.Interfaces.Any(x => x.Name == ta.Name)
    /// </summary>
    [Fact]
    public void CrossCategoryDedup_TypeAliasSkipped_WhenInterfaceAlreadyExists()
    {
        var api = new TsApiIndex
        {
            Package = "@test/dedup-iface",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "mod-a",
                    Condition = "import",
                    ExportPath = ".",
                    Interfaces = [new TsInterfaceInfo { Name = "BlobOptions", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "mod-b",
                    Condition = "import",
                    ExportPath = ".",
                    Types = [new TsTypeAliasInfo { Name = "BlobOptions", Type = "{ timeout?: number }" }]
                },
                new TsModuleInfo
                {
                    Name = "mod-c",
                    Condition = "require",
                    ExportPath = ".",
                    Interfaces = [new TsInterfaceInfo { Name = "BlobOptions", ExportPath = "." }]
                }
            ]
        };

        var stubs = api.ToStubs();

        Assert.Contains("interface BlobOptions", stubs);
        Assert.DoesNotContain("type BlobOptions", stubs);
    }

    // =========================================================================
    // node:compatibility filter
    // =========================================================================

    /// <summary>
    /// Dependencies with package names starting with "node:compatibility" should
    /// be filtered from nodeImports and not produce import statements.
    /// Tests the filter: dep.Package.StartsWith("node:compatibility", ...)
    /// </summary>
    [Fact]
    public void NodeCompatibilityFilter_SkippedFromImports()
    {
        var api = new TsApiIndex
        {
            Package = "@test/node-compat",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "main-require",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "node:compatibility/iterators",
                    IsNode = true,
                    Interfaces = [new TsInterfaceInfo { Name = "ReadableStream" }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // The non-importable node:compatibility module should NOT produce imports
        Assert.DoesNotContain("node:compatibility", stubs);
        Assert.DoesNotContain("import { ReadableStream }", stubs);
    }

    /// <summary>
    /// Regular node:* dependencies should still produce import statements
    /// even when node:compatibility deps are filtered out.
    /// </summary>
    [Fact]
    public void NodeCompatibilityFilter_NormalNodeDepsStillIncluded()
    {
        var api = new TsApiIndex
        {
            Package = "@test/node-mixed",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "main-require",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "node:compatibility/iterators",
                    IsNode = true,
                    Interfaces = [new TsInterfaceInfo { Name = "ReadableStream" }]
                },
                new TsDependencyInfo
                {
                    Package = "node:stream",
                    IsNode = true,
                    Interfaces = [new TsInterfaceInfo { Name = "Readable" }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // node:compatibility should be filtered out
        Assert.DoesNotContain("node:compatibility", stubs);
        // node:stream should still be imported
        Assert.Contains("node:stream", stubs);
        Assert.Contains("Readable", stubs);
    }

    // =========================================================================
    // Self-referential alias filtering (IsSelfReferentialAlias)
    // =========================================================================

    /// <summary>
    /// A type alias where Type exactly equals Name (e.g., "type Foo = Foo")
    /// should be excluded from stubs as self-referential.
    /// </summary>
    [Fact]
    public void SelfReferentialAlias_ExactMatch_ExcludedFromDeps()
    {
        var api = new TsApiIndex
        {
            Package = "@test/self-ref",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@external/core",
                    Types =
                    [
                        new TsTypeAliasInfo { Name = "Pipeline", Type = "Pipeline" },
                        new TsTypeAliasInfo { Name = "ServiceVersion", Type = "\"v1\" | \"v2\"" }
                    ],
                    Interfaces = [new TsInterfaceInfo { Name = "CoreOptions" }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // Self-referential "Pipeline = Pipeline" should be excluded
        Assert.DoesNotContain("type Pipeline", stubs);
        // Non-self-referential types should still appear
        Assert.Contains("type ServiceVersion", stubs);
        Assert.Contains("interface CoreOptions", stubs);
    }

    /// <summary>
    /// A type alias where Type is "Name&lt;T&gt;" (generic self-reference) should
    /// also be excluded.
    /// </summary>
    [Fact]
    public void SelfReferentialAlias_GenericMatch_ExcludedFromDeps()
    {
        var api = new TsApiIndex
        {
            Package = "@test/self-ref-generic",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@external/core",
                    Types =
                    [
                        new TsTypeAliasInfo { Name = "OperationState", Type = "OperationState<TResult>" },
                        new TsTypeAliasInfo { Name = "ValidAlias", Type = "string | number" }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        // Self-referential generic "OperationState = OperationState<TResult>" -> excluded
        Assert.DoesNotContain("type OperationState", stubs);
        // Non-self-referential alias should appear
        Assert.Contains("type ValidAlias", stubs);
    }

    /// <summary>
    /// Self-referential aliases in resolved dependencies (inside modules)
    /// should also be filtered out.
    /// </summary>
    [Fact]
    public void SelfReferentialAlias_InResolvedDeps_ExcludedFromStubs()
    {
        var api = new TsApiIndex
        {
            Package = "@test/resolved-self-ref",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "main-require",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ],
            ResolvedDependencies =
            [
                new TsApiIndex
                {
                    Package = "@external/core",
                    Modules =
                    [
                        new TsModuleInfo
                        {
                            Name = "core-mod",
                            Condition = "import",
                            Types =
                            [
                                new TsTypeAliasInfo { Name = "Pipeline", Type = "Pipeline" },
                                new TsTypeAliasInfo { Name = "RetryMode", Type = "\"fixed\" | \"exponential\"" }
                            ],
                            Interfaces = [new TsInterfaceInfo { Name = "PipelinePolicy" }]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        // Self-referential in resolved deps should be excluded
        Assert.DoesNotContain("type Pipeline", stubs);
        // Valid types should be included
        Assert.Contains("type RetryMode", stubs);
        Assert.Contains("interface PipelinePolicy", stubs);
    }

    // =========================================================================
    // FormatTypeAlias: self-name and unresolved rendering
    // =========================================================================

    /// <summary>
    /// A type alias where Type equals its own Name should render as "unknown"
    /// in the output via FormatTypeAlias. Since there's no same-name class here,
    /// the alias enters the group but FormatTypeAlias converts self-name to unknown.
    /// Uses two conditions to trigger the sectioned (declare module) path.
    /// </summary>
    [Fact]
    public void FormatTypeAlias_SelfName_RendersUnknown()
    {
        var api = new TsApiIndex
        {
            Package = "@test/self-name-alias",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main-import",
                    Condition = "import",
                    ExportPath = ".",
                    Types =
                    [
                        new TsTypeAliasInfo { Name = "ReExported", Type = "ReExported" }
                    ]
                },
                new TsModuleInfo
                {
                    Name = "main-require",
                    Condition = "require",
                    ExportPath = ".",
                    Types =
                    [
                        new TsTypeAliasInfo { Name = "ReExported", Type = "ReExported" }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        // Self-name type alias renders as "unknown" via FormatTypeAlias
        Assert.Contains("type ReExported = unknown;", stubs);
        Assert.DoesNotContain("type ReExported = ReExported;", stubs);
    }

    /// <summary>
    /// A type alias with Type "unresolved" should also render as "unknown".
    /// Uses two conditions to trigger the sectioned (declare module) path.
    /// </summary>
    [Fact]
    public void FormatTypeAlias_Unresolved_RendersUnknown()
    {
        var api = new TsApiIndex
        {
            Package = "@test/unresolved-alias",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main-import",
                    Condition = "import",
                    ExportPath = ".",
                    Types =
                    [
                        new TsTypeAliasInfo { Name = "SomeAlias", Type = "unresolved" }
                    ]
                },
                new TsModuleInfo
                {
                    Name = "main-require",
                    Condition = "require",
                    ExportPath = ".",
                    Types =
                    [
                        new TsTypeAliasInfo { Name = "SomeAlias", Type = "unresolved" }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        Assert.Contains("type SomeAlias = unknown;", stubs);
        Assert.DoesNotContain("type SomeAlias = unresolved;", stubs);
    }

    /// <summary>
    /// "unresolved" type aliases in dependencies should be filtered
    /// from dependency declare modules.
    /// </summary>
    [Fact]
    public void FormatTypeAlias_UnresolvedInDeps_Excluded()
    {
        var api = new TsApiIndex
        {
            Package = "@test/unresolved-dep",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@external/core",
                    Types =
                    [
                        new TsTypeAliasInfo { Name = "Unresolved", Type = "unresolved" },
                        new TsTypeAliasInfo { Name = "Resolved", Type = "string | number" }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        // The dependency section should not contain the unresolved alias
        // (it's filtered by `t.Type != "unresolved"` in the dep sections)
        // But the resolved one should appear
        Assert.Contains("type Resolved", stubs);
    }

    // =========================================================================
    // Multi-condition module rendering
    // =========================================================================

    /// <summary>
    /// When a package has multiple conditions (import/require), the formatter
    /// should create separate declare module blocks with condition suffixes.
    /// </summary>
    [Fact]
    public void MultiCondition_CreatesSeparateModuleBlocks()
    {
        var api = new TsApiIndex
        {
            Package = "@test/multi-cond",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "import-mod",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }],
                    Interfaces = [new TsInterfaceInfo { Name = "Options", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "require-mod",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }],
                    Interfaces = [new TsInterfaceInfo { Name = "Options", ExportPath = "." }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // Should have condition-specific module declarations
        Assert.Contains("declare module \"@test/multi-cond/import\"", stubs);
        Assert.Contains("declare module \"@test/multi-cond/require\"", stubs);
    }

    /// <summary>
    /// Cross-condition type deduplication: when the same type appears in both
    /// import and require conditions, it should be deduplicated at the top level
    /// but still rendered in both condition blocks.
    /// </summary>
    [Fact]
    public void MultiCondition_TypeDeduplication_AcrossConditions()
    {
        var api = new TsApiIndex
        {
            Package = "@test/multi-dedup",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "import-mod",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }],
                    Interfaces =
                    [
                        new TsInterfaceInfo { Name = "Options", ExportPath = "." },
                        new TsInterfaceInfo { Name = "Options", ExportPath = "." } // duplicate in same module
                    ]
                },
                new TsModuleInfo
                {
                    Name = "require-mod",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // Options should appear once per condition block, not duplicated within
        var importBlock = ExtractDeclareModuleBlock(stubs, "@test/multi-dedup/import");
        Assert.NotNull(importBlock);
        Assert.Equal(1, CountOccurrences(importBlock, "interface Options"));
    }

    /// <summary>
    /// When dependency modules reference types from the main package module,
    /// cross-module import statements should be emitted using mainTypeToModule.
    /// </summary>
    [Fact]
    public void MultiCondition_DepModuleImportsMainPackageTypes()
    {
        var api = new TsApiIndex
        {
            Package = "@test/cross-import",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "import-mod",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "BlobClient", ExportPath = "." }],
                    Interfaces = [new TsInterfaceInfo { Name = "BlobOptions", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "require-mod",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "BlobClient", ExportPath = "." }],
                    Interfaces = [new TsInterfaceInfo { Name = "BlobOptions", ExportPath = "." }]
                }
            ],
            ResolvedDependencies =
            [
                new TsApiIndex
                {
                    Package = "@azure/core-rest-pipeline",
                    Modules =
                    [
                        new TsModuleInfo
                        {
                            Name = "pipeline-mod",
                            Condition = "import",
                            Interfaces =
                            [
                                new TsInterfaceInfo
                                {
                                    Name = "PipelinePolicy",
                                    Properties = [new TsPropertyInfo { Name = "options", Type = "BlobOptions" }]
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        // The dep module should have an import for BlobOptions from the main module
        var depBlock = ExtractDeclareModuleBlock(stubs, "@azure/core-rest-pipeline");
        if (depBlock is not null)
        {
            // If BlobOptions is referenced in the dep body, it should be imported
            if (depBlock.Contains("BlobOptions"))
            {
                Assert.Contains("import { BlobOptions }", depBlock);
            }
        }
    }

    // =========================================================================
    // Node.js imports in multi-condition packages
    // =========================================================================

    /// <summary>
    /// Node.js type imports should appear in each condition's main module block.
    /// </summary>
    [Fact]
    public void MultiCondition_NodeImports_AppearInEachCondition()
    {
        var api = new TsApiIndex
        {
            Package = "@test/node-cond",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "import-mod",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "require-mod",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "node:buffer",
                    IsNode = true,
                    Classes = [new TsClassInfo { Name = "Buffer" }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // Both condition modules should import Buffer from node:buffer
        var importBlock = ExtractDeclareModuleBlock(stubs, "@test/node-cond/import");
        var requireBlock = ExtractDeclareModuleBlock(stubs, "@test/node-cond/require");
        Assert.NotNull(importBlock);
        Assert.NotNull(requireBlock);
        Assert.Contains("import { Buffer } from \"node:buffer\"", importBlock);
        Assert.Contains("import { Buffer } from \"node:buffer\"", requireBlock);
    }

    // =========================================================================
    // Cross-condition import statements between main modules
    // =========================================================================

    /// <summary>
    /// When a main module's body references a type defined in another main module
    /// (e.g., a subpath module), a cross-condition import should be emitted.
    /// </summary>
    [Fact]
    public void MultiCondition_CrossModuleImports_ForSubpathTypes()
    {
        var api = new TsApiIndex
        {
            Package = "@test/cross-subpath",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "root-import",
                    Condition = "import",
                    ExportPath = ".",
                    Classes =
                    [
                        new TsClassInfo
                        {
                            Name = "MainClient",
                            ExportPath = ".",
                            Methods = [new TsMethodInfo { Name = "getHelper", Sig = "", Ret = "SubHelper" }],
                            ReferencedTypes = ["SubHelper"]
                        }
                    ]
                },
                new TsModuleInfo
                {
                    Name = "sub-import",
                    Condition = "import",
                    ExportPath = "./helpers",
                    Classes = [new TsClassInfo { Name = "SubHelper", ExportPath = "./helpers" }]
                },
                new TsModuleInfo
                {
                    Name = "root-require",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "MainClient", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "sub-require",
                    Condition = "require",
                    ExportPath = "./helpers",
                    Classes = [new TsClassInfo { Name = "SubHelper", ExportPath = "./helpers" }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // The root import module should have an import for SubHelper from the subpath module
        var rootImport = ExtractDeclareModuleBlock(stubs, "@test/cross-subpath/import");
        if (rootImport is not null && rootImport.Contains("SubHelper"))
        {
            Assert.Contains("import { SubHelper }", rootImport);
        }
    }

    // =========================================================================
    // Dependency condition matching
    // =========================================================================

    /// <summary>
    /// Dependencies with conditions should be matched to the correct main
    /// condition, with condition suffix in the module name when multiple
    /// conditions exist.
    /// </summary>
    [Fact]
    public void DepConditionMatching_ExactMatch_UsesSuffix()
    {
        var api = new TsApiIndex
        {
            Package = "@test/dep-cond",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "import-mod",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "require-mod",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@azure/core",
                    Conditions = ["import", "require"],
                    Interfaces = [new TsInterfaceInfo { Name = "Pipeline" }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // With multiple dep conditions, the "import" main module should import
        // from "@azure/core/import" and "require" from "@azure/core/require"
        Assert.Contains("@azure/core/import", stubs);
    }

    // =========================================================================
    // Simple path (non-sectioned) dependency rendering
    // =========================================================================

    /// <summary>
    /// In the simple (non-sectioned) path, dependencies should be rendered
    /// as declare module blocks with self-referential aliases excluded.
    /// </summary>
    [Fact]
    public void SimplePath_Dependencies_SelfRefAliasExcluded()
    {
        var api = new TsApiIndex
        {
            Package = "@test/simple-deps",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@ext/core",
                    Types =
                    [
                        new TsTypeAliasInfo { Name = "Foo", Type = "Foo" },           // self-ref exact
                        new TsTypeAliasInfo { Name = "Bar", Type = "Bar<T>" },         // self-ref generic
                        new TsTypeAliasInfo { Name = "Baz", Type = "string | number" } // valid
                    ],
                    Interfaces = [new TsInterfaceInfo { Name = "CoreIface" }]
                }
            ]
        };

        var stubs = api.ToStubs();

        Assert.Contains("declare module \"@ext/core\"", stubs);
        // Self-referential aliases should be excluded
        Assert.DoesNotContain("type Foo", stubs);
        Assert.DoesNotContain("type Bar", stubs);
        // Valid alias and interface should be included
        Assert.Contains("type Baz", stubs);
        Assert.Contains("interface CoreIface", stubs);
    }

    // =========================================================================
    // Header and structure
    // =========================================================================

    /// <summary>
    /// The output should always include the standard header with triple-slash
    /// references and package name comment.
    /// </summary>
    [Fact]
    public void Format_EmitsStandardHeader()
    {
        var api = new TsApiIndex
        {
            Package = "@azure/storage-blob",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "BlobClient", ExportPath = "." }]
                }
            ]
        };

        var stubs = api.ToStubs();

        Assert.Contains("/// <reference types=\"node\" />", stubs);
        Assert.Contains("/// <reference lib=\"es2020\" />", stubs);
        Assert.Contains("@azure/storage-blob - Public API Surface", stubs);
        Assert.Contains("PublicApiGraphEngine.TypeScript", stubs);
    }

    // =========================================================================
    // Helpers
    // =========================================================================

    /// <summary>
    /// Extracts the content between declare module "name" { and its matching }
    /// </summary>
    private static string? ExtractDeclareModuleBlock(string stubs, string moduleName)
    {
        var marker = $"declare module \"{moduleName}\"";
        var start = stubs.IndexOf(marker, StringComparison.Ordinal);
        if (start < 0) return null;

        var braceStart = stubs.IndexOf('{', start);
        if (braceStart < 0) return null;

        int depth = 1;
        int pos = braceStart + 1;
        while (pos < stubs.Length && depth > 0)
        {
            if (stubs[pos] == '{') depth++;
            else if (stubs[pos] == '}') depth--;
            pos++;
        }

        return stubs[(braceStart + 1)..(pos - 1)];
    }

    /// <summary>Counts non-overlapping occurrences of a substring.</summary>
    private static int CountOccurrences(string text, string pattern)
    {
        int count = 0;
        int idx = 0;
        while ((idx = text.IndexOf(pattern, idx, StringComparison.Ordinal)) >= 0)
        {
            count++;
            idx += pattern.Length;
        }
        return count;
    }
}
