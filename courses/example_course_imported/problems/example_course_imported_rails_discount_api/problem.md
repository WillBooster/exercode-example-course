---
name: 割引後の合計金額API
timeLimitMs: 120000
canCreateFiles: true
requiredSubmissionFilePaths:
  - app/controllers/discounts_controller.rb
---

## 問題文

商品の割引後の合計金額をJSONで返すRails APIを作成します。
`DiscountsController`の`show`アクションを完成させてください。

リクエストパラメーターとして、商品の単価`unit_price`、個数`quantity`、割引率`discount_percent`が渡されます。
割引前の合計金額を計算した後、割引率を適用してください。

レスポンスは次の形式で返します。

```ruby
render json: { total: 計算結果 }
```

## 制約

- $0 \leq unit\_price \leq 10^6$
- $0 \leq quantity \leq 100$
- $0 \leq discount\_percent \leq 100$
- 全てのパラメーターは整数を表す文字列として渡される。
- 小数部分が生じる場合は切り捨てる。
- コントローラー名とアクション名を変更してはいけない。

---

## 入力

標準入力は使用しません。
採点時にRailsの統合テストからHTTPリクエストを送信します。

## 出力

標準出力は使用しません。
全ての統合テストに成功すると正解です。

---

## サンプルケース

`unit_price=500`、`quantity=2`、`discount_percent=20`のとき、次のJSONを返します。

```json
{"total":800}
```
