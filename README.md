# GoodReads_app
This is app which helps you search for any book from goodreads and read about its description, rating and other details,


HOW TO RUN

Once you have cloned this repo into your local system, this repo consists of both frontend and backend. backend related code is present in server folder and frontend related code is present in client folder. npm install in parent directory and cd to client directory and again install dependencies by npm install.

This application does not requires and global library to execute.

A live version of this application can be seen at url https://fathomless-shore-11662.herokuapp.com


Functionality of application

1) Enter book name you want details of
2) List of all matching books from Goodreads API will be fetched and listed
3) click on read more to know more about the book


Difficulties while devloping system,

Two big difficulties while using Goodreads API
1) Goodreads uses XML to give response
2) Goodreads doesnot have support for cors (https://www.goodreads.com/topic/show/17893514-cors-access-control-allow-origin)

Solutions

1) Used xml2js library to deal with XML issue
2) As per problem statement there was no need of backend server, but since Goodreads didn't provided help for cors, implemented a backend to proxy Goodreads API's.


What I could have achieved more with time

1) Implemented test cases for both frontend and backend


Future plans

1) Add support to buy book from Amazon and other e-commerce portals from our application
