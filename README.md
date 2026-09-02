# Exercode 教材リポジトリ例

## 【重要】ID の変更に関する注意

教材リポジトリ内の以下の名前は、すべて Exercode 上のデータと教材を結び付ける ID として機能します。

| ID                    | 決まり方                                                              |
| --------------------- | --------------------------------------------------------------------- |
| コース（科目）ID      | `course.yaml` を置いたディレクトリの名前                              |
| レクチャー（授業）ID  | `course.yaml` の `lectures` の `id`（同名のディレクトリ名）           |
| マテリアル（教材）ID  | マテリアルファイルの名前（`.md` または `.contest.yaml` を除いた部分） |
| 問題 ID               | `problem.md` を置いたディレクトリの名前                               |
| マテリアル内問題 ID   | `yaml question` の `id`                                               |

**これらの ID を変更してインポートすると、変更前の ID の教材・問題は「削除」され、変更後の ID の教材・問題が「新規追加」として扱われます。**
削除される教材・問題に学生の提出記録が紐づいている場合、**提出記録も完全に削除され、ID を元に戻して再インポートしても復元できません**。

そのため、運用開始後（学生が提出を始めた後）は、ファイル名・ディレクトリ名・問題 ID を変更しないでください。

### ID を変更せずに並び順を変更する方法

- **レクチャー（授業）の並び順**は、`course.yaml` の `lectures` 配列の順序で決まります。配列内の順序を入れ替えるだけで並び替えでき、ディレクトリ名（ID）の変更は不要です。
- **マテリアル（教材）の並び順**は、ファイル名の辞書順で決まります。`10_introduction.md`、`20_exercise.md` のように **間隔を空けた番号** を最初から付けておくと、既存ファイルをリネームせずに `15_supplement.md` のような新しい教材を間に挿入できます。
- **マテリアル内の問題の並び順**は、マテリアルファイル内に記載した問題リンクの順序で決まります。リンクの記載順を入れ替えるだけで並び替えでき、問題 ID の変更は不要です。

### どうしても ID を変更したい場合

運用開始後に ID の変更が必要になった場合は、インポートを実行する **前に** WillBooster株式会社にご相談ください。
インポート時の確認ダイアログに「提出記録が削除される」という警告が表示された場合は、インポートをキャンセルし、ID を変更前の状態に戻してください。

## 教材の作り方

### コース（科目）

リポジトリ内に`course.yaml`という名のファイルを作成してください。
リポジトリ内であれば任意のディレクトリに配置できます。

`course.yaml`を置いたディレクトリの名前がそのコースの ID（コース ID）になります。
コース ID は半角小文字アルファベット、数字、アンダースコア、ハイフンからなる、**Exercode 全体で一意**の文字列です。

`course.yaml`ファイルの内容の例：

```yaml
# コースのパラメータ
name: コース名
description: コースの説明
author: 作成者名
isDiffHintDisabled: true
lectures:
  # 各レクチャー (Lecture) のパラメータ
  - id: 'addition'
    name: レッスン名
    description: レッスンの説明
```

#### コースのパラメータ

| パラメータ名                 | 型     | 説明                                           |
| ---------------------------- | ------ | ---------------------------------------------- |
| `name`                       | 文字列 | 名称                                           |
| `description`                | 文字列 | 説明                                           |
| `author`                     | 文字列 | 作成者名                                       |
| `lectures`                   | 配列   | レクチャーの配列                               |
| `isMotivationFeatureEnabled` | 真偽   | モチベーション機能を**有効**にする             |
| `isPublic`                   | 真偽   | コースを公開する                               |
| 他                           |        | コース・マテリアル共通の設定パラメータ（後述） |

### コース・マテリアル共通の設定パラメータ

これらのパラメータをコースとマテリアルの両方に設定すると、マテリアルの設定が優先されます。
真偽値のパラメータの初期値はすべて`false`です。

