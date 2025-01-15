// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export class Stack<T> {
  private items: T[] = [];

  // Push an element onto the stack
  push(element: T): void {
    this.items.push(element);
  }

  // Pop an element off the stack
  pop(): T | undefined {
    return this.items.pop();
  }

  // Peek at the top element of the stack
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Get the size of the stack
  size(): number {
    return this.items.length;
  }

  // Clear the stack
  clear(): void {
    this.items = [];
  }
}
