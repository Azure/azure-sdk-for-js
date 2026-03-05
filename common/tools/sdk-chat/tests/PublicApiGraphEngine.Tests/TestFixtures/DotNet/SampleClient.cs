// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace TestPackage;

/// <summary>
/// A sample client for testing API graphing.
/// Demonstrates public API patterns.
/// </summary>
public class SampleClient : IDisposable
{
    private readonly HttpClient _httpClient;
    private bool _disposed;
    private readonly WidgetClient _widgetClient = new();

    /// <summary>Gets the endpoint URI.</summary>
    public Uri Endpoint { get; }

    /// <summary>Gets the API version.</summary>
    public string ApiVersion { get; init; } = "2024-01-01";

    /// <summary>Gets the widget subclient.</summary>
    public WidgetClient Widgets => _widgetClient;

    /// <summary>
    /// Creates a new instance of <see cref="SampleClient"/>.
    /// </summary>
    /// <param name="endpoint">The service endpoint.</param>
    /// <param name="options">Optional client options.</param>
    public SampleClient(Uri endpoint, SampleClientOptions? options = null)
    {
        Endpoint = endpoint ?? throw new ArgumentNullException(nameof(endpoint));
        _httpClient = new HttpClient();
    }

    /// <summary>
    /// Gets a resource by ID.
    /// </summary>
    /// <param name="id">The resource ID.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>The resource.</returns>
    public async Task<Resource> GetResourceAsync(string id, CancellationToken cancellationToken = default)
    {
        await Task.Delay(1, cancellationToken);
        return new Resource { Id = id, Name = "Test" };
    }

    /// <summary>
    /// Lists all resources.
    /// </summary>
    /// <param name="filter">Optional filter expression.</param>
    /// <returns>An enumerable of resources.</returns>
    public IAsyncEnumerable<Resource> ListResourcesAsync(string? filter = null)
    {
        return AsyncEnumerable.Empty<Resource>();
    }

    /// <summary>
    /// Creates a new resource.
    /// </summary>
    public Task<Resource> CreateResourceAsync(ResourceCreateOptions options, CancellationToken cancellationToken = default)
    {
        return Task.FromResult(new Resource { Id = Guid.NewGuid().ToString(), Name = options.Name });
    }

    /// <inheritdoc />
    public void Dispose()
    {
        if (!_disposed)
        {
            _httpClient.Dispose();
            _disposed = true;
        }
        GC.SuppressFinalize(this);
    }
}

/// <summary>
/// Client with no methods, only subclient properties.
/// </summary>
public class EmptyClient
{
    private readonly WidgetClient _widgetClient = new();

    /// <summary>Gets the widget subclient.</summary>
    public WidgetClient Widgets => _widgetClient;
}

/// <summary>
/// Interface for recommendations operations.
/// </summary>
public interface IRecommendationsClient
{
    /// <summary>Lists recommendations.</summary>
    Task<IReadOnlyList<string>> ListRecommendationsAsync(CancellationToken cancellationToken = default);
}

/// <summary>
/// Implementation for recommendations operations.
/// </summary>
public class RecommendationsClientImpl : IRecommendationsClient
{
    private readonly Uri _endpoint;

    public RecommendationsClientImpl(Uri endpoint)
    {
        _endpoint = endpoint;
    }

    /// <summary>Lists recommendations.</summary>
    public Task<IReadOnlyList<string>> ListRecommendationsAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyList<string>>(new[] { _endpoint + "/recommendations" });
    }
}

/// <summary>
/// Client with interface-typed subclient.
/// </summary>
public class InterfaceClient
{
    /// <summary>Gets the recommendations subclient.</summary>
    public IRecommendationsClient Recommendations { get; }

    public InterfaceClient(Uri endpoint)
    {
        Recommendations = new RecommendationsClientImpl(endpoint);
    }
}

/// <summary>
/// Subclient for widget operations.
/// </summary>
public class WidgetClient
{
    /// <summary>Lists widgets.</summary>
    public Task<IReadOnlyList<string>> ListWidgetsAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyList<string>>(new[] { "widget" });
    }
}

/// <summary>
/// Options for configuring <see cref="SampleClient"/>.
/// </summary>
public class SampleClientOptions
{
    /// <summary>Gets or sets the retry count.</summary>
    public int RetryCount { get; set; } = 3;

    /// <summary>Gets or sets the timeout.</summary>
    public TimeSpan Timeout { get; set; } = TimeSpan.FromSeconds(30);

    /// <summary>The service version.</summary>
    public ServiceVersion Version { get; set; } = ServiceVersion.V2024_01_01;

    /// <summary>Service versions.</summary>
    public enum ServiceVersion
    {
        /// <summary>Version 2023-01-01.</summary>
        V2023_01_01,
        /// <summary>Version 2024-01-01.</summary>
        V2024_01_01
    }
}

/// <summary>
/// Represents a resource.
/// </summary>
public class Resource
{
    /// <summary>Gets or sets the resource ID.</summary>
    public required string Id { get; set; }

    /// <summary>Gets or sets the resource name.</summary>
    public required string Name { get; set; }

