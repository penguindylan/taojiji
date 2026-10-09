# 陶集吉｜新北一日遊（鶯歌）
學校分組專案「任務2：專案資料收集與訪談」的 GitHub Pages 網站。

## 管理更新日誌

更新日誌內容由 Decap CMS 管理，登入頁面為網站網址後方的 `/admin/`。在後台新增或編輯貼文時，請填寫日期、標題、Instagram 貼文網址；貼文說明與圖片為選填。發布後，CMS 會將更新寫入 `data/updates.json`，並提交到 `main` 分支；GitHub Pages 部署完成後，網站更新日誌即會顯示內容。

**注意：**目前 `admin/config.yml` 的 `YOUR-OAUTH-PROXY-DOMAIN` 是待設定值；完成下方 OAuth proxy 設定並換成實際網域後，才能登入發布。

### 首次設定登入

此網站使用 GitHub Pages 靜態託管，GitHub 後端的 Decap CMS 需要額外的 OAuth proxy 才能安全地登入；不能直接把 GitHub OAuth secret 放在網站前端。可依照 [Decap CMS GitHub backend 說明](https://decapcms.org/docs/github-backend/)部署 [OAuth proxy 範例](https://github.com/sterlingwes/decap-proxy)，或使用其他相容的 GitHub OAuth proxy。部署後：

- 在 GitHub OAuth App 設定 proxy 提供的 callback URL（範例 proxy 使用 `https://你的-proxy-網域/callback`），並依 proxy 指示設定 Client ID 與 secret。
- 將 `admin/config.yml` 的 `backend.base_url` 改成 proxy 網域（只填網域，不加 `/auth` 或 `/callback`）。
- 要發布內容的每位管理者都有 `penguindylan/taojiji` 儲存庫的寫入權限。
- 網站已部署 `admin/`、`data/updates.json` 和 `updates.js`。

管理入口部署完成後可由 `https://penguindylan.github.io/taojiji/admin/` 開啟。沒有 GitHub 儲存庫寫入權限的訪客只能查看更新，不能發布內容。
