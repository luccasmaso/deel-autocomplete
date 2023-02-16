import React, { HTMLProps, memo } from 'react'

type Props = {
  value: string,
  active: boolean,
  matchingPart: { from: number, to: number },
} & HTMLProps<HTMLDivElement>

const Option = ({ value, active, matchingPart, ...props }: Props) => {
  return (
    <div
      {...props}
      tabIndex={0}
      className={`autocomplete__option ${active && 'autocomplete__option--active'}`}
    >
      <div className='autocomplete__option-highlight'>
        <div>{value}</div>
        <div className='autocomplete__option-highlight__match'>
          {value.substring(0, matchingPart.from)}
          <span>{value.substring(matchingPart.from, matchingPart.from + matchingPart.to)}</span>
          {value.substring(matchingPart.from + matchingPart.to)}
        </div>
      </div> 
    </div>
  )
}

export default memo(Option, (prev, next) => {
  return prev.active === next.active && prev.matchingPart === next.matchingPart
})