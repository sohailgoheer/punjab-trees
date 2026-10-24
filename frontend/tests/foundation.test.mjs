import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('HTML retains the React entrypoint and uses a responsive viewport', () => {
  const html = read('../index.html');
  assert.match(html, /id="root"/);
  assert.match(html, /src="\/src\/main\.tsx"/);
  assert.match(html, /viewport-fit=cover/);
});

test('phase 01 uses hash-safe React Router for static GitHub Pages', () => {
  const app = read('../src/App.tsx');
  assert.match(app, /HashRouter/);
  for (const path of ['/explore', '/add-tree', '/trees/:publicId', '/posts/:postId', '/notifications', '/profile']) {
    assert.ok(app.includes(`path="${path}"`), `Missing route ${path}`);
  }
});

test('Vite compiles relative assets and supports Codespaces port forwarding', () => {
  const vite = read('../vite.config.ts');
  assert.match(vite, /base:\s*'\.\/'/);
  assert.match(vite, /host:\s*'0\.0\.0\.0'/);
});

test('dependencies are exactly version-pinned and provide quality commands', () => {
  const pkg = JSON.parse(read('../package.json'));
  assert.equal(pkg.private, true);
  for (const version of Object.values({ ...pkg.dependencies, ...pkg.devDependencies })) {
    assert.match(version, /^\d+\.\d+\.\d+$/);
  }
  for (const script of ['build','typecheck','lint','test']) assert.ok(pkg.scripts[script]);
});

test('no backend API, token or storage persistence is called in the demo state provider', () => {
  const state = read('../src/state/DemoContext.tsx');
  assert.doesNotMatch(state, /(?:fetch\(|localStorage|sessionStorage|Bearer|axios)/);
});
