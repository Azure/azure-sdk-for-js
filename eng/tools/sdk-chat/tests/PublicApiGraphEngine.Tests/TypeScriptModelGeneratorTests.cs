// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.TypeScript.Generators;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for the tokenizer + recursive descent parser + emitter pipeline.
/// Validates correct handling of all TypeScript interface syntax constructs.
/// </summary>
public class TypeScriptModelGeneratorTests
{
    // -----------------------------------------------------------------------
    // Tokenizer tests
    // -----------------------------------------------------------------------

    [Fact]
    public void Tokenizer_SimpleInterface_ProducesCorrectTokens()
    {
        var (tokens, _) = new TsTokenizer("export interface Foo { name: string; }").Tokenize();
        Assert.Equal(TsTokenKind.Export, tokens[0].Kind);
        Assert.Equal(TsTokenKind.Interface, tokens[1].Kind);
        Assert.Equal(TsTokenKind.Identifier, tokens[2].Kind);
        Assert.Equal("Foo", tokens[2].Value);
        Assert.Equal(TsTokenKind.OpenBrace, tokens[3].Kind);
        Assert.Equal(TsTokenKind.Identifier, tokens[4].Kind);
        Assert.Equal("name", tokens[4].Value);
        Assert.Equal(TsTokenKind.Colon, tokens[5].Kind);
        Assert.Equal(TsTokenKind.Identifier, tokens[6].Kind); // "string" is parsed as identifier
        Assert.Equal("string", tokens[6].Value);
        Assert.Equal(TsTokenKind.Semicolon, tokens[7].Kind);
        Assert.Equal(TsTokenKind.CloseBrace, tokens[8].Kind);
        Assert.Equal(TsTokenKind.EndOfFile, tokens[9].Kind);
    }

    [Fact]
    public void Tokenizer_StringLiteral_HandlesEscapes()
    {
        var (tokens, _) = new TsTokenizer("\"hello \\\"world\\\"\"").Tokenize();
        Assert.Equal(TsTokenKind.StringLiteral, tokens[0].Kind);
        Assert.Equal("hello \"world\"", tokens[0].Value);
    }

    [Fact]
    public void Tokenizer_LineComment_IsSkipped()
    {
        var (tokens, _) = new TsTokenizer("name // comment\ntype").Tokenize();
        Assert.Equal("name", tokens[0].Value);
        Assert.Equal("type", tokens[1].Value);
    }

    [Fact]
    public void Tokenizer_InlineCommentWithUrl_DoesNotCorruptType()
    {
        // Regression: "exportPath?: string;  // The subpath to import from (e.g., "." or "./client")"
        // The old line-based parser would truncate at "://"
        var (tokens, _) = new TsTokenizer("exportPath?: string;  // The subpath to import from").Tokenize();
        var identTokens = tokens.Where(t => t.Kind == TsTokenKind.Identifier).ToList();
        Assert.Equal("exportPath", identTokens[0].Value);
        Assert.Equal("string", identTokens[1].Value);
    }

    [Fact]
    public void Tokenizer_JsDocComment_ExtractsCleanText()
    {
        var source = """
            /** Single-line doc comment */
            """;
        var (tokens, _) = new TsTokenizer(source).Tokenize();
        Assert.Equal(TsTokenKind.DocComment, tokens[0].Kind);
        Assert.Equal("Single-line doc comment", tokens[0].Value);
    }

    [Fact]
    public void Tokenizer_MultiLineJsDoc_CollapsesToSingleLine()
    {
        var source = """
            /**
             * First line.
             * Second line.
             */
            """;
        var (tokens, _) = new TsTokenizer(source).Tokenize();
        Assert.Equal(TsTokenKind.DocComment, tokens[0].Kind);
        Assert.Equal("First line. Second line.", tokens[0].Value);
    }

    [Fact]
    public void Tokenizer_BlockComment_IsSkipped()
    {
        var (tokens, _) = new TsTokenizer("name /* block comment */ type").Tokenize();
        Assert.Equal(TsTokenKind.Identifier, tokens[0].Kind);
        Assert.Equal("name", tokens[0].Value);
        Assert.Equal(TsTokenKind.Identifier, tokens[1].Kind);
        Assert.Equal("type", tokens[1].Value);
        Assert.Equal(TsTokenKind.EndOfFile, tokens[2].Kind);
        Assert.Equal(3, tokens.Count);
    }

