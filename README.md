# lab5-platform-api-catherinedparnell
## What I did I
I created an API to handle storage of post data for the lab 4 blog. It uses the original fields, title, coverUrl, content, and tags, along with an added summary attribute to be displayed in the rendering of all posts. Along with methods used to CRUD posts to and from the database, I implemented a method to fetch all the tags that exist in the database so that I could use them for filtering posts in a new connected 'filterPosts' component and a method to fetch posts only if they contain that certain tag. Also, when posts are fetched, in both getPosts and getPostsByTag, they are fetched sorted by date descending, meaning that newer posts are presented first. I hope to continue to work on this by adding comments in the next part (I know that it says extra credit for comments now, but I'll have more time to work more on this in a few days *and* I want to be able to implement comments by *user* which I know is the next part of the lab anyway).
## What I did II
I added a user model to the api to handle user authentication, and controller functions to handle calls to the api. I also updated the controller functions for the post model to handle user authentication. I didn't end up adding comment functionality, but may attempt to in the future.
## Extra Credit
* tags as array
* filter by tagging (I suppose this is EC for the last lab, except in order to do this I implemented a method in the API to fetch all the tags that exist in the database, and a method to fetch posts only if they contain that certain tag)
* new summary attribute
* (*part II*) users can only update their own posts

