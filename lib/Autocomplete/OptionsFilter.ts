type Props = {
  options: string[], 
  search: string
}

export type MatchingPart = {
  from: number,
  to: number,
}

export type FilterResult = {
  options: string[],
  matchingParts: MatchingPart[]
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/*
  Filters options by any position.
  -------------------------------
  Search Term: 'be'
  Result: {
    options: ['Let it Be', 'The Bends'],
    matchingParts: [{ from: 7, to: 8 }, { from: 4, to: 5 }]
  }
*/
export default function filterByAnyPosition({ options, search }: Props): Promise<FilterResult> {
  const regexp = new RegExp(escapeRegExp(search), 'gi')

  const filteredOptions = [] as string[]
  const matchingParts = [] as MatchingPart[]

  for (const option of options) {
    const match = regexp.exec(option)

    if (match) {
      filteredOptions.push(option)
      matchingParts.push({ from: match['index'], to: match[0].length })
    }
  }
  
  return Promise.resolve({ options: filteredOptions, matchingParts })
}