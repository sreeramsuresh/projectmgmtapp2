// src/auth/msalConfig.js
import { PublicClientApplication, LogLevel } from "@azure/msal-browser";

// MSAL configuration
export const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID", // Replace with your Azure AD client ID
    authority: "https://login.microsoftonline.com/common", // Common endpoint for multi-tenant applications
    redirectUri: window.location.origin, // Redirect URI after successful login
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          default:
            break;
        }
      },
      logLevel: LogLevel.Verbose,
    },
  },
};

// Login request configuration
export const loginRequest = {
  scopes: ["User.Read"],
};

// Initialize MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);
