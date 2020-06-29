# Kommunity
Check out my submission to the Hackmann hackathon at https://devpost.com/software/kommunity-9zwgya

## What It Does
Kommunity allows individuals to volunteer to accept requests for help in completing a task. This could range from picking up groceries, carrying furniture, to gardening--the potential is unlimited.

<img src = "https://github.com/22anirudhk/Kommunity/blob/master/Images/Landing.png">
<img src = "https://github.com/22anirudhk/Kommunity/blob/master/Images/Volunteer.png">
<img src = "https://github.com/22anirudhk/Kommunity/blob/master/Images/Request.png">

## How I Built It
I first set up a virtual machine on Google Cloud. After configuring some parameters, I also set up a MongoDB server on that virtual machine. It stores the tasks to complete as well as user information.

I then developed the front end on my own computer. There are three pages:

- Login/Sign-Up
- Volunteer - Accept a request for help completing a task.
- Request - Post a request for someone to help you complete a task.

Afterward, I set up an Express.JS server on the virtual machine which would allow a client to interact with the MongoDB database. 

When a user loads the volunteer page, it accesses all of the open tasks from the virtual machine. When they submit a request for help with a task, it adds to the database.

## What's Next?
- Fix user interface to fit more devices, have profile pictures, make it more responsive, look better in general.
- Setup secure login system.
- Use React.JS for the cards instead of plain JS.
- Suggest suggested volunteer opportunities by location and date.
- Remove accepted tasks from database.


## Demo
Note: Github doesn't allow Http, so functionality for connecting to the Google Cloud VM won't work. I'm working on it now.
https://22anirudhk.github.io/Kommunity
