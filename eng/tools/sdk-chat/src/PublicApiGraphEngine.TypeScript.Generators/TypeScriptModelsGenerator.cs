// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Text;

namespace PublicApiGraphEngine.TypeScript.Generators;

/// <summary>
/// Roslyn incremental source generator that produces C# model records from models.ts.
///
/// Pipeline: models.ts → Tokenizer → Parser (recursive descent) → AST → Emitter → C# records.
///
/// The tokenizer converts source text into a token stream with line/column positions.
/// The parser uses a formal grammar to produce a typed AST (no regex, no line splitting).
/// The emitter maps AST type nodes to C# types with fail-closed behavior and validates
/// that all configuration tables reference actual properties in the parsed interfaces.
/// </summary>
[Generator(LanguageNames.CSharp)]
public class TypeScriptModelsGenerator : IIncrementalGenerator
{
    /// <summary>Only these interfaces are part of the JSON wire contract.</summary>
    internal static readonly HashSet<string> AllowlistedTypes =
    [
        "MethodInfo", "PropertyInfo", "IndexSignatureInfo", "ConstructorInfo",
        "ParameterInfo", "ClassInfo", "CallSignatureInfo", "ConstructSignatureInfo",
        "InterfaceInfo", "EnumInfo", "TypeAliasInfo", "FunctionInfo", "VariableInfo",
        "ModuleInfo", "NamespaceInfo", "ApiIndex", "DependencyInfo",
    ];

    private static readonly DiagnosticDescriptor GenerationFailed = new(
        "TSMODEL001", "TypeScript model generation failed",
        "Failed to generate C# models from models.ts: {0}",
        "CodeGeneration", DiagnosticSeverity.Error, isEnabledByDefault: true);

    private static readonly DiagnosticDescriptor ParseWarning = new(
        "TSMODEL002", "TypeScript parse diagnostic",
        "{0}",
        "CodeGeneration", DiagnosticSeverity.Warning, isEnabledByDefault: true);

    private static readonly DiagnosticDescriptor ValidationWarning = new(
        "TSMODEL003", "TypeScript model validation diagnostic",
        "{0}",
        "CodeGeneration", DiagnosticSeverity.Warning, isEnabledByDefault: true);

    public void Initialize(IncrementalGeneratorInitializationContext context)
    {
        var modelsFile = context.AdditionalTextsProvider
            .Where(static file => Path.GetFileName(file.Path) == "models.ts")
            .Select(static (file, ct) => file.GetText(ct)?.ToString() ?? "");

        context.RegisterSourceOutput(modelsFile, static (ctx, source) =>
        {
            if (string.IsNullOrWhiteSpace(source)) return;

            try
            {
                // Phase 1: Tokenize
                var tokenizer = new TsTokenizer(source);
                var (tokens, tokenDiags) = tokenizer.Tokenize();

                // Report tokenizer diagnostics
                foreach (var diag in tokenDiags)
                {
                    ctx.ReportDiagnostic(Diagnostic.Create(ParseWarning, Location.None,
                        $"{diag.Message} at {diag.Position}"));
                }

                // Phase 2: Parse (recursive descent)
                var parser = new TsParser(tokens);
                var (file, parseDiags) = parser.Parse();

                // Report parse diagnostics
                foreach (var diag in parseDiags)
                {
                    ctx.ReportDiagnostic(Diagnostic.Create(ParseWarning, Location.None,
                        $"{diag.Message} at {diag.Position}"));
                }

                // Phase 3: Emit C# with validation
                var result = CSharpModelEmitter.Emit(file, AllowlistedTypes);

                // Report validation diagnostics
                foreach (var diag in result.Diagnostics)
                {
                    ctx.ReportDiagnostic(Diagnostic.Create(ValidationWarning, Location.None, diag));
                }

                ctx.AddSource("Models.Generated.g.cs", SourceText.From(result.Source, Encoding.UTF8));
            }
            catch (Exception ex)
            {
                ctx.ReportDiagnostic(Diagnostic.Create(GenerationFailed, Location.None, ex.Message));
            }
        });
    }
}
