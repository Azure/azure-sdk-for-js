#!/bin/bash

rushx clean
rushx build

npm run perfstress-test:node -- NoOpAsync --warmup 2 --duration 4 --iterations 2
npm run perfstress-test:node -- NoOpSync --warmup 2 --duration 4 --iterations 2
npm run perfstress-test:node -- OptionsTest --warmup 2 --duration 4 --iterations 2
npm run perfstress-test:node -- SetupCleanupTest --warmup 2 --duration 4 --iterations 2
npm run perfstress-test:node -- Delay500ms --warmup 2 --duration 4 --iterations 2
npm run perfstress-test:node -- SynchronousException --warmup 2 --duration 4 --iterations 2
npm run perfstress-test:node -- AsynchronousException --warmup 2 --duration 4 --iterations 2
npm run perfstress-test:node -- PerfStressPolicyTest --warmup 2 --duration 4 --iterations 2