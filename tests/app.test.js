const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

test('package.json is valid', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  expect(pkg.name).toBeDefined();
  expect(pkg.dependencies.expo).toBeDefined();
});

test('Dockerfile exists', () => {
  expect(fs.existsSync(path.join(root, 'Dockerfile'))).toBe(true);
});

test('docker-compose.yml exists', () => {
  expect(fs.existsSync(path.join(root, 'docker-compose.yml'))).toBe(true);
});
