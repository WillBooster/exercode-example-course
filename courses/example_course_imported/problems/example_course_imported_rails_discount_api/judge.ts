import path from 'node:path';

import {
  DecisionCode,
  runCommandInTemporaryPackageManagerProject,
  type PackageManagerCommandRunResult,
} from '@exercode/problem-utils';
import { commandJudgePreset } from '@exercode/problem-utils/presets/command';

const TIME_LIMIT_SECONDS = 120;
const PROJECT_FILE_PATHS = [
  '.judge-bin/bundle',
  '.ruby-version',
  'Gemfile',
  'Gemfile.lock',
  'Rakefile',
  'bin/rails',
  'config/application.rb',
  'config/boot.rb',
  'config/environment.rb',
  'config/environments/test.rb',
  'config/routes.rb',
  'app/controllers/application_controller.rb',
  'test/test_helper.rb',
  'test/controllers/discounts_controller_test.rb',
] as const;

interface RailsTestRunResult extends PackageManagerCommandRunResult {
  railsTestStatus: number | undefined;
}

await commandJudgePreset<{ id: string }, RailsTestRunResult>(import.meta.dirname, {
  limits: {
    buildTimeoutSeconds: 10,
    maxOutputLength: 50_000,
  },
  runTimeoutSeconds: TIME_LIMIT_SECONDS,
  readTestCases: () => Promise.resolve([{ id: 'rails_integration_tests' }]),
  resolveInput: () => Promise.resolve(''),
  runCommand: async ({ cwd, env, timeLimitSeconds }) => {
    const result = await runCommandInTemporaryPackageManagerProject({
      cwd,
      projectDir: path.join(import.meta.dirname, 'judge_project'),
      projectFilePaths: PROJECT_FILE_PATHS,
      packageManager: 'ruby',
      prepareDependencies: env.BUNDLE_RO_DEP_CACHE === undefined,
      command: ['bundle', 'exec', 'ruby', 'bin/rails', 'test', 'test/controllers/discounts_controller_test.rb'],
      env: {
        ...env,
        BUNDLE_FROZEN: 'true',
        BUNDLE_PATH: env.BUNDLE_RO_DEP_CACHE ?? 'vendor/bundle',
        PATH: `.judge-bin${path.delimiter}${env.PATH ?? ''}`,
        RAILS_ENV: 'test',
      },
      timeLimitSeconds,
      tempDirPrefix: 'exercode-rails-',
    });

    return { ...result, status: 0, railsTestStatus: result.status };
  },
  test: ({ runResult }) =>
    runResult.railsTestStatus === 0
      ? undefined
      : {
          decisionCode: DecisionCode.WRONG_ANSWER,
          feedbackMarkdown: 'Railsの統合テストに失敗しました。',
        },
});
