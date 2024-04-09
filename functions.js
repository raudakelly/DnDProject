/*
    $ Functions class

    Used for various functions
    
/*

/*
    $ Innit
*/

//names of the side tabs
const contentList = ["inv", "areas", "woodc","mining","smithing","fishing","brewing","foraging"];

//set color for selected tab
document.getElementById("tab1-text").style.backgroundColor = "rgb(117, 51, 8)";

/*
    $ Functions
*/

/*
    $ Sidebar menu functions
*/

/*
    ! Switches the side menu tab
*/

function sItemClick(itemId){
    for(let i = 0; i < contentList.length; i++){
        let content = document.getElementById(contentList[i]);
        content.style.display = "none";
    }
    let content = document.getElementById(itemId);
    content.style.display = "block";
}

/*
    ! Switches the side menu tab and allows for content tabs
*/

function sItemClickMenu(itemId, menu){
    for(let i = 0; i < contentList.length; i++){
        let content = document.getElementById(contentList[i]);
        content.style.display = "none";
    }
    let content = document.getElementById(itemId);
    content.style.display = "block";
    
    content = document.getElementById(itemId + "-selection");
    let childElements = content.children;
    //if the menu is set to all, show all the elements
    if(menu == "all"){
        for(let i = 0; i < childElements.length; i++){
            childElements[i].style.display = "block";
        }
    } else {    //if the menu is set to another selection, only display the associated elements
        for(let i = 0; i < childElements.length; i++){
            if(childElements[i].id.includes(menu)){
                childElements[i].style.display = "block";
            } else {
                childElements[i].style.display = "none";
            }
        }
    }
}

/*
    $ Inventory  Functions
*/

/*
    ! Adds x of items to inventory
*/

function addItem(itemID, amount){
    //search for the item
    let found = 0
    itemID = Number(itemID)
    for(let i = 3; i < invArray.length; i+=2){
        //If item is found in the invArray add the amount to the item and break out of the loop
        if(invArray[i] == itemID){
            invArray[i+1] = invArray[i+1] + amount
            found = 1
            break
        }
    }
    if(found == 0){
        //Add the item the the invArray in the first tab
        invArray.splice(3, 0, itemID)
        invArray.splice(4, 0, amount)
    }
    //reload the inventory
    reloadInventory();
}

/*
    ! Swaps the Inventory tabs
*/
//function that switches inventory tabs
//use title as an attribute to get the index of the array element in the array
function switchTab(tabName){
    //close all tabs
    for(let i = 1; i < 6; i++){
        let tab = document.getElementById('tab' + i);
        tab.style.display = "none"; 
        document.getElementById("tab" + i + "-text").style.backgroundColor = "rgb(145, 63, 9)";
    }
    //get tab you want to open and make it visible
    tab = document.getElementById(tabName);
    tab.style.display = "flex";
    document.getElementById(tabName + "-text").style.backgroundColor = "rgb(117, 51, 8)";
}

/*
    ! Opens Inventory item
*/
function openInvItem(itemID) {
    //id is moreso used to show that it was found within the array
    let id = 0;
    let num = 0;
    //search for itemID in the inventory array and get the amount of items
    for(let i = 0; i < invArray.length; i++){
        if(invArray[i] == itemID){
            id = itemID;
            num = invArray[i+1];
        }
    }
    //if item was not found in the array display error message
    if(id == 0){
        console.log("Item: " + itemID + " not found");
        return;
    }
    let focus = document.getElementById("inv-focus");
    focus.style.visibility = "visible";
    let blurr = document.getElementById("blurr");
    blurr.style.visibility = "visible";
    let numItems = document.getElementById("inv-focus-quantity");
    numItems.innerHTML = num.toLocaleString("en-US");

    //display the item cost in gold
    let gold = document.getElementById("inv-focus-gold-amount");
    gold.innerHTML = goldValue(itemID).toLocaleString("en-US");

    //sets appropriate image
    //alt acts as placeholder for the itemID
    let img = document.getElementById("inv-focus-img");
    img.setAttribute("src", "./media/sprites/items/" + findFolderName(itemID) + '/' + (id % 1000) + ".png");
    img.setAttribute("alt", itemID);

    //sets appropriate name
    let title = document.getElementById("inv-focus-name");
    title.innerHTML = findItemName(itemID);
}

/*
    ! Close Inventory item
*/
function closeInvItem() {
    let focus = document.getElementById("inv-focus");
    focus.style.visibility = "hidden";
    let blurr = document.getElementById("blurr");
    blurr.style.visibility = "hidden";
}

