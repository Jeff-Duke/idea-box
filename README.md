# idea-box

Module 1, Project #4 - Created by Jeff Duke & Kirsten Swanson 

##Intro

Ideabox is an application that allows the user to record and archive their ideas. The user needs to input the title of their idea followed by its description into the designated input areas. Once the user clicks the 'save' button their idea is stored locally on their computer. Even if they refresh the browser their idea will remain on the page until their next visit to the site. If the user is dissatisfied with their idea after saving it they can delete the idea from the page by clicking on the 'x' button in the upper right hand corner. Additionally, the user can select a ranking of their idea by clicking on the arrow buttons in the lower left hand corner. Furthermore, the user can edit their saved idea. The user just needs to simply click on the title or description of the idea they want to edit and once the cursor appears in the textbox they can start editing. 

##Application

On page load any ideas previously saved will reappear on the page in chronological order. This is executed by the localStorage of the user's computer. LocalStorage is a method in which webpages locally store named key/value pairs inside a client's web browser. There's no expiration time for items in localStorage, but there is a maximum of 5MB per app per broswer localStorage space. In order for an object to be stored in localStorage it needs to be a string, so when you set the item to be stored you can use 'JSON.stringify' and to retrieve the item you can use 'JSON.parse.' When the user inputs their idea's title and description into the input fields they're stored as objects in an array. These objects need to be stringified and then parsed in order to be rendered back on the page through localStorage. 

We created an object called 'Idea' with unique identifiers in order to render items from localStorage. Each 'Idea' has a unique title, body, id, and quality. The id is generated with Date.now(), which returns the milliseconds elapsed since 1970 until now. This creates a unique number, so this becomes the identifier used to target specific ideas when removing them or changing the quality ranking. Additionally, we created 'new Idea,' which is an instance of the 'Idea' object. This 'new Idea' constructor takes on properties of the 'Idea.' This 'new Idea' is wrapped in a variable called 'Ideabox,' which includes methods used on the constructor. 

The steps to have an idea rendered onto the page are: generating and saving an idea, storing the idea in localStorage, retrieving the idea from localStorage, and finally rendering the idea to the page. All of these steps are initiated on the 'save' button with an event handler. 

If there are many ideas and the user wants to find a specific one they can use the search bar. The search bar is triggered on keyup after each letter is typed in. The search function uses a 'regexp' expression to filter out pieces of text that match the user's search input. The function goes through all the objects in the array and when it matches the user's input the matched idea will be shown while the unmatched ideas fadeout of the page. Once the search bar is cleared all the ideas reappear on the page. 

