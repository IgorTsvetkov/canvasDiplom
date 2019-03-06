// class Drawable{
//     draw(x,y){

//     }
//     attachContext(ctx){
//         this.canvas=document.getElementById(ctx);
//         this.ctx=this.canvas.getContext('2d');
//      }
// }
class Rectangle{
    constructor(x,y,width,height,canvas,angle=0,fillStyle='orange',scale=1,lineWidth=1){
       this.x=x;
       this.y=y;   
       this.width=width*scale;
       this.height=height*scale;
       this.angle=angle;
       this.fillStyle=fillStyle;
       this.lineWidth=lineWidth;

       this.allTime=0;       
       this.queue=[];
       this.event=null;
       this.isFirstMove=true;
       this.eventName='movementFinished';
       this.attachContext(canvas);
       this.draw(x,y);   
    }
    draw(x,y){ 
        this.ctx.restore();
        this.ctx.lineWidth=this.lineWidth;
        this.ctx.fillStyle=this.fillStyle;
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.width);
        this.ctx.save();
        this.ctx.translate(this.x,this.y);
        this.ctx.rotate((this.angle).degree());
        this.ctx.fillRect(-this.width/2,0,this.width,this.height);
        this.ctx.strokeRect(-this.width/2,0,this.width,this.height);    
        this.fps=100
    }
    attachContext(canvas){
       this.canvas=canvas;       
       this.ctx=canvas.getContext('2d');
    }  
    moveTo(x2,y2,v,angle2=0,fillStyle=this.fillStyle){
      this.fillStyle=fillStyle;
      var dx=x2-this.x,
      dy=y2-this.y,
      s=Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)),
      t=Math.floor(s/v*this.fps)/this.fps,
      vx=dx/t,
      vy=dy/t,
      frames=t*this.fps,      
   // Vrotate=(angle2-this.angle)/t,     
      currentFrame=0;

      var  changePosition=function(){         
         if(frames>=currentFrame){
              this.x+=vx/this.fps; 
              this.y+=vy/this.fps; 

            this.draw(this.x,this.y);
            // this.ctx.rotate((Vrotate).degree());
            currentFrame++;
         }
         else{
            clearInterval(interval);            
            this.nextMove();
         }
         
      }.bind(this);    
      var interval=setInterval(changePosition,10);
   }     
    syncMoveTo(...args){
      this.queue.push({...args});

      if(this.isFirstMove){
        this.nextMove();
        this.isFirstMove=false;
      }
      return this;
   }
   nextMove(){
      if(this.queue.length>0)
      {
      const argsObj=this.queue.shift();
      
      this.moveTo(...Object.values(argsObj));
      }
      else{
         this.event=new Event(this.eventName);
         window.dispatchEvent(this.event);
      }
   };
    connectToRect(rect){
        this.x=rect.x-rect.height*Math.sin((rect.angle).degree());
        this.y=rect.y+rect.height*Math.cos((rect.angle).degree());
     }
 }
 Number.prototype.degree=function(){
    return this*Math.PI/180;
 }
 function getContext2D(contextName){
    var c=document.getElementById(contextName);
    return c.getContext('2d');
 }