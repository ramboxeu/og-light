let client;

export default class Dialogflow {
    static init() {
        client = new ApiAi.ApiAiClient({accessToken: 'YOUR_ACCESS_TOKEN'});
    }

    static request(text) {
        return client.textRequest(text);
    }
}