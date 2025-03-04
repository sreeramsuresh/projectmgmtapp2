// src/auth/msalService.js
import { msalInstance, loginRequest } from "./msalConfig";

/**
 * Handles the MSAL login process
 * @returns {Promise<Object>} The user account info
 */
export const loginWithMicrosoft = async () => {
  try {
    // Check if there are accounts in the cache
    const accounts = msalInstance.getAllAccounts();

    if (accounts.length > 0) {
      // Use the first account if available
      msalInstance.setActiveAccount(accounts[0]);
      return await getUser();
    } else {
      // Start the login process
      const result = await msalInstance.loginPopup(loginRequest);
      msalInstance.setActiveAccount(result.account);
      return await getUser();
    }
  } catch (error) {
    console.error("Error during MSAL authentication:", error);
    throw error;
  }
};

/**
 * Logout from Microsoft
 */
export const logoutMicrosoft = async () => {
  try {
    const logoutRequest = {
      account: msalInstance.getActiveAccount(),
      postLogoutRedirectUri: window.location.origin,
    };

    await msalInstance.logoutPopup(logoutRequest);
  } catch (error) {
    console.error("Error during MSAL logout:", error);
    throw error;
  }
};

/**
 * Get the currently logged in user's information
 * @returns {Promise<Object>} User information
 */
export const getUser = async () => {
  try {
    const account = msalInstance.getActiveAccount();
    if (!account) {
      throw new Error("No active account");
    }

    // Get access token for the Microsoft Graph API
    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: account,
    });

    // In a real app, you would use this token to get more user info from Microsoft Graph
    // For simplicity, we'll create a user object from the account info
    return {
      user: {
        id: account.localAccountId,
        name: account.name,
        email: account.username,
        // Assign a default role - in a real app, you'd get this from your backend
        role: "user",
      },
      token: response.accessToken,
    };
  } catch (error) {
    console.error("Error getting user:", error);

    // If silent token acquisition fails, try with a popup
    if (error.name === "InteractionRequiredAuthError") {
      const response = await msalInstance.acquireTokenPopup(loginRequest);
      const account = response.account;

      return {
        user: {
          id: account.localAccountId,
          name: account.name,
          email: account.username,
          role: "user",
        },
        token: response.accessToken,
      };
    }

    throw error;
  }
};

/**
 * Check if a user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  const accounts = msalInstance.getAllAccounts();
  return accounts.length > 0;
};

/**
 * Initialize MSAL when the app starts
 */
export const initializeMsal = () => {
  // Register redirect handlers
  msalInstance.handleRedirectPromise().catch((error) => {
    console.error("Redirect error:", error);
  });

  // Check for accounts
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }
};
