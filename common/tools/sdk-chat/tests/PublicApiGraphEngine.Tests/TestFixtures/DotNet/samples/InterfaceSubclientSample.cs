using TestPackage;

public class InterfaceSubclientSample
{
    public async Task RunAsync()
    {
        var client = new InterfaceClient(new Uri("https://example.com"));
        await client.Recommendations.ListRecommendationsAsync();
    }
}
