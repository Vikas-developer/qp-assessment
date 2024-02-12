class Data {
  items = {
    apple: {
      name: "apple",
      price: 10,
      quantity: 10,
    },
    orange: {
      name: "orange",
      price: 10,
      quantity: 5,
    },
    banana: {
      name: "banana",
      price: 5,
      quantity: 0,
    },
  };
  orders = {};

  constructor() {}

  addItem(item) {
    const { name } = item;
    this.items[name] = item;
    return item;
  }
  getItems() {
    return Object.values(this.items);
  }
  removeItem(item) {
    const { name } = item;
    delete this.items[name];
    return item;
  }
  updateItem(item) {
    const { name, price, quantity } = item;
    const existingDetail = this.items[name];
    if (price !== undefined) {
      existingDetail["price"] = price;
    }
    if (quantity !== undefined) {
      existingDetail["quantity"] = quantity;
    }
    this.items[name] = existingDetail;
    return item;
  }
  getAvailableItems() {
    return Object.values(this.items).filter((item) => {
      item.quantity !== 0;
    });
  }
  placeOrder(cart) {
    const res = cart.forEach((item) => {
      if (this.items[item] === undefined || this.items[item].quantity === 0) {
        return null;
      } else {
        --this.items[item].quantity;
      }
    });
    const orderId = Math.random() + new Date().getMilliseconds();
    this.orders[orderId] = cart;
    return orderId;
  }
  getOrderDetails(id) {
    return this.orders[id];
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new Data();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;