    [Fact]
    public void Tokenizer_TracksLineAndColumn()
    {
        var source = "export\ninterface";
        var (tokens, _) = new TsTokenizer(source).Tokenize();
        Assert.Equal(1, tokens[0].Position.Line);
        Assert.Equal(1, tokens[0].Position.Column);
        Assert.Equal(2, tokens[1].Position.Line);
        Assert.Equal(1, tokens[1].Position.Column);
    }

    // -----------------------------------------------------------------------
    // Parser tests
    // -----------------------------------------------------------------------

    [Fact]
    public void Parser_SimpleInterface_ParsesCorrectly()
    {
        var (file, diags) = ParseSource("export interface Foo { name: string; age?: number; }");
        Assert.Empty(diags);
        Assert.Single(file.Interfaces);
        var iface = file.Interfaces[0];
        Assert.Equal("Foo", iface.Name);
        Assert.True(iface.IsExported);
        Assert.Equal(2, iface.Members.Count);
        Assert.Equal("name", iface.Members[0].Name);
        Assert.False(iface.Members[0].IsOptional);
        Assert.Equal("age", iface.Members[1].Name);
        Assert.True(iface.Members[1].IsOptional);
    }

    [Fact]
    public void Parser_ExtendsClause_Parsed()
    {
        var (file, diags) = ParseSource("export interface Bar extends Base { x: string; }");
        Assert.Empty(diags);
        Assert.Single(file.Interfaces);
        Assert.Equal(new[] { "Base" }, file.Interfaces[0].Extends);
    }

    [Fact]
    public void Parser_MultipleExtends_Parsed()
    {
        var (file, diags) = ParseSource("export interface Bar extends Base, Other { x: string; }");
        Assert.Empty(diags);
        Assert.Equal(new[] { "Base", "Other" }, file.Interfaces[0].Extends);
    }

    [Fact]
    public void Parser_ReadonlyModifier_Recognized()
    {
        var (file, diags) = ParseSource("export interface Foo { readonly name: string; }");
        Assert.Empty(diags);
        Assert.True(file.Interfaces[0].Members[0].IsReadonly);
    }

    [Fact]
    public void Parser_ReadonlyAsPropertyName_Recognized()
    {
        var (file, diags) = ParseSource("export interface Foo { readonly?: boolean; }");
        Assert.Empty(diags);
        var member = file.Interfaces[0].Members[0];
        Assert.Equal("readonly", member.Name);
        Assert.True(member.IsOptional);
        Assert.False(member.IsReadonly);
    }

    [Fact]
    public void Parser_ExtendsAsPropertyName_Recognized()
    {
        var (file, diags) = ParseSource("export interface Foo { extends?: string; }");
        Assert.Empty(diags);
        Assert.Equal("extends", file.Interfaces[0].Members[0].Name);
    }

    [Fact]
    public void Parser_NonExportedInterface_MarkedNotExported()
    {
        var (file, diags) = ParseSource("interface Internal { x: string; }");
        Assert.Empty(diags);
        Assert.Single(file.Interfaces);
        Assert.False(file.Interfaces[0].IsExported);
    }

    [Fact]
    public void Parser_JsDocComment_AttachedToMember()
    {
        var source = """
            export interface Foo {
                /** The name field. */
                name: string;
            }
            """;
        var (file, diags) = ParseSource(source);
        Assert.Empty(diags);
        Assert.Equal("The name field.", file.Interfaces[0].Members[0].DocComment);
    }

    [Fact]
    public void Parser_JsDocComment_AttachedToInterface()
    {
        var source = """
            /** A widget. */
            export interface Widget {
                id: string;
            }
            """;
        var (file, diags) = ParseSource(source);
        Assert.Empty(diags);
        Assert.Equal("A widget.", file.Interfaces[0].DocComment);
    }

    // -----------------------------------------------------------------------
    // Type expression parser tests
    // -----------------------------------------------------------------------

    [Fact]
    public void Parser_PrimitiveTypes_Parsed()
    {
        var (file, _) = ParseSource("export interface T { a: string; b: boolean; c: number; }");
        AssertTypeText(file, 0, "string");
        AssertTypeText(file, 1, "boolean");
        AssertTypeText(file, 2, "number");
    }

    [Fact]
    public void Parser_ArrayType_Parsed()
    {
        var (file, diags) = ParseSource("export interface T { items: string[]; }");
        Assert.Empty(diags);
        var type = file.Interfaces[0].Members[0].Type;
        Assert.IsType<TsArrayType>(type);
        var arr = (TsArrayType)type;
        Assert.IsType<TsPrimitiveType>(arr.ElementType);
        Assert.Equal("string[]", type.ToTypeScript());
    }

