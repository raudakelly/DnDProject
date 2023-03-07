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
        Structures containing each skill action 
        Each structure is in order by how it is listed in the skills

    TODO:(when adding a skill)
        add 2 data structures for each skill
        add *5* items to the skillArrayList
*/

// all of the skills have 2 data structures each, 1 for the name of the action, 1 for the level needed

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

/*  List of skills to be initialized, 
        3rd item is the skills container's parent's classname
        4th is the name of the action on the button
        5th item is the folder of sprites for the skill
*/

let skillArrayList = [woodcutting,woodcLevels,"woodc-selection","Chop","./media/sprites/items/woodcutting/",
                        mining,miningLevels,"mining-selection","Mine","./media/sprites/items/mining/",
                        smithing,smithingLevels,"smithing-selection","Smith","./media/sprites/items/smithing/",
                        fishing,fishingLevels,"fishing-selection","Fish","./media/sprites/items/fishing/"];

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
    [Tab ID, Tab Name, Item ID + 1000*foldertype, Number of Items, repeat...]

    Folders:
    1: fishing
    2: mining
    3: smithing
    4: woodcutting

    For example:
    invArray = ['tab1', 'Equipement', 3001, 4, 'tab2', 'resources', 1005, 29...]

*/

//load the inventory array
let invString;
let invArray;
if(!(invString = localStorage.getItem("inventory"))){
    invArray = [0,'tab1','General',1001,1762,1006,69,2006,41,2007,1,3008,27,'tab2','Resources',3002,2,'tab3','Armor','tab4','Weapons','tab5','Misc', 4005, 27];
} else {
    invArray = invString.split(',');
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

        //get the folder name
        if(invArray[i]/1000 < 2){
            fName = 'fishing'
        } else if(invArray[i]/1000 < 3){
            fName = 'mining'
        } else if(invArray[i]/1000 < 4){
            fName = 'smithing'
        } else if(invArray[i]/1000 < 5){
            fName = 'woodcutting'
        }

        img.setAttribute("src", "./media/sprites/items/" + fName + '/' + (invArray[i] % 1000) + ".png");
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

/*
    $ Load the areas-menus
*/

//names of the areas
let areas = ["Agora","Khazar-kil","Elthoras","Northlands","Sands of Jashir","Deep Dark"];

for(let i  = 0; i < areas.length; i++){
    let area = document.getElementById(areas[i] + "-menu");
    let newInvItem = document.createElement("div");
}