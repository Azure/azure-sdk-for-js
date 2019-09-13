import * as helloworld from "./helloworld";
import * as helloworldWithLabels from "./helloworldWithLabels";

export async function runAll() {
    await helloworld.run();
    await helloworldWithLabels.run();
}