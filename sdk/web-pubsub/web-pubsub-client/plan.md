# Outbound Streaming Redesign Plan

## Core Correction

The previous plan overstated session responsibility during reconnect.

This must be corrected:

- a stream belongs to a specific `connectionId`
- if reconnect is **non-recoverable**, the client connection is effectively new
- once `connectionId` changes in that way, the old outbound stream session is no longer the same stream context
- from the old session's point of view, that is simply **abort**

Therefore:

- `OutboundStreamSession` should **not** model non-recoverable reconnect restart semantics
- `OutboundStreamSession` should **not** try to turn non-recoverable reconnect into "restart same session"
- if the client later creates a new outbound stream on a new connection, that is a **new session**, not a resumed old one

This changes the plan materially.

---

## Goal

Rebuild outbound streaming around a small number of cohesive abstractions:

- `AsyncSeqQueue` owns ordered outbound actions and the main waiting behavior
- `OutboundStreamSession` owns stream semantics only
- `WebPubSubClient` owns connection lifecycle and maps it into session controls
- the send loop should be queue-driven and easy to read

The main principle is:

- **pause/resume belongs to queue/session abstraction**
- **abort belongs to session lifetime**
- **recoverability policy belongs to client/connection layer**

---

## Key Conclusions

### 1. Non-recoverable reconnect is not a session concern

What matters is not "should session resend start after unrecoverable reconnect?"

What actually matters is:

- unrecoverable reconnect means a new client connection context
- the previous stream session is attached to the old connection context
- therefore the old session should be aborted and cleaned up

So the session should never encode logic like:

- resume old session as if it were the same stream after non-recoverable reconnect
- treat a dead session on a new connection as something that can still be revived

That is the wrong model.

Correct model:

- **recoverable transport interruption** => same session may pause/resume
- **non-recoverable reconnect / new connection** => old session aborts

### 2. `complete` and `abort` are fundamentally different

This distinction is central.

#### `complete`

- initiated by user API
- enters the outbound send order
- should be represented as an outbound action
- only waits until the complete action is **sent**, not until the stream is truly closed remotely

#### `abort`

- initiated by connection death, unrecoverable close, client stop, or service-forced terminal failure
- ends session lifetime immediately
- does not try to send a normal terminal frame
- just cleans up and rejects pending work

So:

- `complete` is an action in the outbound stream
- `abort` is a lifetime cut-off of the session itself

### 3. `end` should be in the queue

The queue should store outbound **actions**, not only data.

Strong direction:

- queue should contain both `data` and `end`
- loop should just dequeue action and process by `type`

This gives the cleanest control flow:

- `publish()` => enqueue `data`
- `complete()` => enqueue `end`
- loop => dequeue next action and send it

That removes the need for a separate end-control path in the loop.

### 4. keepalive should fail when it cannot send

Correct API meaning:

- keepalive is an explicit caller action
- if session cannot currently send, keepalive should throw
- it should not silently no-op

Whether keepalive itself should be queued is a separate question.
But failure semantics are clear:

- **cannot send => reject/throw**

### 5. Queue pause/resume is the right waiting primitive

The current session contains too much manual deferred coordination.

The better model is:

- queue can be paused
- queue can be resumed
- paused queue causes `dequeue()` to await naturally
- closed/aborted queue causes `dequeue()` to reject naturally

This means the loop should not have to manage explicit resume deferreds just to represent temporary inability to progress.

### 6. `AbortSignalLike` belongs at the dequeue boundary

A session-scoped abort signal is a good fit.

Desired meaning:

- session loop keeps waiting on queue until aborted
- abort cancels the loop's pending dequeue
- session abort is therefore represented naturally at the main waiting point

This is a cleaner lifetime model than scattering close checks around the loop.

---

## Problems In Current Design

### 1. Session mixes stream logic and connection logic

Current session logic still knows too much about:

- connection active/inactive behavior
- reconnect consequences
- special wake-up mechanics for transport progression
- separate handling paths for data and end

This makes `_runSendLoop()` read like a transport-state machine rather than a stream-action processor.

### 2. Too many state carriers

Current state is split across several layers:

- business state
- loop scheduling state
- waiter bookkeeping state
- connection-driven gating state

Not all of these are true stream state, but they all affect the loop.

### 3. Too many await categories

The send loop should ideally have very few kinds of waiting.

Right now the conceptual waits include:

- queue item availability
- connection becoming sendable
- resume signals
- start send
- data send
- end send

That usually means the abstraction boundary is wrong.

---

## Target Architecture

## 1. `AsyncSeqQueue<OutboundStreamAction>`

`AsyncSeqQueue` becomes the main ordered action store and main wait surface.

Responsibilities:

