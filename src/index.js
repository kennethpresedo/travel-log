import './styles.css'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import SignIn from './components/SignIn';


const root = createRoot(document.getElementById('root'))

root.render(
    <StrictMode>
        <h1>Welcome to your travel log!</h1>
        <SignIn/>
    </StrictMode>
)