/*
    Script notes:
    Purpose: Sets the height of elements based on the amount of enemies specific to each country

    When adding a country:
    1. Add Global var for number of enemies
    2. Get dropdown menu element
    3. Set height of dropdown menu element
    4. Add country to first if statement in the dropDownMenu() function

    When adding or removing enemy from country:
    1. Update enemy count variable
    2. Update h2 element in html to reflect correct number of enemies
*/

//Height that each enemy takes up
var enemyContainerHeight = 50;

//Number of enemies
var eskorEnemyCount = 2;
var drazEnemyCount = 5;
var ellesmeraEnemyCount = 1;

//get each dropdown menu element
var eskorDropdown = document.getElementById("eskor");
var drazDropdown = document.getElementById("draz-durth");
var ellesmeraDropdown = document.getElementById("ellesmera");

//set size for each dropwdown menu based on the number of enemies
eskorDropdown.style.height = eskorEnemyCount * enemyContainerHeight + 'px';
drazDropdown.style.height = drazEnemyCount * enemyContainerHeight + 'px';
ellesmeraDropdown.style.height = ellesmeraEnemyCount * enemyContainerHeight + 'px';

//Functions

function dropdownMenu(idName){
    var enemy = document.getElementById(idName);
    var enemyParent = enemy.parentElement;
    var parentHeight = 0;

    if(idName == 'eskor'){
        parentHeight = 200 + eskorEnemyCount * enemyContainerHeight;
    } else if(idName == 'draz-durth'){
        parentHeight = 200 + drazEnemyCount * enemyContainerHeight;
    } else if(idName == 'ellesmera'){
        parentHeight = 200 + ellesmeraEnemyCount * enemyContainerHeight;
    }

    if(enemy.style.display == 'block'){
        enemy.style.display = 'none';
        enemyParent.style.height = '180px';
    } else {
        enemy.style.display = 'block';
        enemyParent.style.height = parentHeight + 'px';
    }
}