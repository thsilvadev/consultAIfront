import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Deve ser EXATAMENTE o nome do repositório no GitHub

});
