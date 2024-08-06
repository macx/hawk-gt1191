describe('Tutorials', () => {
  it('Page /tutorials is accessible', () => {
    cy.visit('/tutorials')
  })

  it('Open every Tutorial and check content links', () => {
    cy.request('tutorials.json').as('tutorials')

    cy.get('@tutorials').its('status').should('eq', 200)

    cy.get('@tutorials').then((response) => {
      expect(response).property('status').to.equal(200)
      expect(response.body).to.have.property('tutorials')

      const tutorials = response.body.tutorials

      tutorials.forEach((tutorial) => {
        cy.visit(tutorial.path).then(() => {
          cy.get('.article')
            .find('a')
            .not('[href^="#"]')
            .should(() => {})
            .then((link) => {
              if (!(link || []).length) {
                // return
              } else {
                const blacklist = ['https://codepen.io']
                const url = link.attr('href')

                cy.log(`Checking link ${url}`)

                if (!blacklist.some((item) => url.startsWith(item))) {
                  cy.request(url).its('status').should('eq', 200)
                }
              }
            })
        })
      })
    })
  })
})
