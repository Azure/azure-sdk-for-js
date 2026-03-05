// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using System.Text.Json.Serialization;

namespace TestPackage;

/// <summary>
/// A client that references types from System.Text.Json (an external NuGet package).
/// The source-parsing enginr cannot resolve these types because it doesn't load
/// the System.Text.Json assembly — they appear as TypeKind.Error and get silently dropped.
/// The compiled engine loads the DLL where all references are resolved.
/// </summary>
public class JsonServiceClient
{
    /// <summary>Gets the serializer options.</summary>
    /// <remarks>
    /// SOURCE LIMITATION: The source engine sees "JsonSerializerOptions" as a raw string.
    /// It cannot verify this is from System.Text.Json, and if the NuGet DLL isn't restored,
    /// the Roslyn semantic model marks it as TypeKind.Error.
    /// COMPILED: The DLL has a resolved TypeRef to System.Text.Json.JsonSerializerOptions.
    /// </remarks>
    public JsonSerializerOptions Options { get; }

    /// <summary>Creates a new client.</summary>
    public JsonServiceClient(JsonSerializerOptions? options = null)
    {
        Options = options ?? new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
    }

    /// <summary>
    /// Serializes a model to JSON.
    /// SOURCE LIMITATION: The generic constraint "where T : IJsonModel" cannot be
    /// semantically verified — the engine doesn't know IJsonModel's assembly.
    /// COMPILED: The generic constraint is embedded in the DLL metadata and fully resolved.
    /// </summary>
    public string Serialize<T>(T model) where T : class
    {
        return JsonSerializer.Serialize(model, Options);
    }

    /// <summary>
    /// Deserializes JSON to a model.
    /// SOURCE LIMITATION: Return type "T?" with nullable annotation in generic context
    /// is ambiguous to the source parser — is T a value type or reference type?
    /// COMPILED: The DLL metadata encodes NullableAttribute precisely.
    /// </summary>
    public T? Deserialize<T>(string json) where T : class
    {
        return JsonSerializer.Deserialize<T>(json, Options);
    }

    /// <summary>
    /// Returns a JsonElement, which is a struct from System.Text.Json.
    /// SOURCE LIMITATION: The source engine cannot determine JsonElement is a struct 
    /// (value type) vs class (reference type) without loading the assembly.
    /// COMPILED: ContainingAssembly metadata reveals the full type definition.
    /// </summary>
    public JsonElement ParseToElement(string json)
    {
        return JsonDocument.Parse(json).RootElement;
    }
}

/// <summary>
/// A model class that uses System.Text.Json attributes.
/// SOURCE LIMITATION: The source engine sees [JsonPropertyName] and [JsonIgnore]
/// as syntax-level attributes but cannot verify they exist in System.Text.Json.
/// It cannot determine that JsonIgnoreCondition.WhenWritingNull is a valid enum value.
/// COMPILED: All attributes are resolved metadata references in the DLL.
/// </summary>
public class ServiceModel
{
    /// <summary>The resource ID.</summary>
    [JsonPropertyName("id")]
    public required string Id { get; init; }

    /// <summary>The display name.</summary>
    [JsonPropertyName("displayName")]
    public required string DisplayName { get; init; }

    /// <summary>Optional metadata, excluded when null.</summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, JsonElement>? Metadata { get; init; }
}

/// <summary>
/// Custom JSON converter — extends JsonConverter{T} from System.Text.Json.
/// SOURCE LIMITATION: The source engine uses the "I" prefix convention to guess
/// whether a base type is a class or interface. "JsonConverter" has no "I" prefix,
/// so it correctly guesses "class". But for generic base types like JsonConverter{T},
/// the engine may not resolve T to the correct type parameter.
/// COMPILED: The DLL metadata contains the exact base type with type arguments.
/// </summary>
public class ServiceModelConverter : JsonConverter<ServiceModel>
{
    /// <summary>Reads and converts the JSON.</summary>
    public override ServiceModel? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        throw new NotImplementedException();
    }

    /// <summary>Writes the JSON.</summary>
    public override void Write(Utf8JsonWriter writer, ServiceModel value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();
        writer.WriteString("id", value.Id);
        writer.WriteString("displayName", value.DisplayName);
        writer.WriteEndObject();
    }
}
