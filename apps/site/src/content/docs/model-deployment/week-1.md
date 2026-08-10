---
title: Week 1：国产大模型部署
description: 从登录平台到获得部署凭证的完整操作手册。
badge:
  text: 设计预览
  variant: caution
---

:::caution[当前为教学设计预览]
服务器相关命令尚未确定。`{{PLACEHOLDER}}` 会在实验开放前替换，当前版本用于审阅实验流程，不能直接上机执行。
:::

开始前先阅读[模型部署阶段总览](../)，了解交付物、自由度和通过标准。本页只说明应该按什么顺序完成实验。

> 教学说明使用中文；仓库 README、代码、配置说明、工程决策和 Git 提交信息全部使用英文。English version: planned.

## 0. 最终应得到什么

你们的公开仓库应包含：

```text
model-service/
├── deployment.yaml
├── service.sh
├── src/
├── config/
├── tests/
├── docs/
│   └── decisions.md
├── dependency-manifest
├── README.md
└── .gitignore
```

正式评测必须能从一个已推送的 Git commit 执行：

```bash
cd model-service
./service.sh prepare
./service.sh start
./service.sh status
./service.sh stop
```

并通过以下接口调用真实本地模型：

```text
GET  /healthz
GET  /course/v1/info
POST /v1/chat/completions
```

## 1. 接受小组资源

### 1.1 完成组队

1. 在 `{{TEAM_REGISTRATION_URL}}` 登记三人小组。
2. 每名成员使用自己的 Git 账号接受仓库邀请。
3. 不共享 Git 账号、SSH 私钥或访问令牌。
4. 后续提交使用各自身份，以 Git 历史记录个人贡献。

### 1.2 核对资源

确认你们已经收到：

| 资源                 | 课程发布值                     |
| -------------------- | ------------------------------ |
| Team ID              | `{{TEAM_ID}}`                  |
| Public repository    | `{{TEAM_REPOSITORY_URL}}`      |
| Allocation ID        | `{{ALLOCATION_ID}}`            |
| Platform access      | `{{PLATFORM_ACCESS_URL}}`      |
| Model registry       | `{{MODEL_REGISTRY_URL}}`       |
| Compatibility matrix | `{{COMPATIBILITY_MATRIX_URL}}` |
| Submission portal    | `{{SUBMISSION_URL}}`           |

缺少任一项时，在钉钉群报告。不要尝试访问其他小组环境。

## 2. 登录并检查服务器

### 2.1 登录

先阅读 `{{PLATFORM_LOGIN_GUIDE_URL}}`，然后执行：

```bash
{{PLATFORM_LOGIN_COMMAND}}
```

首次登录后确认当前账号、小组工作目录和资源分配 ID 正确。

### 2.2 运行诊断

```bash
{{PLATFORM_DIAGNOSTIC_COMMAND}}
```

将输出与 `{{EXPECTED_DIAGNOSTIC_OUTPUT_URL}}` 对照，检查：

- 操作系统和 CPU 架构；
- 国产算力设备型号和可见数量；
- 驱动、加速运行时和 Python；
- 容器运行时（如使用）；
- 可用磁盘空间；
- 模型目录是否可读；
- 分配端口和网络策略。

驱动不可用、设备数量不符、模型目录缺失或分配错误时，保存完整输出并联系助教。不要修改宿主驱动或系统服务。

## 3. 初始化仓库

克隆教学方创建的公开仓库：

```bash
git clone {{TEAM_REPOSITORY_URL}}
cd {{TEAM_REPOSITORY_NAME}}
```

使用 Starter Kit 创建 `model-service/`：

```bash
{{STARTER_KIT_INIT_COMMAND}}
```

检查生成的文件：

```bash
find model-service -maxdepth 3 -type f | sort
```

提交初始版本：

```bash
git add model-service
git commit -m "chore: initialize model service deployment"
git push
```

不得提交模型权重、Token、密码、私钥或其他秘密。Starter Kit 提供目录、配置和适配器骨架；你们需要完成其中标记的 TODO。

