---
title: 核心概念
description: 课程中 IR、DSL、Spec、契约、Oracle 与执行轨迹的共同含义。
---

## IR：中间表示

Intermediate Representation 将自然语言或上游产物转换为结构稳定、可被下游程序消费的表示。课程要求需求模块产生机器可读 Requirement IR，但不限定 JSON、YAML、自定义 DSL 或其他具体形式。

## DSL：领域特定语言

Domain-Specific Language 用受限语法表达某个领域的概念和关系。它可以用于描述需求场景、接口、工作流或测试，但只有在后续模块真实解析和使用时才有工程价值。

## Spec：规约

Specification 描述系统必须满足的行为与约束。好的 Spec 应当足够明确、可追踪并可验证，而不是对需求原文的简单摘要。

## Contract：契约

接口契约规定模块、服务或 Agent 之间可观察的输入、输出和错误行为。OpenAPI、JSON Schema、类型定义和命令行协议都可以成为契约。

## Test Oracle：测试判定

Oracle 决定一次执行是否正确。LLM 可以生成测试输入，但如果判定条件复制了实现中的错误理解，测试全部通过仍不代表满足需求。

## Trace：执行轨迹

执行轨迹记录 Agent 决策、工具调用、产物变化、测试结果、修复与终止原因。它服务于复现、诊断和评价，不等同于保存冗长且可能含秘密的完整思维过程。
