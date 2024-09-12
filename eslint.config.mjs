import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['node_modules/**'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'commonjs',
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // Ignorar los parámetros que empiezan con un guion bajo
          varsIgnorePattern: '^_', // Ignorar variables que empiezan con un guion bajo
          args: 'after-used', // Solo dar error si el argumento anterior es usado
        },
      ], // Ignorar parámetros que no se usan si comienzan con un guion bajo
      'no-console': 'off',
      'no-redeclare': ['error', { builtinGlobals: false }],
    },
  },
  pluginJs.configs.recommended,
  prettier,
];
