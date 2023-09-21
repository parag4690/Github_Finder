const profilePic = document.querySelector("[data-profilePic]");
const dataName = document.querySelector("[data-name]");
const dataDob = document.querySelector("[data-dob]");
const loginName = document.querySelector("[data-loginName]");
const dataBio = document.querySelector("[data-bio]");
const input = document.querySelector("[data-input]");
const repos = document.querySelector("[data-repos]");
const followers = document.querySelector("[data-followers]");
const following = document.querySelector("[data-following]");
const searchBtn = document.querySelector("[data-btn]");
const loading = document.querySelector("[data-loading]");
const dataContainer = document.querySelector("[data-container]");
const cross = document.querySelector("[data-cross]");
const darkMode = document.querySelector("[data-darkMode]");
const wrapper = document.querySelector("[data-wrapper]");
const darkCon = document.querySelector(".darkModes");
const lightCon = document.querySelector(".lightModes");
const lightMode = document.querySelector("[data-lightMode]");
const heading = document.querySelector(".heading");
const searchBox = document.querySelector(".searchbox");
const infoContainer = document.querySelector(".infoContainer");
let dob = document.querySelectorAll(".dob");
const info =document.querySelector(".info");
const getRepos = document.querySelector("[data-getRepositeries]");
const repositeries = document.querySelector("[data-repositeries]");
const dataNot = document.querySelector("[data-not-found]");
// render the data 

document.querySelector(".cross").style.display="none";
let  i= true;
let miniLength = 0;
let res;


async function renderingData() {
    // fetch the data from github api
    let user = input.value;
    if(user == '') {
        user = "parag4690";
    }
    try {
        loading.style.display = "inline-block";
        dataContainer.style.display="none";
        const response = await fetch(`https://api.github.com/users/${user}`);
        const data = await response.json();
        loading.style.display="none";
        if (!response.ok) {
            // loading.src = 
            dataNot.style.display="inline-block";
            throw new Error('Network response was not ok');
        }
        dataNot.style.display="none";
        dataContainer.style.display="flex";

        // Use the data as needed
        console.log(data); 
        profilePic.src=data?.avatar_url;
        dataName.innerText = data?.name;
        const date = new Date(data?.created_at);
        dataDob.innerText = `Joined  ${date.getDate()>9?date.getDate():"0"+date.getDate()} ${date.getMonth()>9?date.getMonth():"0"+date.getMonth()} ${date.getFullYear()}`;
        loginName.innerText='@' + data?.login;
        loginName.href=`https://github.com/${user}`
        dataBio.innerText = data?.bio;
        repos.innerText = data?.public_repos;
        followers.innerText = data?.followers;
        following.innerText = data?.following;
        
      

    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error here, such as displaying an error message to the user
    }
}

searchBtn.addEventListener("click" , ()=>{

    renderingData();
});
cross.addEventListener("click" , ()=>{
    input.value="";
    document.querySelector(".cross").style.display="none";
    repositeries.style.display="none";
    renderingData();
})
renderingData();

function darking(){
    const Repo =  document.querySelectorAll(".designRepo");
    // console.log("yes");
   for(let i=0; i<Repo.length; i++){
     Repo[i].classList.add("active");
     
   }
   for(let i=0; i<dob.length; i++){

    dob[i].classList.add("active");
}
}

darkMode.addEventListener("click" , ()=>{
    i=false;
   wrapper.classList.add("active");
   darkCon.classList.add("active");
   lightCon.classList.add("active");
   heading.classList.add("active");
   searchBox.classList.add("active");
   input.classList.add("active");
   infoContainer.classList.add("active");
   repositeries.classList.add("active");
   darking();
   
   info.classList.add("active");
});

