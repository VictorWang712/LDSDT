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
            { label: '课程信息', slug: 'course/information' },
            { label: '评测与提交', slug: 'course/grading' },
            { label: 'C 角色指南', slug: 'course/role-c' },
            { label: '常见问题', slug: 'course/faq' },
          ],
        },
        {
          label: '实验',
          collapsed: false,
          items: [
            { label: 'Lab 0 - 环境配置与工具上手', slug: 'labs/lab-0' },
            { label: 'Lab 1 - 需求分析与规约（A1）', slug: 'labs/lab-1' },
            { label: 'Lab 2 - 架构与接口设计（A2）', slug: 'labs/lab-2' },
            { label: 'Lab 3 - 实现与集成（A3）', slug: 'labs/lab-3' },
            { label: 'Lab 4 - 测试与修复迭代（A4）', slug: 'labs/lab-4' },
            { label: '期末项目', slug: 'labs/final' },
          ],
        },
      ],
    }),
  ],
});
