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

export function widont(givenString) {
  if (typeof givenString !== 'string') throw new Error('Missing string')

  let wordCount = givenString.split(' ').length

  if (wordCount >= 4) {
    return givenString.replace(/ ([^ ]*)$/, '\u00A0$1')
  } else {
    return givenString
  }
}
