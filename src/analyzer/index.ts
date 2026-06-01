import { promises as fs } from 'node:fs';
import path from 'node:path';
import ignore from 'ignore';

export type DependencyCategory =
  | 'ui'
  | 'validation'
  | 'orm'
  | 'auth'
  | 'testing'
  | 'http-client'
  | 'state-management'
  | 'utility'
  | 'ai'
  | 'devtool';

export type AnalysisLanguage = 'typescript' | 'javascript' | 'python' | 'go' | 'mixed';
export type ProjectType = 'frontend' | 'backend' | 'fullstack' | 'library' | 'cli' | 'unknown';

export interface TechStackResult {
  frontend: string[];
  backend: string[];
  database: string[];
  auth: string[];
  deployment: string[];
  ai: string[];
}

export interface FolderStructureItem {
  path: string;
  purpose: string;
  depth: number;
}

export interface EntryPointItem {
  file: string;
  type: string;
  command?: string;
}

export interface DependencyItem {
  name: string;
  version: string;
  category: DependencyCategory;
  description: string;
}

export interface ApiRouteItem {
  method: string;
  path: string;
  file: string;
  line: number;
}

export interface AnalysisResult {
  techStack: TechStackResult;
  folderStructure: FolderStructureItem[];
  entryPoints: EntryPointItem[];
  dependencies: DependencyItem[];
  apiRoutes: ApiRouteItem[];
  language: AnalysisLanguage;
  projectType: ProjectType;
}

interface ManifestData {
  dependencies: Map<string, string>;
  devDependencies: Map<string, string>;
  startScript: string | undefined;
  hasGoMod: boolean;
  binTargets: string[];
}

interface FileRecord {
  absolutePath: string;
  relativePath: string;
}

interface DependencyDefinition {
  category: DependencyCategory;
  description: string;
}

