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

    // ---------------------------------------------------------------------------
    // Parameter count changes
    // ---------------------------------------------------------------------------

    [Fact]
    public void ParameterCountChanged_AddOptional_IsNonBreaking()
    {
        // Baseline: Get(string), Current: Get(string, int?) — added optional param
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [
            MakeCallable("Get", ["string"], "void")])]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [
            new DiagnosticCallableInfo
            {
                Name = "Get",
                ParameterTypes = ["string", "int"],
                OptionalParameterCount = 1,
                ReturnType = "void"
            }])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Empty(result.Breaking);
        Assert.Contains(result.NonBreaking, c => c.ChangeKind == "ParameterCountChanged" && c.MemberName == "Get");
    }

    [Fact]
    public void ParameterCountChanged_RemoveParameter_IsBreaking()
    {
        // Baseline: Get(string, int?) with 1 optional, Current: Get(string) with 0 optional
        // Same required prefix "string" so they match, but total param count decreased → breaking.
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [
            new DiagnosticCallableInfo
            {
                Name = "Get",
                ParameterTypes = ["string", "int"],
                OptionalParameterCount = 1,
                ReturnType = "void"
            }])]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [
            MakeCallable("Get", ["string"], "void")])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Contains(result.Breaking, c => c.ChangeKind == "ParameterCountChanged" && c.MemberName == "Get");
    }

    [Fact]
    public void ParameterCountChanged_AddRequired_IsBreaking()
    {
        // Adding a required param changes the required-param signature so it won't match exactly.
        // Baseline: Get(string), Current: Get(string, int) with 0 optional → new required param
        // This results in a SignatureChanged (unmatched overload) which is breaking.
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [
            MakeCallable("Get", ["string"], "void")])]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [
            MakeCallable("Get", ["string", "int"], "void")])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Contains(result.Breaking, c => c.ChangeKind == "SignatureChanged" && c.MemberName == "Get");
    }

    // ---------------------------------------------------------------------------
    // Parameter optionality changes
    // ---------------------------------------------------------------------------

    [Fact]
    public void ParameterOptionalityChanged_OptionalToRequired_IsBreaking()
    {
        // Baseline: Get(string, int?) — 1 optional, Current: Get(string, int) — 0 optional
        // Same required prefix "string" so they match.
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [
            new DiagnosticCallableInfo
            {
                Name = "Get",
                ParameterTypes = ["string", "int"],
                OptionalParameterCount = 1,
                ReturnType = "void"
            }])]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [
            MakeCallable("Get", ["string", "int"], "void")])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Contains(result.Breaking, c => c.ChangeKind == "ParameterOptionalityChanged" && c.MemberName == "Get");
    }

    [Fact]
    public void ParameterOptionalityChanged_RequiredToOptional_IsNonBreaking()
    {
        // Baseline: Get(string, int) — 0 optional, Current: Get(string, int?) — 1 optional
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [
            MakeCallable("Get", ["string", "int"], "void")])]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [
            new DiagnosticCallableInfo
            {
                Name = "Get",
                ParameterTypes = ["string", "int"],
                OptionalParameterCount = 1,
                ReturnType = "void"
            }])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Empty(result.Breaking);
        Assert.Contains(result.NonBreaking, c => c.ChangeKind == "ParameterOptionalityChanged" && c.MemberName == "Get");
    }

    // ---------------------------------------------------------------------------
    // Deprecation tracking
    // ---------------------------------------------------------------------------

    [Fact]
    public void DeprecationAdded_OnType_IsNonBreaking()
    {
        var baseline = new MockDiagnosticsSource([new DiagnosticTypeInfo
        {
            Name = "OldApi",
            IsDeprecated = false,
            Callables = [],
            Properties = []
        }]);
        var current = new MockDiagnosticsSource([new DiagnosticTypeInfo
        {
            Name = "OldApi",
            IsDeprecated = true,
            Callables = [],
            Properties = []
        }]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Empty(result.Breaking);
        Assert.Single(result.NonBreaking, c => c.ChangeKind == "DeprecationAdded" && c.TypeName == "OldApi");
    }

    [Fact]
    public void DeprecationRemoved_OnType_IsNonBreaking()
    {
        var baseline = new MockDiagnosticsSource([new DiagnosticTypeInfo
        {
            Name = "OldApi",
            IsDeprecated = true,
            Callables = [],
            Properties = []
        }]);
        var current = new MockDiagnosticsSource([new DiagnosticTypeInfo
        {
            Name = "OldApi",
            IsDeprecated = false,
            Callables = [],
            Properties = []
        }]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Empty(result.Breaking);
        Assert.Single(result.NonBreaking, c => c.ChangeKind == "DeprecationRemoved" && c.TypeName == "OldApi");
    }

    // ---------------------------------------------------------------------------
    // Type kind changes
    // ---------------------------------------------------------------------------

    [Fact]
    public void TypeKindChanged_ClassToInterface_IsBreaking()
    {
        var baseline = new MockDiagnosticsSource([new DiagnosticTypeInfo
        {
            Name = "MyType",
            Kind = "class",
            Callables = [],
            Properties = []
        }]);
        var current = new MockDiagnosticsSource([new DiagnosticTypeInfo
        {
            Name = "MyType",
            Kind = "interface",
            Callables = [],
            Properties = []
        }]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        var change = Assert.Single(result.Breaking, c => c.ChangeKind == "TypeKindChanged" && c.TypeName == "MyType");
        Assert.Equal("class", change.OldSignature);
        Assert.Equal("interface", change.NewSignature);
        Assert.Empty(result.NonBreaking);
    }

    [Fact]
    public void TypeKindChanged_InterfaceToClass_IsBreaking()
    {
        var baseline = new MockDiagnosticsSource([new DiagnosticTypeInfo
        {
            Name = "MyType",
            Kind = "interface",
            Callables = [],
            Properties = []
        }]);
        var current = new MockDiagnosticsSource([new DiagnosticTypeInfo
        {
            Name = "MyType",
            Kind = "class",
            Callables = [],
            Properties = []
        }]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        var change = Assert.Single(result.Breaking, c => c.ChangeKind == "TypeKindChanged");
        Assert.Equal("interface", change.OldSignature);
        Assert.Equal("class", change.NewSignature);
    }

    // ---------------------------------------------------------------------------
    // Property optionality
    // ---------------------------------------------------------------------------

    [Fact]
    public void PropertyOptionalityChanged_OptionalToRequired_IsBreaking()
    {
        var baseline = new MockDiagnosticsSource([MakeType("Dto", properties: [
            new DiagnosticPropertyInfo { Name = "Field", TypeName = "string", IsOptional = true }])]);
        var current = new MockDiagnosticsSource([MakeType("Dto", properties: [
            new DiagnosticPropertyInfo { Name = "Field", TypeName = "string", IsOptional = false }])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        var change = Assert.Single(result.Breaking, c => c.ChangeKind == "PropertyOptionalityChanged" && c.MemberName == "Field");
        Assert.Equal("optional", change.OldSignature);
        Assert.Equal("required", change.NewSignature);
    }

    [Fact]
    public void PropertyOptionalityChanged_RequiredToOptional_IsNonBreaking()
    {
        var baseline = new MockDiagnosticsSource([MakeType("Dto", properties: [
            new DiagnosticPropertyInfo { Name = "Field", TypeName = "string", IsOptional = false }])]);
        var current = new MockDiagnosticsSource([MakeType("Dto", properties: [
            new DiagnosticPropertyInfo { Name = "Field", TypeName = "string", IsOptional = true }])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Empty(result.Breaking);
        var change = Assert.Single(result.NonBreaking, c => c.ChangeKind == "PropertyOptionalityChanged" && c.MemberName == "Field");
        Assert.Equal("required", change.OldSignature);
        Assert.Equal("optional", change.NewSignature);
    }

    // ---------------------------------------------------------------------------
    // Property readonly
    // ---------------------------------------------------------------------------

    [Fact]
    public void PropertyReadOnlyChanged_MutableToReadOnly_IsBreaking()
    {
        var baseline = new MockDiagnosticsSource([MakeType("Dto", properties: [
            new DiagnosticPropertyInfo { Name = "Id", TypeName = "string", IsReadOnly = false }])]);
        var current = new MockDiagnosticsSource([MakeType("Dto", properties: [
            new DiagnosticPropertyInfo { Name = "Id", TypeName = "string", IsReadOnly = true }])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        var change = Assert.Single(result.Breaking, c => c.ChangeKind == "PropertyReadOnlyChanged" && c.MemberName == "Id");
        Assert.Equal("mutable", change.OldSignature);
        Assert.Equal("readonly", change.NewSignature);
    }

    [Fact]
    public void PropertyReadOnlyChanged_ReadOnlyToMutable_IsNonBreaking()
    {
        var baseline = new MockDiagnosticsSource([MakeType("Dto", properties: [
            new DiagnosticPropertyInfo { Name = "Id", TypeName = "string", IsReadOnly = true }])]);
        var current = new MockDiagnosticsSource([MakeType("Dto", properties: [
            new DiagnosticPropertyInfo { Name = "Id", TypeName = "string", IsReadOnly = false }])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Empty(result.Breaking);
        var change = Assert.Single(result.NonBreaking, c => c.ChangeKind == "PropertyReadOnlyChanged" && c.MemberName == "Id");
        Assert.Equal("readonly", change.OldSignature);
        Assert.Equal("mutable", change.NewSignature);
    }

    // ---------------------------------------------------------------------------
    // Structured overload matching
    // ---------------------------------------------------------------------------

    [Fact]
    public void OverloadMatching_ExactMatch_OnlyReportsChangedOverload()
    {
        // Two overloads in baseline: Get(string) and Get(string, int).
        // Current keeps Get(string) identical but changes Get(string, int) return type.
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [
            MakeCallable("Get", ["string"], "void"),
            MakeCallable("Get", ["string", "int"], "int")])]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [
            MakeCallable("Get", ["string"], "void"),
            MakeCallable("Get", ["string", "int"], "long")])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        // Only the return-type change on the second overload should be reported.
        var change = Assert.Single(result.Breaking);
        Assert.Equal("ReturnTypeChanged", change.ChangeKind);
        Assert.Equal("Get", change.MemberName);
        Assert.Equal("int", change.OldSignature);
        Assert.Equal("long", change.NewSignature);
        Assert.Empty(result.NonBreaking);
    }

    [Fact]
    public void OverloadMatching_RequiredParamsPrefix_MatchesCorrectly()
    {
        // Baseline: Get(string) with 0 optional
        // Current: Get(string, int?) with 1 optional — same required prefix "string"
        // Should match via required-params prefix and report ParameterCountChanged (non-breaking).
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [
            MakeCallable("Get", ["string"], "void")])]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [
            new DiagnosticCallableInfo
            {
                Name = "Get",
                ParameterTypes = ["string", "int"],
                OptionalParameterCount = 1,
                ReturnType = "void"
            }])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        // Should be matched (not reported as SignatureChanged) and report param count as non-breaking.
        Assert.Empty(result.Breaking);
        Assert.Contains(result.NonBreaking, c => c.ChangeKind == "ParameterCountChanged" && c.MemberName == "Get");
        // No SignatureChanged since they matched.
        Assert.DoesNotContain(result.Breaking, c => c.ChangeKind == "SignatureChanged");
    }

    // ---------------------------------------------------------------------------
    // Overload matching with duplicate required-parameter prefix
    // ---------------------------------------------------------------------------

    [Fact]
    public void OverloadMatching_DuplicateRequiredPrefix_MatchesByOptionalParams()
    {
        // Two overloads share the same required prefix "string" but differ in optional params.
        // Baseline: Get(string, int?) and Get(string, bool?)
        // Current:  Get(string, bool?) and Get(string, int?)  (reversed order)
        // The matcher must pair each overload with its closest match (same optional type),
        // not arbitrarily match by order.
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [
            new DiagnosticCallableInfo
            {
                Name = "Get",
                ParameterTypes = ["string", "int"],
                OptionalParameterCount = 1,
                ReturnType = "void"
            },
            new DiagnosticCallableInfo
            {
                Name = "Get",
                ParameterTypes = ["string", "bool"],
                OptionalParameterCount = 1,
                ReturnType = "void"
            }])]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [
            new DiagnosticCallableInfo
            {
                Name = "Get",
                ParameterTypes = ["string", "bool"],
                OptionalParameterCount = 1,
                ReturnType = "void"
            },
            new DiagnosticCallableInfo
            {
                Name = "Get",
                ParameterTypes = ["string", "int"],
                OptionalParameterCount = 1,
                ReturnType = "void"
            }])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        // Both overloads are identical across versions — no changes should be reported.
        Assert.Empty(result.Breaking);
        Assert.Empty(result.NonBreaking);
    }

    [Fact]
    public void OverloadMatching_DuplicateRequiredPrefix_ReportsCorrectChanges()
    {
        // Two overloads share required prefix "string".
        // Baseline: Get(string, int?) returning void, Get(string, bool?) returning void
        // Current:  Get(string, int?) returning long, Get(string, bool?) returning void
        // Only the (string, int?) overload changed return type.
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [
            new DiagnosticCallableInfo
            {
                Name = "Get",
                ParameterTypes = ["string", "int"],
                OptionalParameterCount = 1,
                ReturnType = "void"
            },
            new DiagnosticCallableInfo
            {
                Name = "Get",
                ParameterTypes = ["string", "bool"],
                OptionalParameterCount = 1,
                ReturnType = "void"
            }])]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [
            new DiagnosticCallableInfo
            {
                Name = "Get",
                ParameterTypes = ["string", "bool"],
                OptionalParameterCount = 1,
                ReturnType = "void"
            },
            new DiagnosticCallableInfo
            {
                Name = "Get",
                ParameterTypes = ["string", "int"],
                OptionalParameterCount = 1,
                ReturnType = "long"
            }])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        // Only one return type change should be reported
        var change = Assert.Single(result.Breaking);
        Assert.Equal("ReturnTypeChanged", change.ChangeKind);
        Assert.Equal("void", change.OldSignature);
        Assert.Equal("long", change.NewSignature);
        Assert.Empty(result.NonBreaking);
    }

    [Fact]
    public void OverloadMatching_UnmatchedReportedAsRemovedAndAdded()
    {
        // Baseline has 2 overloads, current has 1 different one.
        // One baseline overload matches, the other is removed, and a new one is added.
        var baseline = new MockDiagnosticsSource([MakeType("Svc", [
            MakeCallable("Get", ["string"], "void"),
            MakeCallable("Get", ["int"], "void")])]);
        var current = new MockDiagnosticsSource([MakeType("Svc", [
            MakeCallable("Get", ["string"], "void"),
            MakeCallable("Get", ["bool"], "void")])]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        // Get(int) removed → breaking SignatureChanged, Get(bool) added
        Assert.Contains(result.Breaking, c => c.ChangeKind == "SignatureChanged" && c.MemberName == "Get");
    }

    // ---------------------------------------------------------------------------
    // Hungarian algorithm stress tests
    // ---------------------------------------------------------------------------

    [Fact]
    public void OverloadMatching_ManyOverloads_MatchesCorrectly()
    {
        // 12 overloads on each side with varying parameter types.
        // Each overload has a unique param type; current reverses order and changes one return type.
        var baselineCallables = Enumerable.Range(0, 12)
            .Select(i => MakeCallable("Process", [$"Type{i}"], "void"))
            .ToArray();
        var currentCallables = Enumerable.Range(0, 12)
            .Select(i => MakeCallable("Process", [$"Type{11 - i}"], i == 5 ? "string" : "void"))
            .ToArray();

        var baseline = new MockDiagnosticsSource([MakeType("Svc", baselineCallables)]);
        var current = new MockDiagnosticsSource([MakeType("Svc", currentCallables)]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        // Only the overload whose return type changed should be breaking.
        // The reversed overload with Type6 (index 5 reversed → Type6) changed return to "string".
        var returnChanges = result.Breaking.Where(c => c.ChangeKind == "ReturnTypeChanged").ToList();
        Assert.Single(returnChanges);
        Assert.Equal("void", returnChanges[0].OldSignature);
        Assert.Equal("string", returnChanges[0].NewSignature);
        // No signature changes — all param types are present in both sides.
        Assert.DoesNotContain(result.Breaking, c => c.ChangeKind == "SignatureChanged");
    }

    [Fact]
    public void OverloadMatching_ZeroBaselineVsNOverloads_AllAdded()
    {
        // Baseline has the type with no callables, current has 5 overloads.
        // The differ reports each unmatched overload, but they may be grouped.
        var currentCallables = Enumerable.Range(0, 5)
            .Select(i => MakeCallable("Run", [$"Arg{i}"], "void"))
            .ToArray();

        var baseline = new MockDiagnosticsSource([MakeType("Svc")]);
        var current = new MockDiagnosticsSource([MakeType("Svc", currentCallables)]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Empty(result.Breaking);
        // All overloads added for "Run" should appear as non-breaking.
        Assert.Contains(result.NonBreaking, c => c.ChangeKind == "MemberAdded" && c.MemberName == "Run");
    }

    [Fact]
    public void OverloadMatching_NOverloadsVsZero_AllRemoved()
    {
        // Baseline has 5 overloads, current has the type with no callables.
        var baselineCallables = Enumerable.Range(0, 5)
            .Select(i => MakeCallable("Run", [$"Arg{i}"], "void"))
            .ToArray();

        var baseline = new MockDiagnosticsSource([MakeType("Svc", baselineCallables)]);
        var current = new MockDiagnosticsSource([MakeType("Svc")]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Empty(result.NonBreaking);
        // All overloads removed for "Run" should appear as breaking.
        Assert.Contains(result.Breaking, c => c.MemberName == "Run");
    }

    [Fact]
    public void OverloadMatching_IdenticalOverloadSets_NoChanges()
    {
        // Same 8 overloads on both sides — no changes expected.
        var callables = Enumerable.Range(0, 8)
            .Select(i => MakeCallable("Query", [$"Param{i}", "string"], $"Result{i}"))
            .ToArray();

        var baseline = new MockDiagnosticsSource([MakeType("Svc", callables)]);
        var current = new MockDiagnosticsSource([MakeType("Svc", callables)]);

        var result = ApiDiffAnalyzer.Compare(baseline, current);

        Assert.Empty(result.Breaking);
        Assert.Empty(result.NonBreaking);
    }

    // ---------------------------------------------------------------------------
    // Breaking diagnostics mapping for new change kinds
    // ---------------------------------------------------------------------------

    [Fact]
    public void ToBreakingDiagnostics_EmitsSDK004_ForNewChangeKinds()
    {
        var diffResult = new ApiDiffResult
        {
            Breaking =
            [
                new ApiChange
                {
                    ChangeKind = "ParameterCountChanged",
                    TypeName = "Svc",
                    MemberName = "Get",
                    OldSignature = "string, int",
                    NewSignature = "string"
                },
                new ApiChange
                {
                    ChangeKind = "ParameterOptionalityChanged",
                    TypeName = "Svc",
                    MemberName = "Run",
                    OldSignature = "string, int?",
                    NewSignature = "string, int"
                },
                new ApiChange
                {
                    ChangeKind = "TypeKindChanged",
                    TypeName = "MyType",
                    OldSignature = "class",
                    NewSignature = "interface"
                },
                new ApiChange
                {
                    ChangeKind = "PropertyOptionalityChanged",
                    TypeName = "Dto",
                    MemberName = "Field",
                    OldSignature = "optional",
                    NewSignature = "required"
                },
                new ApiChange
                {
                    ChangeKind = "PropertyReadOnlyChanged",
                    TypeName = "Dto",
                    MemberName = "Id",
                    OldSignature = "mutable",
                    NewSignature = "readonly"
                },
            ],
            NonBreaking = [],
        };

        var diagnostics = ApiDiffAnalyzer.ToBreakingDiagnostics(diffResult);

        Assert.Equal(5, diagnostics.Count);
        Assert.All(diagnostics, d => Assert.Equal("SDK004", d.Id));
        Assert.All(diagnostics, d => Assert.Equal(DiagnosticLevel.Warning, d.Level));
        Assert.Contains(diagnostics, d => d.Text.Contains("ParameterCountChanged") || d.Text.Contains("required parameters removed"));
        Assert.Contains(diagnostics, d => d.Text.Contains("parameter optionality changed"));
        Assert.Contains(diagnostics, d => d.Text.Contains("kind changed") && d.Text.Contains("MyType"));
        Assert.Contains(diagnostics, d => d.Text.Contains("Field") && d.Text.Contains("optional"));
        Assert.Contains(diagnostics, d => d.Text.Contains("Id") && d.Text.Contains("readonly"));
    }

    // ---------------------------------------------------------------------------
    // SDK004 diagnostics (original test)
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
