# Speech-to-Text Application

This is a **Speech-to-Text (STT)** application built using **Django REST Framework (DRF)** for the backend and **React.js** for the frontend. The app provides user authentication (Register and Login) and enables users to upload or record audio files to transcribe speech into text. Users can also play back audio with synchronized word highlighting.

## Screenshots

### Register Page
![Register Page](./screenshots/register.png "Register Page")

### Login Page
![Login Page](./screenshots/login.png "Login Page")

### STT Page (Audio Transcription)
![STT Page](./screenshots/stt.png "STT Page")

## Features

- **User Authentication**: Register and Login using Django's built-in authentication system.
- **Audio Upload**: Upload `.wav` files for transcription.
- **Audio Recording**: Record audio directly in the browser.
- **Speech-to-Text (STT)**: Transcribes uploaded or recorded audio files using an external API.
- **Playback with Highlighting**: Plays the audio file while highlighting the transcribed words in real-time.
- **User Quota Management**: Limits the total audio duration users can transcribe, configurable in the Django admin panel.


## Technologies

### Backend
- **Python 3.x**
- **Django** and **Django REST Framework**
- **SQLite/PostgreSQL** (configurable)

### Frontend
- **React.js**
- **Axios** for API communication
- **Tailwind CSS** for styling


## Installation and Setup

### Prerequisites
- Python 3.x
- Node.js and npm/yarn
- Git


### Backend Setup

1. Clone the repository and navigate to the backend directory:
   ```bash
   git clone git@github.com:aliharby12/Kateb-STT.git
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Linux/Mac
   venv\Scripts\activate     # For Windows
   ```

3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure the `.env` file for environment variables (we have .env-example file to follow it):
   ```env
   SECRET_KEY=your_secret_key
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   STT_API_URL=https://your-stt-api-url.com
   ```

5. Run database migrations:
   ```bash
   python3 manage.py makemigrations
   python3 manage.py migrate
   ```

6. Create a superuser to manage the admin panel to manage user quotas:
   ```bash
   python3 manage.py createsuperuser
   ```

7. Start the backend server:
   ```bash
   python3 manage.py runserver
   ```

The backend will run at [http://localhost:8000](http://localhost:8000).

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/stt-app/
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the backend API URL: Open the file where `API_BASE_URL` is defined (e.g., `src/api.js`) and replace the default value with your backend URL::
   ```bash
   const API_BASE_URL = "http://localhost:8000/api"; // Replace with your backend URL
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend will run at [http://localhost:3000](http://localhost:3000).


## Testing

### Backend Testing
Run the backend test suite:
```bash
python3 manage.py test
```


## Usage

1. Open the app in your browser at [http://localhost:3000](http://localhost:3000).
2. Register a new user or login with existing credentials.
3. Upload a `.wav` file or record audio directly.
4. Click "Transcribe" to see the transcription result with synchronized word highlighting.


## API Endpoints

### Authentication
- **Register**: `/api/auth/register/`
- **Login**: `/api/auth/login/`

### Speech-to-Text
- **Transcription**: `/api/stt/speech-to-text/`


## License

This project is licensed under the MIT License.
