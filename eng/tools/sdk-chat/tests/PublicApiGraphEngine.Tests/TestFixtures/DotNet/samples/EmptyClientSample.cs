using TestPackage;

public class EmptyClientSample
{
    public async Task RunAsync()
    {
        var client = new EmptyClient();
        await client.Widgets.ListWidgetsAsync();
    }
}