const ENTRY_POINT_NAMES = new Set(['index.ts', 'index.js', 'main.ts', 'main.py', 'server.ts', 'app.ts', 'app.py']);
const SOURCE_EXTENSIONS = new Set(['.ts', '.js', '.tsx', '.jsx', '.py']);
const PYTHON_ROUTE_PATTERNS = [/@(?:app|router)\.(get|post|put|patch|delete|options|head)\((['"])([^'"]+)\2/g, /\bpath\((['"])([^'"]+)\1/g, /\burl\((['"])([^'"]+)\1/g];
const TS_ROUTE_PATTERNS = [/\b(?:app|router)\.(get|post|put|patch|delete|options|head)\((['"])([^'"]+)\2/g, /@(?:Get|Post|Put|Patch|Delete|Options|Head)\((['"])?([^'")]+)\1?\)/g];

const PURPOSE_PATTERNS: Array<[RegExp, string]> = [
  [/^api$/i, 'API routes'],
  [/^components?$/i, 'UI components'],
  [/^services?$/i, 'Business logic'],
  [/^models?$/i, 'Data models'],
  [/^utils?$/i, 'Utilities'],
  [/^middleware$/i, 'Middleware'],
  [/^routes?$/i, 'API routes'],
  [/^pages?$/i, 'Page routes'],
  [/^app$/i, 'Application code'],
  [/^lib$/i, 'Shared library'],
  [/^tests?$/i, 'Test suite'],
  [/^specs?$/i, 'Test suite'],
  [/^config$/i, 'Configuration']
];

const DEPENDENCY_LOOKUP: Record<string, DependencyDefinition> = {
  react: { category: 'ui', description: 'React UI library' },
  'react-dom': { category: 'ui', description: 'React DOM renderer' },
  next: { category: 'ui', description: 'Next.js frontend framework' },
  vue: { category: 'ui', description: 'Vue frontend framework' },
  nuxt: { category: 'ui', description: 'Nuxt frontend framework' },
  svelte: { category: 'ui', description: 'Svelte UI framework' },
  solid: { category: 'ui', description: 'Solid UI framework' },
  angular: { category: 'ui', description: 'Angular frontend framework' },
  'react-router': { category: 'ui', description: 'React routing library' },
  'react-router-dom': { category: 'ui', description: 'React routing library' },
  'styled-components': { category: 'ui', description: 'CSS-in-JS styling library' },
  tailwindcss: { category: 'ui', description: 'Utility-first CSS framework' },
  vite: { category: 'devtool', description: 'Vite build tool' },
  webpack: { category: 'devtool', description: 'Webpack bundler' },
  esbuild: { category: 'devtool', description: 'Esbuild bundler' },
  typescript: { category: 'devtool', description: 'TypeScript compiler' },
  tsx: { category: 'devtool', description: 'TypeScript runner' },
  eslint: { category: 'devtool', description: 'Linting tool' },
  prettier: { category: 'devtool', description: 'Code formatter' },
  vitest: { category: 'testing', description: 'Vitest test runner' },
  jest: { category: 'testing', description: 'Jest test framework' },
  mocha: { category: 'testing', description: 'Mocha test framework' },
  chai: { category: 'testing', description: 'Assertion library' },
  supertest: { category: 'testing', description: 'HTTP integration testing library' },
  playwright: { category: 'testing', description: 'Browser automation and testing library' },
  cypress: { category: 'testing', description: 'End-to-end testing library' },
  zod: { category: 'validation', description: 'Schema validation library' },
  yup: { category: 'validation', description: 'Schema validation library' },
  joi: { category: 'validation', description: 'Schema validation library' },
  ajv: { category: 'validation', description: 'JSON schema validator' },
  express: { category: 'utility', description: 'Express backend framework' },
  fastify: { category: 'utility', description: 'Fastify backend framework' },
  koa: { category: 'utility', description: 'Koa backend framework' },
  nestjs: { category: 'utility', description: 'NestJS backend framework' },
  '@nestjs/common': { category: 'utility', description: 'NestJS framework package' },
  '@nestjs/core': { category: 'utility', description: 'NestJS framework package' },
  fastapi: { category: 'utility', description: 'FastAPI backend framework' },
  flask: { category: 'utility', description: 'Flask backend framework' },
  django: { category: 'utility', description: 'Django backend framework' },
  sqlalchemy: { category: 'orm', description: 'SQLAlchemy ORM' },
  prisma: { category: 'orm', description: 'Prisma ORM' },
  'prisma-client': { category: 'orm', description: 'Prisma ORM client' },
  sequelize: { category: 'orm', description: 'Sequelize ORM' },
  typeorm: { category: 'orm', description: 'TypeORM ORM' },
  mongoose: { category: 'orm', description: 'MongoDB ODM' },
  knex: { category: 'orm', description: 'SQL query builder and migration tool' },
  'drizzle-orm': { category: 'orm', description: 'Drizzle ORM' },
  hibernate: { category: 'orm', description: 'Hibernate ORM' },
  passport: { category: 'auth', description: 'Passport authentication middleware' },
  'next-auth': { category: 'auth', description: 'NextAuth authentication library' },
  '@auth0/auth0-react': { category: 'auth', description: 'Auth0 authentication library' },
  auth0: { category: 'auth', description: 'Auth0 authentication library' },
  clerk: { category: 'auth', description: 'Clerk authentication library' },
  'firebase-admin': { category: 'auth', description: 'Firebase authentication and admin library' },
  '@clerk/clerk-react': { category: 'auth', description: 'Clerk authentication library' },
  axios: { category: 'http-client', description: 'HTTP client library' },
  fetch: { category: 'http-client', description: 'Fetch API wrapper' },
  ky: { category: 'http-client', description: 'HTTP client library' },
  'node-fetch': { category: 'http-client', description: 'Fetch API implementation' },
  reactquery: { category: 'state-management', description: 'TanStack Query state management library' },
  '@tanstack/react-query': { category: 'state-management', description: 'TanStack Query state management library' },
  redux: { category: 'state-management', description: 'Redux state management library' },
  '@reduxjs/toolkit': { category: 'state-management', description: 'Redux Toolkit state management library' },
  zustand: { category: 'state-management', description: 'Zustand state management library' },
  mobx: { category: 'state-management', description: 'MobX state management library' },
  openai: { category: 'ai', description: 'OpenAI API client' },
  '@openai/api': { category: 'ai', description: 'OpenAI API client' },
  anthropic: { category: 'ai', description: 'Anthropic API client' },
  '@anthropic-ai/sdk': { category: 'ai', description: 'Anthropic SDK' },
  langchain: { category: 'ai', description: 'LangChain AI framework' },
  'langchain-openai': { category: 'ai', description: 'LangChain OpenAI integration' },
  'langchain-anthropic': { category: 'ai', description: 'LangChain Anthropic integration' },
  'llama-index': { category: 'ai', description: 'LlamaIndex AI framework' },
  torch: { category: 'ai', description: 'PyTorch machine learning library' },
  tensorflow: { category: 'ai', description: 'TensorFlow machine learning library' },
  transformers: { category: 'ai', description: 'Hugging Face Transformers' },
  'google-generativeai': { category: 'ai', description: 'Google Generative AI SDK' },
  cohere: { category: 'ai', description: 'Cohere AI SDK' },
  ollama: { category: 'ai', description: 'Ollama client' },
  pandas: { category: 'utility', description: 'Data analysis library' },
  numpy: { category: 'utility', description: 'Numerical computing library' },
  requests: { category: 'http-client', description: 'Python HTTP client' },
  pydantic: { category: 'validation', description: 'Data validation library' },
  uvicorn: { category: 'devtool', description: 'ASGI server' },
  gunicorn: { category: 'devtool', description: 'WSGI server' },
  pytest: { category: 'testing', description: 'Python test framework' },
  'pytest-cov': { category: 'testing', description: 'Python test coverage plugin' },
  black: { category: 'devtool', description: 'Python code formatter' },
  ruff: { category: 'devtool', description: 'Python linter and formatter' },
  mypy: { category: 'devtool', description: 'Python type checker' },
  flake8: { category: 'devtool', description: 'Python linter' },
  'django-rest-framework': { category: 'utility', description: 'Django REST framework' }
};

const FRONTEND_FRAMEWORKS = ['react', 'next', 'vue', 'nuxt', 'svelte', 'solid', 'angular'];
const BACKEND_FRAMEWORKS = ['express', 'nestjs', 'fastify', 'koa', 'fastapi', 'flask', 'django', 'spring'];
const AUTH_LIBRARIES = ['next-auth', 'passport', 'auth0', 'clerk', 'firebase-admin', '@clerk/clerk-react', '@auth0/auth0-react'];
const DATABASE_AND_ORM = ['prisma', 'sequelize', 'typeorm', 'mongoose', 'knex', 'drizzle-orm', 'sqlalchemy', 'hibernate', 'django'];
const AI_LIBRARIES = ['openai', '@openai/api', 'anthropic', '@anthropic-ai/sdk', 'langchain', 'langchain-openai', 'langchain-anthropic', 'torch', 'tensorflow', 'transformers', 'llama-index', 'google-generativeai', 'cohere', 'ollama'];

const DEPLOYMENT_FILES = [
  ['Dockerfile', 'docker'],
  ['docker-compose.yml', 'docker-compose'],
  ['docker-compose.yaml', 'docker-compose'],
  ['.github/workflows', 'github-actions']
] as const;

export class StaticAnalyzer {
  constructor(private readonly rootDir: string) {}

  async analyze(): Promise<AnalysisResult> {
    const manifest = await this.readManifestData();
    const ignoreMatcher = await this.createIgnoreMatcher();
    const files = await this.walkFiles(ignoreMatcher);
    const directories = await this.walkDirectories(ignoreMatcher);

    const dependencies = this.analyzeDependencies(manifest);
    const techStack = this.analyzeTechStack(dependencies, files);
    const entryPoints = await this.detectEntryPoints(manifest, files);
    const apiRoutes = await this.detectApiRoutes(files);
    const folderStructure = directories.map((directoryPath) => ({
      path: directoryPath,
      purpose: inferFolderPurpose(directoryPath),
      depth: directoryPath === '.' ? 0 : directoryPath.split('/').length
    }));

    return {
      techStack,
      folderStructure,
      entryPoints,
      dependencies,
      apiRoutes,
      language: detectLanguage(files, manifest),
      projectType: detectProjectType(techStack, manifest, entryPoints, files)
    };
  }

  private async createIgnoreMatcher(): Promise<ReturnType<typeof ignore>> {
    const matcher = ignore();
    const gitignorePath = path.join(this.rootDir, '.gitignore');

    if (await pathExists(gitignorePath)) {
      const contents = await fs.readFile(gitignorePath, 'utf8');
      matcher.add(contents);
    }

    matcher.add(['dist', 'node_modules', '.git']);
    return matcher;
  }

  private async walkFiles(ignoreMatcher: ReturnType<typeof ignore>): Promise<FileRecord[]> {
    const files: FileRecord[] = [];

    const visit = async (currentDir: string, relativeDir: string, depth: number): Promise<void> => {
      if (depth > 4) {
        return;
      }

      const entries = await fs.readdir(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        const absolutePath = path.join(currentDir, entry.name);
        const relativePath = normalizeRelativePath(path.join(relativeDir, entry.name));
        if (ignoreMatcher.ignores(relativePath) || ignoreMatcher.ignores(`${relativePath}/`)) {
          continue;
        }

        if (entry.isDirectory()) {
          await visit(absolutePath, relativePath, depth + 1);
        } else if (entry.isFile()) {
          files.push({ absolutePath, relativePath });
        }
      }
    };

    await visit(this.rootDir, '.', 0);
    return files;
  }

  private async walkDirectories(ignoreMatcher: ReturnType<typeof ignore>): Promise<string[]> {
    const directories = new Set<string>();

    const visit = async (currentDir: string, relativeDir: string, depth: number): Promise<void> => {
      if (depth > 4) {
        return;
      }

      const entries = await fs.readdir(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) {
          continue;
        }

        const absolutePath = path.join(currentDir, entry.name);
        const relativePath = normalizeRelativePath(path.join(relativeDir, entry.name));
        if (ignoreMatcher.ignores(relativePath) || ignoreMatcher.ignores(`${relativePath}/`)) {
          continue;
        }

        directories.add(relativePath);
        await visit(absolutePath, relativePath, depth + 1);
      }
    };

    await visit(this.rootDir, '.', 0);
    return [...directories].sort((left, right) => left.localeCompare(right));
  }

  private async readManifestData(): Promise<ManifestData> {
    const dependencies = new Map<string, string>();
    const devDependencies = new Map<string, string>();
    let startScript: string | undefined;
    let hasGoMod = false;
    const binTargets: string[] = [];

    const packageJsonPath = path.join(this.rootDir, 'package.json');
    if (await pathExists(packageJsonPath)) {
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8')) as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
        scripts?: Record<string, string>;
        bin?: string | Record<string, string>;
      };

      for (const [name, version] of Object.entries(packageJson.dependencies ?? {})) {
        dependencies.set(name, version);
      }
      for (const [name, version] of Object.entries(packageJson.devDependencies ?? {})) {
        devDependencies.set(name, version);
      }
      startScript = packageJson.scripts?.start;
      if (typeof packageJson.bin === 'string') {
        binTargets.push(packageJson.bin);
      } else if (packageJson.bin && typeof packageJson.bin === 'object') {
        binTargets.push(...Object.values(packageJson.bin));
      }
    }

    const requirementsPath = path.join(this.rootDir, 'requirements.txt');
    if (await pathExists(requirementsPath)) {
      const requirements = parseRequirements(await fs.readFile(requirementsPath, 'utf8'));
      for (const requirement of requirements) {
        dependencies.set(requirement.name, requirement.version ?? 'latest');
      }
    }

    const goModPath = path.join(this.rootDir, 'go.mod');
    if (await pathExists(goModPath)) {
      hasGoMod = true;
      const goDependencies = parseGoMod(await fs.readFile(goModPath, 'utf8'));
      for (const requirement of goDependencies) {
        dependencies.set(requirement.name, requirement.version);
      }
    }

    const cargoTomlPath = path.join(this.rootDir, 'Cargo.toml');
    if (await pathExists(cargoTomlPath)) {
      const cargoDependencies = parseCargoToml(await fs.readFile(cargoTomlPath, 'utf8'));
      for (const requirement of cargoDependencies) {
        dependencies.set(requirement.name, requirement.version);
      }
    }

    const gemfilePath = path.join(this.rootDir, 'Gemfile');
    if (await pathExists(gemfilePath)) {
      const gemDependencies = parseGemfile(await fs.readFile(gemfilePath, 'utf8'));
      for (const requirement of gemDependencies) {
        dependencies.set(requirement.name, requirement.version);
      }
    }

    const pomPath = path.join(this.rootDir, 'pom.xml');
    if (await pathExists(pomPath)) {
      const pomDependencies = parsePomXml(await fs.readFile(pomPath, 'utf8'));
      for (const requirement of pomDependencies) {
        dependencies.set(requirement.name, requirement.version);
      }
    }

    return { dependencies, devDependencies, startScript, hasGoMod, binTargets };
  }

  private analyzeDependencies(manifest: ManifestData): DependencyItem[] {
    const items: DependencyItem[] = [];
    const addDependency = (name: string, version: string, source: 'dependencies' | 'devDependencies') => {
      const normalized = normalizeDependencyName(name);
      const definition = DEPENDENCY_LOOKUP[normalized];
      const category = definition?.category ?? (source === 'devDependencies' ? 'devtool' : 'utility');
      const description = definition?.description ?? 'Unclassified dependency';
      items.push({ name, version, category, description });
    };

    for (const [name, version] of manifest.dependencies) {
      addDependency(name, version, 'dependencies');
    }
    for (const [name, version] of manifest.devDependencies) {
      addDependency(name, version, 'devDependencies');
    }

    return items.sort((left, right) => left.name.localeCompare(right.name));
  }

  private analyzeTechStack(dependencies: DependencyItem[], files: FileRecord[]): TechStackResult {
    const detectedFromDependencies = dependencies.map((dependency) => normalizeDependencyName(dependency.name));
    const detectedFromFiles = files.map((file) => file.relativePath);

    return {
      frontend: uniqueMatches([...detectedFromDependencies, ...detectedFromFiles], FRONTEND_FRAMEWORKS),
      backend: uniqueMatches([...detectedFromDependencies, ...detectedFromFiles], BACKEND_FRAMEWORKS),
      database: uniqueMatches([...detectedFromDependencies, ...detectedFromFiles], DATABASE_AND_ORM),
      auth: uniqueMatches([...detectedFromDependencies, ...detectedFromFiles], AUTH_LIBRARIES),
      deployment: this.detectDeployment(detachedFileSet(detectedFromFiles)),
      ai: uniqueMatches([...detectedFromDependencies, ...detectedFromFiles], AI_LIBRARIES)
    };
  }

  private detectDeployment(files: Set<string>): string[] {
    const deployment = new Set<string>();
    for (const [needle, label] of DEPLOYMENT_FILES) {
      if (needle === '.github/workflows') {
        if ([...files].some((file) => file.startsWith('.github/workflows/'))) {
          deployment.add(label);
        }
        continue;
      }

      if ([...files].some((file) => normalizePath(file) === needle)) {
        deployment.add(label);
      }
    }

    return [...deployment].sort();
  }

  private async detectEntryPoints(manifest: ManifestData, files: FileRecord[]): Promise<EntryPointItem[]> {
    const entries: EntryPointItem[] = [];

    for (const file of files) {
      const baseName = path.posix.basename(file.relativePath);
      if (ENTRY_POINT_NAMES.has(baseName)) {
        entries.push({ file: file.relativePath, type: 'file-entry-point' });
      }
    }

    if (manifest.startScript) {
      entries.push({ file: 'package.json', type: `start-script: ${manifest.startScript}`, command: manifest.startScript });
    }

    for (const binTarget of manifest.binTargets) {
      entries.push({ file: `package.json -> ${binTarget}`, type: 'bin-entry-point' });
    }

    const dockerfilePath = files.find((file) => path.posix.basename(file.relativePath) === 'Dockerfile');
    if (dockerfilePath) {
      const dockerCommand = await parseDockerfileCommand(dockerfilePath.absolutePath);
      const dockerEntry: EntryPointItem = { file: dockerfilePath.relativePath, type: 'docker-entry-point' };
      if (dockerCommand) {
        dockerEntry.command = dockerCommand;
      }
      entries.push(dockerEntry);
      if (dockerCommand) {
        entries.push({ file: dockerfilePath.relativePath, type: `docker-${dockerCommand.split(/\s+/)[0]?.toLowerCase() ?? 'command'}`, command: dockerCommand });
      }
    }

    return entries;
  }

  private async detectApiRoutes(files: FileRecord[]): Promise<ApiRouteItem[]> {
    const routes: ApiRouteItem[] = [];

    for (const file of files) {
      const extension = path.extname(file.relativePath).toLowerCase();
      if (!SOURCE_EXTENSIONS.has(extension)) {
        continue;
      }

      const contents = await fs.readFile(file.absolutePath, 'utf8');
      const lines = contents.split(/\r?\n/);

      for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index] ?? '';
        for (const match of scanRouteLine(line, extension)) {
          routes.push({ method: match.method, path: match.path, file: file.relativePath, line: index + 1 });
        }
      }
    }

    return routes;
  }
}

function inferFolderPurpose(relativePath: string): string {
  const segments = relativePath.split('/');
  const leaf = segments[segments.length - 1] ?? relativePath;

  for (const [pattern, purpose] of PURPOSE_PATTERNS) {
    if (pattern.test(leaf)) {
      return purpose;
    }
  }

  if (segments.includes('src')) {
    return 'Source code';
  }

  return 'Project structure';
}

function detectLanguage(files: FileRecord[], manifest: ManifestData): AnalysisLanguage {
  const languages = new Set<Exclude<AnalysisLanguage, 'mixed'>>();

  if (files.some((file) => file.relativePath.endsWith('.ts') || file.relativePath.endsWith('.tsx'))) {
    languages.add('typescript');
  }
  if (files.some((file) => file.relativePath.endsWith('.js') || file.relativePath.endsWith('.jsx'))) {
    languages.add('javascript');
  }
  if (files.some((file) => file.relativePath.endsWith('.py'))) {
    languages.add('python');
  }
  if (files.some((file) => file.relativePath.endsWith('.go')) || manifest.hasGoMod) {
    languages.add('go');
  }

  if (languages.size === 0) {
    return 'mixed';
  }
  if (languages.size === 1) {
    return [...languages][0] ?? 'mixed';
  }
  return 'mixed';
}

function detectProjectType(
  techStack: TechStackResult,
  manifest: ManifestData,
  entryPoints: EntryPointItem[],
  files: FileRecord[]
): ProjectType {
  const hasFrontend = techStack.frontend.length > 0;
  const hasBackend = techStack.backend.length > 0;
  if (hasFrontend && hasBackend) {
    return 'fullstack';
  }
  if (hasFrontend) {
    return 'frontend';
  }
  if (hasBackend) {
    return 'backend';
  }

  const hasCliSignal = manifest.binTargets.length > 0 || entryPoints.some((entry) => entry.type.includes('start-script'));
  if (hasCliSignal) {
    return 'cli';
  }

  const hasTests = files.some((file) => /(?:^|\/)test(s)?\//.test(file.relativePath));
  const hasPackageManifest = manifest.dependencies.size > 0 || manifest.devDependencies.size > 0;
  if (hasPackageManifest && !hasTests) {
    return 'library';
  }

  return 'unknown';
}

async function pathExists(candidatePath: string): Promise<boolean> {
  try {
    await fs.access(candidatePath);
    return true;
  } catch {
    return false;
  }
}

function parseRequirements(contents: string): Array<{ name: string; version: string | undefined }> {
  const requirements: Array<{ name: string; version: string | undefined }> = [];

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || line.startsWith('-r') || line.startsWith('--')) {
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_.-]+)(?:\s*([<>=!~]=?)\s*([A-Za-z0-9_.+*-]+))?/);
    if (match) {
      requirements.push({
        name: match[1]!.replace(/\[.*\]$/, ''),
        version: match[3]
      });
    }
  }

  return requirements;
}

