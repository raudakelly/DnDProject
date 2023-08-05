/*

    $ This class controls all aspects of animation

*/

const sidebar = document.getElementById('sidebar');
const sItemList = document.getElementsByClassName('s-item-text');
const sTitleList = document.getElementsByClassName('s-title');
const contentL = document.getElementsByClassName('content');

sidebar.addEventListener('mouseover', mouseOnSidebar);
sidebar.addEventListener('mouseout', mouseOffSidebar);

function mouseOnSidebar(e){
    sidebar.style.width = 350;
    sidebar.style.overflowY = 'scroll';
    for(let i = 0;i < sItemList.length;i++){
        sItemList[i].style.display = 'block';
    }
    for(let i = 0;i < sTitleList.length;i++){
        sTitleList[i].style.visibility = 'visible';
    }
    for(let i = 0;i < contentL.length;i++){
        contentL[i].style.marginLeft = 450;
    }
}

function mouseOffSidebar(e){
    sidebar.style.width = 85;
    sidebar.style.overflow = 'hidden';
    for(let i = 0;i < sItemList.length;i++){
        sItemList[i].style.display = 'none';
    }
    for(let i = 0;i < sTitleList.length;i++){
        sTitleList[i].style.visibility = 'hidden';
    }
    for(let i = 0;i < contentL.length;i++){
        contentL[i].style.marginLeft = 185;
    }
}
