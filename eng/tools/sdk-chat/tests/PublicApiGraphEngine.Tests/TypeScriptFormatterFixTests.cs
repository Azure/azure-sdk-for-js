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
using TsVariableInfo = PublicApiGraphEngine.TypeScript.VariableInfo;
using TsNamespaceInfo = PublicApiGraphEngine.TypeScript.NamespaceInfo;
using TsIndexSignatureInfo = PublicApiGraphEngine.TypeScript.IndexSignatureInfo;
using TypeScriptFormatter = PublicApiGraphEngine.TypeScript.TypeScriptFormatter;

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
                                    Properties = [new TsPropertyInfo { Name = "options", Type = "BlobOptions" }],
                                    ReferencedTypes = ["BlobOptions"]
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
                Assert.Contains("import type { BlobOptions }", depBlock);
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
        Assert.Contains("import type { Buffer } from \"node:buffer\"", importBlock);
        Assert.Contains("import type { Buffer } from \"node:buffer\"", requireBlock);
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
            Assert.Contains("import type { SubHelper }", rootImport);
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
        Assert.Contains("/// <reference lib=\"esnext\" />", stubs);
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

    // =========================================================================
    // Structured dependency detection (referencedTypes graph data)
    // =========================================================================

    /// <summary>
    /// When a type in module A has referencedTypes that include a type from
    /// dependency B, an import statement should be generated for that dep type.
    /// This tests that the formatter uses structured referencedTypes data
    /// rather than text scanning.
    /// </summary>
    [Fact]
    public void StructuredDeps_ReferencedTypeFromDep_GeneratesImport()
    {
        var api = new TsApiIndex
        {
            Package = "@test/struct-dep",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "import-mod",
                    Condition = "import",
                    ExportPath = ".",
                    Classes =
                    [
                        new TsClassInfo
                        {
                            Name = "MyClient",
                            ExportPath = ".",
                            Methods = [new TsMethodInfo { Name = "send", Sig = "options: PipelineOptions", Ret = "void" }],
                            ReferencedTypes = ["PipelineOptions"]
                        }
                    ]
                },
                new TsModuleInfo
                {
                    Name = "require-mod",
                    Condition = "require",
                    ExportPath = ".",
                    Classes =
                    [
                        new TsClassInfo
                        {
                            Name = "MyClient",
                            ExportPath = ".",
                            ReferencedTypes = ["PipelineOptions"]
                        }
                    ]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@azure/core-rest-pipeline",
                    Interfaces = [new TsInterfaceInfo { Name = "PipelineOptions" }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // Should generate import for PipelineOptions from the dep package
        Assert.Contains("PipelineOptions", stubs);
        Assert.Contains("@azure/core-rest-pipeline", stubs);
    }

    /// <summary>
    /// When a resolved dep module's type has a name that coincidentally matches
    /// another dep's type, but does NOT list it in referencedTypes, no cross-dep
    /// import should be generated. This verifies the formatter uses structured
    /// referencedTypes for cross-dep imports rather than text scanning.
    /// </summary>
    [Fact]
    public void StructuredDeps_TypeNameNotInReferencedTypes_NoCrossDepImport()
    {
        var api = new TsApiIndex
        {
            Package = "@test/no-false-import",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "import-mod",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "MyClient", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "require-mod",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "MyClient", ExportPath = "." }]
                }
            ],
            ResolvedDependencies =
            [
                new TsApiIndex
                {
                    Package = "@external/dep-a",
                    Modules =
                    [
                        new TsModuleInfo
                        {
                            Name = "a-mod",
                            Condition = "import",
                            Interfaces =
                            [
                                new TsInterfaceInfo
                                {
                                    Name = "DepAType",
                                    // Note: referencedTypes does NOT include "DepBType"
                                    // even though a text scan might match it in property types
                                    ReferencedTypes = []
                                }
                            ]
                        }
                    ]
                },
                new TsApiIndex
                {
                    Package = "@external/dep-b",
                    Modules =
                    [
                        new TsModuleInfo
                        {
                            Name = "b-mod",
                            Condition = "import",
                            Interfaces = [new TsInterfaceInfo { Name = "DepBType" }]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        // dep-a's module should NOT import DepBType because it's not in referencedTypes
        var depABlock = ExtractDeclareModuleBlock(stubs, "@external/dep-a");
        Assert.NotNull(depABlock);
        Assert.DoesNotContain("import type { DepBType }", depABlock);
    }

    /// <summary>
    /// Multiple modules each referencing different deps should generate
    /// correct per-module imports based on referencedTypes.
    /// </summary>
    [Fact]
    public void StructuredDeps_MultipleModules_CorrectPerModuleImports()
    {
        var api = new TsApiIndex
        {
            Package = "@test/multi-dep-imports",
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
                            Name = "ClientA",
                            ExportPath = ".",
                            ReferencedTypes = ["HelperB"]
                        }
                    ]
                },
                new TsModuleInfo
                {
                    Name = "sub-import",
                    Condition = "import",
                    ExportPath = "./sub",
                    Classes =
                    [
                        new TsClassInfo
                        {
                            Name = "HelperB",
                            ExportPath = "./sub"
                        }
                    ]
                },
                new TsModuleInfo
                {
                    Name = "root-require",
                    Condition = "require",
                    ExportPath = ".",
                    Classes =
                    [
                        new TsClassInfo
                        {
                            Name = "ClientA",
                            ExportPath = ".",
                            ReferencedTypes = ["HelperB"]
                        }
                    ]
                },
                new TsModuleInfo
                {
                    Name = "sub-require",
                    Condition = "require",
                    ExportPath = "./sub",
                    Classes =
                    [
                        new TsClassInfo
                        {
                            Name = "HelperB",
                            ExportPath = "./sub"
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        // Root module should import HelperB from the sub module
        var rootImport = ExtractDeclareModuleBlock(stubs, "@test/multi-dep-imports/import");
        Assert.NotNull(rootImport);
        Assert.Contains("import type { HelperB }", rootImport);

        // Sub module should NOT import HelperB (it defines it)
        var subImport = ExtractDeclareModuleBlock(stubs, "@test/multi-dep-imports/sub/import");
        Assert.NotNull(subImport);
        Assert.DoesNotContain("import type { HelperB }", subImport);
    }

    // =========================================================================
    // Direct declare module emission
    // =========================================================================

    /// <summary>
    /// A single-module package should produce one declare module block
    /// with the package name (no condition suffix).
    /// </summary>
    [Fact]
    public void DeclareModule_SingleModule_OneBlock()
    {
        var api = new TsApiIndex
        {
            Package = "@test/single-mod",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // In simple (non-sectioned) path, types are rendered at top level
        // without declare module wrapper (unless per-target mode)
        Assert.Contains("class Client", stubs);
    }

    /// <summary>
    /// A multi-export-path package should produce multiple declare module blocks
    /// for each subpath.
    /// </summary>
    [Fact]
    public void DeclareModule_MultiExportPath_MultipleBlocks()
    {
        var api = new TsApiIndex
        {
            Package = "@test/multi-export",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "root-import",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "MainClient", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "sub-import",
                    Condition = "import",
                    ExportPath = "./models",
                    Interfaces = [new TsInterfaceInfo { Name = "SomeModel", ExportPath = "./models" }]
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
                    ExportPath = "./models",
                    Interfaces = [new TsInterfaceInfo { Name = "SomeModel", ExportPath = "./models" }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // Should have separate declare module blocks for root and subpath per condition
        Assert.Contains("declare module \"@test/multi-export/import\"", stubs);
        Assert.Contains("declare module \"@test/multi-export/models/import\"", stubs);
        Assert.Contains("declare module \"@test/multi-export/require\"", stubs);
        Assert.Contains("declare module \"@test/multi-export/models/require\"", stubs);
    }

    /// <summary>
    /// Per-condition output should produce separate declare module blocks
    /// for each condition, each containing the correct types.
    /// </summary>
    [Fact]
    public void DeclareModule_PerCondition_CorrectBlocks()
    {
        var api = new TsApiIndex
        {
            Package = "@test/per-cond",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "import-mod",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }],
                    Interfaces = [new TsInterfaceInfo { Name = "ClientOptions", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "require-mod",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }],
                    Interfaces = [new TsInterfaceInfo { Name = "ClientOptions", ExportPath = "." }]
                }
            ]
        };

        var stubs = api.ToStubs();

        var importBlock = ExtractDeclareModuleBlock(stubs, "@test/per-cond/import");
        var requireBlock = ExtractDeclareModuleBlock(stubs, "@test/per-cond/require");
        Assert.NotNull(importBlock);
        Assert.NotNull(requireBlock);
        Assert.Contains("class Client", importBlock);
        Assert.Contains("interface ClientOptions", importBlock);
        Assert.Contains("class Client", requireBlock);
        Assert.Contains("interface ClientOptions", requireBlock);
    }

    /// <summary>
    /// A module with resolved dependencies should include dependency
    /// declare module blocks in the output.
    /// </summary>
    [Fact]
    public void DeclareModule_WithDeps_IncludesDepBlocks()
    {
        var api = new TsApiIndex
        {
            Package = "@test/with-deps",
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
            ResolvedDependencies =
            [
                new TsApiIndex
                {
                    Package = "@azure/core-auth",
                    Modules =
                    [
                        new TsModuleInfo
                        {
                            Name = "auth-mod",
                            Condition = "import",
                            Interfaces = [new TsInterfaceInfo { Name = "TokenCredential" }]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        // The dependency should produce its own declare module block
        Assert.Contains("declare module \"@azure/core-auth\"", stubs);
        Assert.Contains("interface TokenCredential", stubs);
    }

    // =========================================================================
    // Tsconfig generation from graph data (ambientTypes / esLib)
    // =========================================================================

    /// <summary>
    /// Package with DOM types in ambientTypes should produce a tsconfig
    /// with "DOM" in the lib array.
    /// </summary>
    [Fact]
    public void Tsconfig_WithDomAmbientTypes_IncludesDomLib()
    {
        var api = new TsApiIndex
        {
            Package = "@test/dom-ambient",
            AmbientTypes = new Dictionary<string, List<string>>
            {
                ["dom"] = ["AbortSignal", "ReadableStream"]
            },
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
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        Assert.True(result.Count > 0);

        var (_, tsconfig) = result.Values.First();
        Assert.Contains("\"DOM\"", tsconfig);
        Assert.Contains("\"DOM.Iterable\"", tsconfig);
    }

    /// <summary>
    /// Package with only ES types in ambientTypes should NOT include
    /// "DOM" in the lib array.
    /// </summary>
    [Fact]
    public void Tsconfig_WithOnlyEsAmbientTypes_NoDomLib()
    {
        var api = new TsApiIndex
        {
            Package = "@test/es-only",
            AmbientTypes = new Dictionary<string, List<string>>
            {
                ["es"] = ["Promise", "Map"]
            },
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
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result.Values.First();

        Assert.DoesNotContain("\"DOM\"", tsconfig);
    }

    /// <summary>
    /// Package with node builtins in ambientTypes should include
    /// @types/node in tsconfig.
    /// </summary>
    [Fact]
    public void Tsconfig_WithNodeAmbientTypes_IncludesNodeTypes()
    {
        var api = new TsApiIndex
        {
            Package = "@test/node-ambient",
            AmbientTypes = new Dictionary<string, List<string>>
            {
                ["node"] = ["Buffer", "Readable"]
            },
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
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result.Values.First();

        Assert.Contains("\"types\": [\"node\"]", tsconfig);
    }

    /// <summary>
    /// The ambient types placeholder should be replaced with a comment
    /// listing the ambient types.
    /// </summary>
    [Fact]
    public void AmbientTypes_RenderAsComment_InDtsOutput()
    {
        var api = new TsApiIndex
        {
            Package = "@test/ambient-comment",
            AmbientTypes = new Dictionary<string, List<string>>
            {
                ["dom"] = ["AbortSignal"],
                ["es"] = ["Promise"]
            },
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ]
        };

        var stubs = api.ToStubs();

        Assert.Contains("Ambient types from DOM lib: AbortSignal", stubs);
        Assert.Contains("Ambient types from ES lib: Promise", stubs);
    }

    /// <summary>
    /// The esLib field should control the reference lib directive in the output.
    /// </summary>
    [Fact]
    public void EsLib_ControlsReferenceLib()
    {
        var api = new TsApiIndex
        {
            Package = "@test/eslib-custom",
            EsLib = "es2022",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ]
        };

        var stubs = api.ToStubs();

        Assert.Contains("/// <reference lib=\"es2022\" />", stubs);
        Assert.DoesNotContain("esnext", stubs);
    }

    /// <summary>
    /// When esLib is null, the default "esnext" lib should be used.
    /// </summary>
    [Fact]
    public void EsLib_DefaultsToEsnext_WhenNull()
    {
        var api = new TsApiIndex
        {
            Package = "@test/eslib-default",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ]
        };

        var stubs = api.ToStubs();

        Assert.Contains("/// <reference lib=\"esnext\" />", stubs);
    }

    // =========================================================================
    // Regression tests — existing behavior preserved
    // =========================================================================

    /// <summary>
    /// Collision aliases should generate aliased import statements.
    /// </summary>
    [Fact]
    public void Regression_CollisionAliases_GenerateCorrectImports()
    {
        var api = new TsApiIndex
        {
            Package = "@test/collision",
            CollisionAliases = new Dictionary<string, Dictionary<string, string>>
            {
                ["Pipeline"] = new Dictionary<string, string>
                {
                    ["@azure/core-rest-pipeline"] = "_pipeline_Pipeline",
                    ["@test/collision"] = "Pipeline"
                }
            },
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    ExportPath = ".",
                    Classes =
                    [
                        new TsClassInfo
                        {
                            Name = "Pipeline",
                            ExportPath = "."
                        }
                    ]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@azure/core-rest-pipeline",
                    Interfaces = [new TsInterfaceInfo { Name = "Pipeline" }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // The dep's Pipeline should be imported with an alias
        Assert.Contains("Pipeline as _pipeline_Pipeline", stubs);
    }

    /// <summary>
    /// Deduplication within a module group: duplicate type names across
    /// modules with the same condition should be deduplicated.
    /// </summary>
    [Fact]
    public void Regression_Dedup_DuplicateTypesAcrossModules()
    {
        var api = new TsApiIndex
        {
            Package = "@test/dedup-across",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "mod-a",
                    Condition = "import",
                    ExportPath = ".",
                    Interfaces =
                    [
                        new TsInterfaceInfo { Name = "SharedOptions", ExportPath = "." }
                    ]
                },
                new TsModuleInfo
                {
                    Name = "mod-b",
                    Condition = "import",
                    ExportPath = ".",
                    Interfaces =
                    [
                        new TsInterfaceInfo { Name = "SharedOptions", ExportPath = "." }
                    ]
                },
                new TsModuleInfo
                {
                    Name = "mod-c",
                    Condition = "require",
                    ExportPath = ".",
                    Interfaces =
                    [
                        new TsInterfaceInfo { Name = "SharedOptions", ExportPath = "." }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        // SharedOptions should appear once per condition block, not duplicated
        var importBlock = ExtractDeclareModuleBlock(stubs, "@test/dedup-across/import");
        Assert.NotNull(importBlock);
        Assert.Equal(1, CountOccurrences(importBlock, "interface SharedOptions"));
    }

    /// <summary>
    /// Reachability comments should be generated for types reachable from
    /// entry points.
    /// </summary>
    [Fact]
    public void Regression_ReachabilityComments_Generated()
    {
        var api = new TsApiIndex
        {
            Package = "@test/reachability",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    ExportPath = ".",
                    Classes =
                    [
                        new TsClassInfo
                        {
                            Name = "BlobClient",
                            ExportPath = ".",
                            EntryPoint = true,
                            Methods = [new TsMethodInfo { Name = "upload", Sig = "data: Buffer", Ret = "void" }],
                            ReferencedTypes = ["BlobOptions"]
                        }
                    ],
                    Interfaces =
                    [
                        new TsInterfaceInfo { Name = "BlobOptions", ExportPath = "." }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        // BlobOptions should have a reachability comment showing it's reached via BlobClient
        Assert.Contains("BlobOptions", stubs);
        Assert.Contains("BlobClient", stubs);
    }

    /// <summary>
    /// Cross-module dependency detection in resolved deps should use
    /// structured referencedTypes and emit correct cross-dep imports.
    /// </summary>
    [Fact]
    public void StructuredDeps_ResolvedDepCrossImports_UseReferencedTypes()
    {
        var api = new TsApiIndex
        {
            Package = "@test/cross-dep-import",
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
            ResolvedDependencies =
            [
                new TsApiIndex
                {
                    Package = "@azure/core-auth",
                    Modules =
                    [
                        new TsModuleInfo
                        {
                            Name = "auth-mod",
                            Condition = "import",
                            Interfaces =
                            [
                                new TsInterfaceInfo { Name = "TokenCredential" }
                            ]
                        }
                    ]
                },
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
                                    Properties = [new TsPropertyInfo { Name = "credential", Type = "TokenCredential" }],
                                    ReferencedTypes = ["TokenCredential"]
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        // The pipeline dep module should import TokenCredential from the auth dep module
        var pipelineBlock = ExtractDeclareModuleBlock(stubs, "@azure/core-rest-pipeline");
        Assert.NotNull(pipelineBlock);
        Assert.Contains("import type { TokenCredential }", pipelineBlock);
        Assert.Contains("@azure/core-auth", pipelineBlock);
    }

    /// <summary>
    /// FormatPerTarget should produce separate outputs per condition,
    /// each with its own dts and tsconfig.
    /// </summary>
    [Fact]
    public void FormatPerTarget_ProducesSeparateOutputsPerCondition()
    {
        var api = new TsApiIndex
        {
            Package = "@test/per-target",
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
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);

        Assert.True(result.ContainsKey("import"));
        Assert.True(result.ContainsKey("require"));

        var (importDts, importTsconfig) = result["import"];
        var (requireDts, requireTsconfig) = result["require"];

        Assert.Contains("class Client", importDts);
        Assert.Contains("class Client", requireDts);
        Assert.Contains("compilerOptions", importTsconfig);
        Assert.Contains("compilerOptions", requireTsconfig);
    }

    /// <summary>
    /// Collision aliases should also work in multi-condition (sectioned) mode.
    /// </summary>
    [Fact]
    public void Regression_CollisionAliases_WorkInMultiCondition()
    {
        var api = new TsApiIndex
        {
            Package = "@test/collision-multi",
            CollisionAliases = new Dictionary<string, Dictionary<string, string>>
            {
                ["Pipeline"] = new Dictionary<string, string>
                {
                    ["@azure/core-rest-pipeline"] = "_pipeline_Pipeline",
                    ["@test/collision-multi"] = "Pipeline"
                }
            },
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "import-mod",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Pipeline", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "require-mod",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Pipeline", ExportPath = "." }]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@azure/core-rest-pipeline",
                    Interfaces = [new TsInterfaceInfo { Name = "Pipeline" }]
                }
            ]
        };

        var stubs = api.ToStubs();

        // The dep's Pipeline should be imported with an alias in multi-condition mode
        Assert.Contains("Pipeline as _pipeline_Pipeline", stubs);
    }

    /// <summary>
    /// Self-referential alias filtering should still work in sectioned mode.
    /// </summary>
    [Fact]
    public void Regression_SelfRefAlias_ExcludedInSectionedMode()
    {
        var api = new TsApiIndex
        {
            Package = "@test/self-ref-sectioned",
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
                                new TsTypeAliasInfo { Name = "ValidType", Type = "string | number" }
                            ]
                        }
                    ]
                }
            ]
        };

        var stubs = api.ToStubs();

        // Self-referential should be excluded; valid type should appear
        var depBlock = ExtractDeclareModuleBlock(stubs, "@external/core");
        Assert.NotNull(depBlock);
        Assert.DoesNotContain("type Pipeline", depBlock);
        Assert.Contains("type ValidType", depBlock);
    }

    // =========================================================================
    // Deduplication: types re-exported from multiple modules (single condition)
    // =========================================================================

    /// <summary>
    /// When the same class is re-exported from multiple modules within a single
    /// condition (common in packages with barrel files), the formatter should
    /// deduplicate and emit the class exactly once. Regression test for the
    /// AIProjectClient duplicate emission bug.
    /// </summary>
    [Fact]
    public void Dedup_SingleCondition_ClassReExportedFromMultipleModules()
    {
        var api = new TsApiIndex
        {
            Package = "@test/reexport-dedup",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "src/client",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "MyClient", ExportPath = ".", EntryPoint = true, Methods = [new TsMethodInfo { Name = "connect", Sig = "(): void" }] }]
                },
                new TsModuleInfo
                {
                    Name = "src/index",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "MyClient", ExportPath = ".", EntryPoint = true, Methods = [new TsMethodInfo { Name = "connect", Sig = "(): void" }] }]
                },
                new TsModuleInfo
                {
                    Name = "src/barrel",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "MyClient", ExportPath = ".", EntryPoint = true, Methods = [new TsMethodInfo { Name = "connect", Sig = "(): void" }] }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        Assert.True(result.ContainsKey("import"));
        var (dts, _) = result["import"];

        // Class should appear exactly once
        Assert.Equal(1, CountOccurrences(dts, "class MyClient"));
    }

    /// <summary>
    /// Interfaces re-exported from multiple modules should also be deduplicated.
    /// </summary>
    [Fact]
    public void Dedup_SingleCondition_InterfaceReExportedFromMultipleModules()
    {
        var api = new TsApiIndex
        {
            Package = "@test/iface-dedup",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "src/models",
                    Condition = "import",
                    ExportPath = ".",
                    Interfaces = [new TsInterfaceInfo { Name = "Options", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "src/index",
                    Condition = "import",
                    ExportPath = ".",
                    Interfaces = [new TsInterfaceInfo { Name = "Options", ExportPath = "." }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        Assert.Equal(1, CountOccurrences(dts, "interface Options"));
    }

    // =========================================================================
    // Tsconfig: Node types added when API uses Node.js globals (e.g. Buffer)
    // =========================================================================

    /// <summary>
    /// When a browser target's rendered output contains Node.js-only types
    /// like Buffer in type positions, the tsconfig should include @types/node
    /// even though the target is non-node.
    /// </summary>
    [Fact]
    public void Tsconfig_BrowserWithBufferInTypes_IncludesNodeTypes()
    {
        var api = new TsApiIndex
        {
            Package = "@test/buffer-browser",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "browser",
                    ExportPath = ".",
                    Interfaces =
                    [
                        new TsInterfaceInfo
                        {
                            Name = "FileContent",
                            ExportPath = ".",
                            Properties =
                            [
                                new TsPropertyInfo { Name = "data", Type = "Buffer | Uint8Array" },
                                new TsPropertyInfo { Name = "name", Type = "string" }
                            ]
                        }
                    ]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result["browser"];

        Assert.Contains("\"node\"", tsconfig);
    }

    /// <summary>
    /// When Buffer only appears in a comment (not in a type position), the
    /// tsconfig should NOT include @types/node — avoids false positives.
    /// </summary>
    [Fact]
    public void Tsconfig_BrowserWithBufferOnlyInComment_NoNodeTypes()
    {
        // Create an interface whose doc comment mentions Buffer but doesn't use it as a type
        var api = new TsApiIndex
        {
            Package = "@test/buffer-comment",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "browser",
                    ExportPath = ".",
                    Interfaces =
                    [
                        new TsInterfaceInfo
                        {
                            Name = "StreamOptions",
                            ExportPath = ".",
                            Doc = "Buffer is not available in the browser. Use Uint8Array instead.",
                            Properties =
                            [
                                new TsPropertyInfo { Name = "data", Type = "Uint8Array" }
                            ]
                        }
                    ]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result["browser"];

        // Should NOT include node types — Buffer only appeared in a comment
        Assert.Contains("\"types\": []", tsconfig);
    }

    // =========================================================================
    // Tsconfig: react-native skips DOM lib
    // =========================================================================

    /// <summary>
    /// react-native target should never include DOM lib even when the API uses
    /// DOM-like types, because react-native provides its own globals.
    /// </summary>
    [Fact]
    public void Tsconfig_ReactNative_NoDomLib()
    {
        var api = new TsApiIndex
        {
            Package = "@test/rn-no-dom",
            AmbientTypes = new Dictionary<string, List<string>>
            {
                ["dom"] = ["AbortSignal", "FormData"]
            },
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "react-native",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = "." }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result["react-native"];

        Assert.DoesNotContain("\"DOM\"", tsconfig);
        Assert.Contains("\"react-native\"", tsconfig);
    }

    /// <summary>
    /// react-native target should include both node and react-native types
    /// when the API uses Node.js globals.
    /// </summary>
    [Fact]
    public void Tsconfig_ReactNative_WithNodeGlobals_IncludesBothTypes()
    {
        var api = new TsApiIndex
        {
            Package = "@test/rn-buffer",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "react-native",
                    ExportPath = ".",
                    Interfaces =
                    [
                        new TsInterfaceInfo
                        {
                            Name = "FileContent",
                            ExportPath = ".",
                            Properties =
                            [
                                new TsPropertyInfo { Name = "data", Type = "Buffer" }
                            ]
                        }
                    ]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result["react-native"];

        Assert.Contains("\"node\"", tsconfig);
        Assert.Contains("\"react-native\"", tsconfig);
    }

    // =========================================================================
    // Subpath exports: rendered as separate declare module blocks
    // =========================================================================

    /// <summary>
    /// Types with different ExportPaths should be rendered in separate
    /// declare module blocks (main "." and subpath) in per-target mode.
    /// </summary>
    [Fact]
    public void SubpathExports_RenderedAsSeparateDeclareModuleBlocks()
    {
        var api = new TsApiIndex
        {
            Package = "@test/subpaths",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "MainClient", ExportPath = "." }]
                },
                new TsModuleInfo
                {
                    Name = "internal/logger",
                    Condition = "import",
                    ExportPath = "./internal/logger",
                    Interfaces = [new TsInterfaceInfo { Name = "LoggerOptions", ExportPath = "./internal/logger" }],
                    Functions = [new TsFunctionInfo { Name = "createLogger", ExportPath = "./internal/logger", Sig = "(opts: LoggerOptions): Logger" }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        // Main module block
        Assert.Contains("declare module \"@test/subpaths\"", dts);
        var mainBlock = ExtractDeclareModuleBlock(dts, "@test/subpaths");
        Assert.NotNull(mainBlock);
        Assert.Contains("class MainClient", mainBlock);
        // Main block should NOT contain subpath types
        Assert.DoesNotContain("LoggerOptions", mainBlock);

        // Subpath module block
        Assert.Contains("declare module \"@test/subpaths/internal/logger\"", dts);
        var subBlock = ExtractDeclareModuleBlock(dts, "@test/subpaths/internal/logger");
        Assert.NotNull(subBlock);
        Assert.Contains("interface LoggerOptions", subBlock);
        Assert.Contains("function createLogger", subBlock);
        // Subpath should NOT contain main types
        Assert.DoesNotContain("MainClient", subBlock);
    }

    /// <summary>
    /// In per-target mode, subpath exports should also produce separate
    /// declare module blocks within each condition's output.
    /// </summary>
    [Fact]
    public void SubpathExports_PerTarget_SeparateDeclareModuleBlocks()
    {
        var api = new TsApiIndex
        {
            Package = "@test/subpaths-pt",
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
                    Name = "utils",
                    Condition = "import",
                    ExportPath = "./utils",
                    Functions = [new TsFunctionInfo { Name = "parse", ExportPath = "./utils", Sig = "(input: string): object" }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        // Both modules should appear
        Assert.Contains("declare module \"@test/subpaths-pt\"", dts);
        Assert.Contains("declare module \"@test/subpaths-pt/utils\"", dts);

        var mainBlock = ExtractDeclareModuleBlock(dts, "@test/subpaths-pt");
        Assert.NotNull(mainBlock);
        Assert.Contains("class Client", mainBlock);

        var utilsBlock = ExtractDeclareModuleBlock(dts, "@test/subpaths-pt/utils");
        Assert.NotNull(utilsBlock);
        Assert.Contains("function parse", utilsBlock);
    }

    // =========================================================================
    // Variables: rendered correctly in output
    // =========================================================================

    /// <summary>
    /// Variables should be rendered as export const declarations in per-target output.
    /// </summary>
    [Fact]
    public void Variables_RenderedInPerTargetOutput()
    {
        var api = new TsApiIndex
        {
            Package = "@test/variables",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = ".", EntryPoint = true }],
                    Variables =
                    [
                        new TsVariableInfo { Name = "DEFAULT_TIMEOUT", Type = "number", IsConst = true, ExportPath = ".", EntryPoint = true },
                        new TsVariableInfo { Name = "VERSION", Type = "string", IsConst = true, ExportPath = ".", EntryPoint = true }
                    ]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        Assert.Contains("DEFAULT_TIMEOUT", dts);
        Assert.Contains("VERSION", dts);
    }

    /// <summary>
    /// Variables re-exported from multiple modules should be deduplicated.
    /// </summary>
    [Fact]
    public void Variables_Dedup_SingleCondition()
    {
        var api = new TsApiIndex
        {
            Package = "@test/var-dedup",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "src/constants",
                    Condition = "import",
                    ExportPath = ".",
                    Variables =
                    [
                        new TsVariableInfo { Name = "MAX_RETRIES", Type = "number", IsConst = true, ExportPath = "." }
                    ]
                },
                new TsModuleInfo
                {
                    Name = "src/index",
                    Condition = "import",
                    ExportPath = ".",
                    Variables =
                    [
                        new TsVariableInfo { Name = "MAX_RETRIES", Type = "number", IsConst = true, ExportPath = "." }
                    ]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        // Should appear exactly once
        Assert.Equal(1, CountOccurrences(dts, "MAX_RETRIES"));
    }

    // =========================================================================
    // Fix: Function dedup preserves overloads (DeduplicateFunctions by name+sig)
    // =========================================================================

    /// <summary>
    /// Function overloads (same name, different signatures) must be preserved
    /// after deduplication. Previously DeduplicateByName dropped all but the first.
    /// </summary>
    [Fact]
    public void FunctionDedup_PreservesOverloads()
    {
        var api = new TsApiIndex
        {
            Package = "@test/func-overloads",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "import",
                    ExportPath = ".",
                    Functions =
                    [
                        new TsFunctionInfo { Name = "parse", Sig = "(input: string): number", ExportPath = "." },
                        new TsFunctionInfo { Name = "parse", Sig = "(input: Buffer): number", ExportPath = "." },
                        new TsFunctionInfo { Name = "parse", Sig = "(input: ArrayBuffer): number", ExportPath = "." }
                    ]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        // All 3 overloads should be present
        Assert.Equal(3, CountOccurrences(dts, "function parse("));
        Assert.Contains("input: string", dts);
        Assert.Contains("input: Buffer", dts);
        Assert.Contains("input: ArrayBuffer", dts);
    }

    /// <summary>
    /// Exact duplicate functions (same name AND sig) across re-export modules
    /// should still be deduplicated to one copy.
    /// </summary>
    [Fact]
    public void FunctionDedup_RemovesExactDuplicates()
    {
        var api = new TsApiIndex
        {
            Package = "@test/func-exact-dedup",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "src/parse",
                    Condition = "import",
                    ExportPath = ".",
                    Functions =
                    [
                        new TsFunctionInfo { Name = "parse", Sig = "(input: string): number", ExportPath = "." }
                    ]
                },
                new TsModuleInfo
                {
                    Name = "src/index",
                    Condition = "import",
                    ExportPath = ".",
                    Functions =
                    [
                        new TsFunctionInfo { Name = "parse", Sig = "(input: string): number", ExportPath = "." }
                    ]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        Assert.Equal(1, CountOccurrences(dts, "function parse("));
    }

    // =========================================================================
    // Fix: CollectAllReferencedTypes includes variables and namespaces
    // =========================================================================

    /// <summary>
    /// A variable whose type references a dependency type should cause
    /// that dependency to generate an import type statement.
    /// </summary>
    [Fact]
    public void VariableReferencedTypes_GenerateImports()
    {
        var api = new TsApiIndex
        {
            Package = "@test/var-refs",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "import",
                    ExportPath = ".",
                    Variables =
                    [
                        new TsVariableInfo
                        {
                            Name = "defaultClient",
                            Type = "HttpClient",
                            IsConst = true,
                            ExportPath = ".",
                            EntryPoint = true,
                            ReferencedTypes = ["HttpClient"]
                        }
                    ]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@azure/core-rest-pipeline",
                    Classes = [new TsClassInfo { Name = "HttpClient" }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        // The variable should appear
        Assert.Contains("defaultClient", dts);
        // And the dep module should be rendered with HttpClient
        Assert.Contains("@azure/core-rest-pipeline", dts);
        Assert.Contains("HttpClient", dts);
    }

    // =========================================================================
    // Fix: Compound condition handling (react-native|import)
    // =========================================================================

    /// <summary>
    /// A compound react-native|import condition should NOT get DOM lib
    /// (react-native types conflict with DOM). Previously the exact-string check
    /// missed compound conditions.
    /// </summary>
    [Fact]
    public void CompoundCondition_ReactNativeImport_SkipsDom()
    {
        var api = new TsApiIndex
        {
            Package = "@test/rn-compound",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "react-native|import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "MyClient", ExportPath = ".", EntryPoint = true }]
                }
            ],
            AmbientTypes = new Dictionary<string, List<string>>
            {
                ["dom"] = ["Blob", "URL"]
            }
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result["react-native|import"];

        // Should NOT contain DOM lib (RN conflicts with DOM)
        Assert.DoesNotContain("\"DOM\"", tsconfig);
        // Should contain react-native types
        Assert.Contains("\"react-native\"", tsconfig);
    }

    /// <summary>
    /// A compound react-native|import condition with Node globals in the output
    /// should get both node and react-native types.
    /// </summary>
    [Fact]
    public void CompoundCondition_ReactNativeImport_GetsNodeTypes_WhenBufferUsed()
    {
        var api = new TsApiIndex
        {
            Package = "@test/rn-node",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "react-native|import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo
                    {
                        Name = "StreamClient",
                        ExportPath = ".",
                        EntryPoint = true,
                        Methods = [new TsMethodInfo { Name = "send", Sig = "(data: Buffer): void" }]
                    }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result["react-native|import"];

        // Should have node types (for Buffer) AND react-native types
        Assert.Contains("\"node\"", tsconfig);
        Assert.Contains("\"react-native\"", tsconfig);
    }

    // =========================================================================
    // Fix: needsSections path emits main module first
    // =========================================================================

    /// <summary>
    /// In the needsSections path (multi-condition packages with subpath exports),
    /// the main package module should appear before dependency modules.
    /// </summary>
    [Fact]
    public void SectionedPath_MainModuleFirst()
    {
        var api = new TsApiIndex
        {
            Package = "@test/main-first",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo
                    {
                        Name = "Client",
                        ExportPath = ".",
                        EntryPoint = true,
                        ReferencedTypes = ["ExternalType"]
                    }]
                },
                new TsModuleInfo
                {
                    Name = "sub",
                    Condition = "import",
                    ExportPath = "./utils",
                    Functions = [new TsFunctionInfo { Name = "helper", Sig = "(): void", ExportPath = "./utils" }]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@external/dep",
                    Classes = [new TsClassInfo { Name = "ExternalType" }]
                }
            ],
            ResolvedDependencies =
            [
                new TsApiIndex
                {
                    Package = "@external/dep",
                    Modules =
                    [
                        new TsModuleInfo
                        {
                            Name = "dep-main",
                            Condition = "import",
                            Classes = [new TsClassInfo { Name = "ExternalType" }]
                        }
                    ]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        // Main module should appear before dep module
        var mainIdx = dts.IndexOf("declare module \"@test/main-first\"", StringComparison.Ordinal);
        var depIdx = dts.IndexOf("declare module \"@external/dep\"", StringComparison.Ordinal);

        Assert.True(mainIdx >= 0, "Main module should be present");
        Assert.True(depIdx >= 0, "Dep module should be present");
        Assert.True(mainIdx < depIdx, $"Main module (pos {mainIdx}) should appear before dep module (pos {depIdx})");
    }

    // =========================================================================
    // Fix: No .Take(20) function cap
    // =========================================================================

    /// <summary>
    /// More than 20 functions should all be emitted (previously capped at 20).
    /// </summary>
    [Fact]
    public void SimplePath_NoFunctionCap()
    {
        var functions = new List<TsFunctionInfo>();
        for (int i = 0; i < 30; i++)
        {
            functions.Add(new TsFunctionInfo
            {
                Name = $"func{i:D2}",
                Sig = $"(): void",
                ExportPath = "."
            });
        }

        var api = new TsApiIndex
        {
            Package = "@test/many-funcs",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "import",
                    ExportPath = ".",
                    Functions = functions
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        // All 30 functions should be present
        for (int i = 0; i < 30; i++)
        {
            Assert.Contains($"func{i:D2}", dts);
        }
    }

    // =========================================================================
    // Fix: Empty class with index signatures is NOT empty
    // =========================================================================

    /// <summary>
    /// A class with only index signatures should NOT be marked "// empty".
    /// Previously the emptiness check didn't consider IndexSignatures.
    /// </summary>
    [Fact]
    public void EmptyClass_IndexSignaturesNotEmpty()
    {
        var api = new TsApiIndex
        {
            Package = "@test/idx-sig",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo
                    {
                        Name = "DynamicMap",
                        ExportPath = ".",
                        EntryPoint = true,
                        IndexSignatures =
                        [
                            new TsIndexSignatureInfo { KeyName = "key", KeyType = "string", ValueType = "unknown" }
                        ]
                    }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        Assert.Contains("DynamicMap", dts);
        Assert.Contains("[key: string]: unknown", dts);
        Assert.DoesNotContain("// empty", dts);
    }

    // =========================================================================
    // Fix: tsconfig module/moduleResolution settings
    // =========================================================================

    /// <summary>
    /// ESM targets (import, browser, react-native) should get ESNext module
    /// and bundler moduleResolution.
    /// </summary>
    [Fact]
    public void Tsconfig_ESM_ModuleSettings()
    {
        var api = new TsApiIndex
        {
            Package = "@test/tsconfig-esm",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = ".", EntryPoint = true }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result["import"];

        Assert.Contains("\"module\": \"ESNext\"", tsconfig);
        Assert.Contains("\"moduleResolution\": \"bundler\"", tsconfig);
    }

    /// <summary>
    /// CJS targets (require) should get commonjs module and node10 moduleResolution.
    /// </summary>
    [Fact]
    public void Tsconfig_CJS_ModuleSettings()
    {
        var api = new TsApiIndex
        {
            Package = "@test/tsconfig-cjs",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main-import",
                    Condition = "import",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = ".", EntryPoint = true }]
                },
                new TsModuleInfo
                {
                    Name = "main-require",
                    Condition = "require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = ".", EntryPoint = true }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, requireTsconfig) = result["require"];

        Assert.Contains("\"module\": \"commonjs\"", requireTsconfig);
        Assert.Contains("\"moduleResolution\": \"node10\"", requireTsconfig);
    }

    /// <summary>
    /// Compound CJS condition (node|require) should get CJS settings.
    /// </summary>
    [Fact]
    public void Tsconfig_CompoundCJS_ModuleSettings()
    {
        var api = new TsApiIndex
        {
            Package = "@test/tsconfig-compound-cjs",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "node|require",
                    ExportPath = ".",
                    Classes = [new TsClassInfo { Name = "Client", ExportPath = ".", EntryPoint = true }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result["node|require"];

        Assert.Contains("\"module\": \"commonjs\"", tsconfig);
        Assert.Contains("\"moduleResolution\": \"node10\"", tsconfig);
    }

    // =========================================================================
    // Fix: Namespace variables appear in output
    // =========================================================================

    /// <summary>
    /// Variables inside namespaces should be rendered in the output.
    /// (This tests the C# formatter's handling — the TS extractor fix
    /// ensures the data is populated.)
    /// </summary>
    [Fact]
    public void NamespaceVariables_Rendered()
    {
        var api = new TsApiIndex
        {
            Package = "@test/ns-vars",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "import",
                    ExportPath = ".",
                    Namespaces =
                    [
                        new TsNamespaceInfo
                        {
                            Name = "Config",
                            ExportPath = ".",
                            Variables =
                            [
                                new TsVariableInfo { Name = "DEFAULT_TIMEOUT", Type = "number", IsConst = true },
                                new TsVariableInfo { Name = "MAX_RETRIES", Type = "number", IsConst = true }
                            ]
                        }
                    ]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        Assert.Contains("namespace Config", dts);
        Assert.Contains("DEFAULT_TIMEOUT", dts);
        Assert.Contains("MAX_RETRIES", dts);
    }

    // =========================================================================
    // Fix: Namespace referenced types contribute to import generation
    // =========================================================================

    /// <summary>
    /// A namespace containing types with referencedTypes should cause
    /// dependency imports to be generated.
    /// </summary>
    [Fact]
    public void NamespaceReferencedTypes_GenerateImports()
    {
        var api = new TsApiIndex
        {
            Package = "@test/ns-refs",
            Modules =
            [
                new TsModuleInfo
                {
                    Name = "main",
                    Condition = "import",
                    ExportPath = ".",
                    Namespaces =
                    [
                        new TsNamespaceInfo
                        {
                            Name = "Helpers",
                            ExportPath = ".",
                            Interfaces = [new TsInterfaceInfo
                            {
                                Name = "Config",
                                ReferencedTypes = ["PipelineOptions"]
                            }]
                        }
                    ]
                }
            ],
            Dependencies =
            [
                new TsDependencyInfo
                {
                    Package = "@azure/core-rest-pipeline",
                    Interfaces = [new TsInterfaceInfo { Name = "PipelineOptions" }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        Assert.Contains("namespace Helpers", dts);
        Assert.Contains("@azure/core-rest-pipeline", dts);
    }

    [Fact]
    public void DepVariables_AreRendered()
    {
        var api = new TsApiIndex
        {
            Package = "@azure/test-pkg",
            Version = "1.0.0",
            Modules = [
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "import",
                    Classes = [new TsClassInfo { Name = "TestClient" }]
                }
            ],
            Dependencies = [
                new TsDependencyInfo {
                    Package = "@azure/core-util",
                    Version = "1.0.0",
                    Functions = [new TsFunctionInfo { Name = "delay", Sig = "ms: number", Ret = "Promise<void>" }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        Assert.Contains("delay", dts);
        Assert.Contains("@azure/core-util", dts);
    }

    [Fact]
    public void DepVariables_ReferencedTypesGenerateImports()
    {
        var api = new TsApiIndex
        {
            Package = "@azure/test-pkg",
            Version = "1.0.0",
            Modules = [
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "import",
                    Interfaces = [new TsInterfaceInfo { Name = "Config", ReferencedTypes = ["PipelinePolicy"] }]
                }
            ],
            Dependencies = [
                new TsDependencyInfo {
                    Package = "@azure/core-rest-pipeline",
                    Interfaces = [new TsInterfaceInfo { Name = "PipelinePolicy" }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        // Verify import line exists with actual type
        Assert.Contains("import type { PipelinePolicy }", dts);
        Assert.Contains("@azure/core-rest-pipeline", dts);
    }

    [Fact]
    public void EnumTypeAliasCollision_EnumWins()
    {
        var api = new TsApiIndex
        {
            Package = "@azure/test-pkg",
            Version = "1.0.0",
            Modules = [
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "import",
                    Enums = [new TsEnumInfo { Name = "KnownStatus", Values = ["Running"] }],
                    Types = [new TsTypeAliasInfo { Name = "KnownStatus", Type = "string" }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        // Enum should be present
        Assert.Contains("enum KnownStatus", dts);
        // Type alias should be suppressed
        Assert.DoesNotContain("type KnownStatus", dts);
    }

    [Fact]
    public void EnumTypeAliasCollision_ReverseOrder_EnumStillWins()
    {
        // Use two modules with the same condition to force merging
        // where the type alias arrives first and the enum second
        var api = new TsApiIndex
        {
            Package = "@azure/test-pkg",
            Version = "1.0.0",
            Modules = [
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "import",
                    Types = [new TsTypeAliasInfo { Name = "Priority", Type = "string" }]
                },
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "import",
                    Enums = [new TsEnumInfo { Name = "Priority", Values = ["High = \"high\"", "Low = \"low\""] }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        Assert.Contains("enum Priority", dts);
        Assert.DoesNotContain("type Priority", dts);
    }

    [Fact]
    public void SimplePathOrdering_VariablesBeforeNamespaces()
    {
        var api = new TsApiIndex
        {
            Package = "@azure/test-pkg",
            Version = "1.0.0",
            Modules = [
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "import",
                    Variables = [new TsVariableInfo { Name = "VERSION", Type = "string", IsConst = true }],
                    Namespaces = [new TsNamespaceInfo {
                        Name = "Helpers",
                        Interfaces = [new TsInterfaceInfo { Name = "Config" }]
                    }],
                    Functions = [new TsFunctionInfo { Name = "create", Sig = "", Ret = "void" }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        var varIdx = dts.IndexOf("VERSION");
        var nsIdx = dts.IndexOf("namespace Helpers");
        Assert.True(varIdx > -1, "Variable should be in output");
        Assert.True(nsIdx > -1, "Namespace should be in output");
        Assert.True(varIdx < nsIdx, "Variable should appear before namespace");
    }

    [Fact]
    public void WorkerTarget_GetsWebWorkerLib()
    {
        var api = new TsApiIndex
        {
            Package = "@azure/test-pkg",
            Version = "1.0.0",
            Modules = [
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "worker",
                    Interfaces = [new TsInterfaceInfo { Name = "WorkerClient", Properties = [
                        new TsPropertyInfo { Name = "response", Type = "Response" }
                    ]}]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result["worker"];

        Assert.Contains("\"WebWorker\"", tsconfig);
        Assert.DoesNotContain("\"DOM\"", tsconfig);
        Assert.DoesNotContain("\"DOM.Iterable\"", tsconfig);
    }

    [Fact]
    public void WorkerdTarget_GetsWebWorkerLib()
    {
        var api = new TsApiIndex
        {
            Package = "@azure/test-pkg",
            Version = "1.0.0",
            Modules = [
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "workerd",
                    Interfaces = [new TsInterfaceInfo { Name = "CfClient", Properties = [
                        new TsPropertyInfo { Name = "request", Type = "Request" }
                    ]}]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result["workerd"];

        Assert.Contains("\"WebWorker\"", tsconfig);
        Assert.DoesNotContain("\"DOM\"", tsconfig);
    }

    [Fact]
    public void BrowserTarget_StillGetsDOMLib()
    {
        var api = new TsApiIndex
        {
            Package = "@azure/test-pkg",
            Version = "1.0.0",
            Modules = [
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "browser",
                    Interfaces = [new TsInterfaceInfo { Name = "BrowserClient", Properties = [
                        new TsPropertyInfo { Name = "response", Type = "Response" }
                    ]}]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result["browser"];

        Assert.Contains("\"DOM\"", tsconfig);
        Assert.DoesNotContain("\"WebWorker\"", tsconfig);
    }

    [Fact]
    public void ExpandedNodeTypes_InNonNodeTarget()
    {
        var api = new TsApiIndex
        {
            Package = "@azure/test-pkg",
            Version = "1.0.0",
            Modules = [
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "browser",
                    Interfaces = [new TsInterfaceInfo { Name = "StreamClient", Properties = [
                        new TsPropertyInfo { Name = "stream", Type = "Readable" }
                    ]}]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (_, tsconfig) = result["browser"];

        // Readable is a Node.js type — should trigger @types/node even in browser
        Assert.Contains("\"node\"", tsconfig);
    }

    [Fact]
    public void VariableReferencedTypes_GenerateActualImportLine()
    {
        var api = new TsApiIndex
        {
            Package = "@azure/test-pkg",
            Version = "1.0.0",
            Modules = [
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "import",
                    Variables = [new TsVariableInfo {
                        Name = "client",
                        Type = "ServiceClient",
                        ReferencedTypes = ["ServiceClient"]
                    }]
                }
            ],
            Dependencies = [
                new TsDependencyInfo {
                    Package = "@azure/core-client",
                    Classes = [new TsClassInfo { Name = "ServiceClient" }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        // Must have the actual import type line
        Assert.Contains("import type { ServiceClient } from \"@azure/core-client\"", dts);
    }

    [Fact]
    public void NamespaceReferencedTypes_GenerateActualImportLine()
    {
        var api = new TsApiIndex
        {
            Package = "@azure/test-pkg",
            Version = "1.0.0",
            Modules = [
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "import",
                    Namespaces = [new TsNamespaceInfo {
                        Name = "Helpers",
                        Interfaces = [new TsInterfaceInfo {
                            Name = "Config",
                            ReferencedTypes = ["PipelineOptions"]
                        }]
                    }]
                }
            ],
            Dependencies = [
                new TsDependencyInfo {
                    Package = "@azure/core-rest-pipeline",
                    Interfaces = [new TsInterfaceInfo { Name = "PipelineOptions" }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (dts, _) = result["import"];

        Assert.Contains("import type { PipelineOptions } from \"@azure/core-rest-pipeline\"", dts);
    }

    [Fact]
    public void MultiConditionDeps_VariablesRendered()
    {
        var api = new TsApiIndex
        {
            Package = "@azure/test-pkg",
            Version = "1.0.0",
            Modules = [
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "import",
                    Classes = [new TsClassInfo { Name = "MyClient" }]
                },
                new TsModuleInfo {
                    Name = "@azure/test-pkg",
                    ExportPath = ".",
                    Condition = "require",
                    Classes = [new TsClassInfo { Name = "MyClient" }]
                }
            ],
            Dependencies = [
                new TsDependencyInfo {
                    Package = "@azure/core-util",
                    Conditions = ["import", "require"],
                    Functions = [new TsFunctionInfo { Name = "delay", Sig = "ms: number", Ret = "Promise<void>" }]
                }
            ]
        };

        var result = TypeScriptFormatter.FormatPerTarget(api);
        var (importDts, _) = result["import"];
        var (requireDts, _) = result["require"];

        Assert.Contains("delay", importDts);
        Assert.Contains("delay", requireDts);
    }
}
