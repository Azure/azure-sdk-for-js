// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Collections.Immutable;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Text;

namespace PublicApiGraphEngine.TypeScript.Generators;

/// <summary>
/// Roslyn incremental source generator that produces C# model records from models.ts.
///
/// Reads models.ts as an AdditionalFile, parses its TypeScript interface declarations,
/// and emits Models.Generated.g.cs with partial sealed records for each wire-contract type.
/// This eliminates model drift between the TypeScript extraction engine and C# formatter.
/// </summary>
[Generator(LanguageNames.CSharp)]
public class TypeScriptModelsGenerator : IIncrementalGenerator
{
    /// <summary>Only these interfaces are part of the JSON wire contract.</summary>
    private static readonly HashSet<string> AllowlistedTypes =
    [
        "MethodInfo", "PropertyInfo", "IndexSignatureInfo", "ConstructorInfo",
        "ParameterInfo", "ClassInfo", "CallSignatureInfo", "ConstructSignatureInfo",
        "InterfaceInfo", "EnumInfo", "TypeAliasInfo", "FunctionInfo",
        "ModuleInfo", "NamespaceInfo", "ApiIndex", "DependencyInfo",
    ];

    public void Initialize(IncrementalGeneratorInitializationContext context)
    {
        // Find models.ts among AdditionalFiles
        var modelsFile = context.AdditionalTextsProvider
            .Where(static file => Path.GetFileName(file.Path) == "models.ts")
            .Select(static (file, ct) => file.GetText(ct)?.ToString() ?? "");

        context.RegisterSourceOutput(modelsFile, static (ctx, source) =>
        {
            if (string.IsNullOrWhiteSpace(source)) return;

            try
            {
                var interfaces = TypeScriptInterfaceParser.Parse(source);
                var code = CSharpModelEmitter.Emit(interfaces, AllowlistedTypes);
                ctx.AddSource("Models.Generated.g.cs", SourceText.From(code, Encoding.UTF8));
            }
            catch (Exception ex)
            {
                ctx.ReportDiagnostic(Diagnostic.Create(
                    new DiagnosticDescriptor(
                        "TSMODEL001",
                        "TypeScript model generation failed",
                        "Failed to generate C# models from models.ts: {0}",
                        "CodeGeneration",
                        DiagnosticSeverity.Error,
                        isEnabledByDefault: true),
                    Location.None,
                    ex.Message));
            }
        });
    }
}
