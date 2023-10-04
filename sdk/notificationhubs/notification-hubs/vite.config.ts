import { defineConfig } from "vitest/config";
import { JUnitReporter } from "vitest/reporters";

export default defineConfig({
  test: {
    include: ["test/internal/unit/*.spec.ts"],
    reporters: [new JUnitReporter()],
  },
});
