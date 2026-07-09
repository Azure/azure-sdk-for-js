import * as fs from 'fs';
import { dump, load } from 'js-yaml';
import * as path from 'path';

interface TypeSpecProjectYaml {
  emitters?: Record<string, Record<string, string>>;
}

export function updateTypeSpecProjectYamlFile(filePath: string, sdkRepo: string, typespecEmitter: string) {
  if (!fs.existsSync(filePath)) return;
  const content = load(fs.readFileSync(filePath, 'utf-8')) as TypeSpecProjectYaml;
  const emitters = content?.emitters;
  const tsEmitter = emitters?.[typespecEmitter];
  const sdkFolder = tsEmitter?.['sdk-folder'];
  if (sdkFolder && sdkFolder.startsWith('sdk/') && emitters) {
    const newSdkFolder = path.join(sdkRepo, sdkFolder);
    emitters[typespecEmitter]['sdk-folder'] = newSdkFolder;
    fs.writeFileSync(filePath, dump(content));
  }
}
