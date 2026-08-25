import path from 'node:path';

import {
  copyWithoutFollowingSymlinks,
  createDirectoryWithoutFollowingSymlinks,
  DecisionCode,
  runCommandInTemporaryPackageManagerProject,
  type PackageManagerCommandRunResult,
} from '@exercode/problem-utils';
import { commandJudgePreset } from '@exercode/problem-utils/presets/command';

const TIME_LIMIT_SECONDS = 120;
const PROJECT_FILE_PATHS = [
  'settings.gradle.kts',
  'build.gradle.kts',
  'gradle.properties',
  'app/build.gradle.kts',
  'app/src/main/AndroidManifest.xml',
  'app/src/test/java/com/willbooster/example/PriceCalculatorTest.kt',
] as const;

interface AndroidTestRunResult extends PackageManagerCommandRunResult {
  gradleStatus: number | undefined;
}

await commandJudgePreset<
  { id: string },
  AndroidTestRunResult
>(import.meta.dirname, {
  limits: {
    buildTimeoutSeconds: 30,
    maxOutputLength: 50_000,
  },
  runTimeoutSeconds: TIME_LIMIT_SECONDS,
  readTestCases: () => Promise.resolve([{ id: 'android_unit_tests' }]),
  resolveInput: async ({ cwd }) => {
    const learnerSourceDirectory = path.join(
      cwd,
      'app/src/main/java/com/willbooster/example'
    );
    await createDirectoryWithoutFollowingSymlinks(cwd, learnerSourceDirectory);
    await copyWithoutFollowingSymlinks(
      path.join(cwd, 'PriceCalculator.kt'),
      path.join(learnerSourceDirectory, 'PriceCalculator.kt')
    );
    return '';
  },
  runCommand: async ({ cwd, env, timeLimitSeconds }) => {
    const result = await runCommandInTemporaryPackageManagerProject({
      cwd,
      projectDir: path.join(import.meta.dirname, 'judge_project'),
      projectFilePaths: PROJECT_FILE_PATHS,
      packageManager: 'gradle',
      command: ['gradle', '--offline', '--no-daemon', 'testDebugUnitTest'],
      env,
      timeLimitSeconds,
      tempDirPrefix: 'exercode-android-',
    });

    return {
      ...result,
      status: 0,
      gradleStatus: result.status,
    };
  },
  test: ({ runResult }) =>
    runResult.gradleStatus === 0
      ? undefined
      : {
          decisionCode: DecisionCode.WRONG_ANSWER,
          feedbackMarkdown: 'Androidのユニットテストに失敗しました。',
        },
});
