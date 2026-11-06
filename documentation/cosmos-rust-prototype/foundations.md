# JavaScript, TypeScript, and Node.js for one Rust-backed item read

Alpha Bank wants its application to read `order-17` and display its status.
This guide builds the language knowledge needed to follow that operation,
starting with a program that only prints the order ID.

There are **18 foundation bites**. Their numbering is independent of the
implementation bites in [the read-item guide](read_item.md). Early examples
run entirely on the developer's machine; later integration fragments state which
existing client or item they assume. Illustrative code is not evidence of
a completed Rust-backed read.

## Table of contents

1. [Preparing code versus running it](#bite-1-of-18-when-does-typescript-become-running-code)
2. [What Node.js contributes](#bite-2-of-18-what-does-nodejs-do-with-our-javascript)
3. [Calling a function](#bite-3-of-18-when-does-a-functions-code-execute)
4. [Grouping an order's properties](#bite-4-of-18-how-do-we-keep-one-orders-details-together)
5. [Sharing one object](#bite-5-of-18-two-names-can-refer-to-the-same-object)
6. [Creating a separate object](#bite-6-of-18-how-do-we-change-the-display-object-without-changing-the-original)
7. [Describing an order's type](#bite-7-of-18-how-do-we-describe-what-an-order-object-must-contain)
8. [Checking received values](#bite-8-of-18-typescript-checks-do-not-validate-received-data)
9. [Supplying the type to the SDK](#bite-9-of-18-how-readorder-connects-the-read-to-our-order-type)
10. [Promises, await, and errors](#bite-10-of-18-what-does-a-promise-give-us-while-the-read-is-unfinished)
11. [Doing other work while waiting](#bite-11-of-18-how-can-nodejs-do-other-work-while-a-read-waits)
12. [Turning bytes into an order](#bite-12-of-18-how-do-response-bytes-become-a-javascript-object)
13. [Keeping Rust values alive](#bite-13-of-18-what-rust-concepts-does-this-read-need)
14. [Connecting JavaScript to Rust](#bite-14-of-18-how-does-napi-rs-connect-javascript-to-rust)
15. [Loading the actual implementation](#bite-15-of-18-what-must-be-built-and-loaded)
16. [Creating a reusable driver](#bite-16-of-18-why-does-driver-initialization-need-its-own-lifetime)
17. [Stopping work and releasing state](#bite-17-of-18-how-do-cancellation-and-closing-differ)
18. [Separating evidence from assumptions](#bite-18-of-18-what-does-each-check-actually-prove)

## Bite 1 of 18: When does TypeScript become running code?

Alpha Bank's **customer app** is the application code the bank owns.
Before it can read `order-17`, we need to understand how the code the bank
writes becomes code that runs.

Our first goal is deliberately small: **write TypeScript that prints
`order-17`, then distinguish preparing that code from executing it.**

### First, Alpha Bank writes the source

**JavaScript** is a programming language. **TypeScript** extends it with
descriptions of expected types. A **type** describes the kind of value
expected, such as text or a number.

The developer creates `show-order.ts`. The `.ts` extension identifies
TypeScript source code:

```ts
const orderId: string = "order-17";
console.log(orderId);
```

`orderId` names the value `"order-17"`. The annotation `: string` tells
TypeScript that this value should be text. `console.log(orderId)` asks to print
it when the application runs. Saving the file does not execute that instruction.
`const` introduces the variable, the name through which this code accesses
the value; we will examine its effect on objects in Bite 5.

### Next, the compiler prepares JavaScript

A **compiler** processes source code into another form. In this example, we use
the TypeScript compiler, whose command is `tsc`. With it already installed,
the developer chooses `--target ES2022` for the output JavaScript language
version and `--noEmitOnError` to prevent new output if checking fails:

```powershell
tsc --target ES2022 --noEmitOnError show-order.ts
```

The compiler checks the TypeScript and produces `show-order.js`:

```js
const orderId = "order-17";
console.log(orderId);
```

Notice that `: string` is gone, while the printing instruction remains.
**Compilation produces the JavaScript file;
it does not print `order-17`.** This preparation stage is what we mean here by
**compile time**.

### Why another component is needed

The compiler has finished its job: it has prepared a file. But Alpha Bank
needs the instructions in that file to execute.

For this example, the developer uses **Node.js**, a program that provides an
environment for executing JavaScript outside a browser:

```powershell
node show-order.js
```

Node.js loads and executes the JavaScript file. The terminal now shows:

```text
order-17
```

This is **runtime**: the application's instructions are executing. The `node`
command - not the earlier `tsc` command - caused this output.

### What we have established

We have not yet explained how Node.js executes the file internally. For this
bite, the important distinction is concrete: **the compiler produces
`show-order.js`; Node.js executes it and produces the terminal output.**


## Bite 2 of 18: What does Node.js do with our JavaScript?

Alpha Bank has prepared `show-order.js`:

```js
const orderId = "order-17";
console.log(orderId);
```

We know that running `node show-order.js` prints `order-17`. Now we need to
understand **what Node.js contributes to make that happen**.

### First, the developer starts Node.js

The developer runs:

```powershell
node show-order.js
```

This starts a **process**, a running instance of the Node.js program with
its own memory and resources, and identifies `show-order.js` as the
application file to execute. Node.js provides a **runtime environment**: the
components and facilities available to the application while it runs. Here,
"runtime environment" names the environment; "runtime" in Bite 1 named the
execution stage.

### Node.js uses an engine to execute the instructions

Node.js contains **V8**, a JavaScript engine: a component that processes and
executes JavaScript code. V8 is part of Node.js, not another program Alpha Bank
starts separately.

For our first statement:

```js
const orderId = "order-17";
```

Executing it establishes the name `orderId` with the value `"order-17"`. At
this point, there is still no terminal output.

The next statement asks for an additional action:

```js
console.log(orderId);
```

Knowing that `orderId` contains `"order-17"` is not enough to display it. The
application also needs access to an output facility.

### Node.js supplies the facility for writing output

Node.js makes `console.log` available as a **function**, named work the
application can request.
It writes a message to **standard output**, the program's normal output
destination. In our command, with no output redirection, that destination is
the terminal.

The call passes the value `"order-17"` to that function. Node.js's console
facility writes it, followed by a new line:

```text
order-17
```

That explains the responsibility split: **V8 executes the JavaScript
instructions; Node.js supplies facilities those instructions can call,
including console output.** Node.js brings both together so Alpha Bank does
not have to assemble them itself.

### Does that mean JavaScript executes one source line at a time?

For this example, following the two statements in order gives the right result.
But "reads and executes one line at a time" is not an accurate description of
the engine. V8 processes the code and can compile it into machine instructions;
a source line is not its fundamental unit of execution.

We will examine execution order through a concrete function call in the next
bite, rather than introduce engine internals here.

**The concept to keep:** Node.js is more than a JavaScript engine. It combines
V8 with facilities that let the customer app do work outside the language
itself, such as writing to the terminal.



## Bite 3 of 18: When does a function's code execute?

Alpha Bank wants to give the "print an order ID" task a name so the customer
app can request it where needed.



### First, Alpha Bank defines the task

The developer updates `show-order.ts`:

```ts
function showOrder(orderId: string) {
  console.log(orderId);
}

console.log("Before");
showOrder("order-17");
console.log("After");
```

`function showOrder(...)` defines the function. The statements inside `{ }`
form its **body** - the work performed when it is called.

`orderId` is a **parameter**: a name the function uses for an input supplied
by its caller. `: string` describes that input's expected type. Defining the
function makes it available to call; it does not execute its body.

### Then, Alpha Bank prepares and runs the application

With the TypeScript compiler and Node.js installed, the developer runs:

```powershell
tsc --target ES2022 --noEmitOnError show-order.ts
node show-order.js
```

The emitted JavaScript retains the function and its calls, but not the
`: string` annotation. We will follow execution using the TypeScript source
the developer wrote.

The first printing instruction **outside** the function is:

```ts
console.log("Before");
```

It prints:

```text
Before
```

The function body appears earlier in the file, but it has not printed
anything. **Source position alone does not determine when a function body
executes.**

### What changes when execution reaches the call?

Next comes:

```ts
showOrder("order-17");
```

This is the **call** that requests the function's work. `"order-17"` is its
**argument**: the actual value supplied for this call. Inside this invocation
of `showOrder`, the parameter `orderId` has that value.

Execution enters the function body:

```ts
console.log(orderId);
```

That instruction prints:

```text
order-17
```

The body then reaches its end. Execution returns to the code that called it
and continues with:

```ts
console.log("After");
```

The complete output is therefore:

```text
Before
order-17
After
```

For this function, the caller does not continue to `"After"` until the body
has finished executing. We are not introducing network requests or waiting
behavior yet.

### Why defining and calling must stay separate

There is an important difference between **making code available** and
**requesting its work**. In this example, defining `showOrder` makes the task
available; calling `showOrder("order-17")` executes its body with a concrete
input.

**The concept to keep:** defining a function does not execute its body. A call
supplies the input and enters that body; when this function finishes,
execution continues after the call.



## Bite 4 of 18: How do we keep one order's details together?

Alpha Bank's `showOrder` function prints an order ID. Now the customer app needs
to display both the order ID and its status:

```text
Order: order-17, status: submitted
```

Rather than keep those details as unrelated values, we will describe **one
order using an object**.

### First, group the order's details

In TypeScript source, the developer writes:

```ts
const order = {
  id: "order-17",
  customerId: "customer-17",
  status: "submitted"
};
```

An **object** groups named values. Each named entry is a **property**: `id` is
a property whose value is `"order-17"`. The braces here create an object;
unlike the braces around a function body, they contain properties rather than
instructions.

This example creates the order data inside the customer app. It does not
contact a remote service.

### Then, select the properties needed for the message

The customer app can access a property using a dot followed by its name. For
our object:

| Expression | Value |
|---|---|
| `order.id` | `"order-17"` |
| `order.customerId` | `"customer-17"` |
| `order.status` | `"submitted"` |

This is how the app selects individual values from the grouped data.

The developer replaces `show-order.ts` with this complete example:

```ts
const order = {
  id: "order-17",
  customerId: "customer-17",
  status: "submitted"
};

const message = "Order: " + order.id + ", status: " + order.status;
console.log(message);
```

Here, `+` joins strings. For these inputs, the message is assembled from:

```text
"Order: "
"order-17"
", status: "
"submitted"
```

The resulting value assigned to `message` is:

```text
Order: order-17, status: submitted
```

Preparing that value and printing it are separate actions.
`console.log(message)` requests the printing.

### Prepare and run the example

Using our existing workflow:

```powershell
tsc --target ES2022 --noEmitOnError show-order.ts
node show-order.js
```

The expected terminal output is:

```text
Order: order-17, status: submitted
```

There is no new component taking responsibility here: all the example's work
remains in the customer app. The change is how we organize its data - one
object holds the related details, and the message-building code selects the
properties it needs.

**The concept to keep:** an object groups related values under property names;
`order.status` selects the value of one property.

Source: [TypeScript everyday types][ts-types].

## Bite 5 of 18: Two names can refer to the same object

Alpha Bank wants to show `"processing"` on its screen while retaining the
original order's `"submitted"` status. Before changing anything, it gives
the order another name:

```ts
const order = {
  id: "order-17",
  customerId: "customer-17",
  status: "submitted"
};

const displayedOrder = order;
```

### Did that create a second order object?

No. `displayedOrder` and `order` refer to the same object. A **reference**
provides access to an object; assigning that reference to another variable
does not duplicate the object.

```text
order ----------+
                +-- one object whose status is "submitted"
displayedOrder -+
```

### Follow a change through the second name

Add this code after the assignment:

```ts
displayedOrder.status = "processing";
console.log(order.status);
console.log(displayedOrder.status);
```

The output is:

```text
processing
processing
```

There was only one object to change. `const` keeps each variable from being
reassigned to another value; it does not make the object's properties
unchangeable.

The screen change therefore also changed the original data the customer app
still accesses through `order`. This did not update the stored item in Cosmos;
we are changing only a local object.

**The concept to keep:** a second variable name is not a separate object.
To keep the original status unchanged, the next step must create one.

Source: [TypeScript object types][ts-objects].

## Bite 6 of 18: How do we change the display object without changing the original?

Alpha Bank still wants to display `"processing"` while keeping the original
order's status as `"submitted"`.

Giving the object another name did not provide that separation. **This time,
we need to create a second object.**

### First, create the display object

The developer writes this TypeScript in `show-order.ts`:

```ts
const order = {
  id: "order-17",
  customerId: "customer-17",
  status: "submitted"
};

const displayedOrder = { ...order };
```

The `{ }` creates a new object. Inside those braces, `...order` uses **object
spread**: it copies properties from `order` into the object being created.
Unlike `const displayedOrder = order`, this produces a separate object.

For this particular order, the statement has the same effect as writing:

```ts
const displayedOrder = {
  id: order.id,
  customerId: order.customerId,
  status: order.status
};
```

Both objects initially contain the same property values, but they are no
longer the same object.

### Then, change the display object's status

The developer adds:

```ts
displayedOrder.status = "processing";

console.log(order.status);
console.log(displayedOrder.status);
```

The assignment changes `status` on the new object. It does not change that
property on `order`. The expected output is now:

```text
submitted
processing
```

Alpha Bank has achieved the intended separation: the original object retains
`"submitted"`, while the display object holds `"processing"`.

### What exactly did we copy?

All three properties in our example contain strings. Copying those values into
another object is sufficient for changing its `status` independently.

Object spread performs a **shallow copy**: it copies property values into a
new object, but does not recursively duplicate objects held inside those
properties. If we later add a property containing another object, that inner
object would still be shared. Our current example has no such inner objects.

**The concept to keep:** `{ ...order }` creates a separate outer object. For our
string-valued properties, changing the copied object's `status` leaves the
original unchanged.

Source: [TypeScript object spread](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html).

## Bite 7 of 18: How do we describe what an order object must contain?

Alpha Bank now has an original order and a separate display object. Both
should contain an ID, a customer ID, and a status, all as text.

Rather than leave that expectation unwritten, we want to give the TypeScript
compiler a named description to check.

### First, describe the expected properties

The developer adds an **interface**: a named description of an object's
properties and their types.

```ts
interface Order {
  id: string;
  customerId: string;
  status: string;
}
```

This describes an `Order`; it does not create one. Each `string` says that the
corresponding property must contain text.

### Then, apply that description to our object

In `show-order.ts`, below the interface:

```ts
const order: Order = {
  id: "order-17",
  customerId: "customer-17",
  status: "submitted"
};

console.log(order.status);
```

The new part is `: Order`. It asks TypeScript to check the assigned object
against our description. This object supplies all three required properties
with string values.

### What happens if the developer supplies the wrong value?

Suppose the developer changes the assignment to:

```ts
const order: Order = {
  id: "order-17",
  customerId: "customer-17",
  status: 17
};
```

When the compiler checks this source, it reports that `number` is not
assignable to `string`. The input is the source containing `status: 17`; the
result is a type error, not a corrected status. TypeScript does not turn that
number into `"submitted"`.

The developer restores:

```ts
status: "submitted"
```

### Does Node.js receive the interface?

No. The interface and the `: Order` annotation are removed when JavaScript is
emitted. Node.js receives the executable object creation and printing
instructions, not the interface.

The responsibilities are separate: the developer declares the expected
properties; the compiler checks the source against them; Node.js later
executes the prepared code. Passing this source check does not install an
automatic check for data received later from outside the program.

**The concept to keep:** an interface names an expected object structure for
TypeScript to check. It neither creates the object nor becomes an executable
validator.

Sources: [TypeScript everyday types][ts-types],
[TypeScript basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html).

## Bite 8 of 18: TypeScript checks do not validate received data

The customer app expects `order-17` to contain a status such as `"submitted"`.
Now it needs an item from the **service backend**, the remote Cosmos DB
service. It uses the **SDK**, the installed `@azure/cosmos` package, to
communicate with that service.

**Describing the expected item in TypeScript does not automatically check the
item received from the service backend.** Type checking and checking received
values are separate jobs.

### Why receiving an item is different

The `Order` interface from Bite 7 checked source available to the compiler.
The values returned by a later read were not present for that check.

Suppose a read returns an item with these values:

```json
{
  "id": "order-17",
  "customerId": "customer-17",
  "status": 17
}
```

This is a hypothetical unexpected item, not a claim about the contents of our
example account.

The compiler checked the customer app **before this response arrived**, and
the interface was removed when JavaScript was produced. The
`Order` interface cannot inspect that future response, convert `17` to
`"submitted"`, or reject it. Checking actual received values requires code that
runs when those values are available. That is called **runtime validation**.

### What does an actual check do?

For illustration, let `receivedOrder` name that returned object.
`typeof` examines the kind of value present now. `!==` means "is not equal
to," and `if` runs its body only when the condition is true.

If the status is not text, `throw` stops the normal path with an error.
`new Error(...)` creates an error object containing an explanatory message:

```ts
if (typeof receivedOrder.status !== "string") {
  throw new Error("Expected the order's status to be a string.");
}
```

For the illustrated `status: 17`, `typeof` produces `"number"`, so the check
raises an error. This checks only `status`, not the complete `Order`
description. Unlike an interface, the `if` statement remains
in the executable code.

The fragment assumes an object with a `status` property; it is not a complete
checker for arbitrary inputs. For example, `null` represents the deliberate
absence of an object and cannot be accessed as `receivedOrder.status`.

### Who owns this rule?

The customer app owns the requirement that its orders have a text status.
The SDK serves many item shapes and must not impose Alpha Bank's `Order`
description on every customer. When we later connect Rust, that ownership
does not change.

**The concept to keep:** TypeScript checks how source code uses declared
types. Runtime validation checks the values that actually arrive.

Source: [TypeScript everyday types][ts-types].

## Bite 9 of 18: How `read<Order>()` connects the read to our order type

The customer app has described an `Order`. Now it needs that description to
apply to the result of reading `order-17`.

The SDK cannot build the customer's `Order` interface into its implementation:
the SDK must serve applications with different item properties. Instead, its
`read()` operation lets the caller supply an item type. This is the purpose of a
**generic**: code whose type description can work with different types rather
than one fixed type.

### First, identify the existing item

For this fragment, assume `client` is an already configured SDK
`CosmosClient` object. A **method** is a function accessed through an object,
such as `client.database(...)`.
The SDK's **public API**, or application programming interface, consists of
the supported methods and types the customer app uses.

The account contains a database named `sales` and a container named `orders`.
A database groups containers; the container holds the items. The customer
app supplies the item ID and its **partition key**, the value that groups
items into a **logical partition** within the container. Here that is the
item's `customerId`. The ID and partition key together identify our item.

```ts
const salesDatabase = client.database("sales");
const ordersContainer = salesDatabase.container("orders");
const orderItem = ordersContainer.item("order-17", "customer-17");
```

These calls obtain SDK objects identifying the database, container, and item.
They do not themselves fetch this item's contents.

### Then, supply the expected item type

Using the `Order` interface from Bite 7, the read call is:

```ts
orderItem.read<Order>();
```

This fragment identifies the call and its type argument. A complete
application must also handle its eventual result or failure, which is the
subject of Bite 10.

Focus on the two pairs of brackets:

```text
read<Order>()
     ----- --
       |    |
       |    no ordinary arguments supplied
       |
       the item type supplied to TypeScript
```

`Order` inside `< >` is a **type argument**: the particular type chosen for
this call. The parentheses `( )` hold values passed to the method when it
runs. A type argument and an ordinary argument serve different purposes.

### Then, the SDK's type declaration carries that choice into the result

In the SDK's declaration, `read()` names its caller-selected type `T`.
That name is a **type parameter**: a placeholder for the type the caller
supplies. Here, supplying `Order` makes `T` stand for `Order`.

The SDK uses that same `T` in its response type:

```text
customer app supplies Order
    -> read() uses Order for T
    -> completed result is described as ItemResponse<Order>
    -> response.resource carries the Order fields
```

`ItemResponse<Order>` describes the **whole SDK response**, not just the order.
It provides the item body through `resource`, alongside `statusCode`, the
service response's numeric outcome, and `requestCharge`, the service-reported
request cost. The item body can also contain additional service-managed fields.

The declaration allows `resource` to be `undefined`, meaning no item body
is available. We must receive the completed response and check for a body
before accessing `resource.status`. That gives us two different questions:
what type do we expect, and when is a value available to use?

### What this means for our Rust prototype

The existing SDK declaration explicitly says the supplied type is not
necessarily enforced by the SDK. **`read<Order>()` describes the result to
TypeScript; it does not ask the service backend or Rust to validate an
`Order`.**

Our prototype therefore has two responsibilities to preserve:

- **TypeScript-facing behavior:** `read<Order>()` continues to describe the
  completed result as `ItemResponse<Order>`.
- **Execution behavior:** the SDK constructs the actual response object,
  including the item body and operation information - not merely a bare order
  object.

**The concept to keep:** `<Order>` connects the customer's item description to
the SDK's response type. It does not change or validate the returned item.

Sources: [TypeScript generics](https://www.typescriptlang.org/docs/handbook/2/generics.html),
[TypeScript everyday types][ts-types],
[Item.ts](../../sdk/cosmosdb/cosmos/src/client/Item/Item.ts),
[ItemResponse.ts](../../sdk/cosmosdb/cosmos/src/client/Item/ItemResponse.ts),
[ResourceResponse.ts](../../sdk/cosmosdb/cosmos/src/request/ResourceResponse.ts).

## Bite 10 of 18: What does a Promise give us while the read is unfinished?

Alpha Bank has called `orderItem.read<Order>()`. The customer app wants to
display `"submitted"`, but the SDK must first obtain the response from the
service backend. The call cannot hand back that completed response while
the work is still unfinished.

### First, distinguish the operation from its eventual result

The read returns a **Promise**: a JavaScript object representing an operation's
eventual result or failure. The Promise is available to the caller even when
the response is not. This makes the call **asynchronous**: it can return
control before its eventual result is ready.

Using the existing `orderItem` from Bite 9:

```ts
const pendingRead = orderItem.read<Order>();
```

Calling `read()` starts its work. `pendingRead` refers to the Promise,
**not** an `ItemResponse` or the order itself. Naming the Promise does not
start a second read, and waiting for it later does not restart the first one.

The Promise has one of three states:

| State | Meaning for this call |
|---|---|
| Pending | No final result or failure is available yet |
| Fulfilled | A result is available; for this API it is an `ItemResponse` |
| Rejected | The call failed; the Promise carries the reason |

**Settled** is a collective term for fulfilled or rejected. It does not
mean "successful." A Promise can already be settled when we receive it;
callers do not have to catch the instant when it changes state.

### Next, wait where the response is actually needed

JavaScript provides `await` to obtain a Promise's result. Inside a function,
we use `async` to allow that function to wait this way.
`async` also makes the function return a Promise to its own caller.
`return` finishes the function with a value; here that value will become
the fulfillment value of the function's Promise:

```ts
async function readOrder() {
  const pendingRead = orderItem.read<Order>();
  const response = await pendingRead;
  return response;
}
```

This is a function definition using `orderItem` from the preceding setup;
it does not execute a read until called.

Follow one call:

```text
readOrder() starts running
    -> orderItem.read() starts the SDK operation and returns a Promise
    -> await pauses readOrder before it can use the response
    -> the SDK completes the operation
    -> readOrder resumes with the ItemResponse
    -> return response completes readOrder's own Promise
```

`await` does not freeze the whole Node.js process or move the function's
body to execute somewhere else. It pauses this function at this point.
The next bite follows what other JavaScript can do meanwhile.

Even for an already-fulfilled Promise, the statements after `await` resume
later rather than executing inline before the function returns to its caller.

### What happens if the Promise rejects?

At `await pendingRead`, a rejection behaves like a thrown error. The
assignment does not produce a response, and the following `return response`
does not run.

The customer app can use **`try`/`catch`**: `try` contains the work to attempt;
`catch` runs if that work throws. A caller might use this fragment inside
its own async function. `console.error` reports through the program's
error-output facility, and `throw error` passes the failure to the caller:

```ts
try {
  const response = await readOrder();
  console.log(response.statusCode);
} catch (error) {
  console.error("The order read failed.");
  throw error;
}
```

This reports the problem without disguising it as a successful empty order.
Code at the application's outer boundary must
ultimately decide how to report or handle that failure.

If there is no `catch` in `readOrder`, a rejection from its awaited SDK call
rejects `readOrder`'s Promise too. The error does not disappear merely because
another function sits between the app and the SDK.

### Does fulfillment guarantee the item exists?

No. A Promise describes how the call completed; the API determines what its
result means. In the inspected JavaScript SDK, a missing item is returned as
an `ItemResponse` with status `404`, rather than necessarily rejecting the
Promise. A successful item read has status `200`.

Inside an async function, the customer app therefore checks the completed
response before displaying the status. `===` tests equality; `||` means
either condition is enough. `else if` and `else` select the next branch
when the preceding condition was false:

```ts
const response = await readOrder();

if (response.statusCode === 404) {
  console.log("order-17 was not found.");
} else if (response.statusCode !== 200 || response.resource === undefined) {
  throw new Error("The order read did not return an item.");
} else {
  console.log(response.resource.status);
}
```

For the successful example, the output is `"submitted"`.

The `Order` type tells TypeScript how to check use of that final property.
It still does not validate the received property's value, as Bite 8 established.

**The concept to keep:** the Promise represents the unfinished call; `await`
obtains its result or raises its failure. The customer app must still inspect
the response to know whether an item was returned.

Sources: [Promises][promises], [await][await], [async functions][async-functions],
[Item.read](../../sdk/cosmosdb/cosmos/src/client/Item/Item.ts).

## Bite 11 of 18: How can Node.js do other work while a read waits?

Alpha Bank does not want waiting for one order to stop every other task in
its customer app. We have established that `await` pauses a function, not
the whole process. Now we need to see the difference in execution order.

### Follow a small example without a service request

`Promise.resolve(value)` creates an already-fulfilled Promise for this
ordinary value. We use it here to make the result predictable without an
account, a timer, or network timing.

The example also handles a possible failure:
`pendingDisplay.catch(reportFailure)` registers a function to run if the
Promise rejects. Such a function, passed for another component to call,
is a **callback**. `process.exitCode = 1` asks Node.js to finish with a
failure exit code if that callback runs.

Save this complete JavaScript example as `wait-order.js` and run it with
`node wait-order.js`:

```js
async function showOrderStatus() {
  console.log("Before await");
  const status = await Promise.resolve("submitted");
  console.log(status);
}

function reportFailure(error) {
  console.error(error);
  process.exitCode = 1;
}

const pendingDisplay = showOrderStatus();
console.log("Caller continues");
pendingDisplay.catch(reportFailure);
```

The output is:

```text
Before await
Caller continues
submitted
```

The body starts when called. At `await`, it returns control to its caller.
The caller prints its message, and the waiting function resumes afterward.
This happens even though the example's Promise was already fulfilled.
The example demonstrates scheduling, not a Cosmos read.

### Who arranges the later execution?

A **thread** is a path of instruction execution within a process.
For this customer app's main JavaScript execution, Node.js runs code on one
JavaScript thread. Node.js also uses other threads internally; it is not a
single-threaded process.

The **event loop** is the mechanism Node.js uses to coordinate available work
and run JavaScript callbacks. Promise resumptions are scheduled through the
JavaScript engine's **microtask queue**, a list of small deferred actions
processed at defined execution checkpoints. We do not need the full queue
ordering to explain the example: the statements after `await` wait until
the current JavaScript work has handed back control.

Long-running calculation on that JavaScript thread prevents other JavaScript
from running there meanwhile. Adding `async` to a function does not move its
calculation elsewhere. The function must actually reach a point that hands
back control, or use a separate execution mechanism.

### Can two reads be in progress together?

Yes. **Concurrency** means multiple operations are in progress during
overlapping periods. It does not require two JavaScript instructions to
execute simultaneously on the same thread.

An **array** is an ordered list; `[first, second]` holds these two Promises.
`Promise.all` waits for all the listed Promises to fulfill and supplies their
results in that input order. If one rejects, the combined Promise rejects;
the other operation is not automatically stopped.

Inside an async function with the existing `orderItem`, this fragment starts
two reads before waiting for their results:

```ts
const first = orderItem.read<Order>();
const second = orderItem.read<Order>();
const responses = await Promise.all([first, second]);
```

Both calls deliberately read the same example item. A workload must limit
the number of unfinished calls: starting more work without a bound also
keeps more operation state in memory.

**The concept to keep:** waiting can leave the JavaScript thread available
for other work. A Rust integration must preserve that opportunity rather
than block the thread until a network operation finishes.

Sources: [await][await], [Node event-loop guidance][event-loop],
[Promise.all][promise-all].

## Bite 12 of 18: How do response bytes become a JavaScript object?

Alpha Bank ultimately needs `response.resource.status`. Across a network,
however, the response is data, not an existing object in the customer app's
memory. Something must turn that data into the object the app can use.

### First, distinguish an object from text describing it

**JSON**, JavaScript Object Notation, is a text format for structured data.
These characters can describe the example order:

```json
{"id":"order-17","customerId":"customer-17","status":"submitted"}
```

A JavaScript string containing those characters is still text.
It does not itself have the order's `status` property.
**Parsing** interprets that text and constructs JavaScript values.
`JSON.parse` performs that conversion.

### Why are bytes another step?

A **byte** is eight bits of data; a bit can have the value zero or one.
Network data is represented as bytes. **UTF-8** is a rule for representing
text as bytes. A character can require more than one byte.

**Encoding** turns text into bytes using such a rule; **decoding** turns
those bytes back into text. Neither operation alone interprets the JSON
properties.

`TextEncoder` and `TextDecoder` are facilities available in the Node.js version
used for this prototype. `new` creates each helper object.
The decoder's `{ fatal: true }` setting means malformed UTF-8 raises an error
rather than silently replacing invalid data.

This complete local example demonstrates the three representations.
Save it as `decode-order.js` and run `node decode-order.js`:

```js
const text =
  '{"id":"order-17","customerId":"customer-17","status":"submitted"}';
const bytes = new TextEncoder().encode(text);
const decodedText = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
const order = JSON.parse(decodedText);

console.log(order.status);
```

The output is `submitted`. The stages are:

```text
JSON text -> UTF-8 bytes -> JSON text -> JavaScript object
```

This is a local conversion example, not a captured service response.
Invalid UTF-8 fails at decoding; text that is not valid JSON fails at parsing.
A JSON parse can also succeed for an object whose status is a number, so it
is still not the customer-specific validation from Bite 8.

### What should the Rust boundary carry?

The **Rust driver** is the separately owned component that manages Cosmos
requests, including selecting where to send them and retrying eligible
failures. It handles the service's network protocol, the rules governing
the exchanged messages. It does not need Alpha Bank's `Order` interface.

A **binding** connects the two languages and converts transferred values.
Our proposed read boundary needs a documented response representation:

```text
driver produces the agreed response body
    -> binding transfers text or bytes to JavaScript
    -> JavaScript constructs the item object
    -> SDK places it in ItemResponse.resource
```

The **gateway** is the service backend's front end for these requests.
**Gateway V2** is the newer gateway data-request protocol required by this
prototype. Its network message is not automatically a string suitable for
`JSON.parse`. The driver must handle protocol decoding, and the integration
must select or convert its supported body format before JavaScript parses it.

### Why must a byte buffer's lifetime be clear?

A **buffer** is memory holding data such as response bytes. A **view** refers
to part or all of that memory without necessarily copying it.
The encoder above returns a `Uint8Array`, a JavaScript view of bytes.
Node.js's `Buffer` is another byte-oriented type.

If only part of a buffer contains the response, the integration must transfer
that part, not the entire underlying memory. An **offset** identifies where
the part starts, and its **length** identifies how many bytes it contains.

The memory must also remain valid while JavaScript uses it. Copying the bytes
into independently managed storage is one way to achieve that separation.
**Zero-copy** describes a particular transfer that avoids that copy; it still
needs a way to keep the original memory alive. It does not eliminate JSON
parsing or every other allocation.

**The concept to keep:** decoding bytes, parsing JSON, and validating an
order are different jobs. A safe transfer must specify both the representation
and who keeps its memory alive.

Sources: [Encoding API][encoding], [JSON.parse][json-parse],
[schema-agnostic driver boundary](../../../azure-sdk-for-rust/sdk/cosmos/docs/adrs/0002-schema-agnostic-driver-boundary.md).

## Bite 13 of 18: What Rust concepts does this read need?

The proposed integration hands `order-17` from JavaScript to Rust.
Rust must keep that input available while the read waits, then return either
response data or an error. We can introduce its vocabulary through those needs.

### First, where is the Rust code built?

A **crate** is a Rust unit of code that is compiled as a library or program.
**Cargo** is Rust's build and dependency tool. `Cargo.toml` declares the crate
and the other crates it needs; `Cargo.lock` records the resolved versions
and sources used for the build.

A Cargo **feature** selects optional code or dependencies at build time.
That is different from choosing between already-built implementations
when the application runs.

### Who keeps the item ID alive?

Rust's **ownership** rules identify which value is responsible for another
value's lifetime and cleanup. An owned `String` holds text such as `order-17`.
A **borrow** accesses existing data without taking over ownership; `&str`
is a borrowed view of text.

For an asynchronous call, temporary access to JavaScript's input is not enough
if the Rust operation uses it after the original call returns. The binding
must obtain data it can safely keep for the required duration.

For response data, `Vec<u8>` is an owned sequence of bytes: `u8` is an unsigned
eight-bit integer, and `Vec` manages a growable sequence. It is one possible
body representation, not a claim that every driver response uses that exact type.

### How are missing values and failures represented?

Rust names these choices explicitly:

| Rust type | Alternatives | Example in this integration |
|---|---|---|
| `Option<T>` | `Some(value)` or `None` | A stored driver reference can be present, or absent after close |
| `Result<T, E>` | `Ok(value)` or `Err(error)` | Initialization can produce a driver or fail |

`T` and `E` are type placeholders, similar to the type parameter in Bite 9.
`T` stands for the contained value's type; `E` stands for the error's type
in `Result`.
Missing data and an operation failure are different choices.

On a `Result`, the `?` operator takes the successful value or returns the
error from the current function. It does not log, ignore, or automatically
convert that error into an `ItemResponse`; the binding still owns its
JavaScript error mapping.

### What if several operations need the same driver?

`Arc<T>` provides **shared ownership**: several owning references keep one Rust
value alive, and that value can be dropped when the last one is released.
Cloning an `Arc` creates another owning reference, not a second driver.

This is useful when concurrent reads must retain the same initialized driver.
It does not make every possible value inside the `Arc` safe to modify
concurrently. Changes to shared state still need appropriate coordination.

### What runs an asynchronous Rust operation?

Calling a Rust `async fn` produces a **future**, a value representing the
work and its eventual result. Unlike calling an async JavaScript function,
merely creating that Rust future does not execute its function body.

An **executor** drives futures forward. It **polls** a future: asks it to make
progress and report whether its result is ready. If the future must wait,
the executor can work on other tasks and revisit it when notified.

**Tokio** is the asynchronous runtime used by this binding. It provides an
executor and facilities such as asynchronous network waiting. The binding
must arrange for the driver's futures to run there; Node.js's event loop
does not automatically execute them.

**The concept to keep:** Rust needs valid input lifetimes, explicit
success/error handling, and an executor to drive asynchronous work.
These are separate responsibilities, not benefits obtained just by using
the `async` keyword.

Sources: [Rust ownership][rust-ownership], [Rust Arc][rust-arc],
[Rust futures][rust-futures], [Cargo features][cargo-features].

## Bite 14 of 18: How does NAPI-RS connect JavaScript to Rust?

We now know what JavaScript expects and what Rust needs. Next we need a
concrete way to implement the binding introduced in Bite 12.

### Why cannot a TypeScript declaration do that job?

A declaration describes a call to the compiler. It does not contain the
machine code or runtime conversions that execute the Rust function.

A **native addon** is compiled code loaded into the Node.js process.
**Node-API** is Node.js's interface for such addons. **NAPI-RS** is the Rust
framework used here to build the binding through Node-API.

The binding runs in the same process as the customer app. It is not another
service that the app contacts over the network.

### Start with the boundary we have actually implemented

The native **probe**, a small function testing the language connection,
takes the string `order-17` and eventually returns
`rust-probe:order-17`. It is deliberately not an item read.

The Rust function has a `#[napi]` **attribute**, a compiler-facing marker
that tells NAPI-RS to generate the code exposing that function to JavaScript.
With the Tokio integration enabled, that exposed async function becomes
a JavaScript call returning a Promise.

```text
JavaScript calls the exposed function with "order-17"
    -> binding converts the input into Rust-owned text
    -> NAPI-RS arranges for the future to run on Tokio
    -> Rust finishes with "rust-probe:order-17"
    -> binding converts the result into a JavaScript string
    -> the JavaScript Promise fulfills
```

The input travels into Rust, while the returned Promise lets JavaScript wait
without blocking its thread for the whole operation.
A normal Rust error becomes a JavaScript rejection through the binding.
A fatal process failure is different; sharing a process means the addon
is not an isolation boundary against a native crash.

### What must change for the actual item read?

The **JavaScript wrapper** means the SDK code that keeps the existing public
API while delegating work internally. For the proposed read, responsibility
will move through these components:

| Component | Why it is needed |
|---|---|
| JavaScript wrapper | Accept the public call and preserve SDK response and error behavior |
| NAPI-RS binding | Transfer inputs, invoke the driver, and return its result or error |
| Rust driver | Execute the Cosmos operation against the service backend |
| JavaScript wrapper on return | Construct `ItemResponse` so the customer app sees its existing API |

The probe demonstrates the language boundary only. The native client now
adds account setup and an internal driver-backed `readItem` operation,
with a Buffer and selected metadata rather than a public `ItemResponse`.
The [implementation guide](read_item.md#bite-15-how-does-the-native-client-read-an-item)
records that operation's evidence and remaining Gateway V2 blocker.
The Promise exposed by the eventual public read must represent that complete
operation, not just successful submission to Rust.

**The concept to keep:** NAPI-RS supplies the language connection and async
bridge. It does not supply Cosmos behavior or preserve the JS SDK contract
without our integration code.

Sources: [Node-API][node-api], [NAPI-RS async functions][napi-async],
[NAPI-RS type conversions][napi-conversions],
[native probe source](../../sdk/cosmosdb/cosmos/rust-prototype/src/lib.rs).

## Bite 15 of 18: What must be built and loaded?

The previous bite explained the call once the native code is available.
Alpha Bank's running app must first be able to find and load that code.
This returns us to Bite 1's distinction between preparing code and executing it.

### First, how does one file use code from another?

A **module** groups code that can expose named values for other modules to use.
An **export** makes a value available; an **import** names what another module
wants to use.

In a customer app configured for JavaScript modules, this SDK import makes
`CosmosClient` available:

```ts
import { CosmosClient } from "@azure/cosmos";
```

`CosmosClient` is a **class**, a definition for creating objects with related
state and methods. `new CosmosClient(...)` creates an **instance**, one such
object with its own configuration. The `client` used in Bite 9 is an instance.

Importing the SDK and constructing the client are different actions.
Neither is the customer's call to read `order-17`.

### Why are declarations and an addon both needed?

The files involved have different jobs:

| File kind | Used for | Cannot substitute for |
|---|---|---|
| JavaScript (`.js`) | Executable wrapper and loading instructions | The compiled Rust implementation |
| TypeScript declaration (`.d.ts`) | Names and types for the compiler to check | Runtime code or input validation |
| Native addon (`.node`) | Compiled code that Node.js loads and calls | The SDK's JavaScript response shaping |

A **loader** is the code that locates and loads the implementation.
NAPI-RS tooling can generate loaders and declarations, but the local prototype
currently uses its explicit Cargo build helper and direct addon loading.
It has not yet packaged a native loader into the normal SDK import.

### Follow build time and runtime separately

```text
Build time
    -> TypeScript tooling prepares JavaScript and type declarations
    -> Cargo compiles the binding and Rust dependencies
    -> the native build helper prepares the .node file

Runtime
    -> Node.js loads the relevant JavaScript and native files
    -> JavaScript calls an exported native operation
    -> the compiled Rust code executes
```

A compiler error is a preparation failure. A missing `.node` file is a
loading failure. A native function rejecting its Promise is a call failure.
These need separate evidence and error handling.

### Can the same compiled file be copied to every machine?

No. A **build target** identifies the system the binary is compiled for,
including its operating system and processor architecture. Windows x64
and Linux ARM64 are different targets.

Node-API compatibility concerns the native interface supported by Node.js;
it does not make a Windows binary load on Linux. A distribution must include
an appropriate addon and a loader that selects it.

The current prototype produces a local addon, not a complete distribution
for every supported system. Before release, it must also be tested from
the packaged SDK installed into a separate customer-style app, not only
from the development checkout.

A stale addon can execute old Rust even when the TypeScript file has changed.
That is why the prototype build removes the previous addon before rebuilding
and why later runs must identify the binary they actually loaded.

**The concept to keep:** correct types, a successful build, and successful
loading are three different facts. Missing native code must fail visibly,
not silently select the old implementation.

Sources: [TypeScript modules][ts-modules], [Node addons][node-addons],
[NAPI-RS attributes][napi-attributes],
[local build helper](../../sdk/cosmosdb/cosmos/rust-prototype/build.cjs).

## Bite 16 of 18: Why does driver initialization need its own lifetime?

The binding is loadable, but an account read needs more than an item ID.
The driver needs the **account endpoint**, the gateway address, and
**credentials**, information used to authorize its requests.
It also needs account information before it can execute reads.

### Why keep the initialized driver?

**Initialization** is the setup that makes a component ready for use.
For the inspected driver, `create_driver` fetches account metadata and
prepares account-specific **transport** state, the resources used to send
and receive network data. **Metadata** here means information
about the account and its endpoints, rather than the contents of `order-17`.

Repeating that work for each read would discard useful state and add setup
work to every operation. Instead, the native client retains a driver that
later calls can reuse.

There are two different runtime concepts:

| Component | Job |
|---|---|
| Tokio runtime | Schedule and drive asynchronous Rust work |
| `CosmosDriverRuntime` | Hold Cosmos-specific resources, including transport settings and saved metadata |

The account-specific `CosmosDriver` uses `CosmosDriverRuntime`; that does not
make either of them a replacement for Tokio.

### How does the current native client wait for setup?

The implemented internal `NativeReadClient` exposes an asynchronous
**factory method**, a method that creates an instance and returns it when
ready. JavaScript calls `NativeReadClient.create(endpoint, accountKey)`.

Its Promise fulfills with the native client only after driver initialization
succeeds. Runtime or account initialization errors reject it. The native
client then keeps a reference to the driver, and the driver keeps its
Cosmos-specific runtime alive.

This is the direct binding API used by the local initialization check.
It has not replaced the customer's **synchronous** `new CosmosClient(...)`,
which returns its instance directly rather than through a Promise.

### What must the public SDK integration decide?

A future public read can need asynchronous setup even though the public
client constructor is synchronous. One proposed design is to retain an
**initialization Promise** inside each selected SDK client.

If two reads arrive before setup completes:

```text
first read -> start initialization and retain its Promise
second read -> wait for that same Promise
initialization succeeds -> both reads can use the initialized driver
```

The wrapper must store the Promise before another read can start competing
initialization. On failure, the waiting reads must observe the failure.
Whether a later call may retry initialization is a policy to implement
explicitly, not an excuse to silently fall back to JavaScript.

This shared-Promise flow is proposed SDK integration, not behavior proved
by merely creating one native client in the current test.

**The concept to keep:** account setup and an individual read have different
lifetimes. Keep reusable driver state at client scope and distinguish the
implemented native factory from the still-unconnected public read path.

Sources: [native client](../../sdk/cosmosdb/cosmos/rust-prototype/src/client.rs),
[driver creation](../../../azure-sdk-for-rust/sdk/cosmos/azure_data_cosmos_driver/src/driver/runtime.rs).

## Bite 17 of 18: How do cancellation and closing differ?

Alpha Bank may stop needing one order read while keeping the client for
other work. Later, the application may finish with the client entirely.
Those are different events, so they need different behavior.

### First, cancel one operation

**Cancellation** is a request to stop unfinished work.
An **AbortController** is a JavaScript object that can issue that request;
its **AbortSignal** is the object an operation observes to learn about it.

An **options object** groups settings for this particular call.
Here it passes the signal to the SDK. `abort()` requests cancellation;
it does not wait for the operation to stop.

Using an existing `orderItem`, this fragment belongs inside an async function:

```ts
const controller = new AbortController();
const pendingRead = orderItem.read<Order>({ abortSignal: controller.signal });
controller.abort();
await pendingRead;
```

The final `await` observes the operation's actual outcome, including rejection.

The existing JavaScript transport observes a supplied signal. An eventual
Rust read needs a binding connection to the Rust operation as well.
Merely accepting an `abortSignal` property would not implement cancellation.
The current native client has no read operation to cancel yet.

### What if another read still needs initialization?

Suppose two reads wait for the shared setup proposed in Bite 16, and Alpha
Bank cancels just one. Stopping that shared setup could unnecessarily fail
the other read. Per-read cancellation must be distinguished from stopping
the whole client.

An operation may also complete while cancellation is being requested.
The integration needs one observable outcome and correct cleanup for either
ordering. It must remove any cancellation callback it no longer needs and
must not free memory still used by active Rust work.

A **deadline** is a latest allowed completion time. A **timeout** limits how
long a particular piece of work may wait. A timeout on one network
attempt is not automatically a deadline for the entire public call, which
can also include initialization, waiting, and retries. Those limits must be
defined before comparing failure behavior or latency.

### Then, close the client when its work is finished

**Disposal** or **closing** releases a client's resources and ends its intended
use. It must specify what happens to new calls and any already-running calls.
It is not synonymous with cancelling one read.

The native prototype's `close()` currently releases the binding's driver
reference. A second close is harmless, and later access to its account
endpoint reports a closed-client error. The internal `readItem` acquires its
own reference before returning its Promise: an accepted read can finish
after close, while a new read rejects. This does not establish cancellation
of in-flight reads or shutdown of process-wide runtime resources.

The existing public `CosmosClient.dispose()` is synchronous and clears SDK
background state. It is not already a Promise-returning method that waits
for Rust operations. Connecting the two lifecycles remains integration work.

**Garbage collection** is automatic reclamation of JavaScript objects that
are no longer reachable. Its timing is not a dependable instruction to stop
network work now; an explicit resource-release contract is still needed.

**The concept to keep:** cancel a read, finish shared initialization, and close
a client are three different actions. None should accidentally stand in for
the others.

Sources: [SharedOptions](../../sdk/cosmosdb/cosmos/src/request/SharedOptions.ts),
[RequestHandler](../../sdk/cosmosdb/cosmos/src/request/RequestHandler.ts),
[CosmosClient.dispose](../../sdk/cosmosdb/cosmos/src/CosmosClient.ts),
[native client](../../sdk/cosmosdb/cosmos/rust-prototype/src/client.rs).

## Bite 18 of 18: What does each check actually prove?

Alpha Bank's desired outcome is unchanged: the public read returns the
stored order with the expected response behavior. We can now separate the
steps needed to reach that outcome from the evidence for each one.

### Build a chain of evidence, not one success label

| Check | What it establishes | What remains unproved |
|---|---|---|
| TypeScript checks pass | Source uses the declared types consistently | Received data is valid |
| JavaScript and native builds pass | The build tools produced their outputs | Node.js loaded the intended addon |
| Native probe completes | JavaScript can call the compiled binding | The driver can initialize an account |
| Live native initialization completes | A driver initialized against the test account | An item was read |
| Public item read returns the expected response | That tested call delivered the expected item and metadata | All legacy behavior and failure cases match |
| The data request is verified as Gateway V2 | The required protocol handled that request | Performance is better |
| Controlled repeated runs are compared | The measured workload has observed results | Untested workloads or systems behave the same way |

Source inspection, test assertions, and executed checks also differ.
Reading an assertion tells us what a test intends to check; a recorded
successful run tells us it actually passed in that environment.

### Keep build tools out of the runtime explanation

This repository uses **pnpm**, a package manager, to manage JavaScript
dependencies. A **workspace** groups related packages in the same repository.
**Turborepo** orders their build tasks so prerequisite packages are built
when needed.

These are preparation tools, not components through which each customer's
read travels. The read-item guide supplies the
[scoped build procedure](read_item.md#concept-27-of-approximately-32-build-the-intended-sdk-and-artifacts);
this guide does not require a workspace build to run its standalone
language examples.

### Measure the outcome the customer actually waits for

**Latency** is elapsed time for an operation. For this experiment, measure
from invoking the public read until its Promise settles, not just until the
binding accepts the request.

Keep first-use initialization separate from later reads using an initialized
client. Report failures as failures, not as fast successful reads.
Diagnostic collection can itself add work, so detailed investigation and
clean timing runs must be distinguishable.

The [workload reference](read_item.md#concept-31-of-approximately-32-run-the-sustained-vm-workload)
holds the measurement plan. It is not evidence that a workload has already run.

### What is implemented at this point?

The [read-item guide](read_item.md) records the current implementation:
read-path selection, an asynchronous native probe, live account initialization,
and an internal native item read compared against legacy JavaScript on both
an isolated temporary fixture and retained prototype resources. The retained
database is `js_rust_read_item_db`; its container is
`js_rust_read_item_container`. Earlier reads used Gateway V1. On October 24,
2026 (UTC), discovery advertised Gateway V2 endpoints and the native read
retained a successful `data_plane / gateway_v2 / 200` request. Its parsed item
matched the legacy read, and the unchanged Gateway V2 check passed.
The [read-item guide](read_item.md) records the evidence and its limits.
On October 25, 2026 (UTC), the public Rust-selected `Item.read()` also passed
live comparisons in the built CommonJS and ESM packages, including the normal
200 result and a missing-item 404 response. Its response adapter preserves
the public response class and carries partial native request evidence through
the diagnostics wrapper. The read remains explicitly scoped to account keys,
supplied string partition keys and no request options; see Bite 16 for setup
and unsupported behavior.

This guide has explained the concepts needed to connect the pieces; it does
not turn unimplemented cancellation, complete response/error parity or
production packaging into completed functionality.

### What belongs later, rather than in the current prerequisites?

The account-key initialization path does not call a JavaScript credential
provider. If a later authentication mode requires such a provider, the next
lesson must first explain why Rust needs to call back into JavaScript.
The implementation plan must then cover scheduling that call on the right
JavaScript thread, awaiting a provider's Promise, forwarding errors, and
avoiding a situation where each side blocks waiting for the other.

NAPI-RS's [ThreadsafeFunction][napi-tsfn] is a mechanism to evaluate at that
point, not permission to access arbitrary JavaScript objects from Rust threads.
Similarly, Node worker-pool choices, source-level debugging, and packaging
for additional systems belong with the work that needs them.

**The concept to keep:** each stage needs its own evidence. Continue with
[the read-item walkthrough](read_item.md) to apply these foundations to the
existing read and the measured prototype.

## Sources

Local links refer to this JavaScript checkout or named sibling checkouts.
The prototype guide records revisions and their evidence limits.
Language references explain constructs; SDK source determines SDK behavior.

[node-addons]: https://nodejs.org/api/addons.html
[node-api]: https://nodejs.org/api/n-api.html
[ts-modules]: https://www.typescriptlang.org/docs/handbook/2/modules.html
[ts-types]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
[ts-objects]: https://www.typescriptlang.org/docs/handbook/2/objects.html
[promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
[async-functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[promise-all]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[event-loop]: https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop
[encoding]: https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API
[json-parse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[rust-ownership]: https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html
[rust-arc]: https://doc.rust-lang.org/std/sync/struct.Arc.html
[rust-futures]: https://doc.rust-lang.org/book/ch17-01-futures-and-syntax.html
[cargo-features]: https://doc.rust-lang.org/cargo/reference/features.html
[napi-async]: https://napi.rs/docs/concepts/async-fn
[napi-attributes]: https://napi.rs/docs/concepts/napi-attributes
[napi-tsfn]: https://napi.rs/docs/concepts/threadsafe-function
[napi-conversions]: https://napi.rs/docs/concepts/type-conversions