## 4. 选择模型和推理后端

打开 `{{COMPATIBILITY_MATRIX_URL}}`。选择一行已经验证的组合，记录：

```text
model registry ID
model revision
inference backend and version
precision or quantization
context length
accelerator count
```

首次使用该平台时，选择基础路线：

| 项目       | 基础路线                                                |
| ---------- | ------------------------------------------------------- |
| 模型及版本 | `{{BASELINE_MODEL_ID}}` / `{{BASELINE_MODEL_REVISION}}` |
| 后端及版本 | `{{BASELINE_BACKEND}}` / `{{BASELINE_BACKEND_VERSION}}` |
| 精度与量化 | `{{BASELINE_PRECISION}}` / `{{BASELINE_QUANTIZATION}}`  |
| 上下文长度 | `{{BASELINE_CONTEXT_LENGTH}}`                           |
| 设备数量   | `{{BASELINE_ACCELERATOR_COUNT}}`                        |

如果选择其他兼容组合，在失败时必须能够退回基础路线。

编辑 `model-service/docs/decisions.md`，用英文说明选择、兼容性理由、资源权衡、已知限制和回退方案。

## 5. 编写 `deployment.yaml`

打开 `model-service/deployment.yaml`，按以下格式填写：

```yaml
schema_version: ldsdt.deployment/v1
submission:
  stage: model-deployment
  team_id: team-07
model:
  registry_id: course-model-7b
  precision: bf16
  quantization: none
runtime:
  backend: course-runtime
  version: 1.0.0
  mode: native
service:
  host: 0.0.0.0
  port_env: LDSDT_SERVICE_PORT
  health_path: /healthz
  info_path: /course/v1/info
  chat_path: /v1/chat/completions
capabilities:
  streaming: true
  max_context_length: 4096
resources:
  accelerator_count: 1
artifacts:
  log_path: var/log/model-service.log
```

你需要修改示例中的 team、model、runtime、capabilities 和 resources，使它们与第 4 步的实际选择一致。不得修改固定接口路径、`port_env` 或 Schema 版本。

注意：

- `registry_id` 使用课程模型注册表 ID，不填写下载地址；
- 所有文件路径使用仓库内相对路径；
- 不写入 Token、密码或私密平台地址；
- 服务端口必须读取 `LDSDT_SERVICE_PORT`；
- 声明的模型和能力必须与实际服务一致。

运行校验：

```bash
{{MANIFEST_VALIDATE_COMMAND}} model-service/deployment.yaml
```

只有出现 `{{MANIFEST_VALID_OUTPUT}}` 才继续下一步。

## 6. 编写 `service.sh`

你需要补全 `model-service/service.sh`，使它接受一个动作参数：

```bash
./service.sh prepare
./service.sh start
./service.sh status
./service.sh stop
```

### 6.1 `prepare`

编写代码完成：

1. 检查模型目录和设备是否存在；
2. 创建或更新 Python/容器环境；
3. 安装 `dependency-manifest` 中的依赖；
4. 生成不含秘密的运行配置；
5. 失败时输出英文错误并返回非零状态。

它必须可以连续执行两次，不修改驱动、不下载模型权重、不启动长期服务。

### 6.2 `start`

编写代码完成：

1. 读取评测器注入的变量；
2. 启动推理后端；
3. 启动必要的 API 适配层；
4. 把 PID 或等价运行状态写入课程允许的位置；
5. 把日志写入注入的日志目录；
6. 检测并拒绝重复启动。

已冻结变量：

| 变量                        | 用途                        |
| --------------------------- | --------------------------- |
| `LDSDT_SERVICE_PORT`        | 服务监听端口                |
| `LDSDT_API_KEY`             | 本次运行的临时 Bearer Token |
| `{{MODEL_ROOT_ENV}}`        | 预置模型根目录              |
| `{{MODEL_REGISTRY_ID_ENV}}` | 模型注册表 ID               |
| `{{EVALUATION_RUN_ID_ENV}}` | 评测运行 ID                 |
| `{{LOG_DIRECTORY_ENV}}`     | 日志目录                    |

