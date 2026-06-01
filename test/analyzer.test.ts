import path from 'node:path';
import { promises as fs } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { StaticAnalyzer } from '../src/analyzer/index.js';

const fixturesRoot = path.resolve('test/fixtures');

describe('StaticAnalyzer', () => {
  it('detects a TypeScript fullstack project from a mixed fixture', async () => {
    const analyzer = new StaticAnalyzer(path.join(fixturesRoot, 'fullstack-mixed'));
    const result = await analyzer.analyze();

    expect(result.language).toBe('mixed');
    expect(result.projectType).toBe('fullstack');
    expect(result.techStack.frontend).toContain('next');
    expect(result.techStack.backend).toContain('express');
    expect(result.techStack.database).toEqual(expect.arrayContaining(['prisma', 'mongoose']));
    expect(result.techStack.auth).toContain('next-auth');
    expect(result.techStack.deployment).toEqual(expect.arrayContaining(['docker', 'docker-compose', 'github-actions']));
    expect(result.techStack.ai).toContain('openai');

    expect(result.folderStructure).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'src/components', purpose: 'UI components' }),
        expect.objectContaining({ path: 'src/services', purpose: 'Business logic' }),
        expect.objectContaining({ path: 'src/models', purpose: 'Data models' }),
        expect.objectContaining({ path: 'src/utils', purpose: 'Utilities' })
      ])
    );

    expect(result.entryPoints).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ file: 'src/server.ts', type: 'file-entry-point' }),
        expect.objectContaining({ file: 'package.json', type: 'start-script: node dist/server.js' }),
        expect.objectContaining({ file: 'package.json -> dist/index.js', type: 'bin-entry-point' }),
        expect.objectContaining({ file: 'Dockerfile', type: 'docker-entry-point' })
      ])
    );

    expect(result.dependencies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'react', category: 'ui' }),
        expect.objectContaining({ name: 'express', category: 'utility' }),
        expect.objectContaining({ name: 'prisma', category: 'orm' }),
        expect.objectContaining({ name: 'next-auth', category: 'auth' }),
        expect.objectContaining({ name: 'openai', category: 'ai' }),
        expect.objectContaining({ name: 'vitest', category: 'testing' })
      ])
    );

    expect(result.apiRoutes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ method: 'GET', path: '/health', file: 'src/server.ts' }),
        expect.objectContaining({ method: 'POST', path: '/users', file: 'src/server.ts' }),
        expect.objectContaining({ method: 'GET', path: '/items', file: 'src/api/routes.ts' }),
        expect.objectContaining({ method: 'POST', path: '/jobs', file: 'src/api/routes.ts' }),
        expect.objectContaining({ method: 'GET', path: '/python/health', file: 'app/main.py' })
      ])
    );
  });

  it('respects gitignore and classifies a Python backend fixture', async () => {
    const analyzer = new StaticAnalyzer(path.join(fixturesRoot, 'python-backend'));
    const result = await analyzer.analyze();

    expect(result.language).toBe('python');
    expect(result.projectType).toBe('backend');
    expect(result.techStack.backend).toContain('fastapi');
    expect(result.techStack.ai).toContain('anthropic');
    expect(result.techStack.deployment).toContain('docker');
    expect(result.folderStructure).toEqual(expect.arrayContaining([expect.objectContaining({ path: 'app', purpose: 'Application code' })]));
    expect(result.apiRoutes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ method: 'GET', path: '/items', file: 'app/main.py' }),
        expect.objectContaining({ method: 'POST', path: '/items', file: 'app/routes.py' })
      ])
    );

    const ignoredArtifacts = result.folderStructure.map((item) => item.path);
    expect(ignoredArtifacts).not.toContain('dist');
  });

  it('creates fixture directories for the test harness', async () => {
    const stats = await fs.stat(path.join(fixturesRoot, 'fullstack-mixed'));
    expect(stats.isDirectory()).toBe(true);
  });
});