/*
    ! Opens menu to sell x amount of items
    todo:
    - opens confirmation page to sell x of selected item
*/
function sellX(){
    document.getElementById('sell-x-userinput').value = 1;
    let sellX = document.getElementById("sell-x");
    sellX.style.visibility = "visible";
    let blurr = document.getElementById("blurr");
    blurr.style.zIndex = 17;

    let max = document.getElementById("sell-x-max");
    max.innerHTML = document.getElementById("inv-focus-quantity").innerHTML;

    let value = document.getElementById("sell-x-value");
    let img = document.getElementById("inv-focus-img");
    let itemID = parseInt(img.getAttribute("alt"));
    value.innerHTML = goldValue(itemID);
}

/*
    ! Updates the gold value when user types input
*/
function sellxUpdateGoldValue(){
    //get user entered quantity
    let quantity = parseInt(document.getElementById('sell-x-userinput').value);

    //get the value element and itemID
    let value = document.getElementById("sell-x-value");
    let img = document.getElementById("inv-focus-img");
    let itemID = parseInt(img.getAttribute("alt"));

    //if there is nothing in the input box
    if(isNaN(quantity)){
        value.innerHTML = 0;
        return;
    } 
    //if the user enters a negative value
    else if(quantity < 1){
        //set the quantity to 1 and appropriate item value
        document.getElementById('sell-x-userinput').value = 1;
        value.innerHTML = goldValue(itemID);
        return;
    }

    //if the user entered a proper value
    value.innerHTML = goldValue(itemID) * quantity;

}

/*
    !Set the max quantity in the sellx menu
*/
function sellxSetMax(){
    let img = document.getElementById("inv-focus-img");
    let itemID = parseInt(img.getAttribute("alt"));
    let max = parseInt(getQuantityInInventory(itemID));
    let quantity = document.getElementById('sell-x-userinput');
    quantity.value = max;
    sellxUpdateGoldValue();
}

/*
    !close Sell-x menu 
*/
function closeSellX(){
    let sellX = document.getElementById("sell-x");
    sellX.style.visibility = "hidden";
    let blurr = document.getElementById("blurr");
    blurr.style.zIndex = 11;
}

/* 
    ! takes the quantity and passes it along to the confirm menu
    todo:
    - get the quantity from the appropriate element
    - close the sellX menu
    - call confirmSell(quantity)
*/
function confirmSellQuantity(){
    //find the quantity from the inputbox
    let quantity = document.getElementById('sell-x-userinput').value;
    closeSellX();
    confirmSellX(quantity);
}

/*
    ! Opens menu to confirm sale of X items
*/
function confirmSellX(amount){
    //blurr background
    let blurr = document.getElementById("blurr");
    blurr.style.zIndex = 19;
    //get the itemID
    let itemID = document.getElementById("inv-focus-img").getAttribute("alt");
    //set menu to visible
    let confirmSell = document.getElementById("confirm-sell");
    confirmSell.style.visibility = "visible";

    //update image icon
    let img = document.getElementById("confirm-sell-item-img");
    img.setAttribute("src", "./media/sprites/items/" + findFolderName(itemID) + '/' + (itemID % 1000) + ".png");
    img.setAttribute("alt", itemID);

    //sets appropriate name
    let title = document.getElementById("confirm-sell-item-name");
    title.innerHTML = findItemName(itemID) + " ";

    //updates quantity of item
    let sellQuantity = document.getElementById("confirm-sell-quantity");
    sellQuantity.innerHTML = amount;

    //update value of all items
    let value = amount * goldValue(itemID);
    let totalValue = document.getElementById("confirm-sell-value");
    totalValue.innerHTML = value;
}

// !close confirm-sell menu
function closeConfirmSell(){
    blurr.style.zIndex = 11;
    let confirmSell = document.getElementById("confirm-sell");
    confirmSell.style.visibility = "hidden";
}

/*
    ! Sells an amount of items from the inventory
*/
function sellItem(){
    //get the quanity of the item being sold
    let quantity = document.getElementById("confirm-sell-quantity");
    let sellQuantity = parseInt(quantity.innerHTML, 10);
    //get the itemID
    let img = document.getElementById("confirm-sell-item-img");
    let itemID = img.getAttribute("alt");
    //find the quantity the user has of the item
    let userQuantity = 0;
    /*
        find the item in the array
        check to see if user has enough to sell that many
        if the user has exact amount, remove from invArray
        else subtract the amount being sold
    */
    for(let i = 3; i <= invArray.length; i+=2){
        if(invArray[i] == itemID){
            userQuantity = invArray[i+1];
            //if the user is selling the exact quantity of items they have
            if(sellQuantity == userQuantity){
                invArray.splice(i, 2);
            } else if(sellQuantity < userQuantity){
                invArray[i+1] = parseInt(invArray[i+1], 10) - sellQuantity;
            } else {
                console.log("Error: you do not have that many.");
                closeConfirmSell();
                return;
            }
        }
    }

    //add the gold to the users inventory
    invArray[0] = parseInt(invArray[0] + (goldValue(itemID) * sellQuantity));
    //reload the inventory object
    reloadInventory();
    //after selling the item close the confirmation menu
    closeConfirmSell();
    closeInvItem();
}

