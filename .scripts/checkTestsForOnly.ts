import { checkTestsForOnly, resolvePath } from "@ts-common/azure-js-dev-tools";

checkTestsForOnly(resolvePath(__dirname, "..", "test"));