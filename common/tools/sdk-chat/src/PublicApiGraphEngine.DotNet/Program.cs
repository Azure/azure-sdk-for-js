// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.DotNet;

var options = CliOptions.Parse(args);

if (options.ShowHelp || options.Path is null)
{
    Console.WriteLine(CliOptions.GetHelpText("C#", "PublicApiGraphEngine.DotNet"));
    return options.ShowHelp ? 0 : 1;
}

if (!Directory.Exists(options.Path))
{
    Console.Error.WriteLine($"Directory not found: {options.Path}");
    return 1;
}

var engine = new CSharpPublicApiGraphEngine();
EngineInput input = options.CsprojPath is not null
    ? new EngineInput.DotNetProject(options.CsprojPath)
    : new EngineInput.SourceDirectory(options.Path);
var result = await ((IPublicApiGraphEngine<ApiIndex>)engine).GraphAsync(input, ct: CancellationToken.None);

if (result is EngineResult<ApiIndex>.Failure failure)
{
    Console.Error.WriteLine($"Error: {failure.Error}");
    return 1;
}

var index = ((EngineResult<ApiIndex>.Success)result).Value;
string output;

if (options.OutputJson)
{
    output = engine.ToJson(index, options.Pretty);
}
else
{
    output = engine.ToStubs(index);
}

if (options.OutputFile is not null)
{
    await File.WriteAllTextAsync(options.OutputFile, output);
    Console.Error.WriteLine($"Wrote {output.Length:N0} chars to {options.OutputFile}");
}
else
{
    Console.WriteLine(output);
}

return 0;
