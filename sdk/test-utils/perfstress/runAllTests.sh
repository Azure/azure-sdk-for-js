#!/bin/bash

rushx clean
rushx build
npm run unit-test:node -- OptionsTest           --warmup 2 --duration 4 --iterations 2
npm run unit-test:node -- Delay500ms            --warmup 2 --duration 4 --iterations 2
npm run unit-test:node -- SynchronousException  --warmup 2 --duration 4 --iterations 2
npm run unit-test:node -- AsynchronousException --warmup 2 --duration 4 --iterations 2
npm run unit-test:node -- PerfStressPolicyTest  --warmup 2 --duration 4 --iterations 2