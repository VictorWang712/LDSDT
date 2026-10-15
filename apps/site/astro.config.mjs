import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';

const site = process.env.SITE_URL ?? 'http://localhost:4321';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],
      title: '大语言模型驱动的软件开发与测试',
      logo: {
        src: './src/assets/brand/course-logo.svg',
        alt: 'CS3297M 课程 Logo',
      },
      description: '大语言模型驱动的软件开发与测试实验课程',
      disable404Route: true,
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/VictorWang712/LDSDT',
        },
      ],
      editLink: {
        baseUrl:
          'https://github.com/VictorWang712/LDSDT/edit/main/apps/site/src/content/docs/',
      },
      lastUpdated: true,
      customCss: ['./src/styles/docs.css'],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            type: 'image/svg+xml',
            href: `${base}favicon.svg`,
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#0a0d12',
          },
        },
      ],
      sidebar: [
        { label: '课程首页', link: '/' },
        {
          label: '实验',
          collapsed: false,
          items: [{ label: 'Week 1：运行时与基线', slug: 'labs/week-1' }],
        },
      ],
    }),
  ],
});
