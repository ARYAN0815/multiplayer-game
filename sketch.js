var ball;
var database
var position
var score=0
function setup(){
    createCanvas(500,500);
    database=firebase.database()
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballref=database.ref("ball/position")
    ballref.on("value",readPosition)
    var scoreref=database.ref("count")
    scoreref.on("value",readScore)

}

function draw(){
    if(position!==undefined){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
        score++
        changeCount(score)
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
        score++
        changeCount(score)
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
   score++
   changeCount(score)
    }
        else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
        score++
        changeCount(score)
    }
    drawSprites();
    text("score:"+score,100,100);
}
}
function readPosition(data){
position=data.val()
ball.x=position.x
ball.y=position.y

}
function changePosition(x,y){
   database.ref("ball/position").update({
       x:position.x+x,
       y:position.y+y
   })
}
function readScore(data){
score=data.val()
}
function changeCount(score){
database.ref("/").update({
count:score    
})
}