| パラメータ名                      | 型     | 説明                                                                                                                                  |
| --------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `availableLanguageIds`            | 配列   | 利用可能なプログラミング言語                                                                                                          |
| `areTestCasesHidden`              | 真偽   | コーディング問題のテストケースを**非表示**にする                                                                                      |
| `isProblemGradingResultHidden`    | 真偽   | コーディング問題の採点結果を**非表示**にする                                                                                          |
| `isAutoFormatDisabled`            | 真偽   | 自動フォーマットを**無効**にする                                                                                                      |
| `isCopyAndPasteDisabled`          | 真偽   | コードエディタでのコピー＆ペーストを**無効**にする                                                                                    |
| `isDebugHintDisabled`             | 真偽   | デバッグヒント（不正解の理由の説明）の表示を**無効**にする                                                                            |
| `isFixHintDisabled`               | 真偽   | 修正ヒント（修正方法の説明）の表示を**無効**にする                                                                                    |
| `isDiffHintDisabled`              | 真偽   | 差分ヒント（修正済みの正解コード）の表示を**無効**にする                                                                              |
| `debugHintWaitingSeconds`         | 整数   | 問題を開いてからデバッグヒント（不正解の理由の説明）が利用可能になるまでの待機時間（秒）                                              |
| `fixHintWaitingSeconds`           | 整数   | 問題を開いてから修正ヒント（修正方法の説明）が利用可能になるまでの待機時間（秒）                                                      |
| `diffHintWaitingSeconds`          | 整数   | 問題を開いてから差分ヒント（修正済みの正解コード）が利用可能になるまでの待機時間（秒）                                                |
| `submissionOpenedAt`              | 文字列 | 提出開始日時（ISO 日付文字列、例: `2025-04-28T13:10:00+09:00`）                                                                       |
| `submissionSoftClosedAt`          | 文字列 | 提出ソフト締切日時（ISO 日付文字列、例: `2025-04-28T13:10:00+09:00`）。この日時を過ぎても提出は可能ですが、遅延提出として扱われます。 |
| `submissionHardClosedAt`          | 文字列 | 提出ハード締切日時（ISO 日付文字列、例: `2025-04-28T13:10:00+09:00`）。この日時を過ぎると提出ができなくなります。                     |
| `isAutoTranslationDisabled`       | 真偽   | 自動翻訳を**無効**にする                                                                                                              |
| `isModelAnswerShownAfterDeadline` | 真偽   | 締切後にコーディング問題の模範解答を表示する。                                                                                        |
| `isVotable`                       | 真偽   | 投票機能（提出後に他の学生のソースコードを閲覧する機能）が有効か否か                                                                  |
| `isMaterialChatDisabled`          | 真偽   | 教材チャットを**無効**にする                                                                                                          |