Token 不得出现在命令行参数、日志或仓库中。

### 6.3 `status`

编写代码检查真实进程、监听端口和 `/healthz`。服务就绪时返回 0；未启动、启动中或异常时返回非零值，并输出英文诊断。不能只检查 PID 文件。

### 6.4 `stop`

编写代码停止 API 适配层、推理后端及子进程，释放端口和设备，清理运行状态。服务未启动或已经停止时再次执行也必须安全完成。

### 6.5 手工测试

依次执行，不要跳步：

```bash
cd model-service
chmod +x service.sh
./service.sh prepare
./service.sh prepare
./service.sh start
./service.sh status
./service.sh stop
./service.sh stop
./service.sh start
./service.sh status
./service.sh stop
```

任一命令返回异常时，先修复再继续。

## 7. 编写模型服务 API

完整格式以 `{{MODEL_SERVICE_OPENAPI_URL}}` 为准。你可以修改 Starter Kit 的适配器，也可以自己实现，但必须提供以下行为。

### 7.1 `GET /healthz`

该接口不鉴权。模型可以推理时返回：

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"status":"ready"}
```

进程存在但模型未就绪时返回 `503` 和 `{"status":"starting"}`。不要在模型尚未加载时返回 `ready`。

### 7.2 `GET /course/v1/info`

验证 `Authorization: Bearer ${LDSDT_API_KEY}`，返回实际模型 ID、精度、量化、后端版本、流式能力和最大上下文长度。响应内容必须与 `deployment.yaml` 一致。

### 7.3 `POST /v1/chat/completions`

接受：

- `system`、`user`、`assistant` 消息；
- `temperature`；
- `max_tokens`；
- `stream`。

请求必须携带 Bearer Token 和 `X-LDSDT-Request-ID`。响应头原样回显 Request ID。

当 `stream: false` 时，返回课程规定的 OpenAI Chat Completions JSON 子集。只返回一段文本不符合格式。

当 `stream: true` 时：

1. Content-Type 为 `text/event-stream`；
2. 每个事件使用 `data: {JSON}` 和空行分隔；
3. 最后一个 JSON chunk 给出 `finish_reason`；
4. 最后发送 `data: [DONE]`；
5. 客户端断开后释放本次生成资源。

### 7.4 错误响应

缺少 Token 返回 `401`。非法 JSON、空消息、模型不匹配、上下文过长、并发受限和服务未就绪使用 OpenAPI 指定状态码，并返回：

```json
{
  "error": {
    "type": "authentication_error",
    "message": "Invalid or missing API key",
    "code": "invalid_api_key"
  }
}
```

## 8. 运行公开测试

先启动服务：

```bash
cd model-service
./service.sh prepare
./service.sh start
./service.sh status
```

再运行完整公开测试：

```bash
{{PUBLIC_TEST_COMMAND}} \
  --manifest model-service/deployment.yaml \
  --lifecycle model-service/service.sh
```

只重跑某一类：

```bash
{{PUBLIC_TEST_COMMAND}} --category api
```

每次只处理第一个失败：根据测试 ID 和错误码修复，重跑该类别，最后再跑完整测试。公开测试可以不限次数执行。

测试结束后停止服务：

```bash
./service.sh stop
{{PLATFORM_RESOURCE_CHECK_COMMAND}}
```

确认端口、进程和设备已经释放。

## 9. 补全文档并提交 commit

用英文补全 `README.md`：purpose、layout、selected model and backend、setup、lifecycle、public tests、logging、troubleshooting、limitations。

用英文补全 `docs/decisions.md`：选择、兼容性理由、资源权衡、回退方案、额外测试或工程改进。

每名成员完成自己的提交：

```bash
git status
git add model-service
git commit -m "feat: describe this change in English"
git push
```

全组确认：

```bash
git status
git log --oneline --decorate -n 15
git rev-parse HEAD
```

`git status` 必须干净，候选 commit 必须已推送。正式评测不会读取本地未提交文件。

## 10. 提交正式评测

```bash
{{SUBMISSION_COMMAND}} \
  --team {{TEAM_ID}} \
  --repository {{TEAM_REPOSITORY_URL}} \
  --commit {{COMMIT_SHA}} \
  --allocation {{ALLOCATION_ID}} \
  --manifest model-service/deployment.yaml
