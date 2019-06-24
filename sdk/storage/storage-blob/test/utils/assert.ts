import * as assert from "assert";
import { StorageClient } from '../../src/internal';

export function assertClientUsesTokenCredential(client: StorageClient) {
  const factories = (client as any).pipeline.factories
  const authPolicy = factories[factories.length - 1].create();
  assert.strictEqual(authPolicy.constructor.name, "BearerTokenAuthenticationPolicy");
}
