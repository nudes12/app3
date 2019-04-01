//No of Days take by the planets to cooplete one
//Revolution Rounded to closest Integer
const orbitalPeriod = [
    88 ,
    225 ,
    365 ,
    687 ,
    4333 ,
    10756 ,
    30688 ,
    60193 
];
//No. of Miliseconds in a 24 Hours
const ms = 86400000 ;

function element(id){
    return document.getElementById(id);
}
//Name of Months in Planet Earth
function init(){
    var month = [
        "January" ,
        "February" ,
        "March" ,
        "April" ,
        "May" ,
        "June" ,
        "July" ,
        "August" ,
        "September" ,
        "October" ,
        "November" ,
        "December"
    ] ;
    var d = element("date");
    var m = element("month");
    var y = element("year");
    
    for(var i=0;i<12;i++){
        m.innerHTML += 
        `<option value=\"${i}\">
             ${month[i]}
         <\/option>` ;
    }
    
    for(var i=0;i<31;i++){
         d.innerHTML += 
        `<option value=\"${i+1}\">
             ${i+1}
         <\/option>` ;
    }
    
    for(var i=2019;i>1950;i--){
        y.innerHTML += 
        `<option value=\"${i}\">
             ${i}
         <\/option>` ;
    }
    
    setDate();
}

//Filters valid Date according to Selected Month
function setDate(){
    var d = element("date");
    var m = element("month");
    var y = element("year");
    
    d.options[29].disabled = false ;
    d.options[30].disabled = false ;
    d.options[31].disabled = false ;

    if(m.value.match(/(3|5|8|10)/)){
        d.options[31].disabled = true ;
        if(d.value === "31"){
            d.selectedIndex = 0;
        }
    }
    else if(m.value === "1"){
        if(y.value === ""){
            d.options[29].disabled = true ;
            d.options[30].disabled = true ;
            d.options[31].disabled = true ;
            if(d.value === "29"){
                d.selectedIndex = 0;
            }
        }
        else if(parseInt(y.value)%4===0){
            d.options[30].disabled = true ;
            d.options[31].disabled = true ;
        }
        else {
            d.options[29].disabled = true ;
            d.options[30].disabled = true ;
            d.options[31].disabled = true ;
            if(d.value === "29"){
                d.selectedIndex = 0;
            }
        }
        
        if(d.value==="31" || d.value==="30"){
            d.selectedIndex = 0;
        }
    }
}

//Opens card to show more Details
function openC(card){
    var c = document.getElementsByClassName("card") ;
    var flag = card.classList.contains("open");
    for(var i=0;i<c.length;i++){
        c[i].classList.remove("open");
    }
    if(flag!==true){
        card.classList.add("open");
    }
}

//Back button
function back(){
    var rp = element("result");
    rp.classList.add("hide");
    rp.classList.remove("show");
    var c = document.getElementsByClassName("card") ;
    for(var i=0;i<c.length;i++){
        c[i].classList.remove("open");
    }
}

//Submitting User Input
function submit(){
    var d = element("date");
    var m = element("month");
    var y = element("year");
    
    if(d.value==="" || m.value==="" || y.value===""){
       alert("Please Don't Leave Empty Fields");
       return 0 ;
    }
    
    var day = new Date(y.value,m.value,d.value);
    var age = calcAge(day);
    var rp = element("result");
    rp.classList.remove("hide");
    rp.classList.add("show");
    showAge(age);
}

//Calculates Age of User in all planets

/*
               HOW ?
            
      Number of days you lived
             Divided By
        No of Days in a year
         (in target Planet)
*/

function calcAge(day){
    var age = [] ;
    var td = new Date();
    var d ;
    d = (td.getTime() - day.getTime())/ms ;
    
    for(var i=0;i<8;i++){
        var a = d/orbitalPeriod[i];
        age.push(a.toFixed(2));
    }
    return age ;
}

//Displays Final Result

function showAge(age){
    var lbl ;
    lbl=document.getElementsByClassName("age");
    var j=0;
    for(var i=0;i<lbl.length;i+=2){
        lbl[i].innerHTML = age[j] ;
        lbl[i+1].innerHTML = age[j] ;
        j++;
    }
}
