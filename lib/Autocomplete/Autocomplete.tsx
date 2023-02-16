import { useEffect, useRef, useState } from 'react'

import filterByAnyPosition, { MatchingPart } from './OptionsFilter'
import Option from './Option'

type OptionType = string

enum Keyboard {
  Up = 'ArrowUp',
  Down = 'ArrowDown',
  Enter = 'Enter',
  Tab = 'Tab'
}

type Props = {
  inputPlaceholder: string,
  options: OptionType[],
}

export default function Autocomplete({ inputPlaceholder, options }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [optionSelected, setOptionSelected] = useState<string|null>(null)
  const [optionActive, setOptionActive] = useState<number>(-1)
  const [optionsFiltered, setOptionsFiltered] = useState<OptionType[]>([])
  const [matchingParts, setMatchingParts] = useState<MatchingPart[]>([])

  /*
    Removes the current selected option and defaults active option to the first ocurrence 
    in the list (zero-based).
  */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
    setOptionSelected(null)
    setOptionActive(event.target.value === '' ? -1 : 0)
  }

  /*
    1. When 'up' and 'down'
      - The `event.preventDefault` is to stop cursor from jumping to start/end.
      - The next option position is set.
    2. When 'enter', the option is selected.
    3. When 'tab', the focus is set to false.
  */
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    switch(event.key) {
      case Keyboard.Up: 
        event.preventDefault() 
        if (optionActive > 0) setOptionActive(optionActive - 1)
        break
      case Keyboard.Down: 
        event.preventDefault()
        if (optionActive < optionsFiltered.length - 1) setOptionActive(optionActive + 1)
        break
      case Keyboard.Enter: 
        if (optionActive >= 0) handleOptionSelected(optionsFiltered[optionActive])
        break
      case Keyboard.Tab: 
        setHasFocus(false)
        break
    }
  }
  
  const handleOptionSelected = (value: string) => {
    setInputValue(value)
    setOptionSelected(value)
  }

  /*
    Binds and unbinds an event listener to the window in order to detect clicks outside of the autocomplete.
  */
  const handleClickOutside = () => {
    const eventHandler = (event: Event) => {
      setHasFocus(containerRef.current!.contains(event.target as Node))
    }

    window.addEventListener('click', eventHandler)
    return () => window.removeEventListener('click', eventHandler)
  }

  /*
    This provides special treatment for the use case where the list context overflows its height, 
    ensuring accessibility to the following scroll while navigating.
  */
  const handleFocusOnKeyboardNavigation = () => {
    const optionActiveElement = listRef.current?.childNodes[optionActive] as HTMLElement
    const inputElement = inputRef.current
    
    optionActiveElement?.focus()
    inputElement?.focus()
  }

  const filterOptions = () => {
    const timeout = setTimeout(async () => {
      const result = await filterByAnyPosition({ options, search: inputValue })
      
      setOptionsFiltered(result.options)
      setMatchingParts(result.matchingParts)
    }, 150)

    return () => clearTimeout(timeout)
  }

  useEffect(() => filterOptions(), [inputValue, options])
  useEffect(() => handleClickOutside(), [])
  useEffect(() => handleFocusOnKeyboardNavigation(), [optionActive])
  
  return (
    <div className='autocomplete' ref={containerRef}>
      <input
        ref={inputRef}
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setHasFocus(true)}
        onKeyDown={handleInputKeyDown}
        className='autocomplete__input'
      />

      {hasFocus && inputValue !== '' && !optionSelected && (
        <div className='autocomplete__option-list' ref={listRef}>
          {optionsFiltered.length === 0 && (
            <div className='autocomplete__empty-list'>No results found</div>
          )}

          {optionsFiltered.length > 0 && (
            optionsFiltered.map((name, index) => (
              <Option
                key={name}
                value={name}
                active={index === optionActive}
                onMouseOver={() => setOptionActive(index)}
                onClick={() => handleOptionSelected(name)}
                matchingPart={matchingParts[index]}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}