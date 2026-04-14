// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

public class ApiDiffAnalyzerTests
{
    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------

    private static DiagnosticTypeInfo MakeType(
        string name,
        IReadOnlyList<DiagnosticCallableInfo>? callables = null,
        IReadOnlyList<DiagnosticPropertyInfo>? properties = null) =>
        new()
        {
            Name = name,
            Callables = callables ?? [],
            Properties = properties ?? [],
        };

    private static DiagnosticCallableInfo MakeCallable(
        string name,
        string[]? paramTypes = null,
        string? returnType = null) =>
        new()
        {
            Name = name,
            ParameterTypes = paramTypes ?? [],
            ReturnType = returnType,
        };

    private static DiagnosticPropertyInfo MakeProp(string name, string? typeName = null) =>
        new() { Name = name, TypeName = typeName };

    private sealed class MockDiagnosticsSource : IDiagnosticsSource
    {
        private readonly List<DiagnosticTypeInfo> _types;
        private readonly List<DiagnosticCallableInfo> _topLevel;

        public MockDiagnosticsSource(
            IEnumerable<DiagnosticTypeInfo>? types = null,
            IEnumerable<DiagnosticCallableInfo>? topLevel = null)
        {
            _types = [.. (types ?? [])];
            _topLevel = [.. (topLevel ?? [])];
        }

        public IEnumerable<DiagnosticTypeInfo> GetDiagnosticTypes() => _types;
        public IEnumerable<DiagnosticCallableInfo> GetTopLevelCallables() => _topLevel;
    }

    // ---------------------------------------------------------------------------
    // Type-level changes
    // ---------------------------------------------------------------------------

    [Fact]
    public void TypeRemoved_IsBreaking()
    {
        var baseline = new MockDiagnosticsSource([MakeType("TypeA")]);
        var current = new MockDiagnosticsSource();

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Single(result.Breaking, c => c.ChangeKind == "TypeRemoved" && c.TypeName == "TypeA");
        Assert.Empty(result.NonBreaking);
    }

