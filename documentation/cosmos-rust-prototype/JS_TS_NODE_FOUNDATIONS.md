# JavaScript, TypeScript, and Node.js for one Rust-backed item read

This guide owns the language and runtime concepts needed to implement a
single-item read. The [prototype guide](JS_SDK_RUST_READ_PROTOTYPE.md) owns
the source trace, framework evaluation, Portal questions, implementation gates,
and performance experiment.

Read one bite at a time. There are **approximately 32 bites across the
two guides**: 1-18 here, then 19-32 in the prototype guide. This replaces the
broader 45-concept draft, not a record of lessons completed. Bites 1 and 2
are the opening orientation; rewriting later material does not mean it
has been taught or implemented.

The example is always the customer's database `checkout`, container `orders`,
item `order-42`, and partition-key value `customer-17`.
Use the JavaScript API name `Item.read()`: `read_item` is the corresponding
Python operation, not a method we should add to the JavaScript public API.

## Bite 1 of approximately 32: Where the customer's read runs

The customer already stored one order in Cosmos DB and wants that order back.
They do not want to list every order in `orders` and pick one.

The stored record is an **item**:

```json
{
  "id": "order-42",
  "customerId": "customer-17",
  "status": "submitted"
}
```

The account has a **database** named `checkout`. Inside it, a **container**
named `orders` holds items. The container is partitioned by `/customerId`, so
this item sits with other items whose `customerId` is `customer-17`.

A **point read** is the lookup that uses the item id and that partition-key
value. Those two values are enough. Searching is not required.

The customer's application should not send that lookup as hand-written HTTP.
It uses the SDK package `@azure/cosmos`. The public method is `Item.read()` in
`sdk\cosmosdb\cosmos\src\client\Item\Item.ts`. We will not add a Python-style
`read_item()`.

```ts
const item = client
  .database("checkout")
  .container("orders")
  .item("order-42", "customer-17");

const response = await item.read();
```

`client` is an already configured `CosmosClient`. `await` means this function
waits until the result is ready. How waiting is scheduled is bite 10.

Walk for this call:

```text
Caller has id "order-42" and partition-key value "customer-17"
    -> application calls item.read()
    -> Item in the SDK starts the point read
    -> Cosmos DB returns this item, or not found
```

JavaScript is the language of that application. It can run in more than one
place.

**Node.js** is a program that runs JavaScript outside a browser (on a machine
or in the cloud). That is one **path**: where the SDK process actually runs.

```text
Customer server application -> SDK in Node.js -> Cosmos DB
```

A **browser** is the program that shows a web page. It also runs JavaScript,
with different network and file-loading rules than Node.js. That is the
second path.

The customer's website can call `item.read()` in the page. Then the SDK runs
in the browser. Showing `order-42` on a page is not enough: if Node.js did
the read and sent JSON to the page, only the server ran the SDK.

```text
Customer website -> SDK in that page -> approved network route -> Cosmos DB
```

**Portal Data Explorer** is Microsoft's Cosmos UI. The customer can open it
and look at the same item. It is also a browser page that can call the SDK.
Same path (browser), different **actor**: who owns the page and ships the
files. Public Explorer source shows a browser caller. That source is not the
JavaScript a given Portal session actually downloaded, including which
`@azure/cosmos` version that session resolved.

```text
Portal Data Explorer -> SDK in Portal's page -> approved network route -> Cosmos DB
```

Using Portal does not prove the customer's website can load and run the SDK.
This prototype must work on **both paths**. A Node-only success is not the
complete requirement.

**Established:** the example item; `Item.read()`; two paths (Node.js, browser);
three actors (customer server, customer website, Portal).

**Not this bite:** which files get loaded (bite 2); `await` scheduling
(bite 10); how the request reaches Cosmos (later).

Source: [Item.ts](../../sdk/cosmosdb/cosmos/src/client/Item/Item.ts).

## Bite 2 of approximately 32: What is built and loaded

The customer's application can call `item.read()` only if it can load the SDK.
Loading files is not the point read. Someone must turn source into those files
first.

The SDK is written in **TypeScript**: JavaScript plus checks that run before
the program runs. A **build** is that check-and-write step. It produces files.
It does not contact Cosmos DB and does not return `order-42`.

`package.json` names the package `@azure/cosmos`. After the build, the files
the application loads live under `dist/`. Today they are JavaScript.

