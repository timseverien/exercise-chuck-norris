import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	base: '/exercise-chuck-norris',
	build: {
		outDir: 'docs',
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts'],
	},
});
