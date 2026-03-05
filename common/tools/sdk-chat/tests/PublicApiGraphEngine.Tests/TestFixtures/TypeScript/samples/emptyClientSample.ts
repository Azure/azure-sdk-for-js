import { EmptyClient } from "../src/sampleClient";

async function main(): Promise<void> {
    const client = new EmptyClient("https://example.com");
    const widgets = client.widgets.listWidgets();
    console.log(widgets.length);
}

main().catch(console.error);