lightMode.addEventListener("click" , ()=>{
    i=true;
    wrapper.classList.remove("active");
    darkCon.classList.remove("active");
    lightCon.classList.remove("active");
    heading.classList.remove("active");
    searchBox.classList.remove("active");
    input.classList.remove("active");
    infoContainer.classList.remove("active");
    repositeries.classList.remove("active");
    const Repo =  document.querySelectorAll(".designRepo");
    for(let i=0; i<Repo.length; i++){
      Repo[i].classList.remove("active");
    }
    for(let i=0; i<dob.length; i++){

        dob[i].classList.remove("active");
    }
    info.classList.remove("active");
 })

 input.addEventListener("change" , ()=> {
    repositeries.style.display="none";
    if(input.value==''){
        document.querySelector(".cross").style.display="inline";
    }
    else{
        document.querySelector(".cross").style.display="inline";
    }
 });

 function breaking(mini , maxi , results){
    mini = Math.max(0 , parseInt(mini));
    res=results;
    miniLength = mini-1;
    console.log(" maxi = " , maxi , " mini = " , mini);
    const fragment = document.createDocumentFragment();

     for(let i = maxi; i>=mini; i--){
            console.log(i);
            let eleName = results[i]?.name;
            let createdAt = results[i]?.created_at
            let desc = results[i]?.description;
            let url = results[i]?.html_url;
            const newEle =document.createElement("div");
            const parent = document.createElement("div");
            const semi = document.createElement("div");
            const head = document.createElement("a");
            const image = document.createElement("img");
            image.src = "images/website-icon.svg";
            image.classList.add("h-[17px]")
            head.classList.add("font-bold" , "text-xl" , "text-[#0079ff]" , "cursor-pointer");
            head.innerText = eleName;
            head.href=url;
            const date = new Date(createdAt);
            const creat = document.createElement("p");
            creat.innerText = `Created ${date.getDate()>9?date.getDate():"0"+date.getDate()} ${date.getMonth()>9?date.getMonth():"0"+date.getMonth()} ${date.getFullYear()}`;
        //   put these
            creat.classList.add("hidden" ,"md:inline" , "lg:inline");
            semi.appendChild(image);
            semi.appendChild(head);
            semi.classList.add("flex" , "gap-2" , "items-center");
            parent.appendChild(semi);
            creat.classList.add("text-sm" , "text-[grey]" , "dob");
            parent.appendChild(creat);
            const description = document.createElement("p");
            if(desc==undefined){
                desc = "Efficient project management and development practices lead to successful outcomes by promoting collaboration, adaptability, and continuous improvement.";

            }
            description.classList.add("text-[1rem]" , "text-[grey]");
            description.innerText = desc;
            newEle.appendChild(parent);
            newEle.appendChild(description);
            fragment.appendChild(newEle);
            newEle.classList.add("designRepo");
            
            parent.classList.add("creation");
     }
    //  return fragment;
    if(mini==0){
        const newEle = document.createElement("div");
        newEle.innerText = "Clear All";
        newEle.classList.add("text-[#60abff]" , "underline" , "cursor-pointer" , "self-end" );
        newEle.onclick=clearAll;
        fragment.appendChild(newEle);
    }
    else{
        const newEle = document.createElement("div");
        newEle.innerText = "More Repo";
        newEle.classList.add("text-[#60abff]" , "text-md" , "underline" , "cursor-pointer" , "self-end" , "more" );
        newEle.onclick=MoreRepo;
        fragment.appendChild(newEle);
    }
    repositeries.appendChild(fragment);
    repositeries.style.display="flex";
    dob=document.querySelectorAll(".dob");
    console.log(dob);
    if(i==false){
        console.log("edher to dekhlo ");
        darking();
    }
 }

 
 function clearAll(){
    repositeries.style.display="none";
    repositeries.innerHTML = "";
 }

async function MoreRepo(){
      let maxi = miniLength; 
      let mini = miniLength-4;
      breaking(mini , maxi , res);
      document.querySelector(".more").remove();
 }
 
 async function getRepositery(){
    let user = input.value;
    // const fragment = document.createDocumentFragment();
    if(user == ''){
        user = "parag4690";
    }
    try{
        const fetchRepos = await fetch(`https://api.github.com/users/${user}/repos`);
        const repoData = fetchRepos.json(); // it returns promise so we have to use then to acces the objects
    
        repositeries.innerHTML="";
        repoData.then((results)=>{
            let length = parseInt(results.length-1);
            if(length<=4){
               breaking(0 , length , results);
               return;
            }
            else{
                
               maxi = length; mini = length-4;
               breaking(mini , maxi , results);
               return;
            }

        });
    }
    catch(e){
        
    }
}


// getRepositery();

 getRepos.addEventListener("click" , ()=>{
    console.log("clicked");
    getRepositery();
 });
