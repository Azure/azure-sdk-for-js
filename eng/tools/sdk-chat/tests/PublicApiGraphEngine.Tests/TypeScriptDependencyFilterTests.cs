// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.TypeScript;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for the (package, subpath) dependency filtering logic in
/// <see cref="TypeScriptFormatter.Format(ApiIndex, string?)"/> when
/// <see cref="ApiIndex.ResolvedDependencies"/> is present.
/// </summary>
public class TypeScriptDependencyFilterTests
{
    /// <summary>
    /// When Dependencies has two entries for the same package — one root (subpath null)
    /// and one with subpath "./models" — and ResolvedDependencies only contains the
    /// "./models" subpath, Format should only render a declare module block for the
    /// subpath-matching dependency, not the root one.
    /// </summary>
    [Fact]
    public void SubpathIntersection_FiltersToMatchingSubpath()
    {
        var api = new ApiIndex
        {
            Package = "@example/test",
            Modules =
            [
                new ModuleInfo
                {
                    Name = "main",
                    Classes =
                    [
                        new ClassInfo
                        {
                            Name = "TestClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new MethodInfo { Name = "get", Sig = "()", Ret = "Widget" }
                            ]
                        }
                    ]
                }
            ],
            Dependencies =
            [
                // Root import — should NOT get a declare module block
                new DependencyInfo
                {
                    Package = "dep-root",
                    Subpath = null,
                    Interfaces =
                    [
                        new InterfaceInfo
                        {
                            Name = "RootIface",
                            Properties = [new PropertyInfo { Name = "x", Type = "string" }]
                        }
                    ]
                },
                // Subpath import — should get a declare module block
                new DependencyInfo
                {
                    Package = "dep-models",
                    Subpath = "./models",
                    Interfaces =
                    [
                        new InterfaceInfo
                        {
                            Name = "Widget",
                            Properties = [new PropertyInfo { Name = "name", Type = "string" }]
                        }
                    ]
                }
            ],
            ResolvedDependencies =
            [
                new ApiIndex
                {
                    Package = "dep-models",
                    Subpath = "./models",
                    Modules = []
                }
            ]
        };

        var result = TypeScriptFormatter.Format(api);

        // The subpath-matched dependency should get a declare module block
        Assert.Contains("declare module \"dep-models/models\"", result);
        Assert.Contains("Widget", result);
        // The non-matching dependency should NOT get a declare module block
        Assert.DoesNotContain("declare module \"dep-root\"", result);
    }

    /// <summary>
    /// When Dependencies has an entry with no subpath and ResolvedDependencies has
    /// an entry with a subpath (mismatch), the exact (package, subpath) intersection
    /// yields zero results. The fallback to package-name matching should kick in so
    /// the dependency is still rendered.
    /// </summary>
    [Fact]
    public void PackageOnlyFallback_WhenSubpathMismatch_StillRendersDependency()
    {
        var api = new ApiIndex
        {
            Package = "@example/test",
            Modules =
            [
                new ModuleInfo
                {
                    Name = "main",
                    Classes =
                    [
                        new ClassInfo
                        {
                            Name = "TestClient",
                            EntryPoint = true,
                            Methods =
                            [
                                new MethodInfo { Name = "get", Sig = "()", Ret = "Gadget" }
                            ]
                        }
                    ]
                }
            ],
            Dependencies =
            [
                // Flat dependency with no subpath
                new DependencyInfo
                {
                    Package = "pkg",
                    Subpath = null,
                    Interfaces =
                    [
                        new InterfaceInfo
                        {
                            Name = "Gadget",
                            Properties = [new PropertyInfo { Name = "id", Type = "number" }]
                        }
                    ]
                }
            ],
            ResolvedDependencies =
            [
                // Resolved dep has a subpath — won't match the flat dep exactly
                new ApiIndex
                {
                    Package = "pkg",
                    Subpath = "./models",
                    Modules = []
                }
            ]
        };

        var result = TypeScriptFormatter.Format(api);

        // Despite the subpath mismatch, the package-name fallback should render the dep
        Assert.Contains("Gadget", result);
        Assert.Contains("declare module \"pkg\"", result);
    }
}
