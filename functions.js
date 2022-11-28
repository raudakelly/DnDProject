/*

    All of the functions that are not used by gamemanager

/*

/*
    ! Loads the side menu
*/

const contentList = ["inv", "map", "woodc","mining","smithing"];

function sItemClick(itemId){
    for(let i = 0; i < contentList.length; i++){
        let content = document.getElementById(contentList[i]);
        content.style.display = "none";
    }
    let content = document.getElementById(itemId);
    content.style.display = "block";
}

/*
    ! Inventory Section
*/

//set the first tab to visible by default
tab = document.getElementById(invArray[0]);
tab.style.display = "flex";
//set color for selected tab
document.getElementById("tab1-text").style.backgroundColor = "rgb(117, 51, 8)";

//function that switches around inventory elements
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