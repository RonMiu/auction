import * as express from 'express'
import {Server} from 'ws'
import * as path from 'path';

const app=express();

// app.set('port',4200);

app.use('/',express.static(path.join(__dirname,'..','client'));

// app.get('/',(req,res)=>{
//     res.send("Hello Auction!")
// })

app.get('/api/products',(req,res)=>{
    let result = products;
    console.log("products",result)
    let params = req.query;
    console.log("params",params)
    if(params.title){
        result = result.filter((p)=>p.title.indexOf(params.title)!==-1);
    }
    if(params.price && result.length>0){
        result=result.filter((p)=>p.price<=parseInt(params.price));
    }
    // if((params.category!=='-1') && result.length>0){
    //     result=result.filter((p)=>p.categories.indexOf(params.category)!==-1);
    // }
    res.json(result)
    console.log("result",result)
})
app.get('/api/products/:id',(req,res)=>{
    res.json(products.find((product)=>product.id==req.params.id))
})

app.get('/api/products/:id/comments',(req,res)=>{
    res.json(comments.filter((comment:Comment)=>comment.productId==req.params.id))
})

const  server=app.listen(8000,"localhost",()=>{
    console.log("服务器已启动,Localhost:8000")
})

export class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public desc: string,
        public categories: Array<string>
    ) {

    }
}
const products: Product[] = [
    new Product(1, "第一个商品", 1.99, 3.5, "这是第一个商品的描述", ["电子产品", "硬件设备"]),
    new Product(2, "第二个商品", 2.99, 1, "这是第二个商品的描述", ["电子产品", "硬件设备"]),
    new Product(3, "第三个商品", 3.99, 5.0, "这是第三个商品的描述", ["电子产品", "图书"]),
    new Product(4, "第四个商品", 4.99, 3.0, "这是第四个商品的描述", ["图书"]),
    new Product(5, "第五个商品", 5.99, 2.5, "这是第五个商品的描述", ["图书","硬件设备"]),
    new Product(6, "第六个商品", 6.99, 4.5, "这是第六个商品的描述", ["电子产品", "图书"])
];

const wsServer = new Server({
    port:8085
});
const subscription = new Map<any,number[]>();

wsServer.on("connection",websocket=>{
    websocket.send("交换数据")
    websocket.on("message",message=>{
        let messageObj=JSON.parse(message);
        let productIds = subscription.get(websocket) || [];
        subscription.set(websocket,[...productIds,messageObj.productId])
    })
})

const currentBids=new Map<number,number>();

setInterval(()=>{
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
},2000)


export class Comment {
    constructor(
        public id: number,
        public productId: number,
        public timestam: string,
        public user: string,
        public rating: number,
        public content: string) {
    }
}
const comments: Comment[] = [
    new Comment(1, 1, "2017-01-01", "张三", 3.5, "东西还行"),
    new Comment(2, 1, "2017-02-02", "李四", 2, "东西一般"),
    new Comment(3, 2, "2017-03-03", "张红姐", 4, "东西很赞"),
    new Comment(4, 2, "2017-04-04", "何杰", 5, "东西很好很棒"),
    new Comment(5, 3, "2017-05-05", "谢安", 1.5, "东西不行")
]