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

var intervalID = 0
// Action is used to determine whether an action is currently being performed 
var action = 0

/*
    ! Main function for skill

    Begins the action

    skillName - name of the skill initiated
    itemID - ID of the item that is to be added
*/

function beginSkillAction(skillName, itemID){
    
    let abTitle = document.getElementById("ab-title");
    let abSkillIcon = document.getElementById("ab-skill-icon");
    let abProgressBarInner = document.getElementById("ab-progress-bar-inner");
    let abItemIcon = document.getElementById("ab-item-icon");
    let abItemName = document.getElementById("ab-item-name");
    let abLevel = document.getElementById("ab-level"); 

    if(skillName == 'special'){
        
    } else {
        abTitle.innerHTML = skillName
        abSkillIcon.setAttribute("src", "./media/sprites/sidebarIcons/" + skillName + ".png");
        abSkillIcon.style.height = 64;
        abSkillIcon.style.width = 64;
        abItemIcon.setAttribute("src", "./media/sprites/items/" + skillName + "/" + itemID % 1000 +".png");
        //restart the animation
        abProgressBarInner.style.animation = "none";
        abProgressBarInner.offsetHeight;
        abProgressBarInner.style.animation = null;
        abItemName.innerHTML = findItemName(itemID)
        abLevel.innerHTML = 'Level 99'
    }
    
    //update actionbar
    let actionBar = document.getElementById("action-bar");
    actionBar.style.display = "flex";
    if(action == 1){
        endSkillAction();
        action = 0
    } else {
        intervalID = setInterval(beginAction, 3000, itemID);
        action = 1
    }
    
    
}

/*
    ! Skill functions
    Add item at after scheduling if possible to reduce potential lag for item lookup function
*/

function beginAction(itemID) {
    console.log("Reached")
    //Add the item
    addItem(itemID, 1);
    //restart the animation
    let abProgressBarInner = document.getElementById("ab-progress-bar-inner");
    abProgressBarInner.style.animation = "none";
    abProgressBarInner.offsetHeight;
    abProgressBarInner.style.animation = null;
}

//Removes the action bar and stops the skill
function endSkillAction(){
    //update actionbar
    clearInterval(intervalID);
    let actionBar = document.getElementById("action-bar");
    actionBar.style.display = "none";
    intervalID = 0
}