function parseGoMod(contents: string): Array<{ name: string; version: string }> {
  const requirements: Array<{ name: string; version: string }> = [];
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    const match = line.match(/^([A-Za-z0-9_./-]+)\s+v?([0-9][^\s]*)$/);
    if (match) {
      requirements.push({ name: match[1]!, version: match[2]! });
    }
  }
  return requirements;
}

function parseCargoToml(contents: string): Array<{ name: string; version: string }> {
  const requirements: Array<{ name: string; version: string }> = [];
  let inDependencies = false;
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.startsWith('[')) {
      inDependencies = line === '[dependencies]' || line === '[dev-dependencies]';
      continue;
    }
    if (!inDependencies || !line || line.startsWith('#')) {
      continue;
    }
    const match = line.match(/^([A-Za-z0-9_-]+)\s*=\s*"([^"]+)"/);
    if (match) {
      requirements.push({ name: match[1]!, version: match[2]! });
    }
  }
  return requirements;
}

function parseGemfile(contents: string): Array<{ name: string; version: string }> {
  const requirements: Array<{ name: string; version: string }> = [];
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    const match = line.match(/^gem ['"]([^'"]+)['"](?:,\s*['"]([^'"]+)['"])?/);
    if (match) {
      requirements.push({ name: match[1]!, version: match[2] ?? 'latest' });
    }
  }
  return requirements;
}

