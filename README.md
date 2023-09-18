# SignalR
We consider simple examples for learning and test purpose for SignalR.

. sample1: first of all i create a controller called ValueController that have just one simple API , i want to use SignalR to know the count of calling this API from all clients who call this API.(my first commit : create ValueController)

then i create a hub that send message to all clients and called it 'ValueHub'(can see the code to understand), 

so i also put a counter into the ValueController that i have the count of calling this API by clients, after that i create a hosted service that its duty is to do some work in specified time like every 1 minute, and i call this counter in this hosted service and pass it to hub to send to all clients .

i also create a react project for showing and handling client side , just clone the front side then use 'nmp install', and then "npm start "to run the front side of this proj.



.sample2: in this proj , is also a simple chat messaging that its 'hub' and its 'controller' created and work well, also i consider some situation when a client use a rude word (here the word is 'asshole'), after repeating 5 times, i send all message that contain this rude word to seperate hub and the hub sends all 5 message to all client and then clear the list of rude message

