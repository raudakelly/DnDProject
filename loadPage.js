/* 
    $ Class: Loads all the necessary elements and sets up the app for use

    Note: Runs on startup and does not run again

    TODO: load character from file
*/

/*
    TODO: add a way of saving the character's progress while they are playing
    TODO: this prevents loss of progress (WARN PLAYERS ABOUT NOT CLEARING CACHE BEFORE SAVING TO SERVER)
*/

/*
    ! Loads each of the options for each skill, builds the necessary HTML elements for each

    Notes:
        Structures containing skill info
        Each structure in each skill is order-sensitive

    TODO:(when adding a skill)
        add 3* data structures for each skill (below)
        add 6* items to the skillArrayList
        add entry to the following methods:
            - findFolderName
            - goldValue
            - findItemName
            - getItemSprite
*/

//initialize woodcutting skill
let woodcutting = ["Logs","Oak Logs","Teak Logs","Cherry Logs","Yew Logs","Ice Logs","Magic Logs","Ebony Logs"];
let woodcLevels = ["1","15","30","45","60","75","90","99"];
let woodcPrices = [1,5,20,45,80,150,250,500];

//initialize mining skill
let mining = ["Iron Ore","Coal Ore","Silver Ore","Orichalcum Ore","Adamantite Ore","Gold Ore","Mithril Ore","Astraulite Ore"];
let miningLevels = ["1","15","30","45","60","75","90","99"];
let miningPrices = [1,5,20,45,80,150,250,500];

//initialize smithing skill
let smithing = ["Iron Bar","Steel Bar","Silver Bar","Orichalcum Bar","Adamantite Bar","Gold Bar","Mithril Bar","Astraulite Bar"];
let smithingLevels = ["1","15","30","45","60","75","90","99"];
let smithingPrices = [5,20,50,100,200,500,1000,2500];

//initialize smithing skill
let fishing = ["Raw Blue Gill","Raw Bass","Raw Duckfish","Raw Salmon","Raw Silverfish","Raw Landshark","Raw Diamondfish","Raw Sunfish"];
let fishingLevels = ["1","15","30","45","60","75","90","99"];
let fishingPrices = [1,5,20,45,80,150,250,500];

//initialize brewing skill
let brewing = ["Invisibility Potion","Strength Potion","Love Potion","Poison Potion","Antidote Potion","Fire Resist Potion",
                "Ice Resist Potion","Sleep Potion","Combat Potion","Magic Attack Potion","Ranged Attack Potion",
                "Defense Potion","Health Boost Potion","Tracking Potion","Cure Ailment Potion"];
let brewingLevels = ["1","8","30","45","60","75","90","99","99","99","99","99","99","99","99"];
let brewingPrices = [1,5,20,45,80,150,250,500,500,500,500,500,500,500,500];

//initialize foraging skill
let foraging = ["Ginseng","Amouria","Lavender","Peppermint","Nightshade","Valerian","Spicy pepper","Chanterelle",
                "Lion’s mane","Manticore's tail","Glowshroom"];
let foragingLevels = ["1","15","30","45","60","75","90","99","99","99","99"];
let foragingPrices = [1,5,20,45,80,150,250,500,150,250,500];

/*  List of skills to be initialized, 
        3rd item is the skills container's parent's classname
        4th is the name of the action on the button
        5th item is the folder of sprites for the skill
*/

let skillArrayList = [woodcutting,woodcLevels,"woodc-selection","Chop","woodcutting", 4000, 
                        mining,miningLevels,"mining-selection","Mine","mining", 2000,
                        smithing,smithingLevels,"smithing-selection","Smith","smithing", 3000,
                        fishing,fishingLevels,"fishing-selection","Fish","fishing", 1000,
                        brewing,brewingLevels,"brewing-selection","Brew","brewing", 5000,
                        foraging,foragingLevels,"foraging-selection","Forage","foraging", 6000];

let temp, img, level, button;
for(let i = 0;i < skillArrayList.length;i+=6){
    for(let j = 0;j < skillArrayList[i].length;j++){
        //create the element for each skill action
        parent = document.getElementById(skillArrayList[i+2]);
        temp = document.createElement("div");
        temp.setAttribute("class", "skill-select");
        temp.setAttribute("id", skillArrayList[i][j]);
        temp.innerHTML = skillArrayList[i][j];
        img = document.createElement("img");
        img.setAttribute("src", "./media/sprites/items/" + skillArrayList[i+4] + "/" + (j+1) + ".png");
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
        onclickAction = "beginSkillAction('" + skillArrayList[i+4] + "', '" + (skillArrayList[i+5] + j + 1) + "')"
        button.setAttribute("onclick", onclickAction);
        button.innerHTML = skillArrayList[i+3];
        temp.appendChild(button);
    }
}

/*  
    ! Inventory Handler:  Loads inventory data as an array and populates the inventory container

    Inventory is organized in array format:
    [Tab ID, Tab Name, Item ID + 1000*foldertype, Number of Items, repeat...]

    Sprite folders:
    1: fishing
    2: mining
    3: smithing
    4: woodcutting
    5: brewing
    6: foraging

    For example:
    invArray = ['tab1', 'Equipement', 3001, 4, 'tab2', 'resources', 1005, 29...]

*/

//load the inventory array
let invString;
let invArray;
if(!(invString = localStorage.getItem("inventory"))){
    invArray = [0,'tab1','General',1001,1762,1006,64,2006,41,5002,5,5011,1,5009,1,2007,1,3008,27,'tab2','Resources',3002,2,'tab3','Armor','tab4','Weapons','tab5','Misc', 4005, 27];
} else {
    invArray = [0,'tab1','General',1001,1762,1006,64,2006,41,5002,5,5011,1,5009,1,2007,1,3008,27,'tab2','Resources',3002,2,'tab3','Armor','tab4','Weapons','tab5','Misc', 4005, 27];
}

//current inventory tab element
let tabElement;
//temp element for the number of items
let numItems;
//name of the sprite folder
let fName = 'error';
//create inventory element and add necessary properties
for(let i = 1; i < invArray.length; i++){
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
        newInvItem.setAttribute("onclick", "openInvItem(" + invArray[i] + ")");
        let img = document.createElement("img");
        //set the item icon image
        img.setAttribute("src", getItemSprite(invArray[i]))
        img.style.height = 128;
        img.style.width = 128;
        newInvItem.appendChild(img);
        i++;
        //display number of items
        numItems = document.createElement("div")
        numItems.innerHTML = invArray[i];
        newInvItem.appendChild(numItems);
        
        //add new element to the inventory container div
        tabElement.appendChild(newInvItem);
    }
    
}

//set the first tab to visible by default
tab = document.getElementById(invArray[1]);
tab.style.display = "flex";

/*
    $ Load the areas-menus
    - loads the combat, gathering and hunting menus for each area
    todo:
    - 
*/

//names of the areas
let areas = ["Agora","Khazar-kil","Elthoras","Northlands","Sands-of-Jashir","Deep-Dark"];

for(let i  = 0; i < areas.length; i++){
    let area = document.getElementById(areas[i] + "-menu");
    let newInvItem = document.createElement("div");
}

/*
    $ Load the action-bar
*/