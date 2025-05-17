import { configDefaults, defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    include: [...configDefaults.include, '**/*.(test|spec).ts'],
    exclude: [...configDefaults.exclude],
    coverage: {
      reporter: ['lcov', 'text', 'html'],
    },
  },
});
