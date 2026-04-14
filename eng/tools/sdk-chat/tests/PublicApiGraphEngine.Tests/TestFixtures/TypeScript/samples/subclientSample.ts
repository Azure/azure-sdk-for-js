import { SampleClient } from "../src/sampleClient";

async function main(): Promise<void> {
    const client = new SampleClient("https://example.com");
    const widgets = client.widgets.listWidgets();
    console.log(widgets.length);
}

main().catch(console.error);
