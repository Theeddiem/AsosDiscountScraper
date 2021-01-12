export default class AsosPage {
	changePreference() {
		return cy.get('._3ap_GYr');
	}

	country() {
		return cy.get('#country');
	}

	currency() {
		return cy.get('#currency');
	}

	saveCountryBtn() {
		return cy.get('[data-testid=save-country-button]');
	}

	stylesFoundLabel() {
		return cy.get('._2JQRAAs');
	}

	discountList() {
		return cy.get('._1MVUcS8');
	}

	itemList() {
		return cy.get('_3TqU78D');
	}

	loadMore() {
		return cy.get('._39_qNys');
	}

	sortBySelect() {
		return cy.get('[data-dropdown-id="sort"]');
	}

	selcetByNew() {
		return cy.get('#plp_web_sort_whats_new');
	}
}