[ISO 日付文字列](https://ja.wikipedia.org/wiki/ISO_8601)を記載する際は、 `2025-04-28T13:10:00+09:00` のようにタイムゾーン情報（`+09:00`）を末尾に追記することを強く推奨します。

### レクチャー（コマ）

`course.yaml`と同じディレクトリに、前述したレクチャーのパラメータの`id`と一致する名前のディレクトリを作成してください。
ID は半角小文字アルファベット、数字、アンダースコア、ハイフンからなる、コース内で一意の文字列です。

#### レクチャーのパラメータ

上述の`course.yaml`の`lectures`項目の中に以下のパラメータを記載します。

| パラメータ名  | 型     | 説明                                                                       |
| ------------- | ------ | -------------------------------------------------------------------------- |
| `id`          | 文字列 | ID、コース内で一意かつ別途作成したディレクトリ名（前述）と一致していること |
| `name`        | 文字列 | 名称                                                                       |
| `description` | 文字列 | 説明                                                                       |

### マテリアル（講義資料）

レクチャーのディレクトリ内に`[マテリアルID].md`という名のファイルを作成してください。
マテリアル ID は半角小文字アルファベット、数字、アンダースコア、ハイフンからなる、レクチャー内で一意の文字列です。
[Front Matter](https://zenn.dev/adust/articles/cea61d98ea09d3)にそのマテリアルのパラメータを記述してください。

マテリアルはファイル名の辞書順で表示されます。
`10_introduction.md`、`20_exercise.md` のように間隔を空けた番号を付けておくと、後から新しい教材を間に挿入しやすくなります。
運用開始後にファイル名を変更すると、そのマテリアルに紐づく提出記録が削除されるため注意してください（前述の「ID の変更に関する注意」を参照）。

`[マテリアルID].md`ファイルの内容の例：

```md
---
# マテリアルのパラメータ
name: マテリアル1
---

## 見出し

本文です。

- [問題](problems/example_course_imported_a_plus_b)
```

#### マテリアルのパラメータ

| パラメータ名       | 型     | 説明                                                                                                                                             |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`             | 文字列 | 名称                                                                                                                                             |
| `isExamination`    | 真偽   | 試験モードを**有効**にする。有効にすると、選択肢問題の再提出が**有効**になり、ヒント機能、コード実行機能、コピー＆ペーストなどが**無効**になる。 |
| `isMockExamination` | 真偽   | 模擬試験モードを**有効**にする。試験モードの機能に加えて、問題一覧と単一問題表示の画面が表示される。                                 |
| `isRealtimeSurvey` | 真偽   | リアルタイムなアンケート集計機能を**有効**にする。                                                                                               |
| 他                 |        | 上記のコース・マテリアル共通の設定パラメータ                                                                                                     |

#### コードブロックの実行

Python や Java など Exercode で実行できるプログラミング言語を指定したコードブロックは、教材上で学生がそのまま編集・実行できるコードブロックとして表示されます。
言語の後ろに空白区切りで次の属性を付けると、表示や動作を変更できます（例：` ```python stdin `）。

| 属性         | 説明                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `no-execute` | 実行できない通常のコードブロックとして表示する。コードの断片など、実行させたくない場合に指定する。                                         |
| `stdin`      | 標準入力の入力欄を表示する。`input()` などで標準入力を読むプログラムに指定する。指定しない場合、学生は標準入力を使用できない。 |

使用例は `courses/example_course_imported/a_plus_b/a_plus_b_z_executable_code.md` を参照してください。

#### 選択肢・穴埋め・記述式問題

マテリアルファイルの中で選択肢・穴埋め・記述式問題を作成することができます。
詳細は [マテリアル内に挿入可能な問題の作問ガイドライン](howToWriteQuestions.md) をご覧ください。

### コンテスト

コンテストはマテリアルの一種です。レクチャーのディレクトリ内に`[コンテストID].contest.yaml`というファイルを作成します。
コンテストから参照できるのは、同じコース内の問題だけです。

```yaml
name: 足し算・引き算コンテスト
description: 制限時間内に複数の問題へ挑戦するコンテストの例です。
divisions:
  - id: morning_session
    name: 午前の部
    openedAt: '2000-01-01T09:00:00+09:00'
    closedAt: '2099-01-01T10:00:00+09:00'
  - id: afternoon_session
    name: 午後の部
    openedAt: '2000-01-01T13:00:00+09:00'
    closedAt: '2099-01-01T14:00:00+09:00'
problems:
  - id: example_course_imported_a_plus_b
    score: 100
  - id: example_course_imported_a_minus_b
    score: 100
```

#### コンテストのパラメータ

| パラメータ名              | 型     | 説明                                                               |
| ------------------------- | ------ | ------------------------------------------------------------------ |
| `name`                    | 文字列 | 名称                                                               |
| `description`             | 文字列 | コンテストの説明（Markdown）                                       |
| `showsProblemsAfterClose` | 真偽   | 全開催区分の終了後に非参加者へ問題を表示するか。初期値は`true`     |
| `adminEmails`             | 配列   | コンテスト教材の管理者にする登録済みアカウントのメールアドレス     |
| `divisions`               | 配列   | 開催区分。1件以上必要                                               |
| `problems`                | 配列   | 出題する問題。1件以上必要                                           |
| 他                        |        | 上記のコース・マテリアル共通の設定パラメータ                       |

`divisions`の各要素には以下のパラメータを記載します。

| パラメータ名 | 型     | 説明                                          |
| ------------ | ------ | --------------------------------------------- |
| `id`         | 文字列 | コンテスト内で一意のID                        |
| `name`       | 文字列 | 名称                                          |
| `openedAt`   | 文字列 | 開催開始日時（タイムゾーン付きISO日付文字列） |
| `closedAt`   | 文字列 | 開催終了日時（タイムゾーン付きISO日付文字列） |
| `password`   | 文字列 | 参加用パスワード                              |

`problems`の各要素には問題 ID と 0 以上の整数の配点を指定します。

| パラメータ名 | 型     | 説明                                   |
| ------------ | ------ | -------------------------------------- |
| `id`         | 文字列 | コンテスト内で重複しない問題 ID        |
| `score`      | 整数   | 配点                                   |

問題ごとに、`areTestCasesHidden`、ヒントの無効化設定・待機時間、`isMaterialChatDisabled`を上書きできます。
division ID や問題 ID は、参加登録や提出が始まった後に変更・削除しないでください。

実例: [`example_contest.contest.yaml`](courses/example_course_imported/example_contest/example_contest.contest.yaml)

### コーディング問題

コースのディレクトリ内に、`problem.md`を含む問題ディレクトリを作成してください。
問題ディレクトリの名前が問題 ID になります。問題 ID は半角小文字アルファベット、数字、アンダースコア、ハイフンからなる、**コース内で一意**の文字列です。
問題ディレクトリは同じコース内の任意の場所に配置できます。`problems/[問題ID]/problem.md`という構成を推奨します。

運用開始後に問題 ID（ディレクトリ名）を変更すると、その問題に紐づく提出記録が削除されるため注意してください（前述の「ID の変更に関する注意」を参照）。

コーディング問題の Markdown ファイルには YAML 形式のフロントマターを記述する必要があります。
フロントマターでは後述するパラメータを設定できます。

`problem.md`ファイルの内容の例：

```md
---
name: A + B
timeLimitMs: 2000
---

整数$A,B$が与えられます。
$A+B$の計算結果を出力してください。

（後略）
```

#### テストケースの作成

標準入出力で判定する問題では、`isManualScoringRequired` が `true` に設定されていない場合、自動採点用のテストケースを作成する必要があります。
独自の判定処理を実装する問題では、`judge.ts`の実装に応じてテストケースを用意してください。

#### テストケースファイルの配置

1. `problem.md` と同じディレクトリに `test_cases` フォルダを作成します。

2. `test_cases` フォルダ内に、1つ以上のテストケースを作成します。1つのテストケースは `[テストケース名]` を共有する次のファイル・フォルダで構成され、それぞれ省略できます：
   - 標準入力ファイル：`[テストケース名].in`（標準入力がない場合は空のファイルにするか、省略します）
   - 標準出力ファイル：`[テストケース名].out`（期待する標準出力）
   - 入力ファイルフォルダ：`[テストケース名].fin/`（実行前に作業ディレクトリへコピーされるファイル群。ファイル入出力の問題で使います）
   - 期待出力ファイルフォルダ：`[テストケース名].fout/`（実行後に作業ディレクトリの同名ファイルと比較されるファイル群）
   - 全テストケース共通の入力ファイルフォルダ：`_shared.fin/`（任意）
   - 独自判定用の設定ファイル：`[テストケース名].json`（`judge.ts` が自身で読み込む設定。標準の判定では無視されます）

※1 `judge.ts` を持たない問題では、各テストケースに `.out` または `.fout/` のいずれかが必要です。`.in` だけのテストケースは判定できないため拒否されます。

※2 標準出力と `.fout/` 内のテキストファイルは、空白区切りの単語ごとに比較され、小数は一定の誤差を許容します。画像などのバイナリファイルは完全一致で比較されます。

※3 `judge.ts` を持つ問題では、`judge.ts` の実装に応じてテストケースを用意してください。例えば画像を比較する問題では `.in` だけを置き、`.out` は作成しません。詳細は [`@exercode/problem-utils` の README](https://github.com/WillBooster/exercode-problem-utils#test-cases) を参照してください。

#### コーディング問題のディレクトリ構成

標準入出力で判定する問題と、独自の判定処理を実装する問題で構成が異なります。

##### 標準入出力で判定する問題

通常の標準入出力問題には`judge.ts`と`debug.ts`を配置しません。標準のJudgeとDebugが自動的に使用されます。

```
addition/
├── problem.md
├── model_answers/
│   └── java/
│       └── Main.java
└── test_cases/
    ├── sample1.in
    ├── sample1.out
    ├── sample2.in
    ├── sample2.out
    ├── edge1.in
    ├── edge1.out
    ├── edge2.in
    ├── edge2.out
    ├── random1.in
    ├── random1.out
    ├── random2.in
    └── random2.out
```

##### 独自の判定処理を実装する問題

HTML/CSS、ブラウザAPI、GUIなど、標準入出力の比較では判定できない問題には`judge.ts`を配置します。
デバッグ機能も提供する場合は、その問題に対応した`debug.ts`も配置します。

```text
custom_problem/
├── problem.md
├── judge.ts
├── debug.ts
└── model_answers/
```

独自Judgeを使用するCUI問題で、デバッグ時は標準入出力をそのまま利用できる場合は、次の`debug.ts`を使用できます。

```ts
import { stdioDebugPreset } from '@exercode/problem-utils/presets/stdio';

await stdioDebugPreset(import.meta.dirname);
```

#### コーディング問題のパラメータ

| パラメータ名                             | 型                 | 必須 | 初期値            | 説明                                                                                       |
| ---------------------------------------- | ------------------ | ---- | ----------------- | ------------------------------------------------------------------------------------------ |
| `name`                                   | 文字列             | ✓    |                   | 名称                                                                                       |
| `timeLimitMs`                            | 整数               |      | 2000              | 実行時間制限（ミリ秒、0 以上）                                                             |
| `memoryLimitByte`                        | 整数               |      | 256 × 1024 × 1024 | メモリ制限（バイト、0 以上）                                                               |
| `requiredRegExpsInCode`                  | 文字列の配列       |      | `[]`              | ソースコードで必須の正規表現                                                               |
| `forbiddenRegExpsInCode`                 | 文字列の配列       |      | `[]`              | ソースコードで禁止の正規表現                                                               |
| `forbiddenTextsInCode`                   | 文字列の配列       |      | `[]`              | ソースコードで禁止の文字列                                                                 |
| `canCreateFiles`                         | 真偽               |      |                   | ファイル作成を許すか否か                                                                   |
| `isAttachedFileRequired`                 | 真偽               |      |                   | 添付ファイルが必須か否か                                                                   |
| `isManualScoringRequired`                | 真偽               |      |                   | 手動採点が必要か否か。手動採点が必要な問題ではヒント機能は利用できない。                   |
| `isVotable`                              | 真偽               |      |                   | 投票機能（提出後に他の学生のソースコードを閲覧する機能）が有効か否か                       |
| `isEditorDisabled`                       | 真偽               |      |                   | エディタを**無効**にする。エディタが無効な場合、ソースコードをアップロードする必要がある。 |
| `requiredEnvironmentVariables`           | 文字列の配列       |      | `[]`              | 必須の環境変数                                                                             |
| `requiredOutputFilePaths`                | 文字列の配列       |      | `[]`              | ユーザプログラムが出力しなければならないファイルのパス                                     |
| `requiredSubmissionFilePaths`            | 文字列の配列       |      | `[]`              | 提出が必須のファイル                                                                       |

正規表現を表すパラメータの文字列は、JavaScript の`new RegExp(pattern)`コンストラクタの`pattern`として入力されます。

### 独自Judge・模範解答のローカル検証（judge.ts）

独自の判定処理を実装した問題では、`judge.ts` を使ってテストケースと模範解答が正しいかをローカル環境で検証できます。
Exercode にアップロードする前に問題の不備を発見できるため、活用を推奨します。

#### 前提条件

このリポジトリでは、ランタイムのバージョンを`.tool-versions`で管理しています。
以下のツールがインストールされている必要があります。

- [mise](https://mise.jdx.dev/)（ランタイムのバージョン管理）
- [bun](https://bun.sh/)（JavaScript/TypeScript ランタイム）
- 問題の対象言語の処理系（例：Java の問題なら `javac` / `java`）

#### セットアップ

1. `.tool-versions`に記載されたランタイムをインストールします：

```bash
mise install
```

2. `package.json`に記載された依存パッケージをインストールします：

```bash
bun install
```

#### ブラウザを使って判定する問題

HTML/CSS の構造チェックや、JavaScript のブラウザ API（DOM 操作、イベント、localStorage 等）を使う問題では、Puppeteer でブラウザを起動して判定します。

##### HTML/CSS 問題

Puppeteer でページを開き、DOM 構造やスタイルを検証するテストケースを TypeScript で記述します。

**judge.ts の例（`problems/html_css_example/`）：**

```ts
import { DecisionCode, parseArgs, printTestCaseResult, startHttpServer } from '@exercode/problem-utils';
import type { TestCaseResult } from '@exercode/problem-utils';
import assert from 'node:assert';
import puppeteer from 'puppeteer';
import type { Page } from 'puppeteer';

const TEST_CASES: readonly [string, (page: Page) => Promise<Omit<TestCaseResult, 'testCaseId'>>][] = [
  [
    '01_h1',
    async (page) => {
      try {
        const h1Handle = await page.locator('h1').waitHandle();
        const h1Text = await h1Handle.evaluate((e) => e.textContent.trim());
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
  // ... 他のテストケース
];

const args = parseArgs(process.argv);
await using server = startHttpServer(args.cwd);

const browser = await puppeteer.launch({
  args: process.env.CI || process.env.WB_DOCKER === '1' ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
});
const page = await browser.newPage();
page.setDefaultTimeout(1000);

await page.goto(server.url, { waitUntil: 'domcontentloaded' });

for (const [testCaseId, test] of TEST_CASES) {
  const result = await test(page);
  printTestCaseResult({ testCaseId, ...result });
  if (result.decisionCode !== DecisionCode.ACCEPTED) break;
}

await browser.close();
```

**ディレクトリ構成の例（`problems/html_css_example/`）：**

```
html_css_example/
├── problem.md
├── judge.ts          ← Puppeteer でDOM構造を検証
└── model_answers/
    └── html/
        └── index.html
```

テストケースは `judge.ts` 内の `TEST_CASES` 配列に直接記述します（`.in` / `.out` ファイルは不要）。
検証パターンの例：

- タグの存在とテキスト内容: `page.locator('h1').waitHandle()` + `evaluate(e => e.textContent)`
- 属性の検証: `page.$$eval('img', es => es.map(e => e.getAttribute('src')))`
- CSS スタイルの検証: `page.evaluate(() => getComputedStyle(el).color)`

**実行方法：**

```bash
cd problems/html_css_example
bun run judge.ts model_answers/html
```

##### JavaScript ブラウザ依存問題

`test_cases/` の `.in` ファイルにブラウザ環境のセットアップコード（DOM 構築、`window.test` 定義等）を記述し、`.out` ファイルに `console.log` の期待出力を記述します。
judge.ts は Puppeteer でブラウザを起動し、セットアップ → ユーザーコード実行 → 出力比較を行います。

**ディレクトリ構成の例（`problems/javascript_browser_example/`）：**

```
javascript_browser_example/
├── problem.md
├── judge.ts          ← Puppeteer でブラウザ上でJSを実行し出力を比較
├── model_answers/
│   └── javascript/
│       └── main.mjs
└── test_cases/
    ├── example_1.in   ← ブラウザ環境のセットアップコード
    ├── example_1.out  ← console.log の期待出力
    ├── test_1.in
    └── test_1.out
```

`.in` ファイルの例：

```javascript
document.body.innerHTML = '<p id="message">初期テキスト</p><button id="change-btn">変更</button>';
window.test = function() {
  document.getElementById('change-btn').click();
  if (document.getElementById('message').textContent === 'こんにちは！') {
    console.log('OK');
  } else {
    console.log('NG');
  }
};
```

`.out` ファイルの例：

```
OK
```

**実行方法：**

```bash
cd problems/javascript_browser_example
bun run judge.ts model_answers/javascript
```

---

#### 実行結果の見方

各テストケースの結果が出力されます。

```
TEST_CASE_RESULT {"testCaseId":"01_small_1","decisionCode":2000,"exitStatus":0,"stdin":"1 2","stdout":"3\n","timeSeconds":0.31,"memoryBytes":44695552}
```

主な `decisionCode` の意味：

| コード | 意味                       |
| ------ | -------------------------- |
| 2000   | ACCEPTED（正解）           |
| 1000   | WRONG_ANSWER（不正解）     |
| 1001   | RUNTIME_ERROR              |
| 1002   | TIME_LIMIT_EXCEEDED        |
| 1100   | BUILD_ERROR                |

すべてのテストケースで `decisionCode` が `2000` であれば、模範解答がすべてのテストケースを通過することを確認できます。
