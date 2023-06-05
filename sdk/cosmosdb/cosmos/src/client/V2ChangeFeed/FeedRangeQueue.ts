export class FeedRangeQueue<ChangeFeedRange> {
  private elements: ChangeFeedRange[];

  constructor() {
    this.elements = [];
  }

  public modifyFirstElement(newItem: ChangeFeedRange): void {
    if (!this.isEmpty()) {
      this.elements[0] = newItem;
    }
  }

  public enqueue(item: ChangeFeedRange): void {
    this.elements.push(item);
  }

  public dequeue(): ChangeFeedRange {
    return this.elements.shift();
  }

  public peek(): ChangeFeedRange {
    return !this.isEmpty() ? this.elements[0] : undefined;
  }

  public isEmpty(): boolean {
    return this.elements.length === 0;
  }
}
