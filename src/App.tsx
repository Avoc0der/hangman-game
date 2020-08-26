import React from 'react'
import './App.scss'
import Hangman from './Hangman'

const App: React.FC = (): JSX.Element => {
    return (
        <div className="App">
            <Hangman />
        </div>
    )
}

export default App
