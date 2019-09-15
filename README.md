# Restaurant-list
Restaurant-list ver3.0 (餐廳推薦系統ver3.0)
## Updates
9/14 Users can now login through google account

9/13 login, register added

9/7 list sort added

9/6 Users can now do CRUD in this application
## Features
A restaurant-list built for you. You can register your own account, or login directly by facebook or google account. You can create, read, update and delete your own restaurants.

## Preview
![Login](https://github.com/EasonLin0716/restaurant-list/blob/master/preview/restaurant3.0_login2.JPG)
![Cover](https://github.com/EasonLin0716/restaurant-list/blob/master/preview/restaurant3.0_cover.JPG)
![Info](https://github.com/EasonLin0716/restaurant-list/blob/master/preview/restaurant3.0_detail.JPG)

## Environment set up
1. Node.js
2. MongoDB

## Install me now!
1. Open your terminal and enter: 

```
   git clone https://github.com/mpragnarok/restaurant-list.git
```

2. Register your own secret key at Facebook and Google:
   
   https://developers.facebook.com/ 
   
   https://developers.google.com/

3. create a file named `.env` at `\restaurant-list` , get your secret keys and paste the following code: 

```
   FACEBOOK_ID = <Your FB ID>
   FACEBOOK_SECRET = <Your FB SECRET>
   FACEBOOK_CALLBACK=http://www.example.com/auth/facebook/callback 

   GOOGLE_ID = <Your GOOGLE ID>
   GOOGLE_SECRET = <Your GOOGLE SECRET>
   GOOGLE_CALLBACK=http://www.example.com/auth/google/callback
```

4. Back to the terminal, and enter:

```
   npm install
```

5. cd to `.\restaurant-list\models\seeds` folder, and run the seeder js file by the code:

```
   node restaurantListSeeder
```

6. Congratulations! Now two naive users are available, those are their information:

```
   user1:
   email: user1@example.com
   password: 12345678
   user2:
   email: user2@example.com
   password: 12345678
```

7. cd back to the root, enter `npm run dev` and see it on http://localhost:3000/ 

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

Bootstrap style：https://bootswatch.com/spacelab/

