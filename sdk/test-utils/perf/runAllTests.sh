#!/bin/bash

rushx clean
rushx build

npm run perf-test:node -- MockReceiverTest --warmup 2 --duration 4 --iterations 2
npm run perf-test:node -- NoOp --warmup 2 --duration 4 --iterations 2
npm run perf-test:node -- Delay500ms --warmup 2 --duration 4 --iterations 2
npm run perf-test:node -- Exception --warmup 2 --duration 4 --iterations 2
npm run perf-test:node -- PerfPolicyTest --warmup 2 --duration 4 --iterations 2 --url http://my-host.com/
