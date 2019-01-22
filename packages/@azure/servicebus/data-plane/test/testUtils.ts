import { SendableMessageInfo, generateUuid } from "../lib";

export const testSimpleMessages: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${generateUuid()}`
  },
  {
    body: "hello2",
    messageId: `test message ${generateUuid()}`
  }
];

export const testMessagesToSamePartitions: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${generateUuid()}`,
    partitionKey: "dummy"
  },
  {
    body: "hello2",
    messageId: `test message ${generateUuid()}`,
    partitionKey: "dummy"
  }
];

export const testSessionId = "my-session";
export const testMessagesWithSessions: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${generateUuid()}`,
    sessionId: "my-session"
  },
  {
    body: "hello2",
    messageId: `test message ${generateUuid()}`,
    sessionId: "my-session"
  }
];
export const testMessagesToSamePartitionsWithSessions: SendableMessageInfo[] = [
  {
    body: "hello1",
    messageId: `test message ${generateUuid()}`,
    partitionKey: "dummy",
    sessionId: "my-session"
  },
  {
    body: "hello2",
    messageId: `test message ${generateUuid()}`,
    partitionKey: "dummy",
    sessionId: "my-session"
  }
];
