## 目录

```
.
├── README.md
├── app
│   ├── controllers
│   │   ├── AbstractController.js
│   │   ├── Index.js
│   │   └── User.js
│   ├── forms
│   │   ├── Form.js
│   │   └── User
│   │       └── Add.js
│   ├── middlewares
│   │   ├── Base.js
│   │   ├── Data.js
│   │   ├── Init.js
│   │   └── Test.js
│   ├── models
│   │   ├── AbstractModel.js
│   │   └── User.js
│   └── views
│       └── index.html
├── config
│   ├── base.js
│   └── mysql.js
├── lib
│   ├── Db
│   │   ├── Connector.js
│   │   ├── Sql
│   │   │   ├── Add.js
│   │   │   ├── Base.js
│   │   │   ├── Delete.js
│   │   │   ├── Select.js
│   │   │   └── Update.js
│   │   └── Table.js
│   ├── Env.js
│   ├── Helper.js
│   └── Route.js
├── package-lock.json
├── package.json
├── portal
│   └── index.js
└── routes
    ├── api.js
    └── web.js
```

## 搭建

1.
```
npm install
```

2.

配置开发环境:
```
cp .env.example .env.development
```

配置生成环境:
```
cp .env.example .env.product
```

参照[.env.example](/.env.example)中的配置进行，也可以自行添加，通过`env.getEnv('YOUR_KEY')`调用即可


3.

开发环境:
```
npm test
```
跑的是`nodemon`，方便调用，默认端口:33011


生成环境:
```
npm start
```
跑的是`nodemon`，方便调用，默认端口:33012


## 使用

### routes

#### 说明

路由的配置在[routes](/routes)下，默认的有两个文件，[api.js](/routes/api.js)和[web.js](/routes/web.js)，他会默认根据你的文件名给你所在的文件加入文件名的前缀，`web.js`比较特殊，他的前缀是`/`，`api.js`的前缀是`api`，例如你在`api.js`中设置了这样的路由:
```javascript
const routers = router
    .get('/users' , 'User@index');
```
那么你就需要用`get`请求去请求`/api/users`这个路由。

当然，你也可以自定义的加入路由文件，他会自动引入，使用方式和`api.js`同理。

#### 使用

他的使用方式多样，你也可以配合控制器层去使用，这也是我们所推崇的方式:
```javascript
const routers = router
    .get('/', 'Index@index');
```

你也可以直接使用一个闭包函数:
```javascript
const routers = router
    .get('/', (ctx , next)=>{
         console.log('helloworld')
    });
```
#### 中间件

同时，也引入了`middleware`的概念:

```javascript
const routers = router
    .get('test' , 'Init#Index@index');
```

中间件都存储在[middlewares](/app/middlwares)目录下，每个中间件继承自[Base](/app/middlwares/Base.js)，需要实现一个`handle`方法已完成调度:

```javascript
const Base = require('./Base');

/**
 *
 * @type {module.Init}
 */
module.exports = class Test extends Base {

    /**
     *
     * @param ctx
     * @param next
     */
    async handle(ctx, next) {
        console.log('test');
        await next();
    }
};
```

### controllers

#### 说明
控制器遵循`Koa2`的方法，通过`ES7`的`async`来完成调度。

```
module.exports = class Index extends AbstractController {

    /**
     *
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async index(ctx, next) {
        ctx.body = await ctx.render('index', {
            name: 'nine'
        });
    }

    async detail(ctx , next){
        ctx.body = 'helloworld';
    }
};
```

### models

#### 说明
框架本身实现了一个非常简单的`ORM`，已经封装了一些基本的`SELECT`

#### 快速上手
在[User.js](/app/controllers/User.js)中已经有一个简单的例子:

```javascript
async detail(ctx, next) {
        let userModel = this.getUserModel();
        let user = await userModel.getTable().findBy({'id': ctx.params.id});
    }

    getUserModel() {
        return new UserModel();
    }
```

#### 使用

1. findBy
获取单条:
```javascript
getTable().findBy({'id': ctx.params.id});
```
该方法有两个参数，第二个参数是要查询的字段，形式可以是:

```javascript
getTable().findBy({'id': ctx.params.id} , 'id');
```
或
```javascript
getTable().findBy({'id': ctx.params.id} , 'id , name');
```
或
```javascript
getTable().findBy({'id': ctx.params.id} , ['id' , 'name']);
```
或
```javascript
getTable().findBy({'id': ctx.params.id} , {'id' => 'user_id' , 'name' => 'user_name'});
```
在这个`fields`的字段中，`key`代表要查找的字段，`value`代表别名。

**注:其他的方法中有`fiedls`字段的同理，不填代表全部获取**

2. listBy
该方法有三个参数，第一个是查询条件，第二个参数是页数，第三个参数是limit，第四个是查询字段，和`findBy`一致，第五个参数代表排序，
如果第二个和第三个参数为0，就查询所有，第五个参数的形式可以是以下两种:
```javascript
listBy({'id': ctx.params.id}, 1, 10, '*', 'name')
```
以`name`正序排列。
或
```javascript
listBy({'id': ctx.params.id}, 1, 10, '*', {'name': 'asc', 'id': 'desc'})
```
先以`name`正序排列，再以`id`倒序排列。

3. get
该方法只有一个参数，就是这个表的id。

##### 其他方式

如果说以上的几个方法无法满足查询的话，也可以自己直接调用`getDb()`来拼接条件:
```javascript
let user = await userModel.getDb().limit(10).offset(1).order('name').orderDesc(['id' , 'age']).fetchOne('name');
```
以上demo列举了几个可能使用到的方法。

1. limit
`limit`设置查询条数

2. offset
设置开始位置

3. page(1, 10)
也可以直接用`page`方法来代替

4. order & orderDesc
一个代表正序，一个代表倒序，`String`和`Array`格式都支持

5. fetchRow(fields)
获取一行，字段格式和上面介绍一致

6. fetchAll(fields)
获取全部，字段格式和上面介绍一致

### views
`views`主要是使用的`Swig`模板，其目录是[views](/app/views).









