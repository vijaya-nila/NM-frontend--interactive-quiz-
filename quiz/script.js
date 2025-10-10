const splash=document.getElementById("splash");
const profile=document.getElementById("profile");
const dashboard=document.getElementById("dashboard");
const quiz=document.getElementById("quiz");
const result=document.getElementById("result");
const profilePage=document.getElementById("profilePage");

const questionText=document.getElementById("question");
const optionsBox=document.getElementById("options");
const scoreText=document.getElementById("score");
const userSummary=document.getElementById("userSummary");
const welcomeUser=document.getElementById("welcomeUser");
const warn=document.getElementById("warn");

const pName=document.getElementById("pName");
const pQuizzes=document.getElementById("pQuizzes");
const pAvg=document.getElementById("pAvg");
const pProgress=document.getElementById("pProgress");
const wave=document.getElementById("wave");
const waveText=document.getElementById("waveText");

let userName="";let currentQuestion=0;let score=0;
let selectedSet=[];let totalQuizzes=0;let totalScore=0;

const quizSets={
  school:[
    {q:"5 + 3 = ?",o:["6","7","8","9"],a:2},
    {q:"Which is a fruit?",o:["Carrot","Apple","Potato","Onion"],a:1},
    {q:"Sun rises in?",o:["West","East","North","South"],a:1}
  ],
  college:[
    {q:"HTML stands for?",o:["Hyper Text Markup Language","High Text Machine Learning","Hyper Transfer Mark Language","Home Tool Markup Language"],a:0},
    {q:"CSS is used for?",o:["Database","Styling","Scripting","Framework"],a:1},
    {q:"JS is?",o:["Backend","Markup","Styling","Scripting"],a:3}
  ],
  govt:[
    {q:"RBI stands for?",o:["Reserve Bank of India","Rural Bank of India","Royal Bank of India","Regional Bank of India"],a:0},
    {q:"Capital of India?",o:["Chennai","Delhi","Mumbai","Kolkata"],a:1},
    {q:"UPSC stands for?",o:["Union Public Service Commission","United Public Service Corporation","Urban Police Service Commission","Unique Public Sector Council"],a:0}
  ]
};

setTimeout(()=>{
  splash.classList.remove("active");
  profile.classList.add("active");
},2500);

function validateProfile(){
  const input=document.getElementById("username").value.trim();
  if(input===""){warn.style.display="block";return;}
  userName=input;warn.style.display="none";
  profile.classList.remove("active");
  dashboard.classList.add("active");
  pName.textContent=userName;
  welcomeUser.innerHTML=`Hi <b>${userName}</b> 👋<br>Choose your category to start the quiz!`;
}

function selectCategory(cat){
  selectedSet=quizSets[cat];currentQuestion=0;score=0;
  dashboard.classList.remove("active");
  quiz.classList.add("active");
  document.body.style.background=cat==="school"
    ?"linear-gradient(270deg,#f6d365,#fda085)"
    :cat==="college"
    ?"linear-gradient(270deg,#89f7fe,#66a6ff)"
    :"linear-gradient(270deg,#a1c4fd,#c2e9fb)";
  document.body.style.backgroundSize="800% 800%";
  document.body.style.animation="bgFlow 10s ease infinite";
  showQuestion();
}
function showQuestion(){
  const q=selectedSet[currentQuestion];
  questionText.textContent=q.q;
  optionsBox.innerHTML="";
  q.o.forEach((opt,i)=>{
    const btn=document.createElement("button");
    btn.textContent=opt;
    btn.onclick=()=>checkAnswer(i);
    optionsBox.appendChild(btn);
  });
}
function checkAnswer(i){
  if(i===selectedSet[currentQuestion].a)score++;
  nextQuestion();
}
function nextQuestion(){
  currentQuestion++;
  if(currentQuestion<selectedSet.length)showQuestion();
  else showResult();
}
function showResult(){
  quiz.classList.remove("active");
  result.classList.add("active");
  scoreText.textContent=`Your Score: ${score}/${selectedSet.length}`;
  userSummary.textContent=`Awesome work, ${userName}! Keep going 🎯`;
  totalQuizzes++;
  totalScore+=(score/selectedSet.length)*100;
  const avg=(totalScore/totalQuizzes).toFixed(1);
  pQuizzes.textContent=totalQuizzes;
  pAvg.textContent=avg+"%";
  pProgress.textContent=avg>=80?"Excellent 🌟":avg>=50?"Good 👍":"Needs Practice 💪";
  animateWave(avg);
}
function goHome(){
  result.classList.remove("active");
  dashboard.classList.add("active");
  document.body.style.background="linear-gradient(270deg,#a18cd1,#fbc2eb,#a1c4fd,#c2e9fb)";
}
function openProfile(){
  dashboard.classList.remove("active");
  profilePage.classList.add("active");
  animateWave(parseFloat(pAvg.textContent));
}
function backToDashboard(){
  profilePage.classList.remove("active");
  dashboard.classList.add("active");
}
function animateWave(val){
  let start=0;
  const interval=setInterval(()=>{
    if(start>=val){clearInterval(interval);}
    else start++;
    let color= start<50 ? 'rgba(255,153,102,0.8)' : start<80 ? 'rgba(255,220,100,0.8)' : 'rgba(102,166,255,0.85)';
    wave.style.background=color;
    wave.style.transform=`translate(-25%,${75-(start/100*75)}%) rotate(${start*3.6}deg)`;
    waveText.textContent=start+"%";
  },20);
}
