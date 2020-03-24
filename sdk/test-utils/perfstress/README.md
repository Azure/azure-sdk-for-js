# Azure PerfStress library for JavaScript

How to run tests:

```
rushx clean
rushx build
npm run unit-test:node -- [TestClassName] [Parameters]
```

Examples:
```
npm run unit-test:node -- Delay500ms --warmup 2 --duration 4 --iterations 2
npm run unit-test:node -- PerfStressPolicyTest --warmup 2 --duration 4 --iterations 2 --url http://google.com
```