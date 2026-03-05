package sample

import "context"

func ExampleWidgetsClient_ListWidgets() {
	client, _ := NewSampleClient("https://example.com", nil)
	_, _ = client.Widgets.ListWidgets(context.Background())
}
