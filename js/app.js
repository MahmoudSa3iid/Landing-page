const t1 = performance.now();
/*
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const docFrag = document.createDocumentFragment();
const navBar = document.getElementById('navbar__list');
const navLists = navBar.getElementsByTagName('li');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the navigation menu bar 
/**
 * function to make list items in the navigation menu bar equal to the number of sections by iterating on them through a (for .. of) loop
 * with anchor links to each section through its id and assigning them data-nav attribute and "menu__link" class.
 * appending each anchor link to its corresponding list item in the navigation menu bar
 * then appending each list item to a DocumentFragment to decrease the reflows and repaints and improve the code performance
 * after the loop exits, the DocumentFragment is appended to the navBar which is the <ul> element in the header through its class name
*/
for (let section of sections) {
    const anchor = document.createElement('a');
    anchor.innerHTML = `<a href="#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a>`;
    const listItem = document.createElement('li');
    listItem.appendChild(anchor);
    docFrag.appendChild(listItem);
};
navBar.appendChild(docFrag);

// Add class 'active' to section when near top of viewport
/**
 *  An Intersection Observer function to observe the section to specify which section on the viewport and its link
 *  A forEach loop through each section, If 75% of the section is on the viewport 
 *  'your-active-class' is assigned to the section on the viewport 
 *  get active link by using the id of the section on viewport
 *  if condition a section is on viewport, add 'active-item-class' class to the section's link to get highlighted
 *  Then, remove active classes from section and section's link when less than 75% of section is on the viewport
 */
const observer = new IntersectionObserver (entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('your-active-class', entry.isIntersecting);
        let activeLink = navBar.querySelector(`[data-nav=${entry.target.id}]`);
        if (entry.isIntersecting) {
            activeLink.classList.add('active-item-class');
            activeLink.classList.remove('menu__link');
        } else {
            activeLink.classList.remove('active-item-class');
            activeLink.classList.add('menu__link');
        }
    });
}, {
    threshold : 0.75,
});

sections.forEach(section => {
    observer.observe(section)
});


/* 
* createHamburger function creates "hamButton" a <button> element and assign it "ham_link" class which is added to CSS file
* created a loop of 3 times iteration to create 3 <span> elements and assign them "bar" class which is added to CSS file
* which will represent the interface of the <button> element
* append the 3 spans to the button
* then appending the <button> to a DocumentFragment to decrease the reflows and repaints and improve the code performance
* after the loop exits, the DocumentFragment is appended to the navBar which is the <ul> element in the header through its class name
*/
let createHamburger = function () {
    const hamButton = document.createElement('button');
    hamButton.classList.add('ham_link');
    for (let i=1; i<=3; i++) {
        const hamSpan = document.createElement('span');
        hamSpan.classList.add('bar');
        hamButton.appendChild(hamSpan);
        docFrag.appendChild(hamButton);
    }
    navBar.appendChild(docFrag);
    /* 
    * A click event is assigned to the hamButton to open the navigation menu bar when the window width is less than 35 rem which is mentioned in @media query 
    * "active" class is assigned to all <li> items in the navBar through a loop when the hamButton is clicked through an EventListener to show them
    * Another click Event is assigned to each link of the sections' links through a loop in order to remove "active" class 
    * After user has clicked any section link of the pop-down navBar menu, the navigation menu bar is closed after 1sec through a setTimeout method
    */
    hamButton.addEventListener('click', () => {
        for (let li of navLists){
            li.classList.toggle('active');
                const aLinks = document.querySelectorAll(".menu__link");
                for (let a of aLinks){
                    a.addEventListener('click', () => {
                        for (let li of navLists){
                            setTimeout(()=>{
                            li.classList.remove('active');
                        }, 200)
                        }
                    })
                }
        }
    });
    
};
// recalling the createHamburger to create the hamButton 
createHamburger ();


// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/
// Scroll to section on link click
/**
 * when you click on nav links will go smoothly to the correct section
 * prevent default jump transition
 * get section by its id which is assigned to anchor link as its data-nav attribute
 */
navBar.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.dataset.nav) {
    document.getElementById(`${event.target.dataset.nav}`).scrollIntoView({behavior:"smooth"});
    }
});


const t2 = performance.now();
console.log(`${t2-t1} ms`)