The Node.js path and the browser path do not load the same file. In
`sdk\cosmosdb\cosmos\package.json`:

- Browser loads `dist/browser/index.js`.
- Node.js loads `dist/esm/index.js` or `dist/commonjs/index.js`.

Why Node.js has two files is a later bite. What matters now: one package name
is not one file for every path.

Jobs stay separate:

```text
SDK team: TypeScript source -> build -> npm package
Application team: install @azure/cosmos -> put it in the application
Actor: run the application -> call Item.read()
```

**npm** is the package registry and the install tool. A Portal user looking at
`order-42` does not run `npm install`. Portal's own application build puts
browser JavaScript on the page. How that build works is a later bite. Public
Explorer source depends on `@azure/cosmos`; that is not proof of the exact
Portal build a session runs, including which `@azure/cosmos` version it
resolved.

When we add Rust, there is a second compilation: Rust source becomes a file
the **path** must be able to load. A file that only Node.js can load does not
cover the browser path. Which file that is waits until we choose a framework.

**Established:** build is not the read; the two paths already load different
`dist/` files; Rust will add another file each path must load.

**Not this bite:** type-declaration files, `import` versus `require`,
`warp.config.yml`, Webpack, Wasm, C-ABI, NAPI-RS, React Native.

Source: [package.json](../../sdk/cosmosdb/cosmos/package.json).

## Bite 3 of approximately 32: The two values that identify the item

The customer already knows which order they want: `order-42` for customer
`customer-17`. Cosmos DB will not search the `orders` container for them. It
will look in one place, and only if the application names that place correctly.

A **point read** is that lookup. It needs two values, not one.

The first value is the item **id**: `"order-42"`. That is the item's name
inside its partition. Two different customers could each have an item named
`order-42`. The id alone is not enough.

The second value is the **partition-key value**: `"customer-17"`. The container
`orders` is partitioned by `/customerId`, so Cosmos DB stores this order with
the other orders whose `customerId` is `customer-17`. The partition-key value
tells the service which of those groups to open.

Those two strings are what the application already has when it calls:

```ts
container.item("order-42", "customer-17")
```

`Item.ts` stores them on the `Item` object. `read()` then uses that same pair.
Nothing in this call asks Cosmos DB to scan other customers.

**Why the type of the second value matters**

`"customer-17"` is a **string**: text in quotes. `17` is a **number**. They are
not the same value.

If this order was written with `"customerId": "customer-17"` and the caller
passes `17`, the lookup is for a different key. The service does not treat
them as "close enough". The customer would not get this order.

`PartitionKey.ts` is the SDK file that lists which types a partition-key value
may be: string, number, boolean, `null`, or an array of those when the
container has more than one key path. This experiment uses one supplied
**string**, `"customer-17"`.

`false` is the boolean false, not "I skipped the argument". `null` is an
explicit null key, not "I forgot". **Omitted** means the caller did not pass a
key at all (`undefined` in JavaScript).

**Why omitted is a different problem**

Suppose the application writes `.item("order-42")` and leaves out the key.
That is not "find any `order-42`".

`Item.read()` calls `setPartitionKeyIfUndefined` in `extractPartitionKey.ts`.
That function checks `partitionKey === undefined`. Only then does it read the
container's partition-key **definition** — the description that the path is
`/customerId`. It does not search items. It fills in a stand-in for a missing
key so the rest of the existing SDK can continue.

The experimental Rust path must not pretend an omitted key is a successful
point read of `order-42`. Until that path implements omitted keys, it should
refuse them.

Do not write `value || "customer-17"` to "fill in" a missing key. In
JavaScript that also replaces `false`, `0`, and `""`, which are real values.

**What this bite is for**

We will later hand these two values to Rust. If JavaScript already mixed up
string and number, or treated "no argument" as a search, the binding cannot
fix that.

Walk for this experiment:

```text
Caller has id "order-42" and string key "customer-17"
    -> Item stores that pair
    -> read() uses that pair
    -> Cosmos DB looks in the customer-17 partition for order-42
    -> the stored item is returned, or not found
```

**Established:** the point read is identified by id plus partition-key value;
`"customer-17"` is not `17`; omitting the key is not a search.

**Not this bite:** turning the item into JSON text; how Rust stores the key;
arrays of keys.

