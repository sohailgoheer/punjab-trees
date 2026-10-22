import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('index mounts React and uses a module entrypoint', () => {
  const html = read('../index.html');
  assert.match(html, /id="root"/);
  assert.match(html, /src="\/src\/main\.tsx"/);
});

test('Phase 00 contains an honest, non-functional placeholder', () => {
  const app = read('../src/App.tsx');
  assert.match(app, /Phase 00 placeholder/);
  assert.match(app, /No accounts, uploads or database are connected/);
});

test('Vite configuration uses relative build assets and Codespaces host', () => {
  const vite = read('../vite.config.ts');
  assert.match(vite, /base:\s*'\.\/'/);
  assert.match(vite, /host:\s*'0\.0\.0\.0'/);
});

test('frontend dependencies are version-pinned', () => {
  const pkg = JSON.parse(read('../package.json'));
  assert.equal(pkg.private, true);
  for (const version of Object.values({ ...pkg.dependencies, ...pkg.devDependencies })) {
    assert.match(version, /^\d+\.\d+\.\d+$/);
  }
  assert.ok(pkg.scripts.build && pkg.scripts.typecheck && pkg.scripts.test);
});
