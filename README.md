# Magic By Ribbon (https://github.com/eff-diggity/MagicByRibbon)

## Setup for Local Development
### Installing and running the repository
### Technologies used
* This project was built using MongoDB, Mongoose, Express, EJS


This is the first stage of a work in progress. It started as a collaborative project built by a team of three (@JACodex and SHughes1992) and continued by @eff-diggity. We used input from the client to decide on foundational features. We settled on a way for clients to sign in, a way for clients to message the admin, and a searchable blog. 

I started learning EJS, MongoDb, and Express were all new tech for me. I crash-coursed myself in bootstrap, and therefore the styling is going to continue to get fine-tuned. 

Right now the /searchResults page doesn't render in the main.ejs template. To use go in, un-comment /ribbonController.js line 67 to run a search, it will render as raw data. You gotta restart, re-comment it and restart the run in the browser between each search to keep exploring. 

Similarly, the contact info renders in the browser without styling after hitting "send". 

The ongoing project plans are: 
1) Once signed in, clients can see and edit their personal info.
2) Portal for Admin to sign in and directly update the blog.
3) Commerce capabilities for virtual and physical products.
4) Continue the styling journey prioritizing the contact and search results pages.

