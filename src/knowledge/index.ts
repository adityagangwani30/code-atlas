export { DEPENDENCY_KNOWLEDGE } from './dependencies.js';
export type { DependencyCategory, DependencyInfo } from './dependencies.js';
export { FRAMEWORK_KNOWLEDGE } from './frameworks.js';
export type { FrameworkInfo } from './frameworks.js';
export { FOLDER_KNOWLEDGE } from './folders.js';
export type { FolderInfo } from './folders.js';

import { DEPENDENCY_KNOWLEDGE } from './dependencies.js';
import { FOLDER_KNOWLEDGE } from './folders.js';
import type { DependencyInfo } from './dependencies.js';
import type { FolderInfo } from './folders.js';

export function getDependencyInfo(packageName: string): DependencyInfo | null {
  const candidateNames = buildDependencyCandidates(packageName);

  for (const candidate of candidateNames) {
    const match = DEPENDENCY_KNOWLEDGE[candidate];
    if (match) {
      return match;
    }
  }

  return null;
}

export function getFolderInfo(folderName: string): FolderInfo | null {
  const normalized = folderName.trim().toLowerCase().replace(/\/+$/, '').replace(/^\.\/?/, '');
  return (FOLDER_KNOWLEDGE as Record<string, FolderInfo>)[normalized] ?? null;
}

function buildDependencyCandidates(packageName: string): string[] {
  const normalized = packageName.trim();
  const candidates = new Set<string>();

  if (normalized) {
    candidates.add(normalized);
  }

  const strippedScope = normalized.replace(/^@[^/]+\//, '');
  if (strippedScope) {
    candidates.add(strippedScope);
  }

  if (!normalized.startsWith('@') && strippedScope.includes('/')) {
    candidates.add(`@${strippedScope}`);
  }

  return [...candidates];
}
