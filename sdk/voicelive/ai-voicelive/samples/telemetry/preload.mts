// Polyfill globalThis.require for ESM so that tryLoadOtel() finds the
// same @opentelemetry/api instance that NodeTracerProvider registered on.
import { createRequire } from "node:module";
(globalThis as any).require = createRequire(import.meta.url);
