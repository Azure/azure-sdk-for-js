package sample

import "context"

func ExampleInterfaceClient_Recommendations() {
	client := NewInterfaceClient("https://example.com")
	_, _ = client.Recommendations.ListRecommendations(context.Background())
}
