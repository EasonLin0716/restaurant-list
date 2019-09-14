# Restaurant-list
餐廳推薦系統ver3.0
## Updates
9/14 增加了第三方 Google 登入功能

9/13 增加了登入、註冊功能

9/7 增加了排序功能

9/6 使用者現在可以建立、編輯或刪除餐廳資料
## Features
為您量身打造的餐廳推薦網站，您可以註冊一組屬於您自己的帳密，或透過Facebook直接登入，在餐廳清單中瀏覽、新增、編輯或刪除您的餐廳。

## Preview
![Login](https://github.com/EasonLin0716/restaurant-list/blob/master/preview/restaurant3.0_login2.JPG)
![Cover](https://github.com/EasonLin0716/restaurant-list/blob/master/preview/restaurant3.0_cover.JPG)
![Info](https://github.com/EasonLin0716/restaurant-list/blob/master/preview/restaurant3.0_detail.JPG)

## Install me now!
1. 在終端機上輸入

```
   git clone https://github.com/mpragnarok/restaurant-list.git
```

2. 在 https://developers.facebook.com/ 申請第三方登入用的金鑰

3. 在檔案 \restaurant-list 根目錄中創建一個名為 `.env` 的檔案，準備好您的金鑰並輸入以下指令：

```
   FACEBOOK_ID = <在此輸入FB ID>
   FACEBOOK_SECRET = <在此輸入FB SECRET>
   FACEBOOK_CALLBACK=http://www.example.com/auth/facebook/callback 

   GOOGLE_ID = <在此輸入GOOGLE ID>
   GOOGLE_SECRET = <在此輸入GOOGLE SECRET>
   GOOGLE_CALLBACK=http://www.example.com/auth/google/callback
```

4. 回到終端機，在根目錄下輸入

```
   npm install
```

5. 至 `.\restaurant-list\models\seeds` 資料夾，執行以下指令

```
   node restaurantListSeeder
```

6. 恭喜！現在您已經有以下兩個範例用使用者，他們各自擁有三個餐廳：

```
   第一位使用者：
   email: user1@example.com
   password: 12345678
   第二位使用者：
   email: user2@example.com
   password: 12345678
```

7. 回到根目錄，輸入 `npm run dev` ，即可在 http://localhost:3000/ 看到網站！

## Environment set up
1. Node.js
2. MongoDB

## Dependencies
1. "bcryptjs": "^2.4.3",
2. "body-parser": "^1.19.0",
3. "connect-flash": "^0.1.1",
4. "dotenv": "^8.1.0",
5. "express": "^4.17.1",
6. "express-handlebars": "^3.1.0",
7. "express-session": "^1.16.2",
8. "method-override": "^3.0.0",
9. "mongoose": "^5.6.12",
10. "passport": "^0.4.0",
11. "passport-facebook": "^3.0.0",
12. "passport-local": "^1.0.0"
13. "passport-google-oauth20": "^2.0.0"

Bootstrap樣式：https://bootswatch.com/spacelab/

