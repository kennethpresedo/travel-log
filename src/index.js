import './styles.css'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import SignIn from './components/SignIn';


const root = createRoot(document.getElementById('root'))

root.render(
    <StrictMode>
        <SignIn/>
        <App/>
    </StrictMode>
)