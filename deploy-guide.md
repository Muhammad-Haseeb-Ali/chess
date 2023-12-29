connect with ssh
-> ssh root@140.82.51.11

cloned repo location: ~/chess/chess-game

folder structure:
backend - contain backend code
frontend - contain frontend react code

Run backend Server with pm2 process
-> cd ~/chess/chess-game/backend
-> pm2 start --name chess-backend "npm start"

Serve frontend with nginx
-> cd ~/chess/chess-game/frontend
-> npm run build
// remove all previous build files
rm -rf /var/www/html/*
move new build files here
mv ~/chess/chess-game/frontend/build /var/www/html/