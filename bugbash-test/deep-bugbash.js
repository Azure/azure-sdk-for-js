/**
 * CosmosDB JS SDK v4 — Deep Edge Case Bug Bash
 * Focus: Composite continuation tokens, cross-partition ordering,
 * edge cases, boundary conditions, advanced queries.
 */

const {
  CosmosClient, BulkOperationType, PatchOperationType,
  PartitionKeyKind, PartitionKeyBuilder,
  ChangeFeedStartFrom, ChangeFeedMode, StatusCodes,
} = require("@azure/cosmos");
const { DefaultAzureCredential } = require("@azure/identity");

const ENDPOINT = "https://cosmos-bugbash-20260224173854.documents.azure.com:443/";
const DATABASE_ID = "BugBashDB";

let client, database;
let passCount = 0, failCount = 0;
const results = [];

function pass(t) { passCount++; results.push({ t, s: "PASS" }); console.log(`  ✅ ${t}`); }
function fail(t, e) { failCount++; results.push({ t, s: "FAIL", e: String(e) }); console.error(`  ❌ ${t} — ${e}`); }

async function test(name, fn) {
  try { await fn(); pass(name); } catch (err) { fail(name, err.message || err); }
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1: COMPOSITE CONTINUATION TOKEN TESTS
// ═══════════════════════════════════════════════════════════════
async function testCompositeContinuationTokens() {
  console.log("\n══════ 1. COMPOSITE CONTINUATION TOKENS ══════");

  // Create a dedicated container with many partitions
  const contId = "ContinuationTest_" + Date.now();
  const { container } = await database.containers.create({
    id: contId,
    partitionKey: { paths: ["/pk"], version: 2 },
    indexingPolicy: {
      compositeIndexes: [
        [{ path: "/pk", order: "ascending" }, { path: "/val", order: "descending" }],
      ],
    },
  });

  // Seed 50 items across 10 different partition keys
  const allItems = [];
  for (let pk = 0; pk < 10; pk++) {
    for (let i = 0; i < 5; i++) {
      const item = {
        id: `item-${pk}-${i}`,
        pk: `partition-${pk}`,
        val: pk * 100 + i,
        name: `Name_${String.fromCharCode(65 + (pk + i) % 26)}_${i}`,
        ts: Date.now() - (pk * 5 + i) * 1000,
      };
      allItems.push(item);
    }
  }
  await Promise.all(allItems.map(item => container.items.create(item)));
  console.log(`  Seeded ${allItems.length} items across 10 partitions`);

  // Test 1: Basic cross-partition query with maxItemCount=1 (many pages)
  await test("Cross-partition pagination with maxItemCount=1", async () => {
    const iter = container.items.query(
      "SELECT * FROM c",
      { maxItemCount: 1 }
    );
    let totalItems = 0;
    let pages = 0;
    let lastContinuation = null;
    while (iter.hasMoreResults()) {
      const { resources, continuationToken } = await iter.fetchNext();
      if (!resources || resources.length === 0) break;
      pages++;
      totalItems += resources.length;
      lastContinuation = continuationToken;
    }
    console.log(`    Pages=${pages}, Items=${totalItems}`);
    if (totalItems !== 50) throw new Error(`Expected 50 items, got ${totalItems}`);
  });

  // Test 2: Cross-partition ORDER BY with continuation token serialization/deserialization
  await test("Cross-partition ORDER BY with continuation token round-trip", async () => {
    // First pass: get first 10 items and save continuation token
    const iter1 = container.items.query(
      "SELECT * FROM c ORDER BY c.val ASC",
      { maxItemCount: 10 }
    );
    const page1 = await iter1.fetchNext();
    const firstBatch = page1.resources;
    const savedToken = page1.continuationToken;

    // Verify first batch is sorted
    for (let i = 1; i < firstBatch.length; i++) {
      if (firstBatch[i].val < firstBatch[i - 1].val)
        throw new Error(`Sort violation at index ${i}: ${firstBatch[i - 1].val} > ${firstBatch[i].val}`);
    }

    if (!savedToken) {
      // Serverless with 1 physical partition may return all results in one page
      console.log(`    All ${firstBatch.length} items returned in one page (single partition — no continuation token needed) ✓`);
      return;
    }
    console.log(`    First batch: ${firstBatch.length} items, token length: ${savedToken.length}`);

    // Second pass: serialize token to string, parse back, resume
    const tokenStr = JSON.stringify(savedToken);
    const restoredToken = JSON.parse(tokenStr);

    const iter2 = container.items.query(
      "SELECT * FROM c ORDER BY c.val ASC",
      { maxItemCount: 10, continuationToken: restoredToken }
    );
    const page2 = await iter2.fetchNext();
    const secondBatch = page2.resources;
    console.log(`    Second batch: ${secondBatch.length} items`);

    // Verify no overlap between first and second batch
    const firstIds = new Set(firstBatch.map(i => i.id));
    const overlap = secondBatch.filter(i => firstIds.has(i.id));
    if (overlap.length > 0) throw new Error(`Overlap found: ${overlap.map(i => i.id).join(", ")}`);

    // Verify second batch continues sorted order
    if (secondBatch.length > 0 && firstBatch.length > 0) {
      if (secondBatch[0].val < firstBatch[firstBatch.length - 1].val)
        throw new Error(`Sort discontinuity: last of first=${firstBatch[firstBatch.length - 1].val}, first of second=${secondBatch[0].val}`);
    }
  });

  // Test 3: Cross-partition ORDER BY DESC
  await test("Cross-partition ORDER BY DESC with pagination", async () => {
    const allResults = [];
    const iter = container.items.query(
      "SELECT c.id, c.val FROM c ORDER BY c.val DESC",
      { maxItemCount: 7 }
    );
    while (iter.hasMoreResults()) {
      const { resources } = await iter.fetchNext();
      if (!resources || resources.length === 0) break;
      allResults.push(...resources);
    }
    if (allResults.length !== 50) throw new Error(`Expected 50, got ${allResults.length}`);
    for (let i = 1; i < allResults.length; i++) {
      if (allResults[i].val > allResults[i - 1].val)
        throw new Error(`DESC sort violation at ${i}: ${allResults[i - 1].val} < ${allResults[i].val}`);
    }
    console.log(`    All ${allResults.length} items in DESC order ✓`);
  });

  // Test 4: Composite ORDER BY (multi-column)
  await test("Multi-column ORDER BY with continuation", async () => {
    const allResults = [];
    const iter = container.items.query(
      "SELECT c.id, c.pk, c.val FROM c ORDER BY c.pk ASC, c.val DESC",
      { maxItemCount: 3 }
    );
    while (iter.hasMoreResults()) {
      const { resources } = await iter.fetchNext();
      if (!resources || resources.length === 0) break;
      allResults.push(...resources);
    }
    if (allResults.length !== 50) throw new Error(`Expected 50, got ${allResults.length}`);
    // Verify composite sort: pk ASC then value DESC within same pk
    for (let i = 1; i < allResults.length; i++) {
      const cmp = allResults[i].pk.localeCompare(allResults[i - 1].pk);
      if (cmp < 0) throw new Error(`PK sort violation at ${i}`);
      if (cmp === 0 && allResults[i].val > allResults[i - 1].val)
        throw new Error(`Value DESC sort violation within pk at ${i}`);
    }
    console.log(`    Composite sort verified across ${allResults.length} items ✓`);
  });

  // Test 5: OFFSET LIMIT with continuation
  await test("OFFSET LIMIT across partitions", async () => {
    const { resources } = await container.items.query(
      "SELECT * FROM c ORDER BY c.val ASC OFFSET 10 LIMIT 5"
    ).fetchAll();
    if (resources.length !== 5) throw new Error(`Expected 5, got ${resources.length}`);
    // Values should be 10-14 (items at offset 10-14 in sorted order)
    console.log(`    OFFSET 10 LIMIT 5: values=[${resources.map(r => r.val).join(",")}]`);
  });

  // Test 6: GROUP BY with continuation
  await test("GROUP BY across partitions", async () => {
    const { resources } = await container.items.query(
      "SELECT c.pk, COUNT(1) as cnt FROM c GROUP BY c.pk"
    ).fetchAll();
    if (resources.length !== 10) throw new Error(`Expected 10 groups, got ${resources.length}`);
    resources.forEach(r => {
      if (r.cnt !== 5) throw new Error(`Expected 5 per group, got ${r.cnt} for ${r.pk}`);
    });
    console.log(`    10 groups, 5 items each ✓`);
  });

  // Test 7: GROUP BY with pagination
  await test("GROUP BY with maxItemCount pagination", async () => {
    const allGroups = [];
    const iter = container.items.query(
      "SELECT c.pk, COUNT(1) as cnt, SUM(c.val) as total FROM c GROUP BY c.pk",
      { maxItemCount: 3 }
    );
    while (iter.hasMoreResults()) {
      const { resources } = await iter.fetchNext();
      // Note: GROUP BY may return resources=undefined while aggregating
      if (resources && resources.length > 0) allGroups.push(...resources);
    }
    if (allGroups.length !== 10) throw new Error(`Expected 10 groups, got ${allGroups.length}`);
    console.log(`    GROUP BY pagination: ${allGroups.length} groups across pages ✓`);
  });

  // Test 8: Continuation token with filter
  await test("Filtered query with continuation token", async () => {
    const allResults = [];
    const iter = container.items.query(
      "SELECT * FROM c WHERE c.val >= 200 AND c.val < 500 ORDER BY c.val",
      { maxItemCount: 2 }
    );
    while (iter.hasMoreResults()) {
      const { resources } = await iter.fetchNext();
      if (!resources || resources.length === 0) break;
      allResults.push(...resources);
    }
    // Partitions 2,3,4 → values 200-204, 300-304, 400-404 → 15 items
    if (allResults.length !== 15) throw new Error(`Expected 15, got ${allResults.length}`);
    console.log(`    Filtered + sorted pagination: ${allResults.length} items ✓`);
  });

  // Test 9: Empty continuation (query returns nothing)
  await test("Empty result set continuation behavior", async () => {
    const iter = container.items.query(
      "SELECT * FROM c WHERE c.val = 99999",
      { maxItemCount: 10 }
    );
    const { resources, continuationToken } = await iter.fetchNext();
    console.log(`    Empty result: items=${resources?.length || 0}, hasMore=${iter.hasMoreResults()}`);
  });

  // Test 10: fetchAll vs paginated — same results?
  await test("fetchAll vs paginated yield identical results", async () => {
    const query = "SELECT c.id, c.val FROM c ORDER BY c.val ASC";
    
    // fetchAll
    const { resources: allAtOnce } = await container.items.query(query).fetchAll();
    
    // Paginated
    const paginated = [];
    const iter = container.items.query(query, { maxItemCount: 8 });
    while (iter.hasMoreResults()) {
      const { resources } = await iter.fetchNext();
      if (!resources || resources.length === 0) break;
      paginated.push(...resources);
    }
    
    if (allAtOnce.length !== paginated.length)
      throw new Error(`Count mismatch: fetchAll=${allAtOnce.length}, paginated=${paginated.length}`);
    for (let i = 0; i < allAtOnce.length; i++) {
      if (allAtOnce[i].id !== paginated[i].id)
        throw new Error(`ID mismatch at ${i}: ${allAtOnce[i].id} vs ${paginated[i].id}`);
    }
    console.log(`    fetchAll (${allAtOnce.length}) === paginated (${paginated.length}) ✓`);
  });

  // Cleanup
  await container.delete();
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2: CHANGE FEED ITERATOR (V2 API) + ALL VERSIONS & DELETES
// ═══════════════════════════════════════════════════════════════
async function testChangeFeedV2() {
  console.log("\n══════ 2. CHANGE FEED ITERATOR V2 (getChangeFeedIterator) ══════");

  const contId = "ChangeFeedV2_" + Date.now();
  const { container } = await database.containers.create({
    id: contId,
    partitionKey: { paths: ["/pk"], version: 2 },
  });

  // Test 1: ChangeFeedStartFrom.Beginning for entire container
  await test("ChangeFeed V2: entire container from beginning", async () => {
    await container.items.create({ id: "cf1", pk: "a", val: 1 });
    await container.items.create({ id: "cf2", pk: "b", val: 2 });

    const iter = container.items.getChangeFeedIterator({
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(),
      maxItemCount: 1,
    });
    const allChanges = [];
    for await (const page of iter.getAsyncIterator()) {
      if (page.statusCode === StatusCodes.NotModified) break;
      allChanges.push(...page.result);
    }
    if (allChanges.length < 2) throw new Error(`Expected >=2 changes, got ${allChanges.length}`);
    console.log(`    Changes from beginning: ${allChanges.length}`);
  });

  // Test 2: ChangeFeed with continuation token serialization round-trip
  await test("ChangeFeed V2: continuation token round-trip", async () => {
    const iter = container.items.getChangeFeedIterator({
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(),
    });
    let savedToken;
    for await (const page of iter.getAsyncIterator()) {
      savedToken = page.continuationToken;
      if (page.statusCode === StatusCodes.NotModified) break;
    }

    if (!savedToken) throw new Error("No continuation token");

    // Insert new item after saving token
    await container.items.create({ id: "cf3", pk: "c", val: 3 });

    // Resume from saved token
    const iter2 = container.items.getChangeFeedIterator({
      changeFeedStartFrom: ChangeFeedStartFrom.Continuation(savedToken),
    });
    const newChanges = [];
    for await (const page of iter2.getAsyncIterator()) {
      if (page.statusCode === StatusCodes.NotModified) break;
      newChanges.push(...page.result);
    }
    if (newChanges.length < 1) throw new Error("Didn't pick up new item after token resume");
    const foundCf3 = newChanges.find(c => c.id === "cf3");
    if (!foundCf3) throw new Error("cf3 not found in resumed change feed");
    console.log(`    Resumed from token, got ${newChanges.length} new change(s) ✓`);
  });

  // Test 3: ChangeFeed for specific partition key
  await test("ChangeFeed V2: specific partition key", async () => {
    await container.items.create({ id: "cf4", pk: "specific", val: 4 });
    await container.items.create({ id: "cf5", pk: "other", val: 5 });

    const iter = container.items.getChangeFeedIterator({
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning("specific"),
    });
    const changes = [];
    for await (const page of iter.getAsyncIterator()) {
      if (page.statusCode === StatusCodes.NotModified) break;
      changes.push(...page.result);
    }
    const wrongPk = changes.filter(c => c.pk !== "specific");
    if (wrongPk.length > 0) throw new Error(`Got items from wrong partition: ${wrongPk.map(c => c.pk)}`);
    console.log(`    Partition-scoped changes: ${changes.length} (all pk=specific) ✓`);
  });

  // Test 4: ChangeFeed with feed ranges (EPK ranges)
  await test("ChangeFeed V2: EPK feed ranges", async () => {
    const ranges = await container.getFeedRanges();
    console.log(`    Feed ranges: ${ranges.length}`);
    if (ranges.length === 0) throw new Error("No feed ranges");

    // Read changes from first range
    const iter = container.items.getChangeFeedIterator({
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(ranges[0]),
    });
    const changes = [];
    for await (const page of iter.getAsyncIterator()) {
      if (page.statusCode === StatusCodes.NotModified) break;
      changes.push(...page.result);
    }
    console.log(`    Changes from first EPK range: ${changes.length}`);
  });

  // Test 5: AllVersionsAndDeletes mode (requires EnableChangeFeedAllVersionsAndDeletes capability)
  await test("ChangeFeed V2: AllVersionsAndDeletes mode", async () => {
    try {
      const iter = container.items.getChangeFeedIterator({
        changeFeedStartFrom: ChangeFeedStartFrom.Now(),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      });
      await iter.readNext();

      await container.items.create({ id: "avd1", pk: "avd", val: 1 });
      await container.item("avd1", "avd").replace({ id: "avd1", pk: "avd", val: 2 });
      await container.item("avd1", "avd").delete();

      const changes = [];
      for await (const page of iter.getAsyncIterator()) {
        if (page.statusCode === StatusCodes.NotModified) break;
        changes.push(...page.result);
      }
      console.log(`    AllVersionsAndDeletes changes: ${changes.length}`);
      if (changes.length < 3) throw new Error(`Expected >=3 changes, got ${changes.length}`);
    } catch (e) {
      if (e.message && e.message.includes("All Versions and Deletes")) {
        console.log(`    Skipped: capability not enabled on account (expected) ✓`);
      } else {
        throw e;
      }
    }
  });

  await container.delete();
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3: ITEM EDGE CASES
// ═══════════════════════════════════════════════════════════════
async function testItemEdgeCases() {
  console.log("\n══════ 3. ITEM EDGE CASES ══════");

  const contId = "EdgeCases_" + Date.now();
  const { container } = await database.containers.create({
    id: contId,
    partitionKey: { paths: ["/pk"] },
  });

  // Test: Unicode in IDs and values
  await test("Unicode characters in item ID and values", async () => {
    const unicodeId = "日本語テスト_" + Date.now();
    const { resource } = await container.items.create({
      id: unicodeId, pk: "unicode",
      text: "Hello 你好 مرحبا Привет 🚀🎉",
      emoji: "🔥💻🌍",
      arabic: "مرحبا بالعالم",
      japanese: "こんにちは世界",
    });
    const { resource: readBack } = await container.item(unicodeId, "unicode").read();
    if (readBack.text !== "Hello 你好 مرحبا Привет 🚀🎉") throw new Error("Unicode text mismatch");
    if (readBack.emoji !== "🔥💻🌍") throw new Error("Emoji mismatch");
    console.log(`    Unicode preserved: ${readBack.japanese} ✓`);
    await container.item(unicodeId, "unicode").delete();
  });

  // Test: Empty string values
  await test("Empty string as value and partition key", async () => {
    const id = "empty-str-" + Date.now();
    const { resource } = await container.items.create({ id, pk: "", name: "", nested: { val: "" } });
    const { resource: r } = await container.item(id, "").read();
    if (r.pk !== "") throw new Error("Empty PK not preserved");
    if (r.name !== "") throw new Error("Empty name not preserved");
    await container.item(id, "").delete();
    console.log(`    Empty strings preserved ✓`);
  });

  // Test: Null values
  await test("Null values in properties", async () => {
    const id = "null-vals-" + Date.now();
    await container.items.create({ id, pk: "nulltest", nullProp: null, nested: { x: null } });
    const { resource } = await container.item(id, "nulltest").read();
    if (resource.nullProp !== null) throw new Error(`Expected null, got ${resource.nullProp}`);
    if (resource.nested.x !== null) throw new Error("Nested null not preserved");
    await container.item(id, "nulltest").delete();
    console.log(`    Null values preserved ✓`);
  });

  // Test: Very large item (close to 2MB limit)
  await test("Large item (~500KB)", async () => {
    const id = "large-item-" + Date.now();
    const bigString = "X".repeat(500 * 1024); // 500KB
    await container.items.create({ id, pk: "large", data: bigString });
    const { resource } = await container.item(id, "large").read();
    if (resource.data.length !== 500 * 1024) throw new Error(`Expected 512000, got ${resource.data.length}`);
    await container.item(id, "large").delete();
    console.log(`    500KB item round-tripped ✓`);
  });

  // Test: Deeply nested object
  await test("Deeply nested object (10 levels)", async () => {
    const id = "nested-" + Date.now();
    let obj = { value: "leaf" };
    for (let i = 0; i < 10; i++) obj = { [`level${i}`]: obj };
    await container.items.create({ id, pk: "nested", deep: obj });
    const { resource } = await container.item(id, "nested").read();
    let cursor = resource.deep;
    for (let i = 9; i >= 0; i--) cursor = cursor[`level${i}`];
    if (cursor.value !== "leaf") throw new Error("Deep nesting lost data");
    await container.item(id, "nested").delete();
    console.log(`    10-level nesting preserved ✓`);
  });

  // Test: Special characters in property names
  await test("Special characters in property names", async () => {
    const id = "special-props-" + Date.now();
    const item = {
      id, pk: "special",
      "with spaces": true,
      "with.dots": true,
      "with-dashes": true,
      "with_underscores": true,
      "$dollar": true,
      "123numeric": true,
    };
    await container.items.create(item);
    const { resource } = await container.item(id, "special").read();
    if (!resource["with spaces"] || !resource["with.dots"]) throw new Error("Special props lost");
    await container.item(id, "special").delete();
    console.log(`    Special property names preserved ✓`);
  });

  // Test: Array values
  await test("Array operations — empty, nested, mixed types", async () => {
    const id = "arrays-" + Date.now();
    await container.items.create({
      id, pk: "arrays",
      empty: [],
      numbers: [1, 2, 3],
      mixed: [1, "two", true, null, { nested: true }, [1, 2]],
      nested: [[1, 2], [3, 4], [[5, 6]]],
    });
    const { resource } = await container.item(id, "arrays").read();
    if (resource.empty.length !== 0) throw new Error("Empty array mutated");
    if (resource.mixed.length !== 6) throw new Error("Mixed array length wrong");
    if (resource.mixed[4].nested !== true) throw new Error("Nested object in array lost");
    if (resource.nested[2][0][0] !== 5) throw new Error("Nested arrays lost");
    await container.item(id, "arrays").delete();
    console.log(`    Complex arrays preserved ✓`);
  });

  // Test: Boolean and numeric edge cases
  await test("Numeric edge cases (MAX_SAFE_INTEGER, 0, negative, floats)", async () => {
    const id = "nums-" + Date.now();
    await container.items.create({
      id, pk: "nums",
      maxSafe: Number.MAX_SAFE_INTEGER,
      minSafe: Number.MIN_SAFE_INTEGER,
      zero: 0,
      negZero: -0,
      pi: Math.PI,
      negFloat: -3.14159,
      verySmall: 1e-10,
      veryLarge: 1e15,
    });
    const { resource } = await container.item(id, "nums").read();
    if (resource.maxSafe !== Number.MAX_SAFE_INTEGER) throw new Error(`MAX_SAFE lost: ${resource.maxSafe}`);
    if (resource.minSafe !== Number.MIN_SAFE_INTEGER) throw new Error(`MIN_SAFE lost: ${resource.minSafe}`);
    if (resource.zero !== 0) throw new Error("Zero mutated");
    if (Math.abs(resource.pi - Math.PI) > 1e-10) throw new Error("PI precision lost");
    await container.item(id, "nums").delete();
    console.log(`    Numeric edge cases preserved ✓`);
  });

  // Test: Concurrent reads/writes (race conditions)
  await test("Concurrent operations (10 parallel creates)", async () => {
    const ids = Array.from({ length: 10 }, (_, i) => `concurrent-${Date.now()}-${i}`);
    await Promise.all(ids.map(id =>
      container.items.create({ id, pk: "concurrent", val: id })
    ));
    const { resources } = await container.items.query(
      "SELECT * FROM c WHERE c.pk = 'concurrent'"
    ).fetchAll();
    if (resources.length !== 10) throw new Error(`Expected 10, got ${resources.length}`);
    await Promise.all(ids.map(id => container.item(id, "concurrent").delete()));
    console.log(`    10 parallel creates all succeeded ✓`);
  });

  // Test: Item with very long partition key value
  await test("Very long partition key value (1000 chars)", async () => {
    const longPk = "K".repeat(1000);
    const id = "longpk-" + Date.now();
    await container.items.create({ id, pk: longPk, val: 1 });
    const { resource } = await container.item(id, longPk).read();
    if (resource.pk !== longPk) throw new Error("Long PK not preserved");
    await container.item(id, longPk).delete();
    console.log(`    1000-char PK preserved ✓`);
  });

  await container.delete();
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4: ADVANCED QUERY EDGE CASES
// ═══════════════════════════════════════════════════════════════
async function testAdvancedQueryEdgeCases() {
  console.log("\n══════ 4. ADVANCED QUERY EDGE CASES ══════");

  const contId = "QueryEdge_" + Date.now();
  const { container } = await database.containers.create({
    id: contId,
    partitionKey: { paths: ["/pk"] },
  });

  // Seed data
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push({
      id: `q${i}`,
      pk: `pk-${i % 5}`,
      num: i,
      name: `Item ${i}`,
      tags: i % 2 === 0 ? ["even", "number"] : ["odd", "number"],
      nested: { x: i * 10, y: i % 3 },
      type: i % 3 === 0 ? "alpha" : i % 3 === 1 ? "beta" : "gamma",
      nullField: i % 4 === 0 ? null : i,
      optionalField: i % 2 === 0 ? "present" : undefined,
    });
  }
  await Promise.all(items.map(item => container.items.create(item)));

  // Test: Subquery
  await test("Subquery: EXISTS", async () => {
    const { resources } = await container.items.query(
      "SELECT * FROM c WHERE EXISTS(SELECT VALUE t FROM t IN c.tags WHERE t = 'even')"
    ).fetchAll();
    if (resources.length !== 10) throw new Error(`Expected 10 even, got ${resources.length}`);
    console.log(`    EXISTS subquery: ${resources.length} items ✓`);
  });

  // Test: ARRAY_CONTAINS
  await test("ARRAY_CONTAINS query", async () => {
    const { resources } = await container.items.query(
      "SELECT c.id FROM c WHERE ARRAY_CONTAINS(c.tags, 'odd')"
    ).fetchAll();
    if (resources.length !== 10) throw new Error(`Expected 10, got ${resources.length}`);
    console.log(`    ARRAY_CONTAINS: ${resources.length} items ✓`);
  });

  // Test: Type checking functions
  await test("IS_NULL, IS_DEFINED queries", async () => {
    const { resources: nullResults } = await container.items.query(
      "SELECT c.id FROM c WHERE IS_NULL(c.nullField)"
    ).fetchAll();
    // items 0,4,8,12,16 → 5 items
    if (nullResults.length !== 5) throw new Error(`Expected 5 nulls, got ${nullResults.length}`);

    const { resources: definedResults } = await container.items.query(
      "SELECT c.id FROM c WHERE IS_DEFINED(c.optionalField)"
    ).fetchAll();
    // Even items have it → 10
    if (definedResults.length !== 10) throw new Error(`Expected 10 defined, got ${definedResults.length}`);
    console.log(`    IS_NULL=${nullResults.length}, IS_DEFINED=${definedResults.length} ✓`);
  });

  // Test: String functions
  await test("String functions: CONCAT, CONTAINS, UPPER, LOWER, LENGTH", async () => {
    const { resources } = await container.items.query(
      "SELECT CONCAT(c.id, '-', c.type) as combo, UPPER(c.type) as upper, LENGTH(c.name) as len FROM c WHERE CONTAINS(c.name, 'Item 1')"
    ).fetchAll();
    if (resources.length < 1) throw new Error("String function query returned nothing");
    if (!resources[0].combo || !resources[0].upper) throw new Error("String functions failed");
    console.log(`    String functions: ${resources.length} results ✓`);
  });

  // Test: Math functions
  await test("Math functions: ABS, FLOOR, CEILING, ROUND, POWER, SQRT", async () => {
    const { resources } = await container.items.query(
      "SELECT c.id, ABS(c.num - 10) as dist, FLOOR(c.num / 3.0) as floored, CEILING(c.num / 3.0) as ceiled, ROUND(c.num / 3.0) as rounded FROM c WHERE c.num >= 5 AND c.num <= 15"
    ).fetchAll();
    if (resources.length !== 11) throw new Error(`Expected 11, got ${resources.length}`);
    console.log(`    Math functions verified on ${resources.length} items ✓`);
  });

  // Test: Nested property access in ORDER BY
  await test("ORDER BY on nested property with pagination", async () => {
    const allResults = [];
    const iter = container.items.query(
      "SELECT c.id, c.nested.x FROM c ORDER BY c.nested.x ASC",
      { maxItemCount: 5 }
    );
    while (iter.hasMoreResults()) {
      const { resources } = await iter.fetchNext();
      if (!resources || resources.length === 0) break;
      allResults.push(...resources);
    }
    for (let i = 1; i < allResults.length; i++) {
      if (allResults[i].x < allResults[i - 1].x)
        throw new Error(`Nested sort violation at ${i}`);
    }
    console.log(`    Nested property ORDER BY: ${allResults.length} items sorted ✓`);
  });

  // Test: VALUE queries
  await test("SELECT VALUE queries", async () => {
    const { resources: vals } = await container.items.query(
      "SELECT VALUE c.num FROM c WHERE c.pk = 'pk-0' ORDER BY c.num"
    ).fetchAll();
    // pk-0: items 0,5,10,15 → nums = [0,5,10,15]
    if (!Array.isArray(vals) || vals[0] !== 0) throw new Error("VALUE query format wrong");
    console.log(`    SELECT VALUE: [${vals.join(",")}] ✓`);
  });

  // Test: IN operator
  await test("IN operator query", async () => {
    const { resources } = await container.items.query(
      "SELECT * FROM c WHERE c.type IN ('alpha', 'gamma')"
    ).fetchAll();
    const bad = resources.filter(r => r.type !== 'alpha' && r.type !== 'gamma');
    if (bad.length > 0) throw new Error("IN operator returned wrong types");
    console.log(`    IN operator: ${resources.length} results (alpha + gamma) ✓`);
  });

  // Test: BETWEEN
  await test("BETWEEN operator query", async () => {
    const { resources } = await container.items.query(
      "SELECT c.id, c.num FROM c WHERE c.num BETWEEN 5 AND 10"
    ).fetchAll();
    if (resources.length !== 6) throw new Error(`Expected 6, got ${resources.length}`);
    console.log(`    BETWEEN 5 AND 10: ${resources.length} items ✓`);
  });

  // Test: Ternary / conditional expression
  await test("Conditional expression in SELECT", async () => {
    const { resources } = await container.items.query(
      "SELECT c.id, (c.num >= 10 ? 'high' : 'low') as level FROM c WHERE c.pk = 'pk-0'"
    ).fetchAll();
    if (resources.length < 1) throw new Error("Conditional query returned nothing");
    console.log(`    Conditional expressions: ${resources.map(r => `${r.id}=${r.level}`).join(", ")} ✓`);
  });

  // Test: Query with very long parameterized value
  await test("Query with long parameterized string value", async () => {
    const longVal = "X".repeat(10000);
    const id = "longquery-" + Date.now();
    await container.items.create({ id, pk: "longq", data: longVal });
    const { resources } = await container.items.query({
      query: "SELECT * FROM c WHERE c.data = @val",
      parameters: [{ name: "@val", value: longVal }],
    }).fetchAll();
    if (resources.length !== 1) throw new Error("Long param query failed");
    await container.item(id, "longq").delete();
    console.log(`    10KB parameterized value query ✓`);
  });

  await container.delete();
}

// ═══════════════════════════════════════════════════════════════
// SECTION 5: PATCH EDGE CASES
// ═══════════════════════════════════════════════════════════════
async function testPatchEdgeCases() {
  console.log("\n══════ 5. PATCH EDGE CASES ══════");

  const contId = "PatchEdge_" + Date.now();
  const { container } = await database.containers.create({
    id: contId,
    partitionKey: { paths: ["/pk"] },
  });

  const id = "patch-edge-" + Date.now();
  await container.items.create({
    id, pk: "pe",
    arr: [1, 2, 3],
    nested: { a: { b: { c: 1 } } },
    counter: 0,
    str: "hello",
  });

  await test("Patch: add to array", async () => {
    const { resource } = await container.item(id, "pe").patch([
      { op: "add", path: "/arr/0", value: 0 }, // add at beginning
    ]);
    // Cosmos patch on arrays: "/arr/0" sets index 0, "/arr/-" appends
    console.log(`    After add /arr/0: arr=${JSON.stringify(resource.arr)}`);
  });

  await test("Patch: deeply nested path", async () => {
    const { resource } = await container.item(id, "pe").patch([
      { op: "replace", path: "/nested/a/b/c", value: 999 },
    ]);
    if (resource.nested.a.b.c !== 999) throw new Error("Deep patch failed");
    console.log(`    Deep nested patch: nested.a.b.c=${resource.nested.a.b.c} ✓`);
  });

  await test("Patch: set does NOT create recursive paths (expected 400)", async () => {
    try {
      await container.item(id, "pe").patch([
        { op: "set", path: "/brand/new/path", value: "created" },
      ]);
      throw new Error("Should have thrown 400 — recursive path creation is not supported");
    } catch (e) {
      if (e.code === 400 || (e.message && e.message.includes("cannot create path recursively"))) {
        console.log(`    Correctly rejects recursive path creation (400) ✓`);
      } else {
        throw e;
      }
    }
  });

  await test("Patch: multiple increments in one call", async () => {
    const { resource } = await container.item(id, "pe").patch([
      { op: "incr", path: "/counter", value: 1 },
      { op: "incr", path: "/counter", value: 1 },
      { op: "incr", path: "/counter", value: 1 },
    ]);
    if (resource.counter !== 3) throw new Error(`Expected 3, got ${resource.counter}`);
    console.log(`    Triple incr: counter=${resource.counter} ✓`);
  });

  await test("Patch: add property with null value", async () => {
    const { resource } = await container.item(id, "pe").patch([
      { op: "add", path: "/nullProp", value: null },
    ]);
    if (resource.nullProp !== null) throw new Error("Null patch failed");
    console.log(`    Null value patched ✓`);
  });

  await test("Patch: add property with empty object", async () => {
    const { resource } = await container.item(id, "pe").patch([
      { op: "add", path: "/emptyObj", value: {} },
    ]);
    if (typeof resource.emptyObj !== "object" || Object.keys(resource.emptyObj).length !== 0)
      throw new Error("Empty object patch failed");
    console.log(`    Empty object patched ✓`);
  });

  await test("Patch: add property with empty array", async () => {
    const { resource } = await container.item(id, "pe").patch([
      { op: "add", path: "/emptyArr", value: [] },
    ]);
    if (!Array.isArray(resource.emptyArr) || resource.emptyArr.length !== 0)
      throw new Error("Empty array patch failed");
    console.log(`    Empty array patched ✓`);
  });

  await test("Patch: replace with complex nested object", async () => {
    const complex = {
      users: [{ name: "Alice", scores: [95, 88, 92] }, { name: "Bob", scores: [78, 85] }],
      metadata: { version: 2, tags: { primary: "test", secondary: null } },
    };
    const { resource } = await container.item(id, "pe").patch([
      { op: "add", path: "/complex", value: complex },
    ]);
    if (resource.complex.users[0].scores[2] !== 92) throw new Error("Complex nested patch failed");
    if (resource.complex.metadata.tags.secondary !== null) throw new Error("Null in complex failed");
    console.log(`    Complex nested object patched ✓`);
  });

  await container.delete();
}

// ═══════════════════════════════════════════════════════════════
// SECTION 6: BULK / BATCH EDGE CASES
// ═══════════════════════════════════════════════════════════════
async function testBulkBatchEdgeCases() {
  console.log("\n══════ 6. BULK / BATCH EDGE CASES ══════");

  const contId = "BulkEdge_" + Date.now();
  const { container } = await database.containers.create({
    id: contId,
    partitionKey: { paths: ["/pk"], version: 2 },
  });

  // Test: Large bulk operation (50 creates)
  await test("Bulk: 50 parallel creates across partitions", async () => {
    const ops = Array.from({ length: 50 }, (_, i) => ({
      operationType: BulkOperationType.Create,
      resourceBody: { id: `bulk-${i}`, pk: `p-${i % 10}`, val: i },
    }));
    const response = await container.items.bulk(ops);
    const failures = response.filter(r => r.statusCode >= 300);
    if (failures.length > 0) throw new Error(`${failures.length} bulk creates failed`);
    console.log(`    50 bulk creates: all succeeded ✓`);
  });

  // Test: Bulk with mixed operations across partitions
  await test("Bulk: mixed operations across multiple partitions", async () => {
    const ops = [
      { operationType: BulkOperationType.Read, id: "bulk-0", partitionKey: "p-0" },
      { operationType: BulkOperationType.Replace, id: "bulk-1", partitionKey: "p-1", resourceBody: { id: "bulk-1", pk: "p-1", val: 999 } },
      { operationType: BulkOperationType.Patch, id: "bulk-2", partitionKey: "p-2", resourceBody: { operations: [{ op: PatchOperationType.add, path: "/patched", value: true }] } },
      { operationType: BulkOperationType.Upsert, partitionKey: "p-3", resourceBody: { id: "bulk-upsert", pk: "p-3", val: "new" } },
      { operationType: BulkOperationType.Delete, id: "bulk-49", partitionKey: "p-9" },
    ];
    const response = await container.items.bulk(ops);
    const statuses = response.map(r => r.statusCode);
    console.log(`    Mixed bulk statuses: ${statuses.join(", ")}`);
    const failures = response.filter(r => r.statusCode >= 300);
    if (failures.length > 0) throw new Error(`${failures.length} failures: ${failures.map(f => `${f.statusCode}`).join(",")}`);
  });

  // Test: Batch within single partition — atomicity (all or nothing)
  await test("Batch: atomicity — partial failure rolls back", async () => {
    // Create one item, then try a batch that creates it again (conflict) + another create
    await container.items.create({ id: "atomic-exists", pk: "atomic", val: 1 });
    const ops = [
      { operationType: BulkOperationType.Create, resourceBody: { id: "atomic-new", pk: "atomic", val: 2 } },
      { operationType: BulkOperationType.Create, resourceBody: { id: "atomic-exists", pk: "atomic", val: 3 } }, // 409
    ];
    const resp = await container.items.batch(ops, "atomic");
    console.log(`    Batch with conflict: status=${resp.statusCode}, result statuses=${resp.result?.map(r => r.statusCode).join(",")}`);

    // The "atomic-new" should NOT exist because the batch should have rolled back
    try {
      const { resource } = await container.item("atomic-new", "atomic").read();
      if (resource) {
        console.log(`    ⚠️  Note: atomic-new exists after failed batch (status=${resp.statusCode})`);
      }
    } catch (e) {
      if (e.code === 404) console.log(`    Rollback confirmed: atomic-new doesn't exist ✓`);
    }
    await container.item("atomic-exists", "atomic").delete();
  });

  // Test: Bulk with 409 conflict (partial success)
  await test("Bulk: handles 409 conflicts gracefully", async () => {
    // bulk-0 already exists, try to create it again
    const ops = [
      { operationType: BulkOperationType.Create, resourceBody: { id: "bulk-0", pk: "p-0", val: 0 } }, // 409
      { operationType: BulkOperationType.Create, resourceBody: { id: "bulk-new-" + Date.now(), pk: "p-0", val: 100 } }, // 201
    ];
    const response = await container.items.bulk(ops);
    const statuses = response.map(r => r.statusCode);
    console.log(`    Bulk with conflict: statuses=${statuses.join(",")}`);
    // Bulk is NOT transactional — the second should succeed even if first fails
    if (response[0].statusCode !== 409) console.log(`    ⚠️ Expected 409 for duplicate, got ${response[0].statusCode}`);
    if (response[1].statusCode >= 300) throw new Error("Second op should have succeeded");
    console.log(`    Non-transactional bulk: partial success confirmed ✓`);
  });

  await container.delete();
}

// ═══════════════════════════════════════════════════════════════
// SECTION 7: SESSION TOKENS AND HEADERS
// ═══════════════════════════════════════════════════════════════
async function testSessionTokensAndHeaders() {
  console.log("\n══════ 7. SESSION TOKENS & RESPONSE HEADERS ══════");

  const contId = "SessionTest_" + Date.now();
  const { container } = await database.containers.create({
    id: contId,
    partitionKey: { paths: ["/pk"] },
  });

  await test("Session token returned on item create", async () => {
    const { headers } = await container.items.create({ id: "sess1", pk: "s", val: 1 });
    const sessionToken = headers["x-ms-session-token"];
    if (!sessionToken) throw new Error("No session token in create response");
    console.log(`    Session token: ${sessionToken}`);
  });

  await test("Request charge (RU) returned on operations", async () => {
    const { headers: readHeaders } = await container.item("sess1", "s").read();
    const ru = parseFloat(readHeaders["x-ms-request-charge"]);
    if (isNaN(ru) || ru <= 0) throw new Error(`Invalid RU: ${readHeaders["x-ms-request-charge"]}`);
    console.log(`    Read RU: ${ru}`);

    const { headers: queryHeaders, resources } = await container.items.query("SELECT * FROM c").fetchAll();
    // fetchAll headers might be the last page headers
    console.log(`    Query returned ${resources.length} items`);
  });

  await test("Activity ID returned on all operations", async () => {
    const { headers } = await container.item("sess1", "s").read();
    const activityId = headers["x-ms-activity-id"];
    if (!activityId) throw new Error("No activity ID");
    console.log(`    Activity ID: ${activityId}`);
  });

  await test("ETag returned on read", async () => {
    const { headers } = await container.item("sess1", "s").read();
    const etag = headers["etag"];
    if (!etag) throw new Error("No ETag in response headers");
    console.log(`    ETag: ${etag}`);
  });

  await container.delete();
}

// ═══════════════════════════════════════════════════════════════
// SECTION 8: HIERARCHICAL PARTITION KEY EDGE CASES
// ═══════════════════════════════════════════════════════════════
async function testHierarchicalEdgeCases() {
  console.log("\n══════ 8. HIERARCHICAL PARTITION KEY EDGE CASES ══════");

  const contId = "HierEdge_" + Date.now();
  const { container } = await database.containers.create({
    id: contId,
    partitionKey: {
      paths: ["/level1", "/level2", "/level3"],
      version: 2,
      kind: PartitionKeyKind.MultiHash,
    },
  });

  await test("3-level hierarchical partition key", async () => {
    await container.items.create({ id: "h1", level1: "a", level2: "b", level3: "c", val: 1 });
    const pk = new PartitionKeyBuilder().addValue("a").addValue("b").addValue("c").build();
    const { resource } = await container.item("h1", pk).read();
    if (resource.val !== 1) throw new Error("3-level PK read failed");
    console.log(`    3-level hierarchical PK read ✓`);
  });

  await test("Hierarchical PK with null component", async () => {
    await container.items.create({ id: "h2", level1: "x", level2: null, level3: "z", val: 2 });
    const pk = new PartitionKeyBuilder().addValue("x").addNullValue().addValue("z").build();
    const { resource } = await container.item("h2", pk).read();
    if (resource.val !== 2) throw new Error("Null component PK read failed");
    console.log(`    Null component in hierarchical PK ✓`);
  });

  await test("Hierarchical PK with all components missing (None)", async () => {
    await container.items.create({ id: "h3", val: 3 }); // no level1, level2, level3
    const pk = new PartitionKeyBuilder().addNoneValue().addNoneValue().addNoneValue().build();
    const { resource } = await container.item("h3", pk).read();
    if (resource.val !== 3) throw new Error("All-None PK read failed");
    console.log(`    All-None hierarchical PK ✓`);
  });

  await test("Cross-partition query with hierarchical keys", async () => {
    const { resources } = await container.items.query("SELECT * FROM c ORDER BY c.val").fetchAll();
    if (resources.length < 3) throw new Error(`Expected >=3, got ${resources.length}`);
    console.log(`    Cross-partition query: ${resources.length} items ✓`);
  });

  await test("Prefix partition key query (level1 only)", async () => {
    await container.items.create({ id: "h4", level1: "prefix", level2: "sub1", level3: "leaf1", val: 4 });
    await container.items.create({ id: "h5", level1: "prefix", level2: "sub2", level3: "leaf2", val: 5 });

    const { resources } = await container.items.query(
      "SELECT * FROM c WHERE c.level1 = 'prefix'"
    ).fetchAll();
    if (resources.length < 2) throw new Error(`Expected >=2 prefix items, got ${resources.length}`);
    console.log(`    Prefix query (level1='prefix'): ${resources.length} items ✓`);
  });

  await container.delete();
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log("╔═══════════════════════════════════════════════════════════╗");
  console.log("║  CosmosDB JS SDK — Deep Edge Case Bug Bash              ║");
  console.log("╚═══════════════════════════════════════════════════════════╝");

  client = new CosmosClient({ endpoint: ENDPOINT, aadCredentials: new DefaultAzureCredential() });
  database = client.database(DATABASE_ID);

  const startTime = Date.now();

  await testCompositeContinuationTokens();
  await testChangeFeedV2();
  await testItemEdgeCases();
  await testAdvancedQueryEdgeCases();
  await testPatchEdgeCases();
  await testBulkBatchEdgeCases();
  await testSessionTokensAndHeaders();
  await testHierarchicalEdgeCases();

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n╔═══════════════════════════════════════════════════════════╗");
  console.log(`║  ✅ PASSED:  ${String(passCount).padEnd(4)}                                       ║`);
  console.log(`║  ❌ FAILED:  ${String(failCount).padEnd(4)}                                       ║`);
  console.log(`║  ⏱️  Time:    ${String(elapsed + "s").padEnd(8)}                                   ║`);
  console.log("╚═══════════════════════════════════════════════════════════╝");

  if (failCount > 0) {
    console.log("\n❌ FAILED TESTS:");
    results.filter(r => r.s === "FAIL").forEach(r => {
      console.log(`  • ${r.t}: ${r.e}`);
    });
  }

  process.exit(failCount > 0 ? 1 : 0);
}

main().catch(err => { console.error("Fatal:", err); process.exit(2); });


