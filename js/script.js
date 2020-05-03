/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Define global variables
const studentElements = document.getElementsByClassName('student-item cf');
const itemsPerPage = 10;

/* showPage function takes list and page as parameters and sorts which students
from the list should be shown */
function showPage(list, page) {
   // if the list is empty, show "RESULTS NOT FOUND"
   if (list.length === 0) {
      const p = document.createElement('p');
      const br = document.createElement('br');
      p.textContent = 'RESULTS NOT FOUND';
      const pageDiv = document.querySelector('.page');
      pageDiv.appendChild(br);
      pageDiv.appendChild(p);
   }
   let lastStud = (page * itemsPerPage) - 1;
   let firstStud = (page * itemsPerPage) - 10;
   // loop through all students to only show 10 students depending on page #
   for (i = 0; i < list.length; i++) {
      if (i >= firstStud && i <= lastStud) {
         list[i].style.display = "";
      } else {
         list[i].style.display = "none";
      }
   }
}

// call function to populate page upon loading
showPage(studentElements, 1)

/* appendPageLinks function generates, appends, and adds functionality to the 
pagination buttons. */

function appendPageLinks(list) {
   // find number of pages based on length of list
   const pages = Math.ceil(list.length / itemsPerPage);
   const paginationLinks = document.querySelector('div.pagination');
   // if pagination links are already created, remove them from the page
   if (paginationLinks !== null) {
      paginationLinks.parentNode.removeChild(paginationLinks)
   }
   //create document elements for links
   const div = document.createElement('div');
   div.className = 'pagination';
   const ul = document.createElement('ul');
   //create li and anchor elements for each page #
   for (i = 1; i < (pages + 1); i++) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.href = '#';
      a.textContent = i;
      if (i === 1) a.className = 'active';
      //add event listener to pagination links and set clicked link to "active"
      a.addEventListener('click', (e) => {
         let active = document.querySelector('a.active');
         active.className = '';
         e.target.className = 'active';
         //call showPage function to display students from page clicked upon
         showPage(list, e.target.firstChild.textContent);
      });
      li.appendChild(a);
      ul.appendChild(li);
   }

   //append list to div and div to higher order div
   div.appendChild(ul);
   const pageDiv = document.querySelector('.page');
   pageDiv.appendChild(div);
};

// call function to populate page upon loading
appendPageLinks(studentElements);

// Extra Credit section

// Create new document sections and assign element properties
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.placeholder = "Search for students...";
searchDiv.appendChild(searchBar);
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';

// add event listener to search button
searchButton.addEventListener('click', (e) => {
   // create new empty array to store search results
   let searchResults = [];
   // loop through studentElements array to find any names that contain the search value
   for (i = 0; i < studentElements.length; i++) {
      // set all elements to not display
      studentElements[i].style.display = 'none';
      let studentName = studentElements[i].firstElementChild.children[1].textContent
      if (studentName.includes(searchBar.value.toLowerCase())) {
         searchResults.push(studentElements[i]);
      }
   }
   // clear search bar
   searchBar.value = '';
   // call functions to repopulate the page and pagination links
   showPage(searchResults, 1);
   appendPageLinks(searchResults);
})

// append button and insert div into the document
searchDiv.appendChild(searchButton);
const h2 = document.querySelector('h2');
const pageHeader = document.querySelector('.page-header');
pageHeader.insertBefore(searchDiv, h2.nextElementSibling);