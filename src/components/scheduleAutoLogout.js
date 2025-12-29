export const scheduleAutoLogout = (token) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiryTime = payload.exp * 1000;
        const timeout = expiryTime - Date.now();

        if (timeout > 0) {
            setTimeout(() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }, timeout);
        }
    } catch (e) {
        localStorage.removeItem("token");
    }
};
