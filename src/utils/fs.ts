import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const atlasOutputDirectoryName = path.join('docs', 'atlas');

export async function ensureDirectory(directoryPath: string): Promise<void> {
  await mkdir(directoryPath, { recursive: true });
}

export async function writeTextFile(filePath: string, contents: string): Promise<void> {
  await ensureDirectory(path.dirname(filePath));
  await writeFile(filePath, contents, 'utf8');
}

export async function directoryExists(directoryPath: string): Promise<boolean> {
  try {
    return (await stat(directoryPath)).isDirectory();
  } catch {
    return false;
  }
}

export async function clearDirectory(directoryPath: string): Promise<void> {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      await rm(path.join(directoryPath, entry.name), { recursive: true, force: true });
    })
  );
}

export function getAtlasOutputDirectory(baseDirectory: string = process.cwd()): string {
  return path.resolve(baseDirectory, atlasOutputDirectoryName);
}
