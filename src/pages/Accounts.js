import React, { createContext } from 'react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const userPool = new CognitoUserPool({
  UserPoolId: "eu-north-1_bA7RndLAT",
  ClientId: "3f5v8keobedm2otis1htctnk6h",
});

const AccountContext = createContext();
const Account = (props) => {
  const getSession = async () => {
    await new Promise((resolve, reject) => {
      const user = userPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            user.getUserAttributes((err, attributes) => {
              if (err) {
                reject(err);
              } else {
                console.log('attributes:', attributes);
                const results = {};

                for (let attribute of attributes) {
                  const { Name, Value } = attribute;
                  results[Name] = Value;
                }

                const accessToken = session.getIdToken().getJwtToken();

                resolve({
                  user,
                  accessToken,
                  headers: {
                    'x-api-key': attributes['custom:apikey'],
                    Authorization: accessToken,
                  },
                  ...session,
                  ...results,
                });
              }
            });
          }
        });
      } else {
        reject("User not found");
      }
    });
  };

  const authenticate = async (Username, Password) => {
    const authenticationData = {
      Username,
      Password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          console.log('onSuccess:', session);
          resolve(session);
        },

        onFailure: (err) => {
          console.error('onFailure:', err);
          reject(err);
        },

        newPasswordRequired: (userAttributes, requiredAttributes) => {
          console.log('newPasswordRequired:', userAttributes, requiredAttributes);
          resolve({ userAttributes, requiredAttributes });
        },

        totpRequired: (session) => {
          console.log('totpRequired:', session);
          const token = prompt('Please enter your 6-digit token');
          cognitoUser.sendMFACode(token, {
            onSuccess: () => {
              console.log('MFA Token successfully sent');
              resolve(session);
            },
            onFailure: (err) => {
              console.error('Failed to send MFA Token:', err);
              reject(err);
            },
          });
        },
      });
    });
  };

  const logout = () => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account };