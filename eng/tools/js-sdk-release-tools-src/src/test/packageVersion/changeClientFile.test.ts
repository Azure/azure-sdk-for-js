import * as fs from 'fs';
import * as path from 'path';

import { describe, expect, test } from 'vitest';
import { join } from 'path';
import { updateUserAgent } from '../../xlc/codeUpdate/updateUserAgent.js';

describe('Update package version in /src', () => {
  test('update package version for userAgentInfo with modular type', async () => {
    const root = join(__dirname, 'testCases/modular-context/');
    const expectedVersion = '1.0.0';
    await updateUserAgent(root, expectedVersion);
    const data: string = fs.readFileSync(path.join(root, 'src', 'api', 'testContext.ts'), 'utf8');
    expect(data.includes(`const userAgentInfo = \`azsdk-js-arm-test/${expectedVersion}\`;`)).toBe(true);
  });

  test('update package version for userAgentInfo with rlc type', async () => {
    const root = join(__dirname, 'testCases/rlc-context/');
    const expectedVersion = '1.0.0';
    await updateUserAgent(root, expectedVersion);
    const data: string = fs.readFileSync(path.join(root, 'src', 'testClient.ts'), 'utf8');
    expect(data.includes(`const userAgentInfo = \`azsdk-js-@azure-rest/test/${expectedVersion}\`;`)).toBe(true);
  });

  test('update package version for packageDetails with hlc type', async () => {
    const root = join(__dirname, 'testCases/hlc-context/');
    const expectedVersion = '1.0.0';
    await updateUserAgent(root, expectedVersion);
    const data: string = fs.readFileSync(path.join(root, 'src', 'testClient.ts'), 'utf8');
    expect(data.includes(`const packageDetails = \`azsdk-js-arm-test/${expectedVersion}\`;`)).toBe(true);
  });
});
