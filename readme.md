# NodePop

## Description

NodePop shows second-hand products for sale or to buy. 
NodePop was developed in Node.js and uses MongoDB.
Developed by Alejandro Capparelli

## Install NodePop

To install NodePop use 
```
npm install
```

Then set your environment variables values using the '.env.forReview' file, and copy/paste that info into a new '.env' file

## Install DB Ads and Users

Please, before running NodePop, install the database objects using:

```
npm run install_db
```

Then install the users database:

```
npm run install_users
```

## Run in mode development

To run the app in mode development use:
```
npm run dev
```

## Run as a user

To run the app as a user:
```
npm run start
```

## API authentication

POST    /apiv1/authenticate

for authentication you can use this example email users and passwords:

* email: maya.watkins@example.com | password: bf5ad5ed-23ac-4f5e-8906-638aabd0c206
* email: lenni.huotari@example.com | password: 2421e7ae-095f-40bc-a1aa-b6b9e791fdb8
* email: poppy.edwards@example.com | password: 1db0aaea-caef-4a4a-884f-b40601152aa3

# Success response 

content {"success": true, "token": token}

## API call

/apiv1/adsdata

# Methods supported:

You can use **GET** with these parameters:

* prodname=[/^string/]
* limit=[integer]
* page=[integer]
* tag=[string]
* pricerange=[integer]-[integer] 
  * (if first integer + '-': { price >= })
  * (if '-' + second integer: { price <= })
  * (if integer: { price = })
* pricemin=[integer]
* pricemax=[integer]
* forsale=[boolean]
* sort=[string]

You can use **POST** to create new Ads on DB with these parameters:

* productName=[string] - required
* price=[integer] - required
* forSale=[boolean] - required
* tags=[array[strings]]
* image=[string[URL]]

## Success Response

If success:

content {"success": true, "result": [Ads data], allTags: [all tags available]}