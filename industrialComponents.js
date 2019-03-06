function conveyorAnimation(x,y,scale=1){
   var width = 326,
   height = 47,
   frames = 5,    
   currentFrame = 0,
   canvas = document.getElementById("myCanvas");
   
   var ctx = canvas.getContext("2d");
   var image = new Image();
   image.src = '~/../imgs/conveyor.png';
   
   var draw = function() {
   ctx.clearRect(x, y, width*scale, height*scale);
   ctx.drawImage(image, 0, height * currentFrame, width, height-2, x, y, width*scale, height*scale);
   
   if (currentFrame == frames) {
     currentFrame = 0;
   } else {
     currentFrame++;
   }
   }
   setInterval(draw, 100);
}
//  function pressAnimation(x,y,scale=1){
//     var canvas = document.getElementById("myCanvas");   
//     var ctx = canvas.getContext("2d");
//     var image = new Image();
//     image.src = '~/../imgs/press.png';
    
//     currentFrame=0;
//     isMoveDown=true;
 
//     var draw = function(){
       
//        ctx.clearRect(x, y, 278*scale, 505*scale);
 
//        var frames=20,
//        width = 68,
//        height = 120,   
//        sx=64,
//        sy=519,
//        dy=3;
       
//        ctx.drawImage(image, sx, sy, width, height, x+63*scale, y+224*scale+dy*scale*currentFrame, width*scale, height*scale);  
       
 
//        var width = 278,
//        height = 505,   
//        sx=0,
//        sy=0;      
       
//        ctx.drawImage(image, sx, sy, width, height, x, y, width*scale, height*scale);
       
