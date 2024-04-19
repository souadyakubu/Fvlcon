import { CognitoUserPool } from "amazon-cognito-identity-js";

const dataPool ={
    UserPoolId: "eu-north-1_bA7RndLAT",
    ClientId: "3f5v8keobedm2otis1htctnk6h",
}

export default new CognitoUserPool(dataPool);
