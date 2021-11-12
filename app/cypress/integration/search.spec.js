describe('Search Module', () => {
  it('autocompletes', () => {
    cy.visit('/')
    
    cy.get('.main-search-input input').type("tesla")
    cy.get('.auto-complete').should('have.class', 'visible')

    // wait for the first response to finish
    cy.wait(2000)

    cy.get('.auto-complete > button').should(($lis) => {
      expect($lis, '10 items').to.have.length(10)
    })
  })

  it('autocomplete and search', () => {
    cy.visit('/')
    
    cy.get('.main-search-input input').type("tesla")
    cy.get('.auto-complete').should('have.class', 'visible')

    // wait for the first response to finish
    cy.wait(2000)

    cy.get('.auto-complete > button').then(($button) => {
      const autocomplete = $button.get(0).innerText
      $button.eq(0).click()

      cy.get('.main-search-input input').should('have.value', autocomplete)

      cy.get('.story').should(($lis) => {
        expect($lis, '10 items').to.have.length(10)
      })
    })
  })

  it('searches', () => {
    cy.visit('/')

    cy.get('.main-search-input input').type("tesla")
    cy.get('.search-button').click()

    cy.wait(2000)

    cy.get('.story').should(($lis) => {
      expect($lis, '10 items').to.have.length(10)
    })
  })
})

