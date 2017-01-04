var koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var static = require('koa-static');
var render = require('./render');
var opeMysql = require('./operateMysql');

var app = koa();
var myRouter = new Router();
app.use(bodyParser());
app.use(static(__dirname+'/static'));

myRouter.get('/index', index);
myRouter.get('/admin', admin);
myRouter.post('/getTypeTolNum',getTypeTolNum);//获取指定类型总数
myRouter.get('/getClassTolNum',getClassTolNum);//获取不同分类的总文章数
myRouter.post('/addArticle',addArticle);
myRouter.post('/selectArticle',selectArticle);
myRouter.post('/selectOneArticle',selectOneArticle);

function *index(){
  this.body = yield render('index');
}

function *admin(){
  this.body = yield render('admin');
}

function *getTypeTolNum(){
  var req=this.request.body;
  var param=[req.type];
  var rs=yield opeMysql.selectTolNum(param);
  this.response.body=rs[0].count;	
}

function *getClassTolNum(){
  var rs=yield opeMysql.selectClassTolNum();
  var param=[rs[0].count,rs[1].count,rs[2].count,rs[3].count];
  this.response.body=param;
}

function *addArticle(){
  var req=this.request.body;
  //插入文章
  var param=[req.b_title,req.b_type,req.b_tag,req.b_text,req.b_date];
  var rs=yield opeMysql.insertArticle(param);
  //查询totalnum现有值
  var rstype=yield opeMysql.selectTolNum([req.b_type]);
  var rsall=yield opeMysql.selectTolNum(['all']);
  //更新totalnum表，count加1
  var uptype=yield opeMysql.updateTotalNum([(rstype[0].count)+1,req.b_type]);
  var upall=yield opeMysql.updateTotalNum([(rsall[0].count)+1,'all']);
  this.response.body=upall; 
}

function *selectArticle(){
  var req=this.request.body;
  var type=req.type=='all'?'allarticles':req.type=='a'?'view_a':req.type=='b'?'view_b':req.type=='c'?'view_c':req.type=='d'?'view_d':'allarticles';
  var param=[(req.toPage-1)*req.numPerpage,parseInt(req.numPerpage)];
  var rs=yield opeMysql.selectArticle(type,param);
  this.response.body=rs;
}

function *selectReArticle(){
  var rs=yield opeMysql.selectReArticle();
  this.response.body=rs;
}

function *selectOneArticle(){
  var req=this.request.body;
  var currentPage=parseInt(req.currentPage);
  var index=parseInt(req.index);
  var param=[(currentPage-1)*30+index];
  var rs=yield opeMysql.selectOneArticle(param);
  this.response.body=rs;  
}

app.use(myRouter.routes());
app.listen(3000);











