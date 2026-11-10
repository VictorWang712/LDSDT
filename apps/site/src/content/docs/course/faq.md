---
title: 常见问题
description: 安装、运行与调试、评测与提交、会话记录、模型与 Key、课程规则中的常见问题与处理方法。
---

本页会随各 Lab 的发布持续补充。没有找到答案时，请在课程群中提问，并附上 `uv run ldsdt doctor` 的完整输出（输出中不含 Key）。

## 安装与环境

安装和环境配置的问题集中在 [Lab 0 的常见问题](../../labs/lab-0/#常见问题)，包括：

- [设置了环境变量，但检查时仍显示「未设置」](../../labs/lab-0/#设置了环境变量但检查时仍显示未设置)
- [提示找不到 `icode-zju` 命令](../../labs/lab-0/#提示找不到-icode-zju-命令)
- [`doctor` 中「Qwen 接口」未通过](../../labs/lab-0/#doctor-中qwen-接口未通过)
- [`ldsdt setup` 提示已有另一份名为 `ldsdt-qwen` 的模型配置](../../labs/lab-0/#ldsdt-setup-提示已有另一份名为-ldsdt-qwen-的模型配置)
- [推送时提示输入密码或认证失败](../../labs/lab-0/#推送时提示输入密码或认证失败)
- [下载很慢或失败](../../labs/lab-0/#下载很慢或失败)

## 运行与调试

### 怎样查看智能体每一步做了什么

在仓库根目录启动 `icode-zju`，按 **F1** 打开会话列表，找到对应的工作流会话（`ldsdt try` 和 `ldsdt grade` 的每次运行都是一个会话），就能逐个节点查看输入、输出和智能体的完整对话。

也可以直接看文件：每次运行的 `run.json` 里有 `session_id` 和 `run_id`，节点的对话保存在 iCode 配置目录下（macOS 为 `~/.chrys`，Windows 为 `%APPDATA%\chrys`）的 `sessions/<会话目录>/workflows/<run_id>/nodes/` 中。会话目录名是 `session_id` 去掉连字符后的前 12 位。

### 运行很慢，一个智能体节点要好几分钟

这是正常的。Qwen3.8-27B 生成一次较长的回复常常要 2–5 分钟，一个节点里可能有多轮调用。调试时：

- 先用 `tasks/practice/` 下的小需求和 `ldsdt try`；
- 用 `grade labN --task <需求 id>` 只跑一份计分需求；
- 让每个智能体的任务尽量具体，避免它反复读整个仓库、反复重写大文件。

### 运行超时了，分数怎么算

超时不会直接判 0。评测工具会照常检查运行目录中已经生成的产物，`run.json` 中的 `outcome` 记为超时。所以，让系统尽早把能确定的产物写到磁盘上，是值得的。各 Lab 的时长上限见[评测与提交](../grading/#时长上限)。

### `doctor` 中「工作流 ldsdt」未通过

说明 iCode 无法加载你的工作流。运行下面的命令查看具体错误：

```bash
icode-zju workflow validate .chrys/workflows/ldsdt/ldsdt.py
```

常见原因：Python 语法错误；模块末尾缺少 `workflow = wf.build()`；删掉了文件开头的脚本元数据；连线成环（要重复执行请用 `wf.loop`）；节点名重复。

### 智能体节点拿不到前面 Python 节点里的数据

智能体节点只接收上一个节点的**文字**（`text`），`data` 不会进入它的提示，也不会传到它后面的节点。需要把运行目录这类信息带过智能体节点时，用 `wf.join` 把智能体之前的 Python 节点和智能体本身汇合，见模版仓库 `docs/icode-workflow-cheatsheet.md` 的「在节点之间传递数据」。

### 工作流报错 `combine did not finish in time`

`wf.join` 的 `combine` 函数每次最多运行 30 秒。它只适合做「把几个节点的结果合并起来」这样很快的事；安装仓库、运行场景这类耗时的检查，请放到 `join` 之后的 Python 节点里，Python 节点可以用 `timeout` 设置更长的时限。

### 改了 `agents/` 下的配置，运行时没有生效

iCode 不读取仓库里的智能体配置，要运行 `uv run ldsdt sync` 把它们复制到 iCode 的配置目录。`ldsdt try` 和 `ldsdt grade` 运行前会自动同步一次；只有直接用 `icode-zju` 命令运行时，才需要手动同步。

### 智能体的命令被拦下：`command blocked — ... not in whitelist`

这是智能体配置中的 Shell 白名单在起作用。Windows 上 iCode 用 PowerShell 运行命令，`cd`、`$env:...`、`Remove-Item`、带完整路径的程序等写法都可能被拦下。处理方法见模版仓库 `agents/README.md` 中的「Shell 白名单在 macOS 与 Windows 上的差别」。

### Windows 上手动运行工作流，提示输入不是合法的 JSON

PowerShell 会改掉引号里的内容。不要直接用 `icode-zju workflow run ... --input '{...}'`，请改用：

```bash
uv run ldsdt try <需求文档> --lab N
```

它会替你拼好输入，产物在 `runs/try/<需求 id>/` 下。

### 模型服务报错或被限流（HTTP 429、连接超时）

网关对每个 Key 有调用频率和额度限制，连续运行多次时可能被限流。稍等片刻再试。如果是模型服务故障导致没能按时提交，保留 `.ldsdt/grade-history.jsonl` 和 `run.json` 中的报错，联系助教申请免责。

## 评测与提交

### 本地分数和官方复评的分数会不一样吗

一样。官方复评用课程组自己的一份评测工具，对你提交的同一批产物重新打分，结果是确定的。唯一的例外是 Lab 4 的「场景有效率」和「变异体击杀率」：本地显示「待复评」，只在官方复评中计算。

### `submit` 提示门槛未通过

门槛要求：工作流能加载，并且在本 Lab 的每一份计分需求上都运行过。先运行 `uv run ldsdt grade labN -v` 看哪一项没有满足。只用 `--task` 跑了一部分需求时，门槛也不会通过。

### `submit` 提示发现了密钥

`submit` 会检查待提交的文件中有没有 API Key，发现时拒绝提交并列出文件。删掉这些文件里的 Key（Key 只能放在环境变量中）后重新运行 `submit`。如果 Key 已经推送到 GitHub，请立即联系助教更换 Key。

### 提交以后又改进了系统，可以重新提交吗

可以。截止前重新运行 `grade` 和 `submit` 即可，`labN-submit` 标签会移到新的提交上。以截止时刻最后一次推送的标签为准。

### `git pull upstream main` 出现合并冲突

通常是因为你改过 `ldsdt_kit/` 或 `tasks/` 下的文件。这些目录只应由课程更新：冲突的文件请保留课程的版本。如果冲突出现在你自己的文件里（例如 `README.md`），按普通的 Git 冲突处理。

### 截止后还能提交吗

可以迟交，每迟交 24 小时，该 Lab 的评测分乘以 0.9，最多迟交 3 天，见[评测与提交](../grading/#迟交)。

## 会话记录

### `collect` 没有找到 AiWork 的会话

AiWork 只有在「编码」页的「项目」中打开了本仓库时，才会把会话的工作目录记为本仓库。请按 [Lab 0 第 6 步](../../labs/lab-0/#6-配置你的辅助开发工具)添加项目，之后都在这个项目下新建任务。在默认目录下进行的会话，`collect` 会列出来，请你确认是否与课程有关。

### 个人编号输错了

第一次运行 `collect` 时输入的编号保存在本机的 `.ldsdt/local.json` 中（不会提交到仓库）。用正确的编号重新运行一次即可覆盖：

```bash
uv run ldsdt collect --week N --pseudonym <正确的编号>
```

然后把新生成的压缩包上传到学在浙大。

### 压缩包越来越大

每次打包的都是到当时为止的全部会话，所以后几次会比前几次大，这是正常的。如果大到无法上传，请联系助教。

## 模型与 Key

### 不小心用 `ldsdt-qwen` 和辅助工具聊了天

检查 iCode 底部状态栏显示的模型：如果是 `ldsdt-qwen`，按 [Lab 0 第 6 步](../../labs/lab-0/#6-配置你的辅助开发工具)把当前模型切换为「ZJU Gateway」。之前的情况如实告诉本组的 C，记在记录里即可，如实报告的违规不扣分。

### Key 泄露了，或者额度用完了

立即联系助教。泄露的 Key 会被作废并换发新的 Key；额度问题由助教统一处理。

## 课程规则

### 可以用其他 AI 工具查资料吗

可以使用普通网页、官方文档和搜索引擎；不能使用网页版大模型、其他 AI 编程工具或 IDE 自带的 AI 补全。完整规则见[课程信息](../information/#ai-工具使用规则)。

### A 和 B 之间可以交流什么

可以讨论设计思路，例如「规约用 JSON 还是 Markdown」「失败后重做几轮」；不能共享代码、提示词和智能体配置文件，也不能把屏幕上的代码给对方照着写。本 Lab 的设计选择由 A、B 商定后写入各自的 `design-choices.yaml`，两份必须一致。
