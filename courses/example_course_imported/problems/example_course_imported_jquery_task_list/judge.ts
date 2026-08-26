import path from 'node:path';

import {
  DecisionCode,
  runCommandInTemporaryPackageManagerProject,
  type PackageManagerCommandRunResult,
} from '@exercode/problem-utils';
import { commandJudgePreset } from '@exercode/problem-utils/presets/command';

const TIME_LIMIT_SECONDS = 60;
const PROJECT_FILE_PATHS = ['package.json', 'bun.lock', 'vitest.config.js', 'test/taskList.test.js'] as const;

interface JQueryTestRunResult extends PackageManagerCommandRunResult {
  jqueryTestStatus: number | undefined;
}

await commandJudgePreset<{ id: string }, JQueryTestRunResult>(import.meta.dirname, {
  limits: {
    buildTimeoutSeconds: 10,
    maxOutputLength: 50_000,
  },
  runTimeoutSeconds: TIME_LIMIT_SECONDS,
  readTestCases: () => Promise.resolve([{ id: 'jquery_dom_tests' }]),
  resolveInput: () => Promise.resolve(''),
  runCommand: async ({ cwd, env, timeLimitSeconds }) => {
    const result = await runCommandInTemporaryPackageManagerProject({
      cwd,
      projectDir: path.join(import.meta.dirname, 'judge_project'),
      projectFilePaths: PROJECT_FILE_PATHS,
      packageManager: 'bun',
      command: ['bun', 'run', 'test'],
      env: { ...env, NODE_ENV: 'test' },
      timeLimitSeconds,
      tempDirPrefix: 'exercode-jquery-',
    });

    return { ...result, status: 0, jqueryTestStatus: result.status };
  },
  test: ({ runResult }) =>
    runResult.jqueryTestStatus === 0
      ? undefined
      : {
          decisionCode: DecisionCode.WRONG_ANSWER,
          feedbackMarkdown: 'jQueryのDOM操作テストに失敗しました。',
        },
});