function parsePomXml(contents: string): Array<{ name: string; version: string }> {
  const requirements: Array<{ name: string; version: string }> = [];
  const dependencyBlocks = contents.match(/<dependency>[\s\S]*?<\/dependency>/g) ?? [];
  for (const block of dependencyBlocks) {
    const groupMatch = block.match(/<groupId>([^<]+)<\/groupId>/);
    const artifactMatch = block.match(/<artifactId>([^<]+)<\/artifactId>/);
    const versionMatch = block.match(/<version>([^<]+)<\/version>/);
    if (groupMatch && artifactMatch) {
      requirements.push({
        name: `${groupMatch[1]!.trim()}:${artifactMatch[1]!.trim()}`,
        version: versionMatch?.[1]?.trim() ?? 'latest'
      });
    }
  }
  return requirements;
}

async function parseDockerfileCommand(dockerfilePath: string): Promise<string | undefined> {
  const contents = await fs.readFile(dockerfilePath, 'utf8');
  const lines = contents.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^(CMD|ENTRYPOINT)\s+/i.test(trimmed)) {
      return trimmed;
    }
  }
  return undefined;
}

function scanRouteLine(line: string, extension: string): Array<{ method: string; path: string }> {
  const matches: Array<{ method: string; path: string }> = [];
  const patterns = extension === '.py' ? PYTHON_ROUTE_PATTERNS : TS_ROUTE_PATTERNS;

  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(line)) !== null) {
      if (extension === '.py') {
        if (match[1] && match[3]) {
          matches.push({ method: match[1].toUpperCase(), path: match[3] });
        } else if (match[2]) {
          matches.push({ method: 'ANY', path: match[2] });
        }
      } else if (match[1] && match[3]) {
        matches.push({ method: match[1].toUpperCase(), path: match[3] });
      }
    }
  }

  return matches;
}

function uniqueMatches(haystack: string[], needles: string[]): string[] {
  const result = new Set<string>();
  for (const hay of haystack) {
    const normalized = normalizeDependencyName(hay);
    for (const needle of needles) {
      if (normalized === needle || normalized.includes(needle) || needle.includes(normalized)) {
        result.add(needle);
      }
    }
  }
  return [...result].sort();
}

function normalizeDependencyName(name: string): string {
  return name.toLowerCase().replace(/^@/, '').replace(/[^a-z0-9.-]/g, '');
}

function normalizeRelativePath(candidatePath: string): string {
  return candidatePath.replace(/\\/g, '/').replace(/^\.\//, '').replace(/^\.$/, '.');
}

function detachedFileSet(files: string[]): Set<string> {
  return new Set(files.map((file) => normalizePath(file)));
}

function normalizePath(candidatePath: string): string {
  return candidatePath.replace(/\\/g, '/');
}

