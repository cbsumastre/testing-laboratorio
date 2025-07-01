import { test, expect } from "@playwright/test"
import { assert } from "console"


test('visit the login page', async ({ page }) => {
    // Arrange

    // Act
    await page.goto("#")
    // Assert
})

test('should name input has the focus when it clicks on it', async ({ page }) => {
    // Arrange

    // Act
    await page.goto("#")
    await page.click('input[name="user"]')

    // Assert
    const userInput = page.locator('input[name="user"]')
    await expect(userInput).toBeFocused()

})

test('should show an snackbar with a message when type invalid credentials', async ({ page }) => {
    // Arrange
    const user = "admin"
    const password = "notest"; // password ok -> test


    // Act
    await page.goto("#")

    const userInput = page.locator('input[name="user"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button');

    await userInput.fill(user);
    await passwordInput.fill(password);



    // Assert
    await expect(userInput).toHaveValue(user)
    await expect(passwordInput).toHaveValue(password)
    await submitButton.click()

    // esperamos hasta que el spinner desaparezca porque no hay llamada a ninguna api que se pueda interceptar
    await page.waitForTimeout(2000);
    const alert = page.getByRole("alert")
    await expect(alert).toBeVisible()
    await expect(alert).toContainText('Usuario y/o password no válidos')
})

test('should navigate to submodule-list url when type valid credentials', async ({ page }) => {
    // Arrange
    const user = "admin"
    const password = "test";


    // Act
    await page.goto("#")

    const userInput = page.locator('input[name="user"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button');

    await userInput.fill(user);
    await passwordInput.fill(password);
    await submitButton.click()

    // esperamos hasta que el spinner desaparezca porque no hay llamada a ninguna api que se pueda interceptar
    await page.waitForTimeout(2000);

    // Assert
    await expect(page).toHaveURL('http://localhost:5173/#/submodule-list');

})