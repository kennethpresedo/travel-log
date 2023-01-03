import './styles.css'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import TravelList from './components/TravelList'
import Travel from './components/Travel'

const root = createRoot(document.getElementById('root'))

root.render(
    <StrictMode>
        <App/>
        <TravelList/>
        <Travel/>
    </StrictMode>
)