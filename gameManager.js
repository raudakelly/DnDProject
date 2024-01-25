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


/*
    ! Main function for skill

    Begins the action
*/

function beginSkillAction(skillName, itemID){
    let abTitle = document.getElementById("ab-title");
    let abSkillIcon = document.getElementById("ab-skill-icon");
    let abProgressBarInner = document.getElementById("ab-progress-bar-inner");
    let abItemIcon = document.getElementById("ab-item-icon");

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
    }
    //update actionbar
    let actionBar = document.getElementById("action-bar");
    actionBar.style.display = "flex";

    /*
    intervalID = setInterval(function() {
        //Add the item
        addItem(itemID, 1);
        //restart the animation
        abProgressBarInner.style.animation = "none";
        abProgressBarInner.offsetHeight;
        abProgressBarInner.style.animation = null;
    }, 3000);*/
}

/*
    ! Skill functions
    Add item at after scheduling if possible to reduce potential lag for item lookup function
*/



//Removes the action bar and stops the skill
function endSkillAction(){
    //update actionbar
    clearInterval(intervalID);
    let actionBar = document.getElementById("action-bar");
    actionBar.style.display = "none";
}