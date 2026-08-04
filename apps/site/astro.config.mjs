import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const site = process.env.SITE_URL ?? 'http://localhost:4321';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    starlight({
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
          items: [
            { label: '课程介绍', slug: 'course/about' },
            { label: '实验总览', slug: 'course/overview' },
          ],
        },
        {
          label: '开始实验',
          items: [
            { label: '开始之前', slug: 'getting-started' },
            { label: '环境与工具', slug: 'getting-started/environment' },
            { label: '提交与验收', slug: 'getting-started/submission' },
          ],
        },
        {
          label: '实验阶段',
          items: [
            { label: '模型部署', slug: 'stages/model-deployment' },
            { label: 'AI Coding 工具', slug: 'stages/ai-coding-tool' },
            { label: '应用开发', slug: 'stages/application-development' },
          ],
        },
        {
          label: '资源',
          items: [
            { label: '资源索引', slug: 'resources' },
            { label: '实验文档模板', slug: 'resources/lab-document-template' },
          ],
        },
        {
          label: '规范与政策',
          collapsed: true,
          items: [
            { label: '课程规范', slug: 'policies' },
            { label: 'AI 使用与学术诚信', slug: 'policies/ai-and-integrity' },
          ],
        },
      ],
    }),
  ],
});
