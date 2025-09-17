# 🛒 E-Commerce API Documentation

This file documents the backend APIs for the e-commerce project.  
Format: **Endpoint → Auth → Request → Response**.

---

## 1. Authentication

### Register User
**POST** `/api/auth/register`  
**Auth**: ❌ Public  

**Body:**
```json
{
  "username": "JohnDoe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "_id": "647c...",
    "username": "JohnDoe",
    "email": "john@example.com",
    "role": "user",
    "cart": [],
    "createdAt": "2024-06-01T..."
  }
}
```

---

### Login User
**POST** `/api/auth/login`  
**Auth**: ❌ Public  

**Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": "647c...",
    "email": "john@example.com",
    "name": "JohnDoe"
  }
}
```

---

### Restricted Route (Test Token)
**GET** `/api/auth/restricted`  
**Auth**: ✅ Requires JWT  

**Header:**
```
Authorization: Bearer <token>
```

**Response:**
```json
"success"
```

---

## 2. Products

### Get All Products
**GET** `/api/products`  
**Auth**: ❌ Public  

**Response:**
```json
[
  {
    "id": "648d...",
    "name": "Laptop",
    "description": "14-inch ultrabook",
    "category": "Electronics",
    "price": 899.99,
    "stock": 10,
    "imageUrl": "http://example.com/laptop.jpg",
    "isActive": true
  }
]
```

---

### Get Product by ID
**GET** `/api/products/:id`  
**Auth**: ❌ Public  

---

### Create Product
**POST** `/api/products`  
**Auth**: ✅ Admin only  

**Body:**
```json
{
  "name": "Laptop",
  "description": "14-inch ultrabook",
  "category": "Electronics",
  "price": 899.99,
  "stock": 10,
  "imageUrl": "http://example.com/laptop.jpg"
}
```

---

### Update Product
**PUT** `/api/products/:id`  
**Auth**: ✅ Admin only  

**Body (only allowed fields):**
```json
{
  "name": "Gaming Laptop",
  "price": 1099.99,
  "stock": 15
}
```

---

### Delete Product
**DELETE** `/api/products/:id`  
**Auth**: ✅ Admin only  

---

## 3. Cart

### View Cart
**GET** `/api/cart`  
**Auth**: ✅ User only  

**Response:**
```json
{
  "message": "Cart Items",
  "items": [
    {
      "id": "648d...",
      "name": "Laptop",
      "price": 899.99,
      "description": "14-inch ultrabook",
      "category": "Electronics",
      "imageUrl": "http://example.com/laptop.jpg",
      "quantity": 2
    }
  ],
  "totalPrice": 1799.98
}
```

---

### Add to Cart
**POST** `/api/cart`  
**Auth**: ✅ User only  

**Body:**
```json
{
  "productID": "648d...",
  "quantity": 1
}
```

---

### Update Cart (Increment/Decrement)
**PUT** `/api/cart`  
**Auth**: ✅ User only  

**Body:**
```json
{
  "productid": "648d...",
  "action": "increment"
}
```

---

### Remove Product from Cart
**DELETE** `/api/cart`  
**Auth**: ✅ User only  

**Body:**
```json
{
  "productid": "648d..."
}
```

---

## 4. Orders

### Place Order
**POST** `/api/order`  
**Auth**: ✅ User only  

**Response:**
```json
{
  "message": "order placed",
  "details": {
    "_id": "649a...",
    "userId": "647c...",
    "items": [
      {
        "productId": "648d...",
        "priceAtPurchase": 899.99,
        "quantity": 2
      }
    ],
    "totalPrice": 1799.98,
    "status": "pending"
  }
}
```

---

### Get Orders
**GET** `/api/order`  
**Auth**: ✅ User/Admin  

- If user → returns only their orders.  
- If admin → returns all orders.  

**Response:**
```json
{
  "message": "user orders",
  "order": [
    {
      "_id": "649a...",
      "userId": "647c...",
      "items": [
        { "productId": "648d...", "quantity": 2, "priceAtPurchase": 899.99 }
      ],
      "totalPrice": 1799.98,
      "status": "pending"
    }
  ]
}
```
