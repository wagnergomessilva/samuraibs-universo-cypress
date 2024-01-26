import toast from '../../components/toast'
import { el } from './elements'

class ForgotPassPage {

    constructor() {
        this.toast = toast
    }

    go() {
        cy.visit('/forgot-password')
        cy.contains(el.title)
            .should('be.visible')
    }

    form(email) {
        cy.get(el.email)
            .clear()
            .type(email)
    }

    submit() {
        cy.contains('button[type=submit]', 'Recuperar')
            .click()
    }
}

export default new ForgotPassPage()