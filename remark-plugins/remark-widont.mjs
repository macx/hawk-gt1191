// Article: https://eatmon.co/blog/remove-runts-markdown
import { visit } from 'unist-util-visit'

export function remarkWidont() {
  function transformer(tree) {
    visit(tree, 'text', function (node) {
      if (typeof tree === 'undefined') throw new Error('Missing tree')

      let wordCount = node.value.split(' ').length

      if (wordCount >= 4) {
        node.value = node.value.replace(/ ([^ ]*)$/, '\u00A0$1')
      }
    })
  }

  return transformer
}

export function formatTitle(givenString) {
  if (typeof givenString !== 'string') throw new Error('Missing string')

  let titleParts = givenString.split(':')

  if (titleParts.length > 1) {
    let firstPart = titleParts[0].trim()
    let secondPart = titleParts[1].trim()

    return `<span>${firstPart}:</span> ${secondPart.trim()}`
  }

  return widont(givenString)
}

export function widont(givenString) {
  if (typeof givenString !== 'string') throw new Error('Missing string')

  let words = givenString.split(' ')
  let wordCount = words.length

  if (wordCount >= 4) {
    if (words[wordCount - 2] === '&') {
      let newString = ''

      for (let i = 0; i < wordCount; i++) {
        if (i === wordCount - 3) {
          newString += words[i] + '\u00A0'
        } else {
          newString += words[i] + ' '
        }
      }

      return newString
    } else {
      return givenString.replace(/ ([^ ]*)$/, '\u00A0$1')
    }
  } else {
    return givenString
  }
}
