import { describe, expect, it } from 'vitest';

import { DEPENDENCY_KNOWLEDGE, FRAMEWORK_KNOWLEDGE, getDependencyInfo, getFolderInfo } from '../src/knowledge/index.js';

describe('knowledge lookups', () => {
  it('resolves express as a backend framework dependency', () => {
    expect(getDependencyInfo('express')?.category).toBe('backend-framework');
  });

  it('resolves scoped nestjs packages', () => {
    expect(getDependencyInfo('@nestjs/core')?.category).toBe('backend-framework');
  });

  it('returns null for unknown dependencies without throwing', () => {
    expect(getDependencyInfo('unknown-pkg-xyz')).toBeNull();
  });

  it('resolves controllers as an api folder', () => {
    expect(getFolderInfo('controllers')?.layer).toBe('api');
  });

  it('handles trailing slashes and casing in folder lookups', () => {
    expect(getFolderInfo('Controllers/')?.layer).toBe('api');
  });

  it('returns null for missing folder names without throwing', () => {
    expect(getFolderInfo('nonexistent')).toBeNull();
  });
});

describe('knowledge coverage', () => {
  it('includes more than 200 dependency entries with descriptions', () => {
    const dependencies = Object.values(DEPENDENCY_KNOWLEDGE);
    expect(dependencies.length).toBeGreaterThan(200);
    expect(dependencies.every((entry) => entry.description.trim().length > 0)).toBe(true);
  });

  it('gives every framework a detection file', () => {
    expect(Object.values(FRAMEWORK_KNOWLEDGE).every((entry) => entry.detectionFiles.length > 0)).toBe(true);
  });
});
