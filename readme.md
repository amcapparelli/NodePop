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

## Install DB

Please, before running NodePop, install the database objects using:

```
npm run install_db
```

## Run in mode development

To run the app in mode development use:
```
npm run dev
```

## API call

To call the API use this URL:

http://localhost:3000/apiv1/adsdata

### Methods

You can use **GET** with these parameters:

* prodname=[/^string/]
* limit=[integer]
* page=[integer]
* tag=[string]
* priceMin=[integer]
* priceMax=[integer]
* forSale=[boolean]
* sort=[string]

You can use **POST** to create new Ads on DB with these parameters:

* productName=[string]
* price=[integer]
* forSale=[boolean]
* tags=[array[strings]]
* image=[string[URL]]

### Success Response

If success:

content {"success": true, "result": [Ads data], allTags: [all tags available]}