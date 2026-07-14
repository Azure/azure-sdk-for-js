import * as fs from 'fs';
import { dump, load } from 'js-yaml';
import * as path from 'path';

export function updateTypeSpecProjectYamlFile(filePath: string, sdkRepo: string, typespecEmitter: string) {
  if (!fs.existsSync(filePath)) return;
  const content = load(fs.readFileSync(filePath, 'utf-8'));
  const emitters = content?.emitters;
  const tsEmitter = emitters?.[typespecEmitter];
  const sdkFolder = tsEmitter?.['sdk-folder'];
  if (sdkFolder && sdkFolder.startsWith('sdk/')) {
    const newSdkFolder = path.join(sdkRepo, sdkFolder);
    content.emitters[typespecEmitter]['sdk-folder'] = newSdkFolder;
    fs.writeFileSync(filePath, dump(content));
  }
}
