# Portfolio — Victor Carbelotti

React 19 + TypeScript + Vite + Tailwind CSS v4 + react-i18next (PT/EN).

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # typecheck + build de produção em dist/
```

## Estrutura

```
src/
  components/
    layout/    Dock (navegação/ajustes) e CommandPalette (Ctrl/⌘ K)
    sections/  Hero, About, Skills, Projects, Contact
    fx/        Modo FX: cursor, parallax/tilt/magnético e cortina de abertura
    ui/        Primitivos: Reveal, Pill, Popover, SectionHeader...
  context/     SettingsContext (tema, cor, idioma, FX — persistido em localStorage)
  data/        Projetos, skills, redes sociais, seções
  hooks/       useActiveSection, useScrollProgress, useMediaQuery...
  i18n/        Configuração e locales/pt.json, locales/en.json
  assets/      Imagens em WebP (importadas e com hash no build)
```

Temas e cores são tokens CSS (`--bg`, `--acc`...) em `src/index.css`, controlados por
`data-theme` / `data-color` no `<html>`. Para adicionar um projeto: `src/data/projects.ts`
+ texto em `projects.items.<id>` nos dois arquivos de locale.
