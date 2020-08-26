import React, { useState, MouseEvent, useCallback } from 'react'
import randomWord from './words'
import img0 from './assets/0.jpg'
import img1 from './assets/1.jpg'
import img2 from './assets/2.jpg'
import img3 from './assets/3.jpg'
import img4 from './assets/4.jpg'
import img5 from './assets/5.jpg'
import img6 from './assets/6.jpg'

import './Hangman.scss'
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const Hangman: React.FC = (): JSX.Element => {
    const [nWrong, setNWrong] = useState<number>(0)
    const [guessed, setGuessed] = useState<Set<string>>(new Set())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [answer, setAnswer] = useState<string>(randomWord())

    const handleGuess = useCallback(
        (e: MouseEvent<HTMLButtonElement>): void => {
            const element: HTMLButtonElement = e.target as HTMLButtonElement
            const ltr: string = element.value
            setNWrong((prev) => prev + (answer.includes(ltr) ? 0 : 1))
            setGuessed(new Set(guessed.add(ltr)))
        },
        [answer, guessed]
    )

    const guessedWord = (): string[] => {
        console.log(1)
        return answer.split('').map((ltr) => (guessed.has(ltr) ? ltr : '_'))
    }

    const generateButtons = (): JSX.Element[] => {
        return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr) => (
            <button
                key={ltr}
                type="button"
                value={ltr}
                onClick={handleGuess}
                disabled={guessed.has(ltr)}
            >
                {ltr}
            </button>
        ))
    }

    const reset = () => {
        setNWrong(0)
        setGuessed(new Set())
        setAnswer(randomWord())
    }

    const maxWrong = 6
    const images: string[] = [img0, img1, img2, img3, img4, img5, img6]
    const gameOver = nWrong >= maxWrong
    const isWinner = guessedWord().join('') === answer
    const altText = `${nWrong}/${maxWrong} guesses`
    let gameState: JSX.Element[] | string = generateButtons()
    if (isWinner) gameState = 'You Win!'
    if (gameOver) gameState = 'You Lose!'
    return (
        <div className="Hangman">
            <h1>Hangman</h1>
            <img src={images[nWrong]} alt={altText} />
            <p className="Hangman-wrong">Guessed Wrong: {nWrong}</p>
            <p className="Hangman-word">{!gameOver ? guessedWord() : answer}</p>
            <p className="Hangman-btns">{gameState}</p>
            <button type="button" onClick={reset} className="Hangman-reset">
                Restart?
            </button>
        </div>
    )
}

export default Hangman
