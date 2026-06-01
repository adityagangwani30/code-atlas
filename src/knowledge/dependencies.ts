export type DependencyCategory =
  | 'backend-framework'
  | 'frontend-framework'
  | 'fullstack-framework'
  | 'orm'
  | 'database-driver'
  | 'auth'
  | 'validation'
  | 'testing'
  | 'state-management'
  | 'styling'
  | 'http-client'
  | 'queue'
  | 'cache'
  | 'ai-ml'
  | 'devtool'
  | 'utility'
  | 'infra'
  | 'realtime'
  | 'file-storage'
  | 'email'
  | 'payments'
  | 'monitoring';

export interface DependencyInfo {
  category: DependencyCategory;
  description: string;
  role: 'core' | 'utility' | 'devtool' | 'peer';
  docs: string;
}

const entries: Array<[string, DependencyInfo]> = [
  ['express', { category: 'backend-framework', description: 'Express is a minimalist Node.js web framework for routing, middleware, and HTTP servers.', role: 'core', docs: 'https://expressjs.com/' }],
  ['fastify', { category: 'backend-framework', description: 'Fastify is a high-performance Node.js framework with a plugin-first architecture and JSON-schema support.', role: 'core', docs: 'https://fastify.dev/' }],
  ['koa', { category: 'backend-framework', description: 'Koa is a lightweight Node.js framework focused on async middleware composition.', role: 'core', docs: 'https://koajs.com/' }],
  ['hapi', { category: 'backend-framework', description: 'hapi is a configurable Node.js framework with a strong plugin and validation story.', role: 'core', docs: 'https://hapi.dev/' }],
  ['@nestjs/core', { category: 'backend-framework', description: 'NestJS core provides the dependency-injected application runtime for Nest applications.', role: 'core', docs: 'https://docs.nestjs.com/' }],
  ['nestjs', { category: 'backend-framework', description: 'NestJS is a structured Node.js backend framework built on TypeScript and decorators.', role: 'core', docs: 'https://docs.nestjs.com/' }],
  ['elysia', { category: 'backend-framework', description: 'Elysia is a TypeScript-first server framework for Bun and Node-style web APIs.', role: 'core', docs: 'https://elysiajs.com/' }],
  ['h3', { category: 'backend-framework', description: 'h3 is a small HTTP framework used heavily in Nuxt and Nitro-based applications.', role: 'core', docs: 'https://h3.dev/' }],
  ['hono', { category: 'backend-framework', description: 'Hono is a tiny, fast web framework for edge and server runtimes.', role: 'core', docs: 'https://hono.dev/' }],
  ['restify', { category: 'backend-framework', description: 'Restify is a Node.js framework designed for building REST services.', role: 'core', docs: 'http://restify.com/' }],

  ['react', { category: 'frontend-framework', description: 'React is a component-based UI library for building interactive interfaces.', role: 'core', docs: 'https://react.dev/' }],
  ['vue', { category: 'frontend-framework', description: 'Vue is a progressive frontend framework for building reactive UIs.', role: 'core', docs: 'https://vuejs.org/' }],
  ['svelte', { category: 'frontend-framework', description: 'Svelte is a compiler-driven UI framework that shifts work to build time.', role: 'core', docs: 'https://svelte.dev/' }],
  ['solid-js', { category: 'frontend-framework', description: 'Solid is a fine-grained reactive frontend library with a JSX-based API.', role: 'core', docs: 'https://www.solidjs.com/' }],
  ['preact', { category: 'frontend-framework', description: 'Preact is a lightweight React-compatible UI library with a small footprint.', role: 'core', docs: 'https://preactjs.com/' }],
  ['lit', { category: 'frontend-framework', description: 'Lit is a library for building Web Components with expressive templates.', role: 'core', docs: 'https://lit.dev/' }],
  ['alpine', { category: 'frontend-framework', description: 'Alpine is a lightweight JavaScript framework for declarative interactivity in markup.', role: 'core', docs: 'https://alpinejs.dev/' }],

  ['next', { category: 'fullstack-framework', description: 'Next.js is a React-based fullstack framework with file-based routing and server rendering.', role: 'core', docs: 'https://nextjs.org/' }],
  ['nuxt', { category: 'fullstack-framework', description: 'Nuxt is a Vue fullstack framework with routing, server rendering, and server utilities.', role: 'core', docs: 'https://nuxt.com/' }],
  ['@sveltejs/kit', { category: 'fullstack-framework', description: 'SvelteKit is the official fullstack framework for Svelte applications.', role: 'core', docs: 'https://kit.svelte.dev/' }],
  ['astro', { category: 'fullstack-framework', description: 'Astro is a content-focused web framework optimized for shipping less client JavaScript.', role: 'core', docs: 'https://astro.build/' }],
  ['remix', { category: 'fullstack-framework', description: 'Remix is a fullstack React framework centered on nested routing and data loading.', role: 'core', docs: 'https://remix.run/' }],
  ['@remix-run/react', { category: 'fullstack-framework', description: 'The Remix React runtime provides framework primitives for Remix applications.', role: 'peer', docs: 'https://remix.run/docs' }],
  ['gatsby', { category: 'fullstack-framework', description: 'Gatsby is a React framework for static generation and content-driven sites.', role: 'core', docs: 'https://www.gatsbyjs.com/' }],

  ['prisma', { category: 'orm', description: 'Prisma is a type-safe ORM and schema tool for modern databases.', role: 'core', docs: 'https://www.prisma.io/' }],
  ['typeorm', { category: 'orm', description: 'TypeORM is a TypeScript ORM for working with relational and document databases.', role: 'core', docs: 'https://typeorm.io/' }],
  ['drizzle-orm', { category: 'orm', description: 'Drizzle ORM is a lightweight TypeScript ORM built around SQL-first typing.', role: 'core', docs: 'https://orm.drizzle.team/' }],
  ['mongoose', { category: 'orm', description: 'Mongoose is an ODM for MongoDB with schemas, models, and hooks.', role: 'core', docs: 'https://mongoosejs.com/' }],
  ['sequelize', { category: 'orm', description: 'Sequelize is a mature promise-based ORM for Node.js relational databases.', role: 'core', docs: 'https://sequelize.org/' }],
  ['knex', { category: 'orm', description: 'Knex is a SQL query builder and migration tool for Node.js.', role: 'utility', docs: 'https://knexjs.org/' }],
  ['@planetscale/database', { category: 'database-driver', description: 'PlanetScale Database is a serverless MySQL driver for edge and serverless apps.', role: 'core', docs: 'https://github.com/planetscale/database-js' }],
  ['pg', { category: 'database-driver', description: 'pg is the PostgreSQL driver for Node.js.', role: 'core', docs: 'https://node-postgres.com/' }],
  ['mysql2', { category: 'database-driver', description: 'mysql2 is a MySQL and MariaDB client for Node.js.', role: 'core', docs: 'https://github.com/sidorares/node-mysql2' }],
  ['better-sqlite3', { category: 'database-driver', description: 'better-sqlite3 is a synchronous SQLite binding for Node.js.', role: 'core', docs: 'https://github.com/WiseLibs/better-sqlite3' }],
  ['ioredis', { category: 'cache', description: 'ioredis is a robust Redis client for Node.js.', role: 'core', docs: 'https://github.com/redis/ioredis' }],
  ['redis', { category: 'cache', description: 'redis is the official Redis client for Node.js.', role: 'core', docs: 'https://github.com/redis/node-redis' }],
  ['@upstash/redis', { category: 'cache', description: 'Upstash Redis is a serverless Redis client for HTTP-based deployments.', role: 'core', docs: 'https://upstash.com/docs/redis' }],

  ['passport', { category: 'auth', description: 'Passport is an authentication middleware for Node.js with many strategies.', role: 'core', docs: 'https://www.passportjs.org/' }],
  ['jsonwebtoken', { category: 'auth', description: 'jsonwebtoken signs and verifies JSON Web Tokens.', role: 'core', docs: 'https://github.com/auth0/node-jsonwebtoken' }],
  ['next-auth', { category: 'auth', description: 'NextAuth provides authentication for Next.js applications.', role: 'core', docs: 'https://authjs.dev/' }],
  ['lucia', { category: 'auth', description: 'Lucia is an authentication library focused on session-based auth.', role: 'core', docs: 'https://lucia-auth.com/' }],
  ['better-auth', { category: 'auth', description: 'Better Auth is an authentication toolkit for modern JavaScript apps.', role: 'core', docs: 'https://better-auth.com/' }],
  ['@clerk/nextjs', { category: 'auth', description: 'Clerk Next.js SDK provides prebuilt authentication and user management.', role: 'core', docs: 'https://clerk.com/docs/nextjs' }],
  ['@auth0/nextjs-auth0', { category: 'auth', description: 'Auth0 Next.js SDK integrates Auth0 authentication into Next applications.', role: 'core', docs: 'https://auth0.com/docs/libraries/auth0-nextjs' }],
  ['firebase-admin', { category: 'auth', description: 'Firebase Admin SDK supports authentication and privileged Firebase operations.', role: 'core', docs: 'https://firebase.google.com/docs/admin' }],
  ['express-session', { category: 'auth', description: 'express-session stores and manages session data for Express apps.', role: 'core', docs: 'https://github.com/expressjs/session' }],
  ['bcrypt', { category: 'auth', description: 'bcrypt hashes passwords using the bcrypt algorithm.', role: 'utility', docs: 'https://github.com/kelektiv/node.bcrypt.js' }],
  ['bcryptjs', { category: 'auth', description: 'bcryptjs is a pure JavaScript bcrypt implementation.', role: 'utility', docs: 'https://github.com/dcodeIO/bcrypt.js/' }],
  ['argon2', { category: 'auth', description: 'argon2 provides Argon2 password hashing for Node.js.', role: 'utility', docs: 'https://github.com/ranisalt/node-argon2' }],

  ['zod', { category: 'validation', description: 'Zod is a TypeScript-first schema validation library.', role: 'core', docs: 'https://zod.dev/' }],
  ['joi', { category: 'validation', description: 'Joi is a runtime schema validation library for JavaScript.', role: 'core', docs: 'https://joi.dev/' }],
  ['yup', { category: 'validation', description: 'Yup is a schema validation and casting library for forms and APIs.', role: 'core', docs: 'https://github.com/jquense/yup' }],
  ['valibot', { category: 'validation', description: 'Valibot is a lightweight schema validation library for TypeScript.', role: 'core', docs: 'https://valibot.dev/' }],
  ['class-validator', { category: 'validation', description: 'class-validator validates decorator-based TypeScript classes.', role: 'core', docs: 'https://github.com/typestack/class-validator' }],
  ['ajv', { category: 'validation', description: 'Ajv is a fast JSON Schema validator.', role: 'core', docs: 'https://ajv.js.org/' }],
  ['superstruct', { category: 'validation', description: 'Superstruct is a composable data validation library.', role: 'core', docs: 'https://docs.superstructjs.org/' }],

  ['jest', { category: 'testing', description: 'Jest is a widely used JavaScript testing framework.', role: 'devtool', docs: 'https://jestjs.io/' }],
  ['vitest', { category: 'testing', description: 'Vitest is a Vite-native test runner for modern JavaScript and TypeScript.', role: 'devtool', docs: 'https://vitest.dev/' }],
  ['mocha', { category: 'testing', description: 'Mocha is a flexible JavaScript test framework.', role: 'devtool', docs: 'https://mochajs.org/' }],
  ['chai', { category: 'testing', description: 'Chai is an assertion library used with JavaScript tests.', role: 'devtool', docs: 'https://www.chaijs.com/' }],
  ['supertest', { category: 'testing', description: 'Supertest is an HTTP assertion library for API tests.', role: 'devtool', docs: 'https://github.com/ladjs/supertest' }],
  ['playwright', { category: 'testing', description: 'Playwright automates browsers for end-to-end testing.', role: 'devtool', docs: 'https://playwright.dev/' }],
  ['@playwright/test', { category: 'testing', description: 'Playwright Test is the built-in test runner for Playwright.', role: 'devtool', docs: 'https://playwright.dev/docs/test-intro' }],
  ['cypress', { category: 'testing', description: 'Cypress is a browser-based end-to-end testing framework.', role: 'devtool', docs: 'https://www.cypress.io/' }],
  ['@testing-library/react', { category: 'testing', description: 'Testing Library React utilities encourage testing user behavior.', role: 'devtool', docs: 'https://testing-library.com/docs/react-testing-library/intro/' }],
  ['@testing-library/jest-dom', { category: 'testing', description: 'jest-dom adds DOM-specific matchers to testing-library.', role: 'devtool', docs: 'https://github.com/testing-library/jest-dom' }],
  ['sinon', { category: 'testing', description: 'Sinon provides test spies, stubs, and mocks.', role: 'devtool', docs: 'https://sinonjs.org/' }],
  ['nock', { category: 'testing', description: 'Nock intercepts HTTP requests for test isolation.', role: 'devtool', docs: 'https://github.com/nock/nock' }],

  ['redux', { category: 'state-management', description: 'Redux is a predictable state container for JavaScript apps.', role: 'core', docs: 'https://redux.js.org/' }],
  ['@reduxjs/toolkit', { category: 'state-management', description: 'Redux Toolkit is the official recommended Redux tooling.', role: 'core', docs: 'https://redux-toolkit.js.org/' }],
  ['zustand', { category: 'state-management', description: 'Zustand is a small and fast state management library.', role: 'core', docs: 'https://zustand-demo.pmnd.rs/' }],
  ['jotai', { category: 'state-management', description: 'Jotai is an atomic state management library for React.', role: 'core', docs: 'https://jotai.org/' }],
  ['recoil', { category: 'state-management', description: 'Recoil is a state management library for React applications.', role: 'core', docs: 'https://recoiljs.org/' }],
  ['pinia', { category: 'state-management', description: 'Pinia is the official state management library for Vue.', role: 'core', docs: 'https://pinia.vuejs.org/' }],
  ['mobx', { category: 'state-management', description: 'MobX provides reactive state management with observable data.', role: 'core', docs: 'https://mobx.js.org/' }],
  ['xstate', { category: 'state-management', description: 'XState models application logic with finite state machines.', role: 'core', docs: 'https://stately.ai/docs/xstate' }],
  ['valtio', { category: 'state-management', description: 'Valtio is a proxy-based state management library.', role: 'core', docs: 'https://valtio.pmnd.rs/' }],
  ['nanostores', { category: 'state-management', description: 'Nanostores is a tiny atomic state manager.', role: 'core', docs: 'https://github.com/nanostores/nanostores' }],

  ['tailwindcss', { category: 'styling', description: 'Tailwind CSS is a utility-first styling framework.', role: 'core', docs: 'https://tailwindcss.com/' }],
  ['styled-components', { category: 'styling', description: 'styled-components lets you write CSS-in-JS for React components.', role: 'core', docs: 'https://styled-components.com/' }],
  ['@emotion/react', { category: 'styling', description: 'Emotion provides performant CSS-in-JS styling primitives.', role: 'core', docs: 'https://emotion.sh/docs/introduction' }],
  ['sass', { category: 'styling', description: 'Sass is a CSS preprocessor with variables and mixins.', role: 'devtool', docs: 'https://sass-lang.com/' }],
  ['less', { category: 'styling', description: 'Less is a CSS preprocessor with variables and nested rules.', role: 'devtool', docs: 'https://lesscss.org/' }],
  ['@mui/material', { category: 'styling', description: 'MUI Material is a React UI component library based on Material Design.', role: 'core', docs: 'https://mui.com/material-ui/' }],
  ['@chakra-ui/react', { category: 'styling', description: 'Chakra UI is a simple and composable React component library.', role: 'core', docs: 'https://chakra-ui.com/' }],
  ['@mantine/core', { category: 'styling', description: 'Mantine is a React component library with hooks and styling tools.', role: 'core', docs: 'https://mantine.dev/' }],
  ['shadcn-ui', { category: 'styling', description: 'shadcn/ui provides copyable component patterns built on Radix and Tailwind.', role: 'core', docs: 'https://ui.shadcn.com/' }],
  ['daisyui', { category: 'styling', description: 'daisyUI is a Tailwind CSS component library.', role: 'core', docs: 'https://daisyui.com/' }],
  ['antd', { category: 'styling', description: 'Ant Design is a comprehensive React UI component library.', role: 'core', docs: 'https://ant.design/' }],
  ['bootstrap', { category: 'styling', description: 'Bootstrap is a popular responsive UI framework.', role: 'core', docs: 'https://getbootstrap.com/' }],

  ['axios', { category: 'http-client', description: 'Axios is a promise-based HTTP client for browsers and Node.js.', role: 'core', docs: 'https://axios-http.com/' }],
  ['ky', { category: 'http-client', description: 'Ky is a tiny and modern HTTP client built on fetch.', role: 'core', docs: 'https://github.com/sindresorhus/ky' }],
  ['got', { category: 'http-client', description: 'Got is an extensible HTTP client for Node.js.', role: 'core', docs: 'https://github.com/sindresorhus/got' }],
  ['node-fetch', { category: 'http-client', description: 'node-fetch is a fetch-compatible HTTP client for Node.js.', role: 'core', docs: 'https://github.com/node-fetch/node-fetch' }],
  ['undici', { category: 'http-client', description: 'Undici is the high-performance HTTP client used by Node.js fetch.', role: 'core', docs: 'https://undici.nodejs.org/' }],
  ['@tanstack/react-query', { category: 'http-client', description: 'TanStack Query manages async server state and caching.', role: 'core', docs: 'https://tanstack.com/query/latest' }],
  ['swr', { category: 'http-client', description: 'SWR is a React data fetching and caching library.', role: 'core', docs: 'https://swr.vercel.app/' }],
  ['apollo-client', { category: 'http-client', description: 'Apollo Client is a GraphQL data client with caching and hooks.', role: 'core', docs: 'https://www.apollographql.com/docs/react/' }],
  ['graphql-request', { category: 'http-client', description: 'graphql-request is a minimal GraphQL client.', role: 'core', docs: 'https://github.com/graffle-js/graphql-request' }],
  ['@trpc/client', { category: 'http-client', description: 'tRPC client provides end-to-end typed API calls.', role: 'core', docs: 'https://trpc.io/docs/client/vanilla' }],

  ['bull', { category: 'queue', description: 'Bull is a Redis-backed job queue for Node.js.', role: 'core', docs: 'https://optimalbits.github.io/bull/' }],
  ['bullmq', { category: 'queue', description: 'BullMQ is a modern Redis-based queue and worker library.', role: 'core', docs: 'https://docs.bullmq.io/' }],
  ['agenda', { category: 'queue', description: 'Agenda is a MongoDB-backed job scheduling library.', role: 'core', docs: 'https://github.com/agenda/agenda' }],
  ['bee-queue', { category: 'queue', description: 'Bee-Queue is a simple Redis-backed job queue.', role: 'core', docs: 'https://github.com/bee-queue/bee-queue' }],
  ['@nestjs/bull', { category: 'queue', description: 'NestJS Bull integrates Bull queues with Nest applications.', role: 'core', docs: 'https://docs.nestjs.com/techniques/queues' }],

  ['socket.io', { category: 'realtime', description: 'Socket.IO provides bidirectional realtime communication.', role: 'core', docs: 'https://socket.io/' }],
  ['ws', { category: 'realtime', description: 'ws is a simple WebSocket implementation for Node.js.', role: 'core', docs: 'https://github.com/websockets/ws' }],
  ['@supabase/supabase-js', { category: 'realtime', description: 'Supabase JS is the client SDK for Supabase services and realtime APIs.', role: 'core', docs: 'https://supabase.com/docs/reference/javascript/introduction' }],
  ['pusher', { category: 'realtime', description: 'Pusher enables realtime pub/sub messaging.', role: 'core', docs: 'https://pusher.com/docs/' }],
  ['ably', { category: 'realtime', description: 'Ably provides realtime messaging and pub/sub infrastructure.', role: 'core', docs: 'https://ably.com/docs' }],
  ['livekit-client', { category: 'realtime', description: 'LiveKit Client connects browsers and apps to LiveKit realtime rooms.', role: 'core', docs: 'https://docs.livekit.io/' }],

  ['multer', { category: 'file-storage', description: 'Multer handles multipart form uploads in Express apps.', role: 'utility', docs: 'https://github.com/expressjs/multer' }],
  ['formidable', { category: 'file-storage', description: 'Formidable parses file uploads and multipart forms.', role: 'utility', docs: 'https://github.com/node-formidable/formidable' }],
  ['@aws-sdk/client-s3', { category: 'file-storage', description: 'AWS S3 client provides object storage operations for Node.js.', role: 'core', docs: 'https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/' }],
  ['@google-cloud/storage', { category: 'file-storage', description: 'Google Cloud Storage client supports bucket and object management.', role: 'core', docs: 'https://cloud.google.com/nodejs/docs/reference/storage/latest' }],
  ['cloudinary', { category: 'file-storage', description: 'Cloudinary manages image and media uploads and transformations.', role: 'core', docs: 'https://cloudinary.com/documentation' }],
  ['uploadthing', { category: 'file-storage', description: 'UploadThing provides hosted file upload workflows for modern apps.', role: 'core', docs: 'https://docs.uploadthing.com/' }],

  ['nodemailer', { category: 'email', description: 'Nodemailer sends email from Node.js applications.', role: 'core', docs: 'https://nodemailer.com/' }],
  ['@sendgrid/mail', { category: 'email', description: 'SendGrid Mail is the official transactional email client.', role: 'core', docs: 'https://github.com/sendgrid/sendgrid-nodejs' }],
  ['resend', { category: 'email', description: 'Resend is a developer-friendly email API for transactional mail.', role: 'core', docs: 'https://resend.com/docs' }],
  ['postmark', { category: 'email', description: 'Postmark is a transactional email delivery service.', role: 'core', docs: 'https://postmarkapp.com/developer' }],

  ['stripe', { category: 'payments', description: 'Stripe powers payments, subscriptions, and billing workflows.', role: 'core', docs: 'https://stripe.com/docs' }],
  ['@stripe/stripe-js', { category: 'payments', description: 'Stripe.js is the browser SDK for client-side Stripe flows.', role: 'core', docs: 'https://stripe.com/docs/js' }],
  ['razorpay', { category: 'payments', description: 'Razorpay provides payment gateway and subscription APIs.', role: 'core', docs: 'https://razorpay.com/docs/' }],
  ['braintree', { category: 'payments', description: 'Braintree is a payments platform for card and wallet processing.', role: 'core', docs: 'https://developer.paypal.com/braintree/docs' }],

  ['@sentry/node', { category: 'monitoring', description: 'Sentry Node SDK captures server-side errors and performance traces.', role: 'core', docs: 'https://docs.sentry.io/platforms/javascript/guides/node/' }],
  ['@sentry/nextjs', { category: 'monitoring', description: 'Sentry Next.js integration captures frontend and server-side telemetry.', role: 'core', docs: 'https://docs.sentry.io/platforms/javascript/guides/nextjs/' }],
  ['pino', { category: 'monitoring', description: 'Pino is a fast structured logger for Node.js.', role: 'core', docs: 'https://getpino.io/' }],
  ['winston', { category: 'monitoring', description: 'Winston is a flexible logging library for Node.js.', role: 'core', docs: 'https://github.com/winstonjs/winston' }],
  ['morgan', { category: 'monitoring', description: 'Morgan is HTTP request logging middleware for Express.', role: 'core', docs: 'https://github.com/expressjs/morgan' }],
  ['dd-trace', { category: 'monitoring', description: 'Datadog APM tracing integrates request and performance telemetry.', role: 'devtool', docs: 'https://docs.datadoghq.com/tracing/trace_collection/library_config/nodejs/' }],
  ['@opentelemetry/api', { category: 'monitoring', description: 'OpenTelemetry API exposes vendor-neutral tracing and metrics primitives.', role: 'core', docs: 'https://opentelemetry.io/docs/languages/js/' }],

  ['openai', { category: 'ai-ml', description: 'OpenAI provides API access to GPT-style language and multimodal models.', role: 'core', docs: 'https://platform.openai.com/docs' }],
  ['anthropic', { category: 'ai-ml', description: 'Anthropic provides Claude API access for language model workflows.', role: 'core', docs: 'https://docs.anthropic.com/' }],
  ['@google/generative-ai', { category: 'ai-ml', description: 'Google Generative AI SDK accesses Gemini models from JavaScript.', role: 'core', docs: 'https://ai.google.dev/gemini-api/docs' }],
  ['langchain', { category: 'ai-ml', description: 'LangChain is a framework for building LLM-powered applications.', role: 'core', docs: 'https://js.langchain.com/docs/' }],
  ['@langchain/core', { category: 'ai-ml', description: 'LangChain core contains shared primitives for LangChain applications.', role: 'core', docs: 'https://js.langchain.com/docs/' }],
  ['llamaindex', { category: 'ai-ml', description: 'LlamaIndex helps connect data sources to LLM-powered applications.', role: 'core', docs: 'https://docs.llamaindex.ai/' }],
  ['@huggingface/inference', { category: 'ai-ml', description: 'Hugging Face Inference SDK calls hosted model endpoints.', role: 'core', docs: 'https://huggingface.co/docs/huggingface.js/inference/README' }],
  ['@vercel/ai', { category: 'ai-ml', description: 'Vercel AI SDK provides abstractions for streaming AI experiences.', role: 'core', docs: 'https://sdk.vercel.ai/' }],
  ['replicate', { category: 'ai-ml', description: 'Replicate provides hosted model inference and prediction APIs.', role: 'core', docs: 'https://replicate.com/docs' }],
  ['cohere-ai', { category: 'ai-ml', description: 'Cohere AI provides embeddings and LLM APIs for applications.', role: 'core', docs: 'https://docs.cohere.com/' }],

  ['typescript', { category: 'devtool', description: 'TypeScript is the typed superset of JavaScript used for application and build tooling.', role: 'devtool', docs: 'https://www.typescriptlang.org/' }],
  ['eslint', { category: 'devtool', description: 'ESLint lints JavaScript and TypeScript source code.', role: 'devtool', docs: 'https://eslint.org/' }],
  ['prettier', { category: 'devtool', description: 'Prettier formats source code with opinionated rules.', role: 'devtool', docs: 'https://prettier.io/' }],
  ['husky', { category: 'devtool', description: 'Husky manages Git hooks for local automation.', role: 'devtool', docs: 'https://typicode.github.io/husky/' }],
  ['lint-staged', { category: 'devtool', description: 'lint-staged runs linters against staged Git files.', role: 'devtool', docs: 'https://github.com/lint-staged/lint-staged' }],
  ['turbo', { category: 'devtool', description: 'Turbo is a high-performance monorepo build system.', role: 'devtool', docs: 'https://turbo.build/' }],
  ['nx', { category: 'devtool', description: 'Nx is a monorepo build platform with task orchestration.', role: 'devtool', docs: 'https://nx.dev/' }],
  ['@changesets/cli', { category: 'devtool', description: 'Changesets helps manage versioning and releases in monorepos.', role: 'devtool', docs: 'https://github.com/changesets/changesets' }],
  ['rimraf', { category: 'devtool', description: 'Rimraf recursively deletes files and directories.', role: 'devtool', docs: 'https://github.com/isaacs/rimraf' }],
  ['concurrently', { category: 'devtool', description: 'Concurrently runs multiple commands in parallel.', role: 'devtool', docs: 'https://github.com/open-cli-tools/concurrently' }],
  ['cross-env', { category: 'devtool', description: 'cross-env sets environment variables cross-platform.', role: 'devtool', docs: 'https://github.com/kentcdodds/cross-env' }],
  ['dotenv', { category: 'devtool', description: 'dotenv loads environment variables from .env files.', role: 'utility', docs: 'https://github.com/motdotla/dotenv' }],
  ['env-cmd', { category: 'devtool', description: 'env-cmd loads environment variables from config files.', role: 'devtool', docs: 'https://github.com/toddbluhm/env-cmd' }],
  ['tsx', { category: 'devtool', description: 'tsx executes TypeScript files directly with esbuild.', role: 'devtool', docs: 'https://tsx.is/' }],
  ['ts-node', { category: 'devtool', description: 'ts-node executes TypeScript files in Node.js environments.', role: 'devtool', docs: 'https://typestrong.org/ts-node/' }],
  ['nodemon', { category: 'devtool', description: 'Nodemon restarts Node processes when files change.', role: 'devtool', docs: 'https://nodemon.io/' }],
  ['@types/node', { category: 'devtool', description: 'Type definitions for Node.js APIs.', role: 'peer', docs: 'https://www.npmjs.com/package/@types/node' }],
  ['@types/express', { category: 'devtool', description: 'Type definitions for Express applications.', role: 'peer', docs: 'https://www.npmjs.com/package/@types/express' }],
  ['vite', { category: 'devtool', description: 'Vite is a fast frontend build tool and dev server.', role: 'devtool', docs: 'https://vite.dev/' }],
  ['rollup', { category: 'devtool', description: 'Rollup is a JavaScript module bundler.', role: 'devtool', docs: 'https://rollupjs.org/' }],
  ['webpack', { category: 'devtool', description: 'Webpack is a flexible module bundler for JavaScript applications.', role: 'devtool', docs: 'https://webpack.js.org/' }],
  ['esbuild', { category: 'devtool', description: 'Esbuild is a very fast bundler and JavaScript compiler.', role: 'devtool', docs: 'https://esbuild.github.io/' }],
  ['swc', { category: 'devtool', description: 'SWC is a fast TypeScript and JavaScript compiler.', role: 'devtool', docs: 'https://swc.rs/' }],
  ['babel', { category: 'devtool', description: 'Babel transforms modern JavaScript syntax for broader compatibility.', role: 'devtool', docs: 'https://babeljs.io/' }],
  ['core-js', { category: 'devtool', description: 'core-js provides modern JavaScript polyfills.', role: 'utility', docs: 'https://github.com/zloirock/core-js' }],

  ['lodash', { category: 'utility', description: 'Lodash provides utility helpers for arrays, objects, and functions.', role: 'utility', docs: 'https://lodash.com/' }],
  ['ramda', { category: 'utility', description: 'Ramda is a functional programming utility library.', role: 'utility', docs: 'https://ramdajs.com/' }],
  ['dayjs', { category: 'utility', description: 'Day.js is a lightweight date manipulation library.', role: 'utility', docs: 'https://day.js.org/' }],
  ['date-fns', { category: 'utility', description: 'date-fns provides modern date utility functions.', role: 'utility', docs: 'https://date-fns.org/' }],
  ['luxon', { category: 'utility', description: 'Luxon is a modern date-time library built on Intl APIs.', role: 'utility', docs: 'https://moment.github.io/luxon/' }],
  ['uuid', { category: 'utility', description: 'uuid generates RFC-compliant UUID identifiers.', role: 'utility', docs: 'https://github.com/uuidjs/uuid' }],
  ['nanoid', { category: 'utility', description: 'nanoid generates tiny, secure, URL-friendly IDs.', role: 'utility', docs: 'https://github.com/ai/nanoid' }],
  ['chalk', { category: 'utility', description: 'Chalk colors terminal output in Node.js CLI tools.', role: 'utility', docs: 'https://github.com/chalk/chalk' }],
  ['ora', { category: 'utility', description: 'Ora renders terminal spinners for long-running operations.', role: 'utility', docs: 'https://github.com/sindresorhus/ora' }],
  ['commander', { category: 'utility', description: 'Commander is a feature-rich CLI framework for Node.js.', role: 'utility', docs: 'https://github.com/tj/commander.js' }],
  ['inquirer', { category: 'utility', description: 'Inquirer provides interactive terminal prompts and questionnaires.', role: 'utility', docs: 'https://github.com/SBoudrias/Inquirer.js' }],
  ['yargs', { category: 'utility', description: 'Yargs helps build command-line interfaces with parsing and help output.', role: 'utility', docs: 'https://yargs.js.org/' }],
  ['glob', { category: 'utility', description: 'Glob matches filesystem paths using wildcard patterns.', role: 'utility', docs: 'https://github.com/isaacs/node-glob' }],
  ['fast-glob', { category: 'utility', description: 'fast-glob is a fast globbing library for filesystem traversal.', role: 'utility', docs: 'https://github.com/mrmlnc/fast-glob' }],
  ['chokidar', { category: 'utility', description: 'Chokidar watches files and directories for changes.', role: 'utility', docs: 'https://github.com/paulmillr/chokidar' }],
  ['fs-extra', { category: 'utility', description: 'fs-extra extends Node.js fs with convenience helpers.', role: 'utility', docs: 'https://github.com/jprichardson/node-fs-extra' }],
  ['execa', { category: 'utility', description: 'Execa runs subprocesses with a modern promise-based API.', role: 'utility', docs: 'https://github.com/sindresorhus/execa' }],
  ['zx', { category: 'utility', description: 'zx provides ergonomic scripting helpers on top of Node.js.', role: 'utility', docs: 'https://google.github.io/zx/' }],
  ['p-limit', { category: 'utility', description: 'p-limit limits concurrent promise execution.', role: 'utility', docs: 'https://github.com/sindresorhus/p-limit' }],
  ['p-queue', { category: 'utility', description: 'p-queue is a promise queue with concurrency limits.', role: 'utility', docs: 'https://github.com/sindresorhus/p-queue' }],
  ['cheerio', { category: 'utility', description: 'Cheerio provides fast server-side HTML parsing and traversal.', role: 'utility', docs: 'https://cheerio.js.org/' }],
  ['xml2js', { category: 'utility', description: 'xml2js converts XML documents into JavaScript objects.', role: 'utility', docs: 'https://github.com/Leonidas-from-XIV/node-xml2js' }],
  ['csv-parse', { category: 'utility', description: 'csv-parse reads and parses CSV data.', role: 'utility', docs: 'https://csv.js.org/parse/' }],
  ['sharp', { category: 'utility', description: 'Sharp processes and transforms images quickly in Node.js.', role: 'utility', docs: 'https://sharp.pixelplumbing.com/' }],
  ['react-dom', { category: 'utility', description: 'React DOM renders React components into the browser DOM.', role: 'peer', docs: 'https://react.dev/' }],
  ['react-router', { category: 'utility', description: 'React Router handles routing in React applications.', role: 'peer', docs: 'https://reactrouter.com/' }],
  ['react-router-dom', { category: 'utility', description: 'React Router DOM binds React Router to browser-based apps.', role: 'peer', docs: 'https://reactrouter.com/' }],
  ['@apollo/client', { category: 'utility', description: 'Apollo Client is a GraphQL client with caching, queries, and mutations.', role: 'peer', docs: 'https://www.apollographql.com/docs/react/' }],
  ['graphql', { category: 'utility', description: 'GraphQL defines a strongly typed query language and execution runtime.', role: 'peer', docs: 'https://graphql.org/' }],
  ['@aws-sdk/client-sqs', { category: 'utility', description: 'AWS SQS client handles queue operations against Amazon SQS.', role: 'core', docs: 'https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/sqs/' }],
  ['@elastic/elasticsearch', { category: 'utility', description: 'Elastic client talks to Elasticsearch clusters from Node.js.', role: 'core', docs: 'https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html' }],
  ['node-cron', { category: 'utility', description: 'node-cron schedules cron-style recurring tasks in Node.js.', role: 'utility', docs: 'https://github.com/node-cron/node-cron' }],
  ['cron', { category: 'utility', description: 'cron provides cron-style scheduling primitives for Node.js.', role: 'utility', docs: 'https://github.com/kelektiv/node-cron' }],
  ['mongodb', { category: 'utility', description: 'mongodb is the official Node.js driver for MongoDB.', role: 'core', docs: 'https://mongodb.github.io/node-mongodb-native/' }],
  ['mysql', { category: 'utility', description: 'mysql is a classic MySQL client for Node.js applications.', role: 'core', docs: 'https://github.com/mysqljs/mysql' }],
  ['sqlite3', { category: 'utility', description: 'sqlite3 is the SQLite driver for Node.js.', role: 'core', docs: 'https://github.com/TryGhost/node-sqlite3' }],
  ['socket.io-client', { category: 'utility', description: 'socket.io-client connects browsers and apps to Socket.IO servers.', role: 'core', docs: 'https://socket.io/docs/v4/client-api/' }],
  ['openapi-typescript', { category: 'utility', description: 'openapi-typescript generates TypeScript types from OpenAPI specs.', role: 'devtool', docs: 'https://openapi-ts.dev/' }],
  ['socket.io-client', { category: 'utility', description: 'socket.io-client connects browsers and apps to Socket.IO servers.', role: 'core', docs: 'https://socket.io/docs/v4/client-api/' }],
  ['@aws-sdk/client-s3', { category: 'file-storage', description: 'AWS S3 client provides object storage operations for Node.js.', role: 'core', docs: 'https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/' }],
];

export const DEPENDENCY_KNOWLEDGE: Record<string, DependencyInfo> = Object.fromEntries(entries);
