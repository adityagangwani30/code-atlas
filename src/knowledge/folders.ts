export interface FolderInfo {
  purpose: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  layer?: 'presentation' | 'api' | 'business' | 'data' | 'infra' | 'config' | 'test';
}

export const FOLDER_KNOWLEDGE = {
  // ── API LAYER ──────────────────────────────
  controllers: { purpose: 'Contains request handlers that translate HTTP input into application calls.', importance: 'high', layer: 'api' },
  routes: { purpose: 'Defines HTTP routes and maps URL paths to controller or handler logic.', importance: 'high', layer: 'api' },
  routers: { purpose: 'Groups and composes route definitions into reusable route modules.', importance: 'medium', layer: 'api' },
  handlers: { purpose: 'Implements endpoint-level handlers for a specific API surface.', importance: 'high', layer: 'api' },
  endpoints: { purpose: 'Holds API endpoint implementations grouped by resource or feature.', importance: 'medium', layer: 'api' },
  resolvers: { purpose: 'Contains GraphQL resolver functions for queries and mutations.', importance: 'high', layer: 'api' },

  // ── BUSINESS LOGIC ─────────────────────────
  services: { purpose: 'Contains application use logic, orchestration, and integrations.', importance: 'critical', layer: 'business' },
  usecases: { purpose: 'Implements single business actions as focused use case modules.', importance: 'high', layer: 'business' },
  'use-cases': { purpose: 'Organizes business actions as explicit use case files or folders.', importance: 'high', layer: 'business' },
  domain: { purpose: 'Stores the core domain model, invariants, and business rules.', importance: 'critical', layer: 'business' },
  business: { purpose: 'Groups business rules and cross-module domain coordination.', importance: 'high', layer: 'business' },

  // ── DATA LAYER ─────────────────────────────
  repositories: { purpose: 'Implements persistence access and abstracts database queries.', importance: 'high', layer: 'data' },
  repos: { purpose: 'Short-form repository directory for persistence adapters.', importance: 'medium', layer: 'data' },
  models: { purpose: 'Defines persisted data structures and domain entities.', importance: 'critical', layer: 'data' },
  entities: { purpose: 'Contains ORM entity classes that map to database tables.', importance: 'critical', layer: 'data' },
  schemas: { purpose: 'Defines request, response, or database schema shapes.', importance: 'high', layer: 'data' },
  migrations: { purpose: 'Stores database migration files that evolve schema over time.', importance: 'critical', layer: 'data' },
  seeds: { purpose: 'Contains bootstrap data used to populate the database.', importance: 'medium', layer: 'data' },
  seeders: { purpose: 'Defines repeatable scripts that insert starter data.', importance: 'medium', layer: 'data' },

  // ── MIDDLEWARE & GUARDS ────────────────────
  middleware: { purpose: 'Contains request interception logic shared across routes.', importance: 'high', layer: 'infra' },
  middlewares: { purpose: 'Collects multiple middleware modules for request processing.', importance: 'medium', layer: 'infra' },
  guards: { purpose: 'Implements authorization checks and access control gates.', importance: 'high', layer: 'infra' },
  interceptors: { purpose: 'Wraps request or response flow with cross-cutting behavior.', importance: 'medium', layer: 'infra' },
  pipes: { purpose: 'Transforms or validates inbound data before it reaches handlers.', importance: 'medium', layer: 'infra' },
  filters: { purpose: 'Catches and formats application errors at a global boundary.', importance: 'medium', layer: 'infra' },
  decorators: { purpose: 'Defines custom annotations that add metadata to classes or methods.', importance: 'medium', layer: 'infra' },
  validators: { purpose: 'Contains reusable validation rules and input checks.', importance: 'high', layer: 'infra' },

  // ── FRONTEND / UI ──────────────────────────
  components: { purpose: 'Stores reusable UI components shared across screens and pages.', importance: 'critical', layer: 'presentation' },
  pages: { purpose: 'Maps files to routes or page-level views in a frontend app.', importance: 'critical', layer: 'presentation' },
  views: { purpose: 'Contains view-level templates or page compositions.', importance: 'high', layer: 'presentation' },
  layouts: { purpose: 'Defines shared page shells, wrappers, and structural templates.', importance: 'high', layer: 'presentation' },
  screens: { purpose: 'Groups screen-sized UI surfaces used in mobile or desktop clients.', importance: 'high', layer: 'presentation' },
  atoms: { purpose: 'Holds the smallest reusable UI building blocks.', importance: 'medium', layer: 'presentation' },
  molecules: { purpose: 'Combines atoms into small reusable UI patterns.', importance: 'medium', layer: 'presentation' },
  organisms: { purpose: 'Combines smaller UI pieces into larger interface sections.', importance: 'medium', layer: 'presentation' },
  templates: { purpose: 'Contains page templates and reusable layout scaffolds.', importance: 'medium', layer: 'presentation' },
  hooks: { purpose: 'Stores reusable UI or React hooks with shared interaction logic.', importance: 'high', layer: 'presentation' },
  composables: { purpose: 'Contains reusable composition functions for reactive UI frameworks.', importance: 'high', layer: 'presentation' },
  directives: { purpose: 'Defines custom DOM or template directives for frontend behavior.', importance: 'medium', layer: 'presentation' },
  widgets: { purpose: 'Groups self-contained UI widgets used in multiple interfaces.', importance: 'medium', layer: 'presentation' },

  // ── STATE ──────────────────────────────────
  store: { purpose: 'Contains the primary application state container.', importance: 'high', layer: 'business' },
  stores: { purpose: 'Groups multiple state slices or store implementations.', importance: 'high', layer: 'business' },
  reducers: { purpose: 'Contains reducer functions that transform application state.', importance: 'high', layer: 'business' },
  actions: { purpose: 'Defines action creators or mutation dispatch helpers.', importance: 'high', layer: 'business' },
  mutations: { purpose: 'Holds explicit state mutation handlers used by some frameworks.', importance: 'high', layer: 'business' },
  effects: { purpose: 'Contains side-effect handling for state workflows.', importance: 'medium', layer: 'business' },
  selectors: { purpose: 'Defines derived state accessors and memoized selectors.', importance: 'high', layer: 'business' },
  context: { purpose: 'Stores context providers and shared tree-scoped state.', importance: 'high', layer: 'presentation' },

  // ── UTILITIES ──────────────────────────────
  utils: { purpose: 'Holds generic helpers used across the codebase.', importance: 'high', layer: 'config' },
  helpers: { purpose: 'Contains small reusable helper functions.', importance: 'medium', layer: 'config' },
  lib: { purpose: 'Stores shared library code reused by multiple features.', importance: 'high', layer: 'config' },
  shared: { purpose: 'Collects modules that are consumed by several application areas.', importance: 'high', layer: 'config' },
  common: { purpose: 'Contains code shared broadly across the project.', importance: 'high', layer: 'config' },
  constants: { purpose: 'Defines shared constants and fixed configuration values.', importance: 'medium', layer: 'config' },
  enums: { purpose: 'Contains enums or enum-like constant sets used in code.', importance: 'medium', layer: 'config' },
  config: { purpose: 'Stores runtime configuration and environment wiring.', importance: 'critical', layer: 'config' },
  configuration: { purpose: 'Contains detailed configuration objects and bootstrapping code.', importance: 'medium', layer: 'config' },
  settings: { purpose: 'Holds user-facing or app-level settings definitions.', importance: 'medium', layer: 'config' },

  // ── TYPES ──────────────────────────────────
  types: { purpose: 'Contains type aliases, interfaces, and shared type declarations.', importance: 'high', layer: 'config' },
  interfaces: { purpose: 'Defines interface contracts shared across modules.', importance: 'high', layer: 'config' },
  dtos: { purpose: 'Stores data transfer objects for requests and responses.', importance: 'high', layer: 'api' },
  dto: { purpose: 'Stores a single data transfer object module or set.', importance: 'high', layer: 'api' },
  contracts: { purpose: 'Defines contracts between bounded contexts or service boundaries.', importance: 'high', layer: 'business' },

  // ── ASYNC / EVENTS ─────────────────────────
  jobs: { purpose: 'Contains background jobs and asynchronous task definitions.', importance: 'high', layer: 'infra' },
  queues: { purpose: 'Defines queue producers, consumers, and queue settings.', importance: 'high', layer: 'infra' },
  workers: { purpose: 'Implements long-running workers that process jobs or messages.', importance: 'critical', layer: 'infra' },
  events: { purpose: 'Contains emitted domain or integration events.', importance: 'medium', layer: 'infra' },
  listeners: { purpose: 'Handles events produced by the application or framework.', importance: 'medium', layer: 'infra' },
  subscribers: { purpose: 'Subscribes to event streams or framework hooks.', importance: 'medium', layer: 'infra' },
  publishers: { purpose: 'Publishes messages or events to queues and event buses.', importance: 'medium', layer: 'infra' },
  tasks: { purpose: 'Defines scheduled or deferred task definitions.', importance: 'medium', layer: 'infra' },
  cron: { purpose: 'Contains scheduled cron jobs and recurring task handlers.', importance: 'medium', layer: 'infra' },

  // ── REALTIME ───────────────────────────────
  websockets: { purpose: 'Holds websocket servers and realtime event handlers.', importance: 'high', layer: 'infra' },
  ws: { purpose: 'Contains low-level websocket handlers or adapters.', importance: 'medium', layer: 'infra' },
  sockets: { purpose: 'Groups socket connection logic and realtime message flows.', importance: 'high', layer: 'infra' },
  gateways: { purpose: 'Defines realtime gateways or transport adapters.', importance: 'medium', layer: 'infra' },

  // ── INFRA / DEPLOY ─────────────────────────
  docker: { purpose: 'Contains container build artifacts or Docker-specific deployment files.', importance: 'critical', layer: 'infra' },
  k8s: { purpose: 'Stores Kubernetes manifests and deployment objects.', importance: 'high', layer: 'infra' },
  kubernetes: { purpose: 'Holds Kubernetes deployment configuration and manifests.', importance: 'high', layer: 'infra' },
  terraform: { purpose: 'Contains infrastructure-as-code modules and state definitions.', importance: 'critical', layer: 'infra' },
  infra: { purpose: 'Groups infrastructure and deployment support code.', importance: 'high', layer: 'infra' },
  infrastructure: { purpose: 'Stores infrastructure provisioning and deployment assets.', importance: 'high', layer: 'infra' },
  deploy: { purpose: 'Contains deployment scripts and release helpers.', importance: 'high', layer: 'infra' },
  deployment: { purpose: 'Groups deployment automation and release configuration.', importance: 'high', layer: 'infra' },
  scripts: { purpose: 'Holds automation scripts for builds, deploys, or maintenance tasks.', importance: 'high', layer: 'infra' },
  cmd: { purpose: 'Holds command entry points for services or CLIs.', importance: 'critical', layer: 'infra' },

  // ── CI/CD ──────────────────────────────────
  '.github': { purpose: 'Contains GitHub automation configuration and repository workflows.', importance: 'critical', layer: 'infra' },
  '.gitlab': { purpose: 'Contains GitLab CI/CD configuration and automation files.', importance: 'high', layer: 'infra' },
  '.circleci': { purpose: 'Contains CircleCI configuration and pipeline definitions.', importance: 'high', layer: 'infra' },
  workflows: { purpose: 'Stores CI/CD workflow definitions and job pipelines.', importance: 'critical', layer: 'infra' },

  // ── TESTS ──────────────────────────────────
  tests: { purpose: 'Contains the main automated test suite for the project.', importance: 'high', layer: 'test' },
  '__tests__': { purpose: 'Contains test files organized by Jest and similar conventions.', importance: 'high', layer: 'test' },
  test: { purpose: 'Contains tests, fixtures, or test harness code.', importance: 'high', layer: 'test' },
  spec: { purpose: 'Contains specification-style tests and behavior checks.', importance: 'high', layer: 'test' },
  e2e: { purpose: 'Contains end-to-end tests that exercise the full stack.', importance: 'critical', layer: 'test' },
  integration: { purpose: 'Contains tests across component and service boundaries.', importance: 'high', layer: 'test' },
  unit: { purpose: 'Contains isolated unit tests for functions and classes.', importance: 'high', layer: 'test' },
  mocks: { purpose: 'Contains reusable mock implementations for tests.', importance: 'medium', layer: 'test' },
  stubs: { purpose: 'Contains stubbed dependencies or test doubles.', importance: 'medium', layer: 'test' },
  fakes: { purpose: 'Contains fake implementations used in tests.', importance: 'medium', layer: 'test' },
  fixtures: { purpose: 'Contains static test data and sample directories.', importance: 'medium', layer: 'test' },

  // ── DOCS ───────────────────────────────────
  docs: { purpose: 'Contains project documentation and reference material.', importance: 'medium', layer: 'config' },
  documentation: { purpose: 'Contains long-form documentation or published guides.', importance: 'medium', layer: 'config' },
  wiki: { purpose: 'Contains wiki-style project reference material.', importance: 'low', layer: 'config' },
  guides: { purpose: 'Contains how-to guides and onboarding documentation.', importance: 'low', layer: 'config' },

  // ── ASSETS ─────────────────────────────────
  public: { purpose: 'Contains static files served directly to the browser.', importance: 'high', layer: 'presentation' },
  assets: { purpose: 'Contains shared static assets such as icons and images.', importance: 'medium', layer: 'presentation' },
  static: { purpose: 'Contains files served without transformation.', importance: 'medium', layer: 'presentation' },
  images: { purpose: 'Contains image assets used by the application.', importance: 'low', layer: 'presentation' },
  fonts: { purpose: 'Contains font files bundled or served by the project.', importance: 'low', layer: 'presentation' },
  icons: { purpose: 'Contains icon assets used throughout the UI.', importance: 'low', layer: 'presentation' },
  media: { purpose: 'Contains audio, video, or rich media assets.', importance: 'low', layer: 'presentation' },

  // ── STYLES ─────────────────────────────────
  styles: { purpose: 'Contains global or feature-level styling files.', importance: 'high', layer: 'presentation' },
  css: { purpose: 'Contains plain CSS stylesheets and style modules.', importance: 'medium', layer: 'presentation' },
  scss: { purpose: 'Contains Sass/SCSS source files for styling.', importance: 'medium', layer: 'presentation' },
  sass: { purpose: 'Contains indented Sass source files for styling.', importance: 'medium', layer: 'presentation' },
  themes: { purpose: 'Contains theme definitions, palettes, and visual variants.', importance: 'medium', layer: 'presentation' },
  tokens: { purpose: 'Contains design tokens such as spacing, color, and typography values.', importance: 'high', layer: 'presentation' },

  // ── I18N ───────────────────────────────────
  i18n: { purpose: 'Contains internationalization resources and locale wiring.', importance: 'medium', layer: 'config' },
  locales: { purpose: 'Contains per-language translation files.', importance: 'medium', layer: 'config' },
  translations: { purpose: 'Contains translated strings and localization bundles.', importance: 'medium', layer: 'config' },
  lang: { purpose: 'Contains language-specific content or locale data.', importance: 'low', layer: 'config' },

  // ── BUILD OUTPUT ───────────────────────────
  dist: { purpose: 'Contains compiled production output generated by the build.', importance: 'critical', layer: 'infra' },
  build: { purpose: 'Contains build artifacts and compiled distributions.', importance: 'critical', layer: 'infra' },
  out: { purpose: 'Contains exported build output or generated artifacts.', importance: 'medium', layer: 'infra' },
  '.next': { purpose: 'Contains Next.js build output and server artifacts.', importance: 'critical', layer: 'infra' },
  '.nuxt': { purpose: 'Contains Nuxt build output and generated assets.', importance: 'critical', layer: 'infra' },
  target: { purpose: 'Contains target build output from the selected toolchain.', importance: 'medium', layer: 'infra' },
  bin: { purpose: 'Contains compiled binaries or executable artifacts.', importance: 'high', layer: 'infra' }
} satisfies Record<string, FolderInfo>;
