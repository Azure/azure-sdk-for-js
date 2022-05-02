# Performance Testing for Avro Serializer

## Instructions

1. Build the schema-registry perf tests package `rush build -t perf-schema-registry-avro`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create an Event Hubs account and populate the `.env` file with the relevant credentials.
4. Run the tests as follows

   - serialize
     - `npm run perf-test:node -- SerializeTest --warmup 1 --iterations 10 --parallel 100 --duration 15 --items-count 1000`

   - deserialize
     - `npm run perf-test:node -- DeserializeTest --warmup 1 --iterations 10 --parallel 100 --duration 15 --items-count 1000`