- ordered enqueue
- dequeue in sequence order
- ack / trim
- pause / resume
- close
- optional dequeue abort support via `AbortSignalLike`

It should not know anything about Web PubSub protocol semantics.
It only knows action ordering, acked prefix trimming, and wait mechanics.

## 2. `OutboundStreamSession`

Session responsibilities should be reduced to:

- own one outbound action queue
- expose stream API (`publish`, `complete`, `keepalive`)
- expose transport gating (`pause`, `resume`)
- expose lifetime end (`abort`)
- translate dequeued actions into send operations
- maintain only the minimum stream-local state needed

It should not reason about:

- recoverable vs non-recoverable reconnect policy
- whether a new connection should be treated as old-session abort plus possible future new-session creation
- connection polling loops

## 3. `WebPubSubClient`

Client responsibilities:

- own connection lifecycle
- decide whether a disconnect is recoverable or not
- pause existing sessions on recoverable interruption
- resume existing sessions on actual recovery success
- abort old sessions on non-recoverable close / new connection context
- create new sessions only when user creates new streams

This is the correct place for connection policy.

---

## Refined Session Semantics

## 1. Session controls

Session should eventually expose only these controls:

- `publish(...)`
- `complete(...)`
- `keepalive(...)`
- `pause()`
- `resume()`
- `abort(reason)`
- `ack(expectedSequenceId)`
- `onError(...)`

No session API should encode recoverability policy directly.

## 2. Session state target

True session state should be as small as possible.

The real stream-level distinctions are:

- whether `streamStart` has been sent for this still-valid stream context
- whether session has been aborted
- whether the user has already requested normal completion

If `end` is encoded as a queued action, then even "user requested complete" may not need its own strong business-state field beyond a write-guard if needed.

The target is to reduce session business state roughly to:

- `started`
- `aborted`
- possibly a minimal write-closed marker if queue contents alone do not express it cleanly

Everything else should be queue contents or waiter bookkeeping.

## 3. `complete()` semantics

`complete()` should:

- enqueue an `end` action
- return a promise that resolves once that `end` action is sent
- not wait for remote close/ack/streamClosed
- stop accepting new user writes after `end` is enqueued
- keep the loop alive after sending `end`; do not close the queue just because `complete()` was called

This preserves a clean distinction:

- sender complete = sender emitted terminal action
- actual remote closure = separate incoming event path
- queue close / loop exit = only after incoming close or abort

## 4. `abort()` semantics

`abort()` should:

- end the session lifetime immediately
- abort queue waiting / close queue
- reject pending action waiters
- not enqueue any terminal action
- not attempt normal stream shutdown

This is the correct behavior for:

- unrecoverable disconnect
- client stop
- service-forced terminal shutdown of this stream

---

## Refined Reconnect Model

This section replaces the previous incorrect restart-focused and restore-focused model.

### Recoverable interruption

If the client can genuinely recover the same connection context, then the same stream session may continue.

Client behavior:

- call `pause()` on session when transport becomes temporarily unavailable
- if the connection context is truly recovered, call `resume()`

Session interpretation:

- nothing about "recoverable" as a concept
- just paused queue, then resumed queue
- unacked actions remain part of session state until they are acked or the session is aborted

### Non-recoverable reconnect / new connection

If the connection is no longer the same stream context, then:

- the old session must be aborted
- no "restart old session" behavior should exist
- any new stream on the new connection is represented by a new session created later

Client behavior:

- `abort(reason)` old sessions that belong to the dead connection context

Session interpretation:

- lifetime ended
- cleanup only

---

## Outbound Action Model

## 1. Queue item should be an action union

Direction:

```ts
type OutboundStreamAction =
  | {
      sequenceId: number;
      type: "data";
      data: JSONTypes | ArrayBuffer;
      dataType: WebPubSubDataType;
    }
  | {
      sequenceId: number;
      type: "end";
      options?: EndStreamOptions;
    };
```

This is the conceptual target, not a final exact type signature.

## 2. Why queue `end`

Benefits:

- data and complete share the same ordering mechanism
- loop is simpler
- no separate pending-end control path is needed in the loop
- completion semantics become "action sent" rather than "special side workflow"

## 3. Sequence id for `end`

Current direction:

- allow `end` to carry sequence id so queue handling remains uniform

But this still needs protocol validation:

- confirm whether `end` should be replayed/acked exactly like `data`, or only ordered like data but trimmed differently

So the firm conclusion is:

- `end` should be queued
- exact ack/replay treatment of `end` must be verified before final implementation

---

## Queue Changes

## 1. Add pause / resume

Queue should gain:

- `pause()`
- `resume()`

Behavior:

- if paused, `dequeue()` waits even when items exist
- when resumed, `dequeue()` continues naturally

