# Angular Pipe Library Guide

A reusable Angular pipe library with 7 built-in pipes, all in one file.

---

## Quick Start Commands

    ng new sample-workspace --create-application=false
    cd sample-workspace
    ng generate library directives
    ng generate application demo-application
    ng build directives
    ng serve demo-application

---

## Workspace Structure

    sample-workspace/
    ├── projects/
    │   ├── directives/          ← library
    │   │   └── src/
    │   │       ├── lib/
    │   │       │   └── text-case-pipe.ts   ← all pipes here
    │   │       └── public-api.ts           ← exports
    │   └── demo-application/    ← test app
    └── dist/directives/         ← build output

---

## Setup Steps

### 1. Create Empty Workspace

    ng new sample-workspace --create-application=false
    cd sample-workspace

### 2. Generate Library

    ng generate library directives

### 3. Generate Demo App

    ng generate application demo-application

### 4. Generate a Pipe

    ng generate pipe <pipe-name> --project=directives

### 5. Export from Public API

File: `projects/directives/src/public-api.ts`

    export * from './lib/text-case-pipe';

### 6. Build Library

    ng build directives

    # Watch mode during development
    ng build directives --watch

### 7. Run Demo App

    ng serve demo-application

Open: http://localhost:4200

---

## Available Pipes

All pipes are in `projects/directives/src/lib/text-case-pipe.ts`.

---

### textCase

Converts text to 11 case formats.

| Mode       | Output                          |
|------------|---------------------------------|
| title      | Hello Angular Reusable Pipes    |
| upper      | HELLO ANGULAR REUSABLE PIPES    |
| lower      | hello angular reusable pipes    |
| sentence   | Hello angular reusable pipes    |
| camel      | helloAngularReusablePipes       |
| pascal     | HelloAngularReusablePipes       |
| kebab      | hello-angular-reusable-pipes    |
| snake      | hello_angular_reusable_pipes    |
| constant   | HELLO_ANGULAR_REUSABLE_PIPES    |
| dot        | hello.angular.reusable.pipes    |
| path       | hello/angular/reusable/pipes    |

Usage: `{{ value | textCase:'camel' }}`

---

### dateFormat

Formats a date using Angular's `formatDate`. Default: `mediumDate`.

    {{ '2026-06-17T10:30:00Z' | dateFormat:'fullDate' }}   → Tuesday, June 17, 2026
    {{ '2026-06-17T10:30:00Z' | dateFormat:'yyyy-MM-dd' }} → 2026-06-17

---

### timeFormat

Formats a time using Angular's `formatDate`. Default: `shortTime`.

    {{ '2026-06-17T10:30:00Z' | timeFormat:'shortTime' }}  → 10:30 AM
    {{ '2026-06-17T10:30:00Z' | timeFormat:'HH:mm' }}      → 10:30

---

### relativeTime

Returns human-readable time relative to now.

    {{ '2026-06-16T10:30:00Z' | relativeTime }}            → 1 day ago
    {{ '2026-06-17T11:00:00Z' | relativeTime }}            → in 30 minutes

---

### jsonPretty

Pretty prints a JSON value. Default indent: `2`.

    {{ { name: 'pipes', active: true } | jsonPretty:2 }}

    Output:
    {
      "name": "pipes",
      "active": true
    }

---

### truncate

Shortens text to a character limit. Default limit: `50`, suffix: `...`.

    {{ 'This is a very long text string' | truncate:20 }}   → This is a very long...

---

### defaultValue

Returns a fallback when value is null, undefined, or empty.

    {{ '' | defaultValue:'No value provided' }}             → No value provided
    {{ null | defaultValue:'Unknown' }}                     → Unknown

---

## Using in Your App

Import all pipes at once:

    import { ALL_PIPES } from 'directives';

    @Component({
      imports: [...ALL_PIPES],
    })

Or import individually:

    import { TextCasePipe, TruncatePipe } from 'directives';

---

## npm Publish

Update `projects/directives/package.json`, then:

    ng build directives
    cd dist/directives
    npm login
    npm publish --access public