    [Fact]
    public void Parser_NestedArrayType_Parsed()
    {
        var (file, _) = ParseSource("export interface T { grid: number[][]; }");
        Assert.Equal("number[][]", file.Interfaces[0].Members[0].Type.ToTypeScript());
    }

    [Fact]
    public void Parser_GenericType_Parsed()
    {
        var (file, diags) = ParseSource("export interface T { data: Record<string, number>; }");
        Assert.Empty(diags);
        var type = file.Interfaces[0].Members[0].Type;
        Assert.IsType<TsNamedType>(type);
        var named = (TsNamedType)type;
        Assert.Equal("Record", named.Name);
        Assert.Equal(2, named.TypeArguments.Count);
        Assert.Equal("Record<string, number>", type.ToTypeScript());
    }

    [Fact]
    public void Parser_NestedGenericType_Parsed()
    {
        var (file, diags) = ParseSource("export interface T { data: Record<string, Record<string, string>>; }");
        Assert.Empty(diags);
        Assert.Equal("Record<string, Record<string, string>>", file.Interfaces[0].Members[0].Type.ToTypeScript());
    }

    [Fact]
    public void Parser_GenericWithArray_Parsed()
    {
        var (file, diags) = ParseSource("export interface T { data: Record<string, string[]>; }");
        Assert.Empty(diags);
        Assert.Equal("Record<string, string[]>", file.Interfaces[0].Members[0].Type.ToTypeScript());
    }

    [Fact]
    public void Parser_StringLiteralUnion_Parsed()
    {
        var (file, diags) = ParseSource("""export interface T { level: "info" | "warning" | "error"; }""");
        Assert.Empty(diags);
        var type = file.Interfaces[0].Members[0].Type;
        Assert.IsType<TsUnionType>(type);
        var union = (TsUnionType)type;
        Assert.Equal(3, union.Members.Count);
        Assert.All(union.Members, m => Assert.IsType<TsStringLiteralType>(m));
    }

    [Fact]
    public void Parser_UnionWithUndefined_Parsed()
    {
        var (file, diags) = ParseSource("export interface T { name: string | undefined; }");
        Assert.Empty(diags);
        var type = file.Interfaces[0].Members[0].Type;
        Assert.IsType<TsUnionType>(type);
        var union = (TsUnionType)type;
        Assert.Equal(2, union.Members.Count);
        Assert.Equal("string | undefined", type.ToTypeScript());
    }

    [Fact]
    public void Parser_NamedTypeReference_Parsed()
    {
        var (file, diags) = ParseSource("export interface T { info: ClassInfo; }");
        Assert.Empty(diags);
        var type = file.Interfaces[0].Members[0].Type;
        Assert.IsType<TsNamedType>(type);
        Assert.Equal("ClassInfo", ((TsNamedType)type).Name);
    }

    [Fact]
    public void Parser_ModelReferenceArray_Parsed()
    {
        var (file, diags) = ParseSource("export interface T { items: ClassInfo[]; }");
        Assert.Empty(diags);
        var type = file.Interfaces[0].Members[0].Type;
        Assert.IsType<TsArrayType>(type);
        var arr = (TsArrayType)type;
        Assert.IsType<TsNamedType>(arr.ElementType);
        Assert.Equal("ClassInfo[]", type.ToTypeScript());
    }

    [Fact]
    public void Parser_ParenthesizedType_Parsed()
    {
        var (file, diags) = ParseSource("""export interface T { items: ("a" | "b")[]; }""");
        Assert.Empty(diags);
        var type = file.Interfaces[0].Members[0].Type;
        Assert.IsType<TsArrayType>(type);
        var arr = (TsArrayType)type;
        Assert.IsType<TsParenthesizedType>(arr.ElementType);
    }

    // -----------------------------------------------------------------------
    // Type mapper tests (AST-based)
    // -----------------------------------------------------------------------

    [Fact]
    public void MapType_String_Required()
    {
        var type = new TsPrimitiveType("string", default);
        var result = CSharpModelEmitter.MapTypeNode(type, false, "Test", "x", []);
        Assert.Equal("string", result);
    }

    [Fact]
    public void MapType_String_Nullable()
    {
        var type = new TsPrimitiveType("string", default);
        var result = CSharpModelEmitter.MapTypeNode(type, true, "Test", "x", []);
        Assert.Equal("string?", result);
    }