## 2. Add abort-aware dequeue

Direction:

- `dequeue(abortSignal?: AbortSignalLike)`

Behavior:

- if aborted while waiting, reject
- session loop exits naturally

## 3. Keep replay logic in queue

Keep:

- `ack(expectedSequenceId)`

Pause/resume/abort must not redefine replay semantics.

They only control progression and lifetime.

Replay should not be modeled as a separate session-to-queue `restore` command.
The important state is simply:

- what has been acked
- what remains unacked
- whether sending is paused or aborted

---

## Session Changes

## 1. `publish()`

- enqueue `data`
- return a promise tied to that action's send completion

## 2. `complete()`

- enqueue `end`
- return a promise tied to that action's send completion
- do not wait for remote closure
- close writes, not the queue/loop itself
- keep the session alive until incoming close or abort

## 3. `keepalive()`

- must fail if session cannot currently send
- should not silently no-op
- may remain out-of-band for now unless later design proves queued keepalive is cleaner

## 4. `pause()` / `resume()`

- should delegate to queue gating
- should not manage their own ad hoc deferred system if queue already models pause/resume

## 5. `abort(reason)`

- must terminate session lifetime
- must cancel queue waiting and reject pending waiters
- must not emit normal terminal send action

---

## Loop Target Shape

The loop should be reduced to something conceptually close to:

```ts
while (true) {
  const action = await queue.dequeue(sessionAbortSignal);
  await ensureStartedIfNeeded();
  await sendAction(action);
}
```

This is the target shape.

That means the loop should ideally only contain these await categories:

- `await queue.dequeue(...)`
- `await sendStart/sendData/sendEnd`

Not these categories:

- manual connection-active waits
- manual resume deferred waits
- separate loop branch systems for data vs end vs idle transport states

If a tiny write-guard or one-time start check remains, that is fine.
But transport lifecycle should not dominate the loop.

Also, sending `end` should not itself terminate the loop.
After `end` is sent, the loop should remain alive until the stream is actually closed or aborted.

---

## Implementation Phases

## Phase 1: redesign `AsyncSeqQueue`

Implement and test:

- pause / resume
- dequeue abort support
- action-friendly queue usage
- correct behavior of pause/resume combined with ack/close

Validation focus:

- paused dequeue blocks
- resumed dequeue continues
- abort/close interrupts pending dequeue

## Phase 2: convert outbound queue payload from data to action

Introduce queued outbound action model:

- `data`
- `end`

Validation focus:

- enqueue/dequeue order
- end queued after data stays in order
- action waiters still resolve correctly

## Phase 3: reduce session control surface

Refactor session to:

- use queue pause/resume instead of internal wake-up deferreds
- use abort as lifetime end
- remove explicit non-recoverable reconnect logic from session

Validation focus:

- session no longer reasons about reconnect policy
- session still supports publish/complete ordering

## Phase 4: shrink send loop

Refactor `_runSendLoop()` so that it is queue-driven:

- dequeue action
- ensure start if needed
- send action

Validation focus:

- loop has very small branching surface
- no duplicated wait paths remain

## Phase 5: move final connection policy fully to client

Make client the only place that decides:

- when sessions pause
- when sessions resume
- when sessions abort permanently

Validation focus:

- recoverable interruption preserves same session
- non-recoverable reconnect aborts old session
- new connection does not try to revive old session

## Phase 6: finalize keepalive handling

After queue/session cleanup is complete, decide final keepalive placement:

- out-of-band with strict failure semantics
- or queued if that becomes clearly simpler and protocol-correct

But regardless:

- keepalive failure must be visible to caller

---

## Questions To Confirm Before Implementation

1. Should queued `end` participate in ack/reset exactly like data, or only in ordering?
2. Does protocol behavior require any special trim/replay treatment for `end`?
3. Should `dequeue(abortSignal)` be implemented directly in queue, or via queue close + external abort bridge?
4. Should `keepalive` remain out-of-band even after queue action unification?
5. Do we need a tiny explicit write-closed marker after `complete()` is enqueued, while still keeping the loop alive until close or abort?

---

## Non-Goals

- Do not change public `StreamPublisher` API surface.
- Do not encode non-recoverable reconnect restart logic inside session.
- Do not let queue learn connection policy.
- Do not over-generalize queue into a full scheduler.

---

## Success Criteria

This redesign is successful when:

- session loop reads like "dequeue action -> send action"
- non-recoverable reconnect is handled as old-session abort, not restart
- recoverable interruption is expressed as pause/resume
- `complete` and `abort` are fully separated semantically
- `complete` does not close the queue/loop immediately after sending `end`
- queue is the dominant waiting primitive
- session contains very little transport-specific logic
- replay behavior remains correct
- e2e and integration tests still pass
