/*
    Game loop:
    Control UI elements
    Add any items to inventory
    Add XP
    Breakpoint when user selects different action

*/
console.log((7 / 10) | 0)
/*
    Info table
    list of IDs and corresponding data for the skills
    use item IDs

*/


//Arrays containing the XP values for each action
let woodcXp = [10,20,30,40,50,60,70,80];
let miningXp = [10,20,30,40,50,60,70,80];
let smithingXp = [10,20,30,40,50,60,70,80];
let fishingXp = [10,20,30,40,50,60,70,80];


/*
    ! Main function for skill

    Begins the action
*/

function beginSkillAction(skillName, action){
    let abTitle = document.getElementById("ab-title");
    let abSkillIcon = document.getElementById("ab-skill-icon");
    let abSkillProgress = document.getElementById("ab-skill-progress");
    let abProgressBar = document.getElementById("ab-progress-bar");
    let abProgressBarInner = document.getElementById("ab-progress-bar-inner");
    let abItemIcon = document.getElementById("ab-item-icon");
    let abItemQuantity = document.getElementById("ab-item-quantity");

    if(skillName == 'woodcutting'){
        abTitle.innerHTML = "Woodcutting"
        abSkillIcon.setAttribute("src", "./media/sprites/sidebarIcons/tree.png");
        abSkillIcon.style.height = 64;
        abSkillIcon.style.width = 64;
        abItemIcon.setAttribute("src", "./media/sprites/items/woodcutting/3.png");
        //restart the animation
        abProgressBarInner.style.animation = "none";
        abProgressBarInner.offsetHeight;
        abProgressBarInner.style.animation = null;
    } else if(skillName == 'mining'){
        abTitle.innerHTML = "Mining"
    } else if(skillName == 'smithing'){
        abTitle.innerHTML = "Smithing"
        //schedule skill event
    } else if(skillName == 'fishing'){
        abTitle.innerHTML = "Fishing"
        //schedule skill event
    }
    //update actionbar
    let actionBar = document.getElementById("action-bar");
    actionBar.style.display = "flex";
}

/*
    ! Skill functions
*/

function woodcAction(action){
    
}

function miningAction(action){

}

function smithingAction(action){

}

function fishingAction(action){

}