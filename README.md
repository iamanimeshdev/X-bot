# X-BOT 
A X-bot which automatically post a Quote. 

## Running it locally on your machine 

1) Clone this repo ,  `cd` to project root and add `.env` file with your username and password. 
2) Make sure node is installed on your system. 
3) Install chrome-driver on your system. 
4) Install dependencies using `npm i` 
5) Run `node index.js` 

## Things to take care

1) Keep your chrome-driver in folder which is already in a system variable path.(Took me forever to figure this small thing out)
2) Can hard-code your email and password.
3) You might get flagged and required to enter your username between entering email and password, then you can just uncomment lines  94-100 in ./WebPage.js and enter your Username there.
4) Line 13 ./WebPage.js Enter your Chrome.exe path.
5) You can change API in Line 120 ./WebPage.js to get whatever data You wanna post.
   
## Running it on cloud instance like AWS 

1) SSH into your cloud instance. 
2) Clone this repo. 
3) Configure your environment variables. <br /> 
&ensp;3.a) MacOS/Linux <br /> 
&emsp;`> export USERNAME="Replace this with your X username without quotes)"` <br /> 
&emsp;`> export PASSWORD="Replace this with your X password without quotes)"` <br /> 
&ensp;3.b) Windows-CMD <br /> 
&emsp;`> setx USERNAME "Replace this with your X username without quotes"` <br /> 
&emsp;`> setx PASSWORD "Replace this with your X password without quotes"` <br /> &
ensp;3.c) Powershell <br /> &emsp;`> $Env:USERNAME="Replace this with your X username"` <br /> 
&emsp;`> $Env:PASSWORD="Replace this with your X password"` <br /> 
4) Install node and chrome-driver. 
5) `cd` to project root and install dependencies using `npm i` 
6) Run the application. <br /> 
&ensp;6.a) Launch script by running `node index.js` <br /> 
&ensp;6.b) Launch using pm2 by running `npm install pm2@latest -g && pm2 start index.js` <br />
