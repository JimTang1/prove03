const Product = require('../models/products');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) =>{
    res.render('shop/product-list',{
      prods: products,
      pageTitle: 'Shop Page',
      path: '/products',
    });
  });
}

exports.getProduct = (req, res, next) =>{
  const prodId = req.params.productId;
  Product.findById(prodId, product =>{
    // console.log(product);
    res.render('shop/product-detail',{
      product:product,
      pageTitle:product.title,
      path:'/products',
    });
  });
}

exports.getIndex = (req, res, next) =>{
  Product.fetchAll((products) =>{
    res.render('shop/index',{
      prods: products,
      pageTitle: 'Main Page',
      path: '/',
    });
  });
}

exports.getCart = (req, res, next) =>{
  Cart.getCart(cart =>{
    Product.fetchAll(products =>{
      const cartProducts = [];
      for (product of products){
        const cartProductsData = cart.products.find(prod => prod.id === product.id);
        if(cartProductsData){
          cartProducts.push({productData:product, qty:cartProductsData.qty});
        };
      };
      res.render('shop/cart', {
        path:'/cart',
        pageTitle:'Cart Page',
        products:cartProducts,
      });
    });
  });

}

exports.postCart =(req, res ,next) =>{
  const prodId = req.body.productId;
  Product.findById(prodId, (product) =>{
    Cart.addProduct(prodId, product.price)
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) =>{
  const prodId = req.body.productId;

  Product.findById(prodId, (product) =>{
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
}

exports.getOrders =(req, res, next) =>{
  res.render('shop/orders', {
    path:'/orders',
    pageTitle:'Order page',
  });
}

exports.postRemoveProducts = (req, res, next) =>{
    const removeIndex = products.findIndex(prods => prods.productId === req.body.productId);
    console.log(req.body.productId);
    products.splice(removeIndex, 1);
    res.redirect('/');
}