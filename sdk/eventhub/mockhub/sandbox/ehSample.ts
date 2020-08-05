import { MockEventHub } from "../src/services/eventHubs";

async function run() {
  const service = new MockEventHub({
    name: "chradek-3-partitions-test",
    partitionCount: 3,
    consumerGroups: ["foo"],
  });

  service.start({
    port: 5671,
  });
}

run();
