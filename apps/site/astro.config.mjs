import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';

const site = process.env.SITE_URL ?? 'http://localhost:4321';
const base = process.env.BASE_PATH ?? '/';
const withBase = (path) => base.replace(/\/$/, '') + '/' + path.replace(/^\/+/, '');

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  redirects: {
    '/stages/model-deployment': withBase('model-deployment'),
    '/stages/ai-coding-tool': withBase('tool-design'),
    '/stages/application-development': withBase('application-development'),
  },
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],
      title: 'LDSDT',
      logo: {
        src: './src/assets/brand/logo-square.svg',
        alt: 'LDSDT',
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
          label: '课程',
          collapsed: false,
          items: [
            { label: '课程介绍', slug: 'course/about' },
            { label: '实验总览', slug: 'course/overview' },
          ],
        },
        {
          label: '开始实验',
          collapsed: false,
          items: [
            { label: '开始之前', slug: 'getting-started' },
            { label: '环境与工具', slug: 'getting-started/environment' },
            { label: '提交与验收', slug: 'getting-started/submission' },
          ],
        },
        {
          label: '模型部署',
          collapsed: false,
          items: [
            { label: '阶段总览', slug: 'model-deployment' },
            { label: 'Week 1：模型部署', slug: 'model-deployment/week-1' },
          ],
        },
        {
          label: '工具设计',
          collapsed: false,
          items: [
            { label: '阶段总览', slug: 'tool-design' },
            { label: 'Week 2：工具设计（一）', slug: 'tool-design/week-2' },
            { label: 'Week 3：工具设计（二）', slug: 'tool-design/week-3' },
            { label: 'Week 4：工具设计（三）', slug: 'tool-design/week-4' },
          ],
        },
        {
          label: '应用开发',
          collapsed: false,
          items: [
            { label: '阶段总览', slug: 'application-development' },
            { label: 'Week 5：应用开发（一）', slug: 'application-development/week-5' },
            { label: 'Week 6：应用开发（二）', slug: 'application-development/week-6' },
            { label: 'Week 7：应用开发（三）', slug: 'application-development/week-7' },
            { label: 'Week 8：应用开发（四）', slug: 'application-development/week-8' },
          ],
        },
        {
          label: '资源',
          collapsed: false,
          items: [
            { label: '资源索引', slug: 'resources' },
            { label: '实验文档模板', slug: 'resources/lab-document-template' },
          ],
        },
        {
          label: '规范与政策',
          collapsed: false,
          items: [
            { label: '课程规范', slug: 'policies' },
            { label: 'AI 使用与学术诚信', slug: 'policies/ai-and-integrity' },
          ],
        },
      ],
    }),
  ],
});
