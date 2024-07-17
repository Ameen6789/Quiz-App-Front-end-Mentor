
var toggle_button=document.getElementById("toggle")
if (localStorage.getItem("darkMode")==="enabled"){
    toggle_button.checked=true
} 
document.getElementById("toggle").addEventListener("change",function(){
    document.body.classList.toggle("dark-mode")

if (document.body.classList.contains("dark-mode")){
    localStorage.setItem("darkMode","enabled")
}
else{
    localStorage.setItem("darkMode","disabled")
}
})
window.addEventListener("load",function(){
    if (localStorage.getItem("darkMode")==="enabled"){
        document.body.classList.add("dark-mode")
    }
})





function initialized(element){
    
    localStorage.setItem('question-no','1');
    localStorage.setItem('points','0');
    var topic=element.textContent.trim()
    localStorage.setItem("topic",topic)
    fetch("data.json").then(res=>res.json()).then(data=>{
        
        
        localStorage.setItem("data",JSON.stringify(data))
    
    })
    
    
}
function selected(element){

var selected_option=document.querySelector(".selected")
if (selected_option){
    selected_option.classList.remove("selected")
}
element.classList.add("selected")
}


function load_contents(){
        
    var question_no=parseInt(localStorage.getItem("question-no"))
    document.getElementById("q-no").innerHTML=question_no
    var progress_bar=document.getElementById("progress_bar")
    progress_bar.style.width=(question_no*10)+"%"
    

    if (localStorage.getItem("topic")==="HTML"){
        var data=JSON.parse(localStorage.getItem("data"))["quizzes"][0]
        
        document.getElementById("question").textContent=String(data["questions"][question_no-1]["question"])
        document.getElementById("optionA").textContent=String(data["questions"][question_no-1]["options"][0])
        document.getElementById("optionB").textContent=String(data["questions"][question_no-1]["options"][1])
        document.getElementById("optionC").textContent=String(data["questions"][question_no-1]["options"][2])
        document.getElementById("optionD").textContent=String(data["questions"][question_no-1]["options"][3])
            }

    if (localStorage.getItem("topic")==="CSS"){
        document.getElementById("logo").src="assets/images/icon-css.svg"
        document.getElementById("logo-background").style.backgroundColor="aquamarine"
        document.getElementById("topic-text").textContent="CSS"
        var data=JSON.parse(localStorage.getItem("data"))["quizzes"][1]
        
        document.getElementById("question").textContent=String(data["questions"][question_no-1]["question"])
        document.getElementById("optionA").textContent=String(data["questions"][question_no-1]["options"][0])
        document.getElementById("optionB").textContent=String(data["questions"][question_no-1]["options"][1])
        document.getElementById("optionC").textContent=String(data["questions"][question_no-1]["options"][2])
        document.getElementById("optionD").textContent=String(data["questions"][question_no-1]["options"][3])
            }

    if (localStorage.getItem("topic")==="JavaScript"){
        document.getElementById("logo").src="assets/images/icon-js.svg"
        document.getElementById("logo-background").style.backgroundColor="aliceblue"
        document.getElementById("topic-text").textContent="JavaScript"
        var data=JSON.parse(localStorage.getItem("data"))["quizzes"][2]
        
        document.getElementById("question").textContent=String(data["questions"][question_no-1]["question"])
        document.getElementById("optionA").textContent=String(data["questions"][question_no-1]["options"][0])
        document.getElementById("optionB").textContent=String(data["questions"][question_no-1]["options"][1])
        document.getElementById("optionC").textContent=String(data["questions"][question_no-1]["options"][2])
        document.getElementById("optionD").textContent=String(data["questions"][question_no-1]["options"][3])
            }

    if (localStorage.getItem("topic")==="Accessibility"){
        document.getElementById("logo").src="assets/images/icon-accessibility.svg"
        document.getElementById("logo-background").style.backgroundColor="pink"
        document.getElementById("topic-text").textContent="Accessibility"
        var data=JSON.parse(localStorage.getItem("data"))["quizzes"][3]
        
        document.getElementById("question").textContent=String(data["questions"][question_no-1]["question"])
        document.getElementById("optionA").textContent=String(data["questions"][question_no-1]["options"][0])
        document.getElementById("optionB").textContent=String(data["questions"][question_no-1]["options"][1])
        document.getElementById("optionC").textContent=String(data["questions"][question_no-1]["options"][2])
        document.getElementById("optionD").textContent=String(data["questions"][question_no-1]["options"][3])
            }
    

    
    
}


function submit_answer(){
    
    var question_no=parseInt(localStorage.getItem("question-no"))
    if (question_no<=10)
    question_no++
    var points=parseInt(localStorage.getItem("points"))
    
    
    if (question_no>10){
        localStorage.setItem("question-no",10)
    }
        
    else{
        localStorage.setItem("question-no",question_no)
    }
    
    var selected_option=document.querySelector(".selected")
    
    if (selected_option){
        var correct_answer;
        if (localStorage.getItem("topic")==="HTML"){
            var data=JSON.parse(localStorage.getItem("data"))["quizzes"][0]
            correct_answer=String(data["questions"][question_no-2]["answer"])

        }
        else if (localStorage.getItem("topic")==="CSS"){
            var data=JSON.parse(localStorage.getItem("data"))["quizzes"][1]
            correct_answer=String(data["questions"][question_no-2]["answer"])

        }
        else if (localStorage.getItem("topic")==="JavaScript"){
            var data=JSON.parse(localStorage.getItem("data"))["quizzes"][2]
            correct_answer=String(data["questions"][question_no-2]["answer"])

        }
        else if (localStorage.getItem("topic")==="Accessibility"){
            var data=JSON.parse(localStorage.getItem("data"))["quizzes"][3]
            correct_answer=String(data["questions"][question_no-2]["answer"])

        }
        
        if (selected_option.children[1].textContent.trim()===correct_answer.trim()){
            selected_option.setAttribute("style","border-color:green")
            var img=document.createElement("img")
            img.src="confirm-icon.svg"
            selected_option.appendChild(img)
            points+=1
            localStorage.setItem("points",points)

        }
        else{
            
            childs=selected_option.parentElement.querySelectorAll("*")
            
            childs.forEach(child => {
                if (child.tagName==="P" && child.textContent===correct_answer){
                    
                    var img=document.createElement("img")
                    img.src="confirm-icon.svg"
                    child.parentElement.appendChild(img)
                    
                    
                }
            });
            selected_option.setAttribute("style","border-color:red")
            var img=document.createElement("img")
            img.src="delete-icon.png"
            selected_option.appendChild(img)

        }
        
      
    }
    else{
        document.getElementById("option-error").style.display="block"
    }
    
      
    
    if (question_no<=10){
        if (selected_option){
        var options=document.getElementsByClassName("option")
        for (let i in options){
            options[i].onclick=null;
        }
        
        
        var submit_button=document.getElementById("submit-answer")
        submit_button.innerHTML="Next Question"
        submit_button.onclick=function(){
            window.location.href="question.html"
        }
        
    }
}
        
    else{
        if (selected_option){
            var submit_button=document.getElementById("submit-answer")
            submit_button.innerHTML="See Results"
            submit_button.onclick=function(){
                window.location.href="score.html"
            }  
         
        }   
    }
    
    
}

function show_score(){
    var points=localStorage.getItem("points")
    document.getElementById("final-score").textContent=points
}
function play_again(){
    window.location.href="index.html"
}