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
          label: '课程',
          collapsed: false,
          items: [
            { label: '课程介绍', slug: 'course/about' },
            { label: '实验总览', slug: 'course/overview' },
            { label: '成绩评定', slug: 'course/assessment' },
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
          label: '八周实验',
          collapsed: false,
          items: [
            { label: '实验路线', slug: 'labs' },
            { label: 'Week 1：运行时与基线', slug: 'labs/week-1' },
            { label: 'Week 2：需求理解', slug: 'labs/week-2' },
            { label: 'Week 3：架构与接口', slug: 'labs/week-3' },
            { label: 'Week 4：软件实现', slug: 'labs/week-4' },
            { label: 'Week 5：测试设计', slug: 'labs/week-5' },
            { label: 'Week 6：调试修复', slug: 'labs/week-6' },
            { label: 'Week 7：公开任务', slug: 'labs/week-7' },
            { label: 'Week 8：私有评测', slug: 'labs/week-8' },
          ],
        },
        {
          label: '资源',
          collapsed: false,
          items: [
            { label: '资源索引', slug: 'resources' },
            { label: '核心概念', slug: 'resources/concepts' },
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