Sources: [Item.ts](../../sdk/cosmosdb/cosmos/src/client/Item/Item.ts),
[PartitionKey.ts](../../sdk/cosmosdb/cosmos/src/documents/PartitionKey.ts),
[extractPartitionKey.ts](../../sdk/cosmosdb/cosmos/src/extractPartitionKey.ts).

## Bite 4 of approximately 32: Calling a function with those two values

Bite 3 named the two values. They do nothing until the application **asks**
the SDK to use them.

A **function** is a named piece of code the application can run.
`container.item` is a function. `item.read` is a function. Neither is Cosmos
DB by itself; each is how the application starts the next step.

**Parameters** are the names the function uses for its inputs. **Arguments**
are the values the caller actually passes.

In `Item.ts`, `item` is constructed with id and partition key. The application
supplies the arguments `"order-42"` and `"customer-17"`:

```ts
const item = container.item("order-42", "customer-17");
const response = await item.read();
```

Walk:

```text
Caller has the two values from bite 3
    -> calls container.item with those arguments
    -> gets an Item that already holds that pair
    -> calls item.read() with no extra identity arguments
    -> the SDK starts the point read
```

`read()` can take **options** later (timeouts, headers). This experiment still
identifies the item only with the pair already stored on `Item`. `read()` does
not take a second copy of `"customer-17"`.

A function that only builds text (for example joining `customer-17/order-42`)
does not contact Cosmos DB. `item.read()` does, because the SDK implements
that function to start the lookup.

**Established:** the application starts the read by calling functions;
arguments are the bite-3 values; `read()` uses the pair already on `Item`.

**Not this bite:** callbacks (token providers, plugins); arrow-function
syntax; `await` (bite 10); handing the call into Rust.

Source: [Item.ts](../../sdk/cosmosdb/cosmos/src/client/Item/Item.ts).

## Concept 5 of approximately 32: References, copies, and closures

The customer can change an options object after starting a read.
The adapter must not accidentally read the changed values later.

```js
const options = { excludedLocations: ["West US"] };
const alias = options;
const shallowCopy = { ...options };
alias.excludedLocations.push("East US");
```

All three objects/names still refer to the same nested array.
The spread syntax creates a **shallow copy**: a new outer object, not independent
copies of everything inside it. `const` does not freeze the array.

A **closure** is a function retaining access to surrounding variables:

```js
const operationId = "read-1";
const identifyCompletion = () => operationId;
```

This helps match an asynchronous completion to its caller, but retaining the
closure can also keep referenced objects alive. Copy required request inputs
deliberately and release retained callbacks after completion or cleanup.
Do not mutate the caller's options merely to prepare Rust arguments.

**Destructuring** gives selected properties their own names:

```js
const { resource, statusCode } = response;
```

This does not make `resource` an independent copy of the order object.
The syntax appears in the SDK's request and response preparation.

Source: [JavaScript closures][closures], [spread syntax][spread].

## Concept 6 of approximately 32: Classes and the lifetime of a client

A **class** defines objects with state and methods.
An **instance** is one such object; a **constructor** initializes it.
A **method** is a function on that object.

```js
class OrderReference {
  constructor(id) {
    this.id = id;
  }

  describe() {
    return this.id;
  }
}
```

This is a teaching class, not an SDK replacement. `this` refers to the receiving
instance. Passing an ordinary method as an unbound callback can lose that
receiver; do not assume a retained credential method will still have its `this`.

In TypeScript classes, `public` and `private` describe access restrictions
checked by TypeScript. `readonly` prevents reassignment through that typed
property, not all mutation of nested values. A `get` accessor computes a
property when read; `response.requestCharge` is one SDK example.

The real `CosmosClient`, `Database`, `Container`, and `Item` are different
objects. An `Item` identifies an item; creating the reference is not the same
as fetching its body.

Reuse one configured client for the measured reads. The proposed Rust runtime
and driver must also survive across reads. Recreating them per call measures
setup and discards useful state.

Source: [CosmosClient.ts](../../sdk/cosmosdb/cosmos/src/CosmosClient.ts),
[Item.ts](../../sdk/cosmosdb/cosmos/src/client/Item/Item.ts).

## Concept 7 of approximately 32: Imports and environment-specific modules

A **module** exposes or consumes code through exports and imports.

