### Guide

1. Build the arm-network perf tests package `rush build -t perf-arm-network`.
2. Copy the `sample.env` file and name it as `.env`.
3. Populate the `.env` file
4. Run the tests as follows

   - list test
     - `npm run perf-test:node -- ListTest --warmup 2 --duration 10`
