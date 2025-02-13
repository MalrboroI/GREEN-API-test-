This project is a simple chat application for sending and receiving text messages via WhatsApp using the Green-API service. The project is built with React and can be run locally using Yarn.

Requirements A Green-API account. Sign up at Green-API and obtain your idInstance and apiTokenInstance.

Node.js installed (version 16 or higher).

Yarn installed.

Installation and Running the Project

Cloning the Repository Clone the repository to your computer:
bash Copy git clone https://github.com/MalrboroI/GREEN-API-test-.git cd Green-API 2. Installing Dependencies Install all required dependencies using Yarn:

bash Copy yarn install 3. Running the Project Start the project in development mode:

bash Copy yarn start After this, the application will be available at: http://localhost:3000.

How to Use Logging In:

On the main page, enter your idInstance and apiTokenInstance obtained from Green-API.

Creating a Chat:

Enter the recipient's phone number in the format 79991112233 (without +).

Sending Messages:

Enter the message text in the input field and click the "Send" button.

Receiving Messages:

Click the "Check Messages" button to retrieve new messages from the recipient.

Project Structure:

ChatApp.jsx: The main application component.

Chat.jsx: The chat component.

Input.jsx: The component for inputting and sending messages.

Login.jsx: The component for entering Green-API credentials.

Message.jsx: The component for displaying a message.

App.css: Styles for the application.

Technologies Used React: A library for building user interfaces.

Axios: For making HTTP requests to Green-API.

Yarn: A package manager for managing dependencies.

Green-API Documentation Green-API Documentation

Message sending method: SendMessage

Notification receiving method: ReceiveNotification

Author [Igor] [aleshechrin12@yandex.ru]