```ts
import { CosmosClient } from "@azure/cosmos";
import type { ItemResponse } from "@azure/cosmos";
```

The first import obtains a runtime value. `import type` supplies only
TypeScript information and is removed from emitted JavaScript.
A Node-specific type import is therefore not itself a browser runtime dependency.

**ES modules** use `import`/`export`; **CommonJS** commonly uses `require`.
The SDK supplies both Node arrangements plus its browser entry.
An internal `.js` import in a `.ts` file names the eventual JavaScript module;
the repository's build resolves its TypeScript source.

A **conditional export** selects package entry files for a consuming environment.
The prototype must keep native loaders out of browser imports. Test the packed
package through the application build, not only a direct import of a local file.

`await import(...)` can defer loading a module. It moves initialization cost
to that point; it does not remove it. A missing native/Wasm file must fail
explicitly on the selected experimental path.

Source: [package exports](../../sdk/cosmosdb/cosmos/package.json),
[TypeScript modules][ts-modules].

## Concept 8 of approximately 32: TypeScript checks do not validate network data

The customer wants mistakes such as a numeric order ID caught before execution.
An **interface** describes an expected shape:

```ts
interface Order {
  id: string;
  customerId: string;
  status: string;
}
```

`: string` is a type annotation. TypeScript can also infer types from values.
These checks do not run inside Cosmos DB or make Rust validate this interface.

`value?: string` permits omission. `string | undefined` is a **union** of
possible types. A runtime check such as `typeof value === "string"` narrows
the possibilities. `unknown` requires checking before use; `any` disables
many useful checks.

`value as Order` tells the compiler to trust the programmer. It does not
transform or validate the value. Validate the experimental binding's inputs
because callers can use plain JavaScript without TypeScript checking.

`response.resource?.id` uses **optional chaining**: if `resource` is absent or
null, the expression returns undefined instead of accessing `id`.
The `??` operator substitutes a fallback only for null/undefined, unlike `||`.
Neither operator justifies replacing a semantically meaningful null partition
key or missing service metadata with an invented default.

Source: [TypeScript everyday types][ts-types].

## Concept 9 of approximately 32: Generics describe the response, not its parser

A **generic** supplies a type parameter to reusable code.
The current public method includes:

```ts
public async read<T extends ItemDefinition = any>(
  options: RequestOptions = {},
): Promise<ItemResponse<T>>
```

This is a signature excerpt, not a complete function.
`T` is the caller's selected item type, constrained by `ItemDefinition`.
`= any` is the existing default. `options = {}` supplies an empty options object
when the argument is omitted/undefined; it does not make arbitrary null input valid.

```ts
const response = await item.read<Order>();
```

Here `item` is the configured `Item` from Concept 1.
`ItemResponse<Order>` includes operation metadata and a possibly absent
`resource`. It does not create an `Order` class instance.
The response also retains an `item` reference for subsequent operations.

`T & Resource` in the implementation is an **intersection type**: the type
combines the customer's fields with SDK resource fields. It is not a runtime
merge of two objects. TypeScript's `extends` here constrains `T`; it does not
make the returned JSON inherit from a customer class.

Rust must return enough information to construct that real SDK response.
Returning only an order-shaped object is not API compatibility.

Sources: [ItemResponse.ts](../../sdk/cosmosdb/cosmos/src/client/Item/ItemResponse.ts),
[ResourceResponse.ts](../../sdk/cosmosdb/cosmos/src/request/ResourceResponse.ts).

## Concept 10 of approximately 32: Promises, await, and errors

The read cannot immediately return an order while the network is still busy.
A Promise begins pending and then **settles**: it fulfills with a value or
rejects with a reason.

An `async` JavaScript function returns a Promise. `await` suspends that
function's continuation while it waits; it does not move all its code to a
background thread.

```ts
async function readOrder(item: import("@azure/cosmos").Item) {
  const response = await item.read<Order>();
  if (response.statusCode === 404) {
    return response;
  }
  if (response.statusCode !== 200 || response.resource === undefined) {
    throw new Error("The order read did not return the expected response.");
  }
  return response;
}
```

The caller handles a rejection with `try`/`catch` or propagates it.
Do not turn a rejected authorization/network request into an empty successful
order. The current JS `Item.read` catches a 404 and returns an `ItemResponse`;
not every non-success status rejects. Preserve this JS behavior rather than
copying Python's exception convention.

