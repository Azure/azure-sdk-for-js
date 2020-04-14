# Coordinate message settling with Receiver shutdown in @azure/service-bus v7

Users are having issues with coordinating the proper settling of
messages in combination with closing their Receiver. This can happen
when the user uses our push methodology (via `subscribe`) and attempts
to close the Receiver.

In all cases this proposal only applies to Receivers that were opened in
`peekLock` mode.

## How our current design works

Service Bus has some situations where settling on the receiver
where the original message was received is important.

Most of the time this works out transparently to the user - a typical
usage pattern for Service Bus would be:

```typescript
receiver.subscribe({
  processMessage: async (msg) => {
    // do something with `msg`
  },
  // ... other parts elided for example.
  {
    // this is actually the default
    autoComplete: true
  }
});
```

In this case if we do not throw an Error in `processMessage` the
message will be automatically completed for the user.

## Where our current design falls down

However, some users do something more akin to this:

```typescript

const someOutsideStoreOfMessages = [];

receiver.subscribe({
  processMessage: async (msg) => {
    someOutsideStoreOfMessages.push(msg);
  },
  // ... other parts elided for example.
  {
    // ie: I want to handle completing the message
    autoComplete: false
  }
})

// ...in another part of their application

// by some other criteria decide to commit the messages
for (const msg of someOutsideStoreOfMessages) {
  await msg.complete();
}

```

In this model users must now make sure that the `receiver` remains open
until they complete their last message.

If the user closes the Receiver to "stop" the subscription they will now run into the
problem where they must have the original Receiver to complete any outstanding
messages.

If they leave it open then they will continue to receive any other messages, making it
difficult to properly stop.

## Design ideas

Some options to consider:

1. Make `close()` more intelligent.

   Currently `close()` just shuts things down without any regard for messages that are outstanding (ie,
   reasons to keep the link open). One option is to add a configuration parameter that would allow
   the user to say "close but ignore all connections" or "close _after_ any outstanding messages are settled".

   The default would be "close but ignore all connections" in order to avoid any surprises for users that expect
   close() to be immediate. Advanced users can change this behavior.

   ```typescript
   receiver.close({
     afterMessagesSettled: true,
   });
   ```

2. Add a `stop()` method at the Receiver level.

   We could make it possible for users to stop (ie, `pause`) a receiver (meaning - remove credits and subscription
   event handlers).

   However, if the 'stop()' is generally followed by a `close()` then we're probably better off with option #1.

   As part of different PR for track 1 we are adding in an `open()` call which might pair nicely with this.

3. Return a subscription instance from `subscribe` that provides methods for the user to "stop" the subscription.

   In Event Hubs we return a Subscription object from the subscribe() method that provides a way for the user to stop
   that particular receive operation. We could do the same here.