//        if(currentFrame==0&&!isMoveDown)
//        {
//           clearInterval(interval);
//        }
//        if (currentFrame == frames) {
//           isMoveDown=false;
//        } 
//        if(isMoveDown){
//           currentFrame++;
//        }
//        else{
//           currentFrame--;
//        }   
//     }
//     var interval=setInterval(draw, 30);
//  }
 function inductorAnimation(x,y,scale=1){
    var width = 500,
    height = 220,
    frames = 8,
    panelWidth=108,
    panelHeight=62.1,   
    currentFrame = 0,
    canvas = document.getElementById("myCanvas");
    
    var ctx = canvas.getContext("2d");
    var image = new Image();
    image.src = '~/../imgs/inductor.png';
    
    var draw = function() {
 
    ctx.drawImage(image, 178, 224.5+panelHeight*currentFrame, panelWidth, panelHeight, x+179*scale, y+71*scale, panelWidth*scale, panelHeight*scale);
    
    if (currentFrame == frames) {
      currentFrame = 0;
    } else {
      currentFrame++;
    }
    }
    image.onload=function(){
       ctx.drawImage(image, 0,0, width, height, x, y, width*scale, height*scale);
       ctx.fillStyle='lightBlue';
       ctx.rect(x+277,y+38,25,6);
       ctx.lineWidth=3;
       ctx.fill();
       ctx.stroke();
       ctx.fillStyle='orange';
    }
    setInterval(draw, 200);
 }
 function drawVibroHooper(x,y,scale=1){
    var width = 326,
    height = 300,  
    canvas = document.getElementById("myCanvas");
    
    var ctx = canvas.getContext("2d");
    var image = new Image();
    image.src = '~/../imgs/vibrohooper.png';
    
    image.onload=function(){
       // ctx.clearRect(x, y, width, height);
       ctx.drawImage(image, 0, 0 , width, height, x, y, width*scale, height*scale);
    }   
 }
 function drawTable(x,y,scale=1){
    var width = 210,
    height = 300,  
    canvas = document.getElementById("myCanvas");
    
    var ctx = canvas.getContext("2d");
    var image = new Image();
    image.src = '~/../imgs/table.png';
    
    image.onload=function(){
       ctx.clearRect(x, y, width*scale, height*scale);
       ctx.drawImage(image, 0, 0 , width, height, x, y, width*scale, height*scale);
    }   
 }
 
 function  drawTareWithText(context,x,y,text,scale=1){
    var width=90,
        height=40;   
        var ctx=getContext2D(context);
        ctx.fillStyle='orange';
    ctx.rect(x,y,width,height);
 
    ctx.lineWidth='1';
    ctx.stroke();
    ctx.fill();
    ctx.font="30px Comic Sans MS";   
    ctx.fillStyle='black';
    ctx.strokeStyle='black';
    ctx.fillText(text,x+8,y+height/2+10);
 
    
 }
 class Drawable{
      constructor(eventName){
         this.allTime=0;
         this.countQueue=0;
         this.event=new Event(eventName);
      }
      draw(){
         throw new Error("implementation error in 'draw' method");
      }
      moveTo(frameOptions,frames=this.frames,v=this.v){  
         var obj=this;     
         this.frames=frames;
         this.v=v;
         // if(this instanceof Drawable&&this.prototype.isPrototypeOf(ob2)){
         var currentFrame=0;
         var Animation=function(){
            Object.keys(frameOptions).forEach(element => {
               obj[element]=obj[element]+((frameOptions[element]-obj[element])/v)*currentFrame;
               // this[element]=this[element]+((frameOptions[element]-this[element])/1)*1;
            });            
         // }
         // else throw new Error('You can`t animate these objects');      
         
            if (currentFrame == frames) {
               clearInterval(interval);      
               this.countQueue--;
               if(this.countQueue==0){
                  window.dispatchEvent(this.event);
                  // alert('hello');
               }         
            } 
            else
            {
               currentFrame++;
            }   
            obj.draw();         
         }.bind(this);
         
         var interval=setInterval(Animation, 100);
         this.countQueue++;
      }
      syncMoveTo(...args){
         setTimeout(function(){this.moveTo(...args);}.bind(this),this.allTime);
         this.allTime+=100*args[1];
         return this;
      }
 }
 class Robot extends Drawable{
   constructor(options){
      super(options.eventName);
      this.x=options.x||0,
      this.y=options.y||0,
      this.angle1=options.angle1||0,
      this.angle2=options.angle2||0,
      this.angle3=options.angle3||0,
      this.k=options.k||0,
      this.scale=options.scale||0,
      this.v=options.v,
      this.frames=options.frames,
      // this.isRotateZ=options.isRotateZ||false,
      this.grabTarget=options.grabTarget||null,
      this.elementParent=this.createRobotHTML(options.elementId);
      this.initializeCanvasHTML(this.elementParent);

   } 
   createRobotHTML(elId){
      var x=document.createElement('div');
      x.id=elId;
      var tare1=document.getElementById('tare1');
      var el=document.body.insertBefore(x,tare1); 
      return el;
            
   }
   createCanvasByClassName(className){
      var element=document.createElement('canvas');
      setAttributes(element,{"class":className,'width':"1300",'height':"800",'style':"position:absolute"});
      return element;
   }
   initializeCanvasHTML(element){
      var robotElements=['shoulder','secondShoulder','thirdShoulder','grab1','grab2','grabShoulderConnector','dependedGrab1','dependedGrab2'];
      this.robot=new Map();
      robotElements.forEach(function(item){
         var child=this.createCanvasByClassName(item);
         this.robot.set(item,child);
         element.appendChild(child);
      }.bind(this));
      document.body.appendChild(element);
   }
   setGrabSync(target){
      setTimeout(function(){
         this.grabTarget=target;
         this.countQueue--;
         if(this.countQueue==0){
            alert('hello there');
         }
      }.bind(this),this.allTime);
      this.countQueue++;
      return this;
   }
   draw(){
      // var heightShoulder=this.isRotateZ?Math.abs(108/Math.cos(this.angle1.degree())):150;
      var shoulder=new Rectangle(this.x,this.y,25,150,this.robot.get('shoulder'),this.angle1,'orange',this.scale);
      shoulder.draw();   

      var secondShoulder=new Rectangle(this.x,this.y,23,150,this.robot.get('secondShoulder'),this.angle2,'orange',this.scale);
      secondShoulder.connectToRect(shoulder);
      secondShoulder.draw();
   
      var thirdShoulder=new Rectangle(this.x,this.y,20,40,this.robot.get('thirdShoulder'),this.angle3,'orange',this.scale);
      thirdShoulder.connectToRect(secondShoulder);
      thirdShoulder.draw();
   
      var   grip1Angle=30+this.k*10+this.angle3,
            grip2Angle=-30-this.k*10+this.angle3,
            dependedGrip1Angle=-30+this.k*50+this.angle3,
            dependedGrip2Angle=30-this.k*50+this.angle3;
   
   
      var grab1=new Rectangle(this.x,this.y,7,60,this.robot.get('grab1'),grip1Angle,'grey',this.scale);
      grab1.connectToRect(thirdShoulder);
      grab1.draw();
   
      var grab2=new Rectangle(this.x,this.y,7,60,this.robot.get('grab2'),grip2Angle,'grey',this.scale);
      grab2.connectToRect(thirdShoulder);
      grab2.draw();

      var drawArc=function(r,context){
         var ctx=context.getContext('2d');
         ctx.fillStyle='darkorange';
         ctx.beginPath();
         ctx.arc(0,0,r*this.scale,0,2*Math.PI);
         ctx.fill();
         ctx.stroke();
      }.bind(this);

      drawArc(25,this.robot.get('shoulder'));
      drawArc(20,this.robot.get('secondShoulder'));
      drawArc(17,this.robot.get('thirdShoulder'));
   
      var grabShoulderConnector=new Rectangle(this.x,this.y,20,20,this.robot.get('grabShoulderConnector'),this.angle3,'grey',this.scale);
      grabShoulderConnector.connectToRect(thirdShoulder);
      grabShoulderConnector.draw();
   
      var dependedGrab1=new Rectangle(this.x,this.y,7,30,this.robot.get('dependedGrab1'),dependedGrip1Angle,'grey',this.scale);
      dependedGrab1.connectToRect(grab1);
      dependedGrab1.draw();
   
      var dependedGrab2=new Rectangle(this.x,this.y,7,30,this.robot.get('dependedGrab2'),dependedGrip2Angle,'grey',this.scale);
      dependedGrab2.connectToRect(grab2);
      dependedGrab2.draw();
      

      if(this.grabTarget!==null){
         this.grabTarget.connectToRect(thirdShoulder);
         this.grabTarget.x+=-38*Math.sin(this.angle3.degree());
         this.grabTarget.y+=38*Math.cos(this.angle3.degree());
         this.grabTarget.angle=this.angle3;
         this.grabTarget.draw();
      }

      

   }  
 }