Resolving the submission Promise before Rust has completed the operation
would measure submission, not read latency.

Source: [Item.read](../../sdk/cosmosdb/cosmos/src/client/Item/Item.ts),
[async functions][async-functions].

## Concept 11 of approximately 32: Node's event loop is not a Rust executor

The server must handle other work while the order read waits.
The **event loop** runs JavaScript callbacks and continuations. Long synchronous
work on that thread delays them, even when a surrounding function is `async`.

Node also has a **libuv worker pool** for selected blocking operations.
`worker_threads` creates separate JavaScript execution contexts.
Neither is automatically the scheduler for a Rust asynchronous driver.

**Concurrency** means multiple operations are in progress. It does not imply
simultaneous JavaScript execution:

```js
const first = item.read();
const second = item.read();
const responses = await Promise.all([first, second]);
```

Both calls target the same read-only example. `Promise.all` rejects if an input
rejects, but does not cancel the other operation.
The load generator must also limit outstanding work; starting unlimited
Promises can exhaust memory while making a throughput number misleading.

For the native prototype, prefer running asynchronous driver work on its Rust
executor and scheduling completion onto JavaScript. Blocking a libuv worker
for every pending network read is a different design with a queue to measure,
not equivalent to nonblocking execution.

Source: [Node event-loop guidance][event-loop].

## Concept 12 of approximately 32: Bytes, strings, and response copies

The service sends an encoded body; the application consumes JavaScript values.
A **byte** is a unit of binary data. **UTF-8** encodes text using one or more
bytes per character.

```js
const text = '{"id":"order-42","note":"caf\u00e9"}';
const bytes = new TextEncoder().encode(text);
const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
const order = JSON.parse(decoded);
```

`Uint8Array` represents a view of bytes and works in browser code.
Node's `Buffer` is also a byte-oriented type, but is not automatically a
browser global. Respect a view's byte offset and length rather than passing
its entire underlying allocation.

The proposed response path must state where it converts the driver's supported
body representation into JavaScript:

```text
Driver result -> owned/retained bytes -> UTF-8 JSON text -> JavaScript object
```

Do not assume a Gateway V2 wire frame is JSON text. Its protocol decoding belongs
to the driver. Count actual copies and parsing steps at the binding boundary.
Avoid parsing an order into an application-specific Rust struct merely to
serialize it back to JSON for JavaScript.

**Zero-copy** means a particular transfer avoids copying bytes, not that all
serialization disappears. A view into freed native memory is invalid.
For the first implementation, prefer a clear ownership/copy contract over an
unproved zero-copy optimization.

Source: [encoding API][encoding],
[schema-agnostic driver boundary](../../../azure-sdk-for-rust/sdk/cosmos/docs/adrs/0002-schema-agnostic-driver-boundary.md).

## Concept 13 of approximately 32: The Rust vocabulary the adapter needs

A Rust **crate** is a compilation unit. **Cargo** builds crates and resolves
dependencies using `Cargo.toml`; `Cargo.lock` records resolved versions.
Features select compile-time capabilities, not arbitrary runtime compatibility.

For the read adapter, learn these types when reading its signatures:

| Rust construct | Role in this read |
|---|---|
| `String` / `&str` | Owned text / borrowed text |
| `Vec<u8>` | Owned bytes |
| `Option<T>` | A value that may be absent |
| `Result<T, E>` | Success or a typed error |
| `Arc<T>` | Shared ownership that can keep client state alive across tasks |
| `async fn` / future | Work an executor must poll toward completion |

The `?` operator propagates a failure. A **borrow** accesses another owner's
value without taking responsibility for releasing it.
Inputs used after the JavaScript call returns must have a valid longer lifetime.

**Tokio** is the asynchronous runtime used by the inspected native Rust paths.
Calling `block_on` on Node's JavaScript thread would wait there and block it.
The Python synchronous binding releases Python's lock while waiting; that is
not a recipe to copy into Node's event loop.

Source: Python binding
[driver_runner.rs](../../../azure-sdk-for-python/sdk/cosmos/azure-cosmos/azure_cosmos_rust/src/wire/driver_runner.rs),
[Rust Book][rust-book].

## Concept 14 of approximately 32: Node-API and asynchronous completion

