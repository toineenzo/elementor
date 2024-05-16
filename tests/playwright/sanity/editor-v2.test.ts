import { test, expect } from '@playwright/test';
import WpAdminPage from '../pages/wp-admin-page';

test.describe( 'Editor Top Bar', () => {
	let editor;
	let wpAdminPage;
	let context;

	test.beforeAll( async ( { browser }, testInfo ) => {
		context = await browser.newContext();

		const page = await context.newPage();

		wpAdminPage = new WpAdminPage( page, testInfo );

		editor = await wpAdminPage.openNewPage();
	} );

	test( 'check that top bar exists', async () => {
		// Act
		const wrapper = await editor.page.locator( '#elementor-editor-wrapper-v2' );

		await wrapper.getByRole( 'button', { name: 'Page Settings' } ).click();

		await editor.page.getByLabel( 'Title', { exact: true } ).fill( 'Playwright Test Page' );

		await wrapper.getByRole( 'button', { name: 'Playwright Test Page' } ).waitFor();
		await editor.isUiStable( wrapper, 5 );

		// Assert
		expect( await wrapper.screenshot( {
			type: 'jpeg',
			quality: 70,
		} ) ).toMatchSnapshot( 'app-bar.jpg', { maxDiffPixels: 100 } );
	} );

	test( 'check panel styles', async () => {
		// Act
		await editor.page.locator( '#elementor-editor-wrapper-v2' ).getByRole( 'button', { name: 'Add Element' } ).click();

		// Assert
		expect( await editor.page.locator( 'aside#elementor-panel' ).screenshot( {
			type: 'jpeg',
			quality: 70,
		} ) ).toMatchSnapshot( 'panel.jpg', { maxDiffPixels: 100 } );
	} );
} );
