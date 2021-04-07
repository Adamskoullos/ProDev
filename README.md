# ProDev



## Table of Contents:

[Project Overview](#Project-Overview)<br>
[Stakeholders and their business goals](#Stakeholders-and-their-business-goals)<br>
[UX Design](#UX-Design)<br>
[Component Architecture](#Component-Architecture)<br>
[Development](#Development)<br>
[Deployment](#Deployment)<br>
[Technologies](#Technologies)<br>


# Project Overview

**ProDev** is built from the ground up as an SPA with Vue 3 using the composition api and Vue-router coupled with Bootstrap 5. GSAP has been used in conjunction with Vue transitions and Firebase services are used for the backend. 

A light weight and zippy project management hub for small teams, the main features include:

* **Team Projects view**: A zoomed out view where all members for example the front end team can collaborate on the larger project by breaking sections down for example different parts of each sprint.

* **User Projects view**: Where each team member can create, read, update and delete their own projects.

* **Bugs view**: The bug journal is a place where all team member issues and solutions are listed and shared. Sharing project bugs and solutions can reduce overall project downtime.

* **Live Chat**: Bringing it all together and focusing the conversation is the built in real-time chat feature allowing team members to quickly discuss and respond to different tasks and issues.

As the application is designed to be on a developers screen in conjunction with their code editor for long periods of time, the dark theme is the default mode, however this can be toggled directly in the main dashboard.   

--------------------------------------------------


# Stakeholders and their business goals

- The developer/user:

    - To easily and efficiently collaborate with the team but in an unobtrusive way that allows the developer to focus on their own tasks and get into the zone
    - To interact with a pleasant and streamlined ui that is simple and easy to use and gets out of the developers way  

- The project manager:

    - To easily track the overall project
    - To easily see how each team member is getting on and where they are in their own tasks
    - To have a single focused place to pick up and put down team discussions
    - To be able to quickly respond to issues and leverage the collective knowledge and experience of the team 
    - To create and maintain an effective remote working environment for the team

- The development firm:

    - To destruct larger jobs and delegate blocks of a project to smaller teams that each have their own remote office/environment.  This can make savings from reduced requirement for office space
    - For issues to be quickly identified, shared and solved to limit resource downtime, smooth out the project delivery and increasing the predictability of the project time horizon

- The client for the development firm:

    - Issues to be identified quickly and solutions implemented with a rapid response 
    - New requirements and changes to be acted on and implemented quickly, efficiently and smoothly 

- ProDev developer personal goals for the project:

    - To reinforce understanding and build skills in the following areas:
        - Working with Vue 3 and the composition api
        - Working with the Vue cli
        - Working with Vue router
        - Building single page applications
        - Become more consistent and patterned working with composables/modules, components, views and managing data as it is passed around
        - Get more familiar working with Vue transitions in conjunction with GSAP and JS hooks
        - Develop a better feel for how to work with box shadows to create subtle and modern looking applications
        - Reinforce understanding of js methods where possible  
        - Become more familiar with Bootstrap 5
    
    - To build knowledge and practical skills with Firebase services:
        - How to create, build, deploy and update firebase projects
        - Working with Firestore
        - Working with Storage
        - Working with Firestore Rules
        - Working with Storage Rules
        - Working with Firebase Authentication
        - become more familiar using Vue 3 with Firebase to perform crud operations


--------------------------------------------

# UX Design

**Note**: The current release would be akin to the initial alpha or beta and as such is focused on the main user, the developer and the minimum viable features for their daily workflows. Key features not incorporated in the current deployment that have been pushed back are:

* Admin authentication and UI for project manager roles
* Developer performance reporting and analysis 
* Multiple team authentication - so when a user logs in they only have access to their private team bubble
* In app notifications of unread chat messages
* Breaking out the theme mode property and adding a users object on the back end within firestore so the mode can be saved to a users profile and loaded on login

## User Stories

### First time visitor goals:

- To quickly and easily be able absorb content that answers the question: what does this tool do?
- To be able to easily see how to sign in or sign up in order to get access to the application
- The application to be easy and intuitive to navigate and get familiar with
- To get up and running quickly 

### Returning visitor goals

- To be able to quickly and smoothly sign in
- To clearly see when they are logged in and for any user profile settings to be loaded on login
- To easily develop workflow patterns of efficiency and fold them into their daily processes

### Frequent visitor goals

- For ProDev to become an integral cog to the users daily operations
- To at a glance get up to speed with the overall project and any changes
- To efficiently share ideas and support team members
- To quickly receive support and reduce downtime
- To manage tasks and maintain high levels of productivity through staying organised and focused
- To maintain transparency and accountability 


## Features and Functionality

- Landing page:
    
    - Simple top bar including login and signup buttons
    - Content to include images and descriptions of each section of the application
    - Login and sign up buttons also at the bottom of the content (unless fixed top bar)

- Once logged in visitors are routed to the main dashboard with the `My Projects` view active.  From here they can open and close the side chat window and access each view directly via the side panel and also switch from light to dark mode and vice versa

- The main dashboard includes top bar with user name and logout button, side nav with direct links to all views and the toggle button for the side chat and dark mode. The main `router-vew` is nested within this structure as the center piece

At the time of development component libraries that support Vue 3 are few and far between and I could not find suitable navigation options. I was not keen on Bootstraps options so decided to custom build a responsive side-nav and top-bar set-up for the project.  This was done during the early planning to identify the landscape I was working with. I used a combination of Vue lifecycle hooks in conjunction with native JS `window.AddEventListener('resize')` to monitor the viewport width and manage breakpoints. The internal nav-bar and top-bar are built using flexbox and the responsiveness of the whole application as managed by Bootstrap rows and columns.         

On to the views:

- The `My Projects` and `Team Projects` views to use the same list style structure. New projects can be added from here and existing projects can be edited and deleted.  Click into a project to open a view for that specific project. Each project has a title, description, cover image and task list

- The bug journal view to have a blog structure with searchable functionality (either through tags or title keyword search). To be ordered newest at the top.  Within this view a button routing through to the `New Bug` view. Each bug ticket to have:
    
    - Title
    - Description
    - Solution
    - file upload for solution images
    - Open/closed property

- Team Live-Chat: When the viewport is larger than the main break point, on laptops and desktop screens the `Chat` component is taken out of the main `router-view` and displays on the toggled side-chat window.  When the viewport is the size of tablets and phones the `Chat` component is added as a main view.  There were a few issues to overcome here but now when screens go below the main breakpoint the chat will not wrap below the main router-view, so gives a more mobile focused experience on smaller screens, while also offering full functionality on larger screens.

The Chat component itself will take the traditional style of newest message at the bottom and auto scrolling the message window to always show the newest messages.  The new message form to be located below the message window. The `date-fns` library will be used here to manipulate the `createdAt` property to present the message date in a more chat app manner. 

## Styling

There is a focus on creating a neutral look to the dashboard with subtle styling and an emphasis on using box shadows to create a layered look and feel. There is also a focus on using transitions and transforms to create subtle switches that provide a tactile experience (a kind of digital mechanical switch). Also element transitions to be used to give a tactile and snappy experience when navigating the application. 

The overarching theme dark and light to be clean and subtle with an err towards a dimmed look on the dark theme.

Whilst the main structure of the layout has hard edges, softened slightly by the box shadows the internal elements to have a slight rounded corner consistent through the application.  The main structure layout to have simple smooth transitions and the internal elements to be a little more dynamic with the use of GSAP.  

To provide a transition between the hard edges of the main layout and the softer corners of buttons and internal elements the font to be clean, simple with slightly rounded ends. 

## Wireframes

Below are the early wireframes: 

![image](https://user-images.githubusercontent.com/73107656/112324787-0ec4b200-8cab-11eb-93b5-daec29b746aa.png)

![image](https://user-images.githubusercontent.com/73107656/112325034-40d61400-8cab-11eb-8f0a-744f6c151166.png)

![image](https://user-images.githubusercontent.com/73107656/112325248-6c58fe80-8cab-11eb-8910-118d0575d486.png)

![image](https://user-images.githubusercontent.com/73107656/112325322-7b3fb100-8cab-11eb-8fae-132c3f84a695.png)

![image](https://user-images.githubusercontent.com/73107656/112325368-898dcd00-8cab-11eb-9ecd-300dbf70ab8c.png)


![image](https://user-images.githubusercontent.com/73107656/112325458-9ca09d00-8cab-11eb-84bd-d96e604d29b8.png)

------------------------------------------------------------

# Component Architecture

Below is a visual map of the planned structure for the project. The blue boxes are individual views that have their own route, the green boxes are nested components and the bright yellow boxes are composables.  The links show what views the components are nested within and where the composables are used.  

My only regret so far is that I did not extract the side-nav and top-bar into separate components from the start.  I miss judged the volume of code it would take in building the custom navigation for the project, next time I will start the nav build as a component or two depending on the project. Sitting down and creating this visual map has reinforced just how reusable functions can be if they are created with that in mind.

![image](https://user-images.githubusercontent.com/73107656/113575732-3f470d00-9616-11eb-8a16-49e62b35beda.png)

Digging slightly deeper into the composables in the above map:

Composables extract much of the logic keeping each component cleaner and easier to maintain.  Structured as ES6 modules they take advantage of closure and simply return the function which once invoked within a component returns the required properties/functions.  There is a consistent structure used when creating composables.

Firebase has its own methods to connect to their api's so the normal rest api patterns are not used, however the `async` and `await` pattern using `try` `catch` blocks is be used as normal.  

- **getUser** The composable returns the `getUser` function which through destructuring returns the current user object. First firebase authentication is queried to check if there is a user logged in and if so grabs the current user and saves it to the `user` object which is returned. If no user is logged in, the value of `user` is null. 

Then a firebase real-time monitor is used to track if the value of `user` changes, therefore the `user` object can be used to check authentication, create user documents or make user collection/document queries

- **useLogin**: is used to query the login credentials with the database and only allow access if they match an existing user

- **useSignup**: grabs the user inputs and creates a new user object with firebase authentication. The user display name is then added to the user object

- **useLogout**: simply returns the logout function which uses the firebase logout method

- **useStorage**: Firebase uses a service called Storage for files such as images, music, videos.  This composable returns `deleteImage` and `uploadImage` within its logic and utilises the `getUser` composable.

when uploading an image a file path to the `user/imageCollection` is made and once uploaded firebase returns a `url` access point to use within the application to display the image.  

- **useCollection**: Initially the only function to be within this composable is the `AddDoc` function to add new projects, messages and bugs to firebase firestore

- **getCollection**: is used to grab the whole collection in order to loop through them and display them as a list.  Here we can use the Vue computed property to create filtered lists for different purposes.

- **useDocument**: is used to update and delete individual documents from firebase firestore and storage

- **getDocument**: is used to grab individual documents. first a reference to the document is made, this is done by passing in the collection and id. A real time listener is added to the document reference updating its value on any updates to the database. In practice when a user adds a new task to a project and hits the `Add task` button the project document is updated, the user is re-routed to the project list view and as the view mounts the DOM the collection is grabbed with the updated document and rendered to the screen.  

----------------------------------------------------------


# Development

The project management for each sprint is implemented using Trello, this section covers the following areas:

[Bugs and Solutions](#Bugs-and-Solutions)<br>
[Unresolved Bugs](#Unresolved-Bugs)<br>
[Testing](#Testing)<br>
[Credits](#Credits)<br>
[Deployment](#Deployment)<br>


## Bugs and Solutions

- [X] User display name not showing in top bar after first sign up. Firebase creates the user first then adds the displayName.  The onSnapshot for user updates was firing and triggering the render before the displayName had been returned from firebase.  

**Solution**: Create a custom event within the sign in function to trigger after the user displayName has been returned from firebase.  Then back in the main dash view fire a callback to set a property to false and then true again using the boolean to show the top bar element. As the property becomes true the top bar is re-rendered showing the displayName 

--------------------------------------------------

- [X] On login the side bar is being shown even on smaller screens

**Solution**: Added the following code using the Vue lifecycle hook:


```js

onBeforeUpdate(() => {
          if(visualViewport.width < 1200){
              showSideNav.value = false
              showSideChat.value = false
            }
            if(visualViewport.width > 1200 && user.value){
              showSideNav.value = true
            }
        })

```

-----------------------------------------

- [X] When using transitions for elements that are also Bootstrap columns (part of a row). The target element transitions but the effected element still moves as normal.  Specifically as the side-chat window is toggled and slides in and out from the right the main content/view window does not move inline with the transition.  I have tried using transition-groups etc...but stuck for now and moving on.  This is a minor issue and not one to get caught up with any longer.

**Solution**: For both the chat window (col) and the main content window (col) I gave the container div a max height of the VH and then overflow: auto.  This separated them from the side bar without having to fix position the side bar which creates a whole lot of other issues.  This was great and really added to the dashboard feel. I then hid the scroll bars to give a really clean look.

## Unresolved Bugs

## Testing

### HTML & CSS

### Testing User Stories

### Device Testing

## Credits

## Deployment


--------------------------------------------------------------

# Technologies

The project is built in `vscode` and set up via the `Vue cli` which included: the `Vue-Router` to manage `SPA` routing, `webpack` to bundle and manage all files, `babel` to translate all JS into ES5 for browser compatibility and a node modules pack which also stores all npm installs.  `Bootstrap 5` is used mostly for the rows and columns responsiveness, `material icons` are used to keep things tidy especially on mobile devices.  `date-fns` is used to present timestamp data for chat messages and `GSAP` is used with Vue transitions to add a bit of flare. 

The project is built using the `Vue 3 composition api`.

`Firebase` is installed globally on the machine via npm in order to link with the firebase project on the back end during development. Firebase services: `Firestore`, `Authentication` and `Storage` are used within this project.

`GitHub` is used for version control and `Trello` for managing the project and each sprint.

--------------------------------------------------

### Project setup


```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
