# install npm packages
cd frontend
npm i
cd ..

# copy the boards json
cp ./boards.json ./build/bin/boards.json

# build wails project
wails build