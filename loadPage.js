/* 
    $ Class: Loads all the necessary elements and sets up the app for use

    TODO: load character from file
*/

/*
    TODO: add a way of saving the character's progress while they are playing
    TODO: this prevents loss of progress (WARN PLAYERS ABOUT NOT CLEARING CACHE BEFORE SAVING TO SERVER)

*/

/*
    ! Loads each of the options for each skill, builds the necessary HTML elements for each

    Notes:
        Structures containing each skill action 
        Each structure is in order by how it is listed in the skills

    TODO:(when adding a skill)
        add 2 data structures for each skill
        add *5* items to the skillArrayList
*/

// all of the skills have 2 data structures each, 1 for the name of the action, 1 for the level needed

//initialize woodcutting skill
let woodcOptions = ["Tree","Oak","Teak","Cherry","Yew","Ice","Magic","Ebony"];
let woodcLevels = ["1","15","30","45","60","75","90","99"];

//initialize mining skill
let miningOptions = ["Iron","Coal","Silver","Orichalcum","Adamantite","Gold","Mithril","Astraulite"];
let miningLevels = ["1","15","30","45","60","75","90","99"];

//initialize smithing skill
let smithingOptions = ["Iron Bar","Steel Bar","Silver Bar","Orichalcum Bar","Adamantite Bar","Gold Bar","Mithril Bar","Astraulite Bar"];
let smithingLevels = ["1","15","30","45","60","75","90","99"];

//initialize smithing skill
let fishingOptions = ["Blue Gill","Bass","Duckfish","Salmon","Silverfish","Landshark","Diamondfish","Sunfish"];
let fishingLevels = ["1","15","30","45","60","75","90","99"];

/*  List of skills to be initialized, 
        3rd item is the skills container's parent's classname
        4th is the name of the action on the button
        5th item is the folder of sprites for the skill
*/

let skillArrayList = [woodcOptions,woodcLevels,"woodc-selection","Chop","./media/sprites/skills/woodcutting/",
                        miningOptions,miningLevels,"mining-selection","Mine","./media/sprites/skills/mining/",
                        smithingOptions,smithingLevels,"smithing-selection","Smith","./media/sprites/skills/smithing/",
                        fishingOptions,fishingLevels,"fishing-selection","Fish","./media/sprites/skills/fishing/"];

let temp, img, level, button;
for(let i = 0;i < skillArrayList.length;i+=5){
    for(let j = 0;j < skillArrayList[i].length;j++){
        //create the element for each skill action
        parent = document.getElementById(skillArrayList[i+2]);
        temp = document.createElement("div");
        temp.setAttribute("class", "skill-select");
        temp.setAttribute("id", skillArrayList[i][j]);
        temp.innerHTML = skillArrayList[i][j];
        img = document.createElement("img");
        img.setAttribute("src", skillArrayList[i+4] + (j+1) + ".png");
        img.style.height = 128;
        img.style.width = 128;
        parent.appendChild(temp);
        img.style.height = 128;
        img.style.width = 128;
        parent.appendChild(temp);
        //displays level requirement
        level = document.createElement("div");
        level.innerHTML = "Level " + skillArrayList[i+1][j];
        temp.appendChild(level);
        temp.appendChild(img);
        //adds button
        button = document.createElement("div");
        button.setAttribute("class", "skill-button");
        button.setAttribute("id", skillArrayList[i+2] + (j+1));
        button.innerHTML = skillArrayList[i+3];
        temp.appendChild(button);
    }
}

/*  
    ! Inventory Handler:  Loads inventory data as an array and populates the inventory container

    Inventory is organized in array format:
    [Tab ID, Tab Name, Item ID, Number of Items, repeat...]

    For example:
    invArray = ['tab1', 'Equipement', 3, 4, 'tab2', 'resources', 5, 29...]

*/

//load the inventory array
let invString;
let invArray;
if(!(invString = localStorage.getItem("inventory"))){
    invArray = ['tab1','General',1,2,3,4,6,1,7,1,8,1,'tab2','Resources',2,2,'tab3','Armor','tab4','Weapons','tab5','Misc'];
} else {
    invArray = invString.split(',');
}

//current inventory tab element
let tabElement;
//create inventory element and add necessary properties
for(let i = 0; i < invArray.length; i++){
    if(typeof invArray[i] == 'string'){
        //set the tab name
        tabElement = document.getElementById(invArray[i] + '-text');
        tabElement.innerHTML = invArray[i+1];
        tabElement = document.getElementById(invArray[i]);
        i++;
    } else {
        let newInvItem = document.createElement("div");
        //set attributes class: so CSS can style appropriately, title: index of element within the inElementArr
        newInvItem.setAttribute("class", "inv-item");
        //set the ID of the element to the item ID
        newInvItem.setAttribute("id", invArray[i]);
        let img = document.createElement("img");
        img.setAttribute("src", "./media/sprites/itemIcons/" + invArray[i] + ".png");
        img.style.height = 128;
        img.style.width = 128;
        newInvItem.appendChild(img);
        //TODO: Use the number of items to show useful info
        i++;
        //add new element to the inventory container div
        tabElement.appendChild(newInvItem);
    }
    
}