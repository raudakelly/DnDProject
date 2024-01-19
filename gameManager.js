/*
    Game loop:
    Control UI elements
    Add any items to inventory
    Add XP
    Breakpoint when user selects different action

*/

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
    if(skillName == 'woodcutting'){
        woodcAction(action)
    } else if(skillName == 'mining'){
        console.log("Mining: " + findItemName(action))
    } else if(skillName == 'smithing'){
        //schedule skill event
    } else if(skillName == 'fishing'){
        //schedule skill event
    }
    //update actionbar
    let actionBar = document.getElementById("action-bar");
    actionBar.style.display = "block";
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