const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/database');

class User {
  constructor(email, phoneNumber, fullName, password, address) {
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.fullName = fullName;
    this.password = password;
    this.address = address;
  }

  async save() {
    const db = getDb();

    // Check if a user with the same email already exists
    const existingUser = await db.collection('users').findOne({ email: this.email });

    if (existingUser) {
      throw new Error('Email already exists. Please use a different email address.');
    } else {
      // If no user with the same email exists, insert the new user
      return db.collection('users').insertOne(this);
    }
  }

  static findByEmail(email) {
    const db = getDb();
    return db.collection('users').findOne({ email });
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }

	static findAll() {
    const db = getDb();
    return db.collection('users').find({}).toArray();
  }
}

module.exports = User;
