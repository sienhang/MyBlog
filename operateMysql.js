var OptPool = require('./OptPool'); 
var optPool = new OptPool(); 
var pool = optPool.getPool();

module.exports={
   insertArticle:function(param){
	   return new Promise(function(resolve, reject){
	      pool.getConnection(function(err,conn){
		    var addSql = 'insert into allarticles(b_title,b_type,b_tag,b_text,b_date) values(?,?,?,?,?)';
		    conn.query(addSql,param,function(err,rs){
		        if(err){
		             reject('insert err:',err.message);
		        }
		        resolve('insert success');
		    }); 
		    conn.release();     	
	      });
	   });   	
   },
   selectArticle:function(type,param){
	   return new Promise(function(resolve, reject){
	      pool.getConnection(function(err,conn){
	      	 var selectSql='';
	      	 if(param[1]==4){
               selectSql='SELECT * from'+' '+type+' '+'ORDER BY id DESC limit ?,?';
	      	 }
             if(param[1]==12){
               selectSql='SELECT b_title from'+' '+type+' '+'ORDER BY id DESC limit ?,?';
             }
             if(param[1]==30){
               selectSql='SELECT b_title,b_type from'+' '+type+' '+'ORDER BY id DESC limit ?,?';
             }             
		     conn.query(selectSql,param,function(err,rs) {  
			     if (err) {  
			         reject('select err:'+err.message);   
			     } 
			     resolve(rs);
		     });
		     conn.release();     	
	      });
	   });   	
   },  
   selectOneArticle:function(param){
	   return new Promise(function(resolve, reject){
	      pool.getConnection(function(err,conn){
             var selectSql='SELECT * from allarticles ORDER BY id DESC limit ?,1';
		     conn.query(selectSql,param,function(err,rs) {  
			     if (err) {  
			         reject('select err:'+err.message);   
			     } 
			     resolve(rs);
		     });
		     conn.release();     	
	      });
	   });   	
   },       
   selectTolNum:function(param){
	   return new Promise(function(resolve, reject){
	      pool.getConnection(function(err,conn){
		     conn.query('SELECT count from totalnum WHERE type=?',param,function(err,rs) {  
		     if (err) {  
		         reject('select err:'+err.message);   
		     } 
		     resolve(rs);
		    });
		    conn.release();     	
	      });
	   });   	
   },
   selectClassTolNum:function(){
	   return new Promise(function(resolve, reject){
	      pool.getConnection(function(err,conn){
		     conn.query('SELECT count from totalnum limit 1,4',function(err,rs){  
		     if (err) {  
		         reject('select err:'+err.message);   
		     } 
		     resolve(rs);
		    });
		    conn.release();     	
	      });
	   });   	
   },   
   updateTotalNum:function(param){
	   return new Promise(function(resolve, reject){
	      pool.getConnection(function(err,conn){
			var updateSql = 'UPDATE totalnum set count=? where type=?';
			conn.query(updateSql,param,function(err,rs){
			    if(err){
			        reject('update err:',err.message);
			    }
			    resolve('update success');
			});
		    conn.release();     	
	      });
	   });
   },
   select:function(type){
	   return new Promise(function(resolve, reject){
	      pool.getConnection(function(err,conn){
             var selectSql='SELECT * from'+' '+type+' '+'ORDER BY id DESC';
		     conn.query(selectSql,function(err,rs) {  
			     if (err) {  
			         reject('select err:'+err.message);   
			     } 
			     resolve(rs);
		     });
		     conn.release();     	
	      });
	   });   	
   }   
}



