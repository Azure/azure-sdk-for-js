package sample

import "context"

func ExampleEmptyClient_Widgets() {
	client := NewEmptyClient("https://example.com")
	_, _ = client.Widgets.ListWidgets(context.Background())
}
