import * as fs from 'fs';
import * as path from 'path';
import { logger } from './logger.js';

export async function backupNodeModules(folder: string) {
  const nodeModulesPath = path.join(folder, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    logger.info(`Start to rename '${nodeModulesPath}' to '${nodeModulesPath}_backup'.`);
    fs.renameSync(nodeModulesPath, `${nodeModulesPath}_backup`);
  }
  if ('/' === path.dirname(folder)) return;
  await backupNodeModules(path.dirname(folder));
}

export async function restoreNodeModules(folder: string) {
  const nodeModulesBackupPath = path.join(folder, 'node_modules_backup');
  if (fs.existsSync(nodeModulesBackupPath)) {
    const nodeModulesPath = nodeModulesBackupPath.replace('_backup', '');
    if (fs.existsSync(nodeModulesPath)) {
      logger.info(`Remove existing '${nodeModulesPath}' first.`);
      fs.rmSync(nodeModulesPath, { recursive: true, force: true });
    }
    logger.info(`Start to rename '${nodeModulesBackupPath}' to '${nodeModulesPath}'.`);
    fs.renameSync(nodeModulesBackupPath, nodeModulesPath);
  }
  if ('/' === path.dirname(folder)) return;
  await restoreNodeModules(path.dirname(folder));
}
