export class ApiClass {
    private apiUrl: string = 'http://127.0.0.1:8000/';
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async getApi(apiAdr: string) {
        try {
            const response = await fetch(this.apiUrl + apiAdr);
            console.log(response);
            return response.json();
        } catch (error) {
            console.error("Error fetching data: ", error);
            throw error;
        }
    }

    async postApi(apiAdr: String, ele: any) {
        try {
            const response = await fetch(this.apiUrl + apiAdr, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ele),
            });
            return response.json();
        } catch (error) {
            console.error("Error posting data: ", error);
            throw error;
        }
    }
}