    [Fact]
    public void TypeAdded_IsNonBreaking()
    {
        var baseline = new MockDiagnosticsSource();
        var current = new MockDiagnosticsSource([MakeType("TypeB")]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Empty(result.Breaking);
        Assert.Single(result.NonBreaking, c => c.ChangeKind == "TypeAdded" && c.TypeName == "TypeB");
    }

    // ---------------------------------------------------------------------------
    // Callable-level changes
    // ---------------------------------------------------------------------------

    [Fact]
    public void MemberRemoved_IsBreaking()
    {
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [MakeCallable("DoWork")])]);
        var current = new MockDiagnosticsSource([MakeType("Svc")]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Single(result.Breaking, c => c.ChangeKind == "MemberRemoved" && c.MemberName == "DoWork");
        Assert.Empty(result.NonBreaking);
    }

    [Fact]
    public void MemberAdded_IsNonBreaking()
    {
        var baseline = new MockDiagnosticsSource([MakeType("Svc")]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [MakeCallable("DoWork")])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Empty(result.Breaking);
        Assert.Single(result.NonBreaking, c => c.ChangeKind == "MemberAdded" && c.MemberName == "DoWork");
    }

    // ---------------------------------------------------------------------------
    // Property-level changes
    // ---------------------------------------------------------------------------

    [Fact]
    public void PropertyRemoved_IsBreaking()
    {
        var baseline = new MockDiagnosticsSource([MakeType("Dto", properties: [MakeProp("Name")])]);
        var current = new MockDiagnosticsSource([MakeType("Dto")]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Single(result.Breaking, c => c.ChangeKind == "PropertyRemoved" && c.MemberName == "Name");
    }

    [Fact]
    public void PropertyAdded_IsNonBreaking()
    {
        var baseline = new MockDiagnosticsSource([MakeType("Dto")]);
        var current = new MockDiagnosticsSource([MakeType("Dto", properties: [MakeProp("Name")])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Empty(result.Breaking);
        Assert.Single(result.NonBreaking, c => c.ChangeKind == "PropertyAdded" && c.MemberName == "Name");
    }

    [Fact]
    public void PropertyTypeChanged_IsBreaking()
    {
        var baseline = new MockDiagnosticsSource([MakeType("Dto", properties: [MakeProp("Count", "int")])]);
        var current = new MockDiagnosticsSource([MakeType("Dto", properties: [MakeProp("Count", "string")])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        var change = Assert.Single(result.Breaking, c => c.ChangeKind == "PropertyTypeChanged" && c.MemberName == "Count");
        Assert.Equal("int", change.OldSignature);
        Assert.Equal("string", change.NewSignature);
    }

    // ---------------------------------------------------------------------------
    // Callable signature / return type changes
    // ---------------------------------------------------------------------------

    [Fact]
    public void ReturnTypeChanged_IsBreaking()
    {
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [MakeCallable("Get", ["string"], "int")])]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [MakeCallable("Get", ["string"], "long")])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        var change = Assert.Single(result.Breaking, c => c.ChangeKind == "ReturnTypeChanged" && c.MemberName == "Get");
        Assert.Equal("int", change.OldSignature);
        Assert.Equal("long", change.NewSignature);
    }

    [Fact]
    public void SignatureChanged_IsBreaking()
    {
        // Baseline has Get(string), current has Get(int) — removed overload is breaking.
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [MakeCallable("Get", ["string"])])]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [MakeCallable("Get", ["int"])])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Contains(result.Breaking, c => c.ChangeKind == "SignatureChanged" && c.MemberName == "Get");
    }

    // ---------------------------------------------------------------------------
    // Case-sensitivity
    // ---------------------------------------------------------------------------

    [Fact]
    public void CaseSensitive_DifferentMethods()
    {
        // Callable lookup is case-sensitive: getItem ≠ GetItem.
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [MakeCallable("getItem")])]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [MakeCallable("GetItem")])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        // getItem was removed (breaking) and GetItem was added (non-breaking).
        Assert.Contains(result.Breaking, c => c.ChangeKind == "MemberRemoved" && c.MemberName == "getItem");
        Assert.Contains(result.NonBreaking, c => c.ChangeKind == "MemberAdded" && c.MemberName == "GetItem");
    }

    // ---------------------------------------------------------------------------
    // No changes
    // ---------------------------------------------------------------------------

    [Fact]
    public void NoChanges_EmptyResult()
    {
        var type = MakeType("Svc",
            callables: [MakeCallable("DoWork", ["string"], "void")],
            properties: [MakeProp("Name", "string")]);

        var baseline = new MockDiagnosticsSource([type]);
        var current = new MockDiagnosticsSource([type]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Empty(result.Breaking);
        Assert.Empty(result.NonBreaking);
    }

    // ---------------------------------------------------------------------------
    // SDK004 diagnostics
    // ---------------------------------------------------------------------------

    [Fact]
    public void ToBreakingDiagnostics_EmitsSDK004()
    {
        var diffResult = new ApiDiffResult
        {
            Breaking =
            [
                new ApiChange { ChangeKind = "TypeRemoved", TypeName = "OldType" },
                new ApiChange { ChangeKind = "MemberRemoved", TypeName = "Svc", MemberName = "OldMethod" },
                new ApiChange { ChangeKind = "PropertyRemoved", TypeName = "Dto", MemberName = "OldProp" },
                new ApiChange
                {
                    ChangeKind = "ReturnTypeChanged",
                    TypeName = "Svc",
                    MemberName = "Get",
                    OldSignature = "int",
                    NewSignature = "long"
                },
                new ApiChange
                {
                    ChangeKind = "PropertyTypeChanged",
                    TypeName = "Dto",
                    MemberName = "Count",
                    OldSignature = "int",
                    NewSignature = "string"
                },
            ],
            NonBreaking = [],
        };

        var diagnostics = ApiDiffAnalyzer.ToBreakingDiagnostics(diffResult);

        Assert.Equal(5, diagnostics.Count);
        Assert.All(diagnostics, d => Assert.Equal("SDK004", d.Id));
        Assert.All(diagnostics, d => Assert.Equal(DiagnosticLevel.Warning, d.Level));
        Assert.Contains(diagnostics, d => d.Text.Contains("OldType") && d.Text.Contains("removed"));
        Assert.Contains(diagnostics, d => d.Text.Contains("OldMethod") && d.Text.Contains("removed"));
        Assert.Contains(diagnostics, d => d.Text.Contains("OldProp") && d.Text.Contains("removed"));
        Assert.Contains(diagnostics, d => d.Text.Contains("return type changed"));
        Assert.Contains(diagnostics, d => d.Text.Contains("type changed") && d.Text.Contains("Count"));
    }
}
