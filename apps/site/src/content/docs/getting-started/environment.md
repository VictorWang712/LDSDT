---
title: 环境与工具
description: 运行自主软件工程系统所需的统一开发与评测环境。
badge:
  text: 待完善
  variant: note
---

教学组将尽量提供一致、可复现的基础环境，使小组把精力放在软件工程模块和协作机制，而不是重复搭建底层 Agent Runtime。

## 计划提供

- AI Coding 平台账号；若平台无法程序化编排，则补充统一模型 API 与调用额度；
- Starter Kit：模型访问、文件与 Shell 工具、工作区隔离、超时、重试和事件日志；
- 课程 CLI 和任务包示例；
- 限定的参考应用技术栈与容器镜像；
- Git 仓库与持续集成模板；
- 本地公开检查器和常见问题说明。

## 学生负责

小组在 Starter Kit 之上实现 Requirement、Design、Implementation、Testing 和 Repair 能力，并自行决定 Agent 组织、IR、状态管理与反馈策略。允许替换 Starter Kit 的内部实现，但必须保持统一外部协议并承担兼容性成本。

:::caution[平台尚待确认]
Trae、WorkBuddy 或其他平台的账号规则、程序化能力、模型版本、调用额度和日志导出仍需教学组确认。正式版本矩阵发布前，请勿据此购买服务或写死平台依赖。
:::