Node needs a supported way to invoke compiled Rust and receive JavaScript values.
**Node-API** is Node's native-addon API with a defined ABI compatibility boundary.
It does not make one binary portable across operating systems or into a browser.

NAPI-RS and Neon provide Rust bindings for this kind of integration.
Their detailed comparison belongs in Concept 22.
The intended sequence is:

```text
JS thread: validate/copy inputs, submit work, return Promise
Rust executor: perform the driver operation
JS thread: convert result, construct ItemResponse, settle Promise
```

An executor thread cannot use arbitrary JavaScript objects or invoke a retained
credential callback directly. Use the framework's supported return-to-JavaScript
mechanism, keep references alive for the required interval, and propagate
callback failures.

The Rust executor, JavaScript callback queue, and in-flight operation registry
must not grow without limits. Promise completion and native-memory cleanup
are separate responsibilities.

Sources: [Node-API][node-api], [NAPI-RS async functions][napi-async],
[Neon Channel][neon-channel].

## Concept 15 of approximately 32: Browser Wasm still needs a host

The compiled Rust code can calculate which order to request, but it still
needs something to send the request. A **host** is the surrounding environment
that supplies facilities the compiled code cannot provide on its own.
In our browser example, that includes browser-provided network access.

A Wasm **import** is a function or other facility the module asks its host
to supply. A Wasm **export** is something the module makes callable outside
it. For the order read, distinguish calling the engine from sending a request:

```text
JavaScript calls an exported Rust read function
    -> compiled engine prepares the order request
    -> engine calls an imported host networking function
    -> host sends the request and returns the result
```

**wasm-bindgen** is a tool/library that generates the connecting code between
Rust/Wasm and JavaScript. **web-sys** supplies Rust bindings to browser APIs
such as `fetch`, the browser function that sends web requests.

**WASI** expands to **WebAssembly System Interface**: standardized interfaces
through which Wasm software can ask a host for facilities.
It is neither the `.wasm` file format nor a complete operating system.
A host must implement the particular interfaces the compiled module imports.
Different WASI versions and host implementations do not provide identical
facilities or permissions.

WASI is **not required for every browser Rust design**. A wasm-bindgen design
can call JavaScript/browser APIs directly. A WASI-targeted design instead
needs the selected WASI host implementation as well.
Neither arrangement automatically supplies native TCP sockets, all Node APIs,
or the existing Rust HTTP client.
Running a Rust addition function is therefore a much smaller result than
running this driver.

A **Web Worker** runs separately from the page's main JavaScript context.
Passing data to it uses messages, copies, or explicit transfer/shared-memory
mechanisms. Workers do not automatically bypass browser network rules.
Synchronous Wasm on the main page can still delay interaction.

The browser's `fetch` can use HTTP/2 through the browser's networking stack.
**HTTP** is the protocol for the web request/response exchange; **HTTP/2** is
one version of that protocol.
That does not expose the native driver's socket, connection-pool, or
HTTP/2 configuration API to Wasm. Ask which host functions this exact build
imports and what implements them, not simply whether "Wasm supports HTTP/2."

The driver currently configures native-oriented connection behavior.
The feasibility work must establish an owner-supported browser execution and
transport path, not just a Wasm loader.
That is the hard Gateway V2 gate in Concept 23.

Loading Wasm also need not block the entire website. The application can render
its surrounding interface before loading the read engine on demand. That
moves cost to first use rather than removing it. The prototype guide owns
the download, initialization, and first-order-display measurements.

Sources: [wasm-bindgen deployment][wasm-deploy],
[web-sys][web-sys], [WASI][wasi], [Fetch standard][fetch-standard].

## Concept 16 of approximately 32: Browser policy affects loading and requests

The browser application must both load the compiled code and reach the account.
Those are different checks.

**CORS** is the destination server's permission for a page from another origin
to access a response. It is not Cosmos authorization.
Preflight approval and access to required response headers must be checked.
Code can reach a response while still being unable to read a needed header.

**Content Security Policy**, or **CSP**, can restrict script/Wasm execution,
workers, and network destinations. A Wasm compilation permission is not
permission to connect to arbitrary accounts.

Some threaded Wasm arrangements require shared memory.
**Cross-origin isolation** is a browser security state needed for relevant
shared-memory facilities. Portal embedding adds parent-page and deployment
constraints; a child page cannot assume a local-development header change
will establish that state in Portal.

