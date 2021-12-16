
export class Trace {
  name: string;
  guid: string;
  stackFrame: string;
  dateTime: string;
  timeSpan: string;
  traceLevel: string;
  traceComponent: TraceComponent;
  trace: Trace;
  children: [key: string, trace: Trace]
  iTraceInfo: string;
  
  public startChild(trace: Trace){
      this.children.push(trace)
    }
}


  enum TraceComponent
    {
        /// <summary>
        /// Component is yet to be categorized.
        /// </summary>
        Unknown,

        /// <summary>
        /// Component that handles authorizing requests and managing auth tokens / credentials.
        /// </summary>
        Authorization,

        /// <summary>
        /// Component that handles batch requests.
        /// </summary>
        Batch,

        /// <summary>
        /// Component that handles aggregating ChangeFeed results across multiple pages and partitions.
        /// </summary>
        ChangeFeed,

        /// <summary>
        /// Component that handles JSON reading, writing, navigating, serialization, and deserialization.
        /// </summary>
        Json, 

        /// <summary>
        /// Component that handles paging results within and across partitions from the service.
        /// </summary>
        Pagination, 

        /// <summary>
        /// Component that handles materializing a POCO.
        /// </summary>
        Poco,

        /// <summary>
        /// Component that handles client side aggregation of distributed query results.
        /// </summary>
        Query, 

        /// <summary>
        /// Component that handles aggregating ReadFeed results across multiple pages and partitons.
        /// </summary>
        ReadFeed, 

        /// <summary>
        /// Request Handler pipeline.
        /// </summary>
        RequestHandler,

        /// <summary>
        /// Component that handles routing requests to physical partitons and maintaining physical partition topology.
        /// </summary>
        Routing, 

        /// <summary>
        /// Component that handles sending requests over the wire (along with selecting the correct replica set for consistency).
        /// </summary>
        Transport,
    }