    [Fact]
    public void MapType_Boolean_Required()
    {
        var type = new TsPrimitiveType("boolean", default);
        var result = CSharpModelEmitter.MapTypeNode(type, false, "Test", "x", []);
        Assert.Equal("bool", result);
    }

    [Fact]
    public void MapType_Boolean_Nullable()
    {
        var type = new TsPrimitiveType("boolean", default);
        var result = CSharpModelEmitter.MapTypeNode(type, true, "Test", "x", []);
        Assert.Equal("bool?", result);
    }

    [Fact]
    public void MapType_Number_Required()
    {
        var type = new TsPrimitiveType("number", default);
        var result = CSharpModelEmitter.MapTypeNode(type, false, "Test", "x", []);
        Assert.Equal("int", result);
    }

    [Fact]
    public void MapType_Array_Nullable()
    {
        var type = new TsArrayType(new TsPrimitiveType("string", default), default);
        var result = CSharpModelEmitter.MapTypeNode(type, true, "Test", "x", []);
        Assert.Equal("IReadOnlyList<string>?", result);
    }

    [Fact]
    public void MapType_Record_Nullable()
    {
        var type = new TsNamedType("Record", [
            new TsPrimitiveType("string", default),
            new TsPrimitiveType("number", default)
        ], default);
        var result = CSharpModelEmitter.MapTypeNode(type, true, "Test", "x", []);
        Assert.Equal("Dictionary<string, int>?", result);
    }

    [Fact]
    public void MapType_NestedRecord()
    {
        var type = new TsNamedType("Record", [
            new TsPrimitiveType("string", default),
            new TsNamedType("Record", [
                new TsPrimitiveType("string", default),
                new TsPrimitiveType("string", default)
            ], default)
        ], default);
        var result = CSharpModelEmitter.MapTypeNode(type, true, "Test", "x", []);
        Assert.Equal("Dictionary<string, Dictionary<string, string>>?", result);
    }

    [Fact]
    public void MapType_ModelReference()
    {
        var allowlist = new HashSet<string> { "ClassInfo" };
        var type = new TsNamedType("ClassInfo", [], default);
        var result = CSharpModelEmitter.MapTypeNode(type, true, "Test", "x", allowlist);
        Assert.Equal("ClassInfo?", result);
    }

    [Fact]
    public void MapType_StringLiteralUnion_MapsToString()
    {
        var type = new TsUnionType([
            new TsStringLiteralType("info", default),
            new TsStringLiteralType("warning", default),
            new TsStringLiteralType("error", default)
        ], default);
        var result = CSharpModelEmitter.MapTypeNode(type, true, "Test", "x", []);
        Assert.Equal("string?", result);
    }

    [Fact]
    public void MapType_UnionWithUndefined_MakesNullable()
    {
        var type = new TsUnionType([
            new TsPrimitiveType("string", default),
            new TsPrimitiveType("undefined", default)
        ], default);
        var result = CSharpModelEmitter.MapTypeNode(type, false, "Test", "x", []);
        Assert.Equal("string?", result);
    }

    [Fact]
    public void MapType_UnknownType_ThrowsWithContext()
    {
        var type = new TsNamedType("SomeRandomType", [], new SourcePosition(10, 5));
        var ex = Assert.Throws<InvalidOperationException>(() =>
            CSharpModelEmitter.MapTypeNode(type, false, "MyInterface", "myProp", []));
        Assert.Contains("MyInterface.myProp", ex.Message);
        Assert.Contains("SomeRandomType", ex.Message);
    }

    // -----------------------------------------------------------------------
    // End-to-end pipeline tests
    // -----------------------------------------------------------------------

    [Fact]
    public void EndToEnd_ModelsTs_ParsesAllInterfaces()
    {
        var source = File.ReadAllText(GetModelsPath());
        var (file, diags) = ParseSource(source);
        Assert.Empty(diags);

        // Should find all 18 interfaces
        Assert.Equal(19, file.Interfaces.Count);

        // All 16 allowlisted + 2 ignored
        var names = file.Interfaces.Select(i => i.Name).ToHashSet();
        foreach (var expected in TypeScriptModelsGenerator.AllowlistedTypes)
            Assert.Contains(expected, names);
        foreach (var expected in CSharpModelEmitter.IgnoredInterfaces.Keys)
            Assert.Contains(expected, names);
    }

