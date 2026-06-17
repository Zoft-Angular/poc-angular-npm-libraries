# Angular Pipe Library Guide

This guide shows how to create, build, test, and run a reusable Angular pipe library in this workspace.

## 1. Create an Empty Workspace

ng new sample-workspace --create-application=false
cd sample-workspace

## 2. Generate the Library

ng generate library directives

Library paths:
- `projects/directives`
- `dist/directives` (build output)

## 3. Generate the Demo Application

ng generate application demo-application

Demo app path:
- `projects/demo-application`

## 4. Generate a Pipe in the Library

Command pattern:

ng generate pipe <pipe-name> --project=directives

Example:

ng generate pipe text-case --project=directives

## 5. Export Pipes from Public API

File:
- `projects/directives/src/public-api.ts`

Example:

export * from './lib/text-case-pipe';

Only exports in this file are available to apps that consume the library.

## 6. Build the Library

ng build directives

Watch mode (recommended during development):

ng build directives --watch

## 7. Run the Demo Application

In a second terminal:

ng serve demo-application

Open `http://localhost:4200`.

## 8. Current Library in This Workspace

Current reusable pipe:
- `TextCasePipe`

Source file:
- `projects/directives/src/lib/text-case-pipe.ts`

Supported modes:
- `title`
- `upper`
- `lower`
- `sentence`
- `camel`
- `kebab`

Template examples:

<p>{{ 'hello angular reusable pipes' | textCase:'title' }}</p>
<p>{{ 'hello angular reusable pipes' | textCase:'upper' }}</p>
<p>{{ 'hello angular reusable pipes' | textCase:'camel' }}</p>

## 9. Use the Library in the Demo App

File:
- `projects/demo-application/src/app/app.ts`

Package-style import after build:

import { TextCasePipe } from 'directives';

## 10. Add More Reusable Pipes

For each new pipe:
1. Generate it with `ng generate pipe <name> --project=directives`.
2. Implement logic in `projects/directives/src/lib/`.
3. Export it from `projects/directives/src/public-api.ts`.
4. Build with `ng build directives`.
5. Use it in templates.

## 11. Optional npm Publish Steps

Update package metadata in:
- `projects/directives/package.json`

Then run:

ng build directives
cd dist/directives
npm login
npm publish --access public
