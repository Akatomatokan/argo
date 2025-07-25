# Aho–Corasick Visualizer

Aho–Corasick法を用いたマルチパターン文字列検索アルゴリズムを**可視化**する静的Webサイトです。  
Trieの構築やfail遷移、検索過程などをブラウザ上で直感的に体験できます。

##  概要

- 入力した複数のキーワードから**オートマトン（Trie + Failリンク）**を構築
- 入力テキストを走査し、一致するキーワードを検出
- 検索ステップの視覚化（SVGで構造表示）

## 使用技術

- HTML / CSS / JavaScript
- SVGによる構造描画（Canvas未使用）
- D3.jsなし（ライブラリレスで軽量）

##  使い方

1. `index.html` をブラウザで開く。ないしhttps://akatomatokan.github.io/argo/
2. キーワードを1行ずつ入力
3. テキストを入力して「検索」ボタンを押す
4. 結果とTrie構造、Failリンクが表示されます