    /// <summary>Gets or sets optional tags.</summary>
    public IDictionary<string, string>? Tags { get; set; }

    /// <summary>Gets the created timestamp.</summary>
    public DateTimeOffset CreatedAt { get; init; } = DateTimeOffset.UtcNow;
}

/// <summary>
/// Options for creating a resource.
/// </summary>
public class ResourceCreateOptions
{
    /// <summary>The resource name.</summary>
    public required string Name { get; set; }

    /// <summary>Optional tags.</summary>
    public IDictionary<string, string>? Tags { get; set; }
}

/// <summary>
/// An interface for resource operations.
/// </summary>
public interface IResourceOperations
{
    /// <summary>Gets a resource.</summary>
    Task<Resource> GetAsync(string id, CancellationToken ct = default);

    /// <summary>Deletes a resource.</summary>
    Task DeleteAsync(string id, CancellationToken ct = default);

    /// <summary>Updates a resource.</summary>
    Task<Resource> UpdateAsync(string id, Resource resource, CancellationToken ct = default);
}

/// <summary>
/// Result status enumeration.
/// </summary>
public enum ResultStatus
{
    /// <summary>Operation succeeded.</summary>
    Success,
    /// <summary>Operation failed.</summary>
    Failed,
    /// <summary>Operation is pending.</summary>
    Pending
}

/// <summary>
/// A generic result wrapper.
/// </summary>
/// <typeparam name="T">The value type.</typeparam>
public readonly struct Result<T>
{
    /// <summary>Gets the value.</summary>
    public T Value { get; init; }

    /// <summary>Gets the status.</summary>
    public ResultStatus Status { get; init; }

    /// <summary>Gets the error message if failed.</summary>
    public string? Error { get; init; }

    /// <summary>Creates a success result.</summary>
    public static Result<T> Ok(T value) => new() { Value = value, Status = ResultStatus.Success };

    /// <summary>Creates a failure result.</summary>
    public static Result<T> Fail(string error) => new() { Status = ResultStatus.Failed, Error = error };
}

/// <summary>Delegate invoked when a widget changes.</summary>
public delegate void WidgetChangedHandler(string widgetName, SampleClientOptions options);

/// <summary>Delegate that produces a result asynchronously.</summary>
public delegate Task<Result<T>> AsyncResultProducer<T>(string input, CancellationToken cancellationToken);

/// <summary>
/// Interface with a Default Interface Method (C# 8 DIM).
/// Tests that private/internal DIM members are excluded from the public API surface.
/// </summary>
public interface IAdvancedClient
{
    /// <summary>Public method on the interface.</summary>
    Task<Resource> FetchAsync(string id);

    /// <summary>Default implementation — still public (no access modifier).</summary>
    Task<Resource> FetchWithRetryAsync(string id)
        => FetchAsync(id);

    // Private DIM helper — must NOT appear in graphed API
    private static string FormatId(string id) => id.Trim();
}

/// <summary>
/// Class with a public nested type, a field-like event, and multi-variable consts.
/// </summary>
public class AdvancedService
{
    /// <summary>Constant A.</summary>
    public const int MaxRetries = 5, DefaultTimeout = 30;

    /// <summary>The default endpoint.</summary>
    public static readonly Uri DefaultEndpoint = new("https://example.com");

    /// <summary>Raised when the service state changes.</summary>
    public event EventHandler? StateChanged;

    /// <summary>Does work.</summary>
    public void Execute() { StateChanged?.Invoke(this, EventArgs.Empty); }

    /// <summary>
    /// Nested options type — must be graphed by recursing into the parent type.
    /// </summary>
    public class AdvancedServiceOptions
    {
        /// <summary>Whether to enable logging.</summary>
        public bool EnableLogging { get; set; }
    }
}

/// <summary>
/// A type with operator overloads for testing operator graphing.
/// </summary>
public readonly struct Money
{
    /// <summary>The amount.</summary>
    public decimal Amount { get; init; }

    /// <summary>The currency code.</summary>
    public string Currency { get; init; }

    /// <summary>Creates a new Money value.</summary>
    public Money(decimal amount, string currency)
    {
        Amount = amount;
        Currency = currency;
    }

    /// <summary>Adds two money values.</summary>
    public static Money operator +(Money left, Money right) =>
        new(left.Amount + right.Amount, left.Currency);

    /// <summary>Subtracts two money values.</summary>
    public static Money operator -(Money left, Money right) =>
        new(left.Amount - right.Amount, left.Currency);

    /// <summary>Checks equality.</summary>
    public static bool operator ==(Money left, Money right) =>
        left.Amount == right.Amount && left.Currency == right.Currency;

    /// <summary>Checks inequality.</summary>
    public static bool operator !=(Money left, Money right) => !(left == right);

    /// <summary>Converts from decimal.</summary>
    public static implicit operator Money(decimal amount) => new(amount, "USD");

    /// <summary>Converts to decimal.</summary>
    public static explicit operator decimal(Money money) => money.Amount;

    /// <inheritdoc />
    public override bool Equals(object? obj) => obj is Money m && this == m;

    /// <inheritdoc />
    public override int GetHashCode() => HashCode.Combine(Amount, Currency);
}
