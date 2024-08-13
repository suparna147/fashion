// server.js
const express = require('express');
const app = express();
const port = 5000;

app.get('/api/admin/data', (req, res) => {
  res.json({
    customers: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        cart: [
          { productId: 101, productName: 'Product 1', quantity: 2 },
          { productId: 102, productName: 'Product 2', quantity: 1 }
        ],
        billingDetails: {
          totalAmount: 150,
          billingDate: '2023-07-22'
        },
        recommendations: ['Product 3', 'Product 4']
      },
      // Additional customer data
    ]
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
