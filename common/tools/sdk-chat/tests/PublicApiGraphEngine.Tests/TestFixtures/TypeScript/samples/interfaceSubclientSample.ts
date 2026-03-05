import { InterfaceClient } from "../src/sampleClient";

async function main(): Promise<void> {
    const client = new InterfaceClient("https://example.com");
    const recommendations = client.recommendations.listRecommendations();
    console.log(recommendations.length);
}

main().catch(console.error);
