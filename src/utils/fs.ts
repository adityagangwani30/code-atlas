import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const atlasOutputDirectoryName = path.join('docs', 'atlas');

export async function ensureDirectory(directoryPath: string): Promise<void> {
  await mkdir(directoryPath, { recursive: true });
}

export async function writeTextFile(filePath: string, contents: string): Promise<void> {
  await ensureDirectory(path.dirname(filePath));
  await writeFile(filePath, contents, 'utf8');
}

export function getAtlasOutputDirectory(baseDirectory: string = process.cwd()): string {
  return path.resolve(baseDirectory, atlasOutputDirectoryName);
}
