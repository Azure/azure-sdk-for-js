# Performance Testing for EventGrid

## Instructions

1. Build the eventgrid perf tests package `rush build -t perf-eventgrid`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create an EventGrid topic, configured to use the Cloud Event schema.
4. Run the tests as follows

   - send cloud events
     - `npm run perf-test:node -- SendCloudEventsTest --warmup 1 --iterations 1 --parallel 50 --duration 15 -n 50`
