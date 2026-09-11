import { DecisionCode } from '@exercode/problem-utils';
import { browserJudgePreset, type BrowserJudgeTestCase } from '@exercode/problem-utils-browser';
import assert from 'node:assert';

const TEST_CASES: readonly BrowserJudgeTestCase[] = [
  [
    '01_h1',
    async (page) => {
      try {
        const h1Text = await page
          .locator('h1')
          .first()
          .evaluate((e) => e.textContent?.trim() ?? '');
        assert.strictEqual(h1Text, '自己紹介');
      } catch (error) {
        return {
          decisionCode: DecisionCode.WRONG_ANSWER,
          stderr: error instanceof Error ? error.message : String(error),
          feedbackMarkdown: '`h1`タグによる見出し`自己紹介`が見つかりません。',
        };
      }
      return { decisionCode: DecisionCode.ACCEPTED };
    },
  ],
  [
    '02_p',
    async (page) => {
      try {
        const pText = await page
          .locator('p')
          .first()
          .evaluate((e) => e.textContent?.trim() ?? '');
        assert.strictEqual(pText, '私はWebの勉強をしています。');
      } catch (error) {
        return {
          decisionCode: DecisionCode.WRONG_ANSWER,
          stderr: error instanceof Error ? error.message : String(error),
          feedbackMarkdown: '`p`タグによるテキスト`私はWebの勉強をしています。`が見つかりません。',
        };
      }
      return { decisionCode: DecisionCode.ACCEPTED };
    },
  ],
  [
    '03_ul_li',
    async (page) => {
      const liTexts = await page.locator('ul > li').evaluateAll((es) => es.map((e) => e.textContent?.trim() ?? ''));
      const expected = ['HTML', 'CSS', 'JavaScript'];

      if (liTexts.length !== expected.length) {
        return {
          decisionCode: DecisionCode.WRONG_ANSWER,
          feedbackMarkdown: `\`li\`タグの件数が一致しません。\n${expected.length}件必要ですが、${liTexts.length}件見つかりました。`,
        };
      }

      for (const [i, text] of expected.entries()) {
        if (liTexts[i] !== text) {
          return {
            decisionCode: DecisionCode.WRONG_ANSWER,
            feedbackMarkdown: `${i + 1}番目の\`li\`タグの内容が一致しません。\n\`${text}\`が期待されていますが、\`${liTexts[i]}\`が見つかりました。`,
          };
        }
      }

      return { decisionCode: DecisionCode.ACCEPTED };
    },
  ],
];

await browserJudgePreset({
  testCases: TEST_CASES,
  timeoutMs: 1000,
  contextOptions: { viewport: { width: 800, height: 600 } },
});
