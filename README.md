This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

Clone the git repository:

git clone https://github.com/bnays/weather-forecast-chrome-extension.git

### `Install Client (React)`

Go into frontend directory and execute following commands.<br />

1. npm install

### `Install Server (Node)`

Go into server directory and run following commands.<br />

1. npm install

To Access the https://www.weatherapi.com/ for data, you will need to get a APP_KEY.

1. Go to https://www.weatherapi.com/

2. Sign up and Login using your credentials.

3. After Login, you will be directed to Dashboard.

4. You can find your API KEY in the dashboard.

5. Copy the API KEY.

Open the project in editor such as VS Code.

2. You will need to create the .env environment file in server folder.

3. Copy the environment variables from .env.example file.

4. Paste the API KEY from the https://www.weatherapi.com/.

### `Start Server (Node)`

1. npm start

This will be served at port 5000. i.e. http://localhost:5000/

### `Start Client (React)`

2. npm start

This will be served at port 3000. i.e. http://localhost:3000/

## Deploy as chrome extension.

### `Build react project`

Go the frontend directory. You will need to build the react project. Run following command.

1. npm run build

After the project has been build, you can find the build folder inside frontend directory.

2. Open Chrome Browser and navigate to Extensions.

    chrome://extensions/

3. Click on 'Load unpacked' button which will open a file explorer.

4. On File explorer, navigate to the 'build' folder in frontend directory.

5. Select the build directory by clicking on "Select Folder".

6. This will load the project as chrome extension.

7. Now, whenever you open a new tab, you can see the project running.

## Note

Don't forget to create the .env file and paste your api as :  APP_KEY = 'Your api key here'. <br/>

Please do restart server if you make any changes to the server.