class Conveyor{
   constructor(x,y,scale=1){
      this.x=x;
      this.y=y;
      this.scale=scale;
      this.currentFrame=0;
      this.allTime=0;
      this.time=600;
   }
   start(){
      this.animation();
   }
   stop(){
      clearInterval(Interval);
   }
   wait(){
      setTimeout(function(){
         this.animation(0);
         // this.allTime+=this.time;
      }.bind(this),
      this.allTime);
      this.allTime+=this.time;
   }
   nextStep(){
      this.wait();
      
   }
   animation(currentFrame){
      var width = 326,
      height = 47,
      frames = 5,          
      canvas = document.getElementById("myCanvas"),
      x=this.x,
      y=this.y,
      scale=this.scale;
      
      var ctx = canvas.getContext("2d");
      var image = new Image();
      image.src = '~/../imgs/conveyor.png';
      
      var draw = function() {
      ctx.clearRect(x, y, width*scale, height*scale);
      ctx.drawImage(image, 0, height * currentFrame, width, height-2, x, y, width*scale, height*scale);
      
      if (currentFrame == frames) {
         clearInterval(interval);
      } else {
         currentFrame++;
      }
      }
      var interval=setInterval(draw, 100);
   }
}
class Press{
   constructor(x,y,scale){
      this.x=x,
      this.y=y,
      this.scale=scale
   }
   drawFrame(currentFrame=0){
      
      var x=898,
      y=298,
      scale=0.65;

      var canvas = document.getElementById("press");   
      var ctx = canvas.getContext("2d");
      var image = new Image();
      image.src = '~/../imgs/press.png';
      ctx.clearRect(x, y, 278*scale, 505*scale);   
      image.onload=function(){
         var width = 68,
         height = 120,   
         sx=64,
         sy=519,
         dy=3;
      
      
         ctx.drawImage(image, sx, sy, width, height, x+63*scale, y+224*scale+dy*scale*currentFrame, width*scale, height*scale);  
         

         var width = 278,
         height = 505,   
         sx=0,
         sy=0;  

         ctx.drawImage(image, sx, sy, width, height, x, y, width*scale, height*scale);
      }



   }
   extrude(){
      clearInterval(this.firstFrame);
      var isMoveDown=true,
          frames=15,
          currentFrame=0;
      var draw=function(){
         this.drawFrame(currentFrame);
         if(currentFrame==0&&!isMoveDown)
         {
            clearInterval(interval);
            var event=new Event('pressFinished');
            window.dispatchEvent(event);
         }
         if (currentFrame == frames) {
            isMoveDown=false;
         } 
         if(isMoveDown){
            currentFrame++;
         }
         else{
            currentFrame--;
         }   
      }.bind(this);
      var interval=setInterval(draw, 30);
      
   }
}
function animation(){
   var width = 326,
   height = 47,
   frames = 5,    
   currentFrame = 0,
   canvas = document.getElementById("myCanvas"),
   x=475,
   y=530,
   scale=0.65;
   
   var ctx = canvas.getContext("2d");
   var image = new Image();
   image.src = '~/../imgs/conveyor.png';
   
   var draw = function() {
   ctx.clearRect(x, y, width*scale, height*scale);
   ctx.drawImage(image, 0, height * currentFrame, width, height-2, x, y, width*scale, height*scale);
   
   if (currentFrame == frames) {
     clearInterval(interval);
     alert('success');
   } else {
     currentFrame++;
   }
   }
   var interval=setInterval(draw, 100);
}
function setAttributes(el, attrs) {
   for(var key in attrs) {
     el.setAttribute(key, attrs[key]);
   }
 }