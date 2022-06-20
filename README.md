# How to Run in Your Local Machine?

## Intro

First, **download the repository into your machine**. One way to download the repository into your machine is to click “Code” on the upper right and then “Download Zip”. You can find information on how to do so [here](https://www.youtube.com/watch?v=_8Dc-K39DLQ&ab_channel=TechSeymur).

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8142553d-96cd-4d7f-860c-cf427dffbb46/Untitled.png)

# How to Run in Your Local Machine?

## Intro

First, **download the repository into your machine**. One way to download the repository into your machine is to click “Code” on the upper right and then “Download Zip”. You can find information on how to do so [here](https://www.youtube.com/watch?v=_8Dc-K39DLQ&ab_channel=TechSeymur).

At this point you should have a folder with all the contents in your machine. Make sure to unzip the folder if the folder was originally compressed and you have not unzipped it yet. 

To run the project in your machine, there are two things you must run: the front end and the backend.

Let’s start with the backend 

## Backend

You will see that the project is split into two main folders: `backend` and `client`. Inside of `backend`, you will see that there is a `src` folder. 

**In your terminal, “`cd`” your way into the `src` folder.** That is, your terminal must be inside of the `src` folder of `backend`.

**Now, run `npm install -g nodemon` and then `nodemon server` in your terminal.**

You should see the following:

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7c6dbf82-67c1-47ca-b3ff-042d71a860bb/Untitled.png)

## Frontend

**Make sure that nothing else is running in your localhost:3000. How? Go to localhost:3000. If you have anything else running there, kill it. One way to do so is [here](https://www.youtube.com/watch?v=Dh_6W3ZNPsM&ab_channel=OSPY).**

**Open a new terminal.**

You will see that the project is split into two main folders: `backend` and `client`. **“`cd`" your way into the `client` folder.**

**Next, follow the three steps:**

1. **Run `npm i node-sass` in the terminal, in the `client` folder** (it’s ok if you see a bunch of errors show up in the terminal)
2. **Run `npm upgrade` in the terminal,  in the `client` folder** (it’s ok if you see a bunch of errors show up in the terminal)
3. **Run `npm rebuild node-sass` in the terminal,  in the `client` folder**

**Then, run `npm start` in the client folder**
