# Installation Instructions #

  1. Clone the repo from https://github.com/maheshnyadav/server
  2. Install packages with npm install
  3. Create .env file with following details. (DB will be deleted after 7 days)
      - MONGODB_URL='URL is in mail'
      - PORT=5000
      - JWT_SECRET='somesecret'
      - BSA_THRESHOLD=50000
  4. Open MongoDB compass. Enter MONGODB_URL in URI section of New Connection. Click on connect. Expand banking_app.
  5. Goto server folder in terminal and run "npm start"
  6. Open Postman. Create request with url - localhost:5000/transactions/transfer (Refer attached screenshot for step 6, 7, 8)
  7. Select Body -> raw -> JSON
  8. Send the data in below format. You can use details like "fromAccountId, toAccountId, amount" from banking_app -> accounts collection.
      - {
          "fromAccountId": 5443471874,
          "toAccountId": 8612762398,
          "amount": 20000
        }
  9. Test the application
