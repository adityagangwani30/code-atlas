export interface FrameworkInfo {
  displayName: string;
  type: 'frontend' | 'backend' | 'fullstack' | 'cli' | 'library';
  language: 'typescript' | 'javascript' | 'python' | 'go' | 'rust' | 'java' | 'php' | 'ruby';
  entryPoints: string[];
  runCommand: string;
  buildCommand?: string;
  testCommand?: string;
  configFiles: string[];
  folderConventions: Record<string, string>;
  architectureStyle?: string;
  detectionFiles: string[];
}

export const FRAMEWORK_KNOWLEDGE = {
  nextjs: {
    displayName: 'Next.js',
    type: 'fullstack',
    language: 'typescript',
    entryPoints: ['app/layout.tsx', 'app/layout.jsx', 'pages/_app.tsx', 'pages/_app.jsx', 'next.config.js', 'next.config.ts'],
    runCommand: 'npm run dev',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['next.config.js', 'next.config.ts', 'next-env.d.ts', 'tailwind.config.ts'],
    detectionFiles: ['next.config.js', 'next.config.ts', '.next/'],
    architectureStyle: 'fullstack — file-based routing with React Server Components',
    folderConventions: {
      'app/': 'App Router — pages, layouts, and React Server Components (Next.js 13+)',
      'pages/': 'Pages Router — file-based routing, each file maps to a route',
      'app/api/': 'API Route Handlers — serverless backend endpoints',
      'components/': 'Reusable React UI components',
      'lib/': 'Third-party client initializers and shared utilities',
      'hooks/': 'Custom React hooks — reusable stateful logic',
      'public/': 'Static assets served directly at / — images, fonts, icons',
      'styles/': 'Global CSS and styling configuration',
      'actions/': 'Next.js Server Actions — server-side form and mutation handlers',
      'store/': 'Client-side state management',
      'types/': 'TypeScript type and interface definitions',
      'middleware.ts': 'Edge middleware — runs before every request'
    }
  },
  express: {
    displayName: 'Express',
    type: 'backend',
    language: 'javascript',
    entryPoints: ['server.js', 'server.ts', 'app.js', 'app.ts', 'index.js', 'index.ts'],
    runCommand: 'npm run dev',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['package.json', 'tsconfig.json', '.env'],
    detectionFiles: ['package.json', 'server.js', 'server.ts', 'app.js', 'app.ts'],
    architectureStyle: 'backend — middleware-driven HTTP service',
    folderConventions: {
      'routes/': 'Route declarations and HTTP endpoint wiring',
      'controllers/': 'Request handlers that orchestrate application logic',
      'services/': 'Business logic and domain coordination',
      'middleware/': 'Request preprocessing and cross-cutting concerns',
      'models/': 'Data models and persistence schemas',
      'config/': 'Runtime configuration and environment bootstrap',
      'utils/': 'Shared helpers and utility functions'
    }
  },
  nestjs: {
    displayName: 'NestJS',
    type: 'backend',
    language: 'typescript',
    entryPoints: ['src/main.ts', 'src/app.module.ts'],
    runCommand: 'npm run start:dev',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['nest-cli.json', 'tsconfig.json', 'tsconfig.build.json'],
    detectionFiles: ['nest-cli.json', 'src/main.ts', 'src/app.module.ts', 'tsconfig.build.json'],
    architectureStyle: 'backend — modular, decorator-driven dependency injection',
    folderConventions: {
      'src/modules/': 'Feature modules that bundle controllers, services, and providers',
      'src/controllers/': 'HTTP controllers that expose routes',
      'src/services/': 'Injectable services containing business logic',
      'src/entities/': 'Persistence entities for database integration',
      'src/guards/': 'Authorization and request guard logic',
      'src/interceptors/': 'Cross-cutting request and response interception',
      'src/pipes/': 'Validation and transformation pipes',
      'src/decorators/': 'Custom decorators used by the Nest runtime'
    }
  },
  fastify: {
    displayName: 'Fastify',
    type: 'backend',
    language: 'typescript',
    entryPoints: ['server.js', 'server.ts', 'app.js', 'app.ts'],
    runCommand: 'npm run dev',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['fastify.js', 'fastify.ts', 'package.json'],
    detectionFiles: ['fastify.js', 'fastify.ts', 'package.json'],
    architectureStyle: 'backend — schema-first high-performance HTTP service',
    folderConventions: {
      'routes/': 'Encapsulated route registrations',
      'plugins/': 'Fastify plugins and decorators',
      'schemas/': 'JSON schema definitions for validation',
      'services/': 'Business logic and service classes',
      'lib/': 'Utility code and adapter helpers'
    }
  },
  koa: {
    displayName: 'Koa',
    type: 'backend',
    language: 'javascript',
    entryPoints: ['app.js', 'app.ts', 'server.js', 'server.ts'],
    runCommand: 'npm run dev',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['package.json', 'tsconfig.json'],
    detectionFiles: ['package.json', 'app.js', 'app.ts'],
    architectureStyle: 'backend — lightweight middleware pipeline',
    folderConventions: {
      'middleware/': 'Composable request middleware layers',
      'routes/': 'Route registration and controller binding',
      'services/': 'Business logic and integrations',
      'context/': 'Custom Koa context extensions'
    }
  },
  sveltekit: {
    displayName: 'SvelteKit',
    type: 'fullstack',
    language: 'typescript',
    entryPoints: ['src/routes/+page.svelte', 'src/routes/+layout.svelte', 'src/hooks.server.ts'],
    runCommand: 'npm run dev',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['svelte.config.js', 'vite.config.ts', 'tsconfig.json'],
    detectionFiles: ['svelte.config.js', 'src/routes/+layout.svelte', 'src/routes/+page.svelte'],
    architectureStyle: 'fullstack — route-based Svelte rendering with server hooks',
    folderConventions: {
      'src/routes/': 'Route components, layouts, and server load functions',
      'src/lib/': 'Reusable application modules and utilities',
      'src/lib/components/': 'Shared UI components',
      'static/': 'Static assets served from the web root',
      'src/hooks.server.ts': 'Global server-side hooks and request interception'
    }
  },
  nuxt: {
    displayName: 'Nuxt',
    type: 'fullstack',
    language: 'typescript',
    entryPoints: ['app.vue', 'pages/index.vue', 'nuxt.config.ts'],
    runCommand: 'npm run dev',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['nuxt.config.ts', 'app.vue', 'tsconfig.json'],
    detectionFiles: ['nuxt.config.ts', 'app.vue', 'pages/'],
    architectureStyle: 'fullstack — Vue app framework with server and client rendering',
    folderConventions: {
      'pages/': 'File-based pages and nested routes',
      'components/': 'Reusable Vue components',
      'composables/': 'Reusable composition functions',
      'server/': 'Server routes, middleware, and Nitro handlers',
      'plugins/': 'Client and server plugins',
      'assets/': 'Unprocessed assets and styles',
      'public/': 'Public static files'
    }
  },
  astro: {
    displayName: 'Astro',
    type: 'fullstack',
    language: 'typescript',
    entryPoints: ['src/pages/index.astro', 'astro.config.mjs'],
    runCommand: 'npm run dev',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['astro.config.mjs', 'astro.config.ts', 'tsconfig.json'],
    detectionFiles: ['astro.config.mjs', 'astro.config.ts', 'src/pages/index.astro'],
    architectureStyle: 'fullstack — content-first islands architecture',
    folderConventions: {
      'src/pages/': 'Route pages and page-level content',
      'src/components/': 'Framework-agnostic UI components',
      'src/layouts/': 'Page shells and shared structure',
      'src/content/': 'Markdown and content collections',
      'public/': 'Static assets delivered without transformation'
    }
  },
  remix: {
    displayName: 'Remix',
    type: 'fullstack',
    language: 'typescript',
    entryPoints: ['app/root.tsx', 'app/entry.client.tsx', 'app/entry.server.tsx'],
    runCommand: 'npm run dev',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['remix.config.js', 'tsconfig.json', 'package.json'],
    detectionFiles: ['app/root.tsx', 'app/entry.client.tsx', 'app/entry.server.tsx'],
    architectureStyle: 'fullstack — nested routes with server-first data loading',
    folderConventions: {
      'app/routes/': 'Route modules, loaders, and actions',
      'app/components/': 'Reusable UI components',
      'app/utils/': 'Shared helpers and server utilities',
      'app/styles/': 'Route and global styles'
    }
  },
  'vite-react': {
    displayName: 'Vite + React',
    type: 'frontend',
    language: 'typescript',
    entryPoints: ['src/main.tsx', 'src/main.jsx', 'index.html'],
    runCommand: 'npm run dev',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['vite.config.ts', 'vite.config.js', 'index.html'],
    detectionFiles: ['vite.config.ts', 'vite.config.js', 'src/main.tsx', 'src/main.jsx'],
    architectureStyle: 'frontend — single-page application with Vite dev server',
    folderConventions: {
      'src/components/': 'Reusable React UI components',
      'src/hooks/': 'Custom React hooks',
      'src/lib/': 'Shared client utilities',
      'public/': 'Static browser assets'
    }
  },
  'vite-vue': {
    displayName: 'Vite + Vue',
    type: 'frontend',
    language: 'typescript',
    entryPoints: ['src/main.ts', 'src/main.js', 'index.html'],
    runCommand: 'npm run dev',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['vite.config.ts', 'vite.config.js', 'index.html'],
    detectionFiles: ['vite.config.ts', 'vite.config.js', 'src/main.ts', 'src/main.js'],
    architectureStyle: 'frontend — Vue application served by Vite',
    folderConventions: {
      'src/components/': 'Reusable Vue components',
      'src/composables/': 'Shared composition functions',
      'src/assets/': 'Imported assets bundled by Vite',
      'public/': 'Static browser assets'
    }
  },
  electron: {
    displayName: 'Electron',
    type: 'fullstack',
    language: 'typescript',
    entryPoints: ['main.js', 'main.ts', 'electron/main.js', 'electron/main.ts'],
    runCommand: 'npm run start',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['electron-builder.json', 'package.json', 'tsconfig.json'],
    detectionFiles: ['electron/main.js', 'electron/main.ts', 'package.json'],
    architectureStyle: 'desktop — browser-based UI with a Node.js main process',
    folderConventions: {
      'electron/': 'Main-process code, window creation, and app lifecycle',
      'renderer/': 'Browser UI code rendered inside the Electron window',
      'preload/': 'Bridge code that exposes safe APIs to the renderer'
    }
  },
  'react-native': {
    displayName: 'React Native',
    type: 'frontend',
    language: 'typescript',
    entryPoints: ['index.js', 'index.ts', 'src/App.tsx'],
    runCommand: 'npm run start',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['app.json', 'metro.config.js', 'babel.config.js'],
    detectionFiles: ['app.json', 'metro.config.js', 'babel.config.js'],
    architectureStyle: 'mobile — shared React components rendered through native bridges',
    folderConventions: {
      'src/components/': 'Reusable native UI components',
      'src/screens/': 'Mobile screens and navigation targets',
      'src/navigation/': 'Navigation configuration and routes',
      'assets/': 'Images, fonts, and bundled mobile assets'
    }
  },
  expo: {
    displayName: 'Expo',
    type: 'frontend',
    language: 'typescript',
    entryPoints: ['App.tsx', 'app.json', 'app.config.js'],
    runCommand: 'npm run start',
    buildCommand: 'npm run build',
    testCommand: 'npm test',
    configFiles: ['app.json', 'app.config.js', 'app.config.ts', 'metro.config.js'],
    detectionFiles: ['app.json', 'app.config.js', 'app.config.ts'],
    architectureStyle: 'mobile — managed React Native workflow with Expo tooling',
    folderConventions: {
      'app/': 'Expo Router screens and layouts',
      'assets/': 'Images, fonts, and bundled mobile assets',
      'src/': 'Shared application logic and components'
    }
  },
  fastapi: {
    displayName: 'FastAPI',
    type: 'backend',
    language: 'python',
    entryPoints: ['main.py', 'app/main.py', 'src/main.py'],
    runCommand: 'uvicorn main:app --reload',
    buildCommand: 'python -m compileall .',
    testCommand: 'pytest',
    configFiles: ['requirements.txt', 'pyproject.toml', 'main.py'],
    detectionFiles: ['main.py', 'app/main.py', 'requirements.txt'],
    architectureStyle: 'backend — async API framework with automatic OpenAPI docs',
    folderConventions: {
      'app/': 'Application package containing API routes and app setup',
      'routers/': 'API route modules grouped by resource',
      'schemas/': 'Pydantic request and response models',
      'services/': 'Business logic and orchestration',
      'models/': 'Database and domain models'
    }
  },
  django: {
    displayName: 'Django',
    type: 'fullstack',
    language: 'python',
    entryPoints: ['manage.py', 'project/wsgi.py', 'project/asgi.py'],
    runCommand: 'python manage.py runserver',
    buildCommand: 'python manage.py collectstatic --noinput',
    testCommand: 'python manage.py test',
    configFiles: ['manage.py', 'settings.py', 'pyproject.toml'],
    detectionFiles: ['manage.py', 'settings.py', 'urls.py'],
    architectureStyle: 'fullstack — batteries-included MVC-style web framework',
    folderConventions: {
      'apps/': 'Django applications grouped by business feature',
      'templates/': 'Django template files and view markup',
      'static/': 'Compiled or served static assets',
      'migrations/': 'Database schema migrations',
      'fixtures/': 'Seed data for tests and local development'
    }
  },
  flask: {
    displayName: 'Flask',
    type: 'backend',
    language: 'python',
    entryPoints: ['app.py', 'main.py', 'wsgi.py'],
    runCommand: 'flask run',
    buildCommand: 'python -m compileall .',
    testCommand: 'pytest',
    configFiles: ['requirements.txt', '.flaskenv', 'pyproject.toml'],
    detectionFiles: ['app.py', 'requirements.txt', '.flaskenv'],
    architectureStyle: 'backend — minimal Python microframework with extension-based architecture',
    folderConventions: {
      'app/': 'Application package and route definitions',
      'templates/': 'Jinja templates for server-rendered pages',
      'static/': 'Static assets for the browser',
      'blueprints/': 'Feature-oriented Flask route modules'
    }
  },
  tornado: {
    displayName: 'Tornado',
    type: 'backend',
    language: 'python',
    entryPoints: ['app.py', 'main.py'],
    runCommand: 'python app.py',
    buildCommand: 'python -m compileall .',
    testCommand: 'pytest',
    configFiles: ['requirements.txt', 'pyproject.toml'],
    detectionFiles: ['app.py', 'requirements.txt'],
    architectureStyle: 'backend — asynchronous networking and websocket-friendly server framework',
    folderConventions: {
      'handlers/': 'Request handlers and websocket endpoints',
      'templates/': 'HTML templates for server-side rendering',
      'static/': 'Assets served directly by Tornado'
    }
  },
  litestar: {
    displayName: 'Litestar',
    type: 'backend',
    language: 'python',
    entryPoints: ['app.py', 'main.py'],
    runCommand: 'litestar run',
    buildCommand: 'python -m compileall .',
    testCommand: 'pytest',
    configFiles: ['pyproject.toml', 'requirements.txt'],
    detectionFiles: ['pyproject.toml', 'requirements.txt', 'app.py'],
    architectureStyle: 'backend — modern Python API framework with typed routes and dependency injection',
    folderConventions: {
      'app/': 'Application modules and route registration',
      'domain/': 'Domain objects and service code',
      'dto/': 'Request and response DTOs'
    }
  },
  gin: {
    displayName: 'Gin',
    type: 'backend',
    language: 'go',
    entryPoints: ['main.go', 'cmd/server/main.go'],
    runCommand: 'go run .',
    buildCommand: 'go build ./...',
    testCommand: 'go test ./...',
    configFiles: ['go.mod'],
    detectionFiles: ['go.mod', 'main.go'],
    architectureStyle: 'backend — lightweight Go HTTP router with middleware support',
    folderConventions: {
      'cmd/': 'Executable entry points for the service',
      'internal/': 'Private application packages and handlers',
      'pkg/': 'Reusable packages exported across projects'
    }
  },
  echo: {
    displayName: 'Echo',
    type: 'backend',
    language: 'go',
    entryPoints: ['main.go', 'cmd/server/main.go'],
    runCommand: 'go run .',
    buildCommand: 'go build ./...',
    testCommand: 'go test ./...',
    configFiles: ['go.mod'],
    detectionFiles: ['go.mod', 'main.go'],
    architectureStyle: 'backend — fast Go web framework with middleware and routing',
    folderConventions: {
      'cmd/': 'Executable entry points for the service',
      'internal/': 'Private application code',
      'pkg/': 'Reusable packages'
    }
  },
  fiber: {
    displayName: 'Fiber',
    type: 'backend',
    language: 'go',
    entryPoints: ['main.go', 'cmd/server/main.go'],
    runCommand: 'go run .',
    buildCommand: 'go build ./...',
    testCommand: 'go test ./...',
    configFiles: ['go.mod'],
    detectionFiles: ['go.mod', 'main.go'],
    architectureStyle: 'backend — Express-style Go framework built on fasthttp',
    folderConventions: {
      'routes/': 'Route definitions and HTTP handlers',
      'middleware/': 'Middleware layers and request hooks',
      'services/': 'Business logic and adapters'
    }
  },
  chi: {
    displayName: 'Chi',
    type: 'backend',
    language: 'go',
    entryPoints: ['main.go', 'cmd/server/main.go'],
    runCommand: 'go run .',
    buildCommand: 'go build ./...',
    testCommand: 'go test ./...',
    configFiles: ['go.mod'],
    detectionFiles: ['go.mod', 'main.go'],
    architectureStyle: 'backend — composable Go router and middleware toolkit',
    folderConventions: {
      'routes/': 'Route wiring and handler registration',
      'middleware/': 'Reusable middleware and request wrappers',
      'internal/': 'Private application logic'
    }
  },
  'standard-go-cli': {
    displayName: 'Standard Go CLI',
    type: 'cli',
    language: 'go',
    entryPoints: ['main.go', 'cmd/*.go'],
    runCommand: 'go run .',
    buildCommand: 'go build -o bin/app .',
    testCommand: 'go test ./...',
    configFiles: ['go.mod'],
    detectionFiles: ['go.mod', 'main.go', 'cmd/'],
    architectureStyle: 'cli — conventional Go command-line application layout',
    folderConventions: {
      'cmd/': 'Subcommands and executable entry points',
      'internal/': 'Internal packages not meant for reuse',
      'pkg/': 'Optional shared packages'
    }
  },
  'spring-boot': {
    displayName: 'Spring Boot',
    type: 'backend',
    language: 'java',
    entryPoints: ['src/main/java/**/Application.java'],
    runCommand: './mvnw spring-boot:run',
    buildCommand: './mvnw clean package',
    testCommand: './mvnw test',
    configFiles: ['pom.xml', 'application.properties', 'application.yml'],
    detectionFiles: ['pom.xml', 'src/main/java', 'src/main/resources'],
    architectureStyle: 'backend — convention-over-configuration Java application framework',
    folderConventions: {
      'src/main/java/': 'Java source code and application packages',
      'src/main/resources/': 'Configuration, templates, and static assets',
      'src/test/java/': 'JUnit test sources'
    }
  },
  laravel: {
    displayName: 'Laravel',
    type: 'fullstack',
    language: 'php',
    entryPoints: ['public/index.php', 'artisan'],
    runCommand: 'php artisan serve',
    buildCommand: 'npm run build',
    testCommand: 'php artisan test',
    configFiles: ['composer.json', '.env', 'artisan'],
    detectionFiles: ['artisan', 'composer.json', 'app/Http/Controllers'],
    architectureStyle: 'fullstack — expressive PHP MVC framework with artisan tooling',
    folderConventions: {
      'app/Http/Controllers/': 'HTTP controllers that handle incoming requests',
      'app/Models/': 'Eloquent models and domain data objects',
      'resources/views/': 'Blade templates and front-end views',
      'routes/': 'Web, API, and console route definitions',
      'database/migrations/': 'Schema migrations',
      'database/seeders/': 'Seed data and database bootstrap scripts'
    }
  },
  rails: {
    displayName: 'Ruby on Rails',
    type: 'fullstack',
    language: 'ruby',
    entryPoints: ['bin/rails', 'config.ru', 'app/controllers/application_controller.rb'],
    runCommand: 'bin/rails server',
    buildCommand: 'bin/rails assets:precompile',
    testCommand: 'bin/rails test',
    configFiles: ['Gemfile', 'config/routes.rb', 'config/application.rb'],
    detectionFiles: ['Gemfile', 'config/routes.rb', 'app/controllers'],
    architectureStyle: 'fullstack — MVC framework with opinionated conventions',
    folderConventions: {
      'app/controllers/': 'Controller classes that coordinate requests and responses',
      'app/models/': 'ActiveRecord models and domain logic',
      'app/views/': 'ERB templates and view partials',
      'app/helpers/': 'View helper methods',
      'db/migrate/': 'Database migration files',
      'test/': 'Rails test suite'
    }
  }
} as const satisfies Record<string, FrameworkInfo>;
