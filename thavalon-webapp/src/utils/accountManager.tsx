interface JwtType {
    "token_type": string,
    "access_token": string,
    "expires_at": number
}

class AccountManager {
    private static instance: AccountManager;
    private token: string;
    private expiresAt: number;
    private hasLoggedIn: boolean;

    private constructor() {
        this.token = "";
        this.expiresAt = 0;
        this.hasLoggedIn = false;
    };
    
    /**
     * Queries the server to see if the refresh token we currently have is valid.
     */
    private async checkRefreshToken(): Promise<boolean> {
        let jwt = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include"
        }).then((response) => {
            return response.json();
        });
        console.log("RETURNED TOKEN FROM REFRESH: " + jwt.access_token);
        this.token = jwt.access_token;
        this.expiresAt = jwt.expires_at;
        return true;
    }

    /**
     * Get the account manager instance.
     * 
     * @returns The instance of the account manager
     */
    public static getInstance(): AccountManager {
        if (!AccountManager.instance) {
            AccountManager.instance = new AccountManager();
        }

        return AccountManager.instance;
    }

    /**
     * Registers the given user.
     * 
     * @param name The name of the user.
     * @param email The email of the user.
     * @param password The password of the user.
     * @returns True if user successfully registered, false otherwise.
     */
    public async registerUser(name: string, email: string, password: string): Promise<boolean> {
        console.log("Registering user.");
        // parameters for registering user
        let add_user_dict = {
            "email": email,
            "password": password,
            "displayName": name
        }    

        // call user registration and receive jwt
        let jwt: JwtType = await fetch("/api/add/user", {
            method: "POST",
            body: JSON.stringify(add_user_dict),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }).then((response) => {
            return response.json();
        });
        console.log("RETURNED TOKEN: " + jwt.access_token);
        this.token = jwt.access_token;
        this.expiresAt = jwt.expires_at;
        this.hasLoggedIn = true;
        return true;
    }

    public async isLoggedIn(): Promise<boolean> {
        console.log("Has logged in?");
        if (this.hasLoggedIn) {
            console.log("Logged in, checking refresh token.");
            return await this.checkRefreshToken();
        }
        console.log(this.token == "");
        return this.token !== "";
    }

    public logOut(): void {
        console.log("Logged out");
        // TODO: call log out
        this.token = "";
        this.expiresAt = 0;
    }
}

export default AccountManager;