    [Fact]
    public void EndToEnd_ModelsTs_EmitsWithoutErrors()
    {
        var source = File.ReadAllText(GetModelsPath());
        var (tokens, tokenDiags) = new TsTokenizer(source).Tokenize();
        var (file, parseDiags) = new TsParser(tokens).Parse();
        Assert.Empty(tokenDiags);
        Assert.Empty(parseDiags);

        var result = CSharpModelEmitter.Emit(file, TypeScriptModelsGenerator.AllowlistedTypes);
        Assert.Empty(result.Diagnostics);
        Assert.Contains("partial record ApiIndex", result.Source);
        Assert.Contains("partial record MethodInfo", result.Source);
    }

    [Fact]
    public void EndToEnd_ModelsTs_TypeOverridesMatch()
    {
        var source = File.ReadAllText(GetModelsPath());
        var (tokens, _) = new TsTokenizer(source).Tokenize();
        var (file, _2) = new TsParser(tokens).Parse();

        // Verify all type overrides reference real properties with expected TS types
        foreach (var (ifaceName, props) in CSharpModelEmitter.TypeOverrides)
        {
            var iface = file.Interfaces.First(i => i.Name == ifaceName);
            foreach (var (propName, (_, expectedTs)) in props)
            {
                var member = iface.Members.First(m => m.Name == propName);
                Assert.Equal(expectedTs, member.Type.ToTypeScript());
            }
        }
    }

    [Fact]
    public void EndToEnd_AllExportedInterfaces_AreAccountedFor()
    {
        var source = File.ReadAllText(GetModelsPath());
        var (file, _) = ParseSource(source);

        foreach (var iface in file.Interfaces.Where(i => i.IsExported))
        {
            var inAllowlist = TypeScriptModelsGenerator.AllowlistedTypes.Contains(iface.Name);
            var inIgnored = CSharpModelEmitter.IgnoredInterfaces.ContainsKey(iface.Name);
            Assert.True(inAllowlist || inIgnored,
                $"Exported interface '{iface.Name}' is neither allowlisted nor explicitly ignored.");
        }
    }

    [Fact]
    public void EndToEnd_ReadonlyProperty_InClassInfo_Generated()
    {
        var source = File.ReadAllText(GetModelsPath());
        var (tokens, _) = new TsTokenizer(source).Tokenize();
        var (file, _2) = new TsParser(tokens).Parse();
        var result = CSharpModelEmitter.Emit(file, TypeScriptModelsGenerator.AllowlistedTypes);

        // "readonly" as property in IndexSignatureInfo
        Assert.Contains("[JsonPropertyName(\"readonly\")]", result.Source);
        // "extends" as property in ClassInfo
        Assert.Contains("[JsonPropertyName(\"extends\")]", result.Source);
    }

    // -----------------------------------------------------------------------
    // Validation tests
    // -----------------------------------------------------------------------

    [Fact]
    public void Validation_UnaccountedExportedInterface_ProducesDiagnostic()
    {
        var source = "export interface Unknown { x: string; }";
        var (tokens, _) = new TsTokenizer(source).Tokenize();
        var (file, _2) = new TsParser(tokens).Parse();

        // Use empty allowlist and empty ignore list
        var result = CSharpModelEmitter.Emit(file, []);
        Assert.Contains(result.Diagnostics, d => d.Contains("Unknown") && d.Contains("neither in the allowlist"));
    }

    // -----------------------------------------------------------------------
    // Helpers
    // -----------------------------------------------------------------------

    private static (TsFile File, IReadOnlyList<TsParser.ParseDiagnostic> Diagnostics) ParseSource(string source)
    {
        var (tokens, _) = new TsTokenizer(source).Tokenize();
        return new TsParser(tokens).Parse();
    }

    private static void AssertTypeText(TsFile file, int memberIndex, string expected)
    {
        var member = file.Interfaces[0].Members[memberIndex];
        Assert.Equal(expected, member.Type.ToTypeScript());
    }

    private static string GetModelsPath()
    {
        // Walk up from test output directory to find models.ts
        var dir = AppContext.BaseDirectory;
        while (dir is not null)
        {
            var candidate = Path.Combine(dir, "src", "PublicApiGraphEngine.TypeScript", "src", "models.ts");
            if (File.Exists(candidate)) return candidate;
            dir = Path.GetDirectoryName(dir);
        }
        // Fallback to known absolute path
        return Path.Combine(
            Path.GetDirectoryName(Path.GetDirectoryName(Path.GetDirectoryName(
                Path.GetDirectoryName(Path.GetDirectoryName(AppContext.BaseDirectory)!)!)!)!),
            "src", "PublicApiGraphEngine.TypeScript", "src", "models.ts");
    }
}
