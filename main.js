function main(){

   drawVibroHooper(0,460,0.65);
   inductorAnimation(185,480,0.65);
   drawTable(670,540,0.65);

   var rect=new Rectangle(20,503,20,10,document.getElementById('billet'),0,'grey');
   rect.syncMoveTo(135,503,66) 
      .syncMoveTo(245,515,66)
      .syncMoveTo(400,505,66)
      .syncMoveTo(490,505,66,0,'red')
      .syncMoveTo(505,527,66)
      .syncMoveTo(690,527,66)
      .syncMoveTo(710,551,66,0,'red');
      
   var conveyor=new Conveyor(475,530,0.65);
   var x=0;
   while(x<100){
      conveyor.nextStep();
      x++;
   }

   let robot1=new Robot({
      x:790,
      y:440,
      angle1:145,
      angle2:10,
      k:0.5,
      scale:0.6,
      elementId:'robot1',
      eventName:'robot1finished'
   });
   robot1.draw();

   var billetListener=function(e){
      robot1.syncMoveTo({angle1:117,angle2:0},frames=10,v=6)
         .syncMoveTo(options={k:0.2},frames=10,v=6)
         .setGrabSync(rect)
         .syncMoveTo({angle1:180},frames=10,v=6)
         .syncMoveTo({angle1:280,angle2:-70,angle3:0},frames=10,v=6)
         .setGrabSync(null)
         .syncMoveTo({k:0.6},frames=15,v=6)
         .syncMoveTo({angle1:145,angle2:10,angle3:0},frames=15,v=6);
      }
window.addEventListener('movementFinished',billetListener);

   var press=new Press(898,298,0.65);
   press.drawFrame(); 

   window.addEventListener('robot1finished',function(e){
      press.extrude(); 
   });

   window.addEventListener('pressFinished',function(e){
      robot2.syncMoveTo({angle1:100,angle2:45},frames=10,v=6)
         .setGrabSync(rect)
         .syncMoveTo({k:0.2},frames=10,v=6)          
         .syncMoveTo({angle1:250,angle2:-10},frames=10,v=6)
         .syncMoveTo({k:0.3},frames=10,v=6)
         .setGrabSync(null)
         .syncMoveTo({k:0.6},frames=10,v=6)
   });

   window.addEventListener('robot2finished',function(e){
      robot2.moveTo({angle1:145,angle2:10},frames=10,v=6);
      window.removeEventListener('movementFinished',billetListener);
      // alert(rect.x);
      // alert(rect.y);
      rect.moveTo(1214,580,100);
      window.removeEventListener(this);
   });
   let robot2=new Robot({
      x:1114,
      y:440,
      angle1:145,
      angle2:10,
      k:0.8,
      scale:0.6,
      elementId:'robot2',
      frames:10,
      v:6,
      eventName:'robot2finished'
   });
   robot2.draw();

   drawTareWithText('tare1',790,600,"Брак");
   drawTareWithText('tare2',1150,570,"Тара");
}