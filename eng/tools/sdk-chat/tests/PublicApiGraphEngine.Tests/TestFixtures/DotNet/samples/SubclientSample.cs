using TestPackage;

public class SubclientSample
{
    public async Task RunAsync()
    {
        var client = new SampleClient(new Uri("https://example.com"));
        await client.Widgets.ListWidgetsAsync();
    }
}