/*
    $Areas Functions
*/

//!Open the areas menu
function openArea(name){
    let content = document.getElementById("areas-content");
    content.style.display = "none";
    content = document.getElementById("area-menu");
    content.style.display = "block";

    let title = document.getElementById("area-menu-title");
    name = name.replace(/_/g,' ');
    title.innerHTML = name;
}

//!back button
function areaMenuBack(){
    let content = document.getElementById("area-menu");
    content.style.display = "none";
    content = document.getElementById("areas-content");
    content.style.display = "block";
}

//!open the area menu
function openAreaMenu(menu){
    //close the menu selection page
    let content = document.getElementById("area-menu");
    content.style.display = "none";

    content = document.getElementById(menu + "-menu");
    content.style.display = "block";
}

let areaMenuChoices = ['combat', 'gathering', 'hunting'];

//!close the area menu
function closeAreaMenu(){
    //close the menu selection pages
    let content;
    for(let i = 0; i < areaMenuChoices.length; i++){
        content = document.getElementById(areaMenuChoices[i] + "-menu");
        content.style.display = "none";
    }
}


/*
    $ Internally Used Skill Functions
    note: these are functions that are only called from inside this script

*/

// !returns the folder name that holds the sprite given an itemID
function findFolderName(itemID){
    let fName;
    if(itemID/1000 < 2){
        fName = 'fishing'
    } else if(itemID/1000 < 3){
        fName = 'mining'
    } else if(itemID/1000 < 4){
        fName = 'smithing'
    } else if(itemID/1000 < 5){
        fName = 'woodcutting'
    } else if(itemID/1000 < 6){
        fName = 'brewing'
    } else if(itemID/1000 < 7){
        fName = 'foraging'
    }
    return fName;
}

// !return the gold value of a certain item (-1 on failure to find item)
function goldValue(itemID){
    let goldValue = -1;
    if(itemID/1000 < 2){
        goldValue = fishingPrices[(itemID%1000)-1];
    } else if(itemID/1000 < 3){
        goldValue = miningPrices[(itemID%1000)-1];
    } else if(itemID/1000 < 4){
        goldValue = smithingPrices[(itemID%1000)-1];
    } else if(itemID/1000 < 5){
        goldValue = woodcPrices[(itemID%1000)-1];
    } else if(itemID/1000 < 6){
        goldValue = brewingPrices[(itemID%1000)-1];
    } else if(itemID/1000 < 7){
        goldValue = foragingPrices[(itemID%1000)-1];
    }
    return goldValue;
}

// !returns an items names
function findItemName(itemID){
    let namingArr;
    if(itemID/1000 < 2){
        namingArr = fishing;
    } else if(itemID/1000 < 3){
        namingArr = mining;
    } else if(itemID/1000 < 4){
        namingArr = smithing;
    } else if(itemID/1000 < 5){
        namingArr = woodcutting;
    } else if(itemID/1000 < 6){
        namingArr = brewing;
    } else if(itemID/1000 < 7){
        namingArr = foraging;
    }
    console.log(namingArr[(itemID % 1000)-1])
    return namingArr[(itemID % 1000)-1];
}


//!Returns amount of items in inventory
function getQuantityInInventory(itemID){
    for(let i = 1; i < invArray.length; i++){
        if(invArray[i] == itemID){
            return invArray[i+1];
        }
    }
    return -1;
}

function getItemSprite(itemID){
    let fName;
    if(itemID/1000 < 2){
        fName = 'fishing'
    } else if(itemID/1000 < 3){
        fName = 'mining'
    } else if(itemID/1000 < 4){
        fName = 'smithing'
    } else if(itemID/1000 < 5){
        fName = 'woodcutting'
    } else if(itemID/1000 < 6){
        fName = 'brewing'
    } else if(itemID/1000 < 7){
        fName = 'foraging'
    }
    src = "./media/sprites/items/" + fName + '/' + itemID % 1000 + ".png"
    return src;
}

/*
    ! Reloads inventory page
*/
function reloadInventory(){
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
            tabElement.innerHTML = "";
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
            fName = findFolderName(invArray[i]);

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
}