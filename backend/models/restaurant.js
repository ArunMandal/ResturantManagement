const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/database');

class Restaurant {
  constructor(name, phone, foods = [], notes = [], orders=[]) {
    this.name = name;
    this.phone = phone;
    this.foods = foods;
    this.notes = notes;
    this.orders = orders;
  }

  async save() {
    const db = getDb();
    const result = await db.collection('restaurants').insertOne(this);
    return result.insertedId;
  }

  static findById(restaurantId) {
    const db = getDb();
    return db.collection('restaurants').findOne({ _id: new ObjectId(restaurantId) });
  }

  static findByName(name) {
    const db = getDb();
    return db.collection('restaurants').findOne({ name });
  }

  static findAll() {
    const db = getDb();
    return db.collection('restaurants').find({}).toArray();
  }

  static addFood(restaurantId, newFood) {
    const db = getDb();
    newFood._id = new ObjectId();
    return db.collection('restaurants').updateOne(
      { _id: new ObjectId(restaurantId) },
      { $push: { foods: newFood } }
    );
  }

  static addNote(restaurantId, newNote) {
    const db = getDb();
    newNote._id = new ObjectId();
    return db.collection('restaurants').updateOne(
      { _id: new ObjectId(restaurantId) },
      { $push: { foods: newNote } }
    );
  }

  static updateFood(restaurantId, foodId, updatedFood) {
    const db = getDb();
    return db.collection('restaurants').updateOne(
      { _id: new ObjectId(restaurantId), 'foods._id': new ObjectId(foodId) },
      {
        $set: {
          'foods.$.name': updatedFood.name,
          'foods.$.origin': updatedFood.origin,
          'foods.$.price': updatedFood.price,
          'foods.$.date': updatedFood.date,
          'foods.$.image': updatedFood.image,
        },
      }
    );
  }
  static updateNote(restaurantId, noteId, updatedNote) {
    const db = getDb();
    return db.collection('restaurants').updateOne(
      { _id: new ObjectId(restaurantId), 'notes._id': new ObjectId(noteId) },
      {
        $set: {
          'notes.$': updatedNote         
        },
      }
    );
  }

  static async addOrder(restaurantId, order) {
    const db = getDb();
  
    try {
      const result = await db.collection('restaurants').updateOne(
        { _id: new ObjectId(restaurantId) },
        { $push: { 'orders': order } }, // Assuming 'orders' is an array field in the restaurant document
        { upsert: true } // Include the upsert option
      );
  
      if (result.matchedCount === 0) {
        throw new Error('Restaurant not found.');
      }
  
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  
  static async addCart(restaurantId, cartItem) {
    const db = getDb();

    try {
      const result = await db.collection('restaurants').updateOne(
        { _id: new ObjectId(restaurantId) },
        { $push: { 'cart': cartItem } } // Assuming 'cart' is an array field in the restaurant document
      );

      if (result.matchedCount === 0) {
        throw new Error('Restaurant not found.');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async checkoutCart(restaurantId) {
    const db = getDb();

    try {
      const restaurant = await db.collection('restaurants').findOne({ _id: new ObjectId(restaurantId) });

      if (!restaurant) {
        throw new Error('Restaurant not found.');
      }

      const cartItems = restaurant.cart; // Assuming 'cart' is an array field in the restaurant document
      // Save 'cartItems' as an order or do whatever processing you need
      // Once the cart is checked out, you can empty it
      const result = await db.collection('restaurants').updateOne(
        { _id: new ObjectId(restaurantId) },
        { $set: { 'cart': [] } }
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
  
  
}

module.exports = Restaurant;