Use the same checks for customer browser applications, not only Portal.
Do not weaken a site's policy just to make a prototype load.
Concept 24 separates source-verifiable Explorer behavior from deployment
questions for its owners.

Sources: [CORS][cors], [CSP script policy][csp],
[cross-origin isolation][isolation].

## Concept 17 of approximately 32: Initialization, cancellation, and disposal

JavaScript client construction is synchronous. Driver initialization can require
asynchronous metadata work. The experimental implementation must bridge that
difference without blocking or changing the public constructor into a Promise.

One proposed design is a shared initialization Promise per experimental client:
concurrent reads wait for the same initialization, not separate drivers.
Its failure stays visible; it must not silently switch back to JavaScript.
The implementation must define whether and how initialization can be retried.

An **AbortSignal** communicates cancellation:

```js
const controller = new AbortController();
const pending = item.read({ abortSignal: controller.signal });
controller.abort();
```

The caller must still observe `pending`'s outcome. Aborting a signal does not,
by itself, cancel a Rust task. The binding must connect the signal to the
operation and remove its listener when no longer needed.

Do not cancel shared client initialization just because one waiting read
cancels. Conversely, do not leave an abandoned read running indefinitely.
Define the deadline across initialization, queueing, retries, and completion.
The existing JS HTTP-attempt timeout is not proof of a whole-call deadline.

Current `CosmosClient.dispose()` clears SDK background state; it is not an
existing Promise-returning Rust drain API. A prototype must specify how it
rejects new work, deals with active work, and releases native state while
preserving that public surface. Garbage collection is not a reliable deadline
for closing a client or stopping a runtime.

Sources: [RequestHandler.ts](../../sdk/cosmosdb/cosmos/src/request/RequestHandler.ts),
[CosmosClient.dispose](../../sdk/cosmosdb/cosmos/src/CosmosClient.ts).

## Concept 18 of approximately 32: Build-time success versus runtime proof

The reader is now ready to distinguish these checkpoints:

```text
TypeScript checks -> JS package builds -> native/Wasm artifact loads
    -> driver initializes -> read executes -> ItemResponse returns
```

Each arrow can fail independently.
A type declaration can exist while its native implementation is missing.
A successful package build does not prove the browser entry loaded.
A Rust initialization log does not prove the read used Rust or Gateway V2.

The repo uses **pnpm** for workspace dependencies and **Turborepo** to order
package build tasks. These are build tools, not runtimes used by the customer's
read. Concept 27 gives the scoped build procedure.

**Source maps** connect emitted JavaScript to TypeScript for debugging.
Rust symbols help identify native execution. Keep detailed tracing/profilers
in diagnostic runs rather than quietly adding their overhead to clean timings.

The current package's `test:browser` script is `echo skipped`.
Its successful exit is not a browser test. A real browser/Portal check must
load the candidate and exercise the operation.

Continue with
[Concept 19: trace the existing read](JS_SDK_RUST_READ_PROTOTYPE.md#concept-19-of-approximately-32-trace-the-existing-read).

## Sources

Local links refer to this JavaScript checkout or named sibling checkouts.
The prototype guide records revisions and their evidence limits.
Language references explain constructs; SDK source determines SDK behavior.

[explorer-read]: https://github.com/Azure/cosmos-explorer/blob/master/src/Common/dataAccess/readDocument.ts
[node-addons]: https://nodejs.org/api/addons.html
[node-api]: https://nodejs.org/api/n-api.html
[functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
[closures]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures
[spread]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
[ts-modules]: https://www.typescriptlang.org/docs/handbook/2/modules.html
[ts-types]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
[async-functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[event-loop]: https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop
[encoding]: https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API
[rust-book]: https://doc.rust-lang.org/book/
[napi-async]: https://napi.rs/docs/concepts/async-fn
[neon-channel]: https://docs.neon-bindings.com/neon/event/struct.Channel.html
[wasm-deploy]: https://wasm-bindgen.github.io/wasm-bindgen/reference/deployment.html
[web-sys]: https://wasm-bindgen.github.io/wasm-bindgen/web-sys/index.html
[wasi]: https://wasi.dev/
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
[csp]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src
[isolation]: https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated
[fetch-standard]: https://fetch.spec.whatwg.org/
