# Settlement methods for messages and impact on users

In the current design for v7 of the Service Bus SDK, across the 4 supported languages, there
are 3 places where settlement methods (complete, abandon, defer, deadLetter) live:

- On the receiver (Java, C#)
- On an object passed into the callback where you received your messages (C# via ServiceBusProcessor)
- On the message itself (Python, JavaScript)

There are some benefits to the JavaScript chosen path:

- Developers will not be forced to pass in a receiver to code that only expects to use or settle a message.
  This can aid with creating a better separation of concerns.
- The message is a likely location for settlement methods (debatable, but we've landed on this side of the debate)
- The current stable version of Azure Service Bus package for JavaScript has the settlement methods
  on the message. Compatibility is a strong argument.
- Settlement methods on the Receiver clutter up the interface.

Up until recently, the chosen location was primarily cosmetic.

## It's not cosmetic?

One use case that has come up is this:

```javascript
receiver.subscribe({
  processMessage: (msg) => {
    // (fire and forget - we don't need this message in this process anymore)
    const arbitraryTransformedData = arbitraryTransformForOtherService(
      msg.body
    );
    sendMessageToSomeOtherService(arbitrarilyTransformedData, msg.lockToken);

    // at this point the user wants to throw the contents of the message away
    // to save memory, for instance.
  },
  // ...rest of code elided ...
});
```

Which results in activity like this:

1. `receiver` -> sendMessageToSomeOtherService(arbitraryData, lockToken) -> `some other service`
2. `some other service` does some processing and now wants `receiver` to complete it.
3. `some other service` sends back the lock token (no need to send the _entire_ message or even parts of it)
4. `receiver` can complete with just the lock token.

Our currently chosen location for message completion doesn't provide a simple way to accomplish this task
using _only_ the lock token.

## Ideas

### Provide additional lock token overloads

We could add additional completion methods to Receiver.

```typescript
interface Receiver {
  complete(lockTokenOrMessage: string | { lockToken: string }, options);
  abandon(lockTokenOrMessage: string | { lockToken: string }, options);
  defer(lockTokenOrMessage: string | { lockToken: string }, options);
  deadLetter(lockTokenOrMessage: string | { lockToken: string }, options);
}
```

This would match with what other languages, like Java, are doing for their primary flow.

Some issues:

- Method clutter on the `Receiver`.
- Names have no logical grouping to indicate that they are settlement methods (this problem also exists
  when they are on `ReceivedMessageWithLock`).
  - Could tackle with a common prefix.
- The user has _two_ ways that they think they can use to settle messages.
  - (we could just remove these methods from the message and only provide this set)
- Users must pass the Receiver and message throughout their code
  - Could provide a Settlement interface to help them maintain abstraction throughout.

### Do nothing

We could do nothing. The customer impact would be that the would need to hold onto a map of their messages
so they could retrieve and settle the correct one using the lock token.

We've seen no issues on this in track 1, which has not had this feature.
