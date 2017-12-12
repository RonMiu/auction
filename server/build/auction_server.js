"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
var path = require("path");
var app = express();
// app.set('port',4200);
app.use('/', express.static(path.join(__dirname, '..', 'client')));
// app.get('/',(req,res)=>{
//     res.send("Hello Auction!")
// })
app.get('/api/products', function (req, res) {
    var result = products;
    console.log("products", result);
    var params = req.query;
    console.log("params", params);
    if (params.title) {
        result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1; });
    }
    if (params.price && result.length > 0) {
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
    }
    // if((params.category!=='-1') && result.length>0){
    //     result=result.filter((p)=>p.categories.indexOf(params.category)!==-1);
    // }
    res.json(result);
    console.log("result", result);
});
app.get('/api/products/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
app.get('/api/products/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("服务器已启动,Localhost:8000");
});
var Product = (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var products = [
    new Product(1, "第一个商品", 1.99, 3.5, "这是第一个商品的描述", ["电子产品", "硬件设备"]),
    new Product(2, "第二个商品", 2.99, 1, "这是第二个商品的描述", ["电子产品", "硬件设备"]),
    new Product(3, "第三个商品", 3.99, 5.0, "这是第三个商品的描述", ["电子产品", "图书"]),
    new Product(4, "第四个商品", 4.99, 3.0, "这是第四个商品的描述", ["图书"]),
    new Product(5, "第五个商品", 5.99, 2.5, "这是第五个商品的描述", ["图书", "硬件设备"]),
    new Product(6, "第六个商品", 6.99, 4.5, "这是第六个商品的描述", ["电子产品", "图书"])
];
var wsServer = new ws_1.Server({
    port: 8085
});
var subscription = new Map();
wsServer.on("connection", function (websocket) {
    websocket.send("交换数据");
    websocket.on("message", function (message) {
        var messageObj = JSON.parse(message);
        var productIds = subscription.get(websocket) || [];
        subscription.set(websocket, productIds.concat([messageObj.productId]));
    });
});
var currentBids = new Map();
setInterval(function () {
    // products.forEach(p=>{
    //     let currentBid = currentBids.get(p.id)||p.price;
    //     let newBid =currentBid+Math.random()*5;
    //     currentBids.set(p.id,newBid);
    // })
    // subscription.forEach((productIds:number[],ws)=>{
    //     let newBids = productIds.map(pid=>({
    //         productId:pid,
    //         bid:currentBids.get(pid)
    //     }))
    //     ws.send(JSON.stringify(newBids))
    // })
}, 2000);
var Comment = (function () {
    function Comment(id, productId, timestam, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestam = timestam;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var comments = [
    new Comment(1, 1, "2017-01-01", "张三", 3.5, "东西还行"),
    new Comment(2, 1, "2017-02-02", "李四", 2, "东西一般"),
    new Comment(3, 2, "2017-03-03", "张红姐", 4, "东西很赞"),
    new Comment(4, 2, "2017-04-04", "何杰", 5, "东西很好很棒"),
    new Comment(5, 3, "2017-05-05", "谢安", 1.5, "东西不行")
];