```

记录返回的 `evaluation_run_id`，并查询状态：

```text
SUBMITTED → QUEUED → PREPARING → STARTING → TESTING
→ PASSED | FAILED | INFRA_ERROR
```

每天可提交 `{{FORMAL_EVALUATIONS_PER_DAY}}` 次，冷却时间为 `{{EVALUATION_COOLDOWN}}`。相同 commit 不重复评测；`INFRA_ERROR` 不消耗次数。

### 评测失败时

1. 保存 run ID；
2. 找到第一个 `failed` 测试和错误码；
3. 在分配环境复现；
4. 修复并重跑相关公开测试；
5. 重跑完整公开测试；
6. 创建并推送新 commit；
7. 使用新 commit 重新提交。

### 基础设施错误时

保存 run ID 并查看钉钉公告。系统会自动重试或由助教重新安排，不要为了平台故障修改部署代码。

## 11. 下载部署凭证

状态为 `PASSED` 后执行：

```bash
{{DOWNLOAD_CREDENTIAL_COMMAND}} --run {{EVALUATION_RUN_ID}}
```

确认凭证包含 team、commit、`deployment_id`、模型注册表 ID、评测运行、平台证明和课程签名，然后保存到：

```text
{{CREDENTIAL_STORAGE_PATH}}
```

不要把临时 API Key 写入凭证或仓库。Week 2 开始前，你们必须已经获得有效 `deployment_id`。

## 12. 常见故障

### `prepare` 第二次失败

检查是否重复创建环境、重复追加配置或把“已存在”当作错误。创建动作应先检查目标状态或使用幂等命令。

### 进程存在但 `/healthz` 不就绪

检查模型加载日志、模型路径、设备可见性、内存、端口和适配层连接。

### 返回 `401`

除 `/healthz` 外都应携带 `Authorization: Bearer ${LDSDT_API_KEY}`。服务读取注入值，不得硬编码。

### 非流式内容正确但 Schema 失败

检查 `object`、`created`、`model`、`choices`、`message` 和 `finish_reason`。只返回生成文本不符合协议。

<span id="stream-missing-done"></span>

### 流式响应缺少 `[DONE]`

最后一个 JSON chunk 后还要发送：

```text
data: [DONE]

```

随后关闭响应。不要把 `[DONE]` 包装成 JSON。

### `stop` 后资源仍被占用

检查是否遗漏推理后端、适配层或子进程，以及过期 PID、socket、共享内存和缓存锁。

无法解决时，在钉钉群搜索后携带 team ID、commit、run ID、测试 ID、脱敏日志和已尝试步骤联系助教。公共问题会更新到网站并在群内通知。

## 13. 最终检查

- [ ] 三名成员均留下可识别 Git 贡献；
- [ ] `deployment.yaml` 通过 Schema 校验；
- [ ] `service.sh` 支持幂等准备、启动、状态、停止和重启；
- [ ] README、代码信息、决策记录和提交信息使用英文；
- [ ] 仓库不含模型权重或秘密；
- [ ] 三个端点、非流式、SSE、鉴权和错误响应符合 OpenAPI；
- [ ] 服务实际调用课程允许的本地国产模型；
- [ ] 候选 commit 已推送并通过全部公开测试；
- [ ] 正式评测状态为 `PASSED`；
- [ ] 部署凭证已保存，且包含有效 `deployment_id`。

## 教学组发布前待办

本节仅用于当前设计评审，正式开放前删除。教学组需要替换全部占位符，补齐平台、登录、运行时、模型与兼容矩阵、网络、Starter Kit、公开测试、正式评测、阈值、平台证明、凭证恢复和准确截止时间，并完成基础路线回归、无口头帮助盲测和课堂演示彩排。
